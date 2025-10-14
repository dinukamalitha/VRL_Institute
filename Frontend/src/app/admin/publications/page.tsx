'use client'

import { Box, Container, Typography, Grid, Card, CardContent, Button, Chip, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export default function PublicationsPage() {
  const [openDialog, setOpenDialog] = useState(false)
  const [editingPublication, setEditingPublication] = useState<any>(null)

  const publications = [
    {
      id: 1,
      title: "Industry 4.0 Implementation Strategies",
      authors: "Dr. John Smith, Dr. Sarah Johnson",
      abstract: "This research paper explores effective strategies for implementing Industry 4.0 technologies in manufacturing environments...",
      journal: "International Journal of Advanced Manufacturing",
      year: 2024,
      doi: "10.1000/abc123",
      status: "Published",
      category: "Research Paper",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Machine Learning Applications in Education",
      authors: "Dr. Michael Brown, Dr. Emily Davis",
      abstract: "A comprehensive study on the applications of machine learning in educational settings and its impact on student learning outcomes...",
      journal: "Journal of Educational Technology",
      year: 2024,
      doi: "10.1000/def456",
      status: "Under Review",
      category: "Research Paper",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Sustainable Technology Solutions",
      authors: "Dr. Lisa Wilson, Dr. Robert Chen",
      abstract: "Innovative approaches to developing sustainable technology solutions for environmental challenges...",
      journal: "Sustainability Science",
      year: 2024,
      doi: "10.1000/ghi789",
      status: "Published",
      category: "Review Paper",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Data Analytics in Healthcare",
      authors: "Dr. Amanda Lee, Dr. David Kim",
      abstract: "Application of data analytics and artificial intelligence in healthcare for improved patient outcomes...",
      journal: "Healthcare Informatics",
      year: 2024,
      doi: "10.1000/jkl012",
      status: "Accepted",
      category: "Research Paper",
      image: "https://images.unsplash.com/photo-1523240794102-9c5c79b3236a?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 5,
      title: "Cybersecurity in IoT Networks",
      authors: "Dr. James Anderson, Dr. Maria Garcia",
      abstract: "Security challenges and solutions for Internet of Things networks in industrial applications...",
      journal: "Cybersecurity Journal",
      year: 2024,
      doi: "10.1000/mno345",
      status: "Published",
      category: "Technical Paper",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center"
    }
  ]

  const handleAddNew = () => {
    setEditingPublication(null)
    setOpenDialog(true)
  }

  const handleEdit = (publication: any) => {
    setEditingPublication(publication)
    setOpenDialog(true)
  }

  const handleDelete = (id: number) => {
    // Handle delete logic here
    console.log('Delete publication with id:', id)
  }

  const handleSave = () => {
    // Handle save logic here
    console.log('Save publication:', editingPublication)
    setOpenDialog(false)
    setEditingPublication(null)
  }

  const handleClose = () => {
    setOpenDialog(false)
    setEditingPublication(null)
  }

  return (
    <Container maxWidth="xl">
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            Publications Management
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Manage research publications, papers, and academic works
          </Typography>
        </Box>

        {/* Action Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Chip label="All Publications" color="primary" />
            <Chip label="Published" variant="outlined" />
            <Chip label="Under Review" variant="outlined" />
            <Chip label="Accepted" variant="outlined" />
          </Box>
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
          {publications.map((publication) => (
            <Grid item xs={12} md={6} lg={4} key={publication.id}>
              <Card sx={{ 
                height: '100%',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e0e0e0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                  borderColor: '#2196F3'
                }
              }}>
                <CardContent>
                  {/* Image */}
                  <Box sx={{ 
                    width: '100%', 
                    height: 200, 
                    borderRadius: 1, 
                    overflow: 'hidden', 
                    mb: 2,
                    backgroundColor: '#f5f5f5'
                  }}>
                    <img 
                      src={publication.image} 
                      alt={publication.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>

                  {/* Status and Category */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Chip 
                      label={publication.category} 
                      size="small" 
                      sx={{ backgroundColor: '#2196F3', color: 'white', fontWeight: 'bold' }}
                    />
                    <Chip 
                      label={publication.status} 
                      size="small" 
                      color={publication.status === 'Published' ? 'success' : 'warning'}
                    />
                  </Box>

                  {/* Title */}
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>
                    {publication.title}
                  </Typography>

                  {/* Authors */}
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1, fontStyle: 'italic' }}>
                    {publication.authors}
                  </Typography>

                  {/* Abstract */}
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {publication.abstract}
                  </Typography>

                  {/* Publication Details */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
                      📚 {publication.journal}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
                      📅 {publication.year}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
                      🔗 DOI: {publication.doi}
                    </Typography>
                  </Box>

                  {/* Actions */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button 
                      size="small" 
                      variant="outlined" 
                      sx={{ 
                        color: '#2196F3', 
                        borderColor: '#2196F3',
                        '&:hover': {
                          borderColor: '#2196F3',
                          backgroundColor: 'rgba(33, 150, 243, 0.1)',
                        }
                      }}
                    >
                      View Details
                    </Button>
                    <Box>
                      <IconButton 
                        size="small" 
                        sx={{ color: '#E91E63' }}
                        onClick={() => handleEdit(publication)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        sx={{ color: '#f44336' }}
                        onClick={() => handleDelete(publication.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add/Edit Dialog */}
        <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>
            {editingPublication ? 'Edit Publication' : 'Add New Publication'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Title"
                defaultValue={editingPublication?.title || ''}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Authors"
                defaultValue={editingPublication?.authors || ''}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Abstract"
                defaultValue={editingPublication?.abstract || ''}
                margin="normal"
                multiline
                rows={4}
                required
              />
              <TextField
                fullWidth
                label="Journal"
                defaultValue={editingPublication?.journal || ''}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Year"
                type="number"
                defaultValue={editingPublication?.year || ''}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="DOI"
                defaultValue={editingPublication?.doi || ''}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Category"
                defaultValue={editingPublication?.category || ''}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Image URL"
                defaultValue={editingPublication?.image || ''}
                margin="normal"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">
              {editingPublication ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
  )
} 