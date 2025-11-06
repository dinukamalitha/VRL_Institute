'use client'

import {
    Box,
    Container,
    Typography,
    Grid,
    Button,
} from '@mui/material'
import {useCallback, useEffect, useState} from 'react'
import AddIcon from '@mui/icons-material/Add'
import PublicationsCard from '@/components/PublicationsCard'
import PublicationDialog from '@/sections/Admin/AddPublicationModal'
import {createPublication, getAllPublications, getPublicationCountsByCategory} from '@/api/publications'
import {Publication} from "@/types/publications";

export default function PublicationsPage() {
    const [openDialog, setOpenDialog] = useState(false)
    const [publications, setPublications] = useState<Publication[]>([])
    const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})

    // Fetch publications data
    const fetchPageData = useCallback(async () => {
        try {
            const [publicationsResponse, countsResponse] = await Promise.all([
                getAllPublications(),
                getPublicationCountsByCategory()
            ]);

            setPublications(Array.isArray(publicationsResponse) ? publicationsResponse : []);
            setCategoryCounts(countsResponse.data || {});

        } catch (error) {
            console.error('Failed to fetch page data:', error)
        }
    }, []);

    useEffect(() => {
        fetchPageData();
    }, [fetchPageData]);

    // Handler to open the dialog
    const handleAddNew = () => {
        setOpenDialog(true)
    }

    // Handler to close the dialog
    const handleClose = () => {
        setOpenDialog(false)
    }

    // Handler to save a new publication
    const handleSave = async (data: Publication) => {
        try {
            const response = await createPublication(data);

            if (response && response.success) {
                // Refresh all page data
                await fetchPageData();
                handleClose();
            } else {
                alert('Failed to save the publication. Please check the console for errors.');
            }
        } catch (error) {
            console.error("An error occurred while saving the publication:", error);
            alert('An error occurred while saving the publication.');
        }
    }

    // Sample placeholders for categories
    const publicationData = [
        { category: 'Books', image: '/images/books.png', count: categoryCounts.Books || 0 },
        { category: 'Monographs', image: '/images/monograph.jpg', count: categoryCounts.Monographs || 0 },
        { category: 'Dissertations', image: '/images/dissertation.jpg', count: categoryCounts.Dissertations || 0 },
        { category: 'Thesis', image: '/images/thesis.jpg', count: categoryCounts.Thesis || 0 },
    ]

    return (
        <Container maxWidth="xl">
            {/* Header */}
            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h3"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: 'bold', color: '#333' }}
                >
                    Publications
                    <Typography
                        sx={{
                            maxWidth: 700,
                            mx: 'auto',
                            mb: 2,
                            fontSize: '1.25rem',
                            fontWeight: 'semibold',
                        }}
                    >
                        (Books / Monographs / Dissertations / Thesis)
                    </Typography>
                </Typography>
            </Box>

            {/* Add Button */}
            <Box sx={{ float: 'right', mb: 3 }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddNew}
                    sx={{
                        background: 'linear-gradient(45deg, #E91E63 30%, #9C27B0 90%)',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #C2185B 30%, #7B1FA2 90%)',
                            transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    Add Publication
                </Button>
            </Box>

            {/* Publications Grid */}
            <Grid container spacing={3}>
                {publicationData.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <PublicationsCard
                            category={item.category}
                            image={item.image}
                            count={item.count}
                            width={250}
                            height={200}
                        />
                    </Grid>
                ))}
            </Grid>

            <PublicationDialog
                open={openDialog}
                onClose={handleClose}
                onSave={handleSave}
            />
        </Container>
    )
}