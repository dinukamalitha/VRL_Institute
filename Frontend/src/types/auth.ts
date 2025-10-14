export interface LoginData {
  email: string
  password: string
}

export interface LoginFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: LoginData) => void
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
}

export interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  avatar?: string
}

export interface AuthContextType {
  auth: AuthState
  login: (credentials: LoginData) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
} 