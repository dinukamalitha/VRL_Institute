'use client'

import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import VRLLogo from '@/app/assets/images/VRL.jpg'
import { useRouter } from 'next/navigation'
import { alpha } from '@mui/material/styles'
import Image from 'next/image'
import { NavLink, NavbarProps } from '@/types/navbar'
import LoginDialog from '@/sections/AdminLogin'

const Navbar: React.FC<NavbarProps> = ({ navLinks, elevation = 1 }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true })
  const router = useRouter()
  const [activeHash, setActiveHash] = useState('')

  // Fix hydration issue
  useEffect(() => {
    setMounted(true)
  }, [])

  // Track active section on scroll
  useEffect(() => {
    if (!mounted) return
    const handleScroll = () => {
      let found = ''
      for (const link of navLinks) {
        if (link.href.startsWith('#')) {
          const id = link.href.replace('#', '')
          const el = document.getElementById(id)
          if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= 80 && rect.bottom > 80) {
              found = link.href
              break
            }
          }
        }
      }
      setActiveHash(found)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navLinks, mounted])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleNavClick = (link: NavLink) => {
    if (link.href.startsWith('#')) {
      const id = link.href.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
      setActiveHash(link.href)
    } else if (link.external) {
      window.open(link.href, '_blank', 'noopener,noreferrer')
    } else {
      router.push(link.href)
    }
    setMobileOpen(false)
  }

  const navItems = (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {navLinks.map((link) => (
        <Button
          key={link.label}
          onClick={() => handleNavClick(link)}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            color: '#333',
            borderRadius: 2,
            backgroundColor:
              activeHash === link.href
                ? alpha(theme.palette.primary.main, 0.12)
                : 'transparent',
            '&:hover': {
              backgroundColor:
                activeHash === link.href
                  ? alpha(theme.palette.primary.main, 0.18)
                  : 'rgba(0, 0, 0, 0.06)',
            },
            transition: 'background 0.2s',
          }}
        >
          {link.label}
        </Button>
      ))}
    </Box>
  )

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ p: 2 }}>
        <Image src={VRLLogo} alt="VRL Logo" width={100} height={100} />
      </Box>
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.label} onClick={() => handleNavClick(link)}>
            <ListItemText
              primary={link.label}
              sx={{
                textAlign: 'center',
                '& .MuiListItemText-primary': {
                  fontWeight: 500,
                  color: '#333',
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const effectiveIsMobile = mounted ? isMobile : false

  return (
    <>
      <AppBar
        position="sticky"
        elevation={elevation}
        sx={{
          backgroundColor: 'white',
          color: '#333',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 0 }, minHeight: 64 }}>
            {/* Logo */}
            <Box
              sx={{
                position: 'relative',
                width: { xs: 80, sm: 100, md: 120 },
                height: { xs: 40, sm: 50, md: 60 },
                display: 'flex',
                alignItems: 'center',
                flex: '0 0 auto',
              }}
            >
              <Image
                src={VRLLogo}
                alt="VRL Logo"
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 600px) 80px, (max-width: 900px) 100px, 120px"
                priority
              />
            </Box>

            {/* Desktop Navigation */}
            {mounted && !effectiveIsMobile && (
              <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                {navItems}
              </Box>
            )}

            {/* Profile Icon */}
            <IconButton
              aria-label="profile"
              sx={{ color: '#333', ml: 2 }}
              onClick={() => setLoginOpen(true)}
            >
              <AccountCircleIcon />
            </IconButton>

            {/* Mobile Menu Button */}
            {mounted && effectiveIsMobile && (
              <IconButton
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ ml: 1, color: '#333' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      {mounted && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 280,
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Login Dialog */}
      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}

export default Navbar
