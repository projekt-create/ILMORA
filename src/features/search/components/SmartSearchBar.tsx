'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  BookOpen,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  Tag,
  CornerDownLeft,
} from 'lucide-react';
import { useLanguageStore } from '@/features/language/useLanguageStore';
import { lawService } from '@/features/law/services/lawService';
import { SearchResultItem, LawCategory } from '@/types';

interface SmartSearchBarProps {
  placeholder?: string;
  isHero?: boolean;
  onSelectResult?: (url: string) => void;
  autoFocus?: boolean;
}

const SEARCH_HISTORY_KEY = 'ilmora-search-history';

export function SmartSearchBar({
  placeholder,
  isHero = false,
  onSelectResult,
  autoFocus = false,
}: SmartSearchBarProps) {
  const router = useRouter();
  const { t, language } = useLanguageStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [history, setHistory] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // localStorage unavailable
    }
    return [];
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedCategory, setSelectedCategory] = useState<LawCategory | 'all'>('all');

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

  const runSearch = useCallback(async (searchQuery: string, category: LawCategory | 'all') => {
    const requestId = ++requestIdRef.current;

    try {
      const res = await lawService.search(searchQuery, category);
      // Ignore an earlier async response when the query or category changed.
      if (requestId !== requestIdRef.current) return;

      setResults(res);
      setSelectedIndex(res.length > 0 ? 0 : -1);
    } catch {
      if (requestId !== requestIdRef.current) return;

      setResults([]);
      setSelectedIndex(-1);
    }
  }, []);

  const saveToHistory = useCallback((searchTerm: string) => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;
    setHistory((prev) => {
      const updated = [trimmed, ...prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase())].slice(0, 8);
      try {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
      } catch {
        // localStorage unavailable
      }
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch {
      // localStorage unavailable
    }
  }, []);

  // Handle query changes with debounce — no setState in effect body
  const handleQueryChange = useCallback(
    (newQuery: string) => {
      setQuery(newQuery);
      setIsOpen(true);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      if (!newQuery.trim()) {
        requestIdRef.current += 1;
        setResults([]);
        setSelectedIndex(-1);
        return;
      }

      debounceRef.current = setTimeout(() => {
        void runSearch(newQuery, selectedCategory);
      }, 150);
    },
    [runSearch, selectedCategory]
  );

  // Re-search when category changes
  const handleCategoryChange = useCallback(
    (cat: LawCategory | 'all') => {
      setSelectedCategory(cat);
      if (!query.trim()) return;

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        void runSearch(query, cat);
      }, 100);
    },
    [query, runSearch]
  );

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      requestIdRef.current += 1;
    };
  }, []);

  const handleNavigate = useCallback(
    (url: string) => {
      saveToHistory(query);
      setIsOpen(false);
      if (onSelectResult) {
        onSelectResult(url);
      } else {
        router.push(url);
      }
    },
    [query, onSelectResult, router, saveToHistory]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen) {
        if (e.key === 'ArrowDown' || e.key === 'Enter') {
          setIsOpen(true);
        }
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleNavigate(results[selectedIndex].url);
        } else if (query.trim()) {
          saveToHistory(query);
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    },
    [isOpen, results, selectedIndex, query, handleNavigate, saveToHistory]
  );

  const handleSearchButtonClick = useCallback(() => {
    if (selectedIndex >= 0 && results[selectedIndex]) {
      handleNavigate(results[selectedIndex].url);
    } else if (query.trim()) {
      saveToHistory(query);
    }
  }, [selectedIndex, results, query, handleNavigate, saveToHistory]);

  const popularQueries = useMemo(
    () => [
      'Mehnat kodeksi 100-modda',
      'Jinoyat kodeksi 15-modda',
      'Konstitutsiya 41-modda',
      'Fuqarolik kodeksi',
      'Oila kodeksi',
    ],
    []
  );

  const categories = useMemo(
    () => [
      { id: 'all', label: language === 'uz' ? 'Barchasi' : 'Все' },
      { id: 'konstitutsiya', label: t.categories.konstitutsiya },
      { id: 'kodekslar', label: t.categories.kodekslar },
      { id: 'qonunlar', label: t.categories.qonunlar },
    ],
    [language, t.categories]
  );

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Search Input Box */}
      <div
        className={`relative flex items-center transition-all duration-200 ${
          isHero
            ? 'h-14 sm:h-16 rounded-2xl bg-white dark:bg-slate-900 shadow-xl shadow-blue-950/10 border-2 border-slate-200 dark:border-slate-800 focus-within:border-amber-500 dark:focus-within:border-amber-500/80 focus-within:ring-4 focus-within:ring-amber-500/10'
            : 'h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-500/20'
        }`}
      >
        <div className="pl-4 sm:pl-5 text-slate-400 dark:text-slate-500 flex items-center pointer-events-none">
          <Search className={isHero ? 'w-6 h-6 text-amber-500' : 'w-4 h-4'} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => handleQueryChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || t.search.placeholder}
          className="w-full h-full px-3 sm:px-4 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm sm:text-base focus:outline-hidden"
        />

        {query && (
          <button
            onClick={() => {
              handleQueryChange('');
              inputRef.current?.focus();
            }}
            className="p-1.5 mr-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={handleSearchButtonClick}
          className={`flex items-center gap-1.5 mr-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            isHero
              ? 'bg-gradient-to-r from-blue-900 to-indigo-900 text-amber-400 hover:brightness-110 shadow-sm'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <span>{t.nav.search}</span>
          <CornerDownLeft className="w-3.5 h-3.5 opacity-70" />
        </button>
      </div>

      {/* Dropdown Results & Suggestions */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in-50 duration-150 max-h-[75vh] flex flex-col">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 overflow-x-auto text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              Toifa:
            </span>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => handleCategoryChange(c.id as LawCategory | 'all')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-blue-900 text-amber-400 dark:bg-amber-400 dark:text-slate-950 font-bold'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="overflow-y-auto flex-1 p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
            {/* When Query is Empty: Show Search History & Popular Queries */}
            {!query.trim() && (
              <div className="p-2 space-y-4">
                {history.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between px-2 mb-2">
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {t.search.recentSearches}
                      </span>
                      <button
                        onClick={clearHistory}
                        className="text-[11px] text-slate-400 hover:text-red-500 transition-colors"
                      >
                        {t.search.clearHistory}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 px-2">
                      {history.map((h, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            handleQueryChange(h);
                            inputRef.current?.focus();
                          }}
                          className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-900 transition-colors"
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 px-2 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    {t.search.popularQueries}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 px-1">
                    {popularQueries.map((pq, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          handleQueryChange(pq);
                          inputRef.current?.focus();
                        }}
                        className="text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:text-amber-800 dark:hover:text-amber-300 flex items-center justify-between group transition-colors"
                      >
                        <span>{pq}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Helpful Search Tips */}
                <div className="p-3 bg-blue-50/50 dark:bg-slate-800/40 rounded-xl border border-blue-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                  <div className="font-semibold text-blue-950 dark:text-amber-400">
                    {t.search.searchTips}
                  </div>
                  <div>• {t.search.tip1}</div>
                  <div>• {t.search.tip2}</div>
                  <div>• {t.search.tip3}</div>
                </div>
              </div>
            )}

            {/* When Query is Typed: Show Instant Results */}
            {query.trim() && (
              <div>
                {results.length > 0 ? (
                  <div className="space-y-1">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {results.length} {t.search.resultsCount}
                    </div>
                    {results.map((res, index) => {
                      const isSelected = index === selectedIndex;
                      return (
                        <div
                          key={`${res.documentSlug}-${res.articleId || ''}-${index}`}
                          onClick={() => handleNavigate(res.url)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`p-3 rounded-xl cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-blue-50 dark:bg-blue-950/60 border-l-4 border-amber-500 text-blue-950 dark:text-white'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {res.matchType === 'article' ? (
                              <FileText className="w-4 h-4 text-amber-500 shrink-0" />
                            ) : (
                              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                            )}
                            <span className="font-bold text-sm">
                              {res.articleTitle ? `${res.articleTitle} (${res.documentTitle})` : res.documentTitle}
                            </span>
                            <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {res.matchType === 'article' ? 'Modda' : res.matchType === 'chapter' ? 'Bob' : 'Kodeks'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 pl-6">
                            {res.snippet}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-12 px-4 text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
                      <Search className="w-6 h-6" />
                    </div>
                    <h5 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-1">
                      {t.search.noResults}
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      &ldquo;{query}&rdquo; bo&apos;yicha mos keladigan hujjat yoki modda topilmadi. {t.search.noResultsDesc}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
