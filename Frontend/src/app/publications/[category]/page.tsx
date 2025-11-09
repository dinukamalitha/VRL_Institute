'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Button,
    Chip,
    TextField,
    InputAdornment,
    IconButton,
    Tooltip,
    CircularProgress
} from '@mui/material';
import {getPublicationsByCategory, streamPublicationPdf} from '@/api/publications';
import { Publication } from '@/types/publications';
import Link from 'next/link';
import { NavLink } from "@/types/navbar";
import Navbar from "@/components/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function PublicationCategoryPage() {
    const { category } = useParams<{ category: string }>();
    const [publications, setPublications] = useState<Publication[]>([]);
    const [previewingId, setPreviewingId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await getPublicationsByCategory(category);
                setPublications(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                console.error('Error fetching category publications:', err);
            } finally {
                setLoading(false);
            }
        };

        if (category) {
            setLoading(true);
            fetchPublications();
        }
    }, [category]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handlePreview = async (pub: Publication) => {
        if (!pub._id || !pub.documentUrl) return;
        setPreviewingId(pub._id);

        try {
            const match = pub.documentUrl.match(/\/v\d+\/(.*)/);
            const fullPath = match ? match[1] : null;

            if (!fullPath) {
                console.error("Could not extract the full public ID path from the URL:", pub.documentUrl);
                alert("Sorry, the document preview URL seems to be invalid.");
                setPreviewingId(null); // Reset state on failure
                return;
            }

            const url = await streamPublicationPdf(fullPath);

            if (url) {
                window.open(url, "_blank", "noopener,noreferrer");
            } else {
                alert("Sorry, the document preview is currently unavailable.");
            }
        } catch (error) {
            console.error("Preview failed:", error);
            alert("An error occurred while trying to load the document preview.");
        } finally {
            setPreviewingId(null);
        }
    };

    const filteredPublications = publications.filter(pub =>
        pub.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const navLinks: NavLink[] = [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/#services' },
        { label: "Writers' Hub", href: '/news-blogs' },
        { label: 'Events & Programs', href: '/#events' },
        { label: 'Publications', href: '/#publications' },
        { label: 'VRL Journal', href: '/#journals' },
        { label: 'Contact', href: '/#contact' },
    ];

    return (
        <>
            <Navbar
                navLinks={navLinks}
                logoSize="medium"
            />

            <main>
                <Box sx={{ bgColor: 'grey.50', py: 8 }}>
                    <Container maxWidth="lg">
                        {/* Page Header */}
                        <Box sx={{ mb: 6, textAlign: 'center' }}>
                            <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                                Published {category}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Browse and download research from this category.
                            </Typography>
                        </Box>

                        {/* Search Bar */}
                        <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
                            <TextField
                                fullWidth
                                placeholder="Search publications in this category..."
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
                                    maxWidth: '600px',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        backgroundColor: 'white',
                                        boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
                                    }
                                }}
                            />
                        </Box>

                        {/* Results Count */}
                        {searchTerm && (
                            <Box sx={{ mb: 3 }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 2,
                                    p: 2,
                                    backgroundColor: 'rgba(233, 30, 99, 0.05)',
                                    borderRadius: 2,
                                    border: '1px solid rgba(233, 30, 99, 0.1)'
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                            📊 Results: {filteredPublications.length} of {publications.length} publications
                                        </Typography>
                                        <Chip
                                            label={`Search: "${searchTerm}"`}
                                            size="small"
                                            sx={{
                                                backgroundColor: 'secondary.main',
                                                color: 'white',
                                                fontWeight: 'bold'
                                            }}
                                        />
                                    </Box>

                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => setSearchTerm('')}
                                        sx={{
                                            borderColor: 'primary.main',
                                            color: 'primary.main',
                                            '&:hover': {
                                                backgroundColor: 'primary.main',
                                                color: 'white',
                                            }
                                        }}
                                    >
                                        Clear Filter
                                    </Button>
                                </Box>
                            </Box>
                        )}

                        {/* Publications Grid */}
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <Grid container spacing={4}>
                                    {filteredPublications.map((pub) => (
                                        <Grid item xs={12} sm={4} md={3} key={pub._id}>
                                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 3, transition: '0.3s', '&:hover': { transform: 'scale(1.03)', boxShadow: 6 } }}>
                                                <CardMedia
                                                    component="img"
                                                    height="150"
                                                    image={pub.thumbnail || 'no thumbnail available'}
                                                    alt={pub.title}
                                                />
                                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                                                            {pub.title}
                                                        </Typography>

                                                        {pub.authors && pub.authors.length > 0 && (
                                                            <Box sx={{ mb: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                {pub.authors.map((author, index) => (
                                                                    <Chip
                                                                        key={index}
                                                                        label={`By ${author.name}`}
                                                                        size="small"
                                                                    />
                                                                ))}
                                                            </Box>
                                                        )}
                                                    </Box>

                                                    <Box sx={{ mt: 2 }}>
                                                        {pub.createdAt && (
                                                            <Typography variant="caption" color="text.secondary" display="block">
                                                                Published on {new Date(pub.createdAt).toLocaleDateString()}
                                                            </Typography>
                                                        )}

                                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1 }}>
                                                            <Tooltip title="Preview">
                                                                <IconButton
                                                                    color="primary"
                                                                    onClick={() => handlePreview(pub)}
                                                                    disabled={previewingId === pub._id}
                                                                >
                                                                    {previewingId === pub._id ? (
                                                                        <CircularProgress size={24} />
                                                                    ) : (
                                                                        <VisibilityIcon />
                                                                    )}
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Download">
                                                                <IconButton
                                                                    color="secondary"
                                                                    href={pub.documentUrl}
                                                                    download
                                                                >
                                                                    <DownloadIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Box>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>

                                {filteredPublications.length === 0 && (
                                    <Box sx={{ textAlign: 'center', py: 8 }}>
                                        <Typography variant="h6" color="text.secondary">
                                            No publications found matching your search.
                                        </Typography>
                                    </Box>
                                )}
                            </>
                        )}

                        {/* Back Button */}
                        <Box textAlign="center" mt={8}>
                            <Link href="/#publications" passHref>
                                <Button variant="outlined" startIcon={<ArrowBackIcon />}>
                                    Back
                                </Button>
                            </Link>
                        </Box>
                    </Container>
                </Box>
            </main>
        </>
    );
}