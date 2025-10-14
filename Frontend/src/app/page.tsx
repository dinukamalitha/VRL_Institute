'use client'

import { Box } from '@mui/material'
import Navbar from '@/components/Navbar'
import { NavLink } from '@/types/navbar'
import HeroSection from '@/sections/HeroSection'
import VisionMissionSection from '@/sections/VisionMissionSection'
import ResourcePersonsSection from '@/sections/ResourcePersonsSection'
import Footer from '@/components/Footer'
import NewsBlogSection from '@/sections/newsBlogs'
import EventsSection from '@/sections/events'
import JournalSection from '@/sections/vrlJournal'
import NewsSidebar from '@/sections/news-sidebar'
import EventsSidebar from '@/sections/events-sidebar'
import ServicesSection from '@/sections/services'
import PublicationsSection from '@/sections/publications'

export default function HomePage() {

  const navLinks: NavLink[] = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: "Writer's Hub", href: '#newsblog' },
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