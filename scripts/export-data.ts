
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config()

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('Exporting data...')

    const backup = {
        projects: await prisma.project.findMany(),
        posts: await prisma.post.findMany(),
        testimonials: await prisma.testimonial.findMany(),
        comments: await prisma.comment.findMany(),
        contactMessages: await prisma.contactMessage.findMany(),
        siteSettings: await prisma.siteSettings.findMany(),
        exportedAt: new Date().toISOString()
    }

    const backupPath = path.join(process.cwd(), 'backups', `backup-${new Date().toISOString().split('T')[0]}.json`)

    if (!fs.existsSync(path.join(process.cwd(), 'backups'))) {
        fs.mkdirSync(path.join(process.cwd(), 'backups'))
    }

    fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2))

    console.log(`Data exported successfully to: ${backupPath}`)
    return backupPath
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
