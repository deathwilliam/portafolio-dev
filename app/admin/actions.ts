'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

// Initialize Supabase client for server-side usage
// We can't import from @/lib/supabase because that might be set up for client-side
// Initialize Supabase client helper
function getSupabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    if (!supabaseUrl || !supabaseKey) {
        throw new Error("Missing Supabase env vars");
    }
    return createClient(supabaseUrl, supabaseKey);
}

export async function uploadCV(formData: FormData) {
    console.log("Server Action: uploadCV started");
    const file = formData.get('cv') as File;
    if (!file) return { success: false, error: 'No file provided' };

    try {
        const supabase = getSupabase();
        const fileName = `cv-${Date.now()}.pdf`;

        console.log("Uploading CV:", fileName);
        // 1. Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from('resume')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (uploadError) {
            console.error('Supabase Storage Error:', uploadError);
            throw new Error("Storage Error: " + uploadError.message);
        }

        // 2. Get Public URL
        const { data: { publicUrl } } = supabase
            .storage
            .from('resume')
            .getPublicUrl(fileName);

        // 3. Update site_settings table
        const { error: dbError } = await supabase
            .from('site_settings')
            .upsert({
                id: 1,
                cv_url: publicUrl,
                updated_at: new Date().toISOString()
            });

        if (dbError) {
            console.error('Database Error:', dbError);
            throw new Error("DB Error: " + dbError.message);
        }

        revalidatePath('/admin');
        revalidatePath('/');
        return { success: true };
    } catch (error: any) {
        console.error('Error uploading CV:', error);
        return { success: false, error: error.message || 'Upload failed' };
    }
}

export async function uploadImage(formData: FormData) {
    console.log("Server Action: uploadImage started");
    const file = formData.get('image') as File;
    if (!file) return { success: false, error: 'No file provided' };

    try {
        const supabase = getSupabase();
        // Sanitize filename
        const fileName = `img-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;

        console.log("Uploading Image:", fileName);

        const { data, error } = await supabase
            .storage
            .from('resume')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error("Storage Error (Image):", error);
            throw error;
        }

        const { data: { publicUrl } } = supabase
            .storage
            .from('resume')
            .getPublicUrl(fileName);

        return { success: true, url: publicUrl };
    } catch (error: any) {
        console.error('Error uploading image:', error);
        return { success: false, error: error.message || 'Upload failed' };
    }
}
