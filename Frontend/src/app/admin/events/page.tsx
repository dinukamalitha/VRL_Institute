'use client'

import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import { useState, useMemo, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add'
import DataTable from '@/components/DataTable'
import SearchBar from '@/components/SearchBar'
import AddEventModal from '@/sections/AddEventModal'
import EditEventModal from '@/sections/EditEventModal'
import { getAllEvents, removeEvent } from '@/api/events'
import { ApiEventItem, EventItem } from '@/types/event'

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [eventItems, setEventItems] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(false)

  // Delete confirmation state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // Fetch events from backend
  const fetchEvents = async () => {
    setLoading(true)
    try {
      const res: ApiEventItem[] = await getAllEvents()
      const mappedEvents: EventItem[] = res.map((item) => ({
        _id: item._id,
        title: item.title,
        authors: item.authors || [],
        date: item.date,
        time: item.time,
        medium: item.medium,
        location: item.location,
        registrationLink: item.registrationLink,
        description: item.description,
        status: item.status
          ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
          : 'Inactive',
        thumbnail: item.images && item.images.length > 0 ? item.images[0] : null,
      }))


      setEventItems(mappedEvents)
    } catch (error) {
      console.error('Failed to fetch events:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  // Filter events based on search term
  const filteredEvents = useMemo(() => {
    if (!searchTerm) return eventItems
    return eventItems.filter((event) =>
      Object.values(event).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [eventItems, searchTerm])

  const handleAddNew = () => {
    setSelectedEvent(null)
    setAddOpen(true)
  }

  const handleEdit = (event: EventItem) => {
    setSelectedEvent(event)
    setEditOpen(true)
  }

  const handleDelete = (event: EventItem) => {
    setDeleteId(event._id)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = async () => {
    if (!deleteId) return
    try {
      const result = await removeEvent(deleteId)
      if (result) fetchEvents()
    } catch (err) {
      console.error('Failed to delete event:', err)
    } finally {
      setDeleteConfirmOpen(false)
      setDeleteId(null)
    }
  }

  const handleCloseAddModal = () => {
    setAddOpen(false)
    fetchEvents()
  }

  const handleCloseEditModal = () => {
    setEditOpen(false)
    setSelectedEvent(null)
    fetchEvents()
  }

  return (
    <Container maxWidth="xl">
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333', mt: 4 }}>
          Events & Programs Management
        </Typography>
      </Box>

      {/* Action Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search events by title, type, or location..."
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
          Create Event
        </Button>
      </Box>

      {/* Events Table */}
      <DataTable
        columns={[
          { id: 'title', label: 'Event Title', minWidth: 150, align: 'left' },
          {
            id: 'authors',
            label: 'Resource Person/s',
            minWidth: 120,
            align: 'left',
            format: (authors: { name: string }[]) =>
              authors && authors.length > 0 ? authors.map(a => a.name).join(', ') : '-'
          },
          {
            id: 'date',
            label: 'Date',
            minWidth: 120,
            align: 'center',
            format: (value) => value || '-'
          },
          {
            id: 'time',
            label: 'Time',
            minWidth: 120,
            align: 'center',
            format: (value) => value || '-'
          },
          {
            id: 'location',
            label: 'Location',
            minWidth: 150,
            align: 'left',
            format: (value) => value || '-'
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
                color={value === 'Active' ? 'success' : 'warning'}
                sx={{ fontSize: '0.75rem' }}
              />
            )
          }
        ]}
        data={eventItems}
        filteredData={filteredEvents}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      {/* Modals */}
      <AddEventModal open={addOpen} onClose={handleCloseAddModal} />
      <EditEventModal open={editOpen} onClose={handleCloseEditModal} eventItem={selectedEvent} />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this event?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
