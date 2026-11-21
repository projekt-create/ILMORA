'use client';

import React from 'react';
import { Printer } from 'lucide-react';
import { useReadingPreferences } from '../hooks/useReadingPreferences';
import { useLanguageStore } from '@/features/language/useLanguageStore';

export function ReadingToolbar() {
  const { fontSize, fontStyle, setFontStyle, increaseFontSize, decreaseFontSize } = useReadingPreferences();
  const { t } = useLanguageStore();

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs no-print">
      {/* Font Size Adjusters */}
      <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
        <button
          onClick={decreaseFontSize}
          className="p-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-md hover:bg-white dark:hover:bg-slate-700 transition-colors"
          title="Kichikroq matn"
        >
          <span className="text-xs">A-</span>
        </button>
        <span className="px-2 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
          {fontSize}
        </span>
        <button
          onClick={increaseFontSize}
          className="p-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-md hover:bg-white dark:hover:bg-slate-700 transition-colors"
          title="Kattaroq matn"
        >
          <span className="text-sm">A+</span>
        </button>
      </div>

      {/* Font Family (Sans / Serif) */}
      <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setFontStyle('sans')}
          className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
            fontStyle === 'sans'
              ? 'bg-white dark:bg-slate-900 text-blue-950 dark:text-amber-400 shadow-xs font-bold'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Sans
        </button>
        <button
          onClick={() => setFontStyle('serif')}
          className={`px-2.5 py-1 text-xs font-serif rounded-md transition-all ${
            fontStyle === 'serif'
              ? 'bg-white dark:bg-slate-900 text-blue-950 dark:text-amber-400 shadow-xs font-bold'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Serif
        </button>
      </div>

      {/* Print */}
      <button
        onClick={handlePrint}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
        title={t.document.print}
      >
        <Printer className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{t.document.print}</span>
      </button>
    </div>
  );
}
