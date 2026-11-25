# Configuración del proyecto Supabase — Iberostar THE CLUB

Scripts para configurar el proyecto **nuevo** de Supabase a partir del código real de la revista. No ejecutar en el proyecto anterior.

## Pasos

1. Crear el proyecto en https://supabase.com (plan Free basta; región US East o la más cercana).
2. Abrir **SQL Editor** → New query → pegar el contenido completo de `setup.sql` → **Run**.
   Verás: "Success. No rows returned". Se puede re-ejecutar sin peligro.
3. Crear el usuario administrador:
   **Authentication → Users → Add user** → email + contraseña → marcar *Auto Confirm User*.
4. Copiar la **Project URL** y la **publishable key**:
   **Project Settings → API → Project URL / sb_publishable_...**
5. Entregar ambas valores al mantenimiento del sitio para actualizar `function.js`.

## Seguridad: registro cerrado y administradores autorizados

Se aplica en dos partes: la configuración del panel de Supabase y el
script `security.sql` (idempotente, no borra datos ni usuarios).

### A. Desactivar los registros públicos (sin afectar al administrador)

1. Dashboard → **Authentication → Providers → Email**.
2. Desactivar **"Allow new users to sign up"** (equivale a `disable_signup = true`).
3. Revisar en **Authentication → Sign In / Providers** si la misma opción
   aparece repetida y desactivarla también.
4. Comprobar en **Authentication → Users** que el usuario administrador
   sigue existiendo.

Desactivar el registro **solo cierra el endpoint `POST /auth/v1/signup`**;
el login por `signInWithPassword` (email + contraseña) usa
`POST /auth/v1/token?grant_type=password` y **no se ve afectado**, así que el
administrador sigue entrando con normalidad. Al cerrarlo, nadie más puede
crearse una cuenta `authenticated` para intentar escribir en la revista.

### B. Definir administradores por lista blanca

1. Ejecutar `security.sql` en el **SQL Editor** (se puede re-ejecutar sin peligro).
2. Dar de alta al administrador, después de crear su usuario en Authentication.
   El script incluye en el paso 3 un bloque `do $$ ... $$` comentado que inserta al
   usuario y **confirma** que existe exactamente su fila en `public.admins`.
   Descoméntalo y reemplaza el correo:

   ```sql
   do $$
   declare
     v_email text := 'CORREO_ADMIN@DOMINIO.COM';   -- <<< tu correo real
     v_uid   uuid;
     v_rows  integer;
   begin
     select id into v_uid from auth.users where email = v_email;

     if v_uid is null then
       raise exception
         'ALTA NO COMPLETADA: no existe ningun usuario en auth.users con email %', v_email;
     end if;

     insert into public.admins (user_id)
     select v_uid
     on conflict (user_id) do nothing;

     select count(*) into v_rows from public.admins where user_id = v_uid;
     if v_rows <> 1 then
       raise exception
         'ALTA NO COMPLETADA: se esperaba 1 fila en admins para %, hay %', v_email, v_rows;
     end if;

     raise notice 'ALTA CONFIRMADA: % (uid %) es administrador autorizado.', v_email, v_uid;
   end $$;
   ```

   - Si el usuario no existe en Authentication, el bloque lanza
     `ALTA NO COMPLETADA` y no inserta nada.
   - Si todo va bien, muestra `ALTA CONFIRMADA: correo (uid …)`.
   - Es idempotente: si ya era admin, no duplica y confirma igualmente la fila.

### C. Qué garantiza

- `public.admins` no es accesible por la API: su política deniega todo a
  `anon` y `authenticated`, así que un usuario **no puede añadirse a sí mismo**
  ni borrar a otros.
- `is_admin()` es `security definer` con `search_path = ''` y lee la identidad
  del JWT (`auth.uid()`), que el cliente no puede falsificar. No acepta
  parámetros ni usa `user_metadata`.
- La **lectura pública** de tablas y Storage se conserva para los huéspedes;
  el INSERT/UPDATE/DELETE queda restringido a administradores.
- No se usa `service_role` ni claves secretas en el frontend.

### D. Pruebas de seguridad (3 roles)

| # | Rol | Acción | Resultado esperado |
|---|---|---|---|
| 1 | anónimo | SELECT en `workspace`/`videos` y abrir imagen pública | éxito (200) |
| 2 | anónimo | INSERT / UPDATE / DELETE en tablas y Storage | bloqueado (401/403) |
| 3 | autenticado NO admin | `rpc/is_admin` | `false` |
| 4 | autenticado NO admin | INSERT / UPDATE / DELETE en tablas y Storage | bloqueado (42501/403) |
| 5 | admin | `rpc/is_admin` | `true` |
| 6 | admin | INSERT / UPDATE / DELETE en `workspace`, `videos` y Storage | éxito |
| 7 | cualquiera | `insert` directo en `public.admins` | bloqueado |
| 8 | cualquiera | `POST /auth/v1/signup` tras cerrar el registro | bloqueado |

### E. Comandos de comprobación (REST)

Sustituye `<URL>`, `<KEY>` y los JWT de cada cuenta.

```powershell
$base='<URL>'; $key='<KEY>'; $anonH=@{apikey=$key; Authorization="Bearer $key"}

# --- ANÓNIMO ---
(Invoke-WebRequest "$base/rest/v1/workspace?select=id" -Headers $anonH).StatusCode   # 200
try { Invoke-WebRequest "$base/rest/v1/workspace" -Method Post `
  -Headers ($anonH+@{'Content-Type'='application/json'}) `
  -Body '{"hotel":"x","title":"x"}' } catch { $_.Exception.Response.StatusCode.value__ }   # 401

# --- AUTENTICADO NO ADMIN (JWT de una cuenta sin fila en admins) ---
$userH=@{apikey=$key; Authorization="Bearer $env:USER_JWT"; 'Content-Type'='application/json'}
(Invoke-WebRequest "$base/rest/v1/rpc/is_admin" -Method Post -Headers $userH -Body '{}').Content   # false
try { Invoke-WebRequest "$base/rest/v1/workspace" -Method Post `
  -Headers $userH   -Body '{"hotel":"x","title":"x"}' } catch { $_.Exception.Response.StatusCode.value__ }   # 401/403

# --- ADMIN (mismo usuario tiene fila en public.admins) ---
$admH=@{apikey=$key; Authorization="Bearer $env:ADMIN_JWT"; 'Content-Type'='application/json'}
(Invoke-WebRequest "$base/rest/v1/rpc/is_admin" -Method Post -Headers $admH -Body '{}').Content   # true
$r=Invoke-WebRequest "$base/rest/v1/workspace" -Method Post -Headers $admH `
  -Body '{"hotel":"test","title":"alta-admin"}'                                                   # crear
($r.Content | ConvertFrom-Json).id                                                               # id creado -> probar UPDATE/DELETE
```

Prueba equivalente en la interfaz: en Workspace y Vídeos, publicar/editar/eliminar
con el admin funciona; con una cuenta no admin aparece el aviso
"No tienes permisos de administrador…" (mensaje de `supabaseErrorMessage`).

## Qué crea `setup.sql`

| Objeto | Detalle |
|---|---|
| Tabla `workspace` | id uuid, hotel, title, text, product, image, created_at |
| Tabla `videos` | id uuid, hotel, title, video, mime_type, start, end, created_at; CHECK ≤ 35 s |
| Bucket `workspace-images` | público de lectura, máx 10 MB, sólo imágenes |
| Bucket `videos` | público de lectura, máx 100 MB, mp4/webm |
| RLS | SELECT público en tablas y buckets; INSERT/UPDATE/DELETE sólo `authenticated` (por defecto; `security.sql` lo restringe a administradores) |

No se crea tabla para 360°: ese módulo usa IndexedDB local del navegador.

## Verificación rápida (SQL Editor)

```sql
-- Debe devolver 2 filas
select id, public from storage.buckets where id in ('workspace-images','videos');

-- Debe listar 8 políticas (4 por tabla)
select tablename, policyname from pg_policies
where schemaname = 'public' and tablename in ('workspace','videos');
```

## Variables de conexión

Solo se necesitan dos valores, ambos públicos (seguros en el frontend):

| Variable | Dónde se obtiene | Dónde se usa |
|---|---|---|
| `SUPABASE_URL` | Project Settings → API → Project URL | `function.js` líneas 10-11 |
| `SUPABASE_PUBLISHABLE_KEY` | Project Settings → API → `sb_publishable_...` | `function.js` línea 13 |

- Nunca usar `service_role` ni `sb_secret_...` en el frontend ni en el repositorio.
- Al cambiar de proyecto, reemplazar únicamente esos dos valores en `function.js`.

## Cambios de código incluidos

- `function.js`: barra de login de administrador en Workspace y Vídeos
  (`renderAdminAuthBar`, `wireAdminAuthBar`), guardas en publicar/eliminar
  (`requireAdminSession`) y mensajes claros ante errores RLS
  (`supabaseErrorMessage`).
- `style.css`: estilos `.admin-auth` de la barra de login.
- La sesión se guarda en `localStorage` (comportamiento estándar de supabase-js).
- No se tocó el módulo 360° (sigue en IndexedDB local) ni los catálogos estáticos.

## Lista de pruebas (tras configurar el proyecto)

1. Lectura anónima: abrir Workspace y Vídeos → contenido carga sin iniciar sesión.
2. Escritura anónima bloqueada: sin sesión, publicar/eliminar muestra el aviso de login
   (y, si se fuerza por consola, la base responde 401/403 por RLS).
3. Login: entrar con el usuario administrador → la barra muestra "Conectado: email".
4. Workspace: publicar experiencia con imagen, editar y eliminar.
5. Vídeos: subir video ≤ 35 s, editar fragmento y eliminar.
6. Storage: la imagen/video sube al bucket correcto y la URL pública abre en otra pestaña.
7. Cerrar sesión: las acciones de escritura vuelven a pedir login.
8. Re-ejecutar `setup.sql` en el SQL Editor → termina sin errores ni duplicados.

## Diagnóstico del proyecto anterior (solo referencia)

- Workspace y Vídeos usan Supabase (tablas `workspace` y `videos`).
- 360° usa IndexedDB local (`iberostarRevistaDB`, store `media360`, imágenes Base64).
- Restaurantes y hoteles son catálogos estáticos en JS.
- La tabla `media` solo aparecía en `probarSupabase()`, código muerto: no se crea.
- El proyecto anterior no se modificó ni se eliminó.
