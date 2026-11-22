import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { historyTopics } from '@/features/history/data/historyData';
import { HistoryTopicDetail } from '@/features/history/components/HistoryTopicDetail';

export function generateStaticParams() {
  return historyTopics.map((topic) => ({
    section: topic.section,
    slug: topic.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = historyTopics.find((item) => item.id === slug);
  if (!topic) return { title: 'Mavzu topilmadi — ILMORA Tarix' };
  return {
    title: `${topic.title} (${topic.period}) — ILMORA Tarix`,
    description: topic.summary,
  };
}

export default async function HistoryTopicPage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { slug, section } = await params;
  const topic = historyTopics.find((item) => item.id === slug);

  if (!topic) {
    notFound();
  }

  return <HistoryTopicDetail topic={topic} section={section} />;
}
