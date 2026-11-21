import type { LegalDocument, Part } from '@/types';
import { OFFICIAL_CODES_CATALOG } from './codesCatalog';

type RawDocument = { articleCount: number; parts: unknown[] };

const loaders: Record<string, () => Promise<{ default: unknown }>> = {
  konstitutsiya: () => import('../../../../scripts/data/konstitutsiya.json'),
  'jinoyat-kodeksi': () => import('../../../../scripts/data/jinoyat-kodeksi.json'),
  'fuqarolik-kodeksi': () => import('../../../../scripts/data/fuqarolik-kodeksi.json'),
  'mehnat-kodeksi': () => import('../../../../scripts/data/mehnat-kodeksi.json'),
  'mamuriy-javobgarlik-kodeksi': () => import('../../../../scripts/data/mamuriy-javobgarlik-kodeksi.json'),
  'oila-kodeksi': () => import('../../../../scripts/data/oila-kodeksi.json'),
  'soliq-kodeksi': () => import('../../../../scripts/data/soliq-kodeksi.json'),
  'jinoyat-protsessual-kodeksi': () => import('../../../../scripts/data/jinoyat-protsessual-kodeksi.json'),
  'fuqarolik-protsessual-kodeksi': () => import('../../../../scripts/data/fuqarolik-protsessual-kodeksi.json'),
  'iqtisodiy-protsessual-kodeksi': () => import('../../../../scripts/data/iqtisodiy-protsessual-kodeksi.json'),
  'mamuriy-sud-ishlarini-yuritish-kodeksi': () => import('../../../../scripts/data/mamuriy-sud-ishlarini-yuritish-kodeksi.json'),
  'bojxona-kodeksi': () => import('../../../../scripts/data/bojxona-kodeksi.json'),
  'yer-kodeksi': () => import('../../../../scripts/data/yer-kodeksi.json'),
  'uy-joy-kodeksi': () => import('../../../../scripts/data/uy-joy-kodeksi.json'),
  'budjet-kodeksi': () => import('../../../../scripts/data/budjet-kodeksi.json'),
  'saylov-kodeksi': () => import('../../../../scripts/data/saylov-kodeksi.json'),
  'shaharsozlik-kodeksi': () => import('../../../../scripts/data/shaharsozlik-kodeksi.json'),
  'havo-kodeksi': () => import('../../../../scripts/data/havo-kodeksi.json'),
};

export async function loadOfficialDocument(slug: string): Promise<LegalDocument | null> {
  const loader = loaders[slug];
  const catalogDocument = OFFICIAL_CODES_CATALOG.find((document) => document.slug === slug);

  if (!loader || !catalogDocument) return null;

  const { default: loaded } = await loader();
  const raw = loaded as RawDocument;

  return {
    ...catalogDocument,
    // The official current text is the source of truth for the visible count.
    totalArticles: raw.articleCount,
    parts: raw.parts as Part[],
  };
}

export const FULL_TEXT_DOCUMENT_SLUGS = new Set(Object.keys(loaders));
