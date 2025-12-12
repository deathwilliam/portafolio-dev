'use server';

import { writeClient } from '@/lib/sanity';
import { revalidatePath } from 'next/cache';

export async function createProject(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const imageFile = formData.get('image') as File;
    let imageAsset = null;

    try {
        if (imageFile && imageFile.size > 0) {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const asset = await writeClient.assets.upload('image', buffer, {
                filename: imageFile.name
            });
            imageAsset = {
                _type: 'image',
                asset: {
                    _type: "reference",
                    _ref: asset._id
                }
            };
        }

        const doc = {
            _type: 'project',
            title,
            description,
            category,
            slug: {
                _type: 'slug',
                current: title.toLowerCase().replace(/\s+/g, '-').slice(0, 96) + '-' + Date.now(),
            },
            tech: ['Next.js', 'React'], // Default tech
            image: imageAsset,
        };

        await writeClient.create(doc);
        revalidatePath('/admin');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Error creating project:', error);
        return { success: false, error: 'Failed to create project' };
    }
}




export async function deleteProject(id: string) {
    try {
        await writeClient.delete(id);
        revalidatePath('/admin');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Error deleting project:', error);
        return { success: false, error: 'Failed to delete project' };
    }
}

export async function updateProject(formData: FormData) {
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const imageFile = formData.get('image') as File;

    try {
        const patch = writeClient.patch(id).set({
            title,
            description,
            category,
            // Optional: update slug or keep original. Updating ensures it matches new title.
            slug: {
                _type: 'slug',
                current: title.toLowerCase().replace(/\s+/g, '-').slice(0, 96) + '-' + Date.now(),
            },
        });

        if (imageFile && imageFile.size > 0) {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const asset = await writeClient.assets.upload('image', buffer, {
                filename: imageFile.name
            });
            patch.set({
                image: {
                    _type: 'image',
                    asset: {
                        _type: "reference",
                        _ref: asset._id
                    }
                }
            });
        }

        await patch.commit();
        revalidatePath('/admin');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Error updating project:', error);
        return { success: false, error: 'Failed to update project' };
    }
}

export async function getProjectsFromAdmin() {
    try {
        const query = `*[_type == "project"] | order(_createdAt desc){
            _id,
            title,
            description,
            _createdAt,
            "imageUrl": image.asset->url,
            category,
            tech
        }`;
        const projects = await writeClient.fetch(query);
        return projects;
    } catch (error) {
        console.error('Error fetching admin projects:', error);
        return [];
    }
}

export async function uploadCV(formData: FormData) {
    const file = formData.get('cv') as File;
    if (!file) return { success: false, error: 'No file provided' };

    try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const asset = await writeClient.assets.upload('file', buffer, {
            filename: file.name
        });

        await writeClient.createOrReplace({
            _id: 'siteSettings',
            _type: 'siteSettings',
            cv: {
                _type: 'file',
                asset: {
                    _type: "reference",
                    _ref: asset._id
                }
            }
        });

        revalidatePath('/admin');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Error uploading CV:', error);
        return { success: false, error: 'Upload failed' };
    }
}

export async function getSiteSettings() {
    try {
        return await writeClient.fetch(`*[_type == "siteSettings"][0]{
            "cvUrl": cv.asset->url
        }`);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return null;
    }
}
