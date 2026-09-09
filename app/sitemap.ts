import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://i3.mtmediaai.com',
      lastModified: new Date('2026-09-09'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
