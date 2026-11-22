'use client';

import { useState, useMemo } from 'react';
import { Search, BookOpen, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { fullGlossary, type GlossaryTerm } from '@/features/history/data/glossaryData';
import { useLanguageStore } from '@/features/language/useLanguageStore';

const CATEGORIES = [
  'Barchasi',
  'O‘zbekiston tarixi',
  'Jahon tarixi',
  'Harbiy atamalar',
  'Davlat va huquq',
  'Madaniyat va din',
] as const;

const ITEMS_PER_PAGE = 12;

export function HistoryGlossaryView() {
  const { language } = useLanguageStore();
  const isRu = language === 'ru';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Barchasi');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filtered terms
  const filteredTerms = useMemo(() => {
    return fullGlossary.filter((item) => {
      const matchesSearch =
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.origin && item.origin.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'Barchasi' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Total pages
  const totalPages = Math.ceil(filteredTerms.length / ITEMS_PER_PAGE) || 1;

  // Clamped page
  const page = Math.min(Math.max(currentPage, 1), totalPages);

  // Paginated items
  const paginatedTerms = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredTerms.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTerms, page]);

  // Handle filter changes
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4 sm:p-7 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={
              isRu
                ? 'Поиск по историческим терминам, понятиям и источникам...'
                : 'Tarixiy atamalar, tushunchalar yoki manbalar bo‘yicha qidiring...'
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 py-3.5 pl-12 pr-10 text-sm font-medium text-slate-900 transition placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800/90"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none sm:flex-wrap pt-1">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  isActive
                    ? 'bg-blue-950 text-amber-300 shadow-xs dark:bg-amber-400 dark:text-slate-950'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results Info Counter */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <span>
            {isRu
              ? `Найдено терминов: ${filteredTerms.length} из ${fullGlossary.length}`
              : `Jami ${fullGlossary.length} tadan ${filteredTerms.length} ta atama topildi`}
          </span>
          <span>
            {isRu ? `Страница ${page} из ${totalPages}` : `${page} / ${totalPages}-sahifa`}
          </span>
        </div>
      </div>

      {/* Terms Grid */}
      {paginatedTerms.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedTerms.map((item: GlossaryTerm) => (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-amber-300 dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                    {item.category}
                  </span>
                  {item.period && (
                    <span className="text-[10px] font-semibold text-slate-400">
                      {item.period}
                    </span>
                  )}
                </div>

                <h3 className="mt-3 text-lg font-black text-blue-950 dark:text-white">
                  {item.term}
                </h3>

                {item.origin && (
                  <p className="mt-0.5 text-[11px] font-bold italic text-slate-400">
                    Kelib chiqishi: {item.origin}
                  </p>
                )}

                <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.definition}
                </p>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-3 text-[11px] font-medium text-slate-400 dark:border-slate-800">
                #Atama {item.id}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
          <BookOpen className="mx-auto h-10 w-10 text-slate-400" />
          <h4 className="mt-4 text-base font-bold text-slate-700 dark:text-slate-200">
            {isRu ? 'Термины не найдены' : 'Hech qanday atama topilmadi'}
          </h4>
          <p className="mt-1 text-xs text-slate-400">
            {isRu
              ? 'Попробуйте изменить поисковый запрос или выбрать другую категорию'
              : 'Qidiruv so‘zini o‘zgartiring yoki boshqa toifani tanlang'}
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between sm:justify-center gap-2 pt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden xs:inline">{isRu ? 'Назад' : 'Oldingi'}</span>
          </button>

          {/* Compact Page Counter on Mobile */}
          <span className="sm:hidden text-xs font-bold text-slate-600 dark:text-slate-300">
            {page} / {totalPages}
          </span>

          {/* Page numbers on Desktop */}
          <div className="hidden sm:flex flex-wrap items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
              .map((p, idx, arr) => {
                const prev = arr[idx - 1];
                const showEllipsis = prev && p - prev > 1;

                return (
                  <div key={p} className="flex items-center gap-1">
                    {showEllipsis && (
                      <span className="px-1 text-xs text-slate-400">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(p)}
                      className={`h-9 w-9 rounded-xl text-xs font-bold transition ${
                        page === p
                          ? 'bg-blue-950 text-amber-300 shadow-xs dark:bg-amber-400 dark:text-slate-950'
                          : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {p}
                    </button>
                  </div>
                );
              })}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <span className="hidden xs:inline">{isRu ? 'Вперед' : 'Keyingi'}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
