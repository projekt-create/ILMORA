import { ILawRepository, LocalLawRepository } from './lawRepository';
import { LegalDocument, LawCategory, SearchResultItem } from '@/types';

export class LawService {
  private repository: ILawRepository;

  constructor(repository: ILawRepository = new LocalLawRepository()) {
    this.repository = repository;
  }

  async getAllCodes(): Promise<LegalDocument[]> {
    return this.repository.getAllCodes();
  }

  async getCodeBySlug(slug: string): Promise<LegalDocument | null> {
    return this.repository.getCodeBySlug(slug);
  }

  async getPopularCodes(): Promise<LegalDocument[]> {
    return this.repository.getPopularCodes();
  }

  async getDocumentsByCategory(category: LawCategory): Promise<LegalDocument[]> {
    return this.repository.getDocumentsByCategory(category);
  }

  async getArticle(documentSlug: string, articleId: string) {
    return this.repository.getArticle(documentSlug, articleId);
  }

  async search(query: string, category?: LawCategory | 'all'): Promise<SearchResultItem[]> {
    return this.repository.searchDocuments(query, category);
  }

  formatCitation(documentTitle: string, articleTitle: string, lexUzUrl?: string): string {
    const base = `"${documentTitle}", ${articleTitle}.`;
    if (lexUzUrl) {
      return `${base} Rasmiy manba: ${lexUzUrl} (ILMORA platformasi orqali nusxalandi)`;
    }
    return `${base} (ILMORA platformasi orqali nusxalandi)`;
  }
}

export const lawService = new LawService();
