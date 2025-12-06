'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from '@mui/material'
import { useState } from 'react'
import FormTextField from '@/components/FormTextField'
import FileUpload from '@/components/FileUpload'
import { uploadToCloudinary } from '@/utils/fileUpload'
import { createJournalVolume } from '@/api/journal-volumes'
import axios from 'axios'
import { AddJournalVolumeModalProps } from '@/types/journal'

export default function AddJournalVolumeModal({
  open,
  onClose,
}: AddJournalVolumeModalProps) {
  const [title, setTitle] = useState('')
  const [publisher, setPublisher] = useState('Veritas Research & Learning Institute')
  const [loading, setLoading] = useState(false)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [documentFile, setDocumentFile] = useState<File | null>(null)

  const [errors, setErrors] = useState({
    title: '',
    publisher: ''
  })

  const validate = () => {
    let isValid = true
    const newErrors = {
      title: '',
      publisher: ''
    }

    if (!title.trim()) {
      newErrors.title = 'Title is required'
      isValid = false
    }
    if (!publisher.trim()) {
      newErrors.publisher = 'Publisher is required'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleCreate = async () => {
    if (!validate()) return

    setLoading(true)

    try {
      // Upload thumbnail
      let thumbnailUrl: string | undefined
      if (thumbnailFile) {
        thumbnailUrl = await uploadToCloudinary(thumbnailFile, "VRL/journal/volumes/thumbnails")
      }

      // Upload document
      let documentUrl: string = ''
      if (documentFile) {
        documentUrl = await uploadToCloudinary(documentFile, "VRL/journal/volumes/documents")
      }

      const payload = {
        title,
        publisher,
        documentUrl,
        thumbnail: thumbnailUrl,
      }

      const res = await createJournalVolume(payload)
      console.log("Journal volume created:", res)

      // Reset form
      setTitle('')
      setPublisher('Veritas Research & Learning Institute')
      setThumbnailFile(null)
      setDocumentFile(null)
      setErrors({
        title: '',
        publisher: '',
      })

      onClose()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message)
        alert('Failed to create journal volume. Please check the console for errors.')
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
      maxWidth="md"
    >
      <DialogTitle>Add New Journal Volume</DialogTitle>
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

        <FormTextField
          label="Publisher"
          value={publisher}
          onChange={setPublisher}
          size="small"
          required
          error={!!errors.publisher}
          helperText={errors.publisher}
        />

        <FileUpload
          id="thumbnail-upload"
          accept="image/*"
          label="Thumbnail Image"
          buttonText="Choose Image"
          onFileSelect={setThumbnailFile}
          currentFile={undefined}
          showPreview
        />

        <FileUpload
          id="document-upload"
          accept=".pdf"
          label="Volume Document (PDF)"
          buttonText="Choose PDF"
          onFileSelect={setDocumentFile}
          currentFile={undefined}
        />
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

