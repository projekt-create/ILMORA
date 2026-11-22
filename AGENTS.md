<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->

## ILMORA Tarix moduli — holat va keyingi ishlar

### Bajarilgan ishlar

- `/tarix` markaz sahifasi va barcha bo‘lim yo‘llari to‘liq ishga tushirildi: `uzbekistan`, `world`, `people`, `dates`, `maps`, `glossary`, `certificate`.
- O‘zbekiston tarixi (Eng qadimgi davr, Qadimgi davlatlar, O‘rta asrlar, Amir Temur va Temuriylar, Xonliklar, Mustamlaka va Jadidchilik, Mustaqil O‘zbekiston) va Jahon tarixi (Qadimgi dunyo, O‘rta asrlar, Yangi va eng yangi davr) mavzulari chuqur dars kontenti bilan to‘ldirildi (`detailedSections`, `causeAndEffect`, `keyFigures`, `keyDates`, `keyTerms`, `miniQuiz`).
- Har bir sana va shaxs uchun rasmiy va ilmiy manbalar (O‘zbekiston Milliy Ensiklopediyasi, BMT rasmiy sayti, Lex.uz, Britannica) ko‘rsatilib, `verificationStatus: 'verified'` holatiga keltirildi.
- Global qidiruv tizimi kengaytirildi: mavzular, tarixiy shaxslar va sanalar bo‘yicha qidirish, debounce (250ms), qidiruv takliflari (suggestions), klaviatura navigatsiyasi (ArrowUp/Down, Enter, Esc) va `localStorage`da saqlanadigan qidiruv tarixi.
- Qotirilgan 24% progress qiymati butunlay olib tashlandi; foydalanuvchi mavzularni o‘qib borgani sari (`markRead` / `toggleRead`) progress real vaqtda dinamik hisoblanadi va so‘nggi o‘qilgan mavzular ko‘rsatiladi.
- Bilim sinovi kengaytirildi: turli toifalar va davrlar bo‘yicha savollar, filtrlar ("Barchasi", "O‘zbekiston tarixi", "Jahon tarixi", "Temuriylar", "Yangi davr"), natija tahlili va qayta ishlash funksiyasi.
- Tarixiy taqqoslashlar 5 ta sifatli qiyosiy jadval bilan boyitildi (Afina va Sparta, Rim Respublikasi va Imperiyasi, Buxoro amirligi va Qo‘qon xonligi, Somoniylar va Qoraxoniylar, Birinchi va Ikkinchi jahon urushlari).
- Xaritalar (`/tarix/maps`) bo‘limiga tashqi API’siz, loyiha ichida toza SVG asosidagi interaktiv Markaziy Osiyo tarixiy viloyatlari (Baqtriya, So‘g‘d, Xorazm, Choch, Farg‘ona) va Buyuk Ipak Yo‘li xaritasi kiritildi.
- Milliy sertifikat (`/tarix/certificate`) bo‘limida UzBMB (BBA) formati, 3 ta test bloki strukturasi, baholash mezonlari (A+, A, B+, B darajalari), namunaviy amaliy topshiriqlar va tavsiya etiladigan rasmiy adabiyotlar jamlandi.
- O‘zbekcha va ruscha ko‘p tillilik qo‘llab-quvvatlandi: `src/features/language/translations.ts` ga `history` bo‘limi to‘liq kiritildi va komponentlarga bog‘landi.
- `npx tsc --noEmit` va `npm run lint` 0 xato va 0 ogohlantirish bilan muvaffaqiyatli yakunlandi.

### Chegaralar va qoidalar saqlandi

- Huquq moduliga tegishli kodlar o‘zgartirilmadi.
- Backend, API yoki tashqi ma’lumotlar bazasi qo‘shilmadi; barcha ma’lumotlar TypeScript ma’lumotlar tuzilmasida, progress esa `localStorage`da qoldi.
- Hech qanday soxta yoki manbasiz faktlar qo‘shilmadi.
