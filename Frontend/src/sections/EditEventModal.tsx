'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Paper,
} from '@mui/material'
import { useState, useEffect } from 'react'
import FormTextField from '@/components/FormTextField'
import FileUpload from '@/components/FileUpload'
import RichTextEditor from '@/components/RichTextEditor'
import { Add, Delete } from '@mui/icons-material'
import axios from 'axios'
import { uploadToCloudinary } from '@/app/utils/fileUpload'
import { updateEventById } from '@/api/events'
import { EditEventModalProps } from '@/types/event'
import { Author } from '@/types/author'

export default function EditEventModal({
                                         open,
                                         onClose,
                                         eventItem,
                                         width = 'lg',
                                         height = '85vh',
                                       }: EditEventModalProps) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [medium, setMedium] = useState('')
  const [description, setDescription] = useState('')
  const [registrationLink, setRegistrationLink] = useState('')
  const [authors, setAuthors] = useState<Author[]>([
    { name: '', description: '', photoFile: null },
  ])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  // Prefill data when eventItem changes
  useEffect(() => {
    if (eventItem) {
      setTitle(eventItem.title || '')
      setDate(eventItem.date || '')
      setTime(eventItem.time || '')
      setLocation(eventItem.location || '')
      setMedium(eventItem.medium || '')
      setDescription(eventItem.description || '')
      setRegistrationLink(eventItem.registrationLink || '')

      const authorsArray = Array.isArray(eventItem.authors)
        ? eventItem.authors
        : eventItem.authors
          ? [eventItem.authors]
          : []

      setAuthors(
        authorsArray.length
          ? authorsArray.map((a: any) => ({
            name: a.name || '',
            description: a.description || '',
            photoFile: null,
            photoUrl: a.photo || undefined,
          }))
          : [{ name: '', description: '', photoFile: null }]
      )

      setImageFile(null)
    }
  }, [eventItem])


  const handleAddAuthor = () =>
    setAuthors([...authors, { name: '', description: '', photoFile: null }])

  const handleRemoveAuthor = (index: number) => {
    if (index === 0) return
    setAuthors(authors.filter((_, i) => i !== index))
  }

  const handleAuthorChange = (
    index: number,
    field: keyof Author,
    value: any
  ) => {
    const updated = [...authors]
    updated[index] = { ...updated[index], [field]: value }
    setAuthors(updated)
  }

  const handleUpdate = async () => {
    if (!title.trim()) {
      alert("Title is required.")
      return
    }
    setLoading(true)

    try {
      // Upload thumbnail if changed
      let uploadedImageUrl = eventItem?.thumbnail
      if (imageFile) {
        uploadedImageUrl = await uploadToCloudinary(imageFile)
      }

      // Upload author photos
      const uploadedAuthors = []
      for (const author of authors) {
        let photoUrl = author.photoUrl
        if (author.photoFile) {
          photoUrl = await uploadToCloudinary(author.photoFile)
        }
        uploadedAuthors.push({
          name: author.name,
          description: author.description,
          photo: photoUrl,
        })
      }

      const payload: any = {
        title,
        date,
        time,
        location,
        medium,
        description,
        registrationLink,
        authors: uploadedAuthors,
        status: 'active',
      }

      if (uploadedImageUrl) payload.thumbnail = uploadedImageUrl
      const id = eventItem?._id;
      await updateEventById(id, payload);

      onClose()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message)
      } else {
        console.error('Unexpected error:', error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={width ? (width as 'xs' | 'sm' | 'md' | 'lg' | 'xl') : false}
      PaperProps={{
        sx: {
          height,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <DialogTitle>Edit Event</DialogTitle>

      <DialogContent
        dividers
        sx={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {/* Basic Info */}
        <FormTextField
          label="Title"
          value={title}
          onChange={setTitle}
          size="small"
          fullWidth
          required={true}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormTextField
            label="Date"
            type="date"
            value={date}
            onChange={setDate}
            size="small"
            fullWidth
          />
          <FormTextField
            label="Time"
            value={time}
            onChange={setTime}
            size="small"
            placeholder="10:00 AM - 2:00 PM"
            fullWidth
          />
        </Box>

        <FormTextField
          label="Location"
          value={location}
          onChange={setLocation}
          size="small"
          fullWidth
        />
        <FormTextField
          label="Medium"
          value={medium}
          onChange={setMedium}
          size="small"
          fullWidth
        />
        <FormTextField
          label="Registration Link"
          value={registrationLink}
          onChange={setRegistrationLink}
          size="small"
          fullWidth
        />

        {/* Authors Section */}
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Authors
          </Typography>
          {authors.map((author, index) => (
            <Paper key={index} variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  Author {index + 1}
                </Typography>
                {index > 0 && (
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleRemoveAuthor(index)}
                  >
                    <Delete />
                  </IconButton>
                )}
              </Box>

              <FormTextField
                label="Organizer Name"
                value={author.name}
                onChange={(val) => handleAuthorChange(index, 'name', val)}
                size="small"
                fullWidth
                sx={{ mb: 2 }}
              />

              <FormTextField
                label="Organizer Description"
                value={author.description}
                onChange={(val) =>
                  handleAuthorChange(index, 'description', val)
                }
                size="small"
                fullWidth
                multiline
                rows={3}
                sx={{ mb: 2 }}
              />

              <FileUpload
                id={`author-photo-${index}`}
                accept="image/*"
                label="Orgnaizer Photo"
                buttonText="Upload Photo"
                onFileSelect={(file) =>
                  handleAuthorChange(index, 'photoFile', file)
                }
                currentFile={author.photoUrl}
                showPreview
              />
            </Paper>
          ))}
          <Button startIcon={<Add />} onClick={handleAddAuthor}>
            Add Organizer
          </Button>
        </Box>

        {/* Event Thumbnail */}
        <Box>
          <FileUpload
            id="event-thumbnail-upload"
            accept="image/*"
            label="Thumbnail Image (optional)"
            buttonText="Choose Image"
            onFileSelect={setImageFile}
            currentFile={eventItem?.thumbnail}
            showPreview
          />
        </Box>

        {/* Event Description */}
        <Box sx={{ flex: 1, minHeight: 300 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Event Description
          </Typography>
          <RichTextEditor
            value={description}
            onChange={setDescription}
            placeholder="Write the event description here..."
            height="300px"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'flex-end', p: 2 }}>
        <Button variant="outlined" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleUpdate} disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
