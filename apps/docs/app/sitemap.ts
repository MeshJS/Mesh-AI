import { MetadataRoute } from 'next';
import { source } from '@/lib/source';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://meshjs.dev';
  const currentDate = new Date();

  // Get all documentation pages from the source with granular priorities
  const docPages = source.getPages().map((page) => {
    // Determine priority based on URL structure
    let priority = 0.7; // Default for docs
    let changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly';

    if (page.url.startsWith('/guides')) {
      priority = 0.9; // High priority for guides
      changeFrequency = 'weekly';
    } else if (page.url.startsWith('/apis')) {
      priority = 0.85; // High priority for API docs
      changeFrequency = 'weekly';
    } else if (page.url.startsWith('/react')) {
      priority = 0.85; // High priority for React components
      changeFrequency = 'weekly';
    } else if (page.url.startsWith('/providers')) {
      priority = 0.8; // Good priority for providers
      changeFrequency = 'monthly';
    } else if (page.url.startsWith('/resources')) {
      priority = 0.75; // Medium-high for resources
      changeFrequency = 'monthly';
    }

    return {
      url: `${baseUrl}${page.url}`,
      lastModified: currentDate,
      changeFrequency,
      priority,
    };
  });

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
      priority: 0.95,
    },
    {
      url: `${baseUrl}/apis`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/react`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/providers`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
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

// Generate a dynamic sitemap with automatic last modified dates
export const revalidate = 3600; // Revalidate every hour
