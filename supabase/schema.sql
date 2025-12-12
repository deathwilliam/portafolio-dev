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
