'use client';

import { useCallback, useMemo } from 'react';
import { historicalEntities } from '@/features/history/data/entitiesData';
import type { HistoricalEntity } from '@/features/history/data/entitiesData';

interface Props {
  text: string;
  onEntityClick: (entity: HistoricalEntity) => void;
}

export function InteractiveHistoryText({ text, onEntityClick }: Props) {
  // Build a lookup map: lowercased name/alias -> entity
  const lookup = useMemo(() => {
    const map = new Map<string, HistoricalEntity>();
    for (const entity of Object.values(historicalEntities)) {
      map.set(entity.name.toLowerCase(), entity);
      if (entity.aliases) {
        for (const alias of entity.aliases) {
          map.set(alias.toLowerCase(), entity);
        }
      }
    }
    return map;
  }, []);

  // Build regex from all names/aliases, sorted longest-first to avoid partial matches
  const regex = useMemo(() => {
    const patterns: string[] = [];
    for (const entity of Object.values(historicalEntities)) {
      patterns.push(entity.name);
      if (entity.aliases) patterns.push(...entity.aliases);
    }
    // Sort longest first so longer names match before shorter substrings
    patterns.sort((a, b) => b.length - a.length);
    const escaped = patterns.map((p) =>
      p.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
    );
    return new RegExp(`(${escaped.join('|')})`, 'gi');
  }, []);

  const handleClick = useCallback(
    (part: string) => {
      const entity = lookup.get(part.toLowerCase());
      if (entity) {
        onEntityClick(entity);
      }
    },
    [lookup, onEntityClick]
  );

  const parts = text.split(regex);

  return (
    <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
      {parts.map((part, i) => {
        const entity = lookup.get(part.toLowerCase());
        if (entity) {
          return (
            <button
              key={i}
              type="button"
              onClick={() => handleClick(part)}
              className={`inline cursor-pointer rounded px-0.5 font-semibold underline decoration-dotted underline-offset-2 transition hover:opacity-80 ${
                entity.type === 'person'
                  ? 'text-violet-600 dark:text-violet-300'
                  : 'text-blue-600 dark:text-blue-300'
              }`}
            >
              {part}
            </button>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}
