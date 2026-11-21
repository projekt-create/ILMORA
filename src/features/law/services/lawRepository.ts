import { LegalDocument, LawCategory, SearchResultItem, ArticleContent } from '@/types';
import { OFFICIAL_CODES_CATALOG } from '../data/codesCatalog';
import { DETAILED_LEGAL_DOCUMENTS } from '../data/documentsData';
import { loadOfficialDocument } from '../data/officialDocumentsData';

export interface ILawRepository {
  getAllCodes(): Promise<LegalDocument[]>;
  getCodeBySlug(slug: string): Promise<LegalDocument | null>;
  getPopularCodes(): Promise<LegalDocument[]>;
  getDocumentsByCategory(category: LawCategory): Promise<LegalDocument[]>;
  getArticle(documentSlug: string, articleId: string): Promise<{
    document: LegalDocument;
    article: ArticleContent;
    chapterTitle?: string;
  } | null>;
  searchDocuments(query: string, category?: LawCategory | 'all'): Promise<SearchResultItem[]>;
}

export class LocalLawRepository implements ILawRepository {
  async getAllCodes(): Promise<LegalDocument[]> {
    return OFFICIAL_CODES_CATALOG;
  }

  async getCodeBySlug(slug: string): Promise<LegalDocument | null> {
    const officialDocument = await loadOfficialDocument(slug);
    if (officialDocument) {
      return officialDocument;
    }

    if (DETAILED_LEGAL_DOCUMENTS[slug]) {
      return DETAILED_LEGAL_DOCUMENTS[slug];
    }
    const foundInCatalog = OFFICIAL_CODES_CATALOG.find((c) => c.slug === slug);
    if (foundInCatalog) {
      return foundInCatalog;
    }
    return null;
  }

  async getPopularCodes(): Promise<LegalDocument[]> {
    return OFFICIAL_CODES_CATALOG.filter((c) => c.isPopular);
  }

  async getDocumentsByCategory(category: LawCategory): Promise<LegalDocument[]> {
    if (category === 'kodekslar') {
      return OFFICIAL_CODES_CATALOG.filter((c) => c.category === 'kodekslar');
    }
    if (category === 'konstitutsiya') {
      return OFFICIAL_CODES_CATALOG.filter((c) => c.category === 'konstitutsiya');
    }
    return OFFICIAL_CODES_CATALOG.filter((c) => c.category === category);
  }

  async getArticle(documentSlug: string, articleId: string) {
    const doc = await this.getCodeBySlug(documentSlug);
    if (!doc || !doc.parts) return null;

    const normalizedArticleId = articleId.toLowerCase().replace(/[^0-9a-z\-]/g, '');

    for (const part of doc.parts) {
      const chapters = part.chapters || (part.sections ? part.sections.flatMap((s) => s.chapters) : []);
      for (const chapter of chapters) {
        for (const article of chapter.articles) {
          const artId = article.id.toLowerCase();
          const artNum = `${article.number}-modda`;
          const artNumOnly = `${article.number}`;

          if (
            artId === normalizedArticleId ||
            artNum === normalizedArticleId ||
            artNumOnly === normalizedArticleId ||
            normalizedArticleId === `modda-${article.number}`
          ) {
            return {
              document: doc,
              article,
              chapterTitle: chapter.title,
            };
          }
        }
      }
    }
    return null;
  }

  async searchDocuments(query: string, category?: LawCategory | 'all'): Promise<SearchResultItem[]> {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: SearchResultItem[] = [];

    // Parse queries like "Mehnat kodeksi 100-modda", "Jinoyat kodeksi 15", "Konstitutsiya 41-modda"
    const articlePattern = /(.*?)(?:(?:da|\s+))?(\d+)(?:-?\s*modda)?$/i;
    const match = q.match(articlePattern);
    let targetDocKeyword = q;
    let targetArticleNumber: number | null = null;

    if (match && match[2]) {
      targetArticleNumber = parseInt(match[2], 10);
      targetDocKeyword = match[1].trim();
    }

    // 1. Search in codes catalog
    for (const code of OFFICIAL_CODES_CATALOG) {
      if (category && category !== 'all' && code.category !== category) {
        continue;
      }

      const titleMatch =
        code.title.toLowerCase().includes(q) ||
        code.shortTitle.toLowerCase().includes(q) ||
        code.titleRu.toLowerCase().includes(q);

      if (titleMatch) {
        results.push({
          documentId: code.id,
          documentSlug: code.slug,
          documentTitle: code.title,
          documentCategory: code.category,
          matchType: 'code',
          snippet: code.description,
          url: `/huquq/kodekslar/${code.slug}`,
        });
      }

      // Check detailed articles
      const detailed = DETAILED_LEGAL_DOCUMENTS[code.slug];
      if (detailed && detailed.parts) {
        for (const part of detailed.parts) {
          const chapters = part.chapters || (part.sections ? part.sections.flatMap((s) => s.chapters) : []);
          for (const ch of chapters) {
            // Chapter search e.g. "Oila kodeksi 4-bob"
            if (ch.title.toLowerCase().includes(q) || (ch.titleRu && ch.titleRu.toLowerCase().includes(q))) {
              results.push({
                documentId: code.id,
                documentSlug: code.slug,
                documentTitle: code.title,
                documentCategory: code.category,
                matchType: 'chapter',
                snippet: `${ch.title}: ${code.title} tarkibidagi bob`,
                url: `/huquq/kodekslar/${code.slug}#${ch.id}`,
              });
            }

            for (const art of ch.articles) {
              const matchesArticleDirectly =
                targetArticleNumber !== null &&
                art.number === targetArticleNumber &&
                (targetDocKeyword === '' ||
                  code.title.toLowerCase().includes(targetDocKeyword) ||
                  code.shortTitle.toLowerCase().includes(targetDocKeyword));

              const textMatches =
                art.content.toLowerCase().includes(q) ||
                (art.contentRu && art.contentRu.toLowerCase().includes(q)) ||
                art.title.toLowerCase().includes(q) ||
                (art.titleRu && art.titleRu.toLowerCase().includes(q));

              if (matchesArticleDirectly || textMatches) {
                results.push({
                  documentId: code.id,
                  documentSlug: code.slug,
                  documentTitle: code.title,
                  documentCategory: code.category,
                  articleId: art.id,
                  articleNumber: art.number,
                  articleTitle: art.title,
                  matchType: 'article',
                  snippet: art.content.length > 180 ? art.content.slice(0, 180) + '...' : art.content,
                  url: `/huquq/kodekslar/${code.slug}/${art.id}`,
                });
              }
            }
          }
        }
      }
    }

    return results;
  }
}
