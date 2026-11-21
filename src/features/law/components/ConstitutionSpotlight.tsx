'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, BookOpen, Sparkles, Scale } from 'lucide-react';
import { useLanguageStore } from '@/features/language/useLanguageStore';

export function ConstitutionSpotlight() {
  const { t, language } = useLanguageStore();

  const keyArticles = [
    { num: 1, label: language === 'uz' ? '1-modda: Davlat suvereniteti' : 'Статья 1: Государственный суверенитет', id: '1-modda' },
    { num: 13, label: language === 'uz' ? '13-modda: Demokratiya' : 'Статья 13: Демократия', id: '13-modda' },
    { num: 19, label: language === 'uz' ? '19-modda: Inson huquqlari' : 'Статья 19: Права человека', id: '19-modda' },
    { num: 41, label: language === 'uz' ? '41-modda: Ta’lim olish huquqi' : 'Статья 41: Право на образование', id: '41-modda' },
    { num: 54, label: language === 'uz' ? '54-modda: Mulkdorlik huquqi' : 'Статья 54: Право собственности', id: '54-modda' },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-10 border border-blue-900/40 shadow-2xl">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Oliy yuridik kuchga ega hujjat</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {t.home.constitutionBanner}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            {t.home.constitutionDesc} Barcha fuqarolar, davlat organlari va qonunlar uchun bosh poydevor hisoblanadi.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/huquq/kodekslar/konstitutsiya"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
            >
              <BookOpen className="w-4 h-4" />
              <span>{t.home.constitutionBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <span className="text-xs text-slate-400 flex items-center gap-1.5 pl-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>30.04.2023 Referendum tahriri</span>
            </span>
          </div>
        </div>

        {/* Key Articles Quick Links */}
        <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Scale className="w-4 h-4" />
              Asosiy moddalar
            </span>
            <span className="text-[11px] text-slate-400">155 ta modda</span>
          </div>

          <div className="space-y-1.5">
            {keyArticles.map((art) => (
              <Link
                key={art.num}
                href={`/huquq/kodekslar/konstitutsiya/${art.id}`}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 text-xs font-medium text-slate-200 hover:text-white transition-colors group"
              >
                <span>{art.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
