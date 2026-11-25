import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SolutionDetailClient from '@/components/solutions/SolutionDetailClient';
import { SOLUTIONS } from '@/lib/solutionsData';

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const spec = SOLUTIONS.find((s) => s.slug === slug);
  if (!spec) {
    return { title: 'Solution Not Found | Arbizu Labs' };
  }
  return {
    title: spec.title,
    description: spec.metaDesc,
    alternates: { canonical: `https://arbizulabs.com/solutions/${spec.slug}` },
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spec = SOLUTIONS.find((s) => s.slug === slug);
  if (!spec) notFound();

  return <SolutionDetailClient spec={spec} />;
}
