'use server';

import { prisma } from './db';
import { uploadToCloudinary } from './cloudinary';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RecordInput = Record<string, any>;

// -----------------------------------------------------------------------------
// CONTACT
// -----------------------------------------------------------------------------

export async function submitContactForm(data: {
    name: string
    email: string
    phone: string
    subject: string
    message: string
}) {
    return await prisma.contactMessage.create({
        data: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            subject: data.subject,
            message: data.message,
        }
    });
}

export async function getContactMessages() {
    return await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function deleteContactMessage(id: string) {
    await prisma.contactMessage.delete({ where: { id } });
    return true;
}

// -----------------------------------------------------------------------------
// BLOG (Posts & Comments)
// -----------------------------------------------------------------------------

export async function getComments(postSlug: string) {
    return await prisma.comment.findMany({
        where: { postSlug },
        orderBy: { createdAt: 'desc' }
    });
}

export async function createComment(data: {
    post_slug: string
    name: string
    email: string
    content: string
}) {
    return await prisma.comment.create({
        data: {
            postSlug: data.post_slug,
            name: data.name,
            email: data.email,
            content: data.content
        }
    });
}

export async function getPosts() {
    return await prisma.post.findMany({
        orderBy: { publishedAt: 'desc' }
    });
}

export async function getPost(slug: string) {
    return await prisma.post.findUnique({
        where: { slug }
    });
}

export async function createPost(post: RecordInput) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await prisma.post.create({ data: post as any });
}

export async function updatePost(id: string, updates: RecordInput) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await prisma.post.update({ where: { id }, data: updates as any });
}

export async function deletePost(id: string) {
    await prisma.post.delete({ where: { id } });
    return true;
}

// -----------------------------------------------------------------------------
// PROJECTS
// -----------------------------------------------------------------------------

export async function getProjects() {
    return await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function getProject(slug: string) {
    return await prisma.project.findUnique({
        where: { slug }
    });
}

export async function createProject(project: RecordInput) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await prisma.project.create({ data: project as any });
}

export async function updateProject(id: string, updates: RecordInput) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await prisma.project.update({ where: { id }, data: updates as any });
}

export async function deleteProject(id: string) {
    await prisma.project.delete({ where: { id } });
    return true;
}

// -----------------------------------------------------------------------------
// TESTIMONIALS
// -----------------------------------------------------------------------------

export async function getTestimonials(approvedOnly = false) {
    return await prisma.testimonial.findMany({
        where: approvedOnly ? { approved: true } : undefined,
        orderBy: { createdAt: 'desc' }
    });
}

export async function createTestimonial(testimonial: RecordInput) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await prisma.testimonial.create({ data: testimonial as any });
}

export async function deleteTestimonial(id: string) {
    await prisma.testimonial.delete({ where: { id } });
    return true;
}

export async function updateTestimonialStatus(id: string, approved: boolean) {
    await prisma.testimonial.update({
        where: { id },
        data: { approved }
    });
    return true;
}

export async function updateTestimonial(id: string, updates: RecordInput) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await prisma.testimonial.update({ where: { id }, data: updates as any });
}

// -----------------------------------------------------------------------------
// SITE SETTINGS
// -----------------------------------------------------------------------------

export async function getSiteSettings() {
    let settings = await prisma.siteSettings.findUnique({
        where: { id: 1 }
    });

    if (!settings) {
        settings = await prisma.siteSettings.create({
            data: { id: 1 }
        });
    }
    return settings;
}

export async function updateSiteSettings(settings: { cvUrl?: string | null }) {
    return await prisma.siteSettings.upsert({
        where: { id: 1 },
        update: { ...settings, updatedAt: new Date() },
        create: { id: 1, ...settings }
    });
}

// -----------------------------------------------------------------------------
// STORAGE (Adapter to Cloudinary)
// -----------------------------------------------------------------------------

export async function uploadFile(file: File, bucket: string = 'portfolio') {
    return await uploadToCloudinary(file, bucket);
}
