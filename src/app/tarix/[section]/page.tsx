import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Users,
} from 'lucide-react';
import {
  dates,
  historyTopics,
  people,
  sectionMeta,
  type HistorySection,
} from '@/features/history/data/historyData';
import { HistoryMapsView } from '@/features/history/components/HistoryMapsView';
import { HistoryCertificateView } from '@/features/history/components/HistoryCertificateView';
import { HistoryGlossaryView } from '@/features/history/components/HistoryGlossaryView';

export function generateStaticParams() {
  return ['uzbekistan', 'world', 'people', 'dates', 'maps', 'glossary', 'certificate'].map(
    (section) => ({ section })
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const meta = sectionMeta[section as Exclude<HistorySection, 'all'>];
  return {
    title: `${meta?.title ?? 'Tarix'} — ILMORA`,
    description: meta?.description,
  };
}

export default async function HistorySectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const key = section as Exclude<HistorySection, 'all'>;
  const meta = sectionMeta[key];

  if (!meta) {
    notFound();
  }

  const isPeople = key === 'people';
  const isDates = key === 'dates';
  const isGlossary = key === 'glossary';
  const isMaps = key === 'maps';
  const isCertificate = key === 'certificate';
  const topics = historyTopics.filter((item) => item.section === key);

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      {/* Back button */}
      <div>
        <Link
          href="/tarix"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-blue-900 dark:hover:text-amber-400"
        >
          <ArrowLeft className="h-4 w-4" /> Tarix markaziga qaytish
        </Link>
      </div>

      {/* Header */}
      <header className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
          <BookOpen className="h-4 w-4" /> ILMORA TARIX
        </div>
        <h1 className="text-4xl font-black tracking-tight text-blue-950 dark:text-white sm:text-5xl">
          {meta.title}
        </h1>
        <p className="text-base leading-relaxed text-slate-500 dark:text-slate-400 sm:text-lg">
          {meta.description}
        </p>
      </header>

      {/* Content depending on Section */}
      {isMaps ? (
        <HistoryMapsView />
      ) : isCertificate ? (
        <HistoryCertificateView />
      ) : isPeople ? (
        <PeopleGrid />
      ) : isDates ? (
        <DatesList />
      ) : isGlossary ? (
        <HistoryGlossaryView />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {topics.map((topic) => (
            <article
              key={topic.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs transition hover:border-amber-300 dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <div className={`mb-5 h-2 w-20 rounded-full bg-gradient-to-r ${topic.accent}`} />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      {topic.period}
                    </p>
                    <h2 className="mt-2 text-xl font-extrabold text-slate-900 dark:text-white">
                      {topic.title}
                    </h2>
                  </div>
                  {topic.status === 'available' ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                  ) : (
                    <Clock3 className="h-5 w-5 shrink-0 text-slate-400" />
                  )}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {topic.summary}
                </p>

                
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                <span className="text-xs text-slate-400">
                  Manba: {topic.source}
                </span>
                {topic.status === 'available' ? (
                  <Link
                    href={`/tarix/${key}/${topic.id}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-blue-950 px-4 py-2 text-xs font-bold text-amber-300 transition hover:bg-blue-900"
                  >
                    O‘rganish <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-400 dark:bg-slate-800">
                    Tayyorlanmoqda
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

function PeopleGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {people.map((person) => (
        <article
          key={person.id}
          className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900"
        >
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
              <Users className="h-5 w-5" />
            </div>
            <p className="mt-5 text-xs font-bold text-amber-600 dark:text-amber-400">
              {person.years}
            </p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white">
              {person.name}
            </h2>
            <p className="mt-1 text-xs font-bold text-slate-500">{person.role}</p>
            <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {person.summary}
            </p>

            {person.achievements && person.achievements.length > 0 && (
              <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
                <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                  Asosiy xizmatlari:
                </p>
                <ul className="mt-1.5 space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                  {person.achievements.map((ach, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-5 border-t border-slate-100 pt-3 text-[11px] text-slate-400 dark:border-slate-800">
            <a
              href={person.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-blue-700 dark:hover:text-amber-300"
            >
              Manba: {person.source} <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

function DatesList() {
  return (
    <div className="space-y-3">
      {dates.map((item) => (
        <article
          key={item.id}
          className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs transition hover:border-amber-300 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:gap-6"
        >
          <div className="min-w-36 pt-0.5 text-sm font-black text-amber-600 dark:text-amber-400 sm:text-base">
            {item.date}
          </div>
          <div className="border-slate-200 dark:border-slate-700 sm:border-l sm:pl-6">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-extrabold text-slate-900 dark:text-white">{item.title}</h2>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500 dark:bg-slate-800">
                {item.section} · {item.category}
              </span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              {item.summary}
            </p>
            <div className="mt-2 text-[11px] text-slate-400">
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-blue-700 dark:hover:text-amber-300"
              >
                Manba: {item.source} <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}


