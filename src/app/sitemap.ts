import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const casesDir = path.join(process.cwd(), 'src/data/cases');
  let caseUrls: MetadataRoute.Sitemap = [];
  
  try {
    if (fs.existsSync(casesDir)) {
      const caseFiles = fs.readdirSync(casesDir).filter(f => f.endsWith('.mdx'));
      caseUrls = caseFiles.map(file => {
        const slug = file.replace('.mdx', '');
        return {
          url: `https://arbizulabs.com/cases/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        };
      });
    }
  } catch (error) {
    console.error("Error leyendo directorio de casos para sitemap", error);
  }

  return [
    {
      url: 'https://arbizulabs.com',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: 'https://arbizulabs.com/cases',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: 'https://arbizulabs.com/pricing',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://arbizulabs.com/booking',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    ...caseUrls
  ];
}
