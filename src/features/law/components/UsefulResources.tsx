'use client';

import React from 'react';
import { ExternalLink, Globe } from 'lucide-react';
import { USEFUL_LEGAL_RESOURCES } from '../data/usefulResourcesData';
import { useLanguageStore } from '@/features/language/useLanguageStore';

export function UsefulResources() {
  const { language } = useLanguageStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {USEFUL_LEGAL_RESOURCES.map((item) => {
        const title = language === 'ru' ? item.nameRu : item.name;
        const desc = language === 'ru' ? item.descriptionRu : item.description;

        return (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-amber-500/40 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-amber-400 border border-blue-100 dark:border-slate-700">
                  {item.badge}
                </span>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-colors" />
              </div>

              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-colors mb-1.5">
                {title}
              </h4>

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {desc}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-slate-400" />
                {item.url.replace('https://', '').replace('/', '')}
              </span>
              <span className="font-semibold text-blue-600 dark:text-amber-400 group-hover:underline">
                Portalga o‘tish →
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}
