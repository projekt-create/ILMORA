'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { SearchModal } from '@/features/search/components/SearchModal';
import { BookmarksDrawer } from '@/features/bookmarks/components/BookmarksDrawer';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);

  useEffect(() => {
    const openSearchWithShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', openSearchWithShortcut);
    return () => window.removeEventListener('keydown', openSearchWithShortcut);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Suspense fallback={<div className="h-16 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800" />}>
        <Header
          onOpenSearch={() => setSearchOpen(true)}
          onOpenBookmarks={() => setBookmarksOpen(true)}
        />
      </Suspense>

      <main className="flex-1">
        <Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Yuklanmoqda...</div>}>
          {children}
        </Suspense>
      </main>

      <Footer />

      {/* Global Modals / Drawers */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <BookmarksDrawer isOpen={bookmarksOpen} onClose={() => setBookmarksOpen(false)} />
    </div>
  );
}
