'use client'

import {
    Box,
    Button,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography,
} from '@mui/material'
import {useCallback, useEffect, useState} from 'react'
import AddIcon from '@mui/icons-material/Add'
import PublicationsCard from '@/components/PublicationsCard'
import PublicationDialog from '@/sections/Publications/AddPublicationModal'
import {
    createPublication,
    getAllPublications,
    getPublicationCountsByCategory,
    removePublication
} from '@/api/publications'
import {Publication} from "@/types/publications";
import DataTable from "@/components/DataTable";

export default function PublicationsPage() {
    const [openDialog, setOpenDialog] = useState(false)
    const [publications, setPublications] = useState<Publication[]>([])
    const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})
    const [loading, setLoading] = useState(true)

    // Delete confirmation dialog state
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
    const [deleteId, setDeleteId] = useState<string | null>(null)

    // Fetch publications data
    const fetchPageData = useCallback(async () => {
        setLoading(true)
        try {
            const [publicationsResponse, countsResponse] = await Promise.all([
                getAllPublications(),
                getPublicationCountsByCategory()
            ]);

            setPublications(Array.isArray(publicationsResponse.data) ? publicationsResponse.data : []);
            setCategoryCounts(countsResponse.data || {});
            console.log(publicationsResponse);
        } catch (error) {
            console.error('Failed to fetch page data:', error)
        } finally {
            setLoading(false)
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

    // Open delete confirmation
    const handleDelete = (row: Publication) => {
        setDeleteId(row._id || '')
        setDeleteConfirmOpen(true)
    }

    // Confirm delete API call
    const confirmDelete = async () => {
        if (!deleteId) return
        try {
            const result = await removePublication(deleteId)
            if (result) {
                fetchPageData()
            }
        } catch (err) {
            console.error('Failed to delete news:', err)
        } finally {
            setDeleteConfirmOpen(false)
            setDeleteId(null)
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
                            isLink={false}
                        />
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 4 }}>
                <DataTable
                    columns={[
                        {
                            id: 'title',
                            label: 'Title',
                            minWidth: 150,
                            format: (value) => (
                                <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
                                    {value || "-"}
                                </Typography>
                            )
                        },
                        {
                            id: 'authors',
                            label: 'Author',
                            minWidth: 120,
                            align: 'left',
                            format: (value) => Array.isArray(value) ? value.map(a => a.name).join(', ') : value
                        },
                        {
                            id: 'category',
                            label: 'Category',
                            minWidth: 120,
                            align: 'center',
                            format: (value) => (
                                <Chip
                                    label={value || "Empty"}
                                    size="small"
                                    sx={{ backgroundColor: '#E91E63', color: 'white', fontWeight: 'bold', fontSize: '0.75rem' }}
                                />
                            )
                        },
                        {
                            id: 'createdAt',
                            label: 'Date Published',
                            minWidth: 120,
                            align: 'center',
                            format: (value: string) => {
                                if (!value) return "-";
                                const date = new Date(value);
                                // Format as YYYY-MM-DD HH:mm:ss
                                return date.toISOString().split('T').join(' ').split('.')[0];
                            }
                        },
                        {
                            id: 'updatedAt',
                            label: 'Last Updated',
                            minWidth: 120,
                            align: 'center',
                            format: (value: string) => {
                                if (!value) return "-";
                                const date = new Date(value);
                                return date.toISOString().split('T').join(' ').split('.')[0];;
                            }
                        }

                    ]}
                    data={publications}
                    filteredData={publications}
                    onDelete={handleDelete}
                    loading={loading}
                />
            </Box>

            <PublicationDialog
                open={openDialog}
                onClose={handleClose}
                onSave={handleSave}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this news post?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
                    <Button color="error" variant="contained" onClick={confirmDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}