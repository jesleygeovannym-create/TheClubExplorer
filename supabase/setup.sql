-- ============================================================
-- Iberostar THE CLUB — Configuración inicial del proyecto
-- Ejecutar en el SQL Editor del proyecto NUEVO de Supabase.
-- Idempotente: se puede re-ejecutar sin dañar datos.
-- NO ejecutar en el proyecto anterior.
-- ============================================================

-- ------------------------------------------------------------
-- 1. TABLAS (solo las que el código utiliza realmente)
-- ------------------------------------------------------------

-- Workspace: experiencias editoriales (function.js renderWorkspaceCards/save/delete)
create table if not exists public.workspace (
  id uuid primary key default gen_random_uuid(),
  hotel text not null,
  title text not null,
  text text not null default '',
  product text,
  image text,
  created_at timestamptz not null default now()
);

create index if not exists workspace_created_at_idx
  on public.workspace (created_at desc);

-- Videos: fragmentos de máximo 35 segundos (function.js renderVideoCards/save/delete)
create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  hotel text not null,
  title text not null,
  video text not null,
  mime_type text not null default 'video/mp4',
  "start" numeric not null default 0,
  "end" numeric not null default 35,
  created_at timestamptz not null default now(),
  constraint videos_fragment_check check ("end" > "start" and "end" - "start" <= 35)
);

create index if not exists videos_created_at_idx
  on public.videos (created_at desc);

-- Idempotencia: añade el CHECK si la tabla ya existía sin él
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'videos_fragment_check'
  ) then
    alter table public.videos
      add constraint videos_fragment_check
      check ("end" > "start" and "end" - "start" <= 35);
  end if;
end $$;

-- NOTA: no se crea tabla "media360" — ese módulo usa IndexedDB local
-- con imágenes Base64 (function.js openMediaDatabase / database*).
-- NOTA: no se crea tabla "media" — solo existía en probarSupabase(),
-- una función de prueba que nunca se invoca.

-- ------------------------------------------------------------
-- 2. ROW LEVEL SECURITY
--    Lectura pública (los lectores de la revista son anónimos).
--    Escritura solo para administradores autenticados.
-- ------------------------------------------------------------

alter table public.workspace enable row level security;
alter table public.videos enable row level security;

drop policy if exists workspace_select_public on public.workspace;
create policy workspace_select_public
  on public.workspace for select
  using (true);

drop policy if exists workspace_insert_authenticated on public.workspace;
create policy workspace_insert_authenticated
  on public.workspace for insert
  to authenticated
  with check (true);

drop policy if exists workspace_update_authenticated on public.workspace;
create policy workspace_update_authenticated
  on public.workspace for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists workspace_delete_authenticated on public.workspace;
create policy workspace_delete_authenticated
  on public.workspace for delete
  to authenticated
  using (true);

drop policy if exists videos_select_public on public.videos;
create policy videos_select_public
  on public.videos for select
  using (true);

drop policy if exists videos_insert_authenticated on public.videos;
create policy videos_insert_authenticated
  on public.videos for insert
  to authenticated
  with check (true);

drop policy if exists videos_update_authenticated on public.videos;
create policy videos_update_authenticated
  on public.videos for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists videos_delete_authenticated on public.videos;
create policy videos_delete_authenticated
  on public.videos for delete
  to authenticated
  using (true);

-- ------------------------------------------------------------
-- 3. STORAGE — buckets usados por la aplicación
--    workspace-images: subidas desde el formulario Workspace
--    videos:           subidas desde el formulario Vídeos
--    Ambos con lectura pública (getPublicUrl en el código);
--    escritura solo autenticada.
-- ------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('workspace-images', 'workspace-images', true, 10485760,
    array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/heic', 'image/heif']),
  ('videos', 'videos', true, 104857600,
    array['video/mp4', 'video/webm', 'video/quicktime', 'video/x-m4v'])
on conflict (id) do nothing;

-- Políticas de objetos: workspace-images
drop policy if exists workspace_images_select_public on storage.objects;
create policy workspace_images_select_public
  on storage.objects for select
  using (bucket_id = 'workspace-images');

drop policy if exists workspace_images_insert_authenticated on storage.objects;
create policy workspace_images_insert_authenticated
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'workspace-images');

drop policy if exists workspace_images_update_authenticated on storage.objects;
create policy workspace_images_update_authenticated
  on storage.objects for update
  to authenticated
  using (bucket_id = 'workspace-images')
  with check (bucket_id = 'workspace-images');

drop policy if exists workspace_images_delete_authenticated on storage.objects;
create policy workspace_images_delete_authenticated
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'workspace-images');

-- Políticas de objetos: videos
drop policy if exists videos_bucket_select_public on storage.objects;
create policy videos_bucket_select_public
  on storage.objects for select
  using (bucket_id = 'videos');

drop policy if exists videos_bucket_insert_authenticated on storage.objects;
create policy videos_bucket_insert_authenticated
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'videos');

drop policy if exists videos_bucket_update_authenticated on storage.objects;
create policy videos_bucket_update_authenticated
  on storage.objects for update
  to authenticated
  using (bucket_id = 'videos')
  with check (bucket_id = 'videos');

drop policy if exists videos_bucket_delete_authenticated on storage.objects;
create policy videos_bucket_delete_authenticated
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'videos');
