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
  Paper
} from '@mui/material'
import { useState } from 'react'
import RichTextEditor from '@/components/RichTextEditor'
import FormTextField from '@/components/FormTextField'
import axios from "axios"
import FileUpload from '@/components/FileUpload'
import { uploadToCloudinary } from '@/app/utils/fileUpload'
import { Add, Delete } from '@mui/icons-material'
import { createNewsBlog } from '@/api/news-blogs'
import { Author } from '@/types/author'
import { AddNewsBlogModalProps } from '@/types/news'

export default function AddNewsBlogModal({
                                           open,
                                           onClose,
                                           width = 'lg',
                                           height = '85vh'
                                         }: AddNewsBlogModalProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [authors, setAuthors] = useState<Author[]>([
    { name: '', description: '', photoFile: null }
  ])

  // Inline validation errors
  const [errors, setErrors] = useState({
    title: '',
    content: '',
    authorName: ''
  })

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

  const validate = () => {
    let isValid = true
    const newErrors = { title: '', content: '', authorName: '' }

    if (!title.trim()) {
      newErrors.title = 'Title is required'
      isValid = false
    }
    if (!content.trim()) {
      newErrors.content = 'Description/Content is required'
      isValid = false
    }
    if (!authors[0].name.trim()) {
      newErrors.authorName = 'At least one author name is required'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleCreate = async () => {
    if (!validate()) return

    setLoading(true)

    try {
      // Upload main thumbnail
      let uploadedImageUrl: string | undefined
      if (imageFile) uploadedImageUrl = await uploadToCloudinary(imageFile)

      // Upload author photos
      const uploadedAuthors = []
      for (const author of authors) {
        let photoUrl: string | undefined
        if (author.photoFile) photoUrl = await uploadToCloudinary(author.photoFile)
        uploadedAuthors.push({
          name: author.name,
          description: author.description,
          photo: photoUrl
        })
      }

      const payload = {
        title,
        description: content,
        category,
        date: new Date().toISOString(),
        status: "Published",
        images: uploadedImageUrl ? [uploadedImageUrl] : [],
        authors: uploadedAuthors
      }

      const res = await createNewsBlog(payload)
      console.log("News created:", res)

      // Reset form
      setTitle('')
      setCategory('')
      setContent('')
      setImageFile(null)
      setAuthors([{ name: '', description: '', photoFile: null }])
      setErrors({ title: '', content: '', authorName: '' })

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
      PaperProps={{
        sx: height ? { height } : undefined,
      }}
    >
      <DialogTitle>Add New News Blog</DialogTitle>
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
          label="Category"
          value={category}
          onChange={setCategory}
          size="small"
        />

        <FileUpload
          id="image-upload"
          accept="image/*"
          label="Thumbnail Image"
          buttonText="Choose Image"
          onFileSelect={setImageFile}
          currentFile={undefined}
          showPreview
        />

        {/* Authors Section */}
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Authors</Typography>

          {authors.map((author, index) => (
            <Paper key={index} variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" fontWeight="bold">Author {index + 1}</Typography>
                {index > 0 && (
                  <IconButton color="error" size="small" onClick={() => handleRemoveAuthor(index)}>
                    <Delete />
                  </IconButton>
                )}
              </Box>

              {/* Author Name */}
              <Box sx={{ mt: 1 }}>
                <FormTextField
                  label="Author Name"
                  value={author.name}
                  onChange={(val) => handleAuthorChange(index, 'name', val)}
                  size="small"
                  fullWidth
                  required
                  error={index === 0 && !!errors.authorName}
                  helperText={index === 0 ? errors.authorName : ''}
                />
              </Box>

              {/* Author Description */}
              <Box sx={{ mt: 2 }}>
                <FormTextField
                  label="Author Description"
                  value={author.description}
                  onChange={(val) => handleAuthorChange(index, 'description', val)}
                  size="small"
                  fullWidth
                  multiline
                  rows={3}
                />
              </Box>

              {/* Author Photo */}
              <Box sx={{ mt: 2 }}>
                <FileUpload
                  id={`author-photo-${index}`}
                  accept="image/*"
                  label="Author Photo"
                  buttonText="Upload Photo"
                  onFileSelect={(file) => handleAuthorChange(index, 'photoFile', file)}
                  currentFile={undefined}
                  showPreview
                />
              </Box>
            </Paper>
          ))}

          <Button startIcon={<Add />} onClick={handleAddAuthor} sx={{ mt: 1 }}>
            Add Author
          </Button>
        </Box>

        {/* Content */}
        <Box sx={{ mt: 2, flex: 1, minHeight: 300 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Content</Typography>
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Write your article here..."
            height="300px"
          />
          {errors.content && (
            <Typography color="error" variant="caption">{errors.content}</Typography>
          )}
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
