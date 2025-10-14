// Application constants

export const APP_CONFIG = {
  name: 'VRL Frontend',
  description: 'A modern Next.js application with production-ready structure',
  version: '1.0.0',
  author: 'VRL Team',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  retries: 3,
} as const

export const PAGINATION = {
  defaultPageSize: 10,
  pageSizeOptions: [5, 10, 20, 50],
  maxPageSize: 100,
} as const

export const VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  phone: /^\+?[\d\s\-\(\)]{10,}$/,
} as const

export const THEMES = [
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
  { name: 'System', value: 'system' },
] as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const 