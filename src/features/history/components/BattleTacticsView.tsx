'use client';

import { useState } from 'react';
import { Swords, Shield, Info, ChevronRight, Map } from 'lucide-react';
import type { BattleTactics } from '@/features/history/data/battleTacticsData';

interface BattleTacticsViewProps {
  tactics: BattleTactics;
}

export function BattleTacticsView({ tactics }: BattleTacticsViewProps) {
  const [activePhase, setActivePhase] = useState<number>(0);

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-100 bg-slate-50/70 p-4 sm:p-7 dark:border-slate-800 dark:bg-slate-800/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-700 dark:bg-red-500/10 dark:text-red-300">
            <Swords className="h-4 w-4" /> Harbiy Taktika va Front Xaritasi
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Map className="h-3.5 w-3.5" />
            {tactics.date} · {tactics.location}
          </span>
        </div>
        <h3 className="mt-2 text-2xl font-black text-blue-950 dark:text-white">
          {tactics.battleName}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          {tactics.tacticalDescription}
        </p>

        {/* Belligerents Summary Bar */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs">
          <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-3 dark:border-blue-900 dark:bg-blue-950/40">
            <div className="flex items-center justify-between font-bold text-blue-900 dark:text-blue-300">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-blue-600" />
                {tactics.belligerents.sideA.name}
              </span>
              <span className="text-[11px] font-normal">{tactics.belligerents.sideA.strength}</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">
              Qo&apos;mondon: <strong>{tactics.belligerents.sideA.commander}</strong>
            </p>
          </div>

          <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-3 dark:border-rose-900 dark:bg-rose-950/40">
            <div className="flex items-center justify-between font-bold text-rose-900 dark:text-rose-300">
              <span className="flex items-center gap-1.5">
                <Swords className="h-3.5 w-3.5 text-rose-600" />
                {tactics.belligerents.sideB.name}
              </span>
              <span className="text-[11px] font-normal">{tactics.belligerents.sideB.strength}</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">
              Qo&apos;mondon: <strong>{tactics.belligerents.sideB.commander}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* SVG Interactive Battle Map */}
      <div className="p-4 sm:p-7">
        <div className="overflow-x-auto -mx-1 sm:mx-0 rounded-2xl border border-slate-700 shadow-inner">
          <div className="min-w-[620px] sm:min-w-0" style={{ aspectRatio: '16/9' }}>
            <BattleSvgMap mapType={tactics.mapSvgType} activePhase={activePhase} />
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 sm:hidden px-1">
          <span>👈 Xaritani barmog&apos;ingiz bilan surib to&apos;liq ko&apos;ring</span>
          <span className="text-amber-400 font-semibold text-[10px] bg-amber-400/10 px-2 py-0.5 rounded-md">Gorizontal</span>
        </div>

        {/* Phases Selector */}
        <div className="mt-5 space-y-2">
          <p className="text-xs font-extrabold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Jang bosqichlari va manyovrlari (bosib ko&apos;ring):
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            {tactics.keyPhases.map((phase, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhase(idx)}
                className={`flex flex-col text-left rounded-xl p-3 text-xs transition border ${
                  activePhase === idx
                    ? 'border-blue-900 bg-blue-50 text-blue-950 dark:border-amber-400 dark:bg-amber-400/10 dark:text-amber-300 font-bold'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                <span className="flex items-center justify-between font-extrabold">
                  {phase.phase}
                  <ChevronRight className={`h-3.5 w-3.5 ${activePhase === idx ? 'text-amber-500' : 'text-slate-400'}`} />
                </span>
                <span className="mt-1 text-[11px] leading-relaxed font-normal opacity-90">
                  {phase.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Outcome Box */}
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-300">
          <Info className="h-4 w-4 shrink-0 text-emerald-600" />
          <span><strong>Jang natijasi:</strong> {tactics.outcome}</span>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SVG BATTLE MAPS
═══════════════════════════════════════════════════════════════ */

function BattleSvgMap({
  mapType,
  activePhase,
}: {
  mapType: BattleTactics['mapSvgType'];
  activePhase: number;
}) {
  if (mapType === 'ww1-front') return <Ww1FrontMap activePhase={activePhase} />;
  if (mapType === 'ww2-stalingrad') return <Ww2StalingradMap activePhase={activePhase} />;
  if (mapType === 'anqara') return <AnqaraMap activePhase={activePhase} />;
  return <ParvonMap activePhase={activePhase} />;
}

/* ─── Shared defs ─── */
function SharedDefs() {
  return (
    <defs>
      {/* Arrow markers */}
      <marker id="arr-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
      <marker id="arr-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
      <marker id="arr-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
      <marker id="arr-amber" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>

      {/* Terrain gradients */}
      <linearGradient id="plains-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#16401a" />
        <stop offset="100%" stopColor="#0d2b10" />
      </linearGradient>
      <linearGradient id="desert-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#78350f" />
        <stop offset="100%" stopColor="#4a2208" />
      </linearGradient>
      <linearGradient id="mountain-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#292524" />
        <stop offset="100%" stopColor="#1c1917" />
      </linearGradient>
      <linearGradient id="snow-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>

      {/* Glow */}
      <filter id="b-glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="text-shadow">
        <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.95" />
      </filter>

      {/* Animated dash for front lines */}
      <style>{`
        @keyframes frontMove { to { stroke-dashoffset: -30; } }
        .front-line { animation: frontMove 1.8s linear infinite; }
        @keyframes arrowPulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        .arrow-pulse { animation: arrowPulse 2s ease-in-out infinite; }
      `}</style>
    </defs>
  );
}

/* ─────────────────────────────────────────────────────────────
   WW1 — MARNA JANGI (1914)
───────────────────────────────────────────────────────────── */
function Ww1FrontMap({ activePhase }: { activePhase: number }) {
  return (
    <svg viewBox="0 0 900 506" className="h-full w-full select-none" xmlns="http://www.w3.org/2000/svg">
      <SharedDefs />

      {/* Sky / atmosphere background */}
      <defs>
        <linearGradient id="ww1-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="60%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#0d2b10" />
        </linearGradient>
      </defs>
      <rect width="900" height="506" fill="url(#ww1-sky)" />

      {/* France / Belgium terrain (green plains) */}
      <rect x="0" y="200" width="900" height="306" fill="url(#plains-grad)" fillOpacity="0.6" />

      {/* Belgium border region (lighter) */}
      <rect x="400" y="0" width="500" height="230" fill="#1a2e3f" fillOpacity="0.7" />
      <text x="680" y="40" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">Belgiya / Germaniya</text>

      {/* France label */}
      <text x="200" y="420" fill="#166534" fontSize="15" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">Fransiya</text>

      {/* Marne River — prominent wavy blue */}
      <path d="M 60 290 Q 160 270 280 285 Q 400 300 520 275 Q 640 252 780 265 Q 850 270 900 260" fill="none" stroke="#0ea5e9" strokeWidth="5" strokeOpacity="0.9" />
      <path d="M 60 290 Q 160 270 280 285 Q 400 300 520 275 Q 640 252 780 265 Q 850 270 900 260" fill="none" stroke="#bae6fd" strokeWidth="1.5" strokeOpacity="0.4" />
      <text x="310" y="308" fill="#7dd3fc" fontSize="13" fontWeight="bold" filter="url(#text-shadow)">Marna daryosi</text>

      {/* Seine River */}
      <path d="M 60 370 Q 200 355 320 365 Q 420 372 480 360" fill="none" stroke="#0ea5e9" strokeWidth="3" strokeOpacity="0.5" />
      <text x="230" y="358" fill="#7dd3fc" fontSize="10" opacity="0.7" filter="url(#text-shadow)">Sena daryosi</text>

      {/* Front line (dynamic animated) */}
      <path
        className="front-line"
        d="M 95 240 Q 220 230 350 250 Q 480 268 600 245 Q 710 228 820 240"
        fill="none"
        stroke="#06b6d4"
        strokeWidth="4"
        strokeDasharray="12 6"
        strokeOpacity="0.9"
      />
      {/* Front line glow */}
      <path
        d="M 95 240 Q 220 230 350 250 Q 480 268 600 245 Q 710 228 820 240"
        fill="none"
        stroke="#06b6d4"
        strokeWidth="10"
        strokeOpacity="0.15"
        filter="url(#b-glow)"
      />
      <text x="440" y="222" fill="#67e8f9" fontSize="11" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">📍 Front chizig&apos;i (1914-yil sentabr)</text>

      {/* Paris */}
      <circle cx="168" cy="330" r="18" fill="#1e293b" stroke="#3b82f6" strokeWidth="3" filter="url(#b-glow)" />
      <circle cx="168" cy="330" r="8" fill="#3b82f6" fillOpacity="0.8" />
      <text x="168" y="368" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">Parij</text>
      <text x="168" y="382" fill="#93c5fd" fontSize="10" textAnchor="middle" filter="url(#text-shadow)">(himoya qilinmoqda)</text>

      {/* Reims */}
      <circle cx="420" cy="262" r="8" fill="#f59e0b" fillOpacity="0.8" stroke="#fde68a" strokeWidth="1.5" />
      <text x="440" y="260" fill="#fef9c3" fontSize="11" fontWeight="bold" filter="url(#text-shadow)">Reims</text>

      {/* Verdun */}
      <circle cx="680" cy="240" r="8" fill="#f59e0b" fillOpacity="0.7" stroke="#fde68a" strokeWidth="1.5" />
      <text x="698" y="238" fill="#fef9c3" fontSize="11" filter="url(#text-shadow)">Vérden</text>

      {/* German Offensive Arrows (NE → SW) — always visible */}
      <g className="arrow-pulse">
        {/* Army 1 */}
        <path d="M 740 60 Q 660 120 580 180 Q 520 220 480 248" fill="none" stroke="#ef4444" strokeWidth="7" markerEnd="url(#arr-red)" strokeLinecap="round" />
        {/* Army 2 */}
        <path d="M 820 55 Q 760 100 710 150 Q 660 198 640 243" fill="none" stroke="#ef4444" strokeWidth="6" markerEnd="url(#arr-red)" strokeLinecap="round" />

        {/* Labels */}
        <rect x="600" y="38" width="265" height="38" rx="6" fill="#7f1d1d" fillOpacity="0.85" stroke="#ef4444" strokeWidth="1" />
        <text x="733" y="56" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">1-Germaniya armiyasi (Fon Kluk)</text>
        <text x="733" y="70" fill="#fca5a5" fontSize="10" textAnchor="middle" filter="url(#text-shadow)">Shliffen rejasi · 1 mln askar</text>
      </g>

      {/* Gap marker between German armies */}
      <ellipse cx="560" cy="210" rx="28" ry="16" fill="none" stroke="#facc15" strokeWidth="2" strokeDasharray="4 3" />
      <text x="560" y="195" fill="#facc15" fontSize="10" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">Bo&apos;shliq!</text>

      {/* Phase 1 — French flank counterattack */}
      {activePhase >= 1 && (
        <g>
          <path d="M 200 400 Q 280 345 360 300 Q 400 275 450 258" fill="none" stroke="#3b82f6" strokeWidth="7" markerEnd="url(#arr-blue)" strokeLinecap="round" />
          <rect x="30" y="390" width="230" height="38" rx="6" fill="#1e3a8a" fillOpacity="0.9" stroke="#3b82f6" strokeWidth="1" />
          <text x="145" y="407" fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">Fransuz 6-armiyasi (Manoury)</text>
          <text x="145" y="421" fill="#93c5fd" fontSize="10" textAnchor="middle" filter="url(#text-shadow)">Qanot zarba · 150 000 askar</text>
        </g>
      )}

      {/* Phase 2 — British BEF into gap */}
      {activePhase >= 2 && (
        <g>
          <path d="M 300 445 Q 380 380 460 310 Q 500 278 530 258" fill="none" stroke="#10b981" strokeWidth="7" markerEnd="url(#arr-green)" strokeLinecap="round" />
          <rect x="30" y="445" width="230" height="38" rx="6" fill="#064e3b" fillOpacity="0.9" stroke="#10b981" strokeWidth="1" />
          <text x="145" y="462" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">Britaniya qo&apos;shini (BEF)</text>
          <text x="145" y="476" fill="#6ee7b7" fontSize="10" textAnchor="middle" filter="url(#text-shadow)">Bo&apos;shliqqa yorib kirish → g&apos;alaba</text>
        </g>
      )}

      {/* Legend */}
      <g transform="translate(700, 340)">
        <rect x="0" y="0" width="185" height="130" rx="10" fill="#0d1f3c" fillOpacity="0.9" stroke="#334155" strokeWidth="1" />
        <text x="10" y="18" fill="#94a3b8" fontSize="10" fontWeight="bold">AFSONALAR</text>
        <line x1="10" y1="32" x2="30" y2="32" stroke="#ef4444" strokeWidth="4" />
        <text x="36" y="36" fill="#fca5a5" fontSize="10">Germaniya hujumi</text>
        <line x1="10" y1="52" x2="30" y2="52" stroke="#3b82f6" strokeWidth="4" />
        <text x="36" y="56" fill="#93c5fd" fontSize="10">Fransuz qarshi hujumi</text>
        <line x1="10" y1="72" x2="30" y2="72" stroke="#10b981" strokeWidth="4" />
        <text x="36" y="76" fill="#6ee7b7" fontSize="10">Britaniya qo&apos;shini (BEF)</text>
        <line x1="10" y1="92" x2="30" y2="92" stroke="#06b6d4" strokeWidth="3" strokeDasharray="6 3" />
        <text x="36" y="96" fill="#67e8f9" fontSize="10">Front chizig&apos;i</text>
        <circle cx="20" cy="112" r="5" fill="#f59e0b" />
        <text x="36" y="116" fill="#fef9c3" fontSize="10">Shahar</text>
      </g>

      {/* Compass */}
      <g transform="translate(840, 460)">
        <circle cx="0" cy="0" r="22" fill="#0d1f3c" fillOpacity="0.9" stroke="#475569" strokeWidth="1.5" />
        <text x="0" y="-10" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">N</text>
        <text x="0" y="17" fill="#94a3b8" fontSize="9" textAnchor="middle">S</text>
        <text x="-14" y="4" fill="#94a3b8" fontSize="9" textAnchor="middle">W</text>
        <text x="14" y="4" fill="#94a3b8" fontSize="9" textAnchor="middle">E</text>
        <line x1="0" y1="-6" x2="0" y2="6" stroke="#e2e8f0" strokeWidth="1.5" />
        <line x1="-6" y1="0" x2="6" y2="0" stroke="#e2e8f0" strokeWidth="1.5" />
      </g>

      {/* Title bar */}
      <rect x="0" y="0" width="380" height="38" fill="#0d1f3c" fillOpacity="0.85" />
      <text x="12" y="24" fill="#fbbf24" fontSize="14" fontWeight="bold" filter="url(#text-shadow)">⚔ Marna jangi · 1914-yil 5–12 sentabr</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   WW2 — STALINGRAD (1942-43)
───────────────────────────────────────────────────────────── */
function Ww2StalingradMap({ activePhase }: { activePhase: number }) {
  return (
    <svg viewBox="0 0 900 506" className="h-full w-full select-none" xmlns="http://www.w3.org/2000/svg">
      <SharedDefs />
      <defs>
        <linearGradient id="ww2-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1c1a0a" />
          <stop offset="50%" stopColor="#141205" />
          <stop offset="100%" stopColor="#0a1510" />
        </linearGradient>
      </defs>
      <rect width="900" height="506" fill="url(#ww2-bg)" />

      {/* Snow-covered plain hints */}
      <rect x="0" y="0" width="900" height="506" fill="#f8fafc" fillOpacity="0.04" />

      {/* Don steppes west */}
      <ellipse cx="250" cy="253" rx="240" ry="220" fill="#2d1810" fillOpacity="0.4" />
      <text x="150" y="440" fill="#78350f" fontSize="13" fontWeight="bold" filter="url(#text-shadow)">Don dashtlari</text>

      {/* Volga River — dominant blue on east */}
      <path d="M 600 0 Q 580 120 600 253 Q 618 380 594 506" fill="none" stroke="#0369a1" strokeWidth="22" strokeOpacity="0.5" />
      <path d="M 600 0 Q 580 120 600 253 Q 618 380 594 506" fill="none" stroke="#38bdf8" strokeWidth="6" strokeOpacity="0.9" />
      <path d="M 600 0 Q 580 120 600 253 Q 618 380 594 506" fill="none" stroke="#bae6fd" strokeWidth="1.5" strokeOpacity="0.4" />
      <text x="638" y="150" fill="#7dd3fc" fontSize="14" fontWeight="bold" filter="url(#text-shadow)">Volga</text>
      <text x="638" y="168" fill="#7dd3fc" fontSize="14" fontWeight="bold" filter="url(#text-shadow)">daryosi</text>

      {/* Stalingrad city blocks */}
      {[195, 220, 245, 268, 290, 312, 335, 358].map((y, i) => (
        <rect key={i} x={548} y={y} width={44} height={18} rx="3" fill="#374151" stroke="#6b7280" strokeWidth="0.8" fillOpacity="0.8" />
      ))}
      <text x="526" y="188" fill="#fde047" fontSize="13" fontWeight="bold" filter="url(#text-shadow)">Stalingrad</text>
      <text x="526" y="202" fill="#fbbf24" fontSize="10" filter="url(#text-shadow)">(vayron qilingan shahar)</text>

      {/* German 6th Army encirclement zone */}
      <ellipse cx="410" cy="290" rx="140" ry="110" fill="#7f1d1d" fillOpacity="0.35" stroke="#ef4444" strokeWidth="3" strokeDasharray="8 4" />
      <text x="410" y="285" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">Paulus armiyasi</text>
      <text x="410" y="302" fill="#fca5a5" fontSize="10" textAnchor="middle" filter="url(#text-shadow)">(6-Germaniya armiyasi)</text>
      <text x="410" y="318" fill="#f87171" fontSize="10" textAnchor="middle" filter="url(#text-shadow)">~330 000 askar qamalda</text>

      {/* German front west */}
      <path
        className="front-line"
        d="M 50 100 Q 150 150 240 180 Q 310 205 350 230 Q 380 250 400 270"
        fill="none"
        stroke="#ef4444"
        strokeWidth="3"
        strokeDasharray="8 5"
        strokeOpacity="0.7"
      />

      {/* Phase 0: German summer push arrows */}
      <path d="M 200 120 Q 290 190 365 250" fill="none" stroke="#ef4444" strokeWidth="6" markerEnd="url(#arr-red)" strokeLinecap="round" strokeOpacity="0.8" />

      {/* Don bend label */}
      <text x="180" y="230" fill="#94a3b8" fontSize="11" filter="url(#text-shadow)">Don daryosi egati</text>
      <path d="M 60 253 Q 130 230 200 240 Q 270 250 310 270" fill="none" stroke="#38bdf8" strokeWidth="3" strokeOpacity="0.5" />
      <text x="90" y="250" fill="#7dd3fc" fontSize="10" filter="url(#text-shadow)">Don</text>

      {/* Kalach city */}
      <circle cx="336" cy="300" r="10" fill="#f59e0b" fillOpacity="0.85" stroke="#fde68a" strokeWidth="1.5" />
      <text x="318" y="324" fill="#fef9c3" fontSize="11" fontWeight="bold" filter="url(#text-shadow)">Kalach</text>

      {/* Phase 1: Soviet Uranus Pincers */}
      {activePhase >= 1 && (
        <g>
          {/* North pincer */}
          <path d="M 110 60 Q 180 120 250 180 Q 300 220 335 285" fill="none" stroke="#10b981" strokeWidth="8" markerEnd="url(#arr-green)" strokeLinecap="round" />
          <rect x="30" y="38" width="220" height="38" rx="6" fill="#064e3b" fillOpacity="0.9" stroke="#10b981" strokeWidth="1" />
          <text x="140" y="55" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">Shimoliy qisqich (Vatutin)</text>
          <text x="140" y="69" fill="#6ee7b7" fontSize="10" textAnchor="middle" filter="url(#text-shadow)">Don front · 1942-noy 19</text>

          {/* South pincer */}
          <path d="M 180 476 Q 240 400 290 350 Q 318 322 335 308" fill="none" stroke="#10b981" strokeWidth="8" markerEnd="url(#arr-green)" strokeLinecap="round" />
          <rect x="30" y="456" width="220" height="38" rx="6" fill="#064e3b" fillOpacity="0.9" stroke="#10b981" strokeWidth="1" />
          <text x="140" y="473" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">Janubiy qisqich (Yeremenko)</text>
          <text x="140" y="487" fill="#6ee7b7" fontSize="10" textAnchor="middle" filter="url(#text-shadow)">Sharqiy front · 1942-noy 20</text>
        </g>
      )}

      {/* Phase 2: Ring closes + Operation label */}
      {activePhase >= 2 && (
        <g>
          <circle cx="336" cy="300" r="22" fill="#f59e0b" fillOpacity="0.3" stroke="#fbbf24" strokeWidth="3" filter="url(#b-glow)" />
          <text x="336" y="344" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">Qurshov halqasi yopildi!</text>
          <rect x="440" y="90" width="220" height="50" rx="8" fill="#1e3a8a" fillOpacity="0.95" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="550" y="110" fill="#93c5fd" fontSize="12" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">&quot;Uran&quot; operatsiyasi</text>
          <text x="550" y="128" fill="#bfdbfe" fontSize="10" textAnchor="middle" filter="url(#text-shadow)">1942-yil 19-noyabr — 2-fevral 1943</text>
        </g>
      )}

      {/* Legend */}
      <g transform="translate(700, 340)">
        <rect x="0" y="0" width="190" height="140" rx="10" fill="#0d1f3c" fillOpacity="0.9" stroke="#334155" strokeWidth="1" />
        <text x="10" y="18" fill="#94a3b8" fontSize="10" fontWeight="bold">AFSONALAR</text>
        <line x1="10" y1="32" x2="30" y2="32" stroke="#ef4444" strokeWidth="4" />
        <text x="36" y="36" fill="#fca5a5" fontSize="10">Germaniya pozitsiyasi</text>
        <line x1="10" y1="52" x2="30" y2="52" stroke="#10b981" strokeWidth="4" />
        <text x="36" y="56" fill="#6ee7b7" fontSize="10">Sovet qisqich hujumi</text>
        <line x1="10" y1="72" x2="30" y2="72" stroke="#38bdf8" strokeWidth="5" />
        <text x="36" y="76" fill="#7dd3fc" fontSize="10">Volga daryosi</text>
        <ellipse cx="20" cy="92" rx="10" ry="7" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
        <text x="36" y="96" fill="#fca5a5" fontSize="10">Qamal chizig&apos;i</text>
        <circle cx="20" cy="112" r="6" fill="#f59e0b" />
        <text x="36" y="116" fill="#fef9c3" fontSize="10">Kalach (qurshov tuguni)</text>
        <rect x="10" y="122" width="10" height="8" fill="#374151" stroke="#6b7280" strokeWidth="0.8" />
        <text x="26" y="130" fill="#d1d5db" fontSize="10">Shahar binolari</text>
      </g>

      {/* Compass */}
      <g transform="translate(840, 460)">
        <circle cx="0" cy="0" r="22" fill="#0d1f3c" fillOpacity="0.9" stroke="#475569" strokeWidth="1.5" />
        <text x="0" y="-10" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">N</text>
        <text x="0" y="17" fill="#94a3b8" fontSize="9" textAnchor="middle">S</text>
        <text x="-14" y="4" fill="#94a3b8" fontSize="9" textAnchor="middle">W</text>
        <text x="14" y="4" fill="#94a3b8" fontSize="9" textAnchor="middle">E</text>
        <line x1="0" y1="-6" x2="0" y2="6" stroke="#e2e8f0" strokeWidth="1.5" />
        <line x1="-6" y1="0" x2="6" y2="0" stroke="#e2e8f0" strokeWidth="1.5" />
      </g>

      {/* Title */}
      <rect x="0" y="0" width="380" height="38" fill="#0d1f3c" fillOpacity="0.85" />
      <text x="12" y="24" fill="#fbbf24" fontSize="14" fontWeight="bold" filter="url(#text-shadow)">⚔ Stalingrad jangi · 1942–1943</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   ANQARA JANGI (1402)
───────────────────────────────────────────────────────────── */
function AnqaraMap({ activePhase }: { activePhase: number }) {
  return (
    <svg viewBox="0 0 900 506" className="h-full w-full select-none" xmlns="http://www.w3.org/2000/svg">
      <SharedDefs />
      <defs>
        <linearGradient id="anq-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#291a06" />
          <stop offset="50%" stopColor="#3d2309" />
          <stop offset="100%" stopColor="#1a1105" />
        </linearGradient>
      </defs>
      <rect width="900" height="506" fill="url(#anq-bg)" />

      {/* Chubuq plain — tan sandy */}
      <ellipse cx="450" cy="280" rx="380" ry="200" fill="#78350f" fillOpacity="0.3" />
      <text x="450" y="470" fill="#a16207" fontSize="13" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">Chubuq tekisligi — Anqara yaqinida, 1402-yil 20-iyul</text>

      {/* Hills north */}
      <path d="M 0 50 L 60 30 L 110 50 L 165 25 L 220 48 L 290 20 L 350 45 L 420 18 L 490 42 L 560 15 L 620 40 L 680 22 L 740 42 L 800 20 L 860 38 L 900 25 L 900 80 L 0 80 Z" fill="#4a2e0a" fillOpacity="0.6" />
      <text x="450" y="55" fill="#92400e" fontSize="11" textAnchor="middle" filter="url(#text-shadow)">Shimoliy tepaliklar</text>

      {/* Chubuq River */}
      <path d="M 180 430 Q 290 310 410 240 Q 500 190 600 100" fill="none" stroke="#38bdf8" strokeWidth="5" strokeOpacity="0.8" />
      <path d="M 180 430 Q 290 310 410 240 Q 500 190 600 100" fill="none" stroke="#bae6fd" strokeWidth="1.5" strokeOpacity="0.3" />
      <text x="295" y="385" fill="#7dd3fc" fontSize="12" fontWeight="bold" filter="url(#text-shadow)">Chubuq daryosi</text>

      {/* Water source blocked marker */}
      {activePhase >= 2 && (
        <g>
          <circle cx="490" cy="195" r="18" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="2.5" filter="url(#b-glow)" />
          <text x="490" y="192" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">✕</text>
          <text x="490" y="175" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">Suv to&apos;sib qo&apos;yildi!</text>
        </g>
      )}

      {/* Bayezid Ottoman Forces — center/north */}
      <rect x="318" y="155" width="175" height="58" rx="10" fill="#7f1d1d" fillOpacity="0.9" stroke="#ef4444" strokeWidth="2.5" />
      <text x="405" y="177" fill="#fecaca" fontSize="13" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">Boyazid I (Usmonli)</text>
      <text x="405" y="193" fill="#fca5a5" fontSize="10" textAnchor="middle" filter="url(#text-shadow)">~85 000 askar · Markaz</text>
      <text x="405" y="206" fill="#f87171" fontSize="10" textAnchor="middle" filter="url(#text-shadow)">Qanot: Tatar mulozimlar (Temurga o&apos;tdi)</text>

      {/* Amir Temur Main Force — south */}
      <rect x="318" y="320" width="175" height="60" rx="10" fill="#1e3a8a" fillOpacity="0.9" stroke="#3b82f6" strokeWidth="2.5" />
      <text x="405" y="342" fill="#bfdbfe" fontSize="13" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">Amir Temur (Markaz)</text>
      <text x="405" y="358" fill="#93c5fd" fontSize="10" textAnchor="middle" filter="url(#text-shadow)">~140 000 askar</text>
      <text x="405" y="373" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">🐘 32 jangovar fil</text>

      {/* Elephants wave visual */}
      {[0, 1, 2, 3, 4].map((i) => (
        <text key={i} x={340 + i * 22} y={394} fill="#f59e0b" fontSize="14" textAnchor="middle" filter="url(#text-shadow)">🐘</text>
      ))}

      {/* Phase 0: Initial positions arrows (charge) */}
      <path d="M 405 320 L 405 220" fill="none" stroke="#3b82f6" strokeWidth="5" markerEnd="url(#arr-blue)" strokeLinecap="round" />

      {/* Phase 1: Flanking maneuvers */}
      {activePhase >= 1 && (
        <g>
          {/* Mironshah right flank */}
          <path d="M 318 350 Q 220 290 230 215 Q 232 190 310 170" fill="none" stroke="#3b82f6" strokeWidth="7" markerEnd="url(#arr-blue)" strokeLinecap="round" />
          <rect x="30" y="150" width="195" height="38" rx="6" fill="#1e3a8a" fillOpacity="0.9" stroke="#3b82f6" strokeWidth="1" />
          <text x="127" y="167" fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">Mironshoh (O&apos;ng qanot)</text>
          <text x="127" y="181" fill="#bfdbfe" fontSize="10" textAnchor="middle" filter="url(#text-shadow)">O&apos;rab olish manevri</text>

          {/* Shahrukh left flank */}
          <path d="M 493 350 Q 605 285 592 210 Q 588 185 500 168" fill="none" stroke="#3b82f6" strokeWidth="7" markerEnd="url(#arr-blue)" strokeLinecap="round" />
          <rect x="665" y="150" width="195" height="38" rx="6" fill="#1e3a8a" fillOpacity="0.9" stroke="#3b82f6" strokeWidth="1" />
          <text x="762" y="167" fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">Shohrux (Chap qanot)</text>
          <text x="762" y="181" fill="#bfdbfe" fontSize="10" textAnchor="middle" filter="url(#text-shadow)">O&apos;rab olish manevri</text>
        </g>
      )}

      {/* Phase 2: Ottoman Tatar wings defect */}
      {activePhase >= 2 && (
        <g>
          {/* Left tatar wing defects */}
          <path d="M 318 170 Q 240 220 180 290" fill="none" stroke="#f59e0b" strokeWidth="5" markerEnd="url(#arr-amber)" strokeLinecap="round" strokeDasharray="6 3" />
          <path d="M 493 170 Q 580 230 650 310" fill="none" stroke="#f59e0b" strokeWidth="5" markerEnd="url(#arr-amber)" strokeLinecap="round" strokeDasharray="6 3" />
          <rect x="250" y="40" width="295" height="44" rx="8" fill="#78350f" fillOpacity="0.95" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="397" y="58" fill="#fde68a" fontSize="12" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">Usmonli tatar mulozimlar Temurga o&apos;tdi!</text>
          <text x="397" y="74" fill="#fbbf24" fontSize="10" textAnchor="middle" filter="url(#text-shadow)">Boyazidning qanoti yemirilib ketdi → hal qiluvchi zarba</text>
        </g>
      )}

      {/* Legend */}
      <g transform="translate(700, 340)">
        <rect x="0" y="0" width="185" height="130" rx="10" fill="#0d1f3c" fillOpacity="0.9" stroke="#334155" strokeWidth="1" />
        <text x="10" y="18" fill="#94a3b8" fontSize="10" fontWeight="bold">AFSONALAR</text>
        <rect x="10" y="26" width="16" height="10" rx="2" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
        <text x="32" y="36" fill="#fca5a5" fontSize="10">Usmonli (Boyazid)</text>
        <rect x="10" y="46" width="16" height="10" rx="2" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1" />
        <text x="32" y="56" fill="#93c5fd" fontSize="10">Temur qo&apos;shini</text>
        <text x="10" y="76" fill="#fbbf24" fontSize="13">🐘</text>
        <text x="32" y="78" fill="#fde68a" fontSize="10">Jangovar fillar</text>
        <line x1="10" y1="92" x2="30" y2="92" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5 3" />
        <text x="36" y="96" fill="#fde68a" fontSize="10">Tatar mulozimlar o&apos;tishi</text>
        <line x1="10" y1="112" x2="30" y2="112" stroke="#38bdf8" strokeWidth="3" />
        <text x="36" y="116" fill="#7dd3fc" fontSize="10">Chubuq daryosi</text>
      </g>

      {/* Compass */}
      <g transform="translate(840, 460)">
        <circle cx="0" cy="0" r="22" fill="#0d1f3c" fillOpacity="0.9" stroke="#475569" strokeWidth="1.5" />
        <text x="0" y="-10" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">N</text>
        <text x="0" y="17" fill="#94a3b8" fontSize="9" textAnchor="middle">S</text>
        <text x="-14" y="4" fill="#94a3b8" fontSize="9" textAnchor="middle">W</text>
        <text x="14" y="4" fill="#94a3b8" fontSize="9" textAnchor="middle">E</text>
        <line x1="0" y1="-6" x2="0" y2="6" stroke="#e2e8f0" strokeWidth="1.5" />
        <line x1="-6" y1="0" x2="6" y2="0" stroke="#e2e8f0" strokeWidth="1.5" />
      </g>

      {/* Title */}
      <rect x="0" y="0" width="350" height="38" fill="#0d1f3c" fillOpacity="0.85" />
      <text x="12" y="24" fill="#fbbf24" fontSize="14" fontWeight="bold" filter="url(#text-shadow)">⚔ Anqara jangi · 1402-yil 20-iyul</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   PARVON JANGI (1221)
───────────────────────────────────────────────────────────── */
function ParvonMap({ activePhase }: { activePhase: number }) {
  return (
    <svg viewBox="0 0 900 506" className="h-full w-full select-none" xmlns="http://www.w3.org/2000/svg">
      <SharedDefs />
      <defs>
        <linearGradient id="parv-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c1917" />
          <stop offset="60%" stopColor="#292524" />
          <stop offset="100%" stopColor="#1a2718" />
        </linearGradient>
      </defs>
      <rect width="900" height="506" fill="url(#parv-bg)" />

      {/* Mountain gorge — left cliff */}
      <polygon points="0,0 310,0 220,506 0,506" fill="#292524" stroke="#44403c" strokeWidth="2" />
      {/* Mountain texture left */}
      {[60, 110, 160, 215, 265, 315, 365, 415, 455].map((y, i) => (
        <path key={i} d={`M ${20 + i * 5} ${y} L ${60 + i * 6} ${y - 25} L ${110 + i * 5} ${y}`} fill="none" stroke="#57534e" strokeWidth="1.5" strokeOpacity="0.5" />
      ))}
      <text x="120" y="120" fill="#a8a29e" fontSize="14" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">Tog&apos; qoyalari</text>
      <text x="120" y="138" fill="#78716c" fontSize="11" textAnchor="middle" filter="url(#text-shadow)">(Hindukush etagi)</text>

      {/* Mountain gorge — right cliff */}
      <polygon points="590,0 900,0 900,506 680,506" fill="#292524" stroke="#44403c" strokeWidth="2" />
      {/* Mountain texture right */}
      {[60, 110, 160, 215, 265, 315, 365, 415, 455].map((y, i) => (
        <path key={i} d={`M ${610 + i * 5} ${y} L ${670 + i * 4} ${y - 22} L ${720 + i * 5} ${y}`} fill="none" stroke="#57534e" strokeWidth="1.5" strokeOpacity="0.5" />
      ))}
      <text x="770" y="120" fill="#a8a29e" fontSize="14" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">Tog&apos; qoyalari</text>

      {/* Valley / gorge floor */}
      <rect x="220" y="0" width="370" height="506" fill="#1a2718" fillOpacity="0.7" />

      {/* Small river in valley */}
      <path d="M 390 0 Q 400 100 395 200 Q 390 320 405 506" fill="none" stroke="#38bdf8" strokeWidth="3" strokeOpacity="0.5" />
      <text x="415" y="260" fill="#7dd3fc" fontSize="10" filter="url(#text-shadow)">Dara seli</text>

      {/* Narrow pass label */}
      <rect x="225" y="225" width="145" height="28" rx="6" fill="#000000" fillOpacity="0.5" />
      <text x="298" y="243" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">📍 Tor dara (Parvon)</text>

      {/* Mongol forces — north (advancing into gorge) */}
      <rect x="318" y="58" width="175" height="58" rx="10" fill="#7f1d1d" fillOpacity="0.9" stroke="#ef4444" strokeWidth="2.5" />
      <text x="405" y="80" fill="#fecaca" fontSize="13" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">Mo&apos;g&apos;ul otliqlari</text>
      <text x="405" y="96" fill="#fca5a5" fontSize="10" textAnchor="middle" filter="url(#text-shadow)">Shig&apos;i Qutur qo&apos;mondonligi</text>
      <text x="405" y="110" fill="#f87171" fontSize="10" textAnchor="middle" filter="url(#text-shadow)">~45 000 otliq · Dara ichiga kirdi</text>

      {/* Mongol advance arrow */}
      <path d="M 405 116 L 405 180" fill="none" stroke="#ef4444" strokeWidth="6" markerEnd="url(#arr-red)" strokeLinecap="round" />

      {/* Jaloliddin Forces — south */}
      <rect x="305" y="345" width="200" height="60" rx="10" fill="#064e3b" fillOpacity="0.9" stroke="#10b981" strokeWidth="2.5" />
      <text x="405" y="368" fill="#a7f3d0" fontSize="13" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">Jaloliddin Manguberdi</text>
      <text x="405" y="384" fill="#6ee7b7" fontSize="10" textAnchor="middle" filter="url(#text-shadow)">Xorazm qo&apos;shini · ~60 000</text>
      <text x="405" y="398" fill="#34d399" fontSize="10" textAnchor="middle" filter="url(#text-shadow)">Qal&apos;a va baland manzil egallangan</text>

      {/* Archers on both cliffs */}
      <circle cx="258" cy="195" r="14" fill="#10b981" fillOpacity="0.8" stroke="#34d399" strokeWidth="2" filter="url(#b-glow)" />
      <text x="258" y="199" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">🏹</text>
      <text x="258" y="225" fill="#6ee7b7" fontSize="10" textAnchor="middle" filter="url(#text-shadow)">Kamonchilar</text>
      <text x="258" y="237" fill="#34d399" fontSize="9" textAnchor="middle" filter="url(#text-shadow)">(chap qoya)</text>

      <circle cx="558" cy="195" r="14" fill="#10b981" fillOpacity="0.8" stroke="#34d399" strokeWidth="2" filter="url(#b-glow)" />
      <text x="558" y="199" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">🏹</text>
      <text x="558" y="225" fill="#6ee7b7" fontSize="10" textAnchor="middle" filter="url(#text-shadow)">Kamonchilar</text>
      <text x="558" y="237" fill="#34d399" fontSize="9" textAnchor="middle" filter="url(#text-shadow)">(o&apos;ng qoya)</text>

      {/* Phase 1: Archers fire down on Mongols */}
      {activePhase >= 1 && (
        <g>
          <path d="M 258 181 Q 310 148 350 118" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="5 3" markerEnd="url(#arr-green)" />
          <path d="M 558 181 Q 505 148 462 118" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="5 3" markerEnd="url(#arr-green)" />
          <rect x="232" y="265" width="346" height="32" rx="6" fill="#000000" fillOpacity="0.6" />
          <text x="405" y="286" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">📍 Qoya ustidan o&apos;q yomg&apos;iri — Mo&apos;g&apos;ullar tartibsizlikka tushdi</text>
        </g>
      )}

      {/* Phase 2: Center decisive charge */}
      {activePhase >= 2 && (
        <g>
          <path d="M 405 345 L 405 200" fill="none" stroke="#38bdf8" strokeWidth="8" markerEnd="url(#arr-blue)" strokeLinecap="round" filter="url(#b-glow)" />
          <rect x="232" y="295" width="345" height="38" rx="6" fill="#0d1f3c" fillOpacity="0.95" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="405" y="313" fill="#bae6fd" fontSize="12" fontWeight="bold" textAnchor="middle" filter="url(#text-shadow)">Markaziy hal qiluvchi zarba!</text>
          <text x="405" y="327" fill="#7dd3fc" fontSize="10" textAnchor="middle" filter="url(#text-shadow)">Mo&apos;g&apos;ul qo&apos;shini tor daradan qochib ketdi — g&apos;alaba!</text>
        </g>
      )}

      {/* Legend */}
      <g transform="translate(700, 340)">
        <rect x="0" y="0" width="185" height="130" rx="10" fill="#0d1f3c" fillOpacity="0.9" stroke="#334155" strokeWidth="1" />
        <text x="10" y="18" fill="#94a3b8" fontSize="10" fontWeight="bold">AFSONALAR</text>
        <rect x="10" y="26" width="16" height="10" rx="2" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
        <text x="32" y="36" fill="#fca5a5" fontSize="10">Mo&apos;g&apos;ul qo&apos;shini</text>
        <rect x="10" y="46" width="16" height="10" rx="2" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
        <text x="32" y="56" fill="#6ee7b7" fontSize="10">Jaloliddin (Xorazm)</text>
        <circle cx="18" cy="72" r="8" fill="#10b981" fillOpacity="0.7" />
        <text x="32" y="76" fill="#34d399" fontSize="10">Kamonchilar manzili</text>
        <line x1="10" y1="92" x2="30" y2="92" stroke="#38bdf8" strokeWidth="3" />
        <text x="36" y="96" fill="#7dd3fc" fontSize="10">Hal qiluvchi zarba</text>
        <line x1="10" y1="112" x2="30" y2="112" stroke="#10b981" strokeWidth="3" strokeDasharray="5 3" />
        <text x="36" y="116" fill="#6ee7b7" fontSize="10">O&apos;q yomg&apos;iri yo&apos;li</text>
      </g>

      {/* Compass */}
      <g transform="translate(840, 460)">
        <circle cx="0" cy="0" r="22" fill="#0d1f3c" fillOpacity="0.9" stroke="#475569" strokeWidth="1.5" />
        <text x="0" y="-10" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">N</text>
        <text x="0" y="17" fill="#94a3b8" fontSize="9" textAnchor="middle">S</text>
        <text x="-14" y="4" fill="#94a3b8" fontSize="9" textAnchor="middle">W</text>
        <text x="14" y="4" fill="#94a3b8" fontSize="9" textAnchor="middle">E</text>
        <line x1="0" y1="-6" x2="0" y2="6" stroke="#e2e8f0" strokeWidth="1.5" />
        <line x1="-6" y1="0" x2="6" y2="0" stroke="#e2e8f0" strokeWidth="1.5" />
      </g>

      {/* Title */}
      <rect x="0" y="0" width="350" height="38" fill="#0d1f3c" fillOpacity="0.85" />
      <text x="12" y="24" fill="#fbbf24" fontSize="14" fontWeight="bold" filter="url(#text-shadow)">⚔ Parvon jangi · 1221-yil</text>
    </svg>
  );
}
