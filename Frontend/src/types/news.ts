export interface NewsItem {
  title: string
  excerpt: string
  date: string
  time: string
  category: string
  author: string
}

export interface EventItem {
  title: string
  date: string
  time: string
  location: string
  type: string
}

export interface EditNewsBlogModalProps {
  open: boolean
  onClose: () => void
  newsItem?: any
  width?: string | number
  height?: string | number
}

export interface AddNewsBlogModalProps {
  open: boolean
  onClose: () => void
  width?: string | number
  height?: string | number
}

export interface ArticleModalProps {
  open: boolean
  onClose: () => void
  article: NewsItem | null
}

export interface NewsFilterProps {
  searchTerm: string
  selectedCategory: string
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onCategoryChange: (category: string) => void
  categories: string[]
} 