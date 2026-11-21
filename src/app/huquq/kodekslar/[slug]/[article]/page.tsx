import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { lawService } from '@/features/law/services/lawService';
import { DocumentViewer } from '@/features/law/components/DocumentViewer';

interface ArticlePageProps {
  params: Promise<{ slug: string; article: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug, article: articleParam } = await params;
  const doc = await lawService.getCodeBySlug(slug);

  if (!doc) {
    return {
      title: 'Hujjat topilmadi — ILMORA',
    };
  }

  const articleData = await lawService.getArticle(slug, articleParam);
  const articleTitle = articleData ? articleData.article.title : articleParam;

  return {
    title: `${articleTitle} | ${doc.title} — ILMORA`,
    description: articleData
      ? `${doc.title}, ${articleData.article.title}: ${articleData.article.content.slice(0, 160)}...`
      : doc.description,
    openGraph: {
      title: `${articleTitle} | ${doc.title} — ILMORA`,
      description: articleData ? articleData.article.content.slice(0, 160) : doc.description,
      type: 'article',
    },
  };
}

async function ArticleContentLoader({ params }: ArticlePageProps) {
  const { slug, article: articleParam } = await params;
  const articleData = await lawService.getArticle(slug, articleParam);

  // A document may exist while a requested article does not. Treat that as a
  // missing page instead of rendering the document with no article selected.
  if (!articleData) {
    notFound();
  }

  return (
    <DocumentViewer
      document={articleData.document}
      initialArticleId={articleData.article.id}
    />
  );
}

export default function ArticleDeepLinkPage(props: ArticlePageProps) {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Modda yuklanmoqda...</div>}>
      <ArticleContentLoader {...props} />
    </Suspense>
  );
}
