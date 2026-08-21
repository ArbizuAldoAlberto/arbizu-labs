import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import CasesClientView from '@/components/sections/CasesClientView';

export const metadata = {
  title: 'Casos de Estudio & Benchmarks | Arbizu Labs',
  description: 'Desglose técnico de soluciones de arquitectura móvil Offline-First, SaaS B2B y automatizaciones desarrolladas por Arbizu Labs.'
};

export default function CasesPage() {
  const casesDir = path.join(process.cwd(), 'src/data/cases');
  const files = fs.existsSync(casesDir) ? fs.readdirSync(casesDir) : [];
  
  const cases = files
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => {
      const markdownWithMeta = fs.readFileSync(path.join(casesDir, filename), 'utf-8');
      const { data } = matter(markdownWithMeta);
      return {
        slug: filename.replace('.mdx', ''),
        title: data.title,
        industry: data.industry,
        metrics: data.metrics || [],
        stack: data.stack || []
      };
    });

  return <CasesClientView cases={cases} />;
}
