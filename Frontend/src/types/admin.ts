import { EventItem, NewsItem } from '@/types/news'

export interface AdminStats {
  totalUsers: number
  totalArticles: number
  totalEvents: number
  recentActivity: number
}

export interface AdminDashboardProps {
  stats: AdminStats
}

export interface NewsManagementProps {
  articles: NewsItem[]
  onAddArticle: (article: Partial<NewsItem>) => void
  onEditArticle: (id: string, article: Partial<NewsItem>) => void
  onDeleteArticle: (id: string) => void
}

export interface EventManagementProps {
  events: EventItem[]
  onAddEvent: (event: Partial<EventItem>) => void
  onEditEvent: (id: string, event: Partial<EventItem>) => void
  onDeleteEvent: (id: string) => void
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  lastLogin: Date
  isActive: boolean
}

export interface AdminUserManagementProps {
  users: AdminUser[]
  onAddUser: (user: Partial<AdminUser>) => void
  onEditUser: (id: string, user: Partial<AdminUser>) => void
  onDeleteUser: (id: string) => void
  onToggleUserStatus: (id: string) => void
} 