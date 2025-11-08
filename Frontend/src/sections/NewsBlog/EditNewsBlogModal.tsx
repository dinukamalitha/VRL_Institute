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
import { Add, Delete } from '@mui/icons-material'
import axios from "axios"

import RichTextEditor from '@/components/RichTextEditor'
import FormTextField from '@/components/FormTextField'
import FileUpload from '@/components/FileUpload'
import { uploadToCloudinary } from '@/utils/fileUpload'
import { updateNewsBlogById } from '@/api/news-blogs'
import { Author } from '@/types/author'
import { EditNewsBlogModalProps } from '@/types/news'

export default function EditNewsBlogModal({
                                            open,
                                            onClose,
                                            newsItem,
                                            width = 'lg',
                                            height = '85vh',
                                          }: EditNewsBlogModalProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [authors, setAuthors] = useState<Author[]>([{ name: '', description: '', photoFile: null }])

  // Prefill data when editing
  useEffect(() => {
    if (newsItem) {
      setTitle(newsItem.title || '')
      setCategory(newsItem.category || '')
      setContent(newsItem.description || '')
      setAuthors(
        newsItem.authors?.length
          ? newsItem.authors.map((a: any) => ({
            name: a.name || '',
            description: a.description || '',
            photoFile: null,
            photoUrl: a.photo || undefined,
          }))
          : [{ name: '', description: '', photoFile: null }]
      )
    }
  }, [newsItem])

  // ---- Author Management ----
  const handleAddAuthor = () =>
    setAuthors([...authors, { name: '', description: '', photoFile: null }])

  const handleRemoveAuthor = (index: number) => {
    if (authors.length === 1) return // keep at least one author
    setAuthors(authors.filter((_, i) => i !== index))
  }

  const handleAuthorChange = (index: number, field: keyof Author, value: any) => {
    const updated = [...authors]
    updated[index] = { ...updated[index], [field]: value }
    setAuthors(updated)
  }

  // ---- Save Update ----
  const handleUpdate = async () => {
    // Validate required fields
    if (!title.trim() || !category.trim() || !content.trim()) {
      alert('Please fill all required fields (Title, Category, and Content).')
      return
    }

    // Ensure at least one author with a name
    const hasValidAuthor = authors.some((a) => a.name.trim() !== '')
    if (!hasValidAuthor) {
      alert('Please provide at least one author name.')
      return
    }

    setLoading(true)
    try {
      // Upload thumbnail if changed
      let uploadedImageUrl: string | undefined = Array.isArray(newsItem?.images)
        ? newsItem?.images[0]
        : (newsItem?.image as string | undefined)

      if (imageFile) {
        uploadedImageUrl = await uploadToCloudinary(imageFile)
      }

      // Upload author photos (optional)
      const uploadedAuthors = []
      for (const author of authors) {
        if (!author.name.trim()) continue
        let photoUrl = author.photoUrl
        if (author.photoFile) {
          photoUrl = await uploadToCloudinary(author.photoFile)
        }
        uploadedAuthors.push({
          name: author.name,
          description: author.description || '',
          photo: photoUrl || '',
        })
      }

      const id = newsItem?._id || newsItem?.id
      const payload = {
        title,
        description: content,
        category,
        date: new Date().toISOString().split('T')[0],
        authors: uploadedAuthors,
        images: uploadedImageUrl ? [uploadedImageUrl] : [],
      }

      await updateNewsBlogById(id, payload)
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
      maxWidth={width as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}
      PaperProps={{
        sx: height ? { height } : undefined,
      }}
    >
      <DialogTitle>Edit News Blog</DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* ---- Basic Info ---- */}
        <FormTextField label="Title" value={title} onChange={setTitle} size="small" />
        <FormTextField label="Category" value={category} onChange={setCategory} size="small" />

        <FileUpload
          id="image-upload"
          accept="image/*"
          label="Thumbnail Image"
          buttonText="Choose Image"
          onFileSelect={setImageFile}
          currentFile={Array.isArray(newsItem?.images) ? newsItem?.images[0] : newsItem?.image}
          showPreview
        />

        {/* ---- Authors ---- */}
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>
            Authors
          </Typography>

          {authors.map((author, index) => (
            <Paper key={index} variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" fontWeight="bold">
                  Author {index + 1}
                </Typography>
                {authors.length > 1 && (
                  <IconButton color="error" size="small" onClick={() => handleRemoveAuthor(index)}>
                    <Delete />
                  </IconButton>
                )}
              </Box>

              {/* Author Name (Required) */}
              <Box sx={{ mt: 1 }}>
                <FormTextField
                  label="Author Name *"
                  value={author.name}
                  onChange={(val) => handleAuthorChange(index, 'name', val)}
                  size="small"
                  fullWidth
                />
              </Box>

              {/* Author Description (Optional) */}
              <Box sx={{ mt: 2 }}>
                <FormTextField
                  label="Author Description (optional)"
                  value={author.description}
                  onChange={(val) => handleAuthorChange(index, 'description', val)}
                  size="small"
                  fullWidth
                  multiline
                  rows={3}
                />
              </Box>

              {/* Author Photo (Optional) */}
              <Box sx={{ mt: 2 }}>
                <FileUpload
                  id={`author-photo-${index}`}
                  accept="image/*"
                  label="Author Photo (optional)"
                  buttonText="Upload Photo"
                  onFileSelect={(file) => handleAuthorChange(index, 'photoFile', file)}
                  currentFile={author.photoUrl}
                  showPreview
                />
              </Box>
            </Paper>
          ))}

          <Button startIcon={<Add />} onClick={handleAddAuthor} sx={{ mt: 1 }}>
            Add Author
          </Button>
        </Box>

        {/* ---- Content ---- */}
        <Box sx={{ mt: 2, flex: 1, minHeight: 300 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Content
          </Typography>
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Write your article here..."
            height="300px"
            uploadFolder="publications/news-blogs"
          />
        </Box>
      </DialogContent>

      <DialogActions>
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
