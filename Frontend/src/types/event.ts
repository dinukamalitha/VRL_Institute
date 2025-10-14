export type ApiEventItem = {
  _id: string
  title: string
  authors: {
    name: string
    description: string
    photo: string
  }[]
  date: string
  time: string
  medium: string
  location: string
  status: string
  images?: string[]
  registrationLink: string
  description: string
}

export type EventItem = {
  _id: string
  title: string
  authors: {
    name: string
    description: string
    photo: string
  }[]
  date: string
  time: string
  medium: string
  location: string
  registrationLink: string
  status: 'Active' | 'Inactive' | string
  thumbnail?: string | null
  description: string
}

export interface AddEventModalProps {
  open: boolean
  onClose: () => void
  width?: string | number
  height?: string | number
}

export interface EditEventModalProps {
  open: boolean
  onClose: () => void
  eventItem?: any
  width?: string | number
  height?: string | number
}

