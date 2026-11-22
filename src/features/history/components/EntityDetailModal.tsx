// Interactive modal to display historical entity details
"use client";

import { useEffect } from "react";
import { HistoricalEntity } from "@/features/history/data/entitiesData";
import { X, ExternalLink, Calendar, MapPin, Award } from "lucide-react";

interface Props {
  entity: HistoricalEntity | null;
  onClose: () => void;
}

export const EntityDetailModal: React.FC<Props> = ({ entity, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!entity) return null;

  const isPerson = entity.type === "person";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-3xl bg-white p-5 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition"
          aria-label="Yopish"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Badge & Title */}
        <div className="pr-10">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${
              isPerson
                ? "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300"
                : "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
            }`}
          >
            {isPerson ? "Tarixiy shaxs" : "Davlat / Sulola"}
          </span>
          <h2 className="mt-2 text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
            {entity.name}
          </h2>
        </div>

        {/* Info Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 border-y border-slate-100 dark:border-slate-800 py-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Calendar className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <span>
              <strong className="text-slate-900 dark:text-white">Davr:</strong>{" "}
              {entity.period}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <MapPin className="h-3.5 w-3.5 text-blue-500 shrink-0" />
            <span>
              <strong className="text-slate-900 dark:text-white">
                {isPerson ? "Unvon / Rol:" : "Poytaxt:"}
              </strong>{" "}
              {entity.roleOrCapital}
            </span>
          </div>
        </div>

        {/* Summary */}
        <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {entity.summary}
        </p>

        {/* Details List */}
        {entity.details && entity.details.length > 0 && (
          <div className="mt-4">
            <p className="text-[11px] font-extrabold uppercase tracking-wide text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-amber-500" />
              Asosiy xizmatlari va ma&apos;lumotlar:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              {entity.details.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span className="leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Source link */}
        <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">Rasmiy manba:</span>
          <a
            href={entity.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-amber-400 hover:underline"
          >
            {entity.source} <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
