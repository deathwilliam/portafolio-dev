const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'n83zg3as',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN, // Necesitas un token con permisos de escritura
    useCdn: false,
});

// Sample testimonials data
const testimonials = [
    {
        _type: 'testimonial',
        name: 'Carlos Rodríguez',
        role: 'CTO',
        company: 'TechStart Inc.',
        content: 'Wilfredo es un desarrollador excepcional. Su habilidad para resolver problemas complejos y entregar soluciones de alta calidad es impresionante. Fue fundamental en el éxito de nuestro proyecto.',
        rating: 5,
        order: 1,
    },
    {
        _type: 'testimonial',
        name: 'María González',
        role: 'Product Manager',
        company: 'Digital Solutions',
        content: 'Trabajar con Wilfredo fue una experiencia fantástica. Su profesionalismo, atención al detalle y capacidad de comunicación hicieron que el proyecto fuera un éxito total.',
        rating: 5,
        order: 2,
    },
    {
        _type: 'testimonial',
        name: 'Juan Pérez',
        role: 'CEO',
        company: 'Innovación Web',
        content: 'Altamente recomendado. Wilfredo no solo cumplió con todas nuestras expectativas, sino que las superó. Su conocimiento técnico y dedicación son incomparables.',
        rating: 5,
        order: 3,
    },
];

// Sample blog posts data
const blogPosts = [
    {
        _type: 'blogPost',
        title: 'Introducción a Next.js 14 y Server Components',
        slug: {
            _type: 'slug',
            current: 'introduccion-nextjs-14-server-components',
        },
        excerpt: 'Descubre las nuevas características de Next.js 14 y cómo los Server Components están revolucionando el desarrollo web moderno.',
        publishedAt: '2024-01-15T10:00:00Z',
        tags: ['Next.js', 'React', 'Web Development'],
    },
    {
        _type: 'blogPost',
        title: 'TypeScript: Mejores prácticas para proyectos escalables',
        slug: {
            _type: 'slug',
            current: 'typescript-mejores-practicas-proyectos-escalables',
        },
        excerpt: 'Aprende cómo estructurar tus proyectos TypeScript para maximizar la escalabilidad y mantenibilidad del código.',
        publishedAt: '2024-02-20T14:30:00Z',
        tags: ['TypeScript', 'Best Practices', 'Architecture'],
    },
    {
        _type: 'blogPost',
        title: 'Optimización de rendimiento en aplicaciones React',
        slug: {
            _type: 'slug',
            current: 'optimizacion-rendimiento-aplicaciones-react',
        },
        excerpt: 'Técnicas avanzadas para mejorar el rendimiento de tus aplicaciones React, incluyendo lazy loading, memoización y code splitting.',
        publishedAt: '2024-03-10T09:15:00Z',
        tags: ['React', 'Performance', 'Optimization'],
    },
];

async function createSampleData() {
    try {
        console.log('🚀 Iniciando creación de datos de ejemplo...\n');

        console.log('📝 Creando testimonios...');
        for (const testimonial of testimonials) {
            try {
                const result = await client.create(testimonial);
                console.log(`  ✅ Testimonial creado: ${testimonial.name} (${result._id})`);
            } catch (err) {
                console.error(`  ❌ Error al crear testimonial de ${testimonial.name}:`, err.message);
            }
        }

        console.log('\n📰 Creando posts de blog...');
        for (const post of blogPosts) {
            try {
                const result = await client.create(post);
                console.log(`  ✅ Post creado: ${post.title} (${result._id})`);
            } catch (err) {
                console.error(`  ❌ Error al crear post "${post.title}":`, err.message);
            }
        }

        console.log('\n✨ ¡Todos los datos de ejemplo han sido creados exitosamente!');
        console.log('\n💡 Recarga tu página en http://localhost:3000 para ver las nuevas secciones.');
    } catch (error) {
        console.error('\n❌ Error general al crear datos:', error);
        console.log('\n⚠️  Asegúrate de tener un SANITY_API_TOKEN configurado en tu archivo .env');
        console.log('   Puedes obtenerlo en: https://www.sanity.io/manage');
    }
}

createSampleData();
