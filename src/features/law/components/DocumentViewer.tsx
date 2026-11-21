'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Calendar,
  ListOrdered,
  Search,
  SidebarClose,
  SidebarOpen,
  X,
} from 'lucide-react';
import { LegalDocument } from '@/types';
import { ArticleCard } from './ArticleCard';
import { ReadingToolbar } from './ReadingToolbar';
import { useLanguageStore } from '@/features/language/useLanguageStore';
import { useBookmarksStore } from '@/features/bookmarks/useBookmarksStore';

interface DocumentViewerProps {
  document: LegalDocument;
  initialArticleId?: string;
}

function getDocumentArticles(document: LegalDocument) {
  return document.parts?.flatMap((part) => {
    const chapters = part.chapters || (part.sections ? part.sections.flatMap((section) => section.chapters) : []);
    return chapters.flatMap((chapter) => chapter.articles);
  }) || [];
}

function matchesTocSearch(title: string, content: string, query: string) {
  const terms = query
    .toLocaleLowerCase()
    .split(/\s+/)
    .map((term) => term.replace(/[^\p{L}\p{N}]/gu, ''))
    .filter(Boolean);

  if (terms.length === 0) return true;

  const searchableText = `${title} ${content}`
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, '');

  return terms.every((term) => searchableText.includes(term));
}

function DocumentViewerContent({ document, initialArticleId }: DocumentViewerProps) {
  const { language, t } = useLanguageStore();
  const { addToHistory } = useBookmarksStore();

  const [tocOpen, setTocOpen] = useState(true);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [tocFilter, setTocFilter] = useState('');
  const [activeArticleId, setActiveArticleId] = useState<string | undefined>(initialArticleId);
  const [visibleArticleCount, setVisibleArticleCount] = useState(() => {
    const initialArticleIndex = initialArticleId
      ? getDocumentArticles(document).findIndex((article) => article.id === initialArticleId)
      : -1;
    return initialArticleIndex < 0 ? 50 : Math.max(50, Math.ceil((initialArticleIndex + 1) / 50) * 50);
  });
  const [collapsedChapterIds, setCollapsedChapterIds] = useState<Set<string>>(() => new Set());
  const mobileSearchRef = useRef<HTMLInputElement>(null);

  // Add document to reading history on load
  useEffect(() => {
    addToHistory({
      documentSlug: document.slug,
      documentTitle: document.title,
      articleId: initialArticleId,
    });
  }, [document, initialArticleId, addToHistory]);

  // An article might be outside the initial 50-card reader window. Wait for
  // its card to render before scrolling to the selected anchor.
  useEffect(() => {
    if (activeArticleId) {
      const frameId = window.requestAnimationFrame(() => {
        const el = window.document.getElementById(activeArticleId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      return () => window.cancelAnimationFrame(frameId);
    }
  }, [activeArticleId, visibleArticleCount]);

  useEffect(() => {
    if (!mobileTocOpen) return;

    const timeoutId = window.setTimeout(() => mobileSearchRef.current?.focus(), 120);
    return () => window.clearTimeout(timeoutId);
  }, [mobileTocOpen]);

  const docTitle = language === 'ru' && document.titleRu ? document.titleRu : document.title;
  const docDescription = language === 'ru' && document.descriptionRu ? document.descriptionRu : document.description;

  // Flatten articles for display
  const allArticles = getDocumentArticles(document);
  const visibleArticles = allArticles.slice(0, visibleArticleCount);
  const tocResultCount = tocFilter
    ? allArticles.filter((article) => matchesTocSearch(article.title, article.content, tocFilter)).length
    : allArticles.length;

  const toggleChapter = (chapterId: string) => {
    setCollapsedChapterIds((current) => {
      const next = new Set(current);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  };

  const selectArticle = (articleId: string) => {
    const articleIndex = allArticles.findIndex((article) => article.id === articleId);
    if (articleIndex >= visibleArticleCount) {
      setVisibleArticleCount(Math.ceil((articleIndex + 1) / 50) * 50);
    }
    setActiveArticleId(articleId);
  };

  return (
    <div className="w-full">
      {/* Top Banner / Breadcrumbs & Mobile TOC Toggle */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/huquq" className="hover:text-blue-600 dark:hover:text-amber-400">
              {t.nav.law}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/huquq/kodekslar" className="hover:text-blue-600 dark:hover:text-amber-400">
              {t.nav.codes}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-xs">
              {docTitle}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile TOC Button */}
            <button
              onClick={() => setMobileTocOpen(!mobileTocOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-amber-400 border border-blue-200 dark:border-slate-700"
            >
              <ListOrdered className="w-4 h-4" />
              <span>{t.document.toc}</span>
            </button>

            {/* Desktop TOC toggle */}
            <button
              onClick={() => setTocOpen(!tocOpen)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
              title={tocOpen ? t.document.closeToc : t.document.openToc}
            >
              {tocOpen ? <SidebarClose className="w-4 h-4" /> : <SidebarOpen className="w-4 h-4" />}
              <span>{tocOpen ? t.document.closeToc : t.document.openToc}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Column Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6 items-start">
          {/* LEFT COLUMN: Collapsible Table of Contents */}
          {tocOpen && (
            <aside className="hidden lg:flex w-72 shrink-0 sticky top-20 h-[calc(100vh-6rem)] overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex-col no-print">
              <div className="shrink-0 p-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200">
                    <ListOrdered className="w-4 h-4 text-amber-500" />
                    <span>{t.document.toc}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {allArticles.length} modda
                  </span>
                </div>
                {/* Search within TOC */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={tocFilter}
                    onChange={(e) => setTocFilter(e.target.value)}
                    placeholder={t.document.searchToc}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              {/* TOC Items List */}
              <div className="toc-scrollbar min-h-0 flex-1 overflow-y-scroll overscroll-contain p-2 pr-1.5 space-y-3 text-xs">
                {document.parts?.map((part) => {
                  const chapters = part.chapters || (part.sections ? part.sections.flatMap((s) => s.chapters) : []);
                  return (
                    <div key={part.id} className="space-y-1">
                      {!tocFilter && (
                        <div className="font-bold text-slate-900 dark:text-amber-400/90 px-2 py-1 text-[11px] uppercase tracking-wider bg-slate-100/60 dark:bg-slate-800/40 rounded-md">
                          {language === 'ru' && part.titleRu ? part.titleRu : part.title}
                        </div>
                      )}

                      {chapters.map((ch) => {
                        const filteredArticles = ch.articles.filter((art) => matchesTocSearch(art.title, art.content, tocFilter));
                        const isCollapsed = collapsedChapterIds.has(ch.id) && !tocFilter;

                        if (tocFilter && filteredArticles.length === 0) return null;

                        return (
                          <div key={ch.id} className="pl-2 space-y-0.5">
                            <button
                              type="button"
                              onClick={() => toggleChapter(ch.id)}
                              aria-expanded={!isCollapsed}
                              className="flex w-full items-start gap-1 rounded-md py-1 px-2 text-left text-[11px] font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                            >
                              <ChevronRight className={`mt-0.5 h-3 w-3 shrink-0 transition-transform ${isCollapsed ? '' : 'rotate-90'}`} />
                              <span>{language === 'ru' && ch.titleRu ? ch.titleRu : ch.title}</span>
                            </button>
                            {!isCollapsed && (
                              <div className="space-y-0.5 pl-2 border-l border-slate-200 dark:border-slate-800">
                                {filteredArticles.map((art) => {
                                  const isCurrent = activeArticleId === art.id;
                                  return (
                                    <a
                                      key={art.id}
                                      href={`#${art.id}`}
                                      onClick={() => selectArticle(art.id)}
                                      className={`block px-2 py-1 rounded-md transition-colors leading-snug ${
                                        isCurrent
                                          ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold border-l-2 border-amber-500'
                                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                                      }`}
                                    >
                                      {language === 'ru' && art.titleRu ? art.titleRu : art.title}
                                    </a>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </aside>
          )}

          {/* CENTER COLUMN: Document Title, Passport, and Articles */}
          <main className="flex-1 min-w-0">
            {/* Document Header Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 mb-6 shadow-xs">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t.codes.statusAmalda}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-slate-800 text-blue-800 dark:text-amber-400 border border-blue-200 dark:border-slate-700">
                  {document.actNumber}
                </span>
                <span className="text-xs text-slate-400">
                  {document.totalArticles} {t.codes.articlesCount}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 dark:text-white mb-3 tracking-tight">
                {docTitle}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {docDescription}
              </p>

              {/* Reading Toolbar (Font size, family, print) */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <ReadingToolbar />

                <a
                  href={document.lexUzUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
                >
                  <span>{t.document.officialSourceLex}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Articles List */}
            {allArticles.length > 0 ? (
              <div className="space-y-4">
                {visibleArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    document={document}
                    isActive={activeArticleId === article.id}
                  />
                ))}
                {visibleArticleCount < allArticles.length && (
                  <button
                    type="button"
                    onClick={() => setVisibleArticleCount((count) => count + 50)}
                    className="w-full rounded-xl border border-blue-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm font-bold text-blue-700 dark:text-amber-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Yana 50 ta moddani ko‘rsatish ({allArticles.length - visibleArticleCount} ta qoldi)
                  </button>
                )}
              </div>
            ) : (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h4 className="font-bold text-slate-800 dark:text-white mb-2">
                  Ushbu kodeksning to‘liq matni Lex.uz portalida mavjud
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4">
                  {document.description}
                </p>
                <a
                  href={document.lexUzUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-blue-900 text-amber-400 hover:brightness-110"
                >
                  <span>Lex.uz da to‘liq o‘qish</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </main>

          {/* RIGHT COLUMN: Quick Facts & Metadata Sidebar */}
          <aside className="hidden xl:block w-72 shrink-0 sticky top-20 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs text-xs space-y-4 no-print">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
              {t.document.quickFacts}
            </h4>

            <div className="space-y-3">
              <div>
                <span className="text-slate-400 block mb-0.5">{t.document.actNumber}</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {document.actNumber}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">{t.document.status}</span>
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t.codes.statusAmalda}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">{t.document.adoptedDate}</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {document.adoptedDate}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">{t.document.lastUpdate}</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {document.lastUpdatedDate}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">{t.document.totalArticles}</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {document.totalArticles} {t.codes.articlesCount}
                </span>
              </div>

              {document.officialGazette && (
                <div>
                  <span className="text-slate-400 block mb-0.5">Rasmiy nashr:</span>
                  <span className="text-slate-600 dark:text-slate-300">
                    {document.officialGazette}
                  </span>
                </div>
              )}
            </div>

            {/* Official Link Card */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <a
                href={document.lexUzUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-amber-400 font-semibold hover:bg-blue-100 dark:hover:bg-slate-700/80 transition-colors"
              >
                <span>{t.document.officialSourceLex}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Related Codes */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-2">
                {t.document.relatedActs}
              </span>
              <div className="space-y-1.5 text-slate-600 dark:text-slate-400">
                <Link
                  href="/huquq/kodekslar/konstitutsiya"
                  className="block hover:text-amber-500 transition-colors leading-snug"
                >
                  • O‘zbekiston Konstitutsiyasi
                </Link>
                <Link
                  href="/huquq/kodekslar/jinoyat-kodeksi"
                  className="block hover:text-amber-500 transition-colors leading-snug"
                >
                  • Jinoyat kodeksi
                </Link>
                <Link
                  href="/huquq/kodekslar/fuqarolik-kodeksi"
                  className="block hover:text-amber-500 transition-colors leading-snug"
                >
                  • Fuqarolik kodeksi
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Table of Contents Drawer */}
      {mobileTocOpen && (
        <div className="fixed inset-0 z-50 flex bg-slate-950/60 backdrop-blur-xs lg:hidden animate-in fade-in-50 duration-150">
          <div className="relative h-full w-[88%] max-w-sm bg-white p-4 shadow-2xl dark:bg-slate-900 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                <ListOrdered className="w-4 h-4 text-amber-500" />
                <div>
                  <span className="block">{t.document.toc}</span>
                  <span className="block text-[10px] font-medium text-slate-400">{allArticles.length} modda</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileTocOpen(false)}
                aria-label={t.document.closeToc}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="relative mb-3 shrink-0">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                ref={mobileSearchRef}
                value={tocFilter}
                onChange={(event) => setTocFilter(event.target.value)}
                placeholder="Modda raqami yoki so‘zni yozing..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-9 text-sm text-slate-900 outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              {tocFilter && (
                <button
                  type="button"
                  onClick={() => setTocFilter('')}
                  aria-label="Qidiruvni tozalash"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="mb-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>{tocFilter ? `“${tocFilter}” bo‘yicha` : 'Barcha moddalar'}</span>
              <span className="font-semibold text-amber-600 dark:text-amber-400">{tocResultCount} ta</span>
            </div>

            <div className="toc-scrollbar min-h-0 flex-1 overflow-y-scroll overscroll-contain pr-1.5 text-xs">
              {document.parts?.map((part) => {
                const chapters = part.chapters || (part.sections ? part.sections.flatMap((section) => section.chapters) : []);
                return (
                  <div key={part.id} className="mb-3 space-y-1">
                    {!tocFilter && (
                      <div className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:bg-slate-800 dark:text-amber-400">
                        {language === 'ru' && part.titleRu ? part.titleRu : part.title}
                      </div>
                    )}

                    {chapters.map((chapter) => {
                      const matchingArticles = chapter.articles.filter((article) => matchesTocSearch(article.title, article.content, tocFilter));
                      const isCollapsed = collapsedChapterIds.has(chapter.id) && !tocFilter;

                      if (tocFilter && matchingArticles.length === 0) return null;

                      return (
                        <div key={chapter.id} className="space-y-1">
                          <button
                            type="button"
                            onClick={() => toggleChapter(chapter.id)}
                            aria-expanded={!isCollapsed}
                            className="flex w-full items-start gap-1 rounded-lg px-2 py-1.5 text-left text-[11px] font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                          >
                            <ChevronRight className={`mt-0.5 h-3.5 w-3.5 shrink-0 transition-transform ${isCollapsed ? '' : 'rotate-90'}`} />
                            <span>{language === 'ru' && chapter.titleRu ? chapter.titleRu : chapter.title}</span>
                          </button>
                          {!isCollapsed && (
                            <div className="space-y-1 border-l border-slate-200 pl-3 dark:border-slate-800">
                              {matchingArticles.map((article) => (
                                <a
                                  key={article.id}
                                  href={`#${article.id}`}
                                  onClick={() => {
                                    selectArticle(article.id);
                                    setMobileTocOpen(false);
                                  }}
                                  className="block rounded-lg px-2 py-1.5 leading-snug text-slate-600 hover:bg-amber-500/10 hover:text-amber-600 dark:text-slate-300"
                                >
                                  {language === 'ru' && article.titleRu ? article.titleRu : article.title}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// A document change represents a new reader session. Remounting resets local
// reader controls without a synchronous state update in an effect.
export function DocumentViewer(props: DocumentViewerProps) {
  return <DocumentViewerContent key={props.document.slug} {...props} />;
}
