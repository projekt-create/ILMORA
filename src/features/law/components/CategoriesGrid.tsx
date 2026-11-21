'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  BookMarked,
  FileText,
  Award,
  Scroll,
  Building2,
  Landmark,
  FolderArchive,
  ArrowUpRight,
} from 'lucide-react';
import { LAW_CATEGORIES } from '../data/categoriesData';
import { useLanguageStore } from '@/features/language/useLanguageStore';

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-amber-500" />,
  BookMarked: <BookMarked className="w-5 h-5 text-blue-500" />,
  FileText: <FileText className="w-5 h-5 text-indigo-500" />,
  Award: <Award className="w-5 h-5 text-amber-600" />,
  Scroll: <Scroll className="w-5 h-5 text-emerald-500" />,
  Building2: <Building2 className="w-5 h-5 text-purple-500" />,
  Landmark: <Landmark className="w-5 h-5 text-cyan-500" />,
  FolderArchive: <FolderArchive className="w-5 h-5 text-slate-500" />,
};

export function CategoriesGrid() {
  const { language } = useLanguageStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {LAW_CATEGORIES.map((cat) => {
        const title = language === 'ru' ? cat.nameRu : cat.nameUz;
        const desc = language === 'ru' ? cat.descriptionRu : cat.descriptionUz;
        const targetHref =
          cat.id === 'konstitutsiya'
            ? '/huquq/kodekslar/konstitutsiya'
            : cat.id === 'kodekslar'
            ? '/huquq/kodekslar'
            : `/huquq/kategoriyalar/${cat.id}`;

        return (
          <Link
            key={cat.id}
            href={targetHref}
            className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700/60 group-hover:scale-105 transition-transform">
                  {iconMap[cat.iconName]}
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {cat.count} ta
                </span>
              </div>

              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-1.5 flex items-center justify-between">
                <span>{title}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-amber-500 transition-opacity" />
              </h4>

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {desc}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
