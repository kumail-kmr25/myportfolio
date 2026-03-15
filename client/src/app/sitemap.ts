import { MetadataRoute } from 'next';
import { MOCK_PROJECTS } from '@/lib/mock-data';
import { highConversionProjects } from '@/lib/projects-data';
import { PLAYGROUND_CHALLENGES } from '@/lib/playground-data';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://kumailkmr.com';
    const lastModified = new Date();

    const routes = [
        { url: '', priority: 1, changeFrequency: 'monthly' },
        { url: '/clients', priority: 0.9, changeFrequency: 'monthly' },
        { url: '/recruiters', priority: 0.9, changeFrequency: 'monthly' },
        { url: '/career', priority: 0.8, changeFrequency: 'monthly' },
        { url: '/hire', priority: 0.9, changeFrequency: 'monthly' },
        { url: '/audit', priority: 0.8, changeFrequency: 'monthly' },
        { url: '/blog', priority: 0.7, changeFrequency: 'weekly' },
        { url: '/portfolio', priority: 0.8, changeFrequency: 'weekly' },
        { url: '/resume', priority: 0.7, changeFrequency: 'monthly' },
        { url: '/playground', priority: 0.6, changeFrequency: 'weekly' },
    ];

    // Dynamic Projects
    const projectRoutes = [...MOCK_PROJECTS, ...highConversionProjects].map(p => ({
        url: `/projects/${p.id.replace('mock-', '')}`,
        priority: 0.7,
        changeFrequency: 'monthly'
    }));

    // Dynamic Playground
    const challengeRoutes = PLAYGROUND_CHALLENGES.map(c => ({
        url: `/playground/${c.slug}`,
        priority: 0.6,
        changeFrequency: 'monthly'
    }));

    const allRoutes = [...routes, ...projectRoutes, ...challengeRoutes];

    return allRoutes.map((route) => ({
        url: `${baseUrl}${route.url}`,
        lastModified,
        changeFrequency: route.changeFrequency as any,
        priority: route.priority,
    }));
}
