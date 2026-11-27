import type { Metadata } from 'next';
import HashVerifierClient from '@/components/legal/HashVerifierClient';

export const metadata: Metadata = {
  title: 'SHA-256 Integrity Verifier — ARBIZU LABS',
  description: 'Verificador público de huella SHA-256 para reportes PDF y remitos QR offline-first de AgroMarket y Arbizu Labs.',
};

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ h?: string }>;
}) {
  const params = await searchParams;
  return <HashVerifierClient initialHash={typeof params?.h === 'string' ? params.h : ''} />;
}
