'use client';

import { useEffect, useState, useCallback } from 'react';

const KEY = 'ilmora-history-progress-v1';

export interface HistoryProgressState {
  favorites: string[];
  read: string[];
  recent: string[];
  scores: number[];
  searchHistory: string[];
}

const EMPTY: HistoryProgressState = {
  favorites: [],
  read: [],
  recent: [],
  scores: [],
  searchHistory: [],
};

export function useHistoryProgress() {
  const [saved, setSaved] = useState<HistoryProgressState>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const restore = () => {
      try {
        const value = localStorage.getItem(KEY);
        if (value) {
          const parsed = JSON.parse(value) as Partial<HistoryProgressState>;
          setSaved({
            favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
            read: Array.isArray(parsed.read) ? parsed.read : [],
            recent: Array.isArray(parsed.recent) ? parsed.recent : [],
            scores: Array.isArray(parsed.scores) ? parsed.scores : [],
            searchHistory: Array.isArray(parsed.searchHistory) ? parsed.searchHistory : [],
          });
        }
      } catch {
        /* Storage may be disabled or unavailable */
      }
      setReady(true);
    };

    const timer = window.setTimeout(restore, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(saved));
    } catch {
      /* Storage quota exceeded or disabled */
    }
  }, [saved, ready]);

  const toggleFavorite = useCallback((id: string) => {
    setSaved((s) => ({
      ...s,
      favorites: s.favorites.includes(id)
        ? s.favorites.filter((x) => x !== id)
        : [...s.favorites, id],
    }));
  }, []);

  const markRead = useCallback((id: string) => {
    setSaved((s) => ({
      ...s,
      read: s.read.includes(id) ? s.read : [...s.read, id],
      recent: [id, ...s.recent.filter((x) => x !== id)].slice(0, 8),
    }));
  }, []);

  const toggleRead = useCallback((id: string) => {
    setSaved((s) => {
      const isRead = s.read.includes(id);
      return {
        ...s,
        read: isRead ? s.read.filter((x) => x !== id) : [...s.read, id],
        recent: isRead ? s.recent : [id, ...s.recent.filter((x) => x !== id)].slice(0, 8),
      };
    });
  }, []);

  const saveScore = useCallback((score: number) => {
    setSaved((s) => ({
      ...s,
      scores: [score, ...s.scores].slice(0, 10),
    }));
  }, []);

  const addSearch = useCallback((term: string) => {
    const clean = term.trim();
    if (!clean || clean.length < 2) return;
    setSaved((s) => ({
      ...s,
      searchHistory: [clean, ...s.searchHistory.filter((x) => x.toLowerCase() !== clean.toLowerCase())].slice(0, 6),
    }));
  }, []);

  const clearSearchHistory = useCallback(() => {
    setSaved((s) => ({ ...s, searchHistory: [] }));
  }, []);

  return {
    ...saved,
    ready,
    toggleFavorite,
    markRead,
    toggleRead,
    saveScore,
    addSearch,
    clearSearchHistory,
  };
}
