'use client'

import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Container,
  Menu,
  MenuItem,
} from '@mui/material'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import VRLLogo from '@/app/assets/images/VRL.jpg'
import Footer from '@/components/Footer'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()
  //const theme = useTheme()
  //const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null)

  const menuItems = [
    { text: 'Dashboard', href: '/admin/dashboard' },
    { text: "Writer's Hub", href: '/admin/news-blogs' },
    { text: 'Events & Programs', href: '/admin/events' },
    { text: 'Publications', href: '/admin/publications' },
    { text: 'VRL Journal', href: '/admin/journal' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/')
  }

  const handleNavClick = (href: string) => {
    router.push(href)
    setMobileMenuAnchor(null) // Close mobile menu
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null)
  }

  const isActivePage = (href: string) => {
    return pathname === href
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1, 
          backgroundColor: 'white',
          color: '#333',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 0 }, minHeight: 64 }}>
            {/* Logo */}
            <Box
              onClick={() => handleNavClick('/admin/dashboard')}
              sx={{
                position: 'relative',
                width: { xs: 80, sm: 100, md: 120 }, 
                height: { xs: 40, sm: 50, md: 60 },  
                display: 'flex',
                alignItems: 'center',
                flex: '0 0 auto',
                mr: 2,
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                },
                transition: 'opacity 0.2s',
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

            {/* Navigation Links */}
            <Box sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              gap: 2, 
              alignItems: 'center', 
              flex: 1, 
              justifyContent: 'center' 
            }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  onClick={() => handleNavClick(item.href)}
                  sx={{
                    textTransform: 'none',
                    fontWeight: isActivePage(item.href) ? 600 : 500,
                    color: isActivePage(item.href) ? '#E91E63' : '#333',
                    borderRadius: 2,
                    backgroundColor: isActivePage(item.href) ? 'rgba(233, 30, 99, 0.1)' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActivePage(item.href) 
                        ? 'rgba(233, 30, 99, 0.18)' 
                        : 'rgba(0, 0, 0, 0.06)',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>

            {/* Mobile Menu Button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                onClick={handleMobileMenuOpen}
                sx={{
                  color: '#333',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.06)',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Logout Icon */}
            <IconButton
              onClick={handleLogout}
              sx={{
                color: '#E91E63',
                '&:hover': {
                  backgroundColor: 'rgba(233, 30, 99, 0.1)',
                },
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, pt: '64px', backgroundColor: '#f8f9fa' }}>
        {children}
      </Box>

      {/* Footer */}
      <Footer />

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        sx={{
          '& .MuiPaper-root': {
            minWidth: 200,
            mt: 1,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            borderRadius: 2,
          },
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.text}
            onClick={() => handleNavClick(item.href)}
            sx={{
              fontWeight: isActivePage(item.href) ? 600 : 400,
              color: isActivePage(item.href) ? '#E91E63' : '#333',
              backgroundColor: isActivePage(item.href) ? 'rgba(233, 30, 99, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: isActivePage(item.href) 
                  ? 'rgba(233, 30, 99, 0.18)' 
                  : 'rgba(0, 0, 0, 0.06)',
              },
              py: 1.5,
              px: 2,
            }}
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default AdminLayout 