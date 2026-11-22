'use client';

import { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  FileText,
  Target,
  ExternalLink,
} from 'lucide-react';
import { useLanguageStore } from '@/features/language/useLanguageStore';

interface PracticeQuestion {
  id: string;
  type: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

const sampleTasks: PracticeQuestion[] = [
  {
    id: 'c1',
    type: 'Blok A: Yopiq test (1 to‘g‘ri javobli)',
    prompt: 'Amir Temur qaysi jangda Usmonli sultoni Boyazid Yildirim qo‘shinlarini mag‘lubiyatga uchratgan?',
    options: ['1395-yil Terek jangi', '1402-yil Anqara jangi', '1365-yil Loy jangi', '1391-yil Qunduzcha jangi'],
    answer: 1,
    explanation: '1402-yil 20-iyulda bo‘lib o‘tgan tarixiy Anqara jangida Amir Temur Boyazid ustidan to‘liq g‘alaba qozongan.',
  },
  {
    id: 'c2',
    type: 'Blok B: Xronologik ketma-ketlik',
    prompt: 'Quyidagi voqealarni yuz bergan vaqti bo‘yicha to‘g‘ri xronologik ketma-ketlikda belgilang: 1) O‘zbekiston BMTga a’zo bo‘ldi; 2) Davlat bayrog‘i qabul qilindi; 3) O‘zbekiston mustaqilligi e’lon qilindi; 4) Konstitutsiya qabul qilindi.',
    options: [
      '3 -> 2 -> 1 -> 4',
      '2 -> 3 -> 4 -> 1',
      '3 -> 1 -> 2 -> 4',
      '1 -> 3 -> 2 -> 4',
    ],
    answer: 0,
    explanation: '3) Mustaqillik (1991-yil 31-avgust) -> 2) Bayroq (1991-yil 18-noyabr) -> 1) BMT a’zoligi (1992-yil 2-mart) -> 4) Konstitutsiya (1992-yil 8-dekabr).',
  },
  {
    id: 'c3',
    type: 'Blok C: Tarixiy manba bilan ishlash',
    prompt: '"Rosti-rusti" (Kuch — adolatdadir) shiori Amir Temurning qaysi yodgorligi yoki ramzida asosiy mezon qilib belgilangan?',
    options: ['Davlat muhri va Oqsaroy peshtoqi', 'Ulug‘bek rasadxonasi peshtoqi', 'Go‘ri Amir gumbazi', 'Bibixonim madrasasi kitobasi'],
    answer: 0,
    explanation: 'Amir Temur davlat muhrida va Shahrisabzdagi Oqsaroy peshtoqida "Adolat — davlatning asosi va hukmdorlar shioridir" hamda "Rosti-rusti" shiorlari aks ettirilgan.',
  },
];

export function HistoryCertificateView() {
  const { language } = useLanguageStore();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const isRu = language === 'ru';

  const handleSelect = (questionId: string, optIdx: number) => {
    if (submitted[questionId]) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optIdx }));
  };

  const handleCheck = (questionId: string) => {
    setSubmitted((prev) => ({ ...prev, [questionId]: true }));
  };

  return (
    <div className="space-y-10">
      {/* Intro Banner */}
      <section className="rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 p-5 sm:p-8 text-white shadow-md">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Award className="h-4 w-4" /> UzBMB (BBA) Milliy sertifikat
            </div>
            <h2 className="text-3xl font-black sm:text-4xl">
              {isRu
                ? 'Национальный сертификат по предмету «История»'
                : 'Tarix fanidan Milliy sertifikat tizimi'}
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
              {isRu
                ? 'Полный справочник по структуре экзамена, распределению баллов, критериям уровней A+, A, B+, B и образцам практических заданий.'
                : 'Imtihon strukturasi, ballar taqsimoti, A+, A, B+, B darajalari va namunaviy topshiriqlar bo‘yicha to‘liq amaliy qo‘llanma.'}
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <a
              href="https://uzbmb.uz/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-5 py-3 text-xs font-bold text-slate-950 transition hover:bg-amber-300"
            >
              UzBMB Rasmiy portali <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Exam Structure and Grading Scale */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Structure Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-amber-400">
            <FileText className="h-4 w-4" /> {isRu ? 'Структура теста' : 'Test strukturasi'}
          </div>
          <h3 className="mt-2 text-xl font-extrabold text-slate-900 dark:text-white">
            {isRu ? '45 тестовых заданий' : '45 ta topshiriq formati'}
          </h3>

          <div className="mt-5 space-y-3 text-xs">
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
              <span className="font-extrabold text-blue-950 dark:text-amber-300">
                1-bo‘lim: 1 to‘g‘ri javobli yopiq testlar (30 ta)
              </span>
              <p className="mt-1 text-slate-500 dark:text-slate-400">
                Faktlar, atamalar, shaxslar va sanalarni aniqlashga yo‘naltirilgan. Har biri 1.5 ball.
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
              <span className="font-extrabold text-blue-950 dark:text-amber-300">
                2-bo‘lim: Moslashtirish va xronologiya (10 ta)
              </span>
              <p className="mt-1 text-slate-500 dark:text-slate-400">
                Voqealarni ketma-ket joylashtirish va xususiyatlarni moslashtirish. Har biri 2.1 ball.
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
              <span className="font-extrabold text-blue-950 dark:text-amber-300">
                3-bo‘lim: Tarixiy manba va xarita tahlili (5 ta)
              </span>
              <p className="mt-1 text-slate-500 dark:text-slate-400">
                Hujjat matni, xaritadagi belgi va sabab-oqibatni tahlil qilish. Har biri 2.8 ball.
              </p>
            </div>
          </div>
        </div>

        {/* Grading Scale */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Target className="h-4 w-4" /> {isRu ? 'Критерии оценивания' : 'Baholash va imtiyoz darajalari'}
          </div>
          <h3 className="mt-2 text-xl font-extrabold text-slate-900 dark:text-white">
            {isRu ? 'Шкала сертификатов' : 'Sertifikat darajalari'}
          </h3>

          <div className="mt-5 space-y-2.5 text-xs">
            <div className="flex items-center justify-between rounded-xl bg-amber-50 p-3 font-bold text-amber-950 dark:bg-amber-950/40 dark:text-amber-200">
              <span>A+ daraja (86% dan yuqori)</span>
              <span className="rounded-md bg-amber-200/60 px-2 py-0.5 text-[11px] text-amber-900 dark:bg-amber-800 dark:text-amber-100">
                100% Maksimal ball imtiyozi
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-blue-50 p-3 font-bold text-blue-950 dark:bg-blue-950/40 dark:text-blue-200">
              <span>A daraja (78% – 85.9%)</span>
              <span className="rounded-md bg-blue-200/60 px-2 py-0.5 text-[11px] text-blue-900 dark:bg-blue-800 dark:text-blue-100">
                Maksimal ball imtiyozi
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-3 font-bold text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-200">
              <span>B+ daraja (70% – 77.9%)</span>
              <span className="rounded-md bg-emerald-200/60 px-2 py-0.5 text-[11px] text-emerald-900 dark:bg-emerald-800 dark:text-emerald-100">
                Mutanosib tabaqalashtirilgan ball
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <span>B daraja (60% – 69.9%)</span>
              <span className="text-slate-500">Mutanosib ball</span>
            </div>
          </div>
        </div>
      </div>

      {/* Practice Tasks Section */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <HelpCircle className="h-4 w-4" /> {isRu ? 'Практические задания' : 'Namunaviy amaliy topshiriqlar'}
          </div>
          <h3 className="mt-1 text-2xl font-black text-blue-950 dark:text-white">
            {isRu ? 'Проверьте себя в формате сертификата' : 'Sertifikat formatidagi mashqlar'}
          </h3>
        </div>

        <div className="mt-6 space-y-6">
          {sampleTasks.map((task, idx) => {
            const isDone = submitted[task.id];
            const selected = answers[task.id];
            const isCorrect = selected === task.answer;

            return (
              <div
                key={task.id}
                className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-slate-800/40"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-[11px] font-extrabold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                    {task.type}
                  </span>
                  <span className="text-xs font-bold text-slate-400">Topshiriq #{idx + 1}</span>
                </div>

                <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {task.prompt}
                </p>

                <div className="mt-4 space-y-2">
                  {task.options.map((opt, optIdx) => {
                    const isOptSelected = selected === optIdx;
                    let style = 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800';

                    if (isDone) {
                      if (optIdx === task.answer) {
                        style = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold dark:bg-emerald-950/40 dark:text-emerald-200';
                      } else if (isOptSelected && !isCorrect) {
                        style = 'border-rose-400 bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200';
                      } else {
                        style = 'opacity-50 border-slate-200 dark:border-slate-700';
                      }
                    } else if (isOptSelected) {
                      style = 'border-blue-950 bg-blue-50 font-bold dark:border-amber-400 dark:bg-amber-400/10';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelect(task.id, optIdx)}
                        className={`flex w-full items-center justify-between rounded-xl border p-3 text-left text-xs transition ${style}`}
                      >
                        <span>{opt}</span>
                        {isDone && optIdx === task.answer && (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  {!isDone ? (
                    <button
                      disabled={selected === undefined}
                      onClick={() => handleCheck(task.id)}
                      className="rounded-xl bg-blue-950 px-4 py-2 text-xs font-bold text-amber-300 transition hover:bg-blue-900 disabled:opacity-40"
                    >
                      Javobni tekshirish
                    </button>
                  ) : (
                    <div className="w-full rounded-xl bg-amber-50 p-3 text-xs leading-relaxed text-amber-950 dark:bg-amber-950/30 dark:text-amber-200">
                      <strong>Izoh va tahlil:</strong> {task.explanation}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recommended Literature */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-7">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-amber-400">
          <BookOpen className="h-4 w-4" /> {isRu ? 'Рекомендуемая литература' : 'Tavsiya etiladigan rasmiy darsliklar'}
        </div>
        <h3 className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white">
          {isRu ? 'Официальные источники подготовки' : 'BBA dasturi bo‘yicha asosiy adabiyotlar'}
        </h3>
        <ul className="mt-4 grid gap-3 text-xs text-slate-600 sm:grid-cols-2 dark:text-slate-300">
          <li className="flex items-start gap-2 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-500" />
            <span>O‘zbekiston tarixi (6, 7, 8, 9, 10, 11-sinf darsliklari)</span>
          </li>
          <li className="flex items-start gap-2 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-500" />
            <span>Jahon tarixi (6, 7, 8, 9, 10, 11-sinf darsliklari)</span>
          </li>
          <li className="flex items-start gap-2 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-500" />
            <span>Tarixiy xaritalar va atlaslar to‘plami (Respublika ta’lim markazi)</span>
          </li>
          <li className="flex items-start gap-2 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-500" />
            <span>O‘zbekiston Respublikasi Konstitutsiyasi va qonun hujjatlari (Lex.uz)</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
