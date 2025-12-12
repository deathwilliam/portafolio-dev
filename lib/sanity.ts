import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Client for reading (public)
export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: true,
})

// Client for writing (admin)
export const writeClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: object) {
    return builder.image(source)
}

// Fetch all projects
export async function getProjects() {
    return client.fetch(`*[_type == "project"] | order(order asc, _createdAt desc) {
        ...,
        "imageUrl": image.asset->url
    }`)
}

// Fetch featured projects
export async function getFeaturedProjects() {
    return client.fetch(`*[_type == "project" && featured == true] | order(order asc) {
        ...,
        "imageUrl": image.asset->url
    }`)
}

export async function getAdminProjects() {
    return writeClient.fetch(
        `*[_type == "project"] | order(_createdAt desc){
            _id,
            title,
            _createdAt,
            "imageUrl": image.asset->url,
            category,
            tech
        }`
    )
}

// Fetch single project by slug
export async function getProject(slug: string) {
    return client.fetch(`*[_type == "project" && slug.current == $slug][0] {
        ...,
        "imageUrl": image.asset->url
    }`, { slug })
}

// Fetch all blog posts
export async function getBlogPosts() {
    return client.fetch(`*[_type == "blogPost"] | order(publishedAt desc) {
        ...,
        "imageUrl": image.asset->url
    }`)
}

// Fetch single blog post by slug
export async function getBlogPost(slug: string) {
    return client.fetch(`*[_type == "blogPost" && slug.current == $slug][0] {
        ...,
        "imageUrl": image.asset->url
    }`, { slug })
}

// Fetch all testimonials
export async function getTestimonials() {
    return client.fetch(`*[_type == "testimonial"] | order(order asc)`)
}

// Fetch site settings (CV)
export async function getSiteSettings() {
    return client.fetch(`*[_type == "siteSettings"][0]{
        "cvUrl": cv.asset->url
    }`)
}
