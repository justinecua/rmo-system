export interface Article {
  article_id: number;
  title: string;
  authors: string[];
  emails: string[];
  abstract: string;
  college: { name: string; code?: string };
  keywords: string[];
  status: string;
  articleFiles?: { pdf_path: string }[];
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
