import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config({ path: '.env.local' });

import pg from 'pg';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const projects = [
    {
        title: 'Seguridad Empresarial: JWT + MFA en ASP.NET Core',
        slug: 'seguridad-jwt-mfa-aspnet-core',
        category: 'Backend',
        description:
            'Diseño e implementación de una capa de seguridad integral para un sistema de información empresarial desarrollado en ASP.NET Core y SQL Server. El proyecto incluyó: autenticación basada en JSON Web Token (JWT) con middleware de validación, definición de claims y roles, y control de expiración. Implementación de autenticación multifactor (MFA/TOTP) compatible con RFC 6238 y aplicaciones como Google Authenticator, integrada al flujo JWT. Políticas de contraseñas bajo estándares NIST SP 800-63B y OWASP ASVS: complejidad mínima, expiración, historial de las últimas 10 contraseñas, bloqueo automático tras intentos fallidos y recuperación segura con tokens temporales. Hashing con PBKDF2/Argon2 y registro de auditoría completo en SQL Server.',
        tech: [
            'ASP.NET Core',
            'C#',
            'SQL Server',
            'JWT',
            'MFA/TOTP',
            'RFC 6238',
            'OWASP ASVS',
            'NIST SP 800-63B',
            'PBKDF2',
            'Argon2',
        ],
        link: null,
        githubLink: null,
        imageUrl: '/projects/seguridad.png', // Assuming we might add this later or it's a placeholder
    },
    {
        title: 'Factura Premium DTE - El Salvador',
        slug: 'factura-premium-dte',
        category: 'Full Stack',
        description:
            'Sistema integral de facturación electrónica certificado por el Ministerio de Hacienda de El Salvador. Soporta los 11 tipos de DTE oficiales, generación automática de JSON, firma digital y comprobantes PDF. Incluye módulos de gastos, reportes, gestión de equipo y roles de usuario.',
        tech: [
            'Next.js',
            'Prisma',
            'PostgreSQL',
            'Cloudinary',
            'Firma Digital',
            'JSON Standard',
            'QR Code',
        ],
        link: 'https://facturapremium.com',
        githubLink: null,
        imageUrl: '/projects/facturapremium.png',
    },
];

async function main() {
    console.log('Seeding projects...');
    for (const project of projects) {
        const result = await prisma.project.upsert({
            where: { slug: project.slug },
            update: {
                title: project.title,
                description: project.description,
                category: project.category,
                tech: project.tech,
                link: project.link,
                githubLink: project.githubLink,
                imageUrl: project.imageUrl,
            },
            create: project,
        });
        console.log(`✓ Project "${result.title}" (${result.id})`);
    }
    console.log('Done.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
