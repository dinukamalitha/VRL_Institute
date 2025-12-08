'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { useState, useEffect } from 'react'
import FormTextField from '@/components/FormTextField'
import FileUpload from '@/components/FileUpload'
import { uploadToCloudinary } from '@/utils/fileUpload'
import { updateJournalVolume } from '@/api/journal-volumes'
import axios from 'axios'
import { EditJournalVolumeModalProps } from '@/types/journal'

export default function EditJournalVolumeModal({
  open,
  onClose,
  volume,
}: EditJournalVolumeModalProps) {
  const [title, setTitle] = useState('')
  const [publisher, setPublisher] = useState('Veritas Research & Learning Institute')
  const [publishedDate, setPublishedDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [documentFile, setDocumentFile] = useState<File | null>(null)

  useEffect(() => {
    if (volume) {
      setTitle(volume.title || '')
      setPublisher(volume.publisher || 'Veritas Research & Learning Institute')
      setPublishedDate(volume.publishedDate ? new Date(volume.publishedDate).toISOString().split('T')[0] : '')
    }
  }, [volume])

  const handleUpdate = async () => {
    if (!title.trim() || !publisher.trim() || !publishedDate.trim()) {
      alert('Please fill all required fields.')
      return
    }

    setLoading(true)
    try {
      // Upload thumbnail if changed
      let thumbnailUrl = volume?.thumbnail
      if (thumbnailFile) {
        thumbnailUrl = await uploadToCloudinary(thumbnailFile, "VRL/journal/volumes/thumbnails")
      }

      // Upload document if changed
      let documentUrl = volume?.documentUrl || ''
      if (documentFile) {
        documentUrl = await uploadToCloudinary(documentFile, "VRL/journal/volumes/documents")
      }

      const id = volume?._id || volume?.id
      const payload = {
        title,
        publisher,
        publishedDate: publishedDate || new Date().toISOString(),
        documentUrl,
        thumbnail: thumbnailUrl,
      }

      await updateJournalVolume(id, payload)
      onClose()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message)
        alert('Failed to update journal volume. Please check the console for errors.')
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
      maxWidth="md"
    >
      <DialogTitle>Edit Journal Volume</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormTextField
          label="Title"
          value={title}
          onChange={setTitle}
          size="small"
        />

        <FormTextField
          label="Publisher"
          value={publisher}
          onChange={setPublisher}
          size="small"
        />

        <FormTextField
          label="Published Date"
          type="date"
          value={publishedDate}
          onChange={setPublishedDate}
          size="small"
        />

        <FileUpload
          id="thumbnail-upload"
          accept="image/*"
          label="Thumbnail Image"
          buttonText="Choose Image"
          onFileSelect={setThumbnailFile}
          currentFile={volume?.thumbnail}
          showPreview
        />

        <FileUpload
          id="document-upload"
          accept=".pdf"
          label="Volume Document (PDF)"
          buttonText="Choose PDF"
          onFileSelect={setDocumentFile}
          currentFile={volume?.documentUrl}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose} disabled={loading}>Cancel</Button>
        <Button variant="contained" onClick={handleUpdate} disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

