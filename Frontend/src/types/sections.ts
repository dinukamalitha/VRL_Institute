export interface HeroSectionProps {
  title?: string
  subtitle?: string
  backgroundImage?: string
  animated?: boolean
}

export interface VisionMissionSectionProps {
  vision?: string
  mission?: string
  showVision?: boolean
  showMission?: boolean
}

export interface ResourcePerson {
  name: string
  title: string
  image: string
  description: string
  email?: string
  phone?: string
  linkedin?: string
}

export interface ResourcePersonsSectionProps {
  persons: ResourcePerson[]
  title?: string
  subtitle?: string
}

export interface ResourcePersonCardProps {
  person: ResourcePerson
  showDetails?: boolean
}

export interface Publication{
  title: string;
  documentUrl: string;
  category: string;
  authors: string;
  thumbnail?: string;
  authorImage?: string;
}

export interface StaffMember {
  _id: string;
  name: string;
  photo?: string;
  role: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}