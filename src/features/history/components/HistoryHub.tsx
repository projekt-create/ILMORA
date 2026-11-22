'use client';

import Link from 'next/link';
import { useMemo, useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Compass,
  Crown,
  GraduationCap,
  Landmark,
  Map,
  Search,
  Sparkles,
  Users,
  X,
  History as HistoryIcon,
  Clock,
} from 'lucide-react';
import { dates, historyTopics, people, type HistoryTopic } from '@/features/history/data/historyData';
import { fullGlossary } from '@/features/history/data/glossaryData';
import { HistoryTools } from '@/features/history/components/HistoryTools';
import { useHistoryProgress } from '@/features/history/hooks/useHistoryProgress';
import { useLanguageStore } from '@/features/language/useLanguageStore';

const cards = [
  { key: 'uzbekistan', icon: Landmark, tone: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300' },
  { key: 'world', icon: Compass, tone: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300' },
  { key: 'people', icon: Users, tone: 'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300' },
  { key: 'dates', icon: CalendarDays, tone: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300' },
  { key: 'maps', icon: Map, tone: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300' },
  { key: 'glossary', icon: BookOpen, tone: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300' },
];

export function HistoryHub() {
  const { t, language } = useLanguageStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const progress = useHistoryProgress();
  const { favorites, read, recent, toggleFavorite, addSearch, clearSearchHistory, searchHistory } = progress;

  // Debounce input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm.trim());
      if (searchTerm.trim().length >= 2) {
        addSearch(searchTerm.trim());
      }
    }, 250);
    return () => clearTimeout(handler);
  }, [searchTerm, addSearch]);

  // Click outside to close suggestion dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsInputFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter topics, people, and dates
  const queryLower = debouncedTerm.toLowerCase();

  const filteredTopics = useMemo(() => {
    if (!queryLower) return [];
    return historyTopics.filter((item) =>
      `${item.title} ${item.summary} ${item.period}`.toLowerCase().includes(queryLower)
    );
  }, [queryLower]);

  const filteredPeople = useMemo(() => {
    if (!queryLower) return [];
    return people.filter((p) =>
      `${p.name} ${p.role} ${p.summary}`.toLowerCase().includes(queryLower)
    );
  }, [queryLower]);

  const filteredDates = useMemo(() => {
    if (!queryLower) return [];
    return dates.filter((d) =>
      `${d.title} ${d.date} ${d.summary}`.toLowerCase().includes(queryLower)
    );
  }, [queryLower]);

  const filteredGlossary = useMemo(() => {
    if (!queryLower) return [];
    return fullGlossary.filter((item) =>
      `${item.term} ${item.definition}`.toLowerCase().includes(queryLower)
    );
  }, [queryLower]);

  const totalResultsCount =
    filteredTopics.length + filteredPeople.length + filteredDates.length + filteredGlossary.length;

  // Flattened searchable items for keyboard navigation in suggestions
  const suggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const q = searchTerm.toLowerCase();
    const list: { label: string; href: string; type: string }[] = [];
    historyTopics.forEach((t) => {
      if (t.title.toLowerCase().includes(q)) {
        list.push({ label: t.title, href: `/tarix/${t.section}/${t.id}`, type: 'Mavzu' });
      }
    });
    people.forEach((p) => {
      if (p.name.toLowerCase().includes(q)) {
        list.push({ label: p.name, href: '/tarix/people', type: 'Shaxs' });
      }
    });
    dates.forEach((d) => {
      if (d.title.toLowerCase().includes(q) || d.date.toLowerCase().includes(q)) {
        list.push({ label: `${d.date} — ${d.title}`, href: '/tarix/dates', type: 'Sana' });
      }
    });
    return list.slice(0, 6);
  }, [searchTerm]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        window.location.href = suggestions[highlightedIndex].href;
      }
    } else if (e.key === 'Escape') {
      setIsInputFocused(false);
    }
  };

  // Real Progress Calculation
  const totalTopicsCount = historyTopics.length;
  const readCount = read.length;
  const progressPercentage = Math.min(
    100,
    Math.round((readCount / (totalTopicsCount || 1)) * 100)
  );

  // Recently read topics
  const recentTopics = useMemo(() => {
    return recent
      .map((id) => historyTopics.find((t) => t.id === id))
      .filter((t): t is HistoryTopic => Boolean(t))
      .slice(0, 3);
  }, [recent]);

  const isRu = language === 'ru';

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 px-4 pb-10 pt-8 text-white sm:pb-20 sm:pt-16">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(212,175,55,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,.12)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Crown className="h-4 w-4" /> {t.history.badge}
            </div>
            <h1 className="text-3xl font-black tracking-tight sm:text-6xl">
              {t.history.heroTitle}
              <br />
              <span className="text-amber-400">{t.history.heroHighlight}</span>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {t.history.heroSubtitle}
            </p>

            {/* Global Search with Suggestions & History */}
            <div ref={searchContainerRef} className="relative max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onFocus={() => setIsInputFocused(true)}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setHighlightedIndex(-1);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={t.history.searchPlaceholder}
                  className="h-14 w-full rounded-2xl border border-slate-700 bg-white px-12 pr-12 text-sm text-slate-900 shadow-xl outline-none ring-amber-500/20 placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />
                {searchTerm && (
                  <button
                    aria-label="Clear search"
                    onClick={() => {
                      setSearchTerm('');
                      setDebouncedTerm('');
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Suggestions / Recent Searches Dropdown */}
              {isInputFocused && (
                <div className="absolute left-0 right-0 top-16 z-30 max-h-[60vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                  {suggestions.length > 0 ? (
                    <div>
                      <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {isRu ? 'Подсказки' : 'Takliflar'}
                      </p>
                      <div className="space-y-1">
                        {suggestions.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            onClick={() => setIsInputFocused(false)}
                            className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition ${
                              highlightedIndex === idx
                                ? 'bg-amber-50 text-amber-900 dark:bg-amber-500/20 dark:text-amber-300'
                                : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800'
                            }`}
                          >
                            <span>{item.label}</span>
                            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500 dark:bg-slate-800">
                              {item.type}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : searchHistory.length > 0 && !searchTerm.trim() ? (
                    <div>
                      <div className="mb-2 flex items-center justify-between px-2 text-[11px] font-bold text-slate-400">
                        <span className="flex items-center gap-1.5 uppercase tracking-wider">
                          <HistoryIcon className="h-3 w-3" />
                          {t.history.recentSearches}
                        </span>
                        <button
                          onClick={clearSearchHistory}
                          className="hover:text-amber-500"
                        >
                          {t.history.clearRecent}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {searchHistory.map((term, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setSearchTerm(term);
                              setDebouncedTerm(term);
                            }}
                            className="flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-1.5 text-xs text-slate-700 transition hover:bg-amber-100 hover:text-amber-900 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                          >
                            <Clock className="h-3 w-3 text-slate-400" />
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> {t.history.verifiedSources}
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" /> {t.history.studentFriendly}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-7xl space-y-10 overflow-hidden px-4 py-7 sm:space-y-14 sm:px-6 sm:py-10 lg:px-8">
        {/* Search Results Block */}
        {debouncedTerm && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
              <h2 className="text-xl font-extrabold text-blue-950 dark:text-white">
                {t.history.searchResults}: &ldquo;{debouncedTerm}&rdquo;
              </h2>
              <span className="text-sm font-semibold text-slate-500">
                {totalResultsCount} {t.history.topicsCount}
              </span>
            </div>

            {totalResultsCount === 0 ? (
              <EmptyState title={t.history.noResults} description={t.history.noResultsDesc} />
            ) : (
              <div className="space-y-8">
                {/* Topics Results */}
                {filteredTopics.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                      {isRu ? 'Темы курса' : 'Mavzular'} ({filteredTopics.length})
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {filteredTopics.map((topic) => (
                        <TopicCard
                          key={topic.id}
                          topic={topic}
                          favorite={favorites.includes(topic.id)}
                          onFavorite={() => toggleFavorite(topic.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* People Results */}
                {filteredPeople.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-violet-600 dark:text-violet-400">
                      {isRu ? 'Исторические личности' : 'Tarixiy shaxslar'} ({filteredPeople.length})
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredPeople.map((person) => (
                        <div
                          key={person.id}
                          className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                        >
                          <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                            {person.years}
                          </span>
                          <h4 className="font-extrabold text-slate-900 dark:text-white">
                            {person.name}
                          </h4>
                          <p className="mt-1 text-xs text-slate-500">{person.role}</p>
                          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                            {person.summary}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dates Results */}
                {filteredDates.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                      {isRu ? 'Хронология и даты' : 'Muhim sanalar'} ({filteredDates.length})
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {filteredDates.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                        >
                          <div className="min-w-28 text-xs font-black text-amber-600 dark:text-amber-400">
                            {item.date}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                              {item.title}
                            </h4>
                            <p className="mt-1 text-xs text-slate-500">{item.summary}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* Section Cards */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {cards.map(({ key, icon: Icon, tone }) => {
            const sectionKey = key as keyof typeof t.history.sections;
            const title = t.history.sections[sectionKey] || key;
            const descKey = `${key}Desc` as keyof typeof t.history.sections;
            const text = t.history.sections[descKey] || '';

            return (
              <Link
                key={key}
                href={`/tarix/${key}`}
                className="group min-w-0 rounded-2xl border border-slate-200 bg-white p-3 transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 sm:p-5"
              >
                <div className="flex items-start justify-between">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${tone}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-amber-500" />
                </div>
                <h2 className="mt-3 break-words text-sm font-bold text-slate-900 dark:text-white sm:mt-5 sm:text-base">{title}</h2>
                <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400 sm:text-sm">
                  {text}
                </p>
              </Link>
            );
          })}
        </section>

        {/* Featured Topic and Real Progress */}
        <section className="grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
          {/* Featured Card */}
          <div className="rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 p-6 text-white shadow-md sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                  <Sparkles className="h-4 w-4" /> {t.history.featuredTopic}
                </div>
                <h2 className="text-xl font-black sm:text-3xl">
                  {isRu
                    ? 'Амир Темур: централизация и возрождение'
                    : 'Amir Temur: markazlashuv va Renessans'}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300">
                  {isRu
                    ? 'Как объединение Мовароуннахра в XIV веке создало почву для Второго Восточного Ренессанса, расцвета науки, архитектуры Самарканда и возрождения Шелкового пути.'
                    : 'XIV asrda Movarounnahrda markazlashgan davlat barpo etilishi Ikkinchi Sharq Renessansi, Samarqand me’morchiligi va xalqaro savdo rivojiga qanday ta’sir ko‘rsatganini o‘rganing.'}
                </p>
              </div>
              <div className="hidden rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 sm:block">
                <Crown className="h-8 w-8 text-amber-300" />
              </div>
            </div>
            <Link
              href="/tarix/uzbekistan/uzbekistan-temurids"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
            >
              {t.history.startTopic} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Real Dynamic Progress */}
          <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {t.history.yourProgress}
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-blue-950 dark:text-white">
                    {progressPercentage}%
                  </h2>
                </div>
                <div className="rounded-2xl bg-amber-50 p-3 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300">
                  <GraduationCap className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {readCount} / {totalTopicsCount} {isRu ? 'тем изучено.' : 'ta mavzu o‘qildi.'}{' '}
                {t.history.progressDesc}
              </p>
            </div>

            {/* Recently read topics */}
            {recentTopics.length > 0 && (
              <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {t.history.recentReadTopics}
                </p>
                <div className="space-y-1.5">
                  {recentTopics.map((topic) => (
                    <Link
                      key={topic.id}
                      href={`/tarix/${topic.section}/${topic.id}`}
                      className="flex items-center justify-between rounded-lg p-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <span className="truncate">{topic.title}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link
              href="/tarix/dates"
              className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 dark:text-amber-400 dark:hover:text-amber-300"
            >
              {t.history.continueAction} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Most Read Topics and Timeline Preview */}
        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-5 flex items-end justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {t.history.systematicStudy}
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-blue-950 dark:text-white">
                  {t.history.popularTopics}
                </h2>
              </div>
              <Link
                href="/tarix/uzbekistan"
                className="text-sm font-bold text-blue-700 hover:underline dark:text-amber-400"
              >
                {t.history.viewAll}
              </Link>
            </div>
            <div className="space-y-3">
              {historyTopics.slice(0, 5).map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  favorite={favorites.includes(topic.id)}
                  onFavorite={() => toggleFavorite(topic.id)}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 flex items-end justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {t.history.chronology}
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-blue-950 dark:text-white">
                  {t.history.importantDates}
                </h2>
              </div>
              <Link
                href="/tarix/dates"
                className="text-sm font-bold text-blue-700 hover:underline dark:text-amber-400"
              >
                {t.history.timeline}
              </Link>
            </div>
            <div className="space-y-2.5">
              {dates.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-xl border border-slate-100 bg-white p-3.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="min-w-[110px] text-xs font-black text-amber-600 dark:text-amber-400">
                    {item.date}
                  </div>
                  <div className="border-l border-slate-200 pl-3 dark:border-slate-800">
                    <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                      {item.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* History Tools: Quiz and Comparisons */}
        <HistoryTools />

        {/* National Certificate Banner */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {t.history.sections.certificate}
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-blue-950 dark:text-white">
                {isRu
                  ? 'Подготовка к Национальному сертификату по истории'
                  : 'Tarix fanidan Milliy sertifikatga tayyorgarlik'}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {isRu
                  ? 'Формат экзамена UzBMB, спецификация блоков A, B, C, критерии оценивания и практические типовые задания.'
                  : 'UzBMB (BBA) formati, testlar spetsifikatsiyasi, baholash mezonlari va amaliy namunaviy topshiriqlar.'}
              </p>
            </div>
            <Link
              href="/tarix/certificate"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-950 px-6 py-3.5 text-sm font-bold text-amber-300 transition hover:bg-blue-900"
            >
              {isRu ? 'Открыть раздел' : 'Bo‘limga o‘tish'} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function TopicCard({
  topic,
  favorite,
  onFavorite,
}: {
  topic: HistoryTopic;
  favorite: boolean;
  onFavorite: () => void;
}) {
  return (
    <div className="group flex min-w-0 w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 transition hover:border-amber-300 dark:border-slate-800 dark:bg-slate-900 sm:gap-3.5 sm:p-3.5">
      <div aria-hidden="true" className={`h-12 w-1.5 shrink-0 rounded-full bg-gradient-to-b ${topic.accent}`} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">{topic.title}</h3>
          {topic.status === 'coming-soon' && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500 dark:bg-slate-800">
              Tez kunda
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-slate-500 line-clamp-1 dark:text-slate-400">
          <span className="font-semibold text-amber-600 dark:text-amber-400">{topic.period}</span> ·{' '}
          {topic.summary}
        </p>
      </div>
      <button
        onClick={onFavorite}
        aria-label="Sevimlilarga qo‘shish"
        className={`shrink-0 rounded-lg p-1.5 text-lg transition sm:p-2 ${
          favorite ? 'text-amber-500' : 'text-slate-300 hover:text-amber-500'
        }`}
      >
        ★
      </button>
      <Link
        href={`/tarix/${topic.section}/${topic.id}`}
        className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-blue-700 dark:hover:bg-slate-800 sm:p-2"
      >
        <ChevronRight className="h-5 w-5" />
      </Link>
    </div>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
      <Search className="mx-auto h-8 w-8 text-slate-300" />
      <p className="mt-3 font-bold text-slate-700 dark:text-slate-200">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
}
