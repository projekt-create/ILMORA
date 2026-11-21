'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FontSize = 'sm' | 'base' | 'lg' | 'xl';
type FontStyle = 'sans' | 'serif';

interface ReadingPreferencesState {
  fontSize: FontSize;
  fontStyle: FontStyle;
  setFontSize: (size: FontSize) => void;
  setFontStyle: (style: FontStyle) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

const fontSizes: FontSize[] = ['sm', 'base', 'lg', 'xl'];

export const useReadingPreferences = create<ReadingPreferencesState>()(
  persist(
    (set, get) => ({
      fontSize: 'base',
      fontStyle: 'sans',
      setFontSize: (fontSize) => set({ fontSize }),
      setFontStyle: (fontStyle) => set({ fontStyle }),
      increaseFontSize: () => {
        const currentIdx = fontSizes.indexOf(get().fontSize);
        if (currentIdx < fontSizes.length - 1) {
          set({ fontSize: fontSizes[currentIdx + 1] });
        }
      },
      decreaseFontSize: () => {
        const currentIdx = fontSizes.indexOf(get().fontSize);
        if (currentIdx > 0) {
          set({ fontSize: fontSizes[currentIdx - 1] });
        }
      },
    }),
    {
      name: 'ilmora-reading-preferences',
    }
  )
);
