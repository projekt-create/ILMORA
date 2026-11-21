import { MetadataRoute } from 'next';
import { OFFICIAL_CODES_CATALOG } from '@/features/law/data/codesCatalog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ilmora.uz';

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/huquq`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/huquq/kodekslar`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/huquq/saqlanganlar`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
  ];

  const codeRoutes = OFFICIAL_CODES_CATALOG.map((code) => ({
    url: `${baseUrl}/huquq/kodekslar/${code.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: code.isPopular ? 0.9 : 0.8,
  }));

  return [...staticRoutes, ...codeRoutes];
}
