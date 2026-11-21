'use client';

import React from 'react';
import Link from 'next/link';
import {
  Scale,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { SmartSearchBar } from '@/features/search/components/SmartSearchBar';
import { ConstitutionSpotlight } from '@/features/law/components/ConstitutionSpotlight';
import { CodeCard } from '@/features/law/components/CodeCard';
import { CategoriesGrid } from '@/features/law/components/CategoriesGrid';
import { UsefulResources } from '@/features/law/components/UsefulResources';
import { RecentlyViewed } from '@/features/law/components/RecentlyViewed';
import { OFFICIAL_CODES_CATALOG } from '@/features/law/data/codesCatalog';
import { useLanguageStore } from '@/features/language/useLanguageStore';

export default function HomePage() {
  const { t } = useLanguageStore();

  const popularCodes = OFFICIAL_CODES_CATALOG.filter((c) => c.isPopular);

  return (
    <div className="space-y-12 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 text-white pt-12 sm:pt-20 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 border-b border-blue-900/40">
        {/* Subtle background mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/60 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide backdrop-blur-md shadow-xs animate-in fade-in-50">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>{t.home.heroTitle}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            O‘zbekiston Qonunchiligini <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
              Aqlli va Tizimli
            </span>{' '}
            O‘rganing
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.home.heroSubtitle}
          </p>

          {/* Smart Hero Search Bar */}
          <div className="max-w-3xl mx-auto pt-4 text-left">
            <SmartSearchBar isHero />
          </div>

          {/* Quick stats & verification badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>18 ta rasmiy kodeks</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>5,000+ qonun moddalari</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Lex.uz rasmiy bazasi integratsiyasi</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Recently Viewed */}
        <RecentlyViewed />

        {/* CONSTITUTION SPOTLIGHT */}
        <section>
          <ConstitutionSpotlight />
        </section>

        {/* MOST POPULAR CODES */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                <BookOpen className="w-4 h-4" />
                <span>{t.nav.codes}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 dark:text-white tracking-tight">
                {t.home.popularCodes}
              </h2>
            </div>
            <Link
              href="/huquq/kodekslar"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-amber-400 hover:gap-2 transition-all"
            >
              <span>{t.home.allCodesLink}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCodes.map((code) => (
              <CodeCard key={code.id} document={code} />
            ))}
          </div>
        </section>

        {/* CATEGORIES GRID */}
        <section className="space-y-6">
          <div className="pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              <Layers className="w-4 h-4" />
              <span>Toifalar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 dark:text-white tracking-tight">
              {t.home.categoriesTitle}
            </h2>
          </div>

          <CategoriesGrid />
        </section>

        {/* USEFUL OFFICIAL RESOURCES */}
        <section className="space-y-6">
          <div className="pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Rasmiy manbalar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 dark:text-white tracking-tight">
              {t.home.usefulResources}
            </h2>
          </div>

          <UsefulResources />
        </section>

        {/* FUTURE EDTECH ROADMAP / SUBJECTS BANNER */}
        <section className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
                <GraduationCap className="w-4 h-4" />
                <span>ILMORA Ekotizimi</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Barcha fanlar va Milliy sertifikat sinovlariga tayyorgarlik
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                ILMORA faqat huquq bilan cheklanmaydi. Tez kunda platformada Matematika, Tarix, Ona tili va adabiyot, Fizika, Kimyo, Biologiya va boshqa fanlar bo‘yicha interaktiv darsliklar hamda test tizimi ishga tushiriladi.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/huquq"
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-md shadow-amber-500/20"
              >
                Huquq bo‘limini o‘rganish
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
