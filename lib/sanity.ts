import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
    return builder.image(source)
}

// Fetch all projects
export async function getProjects() {
    return client.fetch(`*[_type == "project"] | order(order asc, _createdAt desc)`)
}

// Fetch featured projects
export async function getFeaturedProjects() {
    return client.fetch(`*[_type == "project" && featured == true] | order(order asc)`)
}

// Fetch single project by slug
export async function getProject(slug: string) {
    return client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug })
}

// Fetch all blog posts
export async function getBlogPosts() {
    return client.fetch(`*[_type == "blogPost"] | order(publishedAt desc)`)
}

// Fetch single blog post by slug
export async function getBlogPost(slug: string) {
    return client.fetch(`*[_type == "blogPost" && slug.current == $slug][0]`, { slug })
}

// Fetch all testimonials
export async function getTestimonials() {
    return client.fetch(`*[_type == "testimonial"] | order(order asc)`)
}
