import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { lawService } from '@/features/law/services/lawService';
import { OFFICIAL_CODES_CATALOG } from '@/features/law/data/codesCatalog';
import { DocumentViewer } from '@/features/law/components/DocumentViewer';

export function generateStaticParams() {
  return OFFICIAL_CODES_CATALOG.map((code) => ({
    slug: code.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = await lawService.getCodeBySlug(slug);

  if (!doc) {
    return {
      title: 'Hujjat topilmadi — ILMORA',
    };
  }

  return {
    title: `${doc.title} — ILMORA Qonunchilik Kutubxonasi`,
    description: doc.description,
    openGraph: {
      title: `${doc.title} — ILMORA`,
      description: doc.description,
      type: 'article',
    },
  };
}

async function CodeContent({ params }: PageProps) {
  const { slug } = await params;
  const doc = await lawService.getCodeBySlug(slug);

  if (!doc) {
    notFound();
  }

  return <DocumentViewer document={doc} />;
}

export default function CodeDetailPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Hujjat yuklanmoqda...</div>}>
      <CodeContent {...props} />
    </Suspense>
  );
}
