'use client'

import React from 'react'
import {
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Typography
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import AuthorsSection from '@/sections/authorsSection'

interface Author {
    name: string
    role?: string
    image?: string
}

interface NewsBlogViewProps {
    selectedArticle: {
        title: string
        description: string
        category?: string
        date?: string
        time?: string
        authors?: Author[] | Author
    }
    handleBackToList: () => void
}

const NewsBlogView: React.FC<NewsBlogViewProps> = ({
                                                       selectedArticle,
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
                            '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
                        }}
                    >
                        Back
                    </Button>
                </Box>

                {/* Article Header */}
                <Box sx={{ mb: 4 }}>
                    <Box sx={{ mb: 3 }}>
                        {selectedArticle?.category && (
                            <Chip
                                label={selectedArticle.category}
                                sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    mb: 2
                                }}
                            />
                        )}
                        <Typography
                            variant="h3"
                            sx={{ fontWeight: 'bold', color: '#333', mb: 2, lineHeight: 1.2 }}
                        >
                            {selectedArticle?.title}
                        </Typography>

                        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                            {`By ${
                                Array.isArray(selectedArticle?.authors)
                                    ? selectedArticle.authors.map((a) => a.name).join(', ')
                                    : selectedArticle?.authors?.name || ''
                            }`}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {selectedArticle?.date} • {selectedArticle?.time}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 4 }} />
                </Box>

                {/* Article Content */}
                <Box sx={{ mb: 4 }}>
                    <Box
                        sx={{
                            lineHeight: 1.85,
                            color: '#333',
                            '& h1, & h2, & h3, & h4, & h5, & h6': {
                                fontWeight: 700,
                                lineHeight: 1.25,
                                mt: 3,
                                mb: 1.5,
                                color: '#222'
                            },
                            '& h1': { fontSize: '2rem' },
                            '& h2': { fontSize: '1.6rem' },
                            '& h3': { fontSize: '1.3rem' },
                            '& p': {
                                textAlign: 'justify',
                                marginTop: '0.5em',
                                marginBottom: '0.5em'
                            },
                            '& a': { color: 'primary.main', textDecoration: 'underline' },
                            '& ul, & ol': { pl: 3, mb: 2 },
                            '& li': { mb: 0.75 },
                            '& blockquote': {
                                borderLeft: '4px solid rgba(0,0,0,0.1)',
                                pl: 2,
                                ml: 0,
                                color: 'text.secondary',
                                fontStyle: 'italic',
                                my: 2
                            },
                            '& img': {
                                width: '100%',
                                height: 'auto',
                                borderRadius: 2,
                                display: 'block',
                                margin: '16px 0',
                                objectFit: 'cover'
                            },
                            '& table': {
                                width: '100%',
                                borderCollapse: 'collapse',
                                my: 2
                            },
                            '& th, & td': {
                                border: '1px solid rgba(0,0,0,0.12)',
                                p: 1,
                                textAlign: 'left'
                            },
                            '& pre, & code': {
                                fontFamily:
                                    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
                            },
                            '& pre': {
                                backgroundColor: '#f5f5f5',
                                p: 2,
                                borderRadius: 8,
                                overflowX: 'auto',
                                my: 2
                            }
                        }}
                        dangerouslySetInnerHTML={{
                            __html: selectedArticle?.description || ''
                        }}
                    />
                </Box>

                {/* Authors Section */}
                <AuthorsSection
                    authors={
                        Array.isArray(selectedArticle?.authors)
                            ? selectedArticle.authors
                            : selectedArticle?.authors
                                ? [selectedArticle.authors]
                                : []
                    }
                />

                {/* Footer */}
                <Divider sx={{ my: 4 }} />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 4,
                        flexWrap: 'wrap',
                        gap: 2
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        Published on {selectedArticle?.date} at {selectedArticle?.time}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<FacebookIcon />}
                            onClick={() => {
                                const url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
                                window.open(url, '_blank', 'noopener,noreferrer')
                            }}
                        >
                            Share on Facebook
                        </Button>

                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<TwitterIcon />}
                            onClick={() => {
                                const url = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
                                    selectedArticle?.title || ''
                                )}`
                                window.open(url, '_blank', 'noopener,noreferrer')
                            }}
                        >
                            Share on Twitter
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
                            Share on LinkedIn
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default NewsBlogView
