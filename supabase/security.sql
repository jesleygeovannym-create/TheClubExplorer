-- ============================================================
-- Iberostar THE CLUB — Endurecimiento de seguridad (RLS admin)
-- Archivo: supabase/security.sql
-- Idempotente: se puede re-ejecutar sin dañar datos.
-- No elimina datos, archivos ni usuarios.
-- No usa service_role ni claves secretas.
-- Ejecutar en el SQL Editor, DESPUÉS de crear el usuario admin
-- y DESPUÉS de ejecutar setup.sql.
--
-- Qué hace este script:
--   1. Crea la lista blanca public.admins (solo gestionable por SQL Editor).
--   2. Crea is_admin(), que identifica al administrador por su JWT
--      (auth.uid()), no por datos que el cliente pueda falsificar.
--   3. Sustituye las 12 políticas de escritura permisivas (rol
--      "authenticated" con with check true) por versiones que exigen
--      public.is_admin() en workspace, videos y storage.objects.
--   4. Conserva intactas las políticas de lectura pública (*_select_public).
--
-- Qué NO hace:
--   - No borra filas de workspace/videos ni objetos de storage.
--   - No borra usuarios de auth.users.
--   - No toca políticas de lectura ni funciones ajenas a la seguridad.
-- ============================================================

-- ------------------------------------------------------------
-- 1. Lista blanca de administradores
--    Se administra SOLO desde el SQL Editor: la política
--    admins_no_api_access deniega TODO acceso a anon y
--    authenticated, de modo que un usuario no puede añadirse
--    (ni borrar a otros) llamando a la API REST.
-- ------------------------------------------------------------
create table if not exists public.admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

-- Revocar cualquier privilegio SQL directo previo de anon/authenticated
-- y del pseudo-rol PUBLIC (defensa en profundidad: aunque RLS ya deniega,
-- no queda ningún GRANT que pudiera alcanzar a anon/authenticated vía PUBLIC).
revoke all on table public.admins from anon, authenticated;
revoke all on table public.admins from public;

drop policy if exists admins_no_api_access on public.admins;
create policy admins_no_api_access
  on public.admins for all
  to public
  using (false)
  with check (false);

-- Comprobación 1 — privilegios SQL efectivos de anon/authenticated sobre admins.
-- Esperado: con RLS=true y has_table_privilege=false para anon y authenticated.
select
  c.relname                              as tabla,
  c.relrowsecurity                       as rls_activa,
  has_table_privilege('anon',          c.oid, 'SELECT') as anon_select,
  has_table_privilege('anon',          c.oid, 'INSERT') as anon_insert,
  has_table_privilege('anon',          c.oid, 'UPDATE') as anon_update,
  has_table_privilege('anon',          c.oid, 'DELETE') as anon_delete,
  has_table_privilege('authenticated', c.oid, 'SELECT') as auth_select,
  has_table_privilege('authenticated', c.oid, 'INSERT') as auth_insert,
  has_table_privilege('authenticated', c.oid, 'UPDATE') as auth_update,
  has_table_privilege('authenticated', c.oid, 'DELETE') as auth_delete
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relname = 'admins';

-- Comprobación 1b — la política RLS de admins debe denegar (qual = false).
select policyname, cmd, roles, qual, with_check
from pg_policies
where schemaname = 'public' and tablename = 'admins';

-- Comprobación 1c — privilegios efectivos considerando herencia y PUBLIC,
-- para public.admins, public.workspace y public.videos.
-- Incluye al pseudo-rol PUBLIC (0) y roles heredados (pg_has_role), porque
-- un GRANT a PUBLIC o la pertenencia a un rol podrían conceder acceso
-- aunque no exista un GRANT directo a anon/authenticated.
-- Esperado:
--   admins    -> todos los *_efectivo = false (RLS false + sin GRANT);
--   workspace/videos -> *_efectivo = true (las políticas RLS conceden SELECT
--                       público y escritura solo a admin; el GRANT de tabla
--                       existe en Supabase para anon/authenticated).
with objetivos(esquema, tabla) as (
  values ('public','admins'), ('public','workspace'), ('public','videos')
),
priv as (
  select unnest(array['SELECT','INSERT','UPDATE','DELETE']::text[]) as p
)
select
  o.esquema,
  o.tabla,
  c.relrowsecurity                                              as rls_activa,
  priv.p                                                        as privilegio,
  has_table_privilege('anon',          format('%I.%I', o.esquema, o.tabla), priv.p) as anon_efectivo,
  has_table_privilege('authenticated', format('%I.%I', o.esquema, o.tabla), priv.p) as authenticated_efectivo,
  has_table_privilege('public',        format('%I.%I', o.esquema, o.tabla), priv.p) as public_efectivo,
  pg_has_role('anon',          'authenticated', 'member')       as anon_hereda_authenticated,
  pg_has_role('authenticated', 'anon',          'member')       as authenticated_hereda_anon
from objetivos o
join priv on true
join pg_class c     on c.relname = o.tabla
join pg_namespace n on n.oid = c.relnamespace and n.nspname = o.esquema
order by o.tabla, privilegio;

-- Comprobación 1d — DESGLOSE DE POLÍTICAS POR ROL para workspace y videos.
-- Solo lectura. Muestra, por tabla y operación: los roles a los que aplica
-- cada política, sus expresiones USING y WITH CHECK, la configuración RLS
-- de la tabla y una marca de políticas de escritura que NO exigen is_admin().
--
-- 1d-a: configuración RLS de ambas tablas + nº de políticas.
select
  n.nspname            as esquema,
  c.relname            as tabla,
  c.relrowsecurity     as rls_activa,
  c.relforcerowsecurity as rls_forzada,
  count(p.polname)     as num_politicas
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
left join pg_policy p on p.polrelid = c.oid
where n.nspname = 'public' and c.relname in ('workspace', 'videos')
group by n.nspname, c.relname, c.relrowsecurity, c.relforcerowsecurity
order by c.relname;

-- 1d-b: todas las políticas por tabla/operación, con roles y expresiones.
-- (1) operaciones SELECT/INSERT/UPDATE/DELETE; (2) rol(es) de cada política;
-- (3) USING y WITH CHECK; (4) posible escritura sin is_admin().
select
  p.schemaname,
  p.tablename,
  p.policyname,
  p.cmd                                       as operacion,
  p.roles                                     as roles_aplicados,
  coalesce(p.qual,       '(sin USING)')       as using_expr,
  coalesce(p.with_check, '(sin WITH CHECK)')  as check_expr,
  case
    when p.cmd not in ('INSERT', 'UPDATE', 'DELETE', 'ALL') then false
    when p.cmd = 'INSERT' then coalesce(p.with_check, '') not like '%is_admin%'
    when p.cmd = 'DELETE' then coalesce(p.qual, '')       not like '%is_admin%'
    else (coalesce(p.qual, '') not like '%is_admin%'
          or coalesce(p.with_check, '') not like '%is_admin%')
  end                                         as escritura_sin_is_admin
from pg_policies p
where p.schemaname = 'public' and p.tablename in ('workspace', 'videos')
order by p.tablename,
  case p.cmd when 'SELECT' then 1 when 'INSERT' then 2 when 'UPDATE' then 3
             when 'DELETE' then 4 else 5 end,
  p.policyname;

-- 1d-c: expansión por rol — qué rol puede leer/escribir en la práctica.
-- Replica la combinación OR de políticas para anon y authenticated:
-- una operación se permite si existe una política cuyo roles incluya
-- al rol (o a public) y cuya expresión rige. Para escritura se exige
-- además que la política incluya is_admin() (autenticación admin real).
with ops(operacion) as (values ('SELECT'),('INSERT'),('UPDATE'),('DELETE')),
tablas(tabla)      as (values ('workspace'),('videos')),
roles(rol)         as (values ('anon'),('authenticated'))
select
  t.tabla,
  r.rol,
  o.operacion,
  coalesce(bool_or(
    p.policyname is not null
    and (
      r.rol = any(p.roles)
      or 'public' = any(p.roles)
    )
    and case
          when o.operacion = 'INSERT' then coalesce(p.with_check, '') like '%is_admin%'
          when o.operacion = 'DELETE' then coalesce(p.qual, '')       like '%is_admin%'
          else (coalesce(p.qual, '') like '%is_admin%'
                 and coalesce(p.with_check, '') like '%is_admin%')
        end
    and case o.operacion
          when 'SELECT' then p.cmd in ('SELECT', 'ALL')
          else p.cmd in (o.operacion, 'ALL')
        end
  ), false) as permitido_como_admin
from tablas t
cross join roles r
cross join ops o
left join pg_policies p
  on p.schemaname = 'public' and p.tablename = t.tabla
group by t.tabla, r.rol, o.operacion
order by t.tabla,
  case o.operacion when 'SELECT' then 1 when 'INSERT' then 2
                   when 'UPDATE' then 3 else 4 end,
  r.rol;

-- ------------------------------------------------------------
-- 2. Helper is_admin() — identifica al administrador por su JWT.
--    - security definer + search_path vacío: lee public.admins sin
--      pasar por su RLS y sin depender de rutas resolubles por el
--      usuario; no recibe parámetros que el cliente pueda inyectar.
--    - auth.uid() sale del token firmado por Supabase: no falsificable.
--    - No permite auto-otorgarse privilegios: solo LEE admins; para
--      entrar en la lista hay que insertar una fila, y la API está
--      cerrada por admins_no_api_access.
-- ------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admins
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- Comprobación 2b — PROPIETARIO de public.is_admin() (control de SECURITY DEFINER).
-- Una función SECURITY DEFINER se ejecuta con los privilegios de su
-- propietario. Como admins_no_api_access y los REVOKE cierran public.admins
-- a anon/authenticated, el propietario debe seguir siendo un rol con acceso
-- (en Supabase, 'postgres'). Si el owner fuera anon/authenticated, is_admin()
-- no podría leer admins y la seguridad quedaría mal definida.
-- La identidad del propietario se comprueba DIRECTAMENTE comparando su
-- nombre con 'postgres'; NO se usa la membresía en el rol 'postgres'
-- (pg_has_role) como sustituto. Tres datos INDEPENDIENTES:
--   (a) propietario            -> quién es el owner (debe ser 'postgres');
--   (b) security_definer       -> que la función sigue siendo DEFINER;
--   (c) owner_puede_leer_admins-> acceso efectivo del owner a public.admins.
-- Esperado cuando está bien configurada:
--   propietario = 'postgres', owner_es_postgres = true,
--   security_definer = true, owner_puede_leer_admins = true.
-- Si owner_es_postgres = false o owner_puede_leer_admins = false -> REVISAR
-- y, si procede, descomentar el ALTER de abajo.
select
  p.proname                                         as funcion,
  pg_get_userbyid(p.proowner)                       as propietario,
  (pg_get_userbyid(p.proowner) = 'postgres')        as owner_es_postgres,
  p.prosecdef                                       as security_definer,
  has_table_privilege(pg_get_userbyid(p.proowner), 'public.admins', 'SELECT') as owner_puede_leer_admins
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public' and p.proname = 'is_admin';

-- Si el owner NO es postgres (owner_es_postgres = false, o
-- owner_puede_leer_admins = false), reasignar el propietario con el bloque de
-- abajo (descomentar y ejecutar como superusuario/admin del proyecto).
-- Efecto: is_admin() pasará a ejecutarse con los privilegios de 'postgres',
-- que conserva acceso a public.admins; NO cambia la definición, el resultado
-- ni los permisos de ejecución concedidos por GRANT. Apropiado en este entorno
-- porque todas las tablas/funciones del proyecto pertenecen al rol standard
-- de Supabase.
-- alter function public.is_admin() owner to postgres;

-- Comprobación 2c — confirmación tras el ALTER (mismo formato que 2b).
-- Ejecutar solo si se aplicó el ALTER anterior.
-- select pg_get_userbyid(p.proowner) as propietario,
--        (pg_get_userbyid(p.proowner) = 'postgres') as owner_es_postgres,
--        p.prosecdef as security_definer,
--        has_table_privilege(pg_get_userbyid(p.proowner), 'public.admins', 'SELECT') as owner_puede_leer_admins
-- from pg_proc p
-- join pg_namespace n on n.oid = p.pronamespace
-- where n.nspname = 'public' and p.proname = 'is_admin';

-- ------------------------------------------------------------
-- 3. Alta del administrador (NO borra nada; idempotente).
--    Ejecutar DESPUÉS de crear el usuario en Authentication.
--    >>> Reemplaza el correo y descomenta TODO este bloque. <<<
--    Incluye comprobación explícita de que existe exactamente la
--    fila del usuario esperado; si no, avisa de que el alta falló.
-- ------------------------------------------------------------
-- do $$
-- declare
--   v_email text := 'cmstcm.practicante@iberostartheclub.com';   -- <<< correo del admin
--   v_uid   uuid;
--   v_rows  integer;
-- begin
--   select id into v_uid from auth.users where email = v_email;
--
--   if v_uid is null then
--     raise exception
--       'ALTA NO COMPLETADA: no existe ningun usuario en auth.users con email %', v_email;
--   end if;
--
--   insert into public.admins (user_id)
--   select v_uid
--   on conflict (user_id) do nothing;
--
--   select count(*) into v_rows from public.admins where user_id = v_uid;
--
--   if v_rows <> 1 then
--     raise exception
--       'ALTA NO COMPLETADA: se esperaba 1 fila en admins para %, hay %', v_email, v_rows;
--   end if;
--
--   raise notice 'ALTA CONFIRMADA: % (uid %) es administrador autorizado.', v_email, v_uid;
-- end $$;

-- Comprobación 3 — estado final del alta (ver el aviso "ALTA CONFIRMADA").
-- Esperado: 1 para el correo esperado y 0 para cualquier otro.
-- select u.email, a.user_id is not null as es_admin
-- from auth.users u
-- left join public.admins a on a.user_id = u.id
-- order by es_admin desc nulls last, u.email;

-- ============================================================
-- 4. workspace — lectura pública, escritura solo admin
--    Se reemplazan workspace_insert/update/delete_authenticated.
--    workspace_select_public NO se toca.
-- ============================================================
-- Comprobación 4a — ANTES: políticas actuales de public.workspace.
-- Debe aparecer workspace_select_public + las 3 *_authenticated.
select tablename, policyname, cmd, roles
from pg_policies
where schemaname = 'public' and tablename = 'workspace'
order by cmd;

drop policy if exists workspace_insert_authenticated on public.workspace;
create policy workspace_insert_admin
  on public.workspace for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists workspace_update_authenticated on public.workspace;
create policy workspace_update_admin
  on public.workspace for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists workspace_delete_authenticated on public.workspace;
create policy workspace_delete_admin
  on public.workspace for delete
  to authenticated
  using (public.is_admin());

-- ============================================================
-- 5. videos — lectura pública, escritura solo admin
--    Se reemplazan videos_insert/update/delete_authenticated.
--    videos_select_public NO se toca.
-- ============================================================
-- Comprobación 5a — ANTES: políticas actuales de public.videos.
select tablename, policyname, cmd, roles
from pg_policies
where schemaname = 'public' and tablename = 'videos'
order by cmd;

drop policy if exists videos_insert_authenticated on public.videos;
create policy videos_insert_admin
  on public.videos for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists videos_update_authenticated on public.videos;
create policy videos_update_admin
  on public.videos for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists videos_delete_authenticated on public.videos;
create policy videos_delete_admin
  on public.videos for delete
  to authenticated
  using (public.is_admin());

-- ============================================================
-- 6. storage.objects — lectura pública, escritura solo admin
--    Se reemplazan las 6 políticas de escritura permisivas (insert/
--    update/delete de workspace-images y videos).
--    Las 4 políticas *_select_public NO se tocan.
-- ============================================================
-- 0a. INVENTARIO (solo lectura).
select
  policyname,
  cmd,
  roles,
  coalesce(qual, '(sin USING)') as using_expr,
  coalesce(with_check, '(sin WITH CHECK)') as check_expr,
  case
    when coalesce(qual,'') || coalesce(with_check,'') like '%workspace-images%'
      then 'workspace-images'
    when coalesce(qual,'') || coalesce(with_check,'') like '%videos%'
      then 'videos'
    else '(bucket no identificado / ALL / otro)'
  end as bucket_probable
from pg_policies
where schemaname = 'storage'
  and tablename = 'objects'
order by cmd, policyname;

-- 0b. LIMPIEZA SELECTIVA de storage.objects (solo escritura permisiva de los
--     buckets 'workspace-images' y 'videos'). Se ejecuta ANTES de los
--     drop/create de abajo. Guardarraíles:
--       * Solo actúa sobre schemaname='storage' AND tablename='objects'.
--       * NO toca políticas SELECT (lectura pública intacta).
--       * Valida roles de la política (debe incluir public o authenticated).
--       * Valida el alcance (cmd/roles/expresiones) vía pg_policies + pg_policy
--         y normaliza la expresión con pg_get_expr (no solo texto crudo).
--       * Aborta si algo no es inequívoco (bucket no identificable, política
--         ALL, rol inesperado, o permisiva sin admin).
--     Identificación del bucket por expresión normalizada (pg_get_expr) y
--     contraste con el literal 'workspace-images' / 'videos'.
--     ATOMICIDAD: todo el proceso va dentro de un bloque con manejador de
--     excepciones; si cualquier guardarraíl o aborto salta, se revierten
--     también los DROP ya ejecutados (la excepción se vuelve a lanzar).
do $$
declare
  pol          record;
  v_ambiguas   int := 0;
  v_all        int := 0;
  v_borradas   int := 0;
  v_resumen    text := '';
  v_inventario text := '';
  v_expr       text;
  v_bucket     text;
  v_roles_txt  text;
begin
  begin  -- subbloque transaccional (revertido si hay excepción)
  -- INVENTARIO PREVIO: lista todo y valida ALCANCE + ROLES + RLS.
  raise notice '--- 0b INVENTARIO PREVIO (storage.objects, escritura) ---';
  for pol in
    select
      pp.polname                                                as policyname,
      case pp.polcmd
        when 'r' then 'SELECT' when 'a' then 'INSERT'
        when 'w' then 'UPDATE' when 'd' then 'DELETE' else 'ALL'
      end                                                       as cmd,
      case
        when 0 = any(pp.polroles) then 'public (todos los roles)'
        else pg_get_userbyid(pp.polroles[1])
      end                                                       as roles,
      pg_get_expr(pp.polqual,      pp.polrelid)                 as qual,
      pg_get_expr(pp.polwithcheck, pp.polrelid)                 as with_check
    from pg_policy pp
    join pg_class c     on c.oid = pp.polrelid
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'storage' and c.relname = 'objects'
      and pp.polcmd in ('a', 'w', 'd', '*')
  loop
    v_expr := coalesce(pol.qual, '') || ' | ' || coalesce(pol.with_check, '');
    v_bucket := case
      when v_expr like '%workspace-images%' then 'workspace-images'
      when v_expr like '%videos%'           then 'videos'
      else '(no identificable)'
    end;
    raise notice '0b inventario: % [% , roles=% , bucket=%] qual=% | check=%',
      pol.policyname, pol.cmd, pol.roles, v_bucket, pol.qual, pol.with_check;
  end loop;
  raise notice '--- fin inventario ---';

  -- (1) Guardarraíl: políticas ALL sin admin -> detener (pueden dar lectura).
  select count(*) into v_all
  from pg_policy pp
  join pg_class c     on c.oid = pp.polrelid
  join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'storage' and c.relname = 'objects'
    and pp.polcmd = '*'
    and coalesce(pg_get_expr(pp.polqual, pp.polrelid), '')       not like '%is_admin%'
    and coalesce(pg_get_expr(pp.polwithcheck, pp.polrelid), '') not like '%is_admin%';

  if v_all > 0 then
    raise exception
      'ABORTADO 0b: % política(s) ALL permisiva(s) en storage.objects. No se eliminan automáticamente (pueden dar lectura y escritura). Revisa el inventario de 0b/0a y decide manualmente: identifica su bucket y separa lectura de escritura antes de actuar.', v_all;
  end if;

  -- (2) Guardarraíl: escrituras permisivas de bucket no identificable -> abortar.
  select count(*) into v_ambiguas
  from pg_policy pp
  join pg_class c     on c.oid = pp.polrelid
  join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'storage' and c.relname = 'objects'
    and pp.polcmd in ('a', 'w', 'd')
    and coalesce(pg_get_expr(pp.polqual, pp.polrelid), '')       not like '%workspace-images%'
    and coalesce(pg_get_expr(pp.polwithcheck, pp.polrelid), '') not like '%workspace-images%'
    and coalesce(pg_get_expr(pp.polqual, pp.polrelid), '')       not like '%videos%'
    and coalesce(pg_get_expr(pp.polwithcheck, pp.polrelid), '') not like '%videos%'
    and coalesce(pg_get_expr(pp.polqual, pp.polrelid), '')       not like '%is_admin%'
    and coalesce(pg_get_expr(pp.polwithcheck, pp.polrelid), '') not like '%is_admin%';

  if v_ambiguas > 0 then
    raise exception
      'ABORTADO 0b: % política(s) de escritura en storage.objects sin bucket identificable ni is_admin. Revisa el inventario y decide manualmente.', v_ambiguas;
  end if;

  -- (3) Borrado selectivo: INSERT/UPDATE/DELETE de workspace-images o videos,
  --     sin is_admin(), con rol public o authenticated. Nunca SELECT ni ALL.
  for pol in
    select
      pp.polname                                                as policyname,
      case pp.polcmd
        when 'a' then 'INSERT' when 'w' then 'UPDATE' else 'DELETE'
      end                                                       as cmd,
      (0 = any(pp.polroles))                                    as incluye_public,
      ('authenticated'::regrole = any(pp.polroles))             as incluye_authenticated,
      pg_get_expr(pp.polqual,      pp.polrelid)                 as qual,
      pg_get_expr(pp.polwithcheck, pp.polrelid)                 as with_check
    from pg_policy pp
    join pg_class c     on c.oid = pp.polrelid
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'storage' and c.relname = 'objects'
      and pp.polcmd in ('a', 'w', 'd')
      and (
        coalesce(pg_get_expr(pp.polqual,      pp.polrelid), '') like '%workspace-images%'
        or coalesce(pg_get_expr(pp.polwithcheck, pp.polrelid), '') like '%workspace-images%'
        or coalesce(pg_get_expr(pp.polqual,      pp.polrelid), '') like '%videos%'
        or coalesce(pg_get_expr(pp.polwithcheck, pp.polrelid), '') like '%videos%'
      )
      and coalesce(pg_get_expr(pp.polqual,      pp.polrelid), '')       not like '%is_admin%'
      and coalesce(pg_get_expr(pp.polwithcheck, pp.polrelid), '') not like '%is_admin%'
  loop
    -- Validación de ROLES: solo se elimina si aplica a public o authenticated.
    if not (pol.incluye_public or pol.incluye_authenticated) then
      raise exception
        'ABORTADO 0b: la política % (roles no public/authenticated) no se elimina automáticamente. Revísala manualmente.', pol.policyname;
    end if;

    -- Validación de BUCKET inequívoca.
    v_expr := coalesce(pol.qual, '') || ' | ' || coalesce(pol.with_check, '');
    if v_expr like '%workspace-images%' then
      v_bucket := 'workspace-images';
    elsif v_expr like '%videos%' then
      v_bucket := 'videos';
    else
      raise exception
        'ABORTADO 0b: la política % no referencia inequívocamente a workspace-images ni videos.', pol.policyname;
    end if;

    v_roles_txt := case
      when pol.incluye_public then 'public'
      when pol.incluye_authenticated then 'authenticated'
      else '(otro)'
    end;

    raise notice '0b: SE ELIMINARÁ % [cmd=%, roles=%, bucket=%] porque permite escritura sin is_admin()',
      pol.policyname, pol.cmd, v_roles_txt, v_bucket;

    execute format('drop policy if exists %I on storage.objects', pol.policyname);
    v_borradas := v_borradas + 1;
    v_resumen  := v_resumen || format('%s [%s,%s] ', pol.policyname, pol.cmd, v_bucket);
  end loop;

  raise notice 'Etapa 0b: total eliminadas = % ; detalle = %', v_borradas, v_resumen;

  exception
    when others then
      raise notice 'Etapa 0b ABORTADA: % — se revierten todos los DROP de esta etapa.', sqlerrm;
      raise;
  end;
end $$;

-- Comprobación 6a — ANTES: políticas de los buckets en storage.objects.
select policyname, cmd, roles, qual, with_check
from pg_policies
where schemaname = 'storage' and tablename = 'objects'
  and (
    policyname like 'workspace_images%'
    or policyname like 'videos_bucket%'
  )
order by cmd, policyname;

drop policy if exists workspace_images_insert_authenticated on storage.objects;
create policy workspace_images_insert_admin
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'workspace-images' and public.is_admin());

drop policy if exists workspace_images_update_authenticated on storage.objects;
create policy workspace_images_update_admin
  on storage.objects for update
  to authenticated
  using (bucket_id = 'workspace-images' and public.is_admin())
  with check (bucket_id = 'workspace-images' and public.is_admin());

drop policy if exists workspace_images_delete_authenticated on storage.objects;
create policy workspace_images_delete_admin
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'workspace-images' and public.is_admin());

drop policy if exists videos_bucket_insert_authenticated on storage.objects;
create policy videos_bucket_insert_admin
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'videos' and public.is_admin());

drop policy if exists videos_bucket_update_authenticated on storage.objects;
create policy videos_bucket_update_admin
  on storage.objects for update
  to authenticated
  using (bucket_id = 'videos' and public.is_admin())
  with check (bucket_id = 'videos' and public.is_admin());

drop policy if exists videos_bucket_delete_authenticated on storage.objects;
create policy videos_bucket_delete_admin
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'videos' and public.is_admin());

-- ============================================================
-- 7. Verificación rápida (solo lectura)
-- ============================================================
-- 7a. Estado esperado por objeto (workspace y videos).
-- Lista TODAS las políticas de estas tablas, sin filtrar por nombre,
-- para detectar también nombres inesperados. Debe mostrar por tabla:
-- *_select_public (SELECT) + 3 *_admin (INSERT, UPDATE, DELETE). Ninguna *_authenticated.
select tablename, policyname, cmd, roles
from pg_policies
where schemaname = 'public'
  and tablename in ('workspace', 'videos')
order by tablename, cmd, policyname;

-- 7b. Estado esperado en storage.objects.
-- Lista TODAS las políticas del bucket, sin filtrar por nombre.
-- Debe mostrar por bucket: *_select_public (SELECT) + 3 *_admin
-- (INSERT, UPDATE, DELETE). Ninguna *_authenticated.
select policyname, cmd, roles
from pg_policies
where schemaname = 'storage' and tablename = 'objects'
  and (
    qual like '%workspace-images%'  or with_check like '%workspace-images%'
    or qual like '%videos%'         or with_check like '%videos%'
  )
order by cmd, policyname;

-- 7c. Detección de ESCRITURA PERMISIVA / INESPERADA (revisión manual).
--     NO decide por el nombre. Lista TODAS las políticas de escritura
--     (INSERT/UPDATE/DELETE/ALL) de las tablas public.workspace,
--     public.videos y de TODA la tabla storage.objects (todos los buckets).
--     Sin filtrar por nombre de política ni por contenido de qual/with_check.
--     Distingue las expresiones según la operación:
--       - INSERT: usa WITH CHECK (no tiene USING).
--       - DELETE: usa USING (no tiene WITH CHECK).
--       - UPDATE/ALL: usan USING y WITH CHECK.
--     La columna revisar_manualmente solo MARCA candidatos: una política
--     marcada es sospechosa y requiere inspección humana, pero un resultado
--     vacío NO se interpreta como garantía de seguridad por sí solo.
select
  p.schemaname,
  p.tablename,
  p.policyname,
  p.cmd,
  p.roles,
  coalesce(p.qual,       '(sin USING)')      as using_expr,
  coalesce(p.with_check, '(sin WITH CHECK)') as check_expr,
  case p.cmd
    when 'INSERT' then coalesce(p.with_check, '') not like '%is_admin%'
    when 'DELETE' then coalesce(p.qual, '')       not like '%is_admin%'
    else /* UPDATE, ALL */ (
      coalesce(p.qual, '')       not like '%is_admin%'
      or coalesce(p.with_check, '') not like '%is_admin%'
    )
  end as revisar_manualmente
from pg_policies p
where (
    (p.schemaname = 'public'  and p.tablename in ('workspace', 'videos'))
    or (p.schemaname = 'storage' and p.tablename = 'objects')
  )
  and p.cmd in ('INSERT', 'UPDATE', 'DELETE', 'ALL')
order by p.schemaname, p.tablename, p.cmd, p.policyname;

-- 7c-bis. Igual que 7c, sin la columna de marcado: listado plano para
-- revisión manual de TODAS las políticas de escritura de workspace,
-- videos y storage.objects (sin filtrar por nombre ni por expresión).
-- No existe un "0 filas" que garantice seguridad: hay que leer cada fila.
select p.schemaname, p.tablename, p.policyname, p.cmd, p.roles,
       coalesce(p.qual, '(sin USING)')         as using_expr,
       coalesce(p.with_check, '(sin WITH CHECK)') as check_expr
from pg_policies p
where (
    (p.schemaname = 'public'  and p.tablename in ('workspace', 'videos'))
    or (p.schemaname = 'storage' and p.tablename = 'objects')
  )
  and p.cmd in ('INSERT', 'UPDATE', 'DELETE', 'ALL')
order by p.schemaname, p.tablename, p.cmd, p.policyname;

-- 7d. Confirmación de que la LECTURA PÚBLICA sigue presente.
-- Debe devolver 4 filas: 1 SELECT por tabla/bucket
-- (workspace, videos, workspace-images y videos). Todas con
-- USING que no exige admin (lectura de huéspedes). Si falta alguna
-- fila, los lectores perderían acceso: revisar.
select p.schemaname, p.tablename, p.policyname, p.cmd, p.roles,
       coalesce(p.qual, '(sin USING)') as using_expr
from pg_policies p
where p.cmd = 'SELECT'
  and (
    (p.schemaname = 'public'  and p.tablename in ('workspace', 'videos'))
    or (p.schemaname = 'storage' and p.tablename = 'objects'
        and (p.qual like '%workspace-images%'  or p.with_check like '%workspace-images%'
             or p.qual like '%videos%'         or p.with_check like '%videos%'))
  )
order by p.schemaname, p.tablename, p.policyname;

-- 7e. Confirmación de is_admin() para el administrador.
-- Ejecutar con la sesión del admin desde la app (no aquí).
-- select public.is_admin();
