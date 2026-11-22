'use client';

import { useState, useMemo } from 'react';
import { comparisons, quizQuestions, type QuizQuestion } from '@/features/history/data/historyData';
import { useHistoryProgress } from '@/features/history/hooks/useHistoryProgress';
import { useLanguageStore } from '@/features/language/useLanguageStore';
import { CheckCircle2, XCircle, RotateCcw, ExternalLink, HelpCircle, Columns } from 'lucide-react';

export function HistoryTools() {
  const { t, language } = useLanguageStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const progress = useHistoryProgress();

  const categories = useMemo(() => {
    const list = Array.from(new Set(quizQuestions.map((q) => q.category)));
    return ['all', ...list];
  }, []);

  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'all') return quizQuestions;
    return quizQuestions.filter((q) => q.category === selectedCategory);
  }, [selectedCategory]);

  const score = useMemo(() => {
    return filteredQuestions.filter((q) => answers[q.id] === q.answer).length;
  }, [filteredQuestions, answers]);

  const allAnswered = filteredQuestions.every((q) => answers[q.id] !== undefined);

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const isRu = language === 'ru';

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Quiz Section */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <HelpCircle className="h-4 w-4" />
              {t.history.knowledgeQuiz}
            </div>
            <h2 className="mt-1 text-2xl font-black text-blue-950 dark:text-white">
              {isRu ? 'Тест на знание истории' : 'Tarixiy bilim sinovi'}
            </h2>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
            {filteredQuestions.length} {isRu ? 'вопросов' : 'ta savol'}
          </span>
        </div>

        {/* Category Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setAnswers({});
                setSubmitted(false);
              }}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                selectedCategory === cat
                  ? 'bg-blue-950 text-amber-300 shadow-sm dark:bg-amber-400 dark:text-slate-950'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {cat === 'all' ? (isRu ? 'Все категории' : 'Barchasi') : cat}
            </button>
          ))}
        </div>

        {/* Questions list */}
        <div className="mt-6 space-y-6">
          {filteredQuestions.map((q: QuizQuestion, index: number) => {
            const isUserCorrect = answers[q.id] === q.answer;

            return (
              <fieldset key={q.id} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800/80 dark:bg-slate-900/40">
                <legend className="px-2 text-sm font-extrabold text-slate-800 dark:text-slate-100">
                  <span className="mr-2 text-amber-600 dark:text-amber-400">{index + 1}.</span>
                  {q.question}
                </legend>
                <div className="mt-3 grid gap-2.5">
                  {q.options.map((option, i) => {
                    const isSelected = answers[q.id] === i;
                    const isCorrectAnswer = i === q.answer;

                    let optionStyle = 'border-slate-200 bg-white hover:border-amber-300 dark:border-slate-700 dark:bg-slate-800';

                    if (submitted) {
                      if (isCorrectAnswer) {
                        optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-500';
                      } else if (isSelected && !isCorrectAnswer) {
                        optionStyle = 'border-rose-400 bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200 dark:border-rose-500';
                      } else {
                        optionStyle = 'opacity-50 border-slate-200 dark:border-slate-700';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-blue-900 bg-blue-50/60 dark:border-amber-400 dark:bg-amber-400/10 font-bold';
                    }

                    return (
                      <label
                        key={option}
                        className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 text-xs sm:text-sm transition ${optionStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name={q.id}
                            checked={isSelected}
                            disabled={submitted}
                            onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                            className="h-4 w-4 accent-amber-600"
                          />
                          <span>{option}</span>
                        </div>
                        {submitted && isCorrectAnswer && (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        )}
                        {submitted && isSelected && !isCorrectAnswer && (
                          <XCircle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
                        )}
                      </label>
                    );
                  })}
                </div>

                {submitted && (
                  <div className={`mt-3 rounded-xl p-3 text-xs leading-relaxed ${isUserCorrect ? 'bg-emerald-50/80 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300' : 'bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200'}`}>
                    <p className="font-semibold">{q.explanation}</p>
                    <a
                      href={q.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex items-center gap-1 font-bold underline opacity-80 hover:opacity-100"
                    >
                      {t.history.source}: {q.source} <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </fieldset>
            );
          })}
        </div>

        {/* Submit and Result Controls */}
        <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
          {!submitted ? (
            <button
              disabled={!allAnswered}
              onClick={() => {
                setSubmitted(true);
                progress.saveScore(score);
              }}
              className="inline-flex w-full items-center justify-center rounded-xl bg-blue-950 py-3.5 text-sm font-bold text-amber-300 shadow-md transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:px-8"
            >
              {t.history.seeResult}
            </button>
          ) : (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="rounded-2xl bg-amber-50 px-5 py-3 dark:bg-amber-500/10">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t.history.resultLabel}:</span>
                <p className="text-lg font-black text-blue-950 dark:text-amber-300">
                  {score} / {filteredQuestions.length} ({Math.round((score / filteredQuestions.length) * 100)}%)
                </p>
              </div>
              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <RotateCcw className="h-4 w-4" />
                {t.history.retakeQuiz}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Comparisons Section */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="border-b border-slate-100 pb-4 dark:border-slate-800">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Columns className="h-4 w-4" />
            {t.history.comparison}
          </div>
          <h2 className="mt-1 text-2xl font-black text-blue-950 dark:text-white">
            {isRu ? 'Сравнительный исторический анализ' : 'Tarixiy taqqoslash jadvallari'}
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {t.history.comparisonDesc}
          </p>
        </div>

        <div className="mt-6 space-y-8">
          {comparisons.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-100 bg-slate-50/40 p-4 dark:border-slate-800/80 dark:bg-slate-900/30">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                    {item.category}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                </div>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-blue-700 dark:hover:text-amber-300"
                >
                  {item.source} <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
                <table className="w-full min-w-[460px] text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100/70 dark:border-slate-700 dark:bg-slate-700/50">
                      <th className="p-3 font-extrabold text-slate-700 dark:text-slate-200">
                        {isRu ? 'Критерий' : 'Mezon'}
                      </th>
                      <th className="p-3 font-extrabold text-blue-900 dark:text-amber-300">
                        {item.leftTitle}
                      </th>
                      <th className="p-3 font-extrabold text-indigo-900 dark:text-teal-300">
                        {item.rightTitle}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                    {item.rows.map(([criterion, left, right], idx) => (
                      <tr key={idx} className="transition hover:bg-slate-50/80 dark:hover:bg-slate-700/30">
                        <th className="p-3 font-semibold text-slate-900 dark:text-slate-200">
                          {criterion}
                        </th>
                        <td className="p-3 text-slate-600 dark:text-slate-300">
                          {left}
                        </td>
                        <td className="p-3 text-slate-600 dark:text-slate-300">
                          {right}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
