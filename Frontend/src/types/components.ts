export interface InfoCardProps {
  title: string
  excerpt?: string
  date?: string
  time?: string
  category?: string
  author?: string
  location?: string
  type?: string
  isEvent?: boolean
  image?: string | string[]
}

export interface HeroSectionProps {
  title?: string
  subtitle?: string
  backgroundImage?: string
}

export interface ResourcePerson {
  _id: string
  name: string
  photo: string;
  description: string
}

export interface ResourcePersonCardProps {
  person: ResourcePerson
}

export interface ThemeRegistryProps {
  children: React.ReactNode
} 