'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Scale,
  Search,
  Bookmark,
  Sun,
  Moon,
  Menu,
  X,
} from 'lucide-react';
import { useLanguageStore } from '@/features/language/useLanguageStore';
import { useThemeStore } from '@/features/theme/useThemeStore';
import { useBookmarksStore } from '@/features/bookmarks/useBookmarksStore';

interface HeaderProps {
  onOpenSearch?: () => void;
  onOpenBookmarks?: () => void;
}

export function Header({ onOpenSearch, onOpenBookmarks }: HeaderProps) {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguageStore();
  const { theme, toggleTheme } = useThemeStore();
  const { bookmarks } = useBookmarksStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/huquq', label: t.nav.law },
    { href: '/tarix', label: 'Tarix' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        scrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xs border-slate-200/80 dark:border-slate-800'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-2 sm:h-16">
          {/* Logo */}
          <Link href="/" className="group flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-900 via-indigo-900 to-amber-600 text-white shadow-md shadow-blue-900/20 transition-transform group-hover:scale-105 sm:h-10 sm:w-10">
              <Scale className="h-4 w-4 text-amber-300 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="font-extrabold text-lg tracking-wider text-slate-900 dark:text-white sm:text-xl">
                  ILMORA
                </span>
                <span className="rounded-sm border border-amber-500/20 bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 sm:text-[10px]">
                  Huquq
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block leading-none mt-0.5">
                {t.brand.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-amber-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Search, Bookmarks, Lang, Theme */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            {/* Quick Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/80 sm:px-3 sm:py-1.5 sm:font-normal"
              title="Qidiruv (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline md:hidden">{t.nav.search}</span>
              <span className="hidden md:inline">{t.search.shortPlaceholder}</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm text-slate-500 dark:text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Bookmarks */}
            <button
              onClick={onOpenBookmarks}
              className="relative hidden rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-amber-400 md:block"
              title={t.bookmarks.title}
            >
              <Bookmark className="w-5 h-5" />
              {bookmarks.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-500 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </button>

            {/* Language Switcher */}
            <div className="hidden items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5 dark:border-slate-700 dark:bg-slate-800 md:flex">
              <button
                onClick={() => setLanguage('uz')}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  language === 'uz'
                    ? 'bg-white dark:bg-slate-900 text-blue-950 dark:text-amber-400 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                UZ
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  language === 'ru'
                    ? 'bg-white dark:bg-slate-900 text-blue-950 dark:text-amber-400 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                RU
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="hidden rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-amber-400 md:block"
              title={theme === 'dark' ? 'Kunduzgi rejim' : 'Tungi rejim'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="space-y-2 border-t border-slate-200 bg-white px-4 pb-6 pt-3 animate-in slide-in-from-top duration-200 dark:border-slate-800 dark:bg-slate-900 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {link.label}
            </Link>
          ))}
          <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                onOpenBookmarks?.();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
            >
              <Bookmark className="h-4 w-4" />
              <span>{t.bookmarks.title}{bookmarks.length > 0 ? ` (${bookmarks.length})` : ''}</span>
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
              <span>{theme === 'dark' ? 'Kunduzgi rejim' : 'Tungi rejim'}</span>
            </button>
          </div>
          <div className="flex items-center justify-between pt-2 text-xs text-slate-500 dark:text-slate-400">
            <span>{t.brand.subtagline}</span>
            <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5 dark:border-slate-700 dark:bg-slate-800">
              <button onClick={() => setLanguage('uz')} className={`rounded-md px-2 py-1 font-semibold ${language === 'uz' ? 'bg-white text-blue-950 shadow-xs dark:bg-slate-900 dark:text-amber-400' : ''}`}>UZ</button>
              <button onClick={() => setLanguage('ru')} className={`rounded-md px-2 py-1 font-semibold ${language === 'ru' ? 'bg-white text-blue-950 shadow-xs dark:bg-slate-900 dark:text-amber-400' : ''}`}>RU</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
