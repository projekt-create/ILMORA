import React, { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LAW_CATEGORIES } from '@/features/law/data/categoriesData';
import { lawService } from '@/features/law/services/lawService';
import { CodeCard } from '@/features/law/components/CodeCard';
import { LawCategory } from '@/types';
import { Layers, ChevronRight, BookOpen, ExternalLink } from 'lucide-react';

export function generateStaticParams() {
  return LAW_CATEGORIES.map((c) => ({
    category: c.id,
  }));
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = LAW_CATEGORIES.find((c) => c.id === category);

  if (!cat) {
    return { title: 'Toifa topilmadi — ILMORA' };
  }

  return {
    title: `${cat.nameUz} — ILMORA Qonunchilik Kutubxonasi`,
    description: cat.descriptionUz,
  };
}

async function CategoryContent({ params }: CategoryPageProps) {
  const { category } = await params;
  const cat = LAW_CATEGORIES.find((c) => c.id === category);

  if (!cat) {
    notFound();
  }

  const docs = await lawService.getDocumentsByCategory(category as LawCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link href="/huquq" className="hover:text-blue-600 dark:hover:text-amber-400">
          Huquq
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-slate-900 dark:text-white">
          {cat.nameUz}
        </span>
      </div>

      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-amber-400 text-xs font-bold border border-blue-200 dark:border-slate-700">
          <Layers className="w-4 h-4 text-amber-500" />
          <span>Normativ-huquqiy hujjatlar toifasi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 dark:text-white">
          {cat.nameUz}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          {cat.descriptionUz}
        </p>
      </div>

      {/* Content */}
      {docs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((doc) => (
            <CodeCard key={doc.id} document={doc} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2">
            Ushbu toifadagi barcha hujjatlar Lex.uz davlat portalida jamlangan
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-5">
            {cat.nameUz} to‘plami va yangi qabul qilingan tahrirlar O‘zbekiston Respublikasi Adliya vazirligining &ldquo;Lex.uz&rdquo; yagona axborot tizimida e’lon qilinadi.
          </p>
          <a
            href="https://lex.uz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-900 text-amber-400 hover:brightness-110"
          >
            <span>Lex.uz da qidirish</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  );
}

export default function CategoryPage(props: CategoryPageProps) {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Toifa yuklanmoqda...</div>}>
      <CategoryContent {...props} />
    </Suspense>
  );
}
