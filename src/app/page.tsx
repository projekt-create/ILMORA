'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Atom,
  Award,
  BookOpen,
  Calculator,
  FlaskConical,
  GraduationCap,
  Languages,
  Landmark,
  Microscope,
  Scale,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Globe2,
} from 'lucide-react';
import { useLanguageStore } from '@/features/language/useLanguageStore';

interface SubjectItem {
  id: string;
  title: string;
  category: 'social' | 'exact' | 'natural' | 'language';
  description: string;
  href?: string;
  available: boolean;
  icon: typeof Scale;
  badge?: string;
  gradient: string;
  stats?: string;
}

const subjects: SubjectItem[] = [
  {
    id: 'law',
    title: 'Huquq',
    category: 'social',
    description: 'Qonunchilik, barcha amaldagi kodekslar va O‘zbekiston Konstitutsiyasi.',
    href: '/huquq',
    available: true,
    icon: Scale,
    badge: 'To‘liq faol',
    gradient: 'from-blue-900 via-indigo-900 to-slate-900',
    stats: '15+ Kodeks · Rasmiy Lex.uz',
  },
  {
    id: 'history',
    title: 'Tarix',
    category: 'social',
    description: 'O‘zbekiston va jahon tarixi, interaktiv xaritalar va milliy sertifikat.',
    href: '/tarix',
    available: true,
    icon: Landmark,
    badge: 'To‘liq faol',
    gradient: 'from-amber-600 via-orange-700 to-yellow-800',
    stats: 'Barcha davrlar · Xaritalar · Testlar',
  },
  {
    id: 'math',
    title: 'Matematika',
    category: 'exact',
    description: 'Algebra, geometriya, mantiqiy masalalar va milliy sertifikat topshiriqlari.',
    available: false,
    icon: Calculator,
    gradient: 'from-cyan-800 to-blue-950',
    stats: 'Tez kunda',
  },
  {
    id: 'physics',
    title: 'Fizika',
    category: 'exact',
    description: 'Mexanika, termodinamika, elektromagnetizm va interaktiv tajriba simulyatsiyalari.',
    available: false,
    icon: Atom,
    gradient: 'from-violet-800 to-indigo-950',
    stats: 'Tez kunda',
  },
  {
    id: 'chemistry',
    title: 'Kimyo',
    category: 'natural',
    description: 'Anorganik va organik kimyo, reaksiyalar mexanizmi hamda davriy sistema.',
    available: false,
    icon: FlaskConical,
    gradient: 'from-emerald-800 to-teal-950',
    stats: 'Tez kunda',
  },
  {
    id: 'literature',
    title: 'Ona tili va adabiyot',
    category: 'language',
    description: 'Til qoidalari, orfografiya, lug‘at boyligi va mumtoz adabiy meros tahlili.',
    available: false,
    icon: BookOpen,
    gradient: 'from-rose-800 to-pink-950',
    stats: 'Tez kunda',
  },
  {
    id: 'biology',
    title: 'Biologiya',
    category: 'natural',
    description: 'Sitologiya, genetika, botanika, zoologiya va inson anatomiyasi asoslari.',
    available: false,
    icon: Microscope,
    gradient: 'from-teal-800 to-emerald-950',
    stats: 'Tez kunda',
  },
  {
    id: 'english',
    title: 'Ingliz tili',
    category: 'language',
    description: 'Grammatika, so‘z boyligi, CEFR va milliy sertifikat imtihonlariga tayyorgarlik.',
    available: false,
    icon: Languages,
    gradient: 'from-sky-800 to-blue-950',
    stats: 'Tez kunda',
  },
];

export default function HomePage() {
  const { language } = useLanguageStore();
  const [filter, setFilter] = useState<'all' | 'active' | 'social' | 'exact' | 'natural'>('all');

  const isRu = language === 'ru';

  const filteredSubjects = useMemo(() => {
    if (filter === 'all') return subjects;
    if (filter === 'active') return subjects.filter((s) => s.available);
    if (filter === 'social') return subjects.filter((s) => s.category === 'social');
    if (filter === 'exact') return subjects.filter((s) => s.category === 'exact');
    if (filter === 'natural') return subjects.filter((s) => s.category === 'natural');
    return subjects;
  }, [filter]);

  return (
    <main className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4 pb-20 pt-16 text-white sm:pb-28 sm:pt-20">
        {/* Glow Effects */}
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(212,175,55,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,.12)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Sparkles className="h-4 w-4" />
              {isRu ? 'Национальная образовательная платформа ILMORA' : 'ILMORA · Milliy ta’lim platformasi'}
            </div>

            <h1 className="text-4xl font-black tracking-tight sm:text-6xl sm:leading-tight">
              {isRu ? 'Знания без границ. ' : 'Bilim sari '}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                {isRu ? 'Понимайте, а не заучивайте.' : 'aniq va tizimli yo‘l.'}
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300 sm:text-xl">
              {isRu
                ? 'Интерактивные модули права и истории с проверенными источниками, картами, хронологией и подготовкой к Национальному сертификату.'
                : 'Huquq va Tarix fanlari bo‘yicha rasmiy manbalarga asoslangan mukammal darslar, interaktiv xaritalar, xronologiya va Milliy sertifikatga tayyorgarlik tizimi.'}
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
              <Link
                href="/huquq"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 px-7 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-900/30 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Scale className="h-5 w-5 text-amber-300" />
                {isRu ? 'Правовой портал' : 'Huquq moduli'}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                href="/tarix"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-7 py-4 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:from-amber-400 hover:to-orange-500"
              >
                <Landmark className="h-5 w-5" />
                {isRu ? 'Центр истории' : 'Tarix markazi'}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-8 sm:grid-cols-4 sm:gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <span className="text-2xl font-black text-amber-400 sm:text-3xl">2 ta</span>
                <p className="mt-1 text-xs text-slate-400">{isRu ? 'Активных модуля' : 'To‘liq faol modul'}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <span className="text-2xl font-black text-amber-400 sm:text-3xl">15+</span>
                <p className="mt-1 text-xs text-slate-400">{isRu ? 'Кодексов и актов' : 'Amaldagi kodekslar'}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <span className="text-2xl font-black text-amber-400 sm:text-3xl">100%</span>
                <p className="mt-1 text-xs text-slate-400">{isRu ? 'Проверенные источники' : 'Tekshirilgan manbalar'}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <span className="text-2xl font-black text-amber-400 sm:text-3xl">BBA / UzBMB</span>
                <p className="mt-1 text-xs text-slate-400">{isRu ? 'Стандарт сертификата' : 'Sertifikat formati'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Core Modules Section */}
      <section className="mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Law Core Card */}
          <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-9">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-bl-full bg-blue-500/5 transition group-hover:scale-110" />
            <div className="flex items-start justify-between">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-900 dark:bg-blue-500/10 dark:text-blue-300">
                <Scale className="h-7 w-7" />
              </span>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wider text-blue-900 dark:bg-blue-500/20 dark:text-blue-300">
                {isRu ? 'Правовой модуль' : 'Huquq moduli'}
              </span>
            </div>

            <h2 className="mt-6 text-2xl font-black text-blue-950 dark:text-white sm:text-3xl">
              {isRu ? 'Правоведение и законы Узбекистана' : 'Huquqiy bilimlar va Qonunlar'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
              {isRu
                ? 'Конституция Республики Узбекистан, все действующие официальные кодексы, быстрый поиск по статьям и нормам с интеграцией базы Lex.uz.'
                : 'O‘zbekiston Respublikasi Konstitutsiyasi, barcha amaldagi rasmiy kodekslar, moddalar bo‘yicha aqlli qidiruv va Lex.uz milliy qonunchilik bazasi.'}
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span className="rounded-xl bg-slate-100 px-3 py-1.5 dark:bg-slate-800">
                ⚖️ {isRu ? 'Конституция' : 'Bosh qomus'}
              </span>
              <span className="rounded-xl bg-slate-100 px-3 py-1.5 dark:bg-slate-800">
                📜 {isRu ? '15+ Кодексов' : '15+ Kodekslar'}
              </span>
              <span className="rounded-xl bg-slate-100 px-3 py-1.5 dark:bg-slate-800">
                🔍 {isRu ? 'Умный поиск' : 'Aqlli qidiruv'}
              </span>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="/huquq"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-900 hover:text-blue-700 dark:text-amber-400 dark:hover:text-amber-300"
              >
                {isRu ? 'Перейти в раздел Права' : 'Huquq portaliga o‘tish'} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* History Core Card */}
          <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-9">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-bl-full bg-amber-500/5 transition group-hover:scale-110" />
            <div className="flex items-start justify-between">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300">
                <Landmark className="h-7 w-7" />
              </span>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black uppercase tracking-wider text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
                {isRu ? 'Исторический модуль' : 'Tarix moduli'}
              </span>
            </div>

            <h2 className="mt-6 text-2xl font-black text-blue-950 dark:text-white sm:text-3xl">
              {isRu ? 'История Узбекистана и мира' : 'O‘zbekiston va Jahon tarixi'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
              {isRu
                ? 'Глубокие интерактивные уроки от эпохи палеолита до независимости, карта древних областей, таймлайн дат, личности и подготовка к сертификату.'
                : 'Paleolitdan to Mustaqillik davrigacha bo‘lgan darslar, qadimgi viloyatlarning interaktiv SVG xaritasi, sanalar xronologiyasi va sertifikat testlari.'}
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span className="rounded-xl bg-slate-100 px-3 py-1.5 dark:bg-slate-800">
                🗺️ {isRu ? 'Интерактивная карта' : 'Tarixiy xaritalar'}
              </span>
              <span className="rounded-xl bg-slate-100 px-3 py-1.5 dark:bg-slate-800">
                📅 {isRu ? 'Хронология' : 'Vaqt chizig‘i'}
              </span>
              <span className="rounded-xl bg-slate-100 px-3 py-1.5 dark:bg-slate-800">
                🏆 {isRu ? 'Сертификат BBA' : 'Milliy sertifikat'}
              </span>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="/tarix"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
              >
                {isRu ? 'Перейти в раздел Истории' : 'Tarix markaziga o‘tish'} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* All Subjects Catalog */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end border-b border-slate-200 pb-5 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <GraduationCap className="h-4 w-4" />
              {isRu ? 'Каталог предметов' : 'Fanlar katalogi'}
            </div>
            <h2 className="mt-1 text-2xl font-black text-blue-950 dark:text-white sm:text-3xl">
              {isRu ? 'Выберите предмет для изучения' : 'O‘rganish yo‘nalishini tanlang'}
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none sm:flex-wrap">
            {[
              { id: 'all', label: isRu ? 'Все' : 'Barchasi' },
              { id: 'active', label: isRu ? 'Доступные' : 'Faol modullar' },
              { id: 'social', label: isRu ? 'Гуманитарные' : 'Ijtimoiy-gumanitar' },
              { id: 'exact', label: isRu ? 'Точные' : 'Aniq fanlar' },
              { id: 'natural', label: isRu ? 'Естественные' : 'Tabiiy fanlar' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setFilter(item.id as typeof filter)}
                className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  filter === item.id
                    ? 'bg-blue-950 text-amber-300 dark:bg-amber-400 dark:text-slate-950'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredSubjects.map((subject) => {
            const Icon = subject.icon;

            const cardContent = (
              <>
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber-300 ring-1 ring-white/15">
                    <Icon className="h-6 w-6" />
                  </span>
                  {subject.available ? (
                    <span className="rounded-full bg-emerald-400/20 px-2.5 py-1 text-[10px] font-extrabold text-emerald-300 border border-emerald-400/30">
                      {isRu ? 'Доступно' : 'Mavjud'}
                    </span>
                  ) : (
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-white/70">
                      {isRu ? 'Скоро' : 'Tez kunda'}
                    </span>
                  )}
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-extrabold text-white">{subject.title}</h3>
                  <p className="mt-2 min-h-12 text-xs leading-relaxed text-white/75">
                    {subject.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-bold text-amber-300">
                  <span>{subject.stats}</span>
                  {subject.available && (
                    <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  )}
                </div>
              </>
            );

            return subject.available ? (
              <Link
                key={subject.id}
                href={subject.href!}
                className={`group flex min-h-60 flex-col justify-between rounded-3xl bg-gradient-to-br ${subject.gradient} p-6 shadow-md transition hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-400/40`}
              >
                {cardContent}
              </Link>
            ) : (
              <article
                key={subject.id}
                aria-label={`${subject.title}, tez kunda qo‘shiladi`}
                className={`flex min-h-60 flex-col justify-between rounded-3xl bg-gradient-to-br ${subject.gradient} p-6 opacity-80`}
              >
                {cardContent}
              </article>
            );
          })}
        </div>
      </section>

      {/* Why ILMORA Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {isRu ? 'Преимущества платформы' : 'Nega aynan ILMORA?'}
            </span>
            <h2 className="mt-2 text-2xl font-black text-blue-950 dark:text-white sm:text-3xl">
              {isRu ? 'Современное национальное образование' : 'Zamonaviy, ilmiy va tizimli ta’lim'}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {isRu
                ? 'Платформа разработана для школьников, абитуриентов, студентов и преподавателей.'
                : 'Platforma abituriyentlar, maktab o‘quvchilari, talabalar va o‘qituvchilar uchun qulay qilib loyihalashtirilgan.'}
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-bold text-slate-900 dark:text-white">
                {isRu ? 'Проверенные источники' : 'Rasmiy va tekshirilgan'}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {isRu
                  ? 'Все документы и факты синхронизированы с Lex.uz, Национальной энциклопедией и ООН.'
                  : 'Barcha ma’lumotlar Lex.uz qonunchilik bazasi, O‘zbekiston Milliy Ensiklopediyasi va BMT bilan mos.'}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                <TrendingUp className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-bold text-slate-900 dark:text-white">
                {isRu ? 'Динамический прогресс' : 'Haqiqiy progress'}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {isRu
                  ? 'Сохранение прочитанных тем, закладок и результатов тестов без необходимости сложной регистрации.'
                  : 'O‘qilgan mavzular, test natijalari va sevimlilar brauzeringizda avtomatik xotirada saqlanadi.'}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                <Award className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-bold text-slate-900 dark:text-white">
                {isRu ? 'Национальный сертификат' : 'Milliy sertifikat'}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {isRu
                  ? 'Форматы тестов и критерии оценивания соответствуют государственному агентству UzBMB.'
                  : 'UzBMB (BBA) baholash mezonlari va test bloklariga to‘liq mos keluvchi amaliy tayyorgarlik.'}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">
                <Globe2 className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-bold text-slate-900 dark:text-white">
                {isRu ? 'Двуязычный интерфейс' : 'Ko‘p tilli interfeys'}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {isRu
                  ? 'Полная поддержка узбекского и русского языков с мгновенным переключением.'
                  : 'O‘zbek va rus tillarida qulay va zamonaviy ta’lim tajribasi.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
