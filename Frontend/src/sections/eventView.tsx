'use client'

import React from 'react'
import {
    Box,
    Button,
    Container,
    Typography,
    Divider,
    Avatar,
    Grid,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import AuthorsSection from '@/sections/authorsSection'
import {Author} from "@/types/author";

interface EventViewProps {
    selectedEvent: {
        title: string
        description: string
        category?: string
        date?: string
        time?: string
        location?: string
        medium?: string
        authors?: Author[]
        speakers?: Author[]
        registrationLink?: string
    }
    handleBackToList: () => void
}

const EventView: React.FC<EventViewProps> = ({
                                                 selectedEvent,
                                                 handleBackToList
                                             }) => {
    const currentUrl =
        typeof window !== 'undefined'
            ? window.location.href
            : `${process.env.NEXT_PUBLIC_BASE_URL}/news-blogs`

    const shareUrl = encodeURIComponent(currentUrl)
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`
    // const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
    // const twitterUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(selectedArticle?.title || '')}`

    return (
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
                        Back
                    </Button>
                </Box>

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
                </Box>

                {/* Description */}
                <Box
                    sx={{ mb: 4 }}
                    dangerouslySetInnerHTML={{
                        __html: selectedEvent?.description || '',
                    }}
                />

                {/* Authors Section */}
                <AuthorsSection authors={selectedEvent?.authors || []} isEvent={true} />

                {/* Speakers */}
                {selectedEvent?.speakers?.length > 0 && (
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Organized By:
                        </Typography>
                        <Grid container spacing={3}>
                            {selectedEvent?.speakers?.map((speaker, idx) => (
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
                                            src={speaker.photoUrl}
                                            alt={speaker.name}
                                            sx={{ width: 80, height: 80, mb: 2 }}
                                        />
                                        <Typography
                                            variant="subtitle1"
                                            sx={{ fontWeight: 'bold', mb: 1 }}
                                        >
                                            {speaker.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {speaker.description}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* Register Button */}
                {selectedEvent.registrationLink && (
                    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
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
                )}

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
                            onClick={() => {
                                const url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
                                window.open(url, '_blank', 'noopener,noreferrer')
                            }}
                        >
                            Facebook
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<TwitterIcon />}
                            onClick={() => {
                                const url = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
                                    selectedEvent.title || ''
                                )}`
                                window.open(url, '_blank', 'noopener,noreferrer')
                            }}
                        >
                            Twitter
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<LinkedInIcon />}
                            onClick={() => {
                                const url = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`
                                window.open(url, '_blank', 'noopener,noreferrer')
                            }}
                        >
                            LinkedIn
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default EventView
