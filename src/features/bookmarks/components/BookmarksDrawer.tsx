'use client';

import React from 'react';
import Link from 'next/link';
import { X, Bookmark, Trash2, ArrowRight, FileText } from 'lucide-react';
import { useBookmarksStore } from '../useBookmarksStore';
import { useLanguageStore } from '@/features/language/useLanguageStore';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookmarksDrawer({ isOpen, onClose }: BookmarksDrawerProps) {
  const { bookmarks, removeBookmark, clearBookmarks } = useBookmarksStore();
  const { t } = useLanguageStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs animate-in fade-in-50 duration-200">
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col animate-in slide-in-from-right duration-200"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                {t.bookmarks.title}
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {bookmarks.length} ta saqlangan modda
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarks.length > 0 ? (
            bookmarks.map((b) => (
              <div
                key={b.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:border-amber-500/40 transition-colors group relative"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold text-xs">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{b.articleTitle}</span>
                  </div>
                  <button
                    onClick={() => removeBookmark(b.id)}
                    className="text-slate-400 hover:text-red-500 p-1 rounded-md transition-colors"
                    title={t.bookmarks.remove}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {b.documentTitle}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>
                    {new Date(b.savedAt).toLocaleDateString()}
                  </span>
                  <Link
                    href={`/huquq/kodekslar/${b.documentSlug}/${b.articleId}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-amber-400 hover:underline"
                  >
                    <span>O‘qish</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Bookmark className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                {t.bookmarks.empty}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                {t.bookmarks.emptyDesc}
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {bookmarks.length > 0 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex justify-between items-center">
            <button
              onClick={clearBookmarks}
              className="text-xs text-red-500 hover:underline cursor-pointer"
            >
              {t.bookmarks.clearAll}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-900 dark:bg-slate-800 text-white dark:text-amber-400 rounded-xl text-xs font-semibold hover:brightness-110"
            >
              Yopish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
