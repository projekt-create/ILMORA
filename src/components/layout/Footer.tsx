'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguageStore } from '@/features/language/useLanguageStore';

const CURRENT_YEAR = 2026;

export function Footer() {
  const { t } = useLanguageStore();

  const subjects = [
    t.subjects.math,
    t.subjects.history,
    t.subjects.uzbekLang,
    t.subjects.biology,
    t.subjects.chemistry,
    t.subjects.physics,
    t.subjects.geography,
    t.subjects.english,
  ];

  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-amber-500 flex items-center justify-center text-white shadow-md">
                <Scale className="w-5 h-5 text-amber-300" />
              </div>
              <span className="font-extrabold text-xl tracking-wider text-white">ILMORA</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footer.description}
            </p>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-amber-400">
                <ShieldCheck className="w-4 h-4" />
                <span>{t.home.officialVerification}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {t.footer.lexAttribution}
              </p>
            </div>
          </div>

          {/* Useful Official Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a
                  href="https://lex.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Lex.uz — Qonunchilik ma’lumotlari</span>
                </a>
              </li>
              <li>
                <a
                  href="https://sud.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Sud.uz — Oliy sud portali</span>
                </a>
              </li>
              <li>
                <a
                  href="https://advice.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Advice.uz — Bepul huquqiy maslahat</span>
                </a>
              </li>
              <li>
                <a
                  href="https://adliya.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Adliya vazirligi rasmiy sayti</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Codes Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              {t.nav.codes}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/huquq/kodekslar/konstitutsiya" className="hover:text-amber-400 transition-colors">
                  O‘zbekiston Konstitutsiyasi
                </Link>
              </li>
              <li>
                <Link href="/huquq/kodekslar/jinoyat-kodeksi" className="hover:text-amber-400 transition-colors">
                  Jinoyat kodeksi
                </Link>
              </li>
              <li>
                <Link href="/huquq/kodekslar/fuqarolik-kodeksi" className="hover:text-amber-400 transition-colors">
                  Fuqarolik kodeksi
                </Link>
              </li>
              <li>
                <Link href="/huquq/kodekslar/mehnat-kodeksi" className="hover:text-amber-400 transition-colors">
                  Mehnat kodeksi (yangi tahrir)
                </Link>
              </li>
              <li>
                <Link href="/huquq/kodekslar/mamuriy-javobgarlik-kodeksi" className="hover:text-amber-400 transition-colors">
                  Ma’muriy javobgarlik kodeksi
                </Link>
              </li>
              <li>
                <Link href="/huquq/kodekslar/soliq-kodeksi" className="hover:text-amber-400 transition-colors">
                  Soliq kodeksi
                </Link>
              </li>
            </ul>
          </div>

          {/* Future Modules Preview */}
          <div>
            <div className="flex items-center gap-1.5 mb-4">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                {t.subjects.title}
              </h4>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              {t.subjects.subtitle}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {subjects.map((sub, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded-md bg-slate-800 text-[11px] text-slate-300 border border-slate-700/60"
                >
                  {sub}
                </span>
              ))}
              <span className="px-2 py-1 rounded-md bg-amber-500/10 text-[11px] text-amber-400 border border-amber-500/20 font-medium">
                {t.subjects.tests}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {CURRENT_YEAR} ILMORA Platform. {t.footer.allRightsReserved}</p>
          <p className="text-[11px]">{t.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
