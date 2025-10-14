'use client'

import { Box, Container, Typography, Grid, Card, CardContent, Button, Chip, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export default function JournalPage() {
  const [openDialog, setOpenDialog] = useState(false)
  const [editingJournal, setEditingJournal] = useState<any>(null)

  const journalIssues = [
    {
      id: 1,
      title: "VRL Journal - Volume 1, Issue 1",
      subtitle: "Innovation in Technology and Research",
      description: "The inaugural issue of VRL Journal featuring cutting-edge research in artificial intelligence, sustainable technology, and educational innovation.",
      publishDate: "December 2024",
      status: "Published",
      category: "Technology",
      articles: 8,
      downloads: 1250,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "VRL Journal - Volume 1, Issue 2",
      subtitle: "Advancements in Machine Learning",
      description: "Special issue focusing on recent developments in machine learning algorithms and their applications in various industries.",
      publishDate: "January 2025",
      status: "In Progress",
      category: "Machine Learning",
      articles: 6,
      downloads: 0,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "VRL Journal - Volume 1, Issue 3",
      subtitle: "Sustainable Technology Solutions",
      description: "Exploring innovative approaches to sustainable technology and their impact on environmental conservation.",
      publishDate: "February 2025",
      status: "Planning",
      category: "Sustainability",
      articles: 0,
      downloads: 0,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "VRL Journal - Volume 2, Issue 1",
      subtitle: "Digital Transformation in Education",
      description: "Examining the role of digital technologies in transforming educational practices and improving learning outcomes.",
      publishDate: "March 2025",
      status: "Planning",
      category: "Education",
      articles: 0,
      downloads: 0,
      image: "https://images.unsplash.com/photo-1523240794102-9c5c79b3236a?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 5,
      title: "VRL Journal - Volume 2, Issue 2",
      subtitle: "Cybersecurity and Privacy",
      description: "Comprehensive coverage of cybersecurity challenges and privacy protection in the digital age.",
      publishDate: "April 2025",
      status: "Planning",
      category: "Cybersecurity",
      articles: 0,
      downloads: 0,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center"
    }
  ]

  const handleAddNew = () => {
    setEditingJournal(null)
    setOpenDialog(true)
  }

  const handleEdit = (journal: any) => {
    setEditingJournal(journal)
    setOpenDialog(true)
  }

  const handleDelete = (id: number) => {
    // Handle delete logic here
    console.log('Delete journal with id:', id)
  }

  const handleSave = () => {
    // Handle save logic here
    console.log('Save journal:', editingJournal)
    setOpenDialog(false)
    setEditingJournal(null)
  }

  const handleClose = () => {
    setOpenDialog(false)
    setEditingJournal(null)
  }

  return (
    <Container maxWidth="xl">
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            VRL Journal Management
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {"Manage VRL Institute's academic journal issues and publications"}
          </Typography>
        </Box>

        {/* Action Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Chip label="All Issues" color="primary" />
            <Chip label="Published" variant="outlined" />
            <Chip label="In Progress" variant="outlined" />
            <Chip label="Planning" variant="outlined" />
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
            Create Issue
          </Button>
        </Box>

        {/* Journal Issues Grid */}
        <Grid container spacing={3}>
          {journalIssues.map((journal) => (
            <Grid item xs={12} md={6} lg={4} key={journal.id}>
              <Card sx={{ 
                height: '100%',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e0e0e0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                  borderColor: '#4CAF50'
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
                      src={journal.image} 
                      alt={journal.title}
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
                      label={journal.category} 
                      size="small" 
                      sx={{ backgroundColor: '#4CAF50', color: 'white', fontWeight: 'bold' }}
                    />
                    <Chip 
                      label={journal.status} 
                      size="small" 
                      color={journal.status === 'Published' ? 'success' : journal.status === 'In Progress' ? 'warning' : 'default'}
                    />
                  </Box>

                  {/* Title */}
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>
                    {journal.title}
                  </Typography>

                  {/* Subtitle */}
                  <Typography variant="subtitle2" color="primary" sx={{ mb: 1, fontWeight: 600 }}>
                    {journal.subtitle}
                  </Typography>

                  {/* Description */}
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {journal.description}
                  </Typography>

                  {/* Journal Details */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
                      📅 {journal.publishDate}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
                      📄 {journal.articles} articles
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
                      📥 {journal.downloads} downloads
                    </Typography>
                  </Box>

                  {/* Progress Bar for In Progress Issues */}
                  {journal.status === 'In Progress' && (
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" color="textSecondary">
                          Completion
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {Math.round((journal.articles / 8) * 100)}%
                        </Typography>
                      </Box>
                      <Box sx={{ 
                        width: '100%', 
                        height: 4, 
                        backgroundColor: '#e0e0e0', 
                        borderRadius: 2,
                        overflow: 'hidden'
                      }}>
                        <Box sx={{ 
                          width: `${(journal.articles / 8) * 100}%`, 
                          height: '100%', 
                          backgroundColor: '#4CAF50',
                          transition: 'width 0.3s ease'
                        }} />
                      </Box>
                    </Box>
                  )}

                  {/* Actions */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button 
                      size="small" 
                      variant="outlined" 
                      sx={{ 
                        color: '#4CAF50', 
                        borderColor: '#4CAF50',
                        '&:hover': {
                          borderColor: '#4CAF50',
                          backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        }
                      }}
                    >
                      View Details
                    </Button>
                    <Box>
                      <IconButton 
                        size="small" 
                        sx={{ color: '#E91E63' }}
                        onClick={() => handleEdit(journal)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        sx={{ color: '#f44336' }}
                        onClick={() => handleDelete(journal.id)}
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
            {editingJournal ? 'Edit Journal Issue' : 'Create New Journal Issue'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Issue Title"
                defaultValue={editingJournal?.title || ''}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Subtitle"
                defaultValue={editingJournal?.subtitle || ''}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Description"
                defaultValue={editingJournal?.description || ''}
                margin="normal"
                multiline
                rows={3}
                required
              />
              <TextField
                fullWidth
                label="Publish Date"
                defaultValue={editingJournal?.publishDate || ''}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Category"
                defaultValue={editingJournal?.category || ''}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Number of Articles"
                type="number"
                defaultValue={editingJournal?.articles || ''}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Image URL"
                defaultValue={editingJournal?.image || ''}
                margin="normal"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">
              {editingJournal ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
  )
} 