import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/docs-og/', '/llms.mdx/', '/llms.txt'],
            },
        ],
        sitemap: 'https://meshjs.dev/sitemap.xml',
    };
}
