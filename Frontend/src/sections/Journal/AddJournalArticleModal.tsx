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
  TextField,
  Chip,
} from '@mui/material'
import { useState } from 'react'
import { Add, Delete } from '@mui/icons-material'
import FormTextField from '@/components/FormTextField'
import FileUpload from '@/components/FileUpload'
import { uploadToCloudinary } from '@/utils/fileUpload'
import { createJournalArticle } from '@/api/journal-articles'
import { Author } from '@/types/author'
import axios from 'axios'
import { AddJournalArticleModalProps } from '@/types/journal'

export default function AddJournalArticleModal({
  open,
  onClose,
}: AddJournalArticleModalProps) {
  const [title, setTitle] = useState('')
  const [abstract, setAbstract] = useState('')
  const [category, setCategory] = useState('')
  const [volume, setVolume] = useState('')
  const [issue, setIssue] = useState('')
  const [keywords, setKeywords] = useState<string[]>([])
  const [keywordInput, setKeywordInput] = useState('')
  const [peerReviewed, setPeerReviewed] = useState(true)
  const [loading, setLoading] = useState(false)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [documentFile, setDocumentFile] = useState<File | null>(null)
  const [authors, setAuthors] = useState<Author[]>([
    { name: '', description: '', photoFile: null }
  ])

  const [errors, setErrors] = useState({
    title: '',
    abstract: '',
    category: '',
    volume: '',
    issue: '',
    authorName: '',
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

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()])
      setKeywordInput('')
    }
  }

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword))
  }

  const validate = () => {
    let isValid = true
    const newErrors = {
      title: '',
      abstract: '',
      category: '',
      volume: '',
      issue: '',
      authorName: '',
    }

    if (!title.trim()) {
      newErrors.title = 'Title is required'
      isValid = false
    }
    if (!abstract.trim()) {
      newErrors.abstract = 'Abstract is required'
      isValid = false
    }
    if (!category.trim()) {
      newErrors.category = 'Category is required'
      isValid = false
    }
    if (!volume.trim()) {
      newErrors.volume = 'Volume is required'
      isValid = false
    }
    if (!issue.trim()) {
      newErrors.issue = 'Issue is required'
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
      // Upload thumbnail
      let thumbnailUrl: string | undefined
      if (thumbnailFile) {
        thumbnailUrl = await uploadToCloudinary(thumbnailFile, "VRL/journal/articles/thumbnails")
      }

      // Upload document
      let documentUrl: string = ''
      if (documentFile) {
        documentUrl = await uploadToCloudinary(documentFile, "VRL/journal/articles/documents")
      }

      // Upload author photos
      const uploadedAuthors = []
      for (const author of authors) {
        let photoUrl: string | undefined
        if (author.photoFile) {
          photoUrl = await uploadToCloudinary(author.photoFile, "VRL/journal/articles/authors")
        }
        uploadedAuthors.push({
          name: author.name,
          description: author.description || '',
          photo: photoUrl,
        })
      }

      const payload = {
        title,
        abstract,
        category,
        volume,
        issue,
        keywords,
        peerReviewed,
        documentUrl,
        thumbnail: thumbnailUrl,
        authors: uploadedAuthors,
      }

      const res = await createJournalArticle(payload)
      console.log("Journal article created:", res)

      // Reset form
      setTitle('')
      setAbstract('')
      setCategory('')
      setVolume('')
      setIssue('')
      setKeywords([])
      setKeywordInput('')
      setPeerReviewed(true)
      setThumbnailFile(null)
      setDocumentFile(null)
      setAuthors([{ name: '', description: '', photoFile: null }])
      setErrors({
        title: '',
        abstract: '',
        category: '',
        volume: '',
        issue: '',
        authorName: '',
      })

      onClose()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message)
        alert('Failed to create journal article. Please check the console for errors.')
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
      maxWidth="lg"
      PaperProps={{
        sx: { height: '90vh' },
      }}
    >
      <DialogTitle>Add New Journal Article</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
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
          label="Abstract"
          value={abstract}
          onChange={setAbstract}
          size="small"
          multiline
          rows={4}
          required
          error={!!errors.abstract}
          helperText={errors.abstract}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormTextField
            label="Category"
            value={category}
            onChange={setCategory}
            size="small"
            required
            error={!!errors.category}
            helperText={errors.category}
          />
          <FormTextField
            label="Volume"
            value={volume}
            onChange={setVolume}
            size="small"
            required
            error={!!errors.volume}
            helperText={errors.volume}
          />
          <FormTextField
            label="Issue"
            value={issue}
            onChange={setIssue}
            size="small"
            required
            error={!!errors.issue}
            helperText={errors.issue}
          />
        </Box>


        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Keywords</Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
            {keywords.map((keyword) => (
              <Chip
                key={keyword}
                label={keyword}
                onDelete={() => handleRemoveKeyword(keyword)}
                size="small"
              />
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              placeholder="Add keyword"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddKeyword()
                }
              }}
              sx={{ flex: 1 }}
            />
            <Button size="small" onClick={handleAddKeyword}>Add</Button>
          </Box>
        </Box>

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
          label="Article Document (PDF)"
          buttonText="Choose PDF"
          onFileSelect={setDocumentFile}
          currentFile={undefined}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <input
            type="checkbox"
            id="peerReviewed"
            checked={peerReviewed}
            onChange={(e) => setPeerReviewed(e.target.checked)}
          />
          <label htmlFor="peerReviewed">Peer Reviewed</label>
        </Box>

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

