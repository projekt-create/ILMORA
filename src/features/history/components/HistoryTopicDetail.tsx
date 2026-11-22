'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  Lightbulb,
  Sparkles,
  Users,
  Calendar,
  Layers,
  Award,
} from 'lucide-react';
import type { HistoryTopic } from '@/features/history/data/historyData';
import { InteractiveHistoryText } from '@/features/history/components/InteractiveHistoryText';
import { EntityDetailModal } from '@/features/history/components/EntityDetailModal';
import { BattleTacticsView } from '@/features/history/components/BattleTacticsView';
import { battleTacticsData } from '@/features/history/data/battleTacticsData';
import type { HistoricalEntity } from '@/features/history/data/entitiesData';
import { useHistoryProgress } from '@/features/history/hooks/useHistoryProgress';
import { useLanguageStore } from '@/features/language/useLanguageStore';

interface HistoryTopicDetailProps {
  topic: HistoryTopic;
  section: string;
}

export function HistoryTopicDetail({ topic, section }: HistoryTopicDetailProps) {
  const [selectedEntity, setSelectedEntity] = useState<HistoricalEntity | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const { read, toggleRead, favorites, toggleFavorite } = useHistoryProgress();
  const { t, language } = useLanguageStore();

  const isRead = read.includes(topic.id);
  const isFavorite = favorites.includes(topic.id);
  const isRu = language === 'ru';
  const battleTactics = battleTacticsData[topic.id];

  const handleEntityClick = (entity: HistoricalEntity) => {
    setSelectedEntity(entity);
  };

  const handleQuizAnswer = (qIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  return (
    <main className="mx-auto max-w-4xl space-y-10 px-4 py-10 sm:px-6">
      {/* Entity Detail Modal */}
      {selectedEntity && (
        <EntityDetailModal entity={selectedEntity} onClose={() => setSelectedEntity(null)} />
      )}

      {/* Navigation and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Link
          href={`/tarix/${section}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-blue-900 dark:hover:text-amber-400"
        >
          <ArrowLeft className="h-4 w-4" />
          {section === 'world'
            ? isRu
              ? 'Всемирная история'
              : 'Jahon tarixi'
            : isRu
              ? 'История Узбекистана'
              : "O\u2018zbekiston tarixi"}
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleRead(topic.id)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              isRead
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700'
                : 'bg-blue-950 text-amber-300 hover:bg-blue-900'
            }`}
          >
            <CheckCircle2 className={`h-4 w-4 ${isRead ? 'text-emerald-600' : 'text-amber-400'}`} />
            {isRead ? t.history.readMarked : t.history.markAsRead}
          </button>

          <button
            onClick={() => toggleFavorite(topic.id)}
            aria-label="Add to favorites"
            className={`rounded-xl border p-2 text-base transition ${
              isFavorite
                ? 'border-amber-300 bg-amber-50 text-amber-500 dark:border-amber-500/30 dark:bg-amber-500/10'
                : 'border-slate-200 text-slate-400 hover:text-amber-500 dark:border-slate-800'
            }`}
          >
            ★
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <BookOpen className="h-4 w-4" /> {topic.period}
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-blue-950 dark:text-white leading-tight">
          {topic.title}
        </h1>
        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
          {topic.summary}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {topic.verificationStatus === 'verified'
              ? isRu
                ? 'Источник проверен'
                : 'Manba tekshirilgan'
              : isRu
                ? 'Редакционный материал'
                : 'Tahririyat izohi'}
          </span>
          <a
            href={topic.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 font-bold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          >
            {topic.source} <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      {/* Overview Section */}
      {topic.overview && (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Lightbulb className="h-4 w-4" />{' '}
            {isRu ? 'Краткое содержание и суть' : 'Mavzuning qisqacha mohiyati'}
          </div>
          <InteractiveHistoryText text={topic.overview} onEntityClick={handleEntityClick} />
        </section>
      )}

      {/* Detailed Lesson Sections */}
      {topic.detailedSections && topic.detailedSections.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl font-extrabold text-blue-950 dark:text-white">
            {isRu ? 'Подробные материалы урока' : 'Darsning asosiy mazmuni'}
          </h2>
          <div className="space-y-5">
            {topic.detailedSections.map((sec, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8"
              >
                <h3 className="flex items-center gap-2 text-lg font-extrabold text-slate-900 dark:text-white">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-xs font-black text-amber-600 dark:bg-amber-500/10 dark:text-amber-300">
                    {idx + 1}
                  </span>
                  {sec.title}
                </h3>
                <InteractiveHistoryText text={sec.content} onEntityClick={handleEntityClick} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Battle Tactical Map & Frontline Movements (if battle topic) */}
      {battleTactics && (
        <BattleTacticsView tactics={battleTactics} />
      )}

      {/* Cause and Effect Analysis */}
      {topic.causeAndEffect && topic.causeAndEffect.length > 0 && (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Layers className="h-4 w-4" />{' '}
            {isRu ? 'Причинно-следственные связи' : 'Sabab, voqea va oqibat tahlili'}
          </div>
          <h2 className="mt-2 text-xl font-extrabold text-blue-950 dark:text-white">
            {isRu ? 'Историческая цепочка' : "Tarixiy bog\u2018liqlik zanjiri"}
          </h2>

          <div className="mt-6 space-y-4">
            {topic.causeAndEffect.map((item, idx) => (
              <div
                key={idx}
                className="grid gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 text-xs sm:grid-cols-3 dark:border-slate-800 dark:bg-slate-800/40"
              >
                <div className="rounded-xl bg-white p-3 shadow-2xs dark:bg-slate-800">
                  <span className="font-extrabold text-amber-600 dark:text-amber-400">
                    {isRu ? 'Причина:' : 'Sabab:'}
                  </span>
                  <p className="mt-1 text-slate-600 dark:text-slate-300">{item.cause}</p>
                </div>
                <div className="rounded-xl bg-white p-3 shadow-2xs dark:bg-slate-800">
                  <span className="font-extrabold text-blue-700 dark:text-blue-400">
                    {isRu ? 'Событие:' : 'Voqea:'}
                  </span>
                  <p className="mt-1 text-slate-600 dark:text-slate-300">{item.event}</p>
                </div>
                <div className="rounded-xl bg-white p-3 shadow-2xs dark:bg-slate-800">
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                    {isRu ? 'Следствие:' : 'Natija / Oqibat:'}
                  </span>
                  <p className="mt-1 text-slate-600 dark:text-slate-300">{item.effect}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Dates and Key Figures */}
      <div className="grid gap-6 sm:grid-cols-2">
        {topic.keyFigures && topic.keyFigures.length > 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
              <Users className="h-4 w-4" />{' '}
              {isRu ? 'Ключевые личности' : 'Asosiy tarixiy shaxslar'}
            </div>
            <ul className="mt-4 space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {topic.keyFigures.map((person, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                  {person}
                </li>
              ))}
            </ul>
          </div>
        )}

        {topic.keyDates && topic.keyDates.length > 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Calendar className="h-4 w-4" />{' '}
              {isRu ? 'Хронология темы' : 'Mavzuga oid muhim sanalar'}
            </div>
            <div className="mt-4 space-y-2.5">
              {topic.keyDates.map((item, i) => (
                <div key={i} className="text-xs">
                  <span className="font-black text-amber-600 dark:text-amber-400">{item.date}</span>{' '}
                  —{' '}
                  <span className="text-slate-600 dark:text-slate-300">{item.event}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Key Terms */}
      {topic.keyTerms && topic.keyTerms.length > 0 && (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <Sparkles className="h-4 w-4" />{' '}
            {isRu ? 'Термины и понятия' : 'Mavzuga oid atamalar'}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {topic.keyTerms.map((term, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40"
              >
                <h4 className="font-black text-slate-900 dark:text-white">{term.term}</h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {term.definition}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Mini Quiz */}
      {topic.miniQuiz && topic.miniQuiz.length > 0 && (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <HelpCircle className="h-4 w-4" />{' '}
            {isRu ? 'Мини-тест по теме' : "Mavzu bo\u2018yicha mini-test"}
          </div>
          <h2 className="mt-2 text-xl font-extrabold text-blue-950 dark:text-white">
            {isRu ? 'Проверьте понимание темы' : "Bilimingizni sinab ko\u2018ring"}
          </h2>

          <div className="mt-6 space-y-6">
            {topic.miniQuiz.map((q, qIndex) => {
              const selectedOpt = quizAnswers[qIndex];
              const isCorrect = selectedOpt === q.answer;

              return (
                <div
                  key={qIndex}
                  className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-800/40"
                >
                  <p className="font-extrabold text-slate-900 dark:text-white">
                    {qIndex + 1}. {q.question}
                  </p>
                  <div className="mt-3 space-y-2">
                    {q.options.map((opt, optIndex) => {
                      const isSelected = selectedOpt === optIndex;
                      let btnStyle =
                        'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800';

                      if (quizSubmitted) {
                        if (optIndex === q.answer) {
                          btnStyle =
                            'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300';
                        } else if (isSelected && !isCorrect) {
                          btnStyle =
                            'border-rose-400 bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-300';
                        } else {
                          btnStyle = 'opacity-50 border-slate-200 dark:border-slate-700';
                        }
                      } else if (isSelected) {
                        btnStyle =
                          'border-blue-950 bg-blue-50 font-bold dark:border-amber-400 dark:bg-amber-400/10';
                      }

                      return (
                        <button
                          key={optIndex}
                          type="button"
                          onClick={() => handleQuizAnswer(qIndex, optIndex)}
                          className={`flex w-full items-center justify-between rounded-xl border p-3 text-left text-xs transition ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && optIndex === q.answer && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="mt-3 rounded-xl bg-amber-50/80 p-3 text-xs leading-relaxed text-amber-950 dark:bg-amber-950/30 dark:text-amber-200">
                      <strong>{isRu ? 'Пояснение:' : 'Izoh:'}</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6">
            {!quizSubmitted ? (
              <button
                disabled={Object.keys(quizAnswers).length !== topic.miniQuiz.length}
                onClick={handleQuizSubmit}
                className="rounded-xl bg-blue-950 px-6 py-2.5 text-xs font-bold text-amber-300 transition hover:bg-blue-900 disabled:opacity-40"
              >
                {isRu ? 'Проверить ответы' : 'Javoblarni tekshirish'}
              </button>
            ) : (
              <button
                onClick={() => {
                  setQuizAnswers({});
                  setQuizSubmitted(false);
                }}
                className="rounded-xl border border-slate-300 bg-white px-5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {isRu ? 'Пройти снова' : 'Qayta urinish'}
              </button>
            )}
          </div>
        </section>
      )}

      {/* Completion & Next Step */}
      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-center dark:border-amber-500/20 dark:bg-amber-500/10 sm:p-8">
        <Award className="mx-auto h-8 w-8 text-amber-600 dark:text-amber-400" />
        <h3 className="mt-3 text-lg font-black text-amber-950 dark:text-amber-200">
          {isRead
            ? isRu
              ? 'Тема успешно пройдена!'
              : "Mavzu muvaffaqiyatli o\u2018rganildi!"
            : isRu
              ? 'Завершите изучение темы'
              : "Mavzuni to\u2018liq o\u2018zlashtiring"}
        </h3>
        <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-amber-900/80 dark:text-amber-200/80">
          {isRu
            ? 'Отметьте тему как изученную, чтобы обновить свой прогресс и перейти к следующим разделам.'
            : "Mavzuni o\u2018qilgan deb belgilang, bu orqali umumiy progress ko\u2018rsatkichi avtomatik oshadi."}
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => toggleRead(topic.id)}
            className="rounded-xl bg-blue-950 px-5 py-2.5 text-xs font-bold text-amber-300 transition hover:bg-blue-900"
          >
            {isRead ? t.history.readMarked : t.history.markAsRead}
          </button>
          <Link
            href="/tarix"
            className="rounded-xl border border-amber-300 bg-white px-5 py-2.5 text-xs font-bold text-amber-900 transition hover:bg-amber-100/50 dark:border-amber-700 dark:bg-slate-900 dark:text-amber-300"
          >
            {isRu ? 'Вернуться в центр истории' : 'Tarix markaziga qaytish'}
          </Link>
        </div>
      </section>
    </main>
  );
}
