import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const casesDir = path.join(process.cwd(), 'src/data/cases');
  const blogDir = path.join(process.cwd(), 'src/data/blog');
  
  let caseUrls: MetadataRoute.Sitemap = [];
  let blogUrls: MetadataRoute.Sitemap = [];
  
  try {
    if (fs.existsSync(casesDir)) {
      const caseFiles = fs.readdirSync(casesDir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
      caseUrls = caseFiles.map(file => {
        const slug = file.replace(/\.mdx?$/, '');
        return {
          url: `https://arbizulabs.com/cases/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        };
      });
    }

    if (fs.existsSync(blogDir)) {
      const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
      blogUrls = blogFiles.map(file => {
        const slug = file.replace(/\.mdx?$/, '');
        return {
          url: `https://arbizulabs.com/blog/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        };
      });
    }
  } catch (error) {
    console.error("Error leyendo directorios para sitemap", error);
  }

  return [
    {
      url: 'https://arbizulabs.com',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: 'https://arbizulabs.com/cases',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: 'https://arbizulabs.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
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
      priority: 0.8,
    },
    {
      url: 'https://arbizulabs.com/security',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://arbizulabs.com/status',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: 'https://arbizulabs.com/whitepaper',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    ...caseUrls,
    ...blogUrls
  ];
}
