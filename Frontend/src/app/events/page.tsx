'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Pagination,
  Breadcrumbs,
  Link,
  Divider,
  Avatar,
} from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import SearchIcon from '@mui/icons-material/Search'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InfoCard from '@/components/InfoCard'
import CategoryDropdown from '@/components/CategoryDropdown'
import AuthorsSection from '@/sections/authorsSection'
import { useHydration } from '@/hooks/useHydration'
import { getAllEvents } from '@/api/events'
import EventsSidebar from '@/sections/events-sidebar'
import NewsSidebar from '@/sections/news-sidebar'

const categories = [
  'All',
  'Workshops',
  'Seminars',
  'Courses',
  'Technology',
  'Research',
  'Achievements',
  'Partnerships',
  'Careers',
  'Marketing',
]

export default function EventsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [allEvents, setAllEvents] = useState<any[]>([])
  const [, setLoading] = useState(false)
  const [showEvent, setShowEvent] = useState(false)
  const mounted = useHydration()
  const itemsPerPage = 9

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        const res = await getAllEvents()
        const raw = Array.isArray(res) ? res : []
        const mapped = raw.map((item: any) => {
          const description: string = item.description || ''
          const textOnly = description
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
          const excerpt =
            textOnly.slice(0, 160) + (textOnly.length > 160 ? '…' : '')
          return {
            id: item._id,
            title: item.title,
            excerpt,
            date: item.date || '',
            time: item.time || '',
            location: item.location || '',
            medium: item.medium || '',
            category: item.category || '',
            description,
            image: Array.isArray(item.images)
              ? item.images[0] || ''
              : item.image || '',
            authors: item.authors || [],
            registrationLink: item.registrationLink || '',
          }
        })
        setAllEvents(mapped)
      } catch (e) {
        console.error('Failed to fetch events', e)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  // Handle URL param for event detail
  useEffect(() => {
    if (!mounted) return
    const eventId = searchParams.get('event')
    if (eventId) {
      const event = allEvents.find(
        (item) =>
          item.title.toLowerCase().replace(/[^a-z0-9]/g, '-') === eventId
      )
      if (event) {
        setSelectedEvent(event)
        setShowEvent(true)
      }
    }
  }, [searchParams, mounted, allEvents])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Events', href: '/events' },
    { label: 'Services', href: '/#services' },
    { label: "Writer's Hub", href: '/news-blogs' },
    { label: 'Publications', href: '/#publications' },
    { label: 'VRL Journal', href: '/#journals' },
    { label: 'Contact', href: '/#contact' },
  ]

  // Filter events
  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === 'All' || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEvents = filteredEvents.slice(startIndex, endIndex)

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setSelectedCategory('All')
    setSearchTerm('')
    setCurrentPage(1)
  }

  const handleEventClick = (event: any) => {
    setSelectedEvent(event)
    setShowEvent(true)
    const slug = event.title.toLowerCase().replace(/[^a-z0-9]/g, '-')
    router.push(`/events?event=${slug}`)
  }

  const handleBackToList = () => {
    setShowEvent(false)
    setSelectedEvent(null)
    router.push('/events')
  }

  if (!mounted) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background:
            'linear-gradient(-45deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite',
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
        >
          Loading Events...
        </Typography>
        <style jsx>{`
          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>
      </Box>
    )
  }

  console.log(selectedEvent)

  return (
    <>
      <Navbar navLinks={navLinks} logoSize="medium" />
      <main>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <NewsSidebar />

          <Box sx={{ flex: 1 }}>
            {!showEvent ? (
              <>
                {/* Page Header */}
                <Box sx={{ py: 6, px: 4, bgcolor: '#f8f9fa' }}>
                  <Container maxWidth="lg">
                    <Breadcrumbs sx={{ mb: 3 }}>
                      <Link
                        color="inherit"
                        href="/"
                        sx={{
                          cursor: 'pointer',
                          '&:hover': { textDecoration: 'underline' },
                        }}
                      >
                        Home
                      </Link>
                      <Typography color="text.primary">Events</Typography>
                    </Breadcrumbs>

                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                      <Typography
                        variant="h3"
                        gutterBottom
                        sx={{ fontWeight: 'bold', color: '#333' }}
                      >
                        Events & Programs
                      </Typography>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ maxWidth: 700, mx: 'auto', mb: 2 }}
                      >
                        Explore upcoming workshops, seminars, and programs
                        organized by VRL Institute
                      </Typography>
                    </Box>

                    {/* Search & Filter */}
                    <Box sx={{ mb: 4 }}>
                      <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={8}>
                          <TextField
                            fullWidth
                            placeholder="Search events..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                backgroundColor: 'white',
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <CategoryDropdown
                            categories={categories}
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            label="Category"
                            fullWidth
                            size="medium"
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                backgroundColor: 'white',
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Results Count */}
                    <Box sx={{ mb: 3 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 2,
                          p: 2,
                          backgroundColor: 'rgba(233, 30, 99, 0.05)',
                          borderRadius: 2,
                          border: '1px solid rgba(233, 30, 99, 0.1)',
                        }}
                      >
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: 'bold', color: 'primary.main' }}
                          >
                            📊 Results: {filteredEvents.length} of{' '}
                            {allEvents.length} events
                          </Typography>
                          {selectedCategory !== 'All' && (
                            <Chip
                              label={`Category: ${selectedCategory}`}
                              size="small"
                              sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                fontWeight: 'bold',
                              }}
                            />
                          )}
                          {searchTerm && (
                            <Chip
                              label={`Search: "${searchTerm}"`}
                              size="small"
                              sx={{
                                backgroundColor: 'secondary.main',
                                color: 'white',
                                fontWeight: 'bold',
                              }}
                            />
                          )}
                        </Box>
                        {(selectedCategory !== 'All' || searchTerm) && (
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={handleClearFilters}
                            sx={{
                              borderColor: 'primary.main',
                              color: 'primary.main',
                              '&:hover': {
                                backgroundColor: 'primary.main',
                                color: 'white',
                              },
                            }}
                          >
                            Clear Filters
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Container>
                </Box>

                {/* Events Grid */}
                <Box sx={{ py: 4, px: 4 }}>
                  <Container maxWidth="lg">
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                      {currentEvents.map((event, index) => (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          key={index}
                          sx={{ display: 'flex' }}
                        >
                          <Box
                            sx={{ width: '100%', cursor: 'pointer' }}
                            onClick={() => handleEventClick(event)}
                          >
                            <InfoCard {...event} isEvent={true} />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>

                    {filteredEvents.length === 0 && (
                      <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography
                          variant="h5"
                          color="text.secondary"
                          gutterBottom
                        >
                          No events found
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          Try adjusting your search terms or category filter
                        </Typography>
                      </Box>
                    )}

                    {totalPages > 1 && (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mt: 4,
                        }}
                      >
                        <Pagination
                          count={totalPages}
                          page={currentPage}
                          onChange={(e, page) => setCurrentPage(page)}
                          color="primary"
                          size="large"
                          showFirstButton
                          showLastButton
                        />
                      </Box>
                    )}
                  </Container>
                </Box>
              </>
            ) : (
              /* Full Event View */
              <Box sx={{ py: 4, px: 4 }}>
                <Container maxWidth="lg">
                  {/* Back Button */}
                  <Box sx={{ mb: 4 }}>
                    <Button
                      startIcon={<ArrowBackIcon />}
                      onClick={handleBackToList}
                      sx={{
                        color: 'text.secondary',
                        '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
                      }}
                    >
                      Back to Events
                    </Button>
                  </Box>

                  {/* Breadcrumbs */}
                  <Breadcrumbs sx={{ mb: 3 }}>
                    <Link
                      color="inherit"
                      href="/"
                      sx={{
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Home
                    </Link>
                    <Link
                      color="inherit"
                      onClick={handleBackToList}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Events
                    </Link>
                    <Typography color="text.primary">
                      {selectedEvent?.category}
                    </Typography>
                  </Breadcrumbs>

                  {/* Event Header */}
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 'bold',
                        color: '#333',
                        mb: 2,
                        lineHeight: 1.2,
                      }}
                    >
                      {selectedEvent?.title}
                    </Typography>

                    <Divider sx={{ my: 4 }} />

                    {/* Metadata */}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        mb: 3,
                      }}
                    >
                      {selectedEvent?.date && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Typography color="text.primary" fontWeight="bold">
                            Date:
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            📅 {selectedEvent.date}
                          </Typography>
                        </Box>
                      )}

                      {selectedEvent?.time && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Typography color="text.primary" fontWeight="bold">
                            Time:
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            ⏰ {selectedEvent.time}
                          </Typography>
                        </Box>
                      )}

                      {selectedEvent?.location && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Typography color="text.primary" fontWeight="bold">
                            Mode/Venue:
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            📍 {selectedEvent.location}
                          </Typography>
                        </Box>
                      )}

                      {selectedEvent?.medium && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Typography color="text.primary" fontWeight="bold">
                            Medium of Delivery:
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            🎤 {selectedEvent.medium}
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    {/*/!* Share Buttons *!/*/}
                    {/*<Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>*/}
                    {/*  <IconButton sx={{ color: 'text.secondary' }}><ShareIcon /></IconButton>*/}
                    {/*  <IconButton sx={{ color: 'text.secondary' }}><BookmarkIcon /></IconButton>*/}
                    {/*</Box>*/}
                  </Box>

                  {/* Event Description */}
                  <Box
                    sx={{ mb: 4 }}
                    dangerouslySetInnerHTML={{
                      __html: selectedEvent?.description || '',
                    }}
                  />

                  {/* Authors Section (Organizers) */}
                  <AuthorsSection
                    authors={selectedEvent?.authors || []}
                    isEvent={true}
                  />

                  {/* Resource Persons / Speakers */}
                  {selectedEvent?.speakers?.length > 0 && (
                    <Box sx={{ mb: 4 }}>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 'bold', mb: 2 }}
                      >
                        Resource Persons
                      </Typography>
                      <Grid container spacing={3}>
                        {selectedEvent.speakers.map(
                          (speaker: any, idx: number) => (
                            <Grid item xs={12} sm={6} md={4} key={idx}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  textAlign: 'center',
                                  p: 2,
                                  border: '1px solid #eee',
                                  borderRadius: 2,
                                }}
                              >
                                <Avatar
                                  src={speaker.photo}
                                  alt={speaker.name}
                                  sx={{ width: 80, height: 80, mb: 2 }}
                                />
                                <Typography
                                  variant="subtitle1"
                                  sx={{ fontWeight: 'bold', mb: 1 }}
                                >
                                  {speaker.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {speaker.description}
                                </Typography>
                              </Box>
                            </Grid>
                          )
                        )}
                      </Grid>
                    </Box>
                  )}

                  {/* Register Button */}
                  <Box
                    sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      href={selectedEvent.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ borderRadius: 2, textTransform: 'none' }}
                    >
                      Register Now
                    </Button>
                  </Box>

                  <Divider sx={{ my: 1 }} />

                  {/* Share Section */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      mb: 4,
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<FacebookIcon />}
                      >
                        Facebook
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<TwitterIcon />}
                      >
                        Twitter
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<LinkedInIcon />}
                      >
                        LinkedIn
                      </Button>
                    </Box>
                  </Box>
                </Container>
              </Box>
            )}
          </Box>

          <EventsSidebar />
        </Box>
      </main>
      <Footer />
    </>
  )
}
