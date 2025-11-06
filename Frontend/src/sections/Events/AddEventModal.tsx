'use client'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, IconButton, Paper} from '@mui/material'
import { useState } from 'react'
import FormTextField from '@/components/FormTextField'
import FileUpload from '@/components/FileUpload'
import axios from 'axios'
import { uploadToCloudinary } from '@/app/utils/fileUpload'
import { Add, Delete } from '@mui/icons-material'
import RichTextEditor from '@/components/RichTextEditor'
import { createEvent } from '@/api/events'
import { AddEventModalProps } from '@/types/event'
import { Author } from '@/types/author'

export default function AddEventModal({ open, onClose, width = 'lg', height = '85vh' }: AddEventModalProps) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [medium, setMedium] = useState('')
  const [description, setDescription] = useState('')
  const [registrationLink, setRegistrationLink] = useState('')
  const [authors, setAuthors] = useState<Author[]>([{ name: '', description: '', photoFile: null }])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  // Inline validation errors
  const [errors, setErrors] = useState({
    title: '',
  })

  // Handlers for authors
  const handleAddAuthor = () =>
    setAuthors([...authors, { name: '', description: '', photoFile: null }])

  const handleRemoveAuthor = (index: number) => {
    if (index === 0) return
    setAuthors(authors.filter((_, i) => i !== index))
  }

  const handleAuthorChange = (index: number, field: keyof Author, value: any) => {
    const updated = [...authors]
    updated[index] = { ...updated[index], [field]: value }
    setAuthors(updated)
  }

  const validate = () => {
    let isValid = true
    const newErrors = { title: '' }

    if (!title.trim()) {
      newErrors.title = 'Title is required'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleCreate = async () => {
    if (!validate()) return

    setLoading(true)

    try {
      let uploadedImageUrl: string | undefined
      if (imageFile) uploadedImageUrl = await uploadToCloudinary(imageFile)

      const uploadedAuthors = []
      for (const author of authors) {
        let photoUrl: string | undefined
        if (author.photoFile) {
          photoUrl = await uploadToCloudinary(author.photoFile)
        }
        uploadedAuthors.push({
          name: author.name || '',
          description: author.description || '',
          photo: photoUrl
        })
      }

      const payload: any = {
        title,
        date: date || null,
        time: time || null,
        location: location || '',
        medium: medium || '',
        description: description || '',
        registrationLink: registrationLink || '',
        authors: uploadedAuthors,
        status: "active"
      }

      if (uploadedImageUrl) {
        payload.thumbnail = uploadedImageUrl
      }

      await createEvent(payload)

      // Reset form
      setTitle('')
      setDate('')
      setTime('')
      setLocation('')
      setMedium('')
      setDescription('')
      setRegistrationLink('')
      setAuthors([{ name: '', description: '', photoFile: null }])
      setImageFile(null)
      setErrors({ title: '' })

      onClose()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message)
      } else {
        console.error("Unexpected error:", error)
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
      maxWidth={width ? (width as "xs" | "sm" | "md" | "lg" | "xl") : false}
      PaperProps={{ sx: height ? { height } : undefined }}
    >
      <DialogTitle>Add New Event</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormTextField
          label="Title"
          value={title}
          onChange={setTitle}
          size="small"
          required
          error={!!errors.title}
          helperText={errors.title}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormTextField
            label=""
            type="date"
            value={date}
            onChange={setDate}
            size="small"
          />
          <FormTextField
            label="Time"
            value={time}
            onChange={setTime}
            size="small"
            placeholder="00:00 AM - 00:00 PM"
          />
        </Box>
        <FormTextField label="Location" value={location} onChange={setLocation} size="small" />
        <FormTextField label="Medium" value={medium} onChange={setMedium} size="small" />
        <FormTextField label="Registration link" value={registrationLink} onChange={setRegistrationLink} size="small"  />

        {/* Authors Section */}
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Organizers</Typography>
          {authors.map((author, index) => (
            <Paper key={index} variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" fontWeight="bold">Organizer {index + 1}</Typography>
                {index > 0 && (
                  <IconButton color="error" size="small" onClick={() => handleRemoveAuthor(index)}>
                    <Delete />
                  </IconButton>
                )}
              </Box>

              <Box sx={{ mt: 1 }}>
                <FormTextField
                  label="Organizer Name"
                  value={author.name}
                  onChange={(val) => handleAuthorChange(index, 'name', val)}
                  size="small"
                  fullWidth
                />
              </Box>

              <Box sx={{ mt: 2 }}>
                <FormTextField
                  label="Organizer Description"
                  value={author.description}
                  onChange={(val) => handleAuthorChange(index, 'description', val)}
                  size="small"
                  fullWidth
                  multiline
                  rows={3}
                />
              </Box>

              <Box sx={{ mt: 2 }}>
                <FileUpload
                  id={`author-photo-${index}`}
                  accept="image/*"
                  label="Organizer Photo"
                  buttonText="Upload Photo"
                  onFileSelect={(file) => handleAuthorChange(index, 'photoFile', file)}
                  currentFile={undefined}
                  showPreview
                />
              </Box>
            </Paper>
          ))}
          <Button startIcon={<Add />} onClick={handleAddAuthor} sx={{ mt: 1 }}>
            Add Organizer
          </Button>
        </Box>

        <FileUpload
          id="event-thumbnail-upload"
          accept="image/*"
          label="Thumbnail Image (optional)"
          buttonText="Choose Image"
          onFileSelect={setImageFile}
          currentFile={undefined}
          showPreview
        />

        <Box sx={{ mt: 2, flex: 1, minHeight: 300 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Event Description</Typography>
          <RichTextEditor
            value={description}
            onChange={setDescription}
            placeholder="Write the event description here..."
            height="300px"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose} disabled={loading}>Cancel</Button>
        <Button variant="contained" onClick={handleCreate} disabled={loading}>
          {loading ? "Saving..." : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
