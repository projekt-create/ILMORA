'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language } from '@/types';
import { translations, TranslationSchema } from './translations';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSchema;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'uz',
      setLanguage: (lang: Language) => set({ language: lang, t: translations[lang] }),
      t: translations.uz,
    }),
    {
      name: 'ilmora-language-storage',
      onRehydrateStorage: () => (state) => {
        if (state && state.language) {
          state.t = translations[state.language];
        }
      },
    }
  )
);
