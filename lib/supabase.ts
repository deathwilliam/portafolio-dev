import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Contact form submission
export async function submitContactForm(data: {
    name: string
    email: string
    subject: string
    message: string
}) {
    const { data: result, error } = await supabase
        .from('contact_messages')
        .insert([
            {
                name: data.name,
                email: data.email,
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
