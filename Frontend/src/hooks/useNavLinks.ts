'use client'

import { usePathname } from 'next/navigation'
import { getNavLinks } from '@/config/navigation'

/**
 * React hook to get navigation links based on current route
 * Use this in client components to automatically get the correct navigation links
 * 
 * @example
 * ```tsx
 * 'use client'
 * import { useNavLinks } from '@/hooks/useNavLinks'
 * 
 * export default function MyPage() {
 *   const navLinks = useNavLinks()
 *   return <Navbar navLinks={navLinks} />
 * }
 * ```
 */
export function useNavLinks() {
  const pathname = usePathname()
  return getNavLinks(pathname)
}

