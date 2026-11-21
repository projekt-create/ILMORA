'use client';

import React, { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { CodeCard } from '@/features/law/components/CodeCard';
import { OFFICIAL_CODES_CATALOG } from '@/features/law/data/codesCatalog';
import { useLanguageStore } from '@/features/language/useLanguageStore';

export default function CodesListPage() {
  const { t } = useLanguageStore();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'popular'>('all');

  const filtered = OFFICIAL_CODES_CATALOG.filter((code) => {
    const matchesSearch =
      code.title.toLowerCase().includes(search.toLowerCase()) ||
      code.shortTitle.toLowerCase().includes(search.toLowerCase()) ||
      code.description.toLowerCase().includes(search.toLowerCase()) ||
      code.actNumber.toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType === 'all' || (filterType === 'popular' && code.isPopular);

    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
          <BookOpen className="w-4 h-4" />
          <span>{OFFICIAL_CODES_CATALOG.length} {t.codes.totalCodes}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 dark:text-white tracking-tight">
          {t.codes.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {t.codes.subtitle}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.codes.searchInCodes}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-amber-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              filterType === 'all'
                ? 'bg-blue-900 text-amber-400 dark:bg-amber-400 dark:text-slate-950'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {t.codes.filterAll} ({OFFICIAL_CODES_CATALOG.length})
          </button>
          <button
            onClick={() => setFilterType('popular')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              filterType === 'popular'
                ? 'bg-blue-900 text-amber-400 dark:bg-amber-400 dark:text-slate-950'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Eng ko‘p ishlatiladigan
          </button>
        </div>
      </div>

      {/* Codes Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((code) => (
            <CodeCard key={code.id} document={code} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h4 className="font-bold text-slate-800 dark:text-white mb-1">
            {t.search.noResults}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            &ldquo;{search}&rdquo; bo‘yicha kodeks topilmadi.
          </p>
        </div>
      )}
    </div>
  );
}
