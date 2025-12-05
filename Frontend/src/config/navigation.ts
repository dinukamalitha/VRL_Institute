import { NavLink } from '@/types/navbar'

/**
 * Base navigation links configuration
 * This is the single source of truth for all navigation links
 */
export const BASE_NAV_LINKS: Omit<NavLink, 'href'>[] = [
  { label: 'Home' },
  { label: 'Services' },
  { label: "Writers' Hub" },
  { label: 'Events & Programs' },
  { label: 'Publications' },
  { label: 'VRL Journal' },
  { label: 'Contact' },
]

/**
 * Navigation link IDs for hash-based navigation
 */
export const NAV_LINK_IDS = {
  HOME: 'hero',
  SERVICES: 'services',
  NEWS_BLOG: 'newsblog',
  EVENTS: 'events',
  PUBLICATIONS: 'publications',
  JOURNALS: 'journals',
  CONTACT: 'contact',
} as const

/**
 * Route paths for navigation
 */
export const ROUTES = {
  HOME: '/',
  NEWS_BLOGS: '/news-blogs',
  EVENTS: '/events',
  JOURNAL: '/journal',
} as const

/**
 * Get navigation links based on the current pathname
 * - On home page (/): Uses hash links for smooth scrolling
 * - On other pages: Uses full paths with hash or direct routes
 * 
 * @param pathname - Current pathname (e.g., from usePathname() hook)
 * @returns Array of NavLink objects configured for the current page
 */
export function getNavLinks(pathname: string): NavLink[] {
  const isHomePage = pathname === ROUTES.HOME

  return BASE_NAV_LINKS.map((link) => {
    let href: string

    switch (link.label) {
      case 'Home':
        href = isHomePage ? `#${NAV_LINK_IDS.HOME}` : ROUTES.HOME
        break
      case 'Services':
        href = isHomePage ? `#${NAV_LINK_IDS.SERVICES}` : `/#${NAV_LINK_IDS.SERVICES}`
        break
      case "Writers' Hub":
        href = isHomePage ? `#${NAV_LINK_IDS.NEWS_BLOG}` : ROUTES.NEWS_BLOGS
        break
      case 'Events & Programs':
        // On events page, keep it as current page, otherwise link to home section or events page
        if (pathname === ROUTES.EVENTS || pathname.startsWith(ROUTES.EVENTS)) {
          href = ROUTES.EVENTS
        } else {
          href = isHomePage ? `#${NAV_LINK_IDS.EVENTS}` : `/#${NAV_LINK_IDS.EVENTS}`
        }
        break
      case 'Publications':
        href = isHomePage ? `#${NAV_LINK_IDS.PUBLICATIONS}` : `/#${NAV_LINK_IDS.PUBLICATIONS}`
        break
      case 'VRL Journal':
        // On journal page, keep it as current page, otherwise link to home section or journal page
        if (pathname === ROUTES.JOURNAL || pathname.startsWith(ROUTES.JOURNAL)) {
          href = ROUTES.JOURNAL
        } else {
          href = isHomePage ? `#${NAV_LINK_IDS.JOURNALS}` : `/#${NAV_LINK_IDS.JOURNALS}`
        }
        break
      case 'Contact':
        href = isHomePage ? `#${NAV_LINK_IDS.CONTACT}` : `/#${NAV_LINK_IDS.CONTACT}`
        break
      default:
        href = ROUTES.HOME
    }

    return {
      ...link,
      href,
    }
  })
}

