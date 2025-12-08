'use client'

import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
} from '@mui/material'
import { useState, useMemo, useEffect, useCallback } from 'react'
import AddIcon from '@mui/icons-material/Add'
import DataTable from '@/components/DataTable'
import SearchBar from '@/components/SearchBar'
import AddEventModal from '@/sections/Events/AddEventModal'
import EditEventModal from '@/sections/Events/EditEventModal'
import { getAllEvents, removeEvent } from '@/api/events'
import { ApiEventItem, EventItem } from '@/types/event'
import ConfirmDialog from '@/components/ConfirmDialog'
import { useToast } from '@/hooks/useToast'

export default function EventsPage() {
  const { showToast, ToastComponent } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [eventItems, setEventItems] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(false)

  // Delete confirmation state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  // Fetch events from backend
  const fetchEvents = useCallback(async () => {
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
      showToast('Failed to load events. Please try again later.', 'error')
    } finally {
      setLoading(false)
    }
  }, [showToast])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

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
      setDeleting(true)
      const result = await removeEvent(deleteId)
      if (result) {
        fetchEvents()
        showToast('Event deleted successfully!', 'success')
      } else {
        showToast('Failed to delete event.', 'error')
      }
    } catch (err) {
      console.error('Failed to delete event:', err)
      showToast('An error occurred while deleting the event.', 'error')
    } finally {
      setDeleteConfirmOpen(false)
      setDeleteId(null)
      setDeleting(false)
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
            label: 'Coordinator/s',
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
      <ConfirmDialog
        open={deleteConfirmOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this event? This action cannot be undone."
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
