
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import * as dotenv from 'dotenv'

dotenv.config()

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    const legacyData = {
        projects: [
            {
                "title": "AI Task Manager",
                "slug": "ai-task-manager",
                "description": "Smart task management application that uses AI to prioritize and categorize daily work.",
                "category": "Full Stack",
                "image_url": "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2070&auto=format&fit=crop",
                "tech": ["React", "OpenAI API", "Node.js"],
                "github_link": "https://github.com/example/ai-task"
            },
            {
                "title": "Finance Dashboard",
                "slug": "finance-dashboard",
                "description": "Real-time financial data visualization dashboard for tracking investments and crypto.",
                "category": "Frontend",
                "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
                "tech": ["Next.js", "D3.js", "Framer Motion"],
                "github_link": "https://github.com/example/finance"
            }
        ],
        posts: [
            {
                "title": "Oracle 19c Database Workshop: Mastering Performance Tuning",
                "slug": "oracle-19c-workshop-performance",
                "excerpt": "A deep dive into Oracle 19c architecture, automatic indexing, and performance tuning strategies for enterprise databases.",
                "content": "# Oracle 19c Workshop: Mastering Performance Tuning...",
                "image_url": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2021&auto=format&fit=crop"
            },
            {
                "title": "Mastering Tailwind CSS: From Basics to Advanced",
                "slug": "mastering-tailwind-css",
                "excerpt": "Learn how to build responsive, dark-mode ready interfaces rapidly using utility-first CSS classes.",
                "content": "# Mastering Tailwind CSS...",
                "image_url": "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop"
            },
            {
                "title": "Building Modern Web Apps with Next.js 15",
                "slug": "building-modern-apps-nextjs-15",
                "excerpt": "Explore the power of Server Components, the App Router, and server actions in the latest Next.js ecosystem.",
                "content": "# Building Modern Web Apps with Next.js 15...",
                "image_url": "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop"
            }
        ],
        testimonials: [
            {
                "name": "Emily Davis",
                "role": "Founder",
                "company": "DesignStudio",
                "content": "Creative, technical, and professional. The best developer we have worked with this year.",
                "rating": 5,
                "image_url": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
            },
            {
                "name": "Michael Chen",
                "role": "CTO",
                "company": "StartupX",
                "content": "Incredible attention to detail. Our user engagement increased by 40% after the redesign.",
                "rating": 5,
                "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
            },
            {
                "name": "Sarah Johnson",
                "role": "Product Manager",
                "company": "TechCorp",
                "content": "An absolute pleasure to work with. Delivered the project ahead of schedule and the code quality was exceptional.",
                "rating": 5,
                "image_url": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
            }
        ],
        contactMessages: [
            {
                "sender": "Wilfredo",
                "email": "melgar.wilfredo@gmail.com",
                "subject": "Proyecto desarrollo web",
                "message": "queremos tu apoyo en un proyecto de desarrollo"
            }
        ],
        siteSettings: {
            "cv_url": "https://ohddwghzljvelfktkgdn.supabase.co/storage/v1/object/public/cv/cv.pdf"
        }
    }

    console.log('Restoring projects...')
    for (const project of legacyData.projects) {
        await prisma.project.upsert({
            where: { slug: project.slug },
            update: {
                title: project.title,
                description: project.description,
                category: project.category,
                imageUrl: project.image_url,
                tech: project.tech,
                githubLink: project.github_link
            },
            create: {
                title: project.title,
                slug: project.slug,
                description: project.description,
                category: project.category,
                imageUrl: project.image_url,
                tech: project.tech,
                githubLink: project.github_link
            }
        })
        console.log(`- Project: ${project.title}`)
    }

    console.log('Restoring posts...')
    for (const post of legacyData.posts) {
        await prisma.post.upsert({
            where: { slug: post.slug },
            update: {
                title: post.title,
                content: post.content,
                excerpt: post.excerpt,
                imageUrl: post.image_url
            },
            create: {
                title: post.title,
                slug: post.slug,
                content: post.content,
                excerpt: post.excerpt,
                imageUrl: post.image_url
            }
        })
        console.log(`- Post: ${post.title}`)
    }

    console.log('Restoring testimonials...')
    for (const testimonial of legacyData.testimonials) {
        await prisma.testimonial.create({
            data: {
                name: testimonial.name,
                role: testimonial.role,
                company: testimonial.company,
                content: testimonial.content,
                rating: testimonial.rating,
                imageUrl: testimonial.image_url,
                approved: true
            }
        })
        console.log(`- Testimonial: ${testimonial.name}`)
    }

    console.log('Restoring contact messages...')
    for (const msg of legacyData.contactMessages) {
        await prisma.contactMessage.create({
            data: {
                name: msg.sender,
                email: msg.email,
                subject: msg.subject,
                message: msg.message
            }
        })
        console.log(`- Message from: ${msg.sender}`)
    }

    console.log('Restoring site settings...')
    await prisma.siteSettings.upsert({
        where: { id: 1 },
        update: { cvUrl: legacyData.siteSettings.cv_url },
        create: { id: 1, cvUrl: legacyData.siteSettings.cv_url }
    })
    console.log('- Site settings updated.')

    console.log('Restoration complete!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
        await pool.end()
    })
