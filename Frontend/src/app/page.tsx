'use client'

import { Box } from '@mui/material'
import Navbar from '@/components/Navbar'
import { NavLink } from '@/types/navbar'
import HeroSection from '@/sections/Other/HeroSection'
import VisionMissionSection from '@/sections/Other/VisionMissionSection'
import ResourcePersonsSection from '@/sections/Other/ResourcePersonsSection'
import Footer from '@/components/Footer'
import NewsBlogSection from '@/sections/NewsBlog/newsBlogs'
import EventsSection from '@/sections/Events/events'
import JournalSection from '@/sections/Journal/vrlJournal'
import NewsSidebar from '@/sections/NewsBlog/news-sidebar'
import EventsSidebar from '@/sections/Events/events-sidebar'
import ServicesSection from '@/sections/Other/services'
import PublicationsSection from '@/sections/Publications/publications'

export default function HomePage() {

  const navLinks: NavLink[] = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: "Writers' Hub", href: '#newsblog' },
    { label: 'Events & Programs', href: '#events' },
    { label: 'Publications', href: '#publications' },
    { label: 'VRL Journal', href: '#journals' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <Navbar 
        navLinks={navLinks} 
        logoSize="medium"
      />
      <main>

        <HeroSection />

        <Box sx={{ display: 'flex', minHeight: '100vh' }}>

          <NewsSidebar/>

          <Box sx={{ flex: 1 }}>
            
            <VisionMissionSection />

            <ResourcePersonsSection />

            <ServicesSection/>

            <NewsBlogSection />

            <EventsSection  />

            <PublicationsSection/>

            <JournalSection/>

          </Box>

          <EventsSidebar/>

        </Box>
      </main>
      <Footer />
    </>
  )
} 