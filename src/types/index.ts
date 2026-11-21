export type Language = 'uz' | 'ru';

export type LawCategory =
  | 'konstitutsiya'
  | 'kodekslar'
  | 'qonunlar'
  | 'prezident_farmonlari'
  | 'prezident_qarorlari'
  | 'vm_qarorlari'
  | 'vazirlik_hujjatlari'
  | 'boshqa_hujjatlar';

export type DocumentStatus = 'amalda' | 'kuchini_yoqotgan' | 'kuchga_kirmagan';

export interface ArticleContent {
  id: string; // e.g. "1-modda"
  number: number;
  suffix?: string;
  title: string;
  titleRu?: string;
  content: string; // actual text
  contentRu?: string;
  parts?: string[]; // clauses / bands
  partsRu?: string[];
  notes?: string[];
  notesRu?: string[];
  sourceUrl?: string; // exact official Lex.uz anchor for this article
  sanctions?: string[]; // penalty info if criminal or administrative code
  sanctionsRu?: string[];
  lastModified?: string;
}

export interface Chapter {
  id: string; // e.g. "1-bob"
  number: number;
  title: string;
  titleRu?: string;
  description?: string;
  articles: ArticleContent[];
}

export interface Section {
  id: string; // e.g. "1-bolim"
  number: number;
  title: string;
  titleRu?: string;
  chapters: Chapter[];
}

export interface Part {
  id: string; // e.g. "umumiy-qism"
  title: string;
  titleRu?: string;
  sections?: Section[];
  chapters?: Chapter[];
}

export interface LegalDocument {
  id: string;
  slug: string;
  title: string;
  titleRu: string;
  shortTitle: string;
  shortTitleRu: string;
  category: LawCategory;
  actNumber: string; // Lex.uz number, e.g. "LRU-88" or "№ 163-I"
  adoptedDate: string;
  effectiveDate: string;
  lastUpdatedDate: string;
  status: DocumentStatus;
  lexUzUrl: string; // official Lex.uz URL
  officialGazette?: string; // Rasmiy e'lon qilingan manba
  totalArticles: number;
  description: string;
  descriptionRu: string;
  parts?: Part[];
  sections?: Section[];
  chapters?: Chapter[];
  isPopular?: boolean;
}

export interface SearchFilter {
  query: string;
  category?: LawCategory | 'all';
  limit?: number;
}

export interface SearchResultItem {
  documentId: string;
  documentSlug: string;
  documentTitle: string;
  documentCategory: LawCategory;
  articleId?: string;
  articleNumber?: number;
  articleTitle?: string;
  matchType: 'code' | 'law' | 'chapter' | 'article' | 'keyword';
  snippet: string;
  url: string;
}

export interface BookmarkItem {
  id: string;
  documentSlug: string;
  documentTitle: string;
  articleId: string;
  articleNumber: number;
  articleTitle: string;
  savedAt: string;
}

export interface ReadingHistoryItem {
  documentSlug: string;
  documentTitle: string;
  articleId?: string;
  articleTitle?: string;
  viewedAt: string;
}
