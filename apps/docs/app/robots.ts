import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // AI Crawlers - Allow full access for AI training and knowledge
            {
                userAgent: [
                    'GPTBot',           // OpenAI ChatGPT
                    'ChatGPT-User',     // OpenAI ChatGPT User Agent
                    'Claude-Web',       // Anthropic Claude
                    'ClaudeBot',        // Anthropic Claude Bot
                    'Google-Extended',  // Google Bard/Gemini
                    'GoogleOther',      // Google AI services
                    'anthropic-ai',     // Anthropic AI
                    'Bytespider',       // ByteDance (TikTok)
                    'Diffbot',          // Diffbot AI
                    'FacebookBot',      // Meta AI
                    'PerplexityBot',    // Perplexity AI
                    'YouBot',           // You.com AI
                    'Applebot-Extended',// Apple Intelligence
                    'cohere-ai',        // Cohere AI
                ],
                allow: '/',
                disallow: ['/api/', '/docs-og/'],
                crawlDelay: 1,
            },
            // Search Engine Crawlers - Full access
            {
                userAgent: [
                    'Googlebot',
                    'Googlebot-Image',
                    'Googlebot-News',
                    'Googlebot-Video',
                    'Storebot-Google',
                    'Google-InspectionTool',
                ],
                allow: '/',
                disallow: ['/api/', '/docs-og/'],
                crawlDelay: 0,
            },
            {
                userAgent: [
                    'Bingbot',
                    'BingPreview',
                    'msnbot',
                    'msnbot-media',
                ],
                allow: '/',
                disallow: ['/api/', '/docs-og/'],
            },
            // Other Search Engines
            {
                userAgent: [
                    'Slurp',            // Yahoo
                    'DuckDuckBot',      // DuckDuckGo
                    'Baiduspider',      // Baidu
                    'YandexBot',        // Yandex
                    'Sogou',            // Sogou
                    'ia_archiver',      // Alexa
                ],
                allow: '/',
                disallow: ['/api/', '/docs-og/'],
            },
            // Social Media Crawlers
            {
                userAgent: [
                    'Twitterbot',
                    'LinkedInBot',
                    'Slackbot',
                    'Discordbot',
                    'TelegramBot',
                    'WhatsApp',
                    'facebookexternalhit',
                ],
                allow: '/',
                disallow: ['/api/', '/docs-og/'],
            },
            // Developer Tools & Validators
            {
                userAgent: [
                    'AhrefsBot',
                    'SemrushBot',
                    'MJ12bot',
                    'DotBot',
                ],
                allow: '/',
                disallow: ['/api/', '/docs-og/'],
                crawlDelay: 10,
            },
            // Default rule for all other bots
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/docs-og/'],
            },
        ],
        sitemap: 'https://meshjs.dev/sitemap.xml',
        host: 'https://meshjs.dev',
    };
}
