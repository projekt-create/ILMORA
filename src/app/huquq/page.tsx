'use client';

import React, { useState } from 'react';
import { Scale, BookOpen, Search } from 'lucide-react';
import { SmartSearchBar } from '@/features/search/components/SmartSearchBar';
import { CodeCard } from '@/features/law/components/CodeCard';
import { CategoriesGrid } from '@/features/law/components/CategoriesGrid';
import { UsefulResources } from '@/features/law/components/UsefulResources';
import { OFFICIAL_CODES_CATALOG } from '@/features/law/data/codesCatalog';
import { useLanguageStore } from '@/features/language/useLanguageStore';

export default function LawHubPage() {
  const { t } = useLanguageStore();
  const [filterQuery, setFilterQuery] = useState('');

  const filteredCodes = OFFICIAL_CODES_CATALOG.filter((code) =>
    code.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
    code.shortTitle.toLowerCase().includes(filterQuery.toLowerCase()) ||
    code.description.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-amber-400 text-xs font-bold border border-blue-200 dark:border-slate-700">
          <Scale className="w-4 h-4 text-amber-500" />
          <span>O‘zbekiston Respublikasi Qonunchilik Boshqarmasi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 dark:text-white tracking-tight">
          Huquqiy Bilimlar va Qonunlar Markazi
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Amaldagi barcha rasmiy kodekslar, qonunlar va normativ-huquqiy hujjatlar katalogi. Qidiruv orqali moddalar, boblar va huquqiy tushunchalarni toping.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl">
        <SmartSearchBar isHero />
      </div>

      {/* Quick Codes Library */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 dark:text-white">
              {t.codes.title}
            </h2>
          </div>

          {/* Quick Filter Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder={t.codes.searchInCodes}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-hidden focus:border-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCodes.map((code) => (
            <CodeCard key={code.id} document={code} />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-950 dark:text-white">
            {t.home.categoriesTitle}
          </h2>
        </div>
        <CategoriesGrid />
      </div>

      {/* Useful Resources */}
      <div className="space-y-6">
        <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-950 dark:text-white">
            {t.home.usefulResources}
          </h2>
        </div>
        <UsefulResources />
      </div>
    </div>
  );
}
