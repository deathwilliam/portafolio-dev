
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
    console.log('Seeding projects...')

    const projects = [
        {
            title: 'E-commerce Platform',
            slug: 'e-commerce-platform',
            description: 'A comprehensive online store built with Next.js, Stripe, and Prisma. Features include product management, shopping cart, and secure checkout.',
            category: 'Web Development',
            tech: ['Next.js', 'TypeScript', 'Prisma', 'Stripe', 'Tailwind CSS'],
            imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop',
            githubLink: 'https://github.com/deathwilliam/e-commerce-demo'
        },
        {
            title: 'AI Task Manager',
            slug: 'ai-task-manager',
            description: 'An intelligent task management system that uses OpenAI to analyze task priority and suggest optimal schedules.',
            category: 'Artificial Intelligence',
            tech: ['React', 'Node.js', 'OpenAI API', 'PostgreSQL', 'Framer Motion'],
            imageUrl: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?q=80&w=1000&auto=format&fit=crop',
            githubLink: 'https://github.com/deathwilliam/ai-tasks'
        },
        {
            title: 'Real-time Weather Dashboard',
            slug: 'weather-dashboard',
            description: 'A dynamic dashboard providing live weather updates, historical data charts, and severe weather alerts across the globe.',
            category: 'Data Visualization',
            tech: ['Vue.js', 'D3.js', 'OpenWeather API', 'Firebase'],
            imageUrl: 'https://images.unsplash.com/photo-1504608510435-9199827503ef?q=80&w=1000&auto=format&fit=crop',
            githubLink: 'https://github.com/deathwilliam/weather-live'
        }
    ]

    for (const project of projects) {
        const created = await prisma.project.upsert({
            where: { slug: project.slug },
            update: project,
            create: project
        })
        console.log(`Created/Updated project: ${created.title}`)
    }

    console.log('Seeding complete!')
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
