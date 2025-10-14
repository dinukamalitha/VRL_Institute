import React from 'react'

export interface SidebarItem {
  id?: string
  title: string
  excerpt?: string
  date: string
  description?: string
  category?: string
  time?: string
  location?: string
  type?: string
  author?: string
  image?: string | string[]
}

export interface SidebarProps {
  title: string
  items: SidebarItem[]
  isEventSidebar?: boolean
  onItemClick?: (item: SidebarItem) => void
  icon?: React.ReactNode
}

