'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  ExternalLink,
} from 'lucide-react';
import { LegalDocument } from '@/types';
import { useLanguageStore } from '@/features/language/useLanguageStore';

interface CodeCardProps {
  document: LegalDocument;
}

export function CodeCard({ document }: CodeCardProps) {
  const { language, t } = useLanguageStore();

  const title = language === 'ru' && document.titleRu ? document.titleRu : document.title;
  const description = language === 'ru' && document.descriptionRu ? document.descriptionRu : document.description;

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:shadow-xl hover:border-amber-500/40 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            {t.codes.statusAmalda}
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            {document.actNumber}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-blue-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Meta & Button */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
          <div className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            <span>{document.totalArticles} {t.codes.articlesCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{document.adoptedDate}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <Link
            href={`/huquq/kodekslar/${document.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-900 text-amber-400 dark:bg-slate-800 dark:text-amber-400 hover:brightness-110 shadow-xs transition-all"
          >
            <span>{t.codes.readCode}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <a
            href={document.lexUzUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
            title="Lex.uz rasmiy manbasi"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
