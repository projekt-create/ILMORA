'use client';

import React from 'react';
import Link from 'next/link';
import { Bookmark, Trash2, ArrowRight, FileText, BookOpen } from 'lucide-react';
import { useBookmarksStore } from '@/features/bookmarks/useBookmarksStore';
import { useLanguageStore } from '@/features/language/useLanguageStore';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark, clearBookmarks } = useBookmarksStore();
  const { t } = useLanguageStore();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-wider">
            <Bookmark className="w-4 h-4" />
            <span>Shaxsiy kabinet</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 dark:text-white">
            {t.bookmarks.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {bookmarks.length} ta saqlangan qonun moddasi
          </p>
        </div>

        {bookmarks.length > 0 && (
          <button
            onClick={clearBookmarks}
            className="self-start sm:self-auto text-xs text-red-500 hover:text-red-600 font-semibold px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900/60 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
          >
            {t.bookmarks.clearAll}
          </button>
        )}
      </div>

      {/* Bookmarks List */}
      {bookmarks.length > 0 ? (
        <div className="space-y-3">
          {bookmarks.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <FileText className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-base text-blue-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {b.articleTitle}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 pl-8">
                  {b.documentTitle}
                </p>
                <span className="text-[11px] text-slate-400 pl-8 block">
                  {t.bookmarks.savedOn} {new Date(b.savedAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <Link
                  href={`/huquq/kodekslar/${b.documentSlug}/${b.articleId}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-900 text-amber-400 dark:bg-slate-800 hover:brightness-110 shadow-xs transition-all"
                >
                  <span>Moddani o‘qish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => removeBookmark(b.id)}
                  className="p-2 text-slate-400 hover:text-red-500 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title={t.bookmarks.remove}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2">
            {t.bookmarks.empty}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
            {t.bookmarks.emptyDesc}
          </p>
          <Link
            href="/huquq/kodekslar"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-900 text-amber-400 hover:brightness-110"
          >
            <BookOpen className="w-4 h-4" />
            <span>Kodekslar kutubxonasiga o‘tish</span>
          </Link>
        </div>
      )}
    </div>
  );
}
