export interface JournalArticle {
    _id?: string;
    title: string;
    abstract: string;
    category: string;
    authors: Array<{
      _id?: string;
      name: string;
      photo?: string;
      description?: string;
    }>;
    publishedDate?: string;
    volume: string;
    issue: string;
    keywords?: string[];
    documentUrl?: string;
    peerReviewed?: boolean;
    createdAt?: string;
    updatedAt?: string;
  }

  export interface JournalArticleFilters {
    volume?: string;
    issue?: string;
    category?: string;
    limit?: number;
    sortBy?: 'newest' | 'oldest' | 'title';
  }

  export interface JournalVolume {
    _id?: string;
    title: string;
    publisher: string;
    documentUrl?: string;
    createdAt?: string;
    updatedAt?: string;
  }

  export interface AddJournalVolumeModalProps {
    open: boolean
    onClose: () => void
  }

  export interface EditJournalArticleModalProps {
    open: boolean
    onClose: () => void
    article: any
  }

  export interface AddJournalArticleModalProps {
    open: boolean
    onClose: () => void
  }

  export interface EditJournalVolumeModalProps {
    open: boolean
    onClose: () => void
    volume: any
  }