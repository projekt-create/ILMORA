'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BookmarkItem, ReadingHistoryItem } from '@/types';

interface BookmarksState {
  bookmarks: BookmarkItem[];
  addBookmark: (item: Omit<BookmarkItem, 'savedAt' | 'id'>) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (documentSlug: string, articleId: string) => boolean;
  clearBookmarks: () => void;

  history: ReadingHistoryItem[];
  addToHistory: (item: Omit<ReadingHistoryItem, 'viewedAt'>) => void;
  clearHistory: () => void;
}

export const useBookmarksStore = create<BookmarksState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (item) => {
        const id = `${item.documentSlug}#${item.articleId}`;
        const existing = get().bookmarks.find((b) => b.id === id);
        if (!existing) {
          const newItem: BookmarkItem = {
            ...item,
            id,
            savedAt: new Date().toISOString(),
          };
          set({ bookmarks: [newItem, ...get().bookmarks] });
        }
      },
      removeBookmark: (id: string) => {
        set({ bookmarks: get().bookmarks.filter((b) => b.id !== id) });
      },
      isBookmarked: (documentSlug: string, articleId: string) => {
        const id = `${documentSlug}#${articleId}`;
        return get().bookmarks.some((b) => b.id === id);
      },
      clearBookmarks: () => set({ bookmarks: [] }),

      history: [],
      addToHistory: (item) => {
        const filtered = get().history.filter(
          (h) => !(h.documentSlug === item.documentSlug && h.articleId === item.articleId)
        );
        const newItem: ReadingHistoryItem = {
          ...item,
          viewedAt: new Date().toISOString(),
        };
        // keep up to 20 recent items
        set({ history: [newItem, ...filtered].slice(0, 20) });
      },
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'ilmora-bookmarks-storage',
    }
  )
);
