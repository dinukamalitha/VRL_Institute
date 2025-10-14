// Common types used throughout the application

// API and Response types
export interface ApiResponse<T = never> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form and UI types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select'
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
    message?: string
  }
}

export interface NavItem {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  children?: NavItem[]
}

export interface Theme {
  name: string
  value: 'light' | 'dark' | 'system'
}

