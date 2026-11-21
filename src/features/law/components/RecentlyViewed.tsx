'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, BookOpen } from 'lucide-react';
import { useBookmarksStore } from '@/features/bookmarks/useBookmarksStore';
import { useLanguageStore } from '@/features/language/useLanguageStore';

export function RecentlyViewed() {
  const { history, clearHistory } = useBookmarksStore();
  const { t } = useLanguageStore();

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-500" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            {t.home.recentlyViewed}
          </h3>
        </div>
        <button
          onClick={clearHistory}
          className="text-[11px] text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
        >
          {t.search.clearHistory}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {history.slice(0, 4).map((item, idx) => {
          const href = item.articleId
            ? `/huquq/kodekslar/${item.documentSlug}/${item.articleId}`
            : `/huquq/kodekslar/${item.documentSlug}`;

          return (
            <Link
              key={idx}
              href={href}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-amber-50/50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 transition-colors group flex items-start gap-2.5"
            >
              <BookOpen className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  {item.documentTitle}
                </p>
                {item.articleId && (
                  <p className="text-[11px] text-slate-400 truncate">
                    {item.articleId}
                  </p>
                )}
                <span className="text-[10px] text-slate-400 block mt-1">
                  {new Date(item.viewedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
