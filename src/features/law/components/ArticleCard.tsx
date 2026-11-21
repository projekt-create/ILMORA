'use client';

import React, { useState } from 'react';
import {
  Bookmark,
  Share2,
  Copy,
  Check,
  AlertCircle,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { ArticleContent, LegalDocument } from '@/types';
import { useBookmarksStore } from '@/features/bookmarks/useBookmarksStore';
import { useLanguageStore } from '@/features/language/useLanguageStore';
import { useReadingPreferences } from '../hooks/useReadingPreferences';
import { lawService } from '../services/lawService';

interface ArticleCardProps {
  article: ArticleContent;
  document: LegalDocument;
  isActive?: boolean;
}

export function ArticleCard({ article, document, isActive }: ArticleCardProps) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarksStore();
  const { language, t } = useLanguageStore();
  const { fontSize, fontStyle } = useReadingPreferences();

  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const bookmarked = isBookmarked(document.slug, article.id);

  const articleTitle = language === 'ru' && article.titleRu ? article.titleRu : article.title;
  const articleContent = language === 'ru' && article.contentRu ? article.contentRu : article.content;
  const parts = language === 'ru' && article.partsRu ? article.partsRu : article.parts;
  const sanctions = language === 'ru' && article.sanctionsRu ? article.sanctionsRu : article.sanctions;
  const notes = language === 'ru' && article.notesRu ? article.notesRu : article.notes;

  const handleCopy = async () => {
    const citation = lawService.formatCitation(
      document.title,
      article.title,
      `${window.location.origin}/huquq/kodekslar/${document.slug}/${article.id}`
    );
    const fullText = `${articleTitle}\n\n${articleContent}\n\n${citation}`;

    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/huquq/kodekslar/${document.slug}/${article.id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${document.shortTitle}: ${articleTitle}`,
          text: articleContent,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
      }
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      // Users can dismiss the native share sheet; no error message is needed.
    }
  };

  const handleBookmark = () => {
    if (bookmarked) {
      removeBookmark(`${document.slug}#${article.id}`);
    } else {
      addBookmark({
        documentSlug: document.slug,
        documentTitle: document.title,
        articleId: article.id,
        articleNumber: article.number,
        articleTitle: article.title,
      });
    }
  };

  const fontClass =
    fontSize === 'sm'
      ? 'text-sm'
      : fontSize === 'lg'
      ? 'text-lg leading-relaxed'
      : fontSize === 'xl'
      ? 'text-xl leading-loose'
      : 'text-base leading-normal';

  const familyClass = fontStyle === 'serif' ? 'font-serif' : 'font-sans';

  return (
    <article
      id={article.id}
      className={`article-card p-6 rounded-2xl border transition-all duration-200 mb-6 scroll-mt-24 ${
        isActive
          ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-500 shadow-md shadow-amber-500/5'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
      }`}
    >
      {/* Header: Title + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <a
            href={`#${article.id}`}
            className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
          >
            §
          </a>
          <h3 className="text-lg sm:text-xl font-extrabold text-blue-950 dark:text-white">
            {articleTitle}
          </h3>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 self-end sm:self-auto no-print">
          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={t.document.copyArticle}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">{t.document.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="hidden sm:inline">{t.document.copyArticle}</span>
              </>
            )}
          </button>

          {/* Bookmark button */}
          <button
            onClick={handleBookmark}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              bookmarked
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={bookmarked ? t.document.bookmarked : t.document.bookmark}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current text-amber-500' : ''}`} />
            <span className="hidden sm:inline">
              {bookmarked ? t.document.bookmarked : t.document.bookmark}
            </span>
          </button>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={t.document.share}
          >
            {shared ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <div className={`text-slate-800 dark:text-slate-200 ${fontClass} ${familyClass} space-y-3`}>
        <p className="leading-relaxed whitespace-pre-line">{articleContent}</p>

        {/* Distinct clauses / parts if provided */}
        {parts && parts.length > 0 && (
          <ul className="space-y-2 mt-3 pl-4 border-l-2 border-slate-200 dark:border-slate-700">
            {parts.map((p, idx) => (
              <li key={idx} className="text-slate-700 dark:text-slate-300">
                {p}
              </li>
            ))}
          </ul>
        )}

        {/* Sanctions / Penalty Box (For Criminal & Administrative law) */}
        {sanctions && sanctions.length > 0 && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 font-bold text-red-700 dark:text-red-400 mb-2">
              <ShieldAlert className="w-4 h-4" />
              <span>{t.document.sanctionsTitle}</span>
            </div>
            <ul className="space-y-1.5 text-red-900 dark:text-red-300">
              {sanctions.map((s, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="font-bold">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Notes / Tahrirlar */}
        {notes && notes.length > 0 && (
          <div className="mt-3 p-3 rounded-xl bg-blue-50/50 dark:bg-slate-800/40 border border-blue-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              {notes.map((n, idx) => (
                <p key={idx}>{n}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer attribution */}
      <div className="mt-4 pt-3 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800/60">
        <span>O‘zR {document.shortTitle}</span>
        <a
          href={article.sourceUrl || document.lexUzUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-amber-500 transition-colors"
        >
          <span>Lex.uz rasmiy manba</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </article>
  );
}
