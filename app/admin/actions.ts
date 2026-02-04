'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function uploadCV(formData: FormData) {
    console.log("Server Action: uploadCV started");
    const file = formData.get('cv') as File;
    if (!file) return { success: false, error: 'No file provided' };

    try {
        console.log("Uploading CV:", file.name);

        // 1. Upload to Cloudinary
        const publicUrl = await uploadToCloudinary(file, 'portfolio');

        // 2. Update site_settings table via Prisma
        await prisma.siteSettings.upsert({
            where: { id: 1 },
            update: { cvUrl: publicUrl, updatedAt: new Date() },
            create: { id: 1, cvUrl: publicUrl }
        });

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
        console.log("Uploading Image:", file.name);

        const publicUrl = await uploadToCloudinary(file, 'portfolio');

        return { success: true, url: publicUrl };
    } catch (error: any) {
        console.error('Error uploading image:', error);
        return { success: false, error: error.message || 'Upload failed' };
    }
}
