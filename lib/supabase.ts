import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase Environment Variables! Check .env.local or Vercel Settings.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
        fetch: (url, options) => {
            return fetch(url, {
                ...options,
                cache: 'no-store',
            })
        }
    }
})

// Contact form submission
export async function submitContactForm(data: {
    name: string
    email: string
    phone: string // New field
    subject: string
    message: string
}) {
    const { data: result, error } = await supabase
        .from('contact_messages')
        .insert([
            {
                name: data.name,
                email: data.email,
                phone: data.phone, // Map new field
                subject: data.subject,
                message: data.message,
                created_at: new Date().toISOString(),
            },
        ])
        .select()

    if (error) throw error
    return result
}

// Get all contact messages (public access)
export async function getContactMessages() {
    const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}

// Delete a contact message
export async function deleteContactMessage(id: string) {
    const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id)

    if (error) throw error
    return true
}

// Get comments for a post
export async function getComments(postSlug: string) {
    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_slug', postSlug)
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}

// Create a new comment
export async function createComment(data: {
    post_slug: string
    name: string
    email: string
    content: string
}) {
    const { data: result, error } = await supabase
        .from('comments')
        .insert([
            {
                post_slug: data.post_slug,
                name: data.name,
                email: data.email,
                content: data.content,
                created_at: new Date().toISOString(),
            },
        ])
        .select()

    if (error) throw error
    return result
}

// Get all posts
export async function getPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('published_at', { ascending: false })

    if (error) throw error
    return data
}

// Get single post by slug
export async function getPost(slug: string) {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error) throw error
    return data
}

// -----------------------------------------------------------------------------
// PROJECTS
// -----------------------------------------------------------------------------

export async function getProjects() {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}

export async function getProject(slug: string) {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error) throw error
    return data
}

export async function createProject(project: any) {
    const { data, error } = await supabase
        .from('projects')
        .insert([project])
        .select()
        .single()

    if (error) throw error
    return data
}

export async function updateProject(id: string, updates: any) {
    const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

    if (error) throw error
    return data
}

export async function deleteProject(id: string) {
    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

    if (error) throw error
    return true
}

// -----------------------------------------------------------------------------
// TESTIMONIALS
// -----------------------------------------------------------------------------

export async function getTestimonials(approvedOnly = false) {
    let query = supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })

    if (approvedOnly) {
        query = query.eq('approved', true)
    }

    const { data, error } = await query

    if (error) throw error
    return data
}

export async function createTestimonial(testimonial: any) {
    const { data, error } = await supabase
        .from('testimonials')
        .insert([testimonial])
        .select()
        .single()

    if (error) throw error
    return data
}

export async function deleteTestimonial(id: string) {
    const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)

    if (error) throw error
    return true
}

export async function updateTestimonialStatus(id: string, approved: boolean) {
    const { error } = await supabase
        .from('testimonials')
        .update({ approved })
        .eq('id', id)

    if (error) throw error
    return true
}

// -----------------------------------------------------------------------------
// SITE SETTINGS (CV, etc.)
// -----------------------------------------------------------------------------

export async function getSiteSettings() {
    const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single()

    if (error && error.code !== 'PGRST116') throw error // Ignore "Row not found"
    return data
}

export async function updateSiteSettings(settings: any) {
    // Upsert (update or insert if not exists) for ID 1
    const { data, error } = await supabase
        .from('site_settings')
        .upsert({ id: 1, ...settings, updated_at: new Date().toISOString() })
        .select()
        .single()

    if (error) throw error
    return data
}

// -----------------------------------------------------------------------------
// STORAGE
// -----------------------------------------------------------------------------

export async function uploadFile(file: File, bucket: string = 'resume', path?: string) {
    const fileName = path || `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;

    const { data, error } = await supabase
        .storage
        .from(bucket)
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (error) throw error;

    const { data: { publicUrl } } = supabase
        .storage
        .from(bucket)
        .getPublicUrl(fileName);

    return publicUrl;
}
