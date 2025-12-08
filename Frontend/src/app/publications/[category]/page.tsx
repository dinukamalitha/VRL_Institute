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
    Button,
    Chip,
    TextField,
    InputAdornment,
    // IconButton,
    // Tooltip,
    CircularProgress
} from '@mui/material';
import {getPublicationsByCategory} from '@/api/publications';
import { Publication } from '@/types/publications';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import { useNavLinks } from '@/hooks/useNavLinks';
import SearchIcon from "@mui/icons-material/Search";
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useToast } from '@/hooks/useToast';

export default function PublicationCategoryPage() {
    const { category } = useParams<{ category: string }>();
    const { showToast, ToastComponent } = useToast();
    const [publications, setPublications] = useState<Publication[]>([]);
    //const [previewingId, setPreviewingId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                setLoading(true);
                const response = await getPublicationsByCategory(category);
                setPublications(Array.isArray(response.data) ? response.data : []);
                if (Array.isArray(response.data) && response.data.length === 0) {
                    showToast('No publications found in this category', 'info');
                }
            } catch (err) {
                console.error('Error fetching category publications:', err);
                showToast('Failed to load publications. Please try again later.', 'error');
            } finally {
                setLoading(false);
            }
        };

        if (category) {
            fetchPublications();
        }
    }, [category, showToast]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handlePreview = (pub: Publication) => {
        if (!pub.documentUrl) {
            showToast('Document URL not available for this publication', 'warning');
            return;
        }

        const match = pub.documentUrl.match(/\/v\d+\/(.*)/);
        const fullPath = match ? match[1] : pub.documentUrl;

        if (!fullPath) {
            showToast("Invalid document URL", 'error');
            return;
        }

        // setPreviewingId(pub._id || null);

        // Open backend proxy URL
        window.open(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/publications/stream/pdf?fullPath=${encodeURIComponent(fullPath)}`, "_blank");

        // setTimeout(() => {
        //     setPreviewingId(null);
        // }, 500);
    };

    const filteredPublications = publications.filter(pub =>
        pub.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const navLinks = useNavLinks();

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
                                            <Card sx={{
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                borderRadius: 2,
                                                boxShadow: 3,
                                                transition: '0.3s',
                                                '&:hover': { transform: 'scale(1.03)', boxShadow: 6 }
                                            }}>
                                                <Box
                                                    sx={{
                                                        position: 'relative',
                                                        height: 350,
                                                        width: '100%',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    <CardMedia
                                                        component="img"
                                                        sx={{
                                                            height: '100%',
                                                            width: '100%',
                                                            objectFit: 'cover',
                                                        }}
                                                        image={pub.thumbnail || 'no thumbnail available'}
                                                        alt={pub.title}
                                                    />

                                                    <Box
                                                        className="card-overlay"
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            right: 0,
                                                            bottom: 0,
                                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                            color: 'white',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            padding: 2,
                                                            opacity: 0,
                                                            transition: 'opacity 0.3s ease-in-out',
                                                            '&:hover': {
                                                                opacity: 1,
                                                            },
                                                            // Ensure hover works by targeting the parent card
                                                            '.MuiCard-root:hover &': {
                                                                opacity: 1,
                                                            },
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() => handlePreview(pub)}
                                                    >
                                                        {/* Buttons (Download and Preview) */}
                                                        {/*<Box sx={{ display: 'flex', gap: 2 }}>*/}
                                                        {/*    <Tooltip title="Preview">*/}
                                                        {/*        <IconButton*/}
                                                        {/*            sx={{ color: 'white', fontSize: '1rem' }}*/}
                                                        {/*            onClick={() => handlePreview(pub)}*/}
                                                        {/*        >*/}
                                                        {/*            {previewingId === pub._id ? (*/}
                                                        {/*                <CircularProgress size={36} color="inherit" />*/}
                                                        {/*            ) : (*/}
                                                        {/*                <VisibilityIcon/>*/}
                                                        {/*            )}*/}
                                                        {/*        </IconButton>*/}
                                                        {/*    </Tooltip>*/}
                                                        {/*    <Tooltip title="Download">*/}
                                                        {/*        <IconButton*/}
                                                        {/*            sx={{ color: 'white', fontSize: '1rem' }}*/}
                                                        {/*            href={pub.documentUrl}*/}
                                                        {/*            download*/}
                                                        {/*        >*/}
                                                        {/*            <DownloadIcon/>*/}
                                                        {/*        </IconButton>*/}
                                                        {/*    </Tooltip>*/}
                                                        {/*</Box>*/}
                                                    </Box>
                                                </Box>
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
            <ToastComponent />
        </>
    );
}