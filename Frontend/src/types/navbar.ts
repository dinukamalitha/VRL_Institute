export interface NavLink {
  label: string
  href: string
  external?: boolean
}

export interface NavbarProps {
  navLinks: NavLink[]
  logoSize?: 'small' | 'medium' | 'large'
  elevation?: number
} 