import { MetadataRoute } from 'next';
import { source } from '@/lib/source';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://meshjs.dev';
  const currentDate = new Date();

  // Get all documentation pages from the source
  const docPages = source.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: page.url.startsWith('/guides') ? 0.9 : 0.7,
  }));

  // Static pages with high priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/apis`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/react`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  return [...staticPages, ...docPages];
}
