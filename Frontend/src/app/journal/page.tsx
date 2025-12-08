'use client';

import { Box, Container, Typography, Button, Card, CardContent, Grid, Paper, Chip } from '@mui/material'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import JournalSidebar from '@/sections/Journal/journal-sidebar'
import Image from 'next/image'
import Footer from '@/components/Footer'
import { useNavLinks } from '@/hooks/useNavLinks'
import { getJournalContent } from '@/api/journal-content'
import { getCurrentJournalVolume } from '@/api/journal-volumes'
import BookIcon from '@mui/icons-material/Book'
import { useToast } from '@/hooks/useToast'
import DescriptionIcon from '@mui/icons-material/Description'
import PolicyIcon from '@mui/icons-material/Policy'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import PeopleIcon from '@mui/icons-material/People'
import EmailIcon from '@mui/icons-material/Email'
import ArticleIcon from '@mui/icons-material/Article'
import DownloadIcon from '@mui/icons-material/Download'

export default function JournalPage() {
  const navLinks = useNavLinks()
  const { showToast, ToastComponent } = useToast()
  const [journalContent, setJournalContent] = useState<any>(null)
  const [currentVolume, setCurrentVolume] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        const [content, volume] = await Promise.all([
          getJournalContent(),
          getCurrentJournalVolume()
        ])
        if (content) {
          setJournalContent(content)
        }
        if (volume) {
          setCurrentVolume(volume)
        }
      } catch {
        showToast('Failed to load journal content. Please try again later.', 'error')
      } finally {
        setLoading(false)
      }
    }
    fetchContent()
  }, [showToast])

    console.log(currentVolume)
  // Use API content if available, otherwise use defaults
  const welcomeText = journalContent?.welcomeText
  const aimOfJournal = journalContent?.aimOfJournal
  const peerReviewProcess = journalContent?.peerReviewProcess
  const publicationPolicy = journalContent?.publicationPolicy
  const openAccessPolicy = journalContent?.openAccessPolicy
  const publisher = journalContent?.publisher
  const chiefEditors = journalContent?.chiefEditors
  const submissionEmail = journalContent?.submissionEmail
  const submissionText = journalContent?.submissionText
  const typographicGuidance = journalContent?.typographicGuidance
  const maxWordCount = journalContent?.maxWordCount
  const referencingProfessionalism = journalContent?.referencingProfessionalism

  // Handle preview of current volume PDF
    const handlePreviewVolume = () => {
        if (currentVolume?.documentUrl) {
            // Extract fullPath from Cloudinary URL
            const match = currentVolume.documentUrl.match(/\/v\d+\/(.*)/)
            const fullPath = match ? match[1] : currentVolume.documentUrl

            if (!fullPath) {
                showToast("Invalid document URL", "error")
                return
            }

            // Open backend proxy URL in new window using journal volumes endpoint
            window.open(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/journal-volumes/stream/pdf?fullPath=${encodeURIComponent(fullPath)}`,
                "_blank"
            )
        } else {
            showToast("No document available for this volume", "info")
        }
    }


    return (
    <>
      <Navbar navLinks={navLinks} logoSize="medium" />
      
      <main>
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>

          {/* Main Journal Content */}
          <Box sx={{ flex: 1, py: 6, px: { xs: 2, md: 4 } }}>
            <Container maxWidth="md">
              {/* Header Section */}
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography
                  variant="h2"
                  gutterBottom
                  sx={{ 
                    fontWeight: 700, 
                    color: '#1a1a1a',
                    mb: 2,
                    fontSize: { xs: '2rem', md: '2.75rem' }
                  }}
                >
                  VRL Journal
                </Typography>
                <Typography 
                  variant="h6" 
                  color="text.secondary" 
                  sx={{ 
                    maxWidth: 700, 
                    mx: 'auto',
                    mb: 4,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    lineHeight: 1.6
                  }}
                  dangerouslySetInnerHTML={{ __html: welcomeText }}
                />
              </Box>

              {/* Journal Cover Image */}
              <Paper
                elevation={3}
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: 400, md: 500 },
                  mb: 5,
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                }}
              >
                {!loading && (
                  <Image
                    src={journalContent?.imageUrl}
                    alt="VRL Journal Cover"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                )}
              </Paper>

              {/* Current Issue Card */}
              <Card
                elevation={2}
                sx={{
                  mb: 5,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <BookIcon sx={{ fontSize: 28, mr: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Current Issue
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ mb: 3, opacity: 0.95 }}>
                      {currentVolume
                          ? currentVolume.title
                          : "No current issue available"}
                  </Typography>
                  <Button
                    disabled={!currentVolume?.documentUrl}
                    variant="contained"
                    fullWidth
                    startIcon={<DownloadIcon />}
                    onClick={handlePreviewVolume}
                    sx={{
                      backgroundColor: 'white',
                      color: '#1976d2',
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    Download Current Issue (PDF)
                  </Button>
                </CardContent>
              </Card>

              {/* Content Sections Grid */}
              <Grid container spacing={3}>
                {/* Aim of the Journal */}
                <Grid item xs={12} md={6}>
                  <Card
                    elevation={1}
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: 4,
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <DescriptionIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1.5 }} />
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                          Aim of the Journal
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        sx={{ lineHeight: 1.8 }}
                        dangerouslySetInnerHTML={{ __html: aimOfJournal }}
                      />
                    </CardContent>
                  </Card>
                </Grid>

                {/* Peer Review Process */}
                <Grid item xs={12} md={6}>
                  <Card
                    elevation={1}
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: 4,
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <ArticleIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1.5 }} />
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                          Peer Review Process
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        sx={{ lineHeight: 1.8 }}
                        dangerouslySetInnerHTML={{ __html: peerReviewProcess }}
                      />
                    </CardContent>
                  </Card>
                </Grid>

                {/* Publication Policy */}
                <Grid item xs={12}>
                  <Card
                    elevation={1}
                    sx={{
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: 4,
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <PolicyIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1.5 }} />
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                          Publication Policy
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        sx={{ lineHeight: 1.8, mb: 2 }}
                        dangerouslySetInnerHTML={{ __html: publicationPolicy }}
                      />
                      <Chip
                        label="Nominal publication fee applies"
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    </CardContent>
                  </Card>
                </Grid>

                {/* Open Access Policy */}
                <Grid item xs={12} md={6}>
                  <Card
                    elevation={1}
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: 4,
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LockOpenIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1.5 }} />
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                          Open Access Policy
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        sx={{ lineHeight: 1.8 }}
                        dangerouslySetInnerHTML={{ __html: openAccessPolicy }}
                      />
                    </CardContent>
                  </Card>
                </Grid>

                {/* Publisher & Editors */}
                <Grid item xs={12} md={6}>
                  <Card
                    elevation={1}
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: 4,
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <PeopleIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1.5 }} />
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                          Publisher & Editors
                        </Typography>
                      </Box>

                      {/* Publisher */}
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                          Publisher:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {publisher}
                        </Typography>
                      </Box>

                      {/* Chief Editors */}
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                          Chief Editors:
                        </Typography>

                        <Box sx={{ pl: 1 }}>
                          {(chiefEditors || []).map((editor: string, index: number) => (
                            <Typography key={index} variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              • {editor}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>


                {/* Submission Section */}
                <Grid item xs={12}>
                  <Card
                    elevation={2}
                    sx={{
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #e91e63 0%, #c2185b 100%)',
                      color: 'white',
                      boxShadow: '0 8px 24px rgba(233, 30, 99, 0.3)',
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <EmailIcon sx={{ fontSize: 32, mr: 2 }} />
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                          Submit Your Paper
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body1" 
                        sx={{ mb: 3, opacity: 0.95 }}
                        dangerouslySetInnerHTML={{ __html: submissionText }}
                      />
                      <Box
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          borderRadius: 2,
                          p: 2,
                          display: 'inline-block',
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          Email your manuscript to:{' '}
                          <Box component="span" sx={{ textDecoration: 'underline' }}>
                            {submissionEmail}
                          </Box>
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Instructions for Authors */}
                <Grid item xs={12}>
                  <Card
                    elevation={1}
                    sx={{
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: 4,
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#1a1a1a' }}>
                        Instructions for Authors
                      </Typography>
                      
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, color: '#333' }}>
                          Typographic Guidance
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ lineHeight: 1.8 }}
                          dangerouslySetInnerHTML={{ __html: typographicGuidance }}
                        />
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, color: '#333' }}>
                          Maximum Word Count
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ lineHeight: 1.8 }}
                          dangerouslySetInnerHTML={{ __html: maxWordCount }}
                        />
                      </Box>

                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, color: '#333' }}>
                          Referencing & Professionalism
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ lineHeight: 1.8 }}
                          dangerouslySetInnerHTML={{ __html: referencingProfessionalism }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Right Sidebar (Journal) */}
          <JournalSidebar/>
        </Box>
      </main>

      <Footer />

      <ToastComponent />
    </>
  )
}
