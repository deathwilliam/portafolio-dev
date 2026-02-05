import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

const BASE_URL = 'https://portafolio-production-c136.up.railway.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ['es', 'en'];

  // Static pages
  const staticPages = locales.flatMap(locale => [
    {
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]);

  // Dynamic blog posts
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.post.findMany({
      select: { slug: true, publishedAt: true },
      orderBy: { publishedAt: 'desc' },
    });

    blogPages = posts.flatMap(post =>
      locales.map(locale => ({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: post.publishedAt || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    );
  } catch {
    // DB might not be available during build
  }

  return [...staticPages, ...blogPages];
}
