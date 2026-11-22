'use client';

import { useState } from 'react';
import { Compass, MapPin, Info, Layers, CheckCircle2 } from 'lucide-react';
import { useLanguageStore } from '@/features/language/useLanguageStore';

interface RegionInfo {
  id: string;
  name: string;
  capital: string;
  period: string;
  rivers: string;
  modernEquiv: string;
  cities: string[];
  description: string;
  landmarks: string[];
  fillColor: string;
  strokeColor: string;
  labelColor: string;
}

const historicalRegions: Record<string, RegionInfo> = {
  sogd: {
    id: 'sogd',
    name: "So\u2018g\u2018diyona (So\u2018g\u2018d)",
    capital: 'Maroqanda (Samarqand)',
    period: 'Mil. avv. I mingyillik \u2014 milodiy VIII asr',
    rivers: "Zarafshon (Politimeta) va Qashqadaryo",
    modernEquiv: "Samarqand, Navoiy, Qashqadaryo viloyatlari va Buxoro sharqi",
    cities: ['Samarqand', "Kesh (Shahrisabz)", 'Nasaf (Qarshi)', 'Poykend', 'Varaxsha'],
    description: "Markaziy Osiyoning eng yirik savdo va madaniy markazlaridan biri. So\u2018g\u2018d savdogarlari Buyuk Ipak Yo\u2018lida asosiy vositachilik rolini o\u2018ynagan va Xitoygacha bo\u2018lgan masofada savdo koloniyalarini qurgan.",
    landmarks: [
      'Afrosiyob devoriy suratlari',
      "Kofirqal\u2018a",
      'Varaxsha saroyi',
      "Mug\u2018 tog\u2018i hujjatlari",
    ],
    fillColor: '#d97706',
    strokeColor: '#fbbf24',
    labelColor: '#fef9c3',
  },
  bactria: {
    id: 'bactria',
    name: 'Qadimgi Baqtriya',
    capital: 'Baqtra (Balx)',
    period: 'Mil. avv. VII asr \u2014 milodiy IV asr',
    rivers: 'Amudaryo (Oks) va Surxondaryo',
    modernEquiv: "Surxondaryo viloyati, Janubiy Tojikiston va Shimoliy Afg\u2018oniston",
    cities: ['Termiz', 'Baqtra', 'Dalvarzintepa', 'Xolchayon', 'Kampirtepa'],
    description: "To\u2018maris va Spitamen jasorati bilan nom qozongan, keyinchalik Yunon-Baqtriya va Kushon imperiyasi tarkibida ellinistik madaniyat gullab-yashnagan serhosil hudud.",
    landmarks: [
      'Dalvarzintepa tillalari',
      'Fayoztepa budda majmuasi',
      'Kampirtepa (Oks Aleksandriyasi)',
      'Zurmala minorasi',
    ],
    fillColor: '#1d4ed8',
    strokeColor: '#60a5fa',
    labelColor: '#dbeafe',
  },
  khorezm: {
    id: 'khorezm',
    name: 'Katta Xorazm',
    capital: "Tuproqqal\u2018a, Qiyot, Xiva",
    period: 'Mil. avv. VIII asr \u2014 XX asr',
    rivers: "Amudaryoning quyi oqimi va Orol havzasi",
    modernEquiv: "Xorazm viloyati, Qoraqalpog\u2018iston Respublikasi va Shimoliy Turkmaniston",
    cities: ["Tuproqqal\u2018a", "Qo\u2018yqirilg\u2018onqal\u2018a", 'Hazorasp', 'Xiva', "Ko\u2018hna Urganch"],
    description: "Insoniyatning eng qadimiy dehqonchilik va astronomiya o\u2018choqlaridan biri. Avestoning vatani hisoblangan bu o\u2018lka mustahkam cho\u2018l qal\u2018alari (\"Ellikqal\u2018a\") bilan dong taratgan.",
    landmarks: [
      "Tuproqqal\u2018a shoh saroyi",
      "Qo\u2018yqirilg\u2018onqal\u2018a rasadxonasi",
      'Chilpiq daxmasi',
      "Ayozqal\u2018a",
    ],
    fillColor: '#059669',
    strokeColor: '#34d399',
    labelColor: '#d1fae5',
  },
  fergana: {
    id: 'fergana',
    name: "Davan (Parkana / Farg\u2018ona)",
    capital: 'Ershi shahri',
    period: 'Mil. avv. III asr \u2014 milodiy VI asr',
    rivers: "Sirdaryo (Yaksart), Qoradaryo va Norin",
    modernEquiv: "Farg\u2018ona, Andijon, Namangan viloyatlari hamda Botken (Qirg\u2018iziston)",
    cities: ['Ershi (Marhamat)', 'Quva', 'Axsikent', "Marg\u2018ilon", "O\u2018sh"],
    description: "Qadimgi Xitoy manbalarida \"Davan davlati\" deb tilga olingan. O\u2018zining \"samoviy tulporlari\" (arg\u2018umoqlari), yuksak dehqonchilik va hunarmandchiligi bilan mashhur bo\u2018lgan.",
    landmarks: [
      'Quva budda ibodatxonasi',
      'Qadimgi Axsikent yodgorligi',
      'Ershi shahar xarobalari',
    ],
    fillColor: '#7c3aed',
    strokeColor: '#a78bfa',
    labelColor: '#ede9fe',
  },
  chach: {
    id: 'chach',
    name: 'Choch va Iloq (Shosh)',
    capital: 'Binkat (Toshkent)',
    period: 'Mil. avv. III asr \u2014 milodiy X asr',
    rivers: 'Chirchiq va Ohangaron daryolari',
    modernEquiv: "Toshkent shahri, Toshkent viloyati va Janubiy Qozog\u2018iston tutash yerlari",
    cities: ['Choch (Binkat)', 'Tunkat', 'Xonobod', 'Kanka', 'Banokat'],
    description: "Tog\u2018-kon sanoati, kumush, mis va temir qazib olish hamda qurolsozlik markazi bo\u2018lgan. Choch tangalari butun Markaziy Osiyo bozorlarida yurgan.",
    landmarks: ["Kanka shaharchasi", "Ming o\u2018rik manzilgohi", "Qo\u2018shtepa", 'Shoshtepa'],
    fillColor: '#be123c',
    strokeColor: '#fb7185',
    labelColor: '#ffe4e6',
  },
};

const cityDots = [
  { x: 390, y: 282, label: 'Samarqand', key: true },
  { x: 262, y: 300, label: 'Buxoro', key: true },
  { x: 155, y: 195, label: 'Xiva', key: false },
  { x: 500, y: 155, label: 'Toshkent', key: false },
  { x: 648, y: 228, label: "Marg\u2018ilon", key: false },
  { x: 450, y: 405, label: 'Termiz', key: false },
  { x: 350, y: 355, label: 'Shahrisabz', key: false },
  { x: 132, y: 128, label: "Ko\u2018hna Urganch", key: false },
];

const silkRoadNodes = [
  { x: 148, y: 195, label: 'Xiva' },
  { x: 262, y: 300, label: 'Buxoro' },
  { x: 390, y: 282, label: 'Samarqand' },
  { x: 500, y: 155, label: 'Toshkent' },
  { x: 648, y: 220, label: "Marg\u2018ilon" },
];

const silkLabels = ['Xiva', 'Buxoro', 'Samarqand', 'Toshkent', "Marg\u2018ilon"];

export function HistoryMapsView() {
  const { language } = useLanguageStore();
  const [activeRegion, setActiveRegion] = useState<string>('sogd');
  const [showSilkRoad, setShowSilkRoad] = useState(true);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const region = historicalRegions[activeRegion] || historicalRegions.sogd;
  const isRu = language === 'ru';

  return (
    <div className="space-y-8">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0">
            {isRu ? '\u0418\u0441\u0442\u043e\u0440\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u043e\u0431\u043b\u0430\u0441\u0442\u0438:' : 'Tarixiy viloyatlar:'}
          </span>
          {Object.values(historicalRegions).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveRegion(item.id)}
              style={
                activeRegion === item.id
                  ? { backgroundColor: item.fillColor, color: item.labelColor, borderColor: item.strokeColor }
                  : {}
              }
              className={`rounded-xl border px-3 py-1.5 text-xs font-extrabold shrink-0 transition ${
                activeRegion === item.id
                  ? 'border-transparent'
                  : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {item.name.split(' ')[0]}
            </button>
          ))}
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
          <input
            type="checkbox"
            checked={showSilkRoad}
            onChange={(e) => setShowSilkRoad(e.target.checked)}
            className="h-4 w-4 accent-amber-500 rounded-sm"
          />
          <Compass className="h-4 w-4 text-amber-500" />
          {isRu ? '\u0412\u0435\u043b\u0438\u043a\u0438\u0439 \u0428\u0451\u043b\u043a\u043e\u0432\u044b\u0439 \u043f\u0443\u0442\u044c' : "Buyuk Ipak Yo\u2018li marshruti"}
        </label>
      </div>

      {/* Interactive Map and Details Panel */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_.6fr]">
        {/* SVG Interactive Map */}
        <div
          className="relative overflow-hidden rounded-3xl shadow-2xl"
          style={{ background: 'linear-gradient(135deg,#0d1f3c 0%,#0a2540 50%,#0d1b2a 100%)' }}
        >
          <div className="flex items-center justify-between px-6 pt-5 pb-2">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Layers className="h-4 w-4" />
              {isRu
                ? '\u0418\u043d\u0442\u0435\u0440\u0430\u043a\u0442\u0438\u0432\u043d\u0430\u044f \u043a\u0430\u0440\u0442\u0430 \u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u043e\u0439 \u0410\u0437\u0438\u0438'
                : "O\u2018rta Osiyo qadimgi tarixiy viloyatlari"}
            </span>
            <span className="text-[11px] text-slate-400">
              {isRu
                ? '\u041d\u0430\u0436\u043c\u0438\u0442\u0435 \u043d\u0430 \u043e\u0431\u043b\u0430\u0441\u0442\u044c \u0434\u043b\u044f \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0430'
                : "Hududni bosib ma\u2018lumot oling"}
            </span>
          </div>

          <div className="px-3 pb-3 sm:px-4 sm:pb-4">
            <div className="overflow-x-auto -mx-1 sm:mx-0 rounded-2xl">
              <div className="min-w-[640px] sm:min-w-0">
                <svg
                  viewBox="0 0 900 560"
                  className="h-full w-full select-none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                >
              <defs>
                <radialGradient id="terrainBg" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stopColor="#1a3a2a" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#0d1f3c" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="desertGrad" cx="30%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#78350f" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
                </radialGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="textShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="#000000" floodOpacity="0.9" />
                </filter>
                <filter id="silkGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="cityGlow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <style>{`
                  @keyframes dashMove { to { stroke-dashoffset: -40; } }
                  .silk-road-path { animation: dashMove 2.5s linear infinite; }
                `}</style>
              </defs>

              <rect width="900" height="560" fill="url(#terrainBg)" />
              <rect width="900" height="560" fill="url(#desertGrad)" />

              {/* Orol dengizi */}
              <ellipse cx="90" cy="125" rx="62" ry="38" fill="#0ea5e9" fillOpacity="0.28" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.6" />
              <text x="56" y="128" fill="#7dd3fc" fontSize="10" fontWeight="bold" opacity="0.9">Orol</text>
              <text x="56" y="140" fill="#7dd3fc" fontSize="10" opacity="0.9">dengizi</text>

              {/* Mountain south */}
              <path d="M 380 490 L 400 468 L 420 480 L 445 455 L 475 472 L 500 450 L 530 468 L 560 445 L 590 460 L 620 440 L 660 455 L 700 435" fill="none" stroke="#6b4c2a" strokeWidth="2.5" strokeOpacity="0.7" />
              <path d="M 380 495 L 420 485 L 445 462 L 480 478 L 510 455 L 545 472 L 575 450 L 610 465 L 650 442 L 695 458" fill="#4a3520" fillOpacity="0.3" stroke="none" />
              <text x="490" y="510" fill="#a16207" fontSize="11" fontWeight="bold" opacity="0.85" textAnchor="middle" filter="url(#textShadow)">Pomir va Hindukush tog&apos;lari</text>

              {/* Mountain east */}
              <text x="845" y="115" fill="#a16207" fontSize="10" opacity="0.75" textAnchor="middle">Tian Shan</text>

              {/* Regions */}
              <g onClick={() => setActiveRegion('khorezm')} onMouseEnter={() => setHoveredRegion('khorezm')} onMouseLeave={() => setHoveredRegion(null)} className="cursor-pointer" filter={activeRegion === 'khorezm' ? 'url(#glow)' : undefined}>
                <polygon points="88,148 230,136 258,246 148,272 82,222" fill={historicalRegions.khorezm.fillColor} fillOpacity={activeRegion === 'khorezm' ? 0.6 : hoveredRegion === 'khorezm' ? 0.5 : 0.35} stroke={historicalRegions.khorezm.strokeColor} strokeWidth={activeRegion === 'khorezm' ? 3 : 1.5} style={{ transition: 'fill-opacity 0.2s' }} />
                <text x="148" y="202" fill={historicalRegions.khorezm.labelColor} fontWeight="bold" fontSize="15" textAnchor="middle" filter="url(#textShadow)">Xorazm</text>
              </g>

              <g onClick={() => setActiveRegion('chach')} onMouseEnter={() => setHoveredRegion('chach')} onMouseLeave={() => setHoveredRegion(null)} className="cursor-pointer" filter={activeRegion === 'chach' ? 'url(#glow)' : undefined}>
                <polygon points="460,118 592,106 612,196 494,218 450,168" fill={historicalRegions.chach.fillColor} fillOpacity={activeRegion === 'chach' ? 0.6 : hoveredRegion === 'chach' ? 0.5 : 0.35} stroke={historicalRegions.chach.strokeColor} strokeWidth={activeRegion === 'chach' ? 3 : 1.5} style={{ transition: 'fill-opacity 0.2s' }} />
                <text x="526" y="166" fill={historicalRegions.chach.labelColor} fontWeight="bold" fontSize="14" textAnchor="middle" filter="url(#textShadow)">Choch</text>
              </g>

              <g onClick={() => setActiveRegion('fergana')} onMouseEnter={() => setHoveredRegion('fergana')} onMouseLeave={() => setHoveredRegion(null)} className="cursor-pointer" filter={activeRegion === 'fergana' ? 'url(#glow)' : undefined}>
                <polygon points="612,196 758,180 790,278 650,300 584,232" fill={historicalRegions.fergana.fillColor} fillOpacity={activeRegion === 'fergana' ? 0.6 : hoveredRegion === 'fergana' ? 0.5 : 0.35} stroke={historicalRegions.fergana.strokeColor} strokeWidth={activeRegion === 'fergana' ? 3 : 1.5} style={{ transition: 'fill-opacity 0.2s' }} />
                <text x="692" y="248" fill={historicalRegions.fergana.labelColor} fontWeight="bold" fontSize="14" textAnchor="middle" filter="url(#textShadow)">Farg&#x2018;ona</text>
                <text x="692" y="264" fill={historicalRegions.fergana.labelColor} fontSize="11" textAnchor="middle" opacity="0.85" filter="url(#textShadow)">(Davan)</text>
              </g>

              <g onClick={() => setActiveRegion('sogd')} onMouseEnter={() => setHoveredRegion('sogd')} onMouseLeave={() => setHoveredRegion(null)} className="cursor-pointer" filter={activeRegion === 'sogd' ? 'url(#glow)' : undefined}>
                <polygon points="295,252 475,230 510,338 378,375 283,322" fill={historicalRegions.sogd.fillColor} fillOpacity={activeRegion === 'sogd' ? 0.6 : hoveredRegion === 'sogd' ? 0.5 : 0.35} stroke={historicalRegions.sogd.strokeColor} strokeWidth={activeRegion === 'sogd' ? 3 : 1.5} style={{ transition: 'fill-opacity 0.2s' }} />
                <text x="392" y="308" fill={historicalRegions.sogd.labelColor} fontWeight="bold" fontSize="17" textAnchor="middle" filter="url(#textShadow)">So&#x2018;g&#x2018;diyona</text>
              </g>

              <g onClick={() => setActiveRegion('bactria')} onMouseEnter={() => setHoveredRegion('bactria')} onMouseLeave={() => setHoveredRegion(null)} className="cursor-pointer" filter={activeRegion === 'bactria' ? 'url(#glow)' : undefined}>
                <polygon points="390,375 555,342 648,440 510,482 378,448" fill={historicalRegions.bactria.fillColor} fillOpacity={activeRegion === 'bactria' ? 0.6 : hoveredRegion === 'bactria' ? 0.5 : 0.35} stroke={historicalRegions.bactria.strokeColor} strokeWidth={activeRegion === 'bactria' ? 3 : 1.5} style={{ transition: 'fill-opacity 0.2s' }} />
                <text x="508" y="430" fill={historicalRegions.bactria.labelColor} fontWeight="bold" fontSize="16" textAnchor="middle" filter="url(#textShadow)">Baqtriya</text>
              </g>

              {/* Rivers */}
              <path d="M 115 195 Q 255 272 435 348 T 648 448" fill="none" stroke="#38bdf8" strokeWidth="3.5" strokeOpacity="0.5" />
              <text x="258" y="262" fill="#7dd3fc" fontSize="11" opacity="0.9" fontStyle="italic" filter="url(#textShadow)">Amudaryo (Oks)</text>

              <path d="M 300 95 Q 440 170 580 220 T 775 272" fill="none" stroke="#38bdf8" strokeWidth="3.5" strokeOpacity="0.5" />
              <text x="455" y="168" fill="#7dd3fc" fontSize="11" opacity="0.9" fontStyle="italic" filter="url(#textShadow)">Sirdaryo (Yaksart)</text>

              <path d="M 510 230 Q 420 280 300 310" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeOpacity="0.4" />
              <text x="390" y="248" fill="#93c5fd" fontSize="10" opacity="0.75" filter="url(#textShadow)">Zarafshon</text>

              {/* Silk Road */}
              {showSilkRoad && (
                <g>
                  <path d="M 790 230 L 648 220 L 500 155 L 390 282 L 262 300 L 148 195" fill="none" stroke="#f59e0b" strokeWidth="8" strokeOpacity="0.18" filter="url(#silkGlow)" />
                  <path className="silk-road-path" d="M 790 230 L 648 220 L 500 155 L 390 282 L 262 300 L 148 195" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="10 6" />
                  {silkRoadNodes.map((n) => (
                    <g key={n.label}>
                      <circle cx={n.x} cy={n.y} r="7" fill="#f59e0b" fillOpacity="0.9" stroke="#fde68a" strokeWidth="1.5" filter="url(#cityGlow)" />
                      <text x={n.x} y={n.y - 12} fill="#fef08a" fontSize="11" fontWeight="bold" textAnchor="middle" filter="url(#textShadow)">{n.label}</text>
                    </g>
                  ))}
                  <text x="310" y="354" fill="#fef08a" fontSize="11" fontWeight="bold" opacity="0.9" filter="url(#textShadow)">&#x2014; Buyuk Ipak Yo&#x2018;li &#x2014;</text>
                </g>
              )}

              {/* City dots */}
              {cityDots
                .filter((c) => !showSilkRoad || !silkLabels.includes(c.label))
                .map((c) => (
                  <g key={c.label}>
                    <circle cx={c.x} cy={c.y} r={c.key ? 7 : 5} fill="#ffffff" fillOpacity="0.85" stroke="#94a3b8" strokeWidth="1" />
                    <text x={c.x + 9} y={c.y + 4} fill="#e2e8f0" fontSize="11" fontWeight={c.key ? 'bold' : 'normal'} filter="url(#textShadow)">{c.label}</text>
                  </g>
                ))}

              {/* Compass Rose */}
              <g transform="translate(840, 490)">
                <circle cx="0" cy="0" r="22" fill="#0d1f3c" fillOpacity="0.85" stroke="#475569" strokeWidth="1.5" />
                <text x="0" y="-10" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">N</text>
                <text x="0" y="17" fill="#94a3b8" fontSize="9" textAnchor="middle">S</text>
                <text x="-14" y="4" fill="#94a3b8" fontSize="9" textAnchor="middle">W</text>
                <text x="14" y="4" fill="#94a3b8" fontSize="9" textAnchor="middle">E</text>
                <line x1="0" y1="-7" x2="0" y2="7" stroke="#e2e8f0" strokeWidth="1.5" />
                <line x1="-7" y1="0" x2="7" y2="0" stroke="#e2e8f0" strokeWidth="1.5" />
              </g>

              {/* Legend */}
              <g transform="translate(14, 390)">
                <rect x="0" y="0" width="168" height="130" rx="10" fill="#0d1f3c" fillOpacity="0.88" stroke="#334155" strokeWidth="1" />
                <text x="10" y="18" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="start">AFSONALAR</text>
                <line x1="10" y1="32" x2="34" y2="32" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5 3" />
                <text x="40" y="36" fill="#fef9c3" fontSize="10">Buyuk Ipak Yo&#x2018;li</text>
                <line x1="10" y1="50" x2="34" y2="50" stroke="#38bdf8" strokeWidth="2.5" strokeOpacity="0.7" />
                <text x="40" y="54" fill="#bae6fd" fontSize="10">Daryolar</text>
                {Object.values(historicalRegions).map((r, i) => (
                  <g key={r.id}>
                    <rect x="10" y={68 + i * 11} width="10" height="8" rx="2" fill={r.fillColor} fillOpacity="0.8" />
                    <text x="25" y={76 + i * 11} fill="#e2e8f0" fontSize="9">{r.name.split(' ')[0]}</text>
                  </g>
                ))}
              </g>

              {/* Scale bar */}
              <g transform="translate(14, 540)">
                <line x1="0" y1="0" x2="80" y2="0" stroke="#94a3b8" strokeWidth="2" />
                <line x1="0" y1="-4" x2="0" y2="4" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="80" y1="-4" x2="80" y2="4" stroke="#94a3b8" strokeWidth="1.5" />
                <text x="40" y="-6" fill="#94a3b8" fontSize="9" textAnchor="middle">&#x2248; 400 km</text>
              </g>
            </svg>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 sm:hidden px-1">
              <span>👈 Xaritani barmog&apos;ingiz bilan surib ko&apos;ring</span>
              <span className="text-amber-400 font-semibold text-[10px] bg-amber-400/10 px-2 py-0.5 rounded-md">Interaktiv</span>
            </div>
          </div>
        </div>

        {/* Selected Region Detailed Card */}
        <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <MapPin className="h-4 w-4" /> {isRu ? '\u0421\u0432\u0435\u0434\u0435\u043d\u0438\u044f \u043e \u0440\u0435\u0433\u0438\u043e\u043d\u0435' : 'Viloyat pasporti'}
            </div>
            <h3 className="text-2xl font-black text-blue-950 dark:text-white">{region.name}</h3>

            <div className="space-y-2 border-y border-slate-100 py-3 text-xs dark:border-slate-800">
              <div>
                <span className="font-bold text-slate-500">{isRu ? '\u041f\u0435\u0440\u0438\u043e\u0434:' : 'Davri:'}</span>{' '}
                <span className="font-semibold text-slate-900 dark:text-white">{region.period}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500">{isRu ? '\u0421\u0442\u043e\u043b\u0438\u0446\u0430 / \u0426\u0435\u043d\u0442\u0440:' : 'Markazi / Poytaxti:'}</span>{' '}
                <span className="font-semibold text-slate-900 dark:text-white">{region.capital}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500">{isRu ? '\u0412\u043e\u0434\u043d\u044b\u0435 \u0430\u0440\u0442\u0435\u0440\u0438\u0438:' : 'Daryolari:'}</span>{' '}
                <span className="font-semibold text-slate-900 dark:text-white">{region.rivers}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500">{isRu ? '\u0421\u043e\u0432\u0440\u0435\u043c\u0435\u043d\u043d\u0430\u044f \u0442\u0435\u0440\u0440\u0438\u0442\u043e\u0440\u0438\u044f:' : 'Zamonaviy hududiy mosligi:'}</span>{' '}
                <span className="font-semibold text-amber-700 dark:text-amber-300">{region.modernEquiv}</span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">{region.description}</p>

            <div>
              <p className="mb-2 text-xs font-extrabold uppercase tracking-wide text-slate-700 dark:text-slate-200">
                {isRu ? '\u041e\u0441\u043d\u043e\u0432\u043d\u044b\u0435 \u0433\u043e\u0440\u043e\u0434\u0430:' : 'Asosiy shaharlari:'}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {region.cities.map((city, idx) => (
                  <span key={idx} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-extrabold uppercase tracking-wide text-slate-700 dark:text-slate-200">
                {isRu ? '\u0410\u0440\u0445\u0435\u043e\u043b\u043e\u0433\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u043f\u0430\u043c\u044f\u0442\u043d\u0438\u043a\u0438:' : 'Mashhur arxeologik obidalari:'}
              </p>
              <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                {region.landmarks.map((mark, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    {mark}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-amber-50 p-3 text-[11px] text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
            <Info className="mb-1 inline h-3.5 w-3.5 mr-1" />
            {isRu
              ? '\u041a\u0430\u0440\u0442\u0430 \u043f\u043e\u0441\u0442\u0440\u043e\u0435\u043d\u0430 \u043d\u0430 \u043e\u0441\u043d\u043e\u0432\u0435 \u0430\u0440\u0445\u0435\u043e\u043b\u043e\u0433\u0438\u0447\u0435\u0441\u043a\u0438\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u0418\u043d\u0441\u0442\u0438\u0442\u0443\u0442\u0430 \u0430\u0440\u0445\u0435\u043e\u043b\u043e\u0433\u0438\u0438 \u0410\u041d \u0420\u0423\u0437.'
              : 'Xarita Fanlar akademiyasi Arxeologiya instituti ilmiy materiallari asosida tuzilgan.'}
          </div>
        </div>
      </div>
    </div>
  );
}
