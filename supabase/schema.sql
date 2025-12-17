-- Create the table for contact messages
create table public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  subject text not null,
  message text not null
);

-- Enable Row Level Security (RLS)
alter table public.contact_messages enable row level security;

-- Create policies
-- Allow anyone to insert messages (for the contact form)
create policy "Allow public to insert messages"
on public.contact_messages
for insert
to anon
with check (true);

-- Allow anyone (with the anon key) to view messages (for the admin dashboard)
-- Note: In a production app, you should restrict this to authenticated admins.
create policy "Allow public to view messages"
on public.contact_messages
for select
to anon
using (true);

-- Allow anyone (with the anon key) to delete messages (for the admin dashboard)
create policy "Allow public to delete messages"
on public.contact_messages
for delete
to anon
using (true);

-- Create the table for blog comments
create table public.comments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  post_slug text not null,
  name text not null,
  email text not null,
  content text not null
);

-- Enable Row Level Security (RLS)
alter table public.comments enable row level security;

-- Policies for comments
create policy "Allow public to view comments"
on public.comments
for select
to anon
using (true);

create policy "Allow public to insert comments"
on public.comments
for insert
to anon
with check (true);

-- Create the table for blog posts
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  slug text not null,
  excerpt text not null,
  content text not null,
  image_url text,
  published_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.posts enable row level security;

-- Policies for posts
create policy "Allow public to view posts"
on public.posts
for select
to anon
using (true);

create policy "Allow public to insert posts"
on public.posts
for insert
to anon
with check (true);

create policy "Allow public to update posts"
on public.posts
for update
to anon
using (true);

create policy "Allow public to delete posts"
on public.posts
for delete
to anon
using (true);

-- Create table for testimonials
create table public.testimonials (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  role text not null,
  company text,
  content text not null,
  rating integer default 5 not null,
  image_url text
);

-- Enable RLS for testimonials
alter table public.testimonials enable row level security;

-- Policies for testimonials
create policy "Allow public to view testimonials"
on public.testimonials for select to anon using (true);

create policy "Allow public to manage testimonials"
on public.testimonials for all to anon using (true) with check (true);

-- Create table for projects
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  slug text not null,
  description text not null,
  category text not null,
  image_url text,
  tech text[] default '{}',
  link text,
  github_link text
);

-- Enable RLS for projects
alter table public.projects enable row level security;

-- Policies for projects
create policy "Allow public to view projects"
on public.projects for select to anon using (true);

create policy "Allow public to manage projects"
on public.projects for all to anon using (true) with check (true);

-- Create table for site settings (CV, etc.)
create table public.site_settings (
  id integer default 1 primary key,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  cv_url text
);

-- Enable RLS for site_settings
alter table public.site_settings enable row level security;

-- Policies for site_settings
create policy "Allow public to view site_settings"
on public.site_settings for select to anon using (true);

create policy "Allow public to manage site_settings"
on public.site_settings for all to anon using (true) with check (true);

