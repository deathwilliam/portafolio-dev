-- Create a new bucket 'resume' if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('resume', 'resume', true)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow anyone to select/view files from 'resume' bucket
CREATE POLICY "Public Resume View"
ON storage.objects FOR SELECT
USING ( bucket_id = 'resume' );

-- Policy to allow anyone (anon) to upload files to 'resume' bucket
CREATE POLICY "Public Resume Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'resume' );

-- Policy to allow updates (if needed for overwriting)
CREATE POLICY "Public Resume Update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'resume' );
