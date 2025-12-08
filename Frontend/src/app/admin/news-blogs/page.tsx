'use client'

import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
} from '@mui/material'
import { useState, useEffect, useMemo } from 'react'
import AddIcon from '@mui/icons-material/Add'
import DataTable from '@/components/DataTable'
import SearchBar from '@/components/SearchBar'
import AddNewsBlogModal from '@/sections/NewsBlog/AddNewsBlogModal'
import EditNewsBlogModal from '@/sections/NewsBlog/EditNewsBlogModal'
import { getAllNewsBlogs, removeNewsBlog } from '@/api/news-blogs'
import ConfirmDialog from '@/components/ConfirmDialog'
import { useToast } from '@/hooks/useToast'

export default function NewsBlogsPage() {
  const { showToast, ToastComponent } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedNews, setSelectedNews] = useState<any>(null)
  const [newsItems, setNewsItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Delete confirmation dialog state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  // Fetch news from backend
  const fetchNews = async () => {
    setLoading(true)
    try {
      const res = await getAllNewsBlogs()
      setNewsItems(res || [])
    } catch (error) {
      console.error('Failed to fetch news:', error)
      showToast('Failed to load news articles. Please try again later.', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  // Filter data based on search term
  const filteredNewsItems = useMemo(() => {
    if (!searchTerm) return newsItems
    return newsItems.filter((news) =>
      Object.values(news).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [newsItems, searchTerm])

  const handleAddNew = () => setAddOpen(true)
  const handleEdit = (news: any) => {
    setSelectedNews(news)
    setEditOpen(true)
  }

  // Open delete confirmation
  const handleDelete = (row: any) => {
    setDeleteId(row._id)
    setDeleteConfirmOpen(true)
  }

  // Confirm delete API call
  const confirmDelete = async () => {
    if (!deleteId) return
    try {
      setDeleting(true)
      const result = await removeNewsBlog(deleteId)
      if (result) {
        fetchNews()
        showToast('News article deleted successfully!', 'success')
      } else {
        showToast('Failed to delete news article.', 'error')
      }
    } catch (err) {
      console.error('Failed to delete news:', err)
      showToast('An error occurred while deleting the news article.', 'error')
    } finally {
      setDeleteConfirmOpen(false)
      setDeleteId(null)
      setDeleting(false)
    }
  }

  const handleCloseAddModal = () => {
    setAddOpen(false)
    fetchNews()
  }

  const handleCloseEditModal = () => {
    setEditOpen(false)
    fetchNews()
  }

  return (
    <Container maxWidth="xl">
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#333', mt: 4 }}
        >
          News Blogs Management
        </Typography>
      </Box>

      {/* Action Bar with Search */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search news by title, author, or category..."
          width={400}
        />

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
          Add News Blog
        </Button>
      </Box>

      {/* News Table */}
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
            id: 'date',
            label: 'Date Published',
            minWidth: 120,
            align: 'center'
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
            id: 'status',
            label: 'Status',
            minWidth: 100,
            align: 'center',
            format: (value) => (
              <Chip
                label={value}
                size="small"
                color={value === 'Published' ? 'success' : 'warning'}
                sx={{ fontSize: '0.75rem' }}
              />
            )
          }
        ]}
        data={newsItems}
        filteredData={filteredNewsItems}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      {/* Modals */}
      <AddNewsBlogModal open={addOpen} onClose={handleCloseAddModal} />
      <EditNewsBlogModal open={editOpen} onClose={handleCloseEditModal} newsItem={selectedNews} />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this news article? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteConfirmOpen(false)
          setDeleteId(null)
        }}
        severity="error"
        loading={deleting}
      />

      <ToastComponent />
    </Container>
  )
}
