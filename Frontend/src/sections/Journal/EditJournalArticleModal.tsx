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
import { useState, useEffect } from 'react'
import { Add, Delete } from '@mui/icons-material'
import FormTextField from '@/components/FormTextField'
import FileUpload from '@/components/FileUpload'
import { uploadToCloudinary } from '@/utils/fileUpload'
import { updateJournalArticle } from '@/api/journal-articles'
import { Author } from '@/types/author'
import axios from 'axios'
import { EditJournalArticleModalProps } from '@/types/journal'

export default function EditJournalArticleModal({
  open,
  onClose,
  article,
}: EditJournalArticleModalProps) {
  const [title, setTitle] = useState('')
  const [abstract, setAbstract] = useState('')
  const [category, setCategory] = useState('')
  const [volume, setVolume] = useState('')
  const [issue, setIssue] = useState('')
  const [keywords, setKeywords] = useState<string[]>([])
  const [keywordInput, setKeywordInput] = useState('')
  const [peerReviewed, setPeerReviewed] = useState(true)
  const [loading, setLoading] = useState(false)
  const [documentFile, setDocumentFile] = useState<File | null>(null)
  const [authors, setAuthors] = useState<Author[]>([{ name: '', description: '', photoFile: null }])

  useEffect(() => {
    if (article) {
      setTitle(article.title || '')
      setAbstract(article.abstract || '')
      setCategory(article.category || '')
      setVolume(article.volume || '')
      setIssue(article.issue || '')
      setKeywords(article.keywords || [])
      setPeerReviewed(article.peerReviewed !== undefined ? article.peerReviewed : true)
      setAuthors(
        article.authors?.length
          ? article.authors.map((a: any) => ({
            name: a.name || '',
            description: a.description || '',
            photoFile: null,
            photoUrl: a.photo || undefined,
          }))
          : [{ name: '', description: '', photoFile: null }]
      )
    }
  }, [article])

  const handleAddAuthor = () =>
    setAuthors([...authors, { name: '', description: '', photoFile: null }])

  const handleRemoveAuthor = (index: number) => {
    if (authors.length === 1) return
    setAuthors(authors.filter((_, i) => i !== index))
  }

  const handleAuthorChange = (index: number, field: keyof Author, value: any) => {
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

  const handleUpdate = async () => {
    if (!title.trim() || !abstract.trim() || !category.trim() || !volume.trim() || !issue.trim()) {
      alert('Please fill all required fields.')
      return
    }

    const hasValidAuthor = authors.some((a) => a.name.trim() !== '')
    if (!hasValidAuthor) {
      alert('Please provide at least one author name.')
      return
    }

    setLoading(true)
    try {
      // Upload document if changed
      let documentUrl = article?.documentUrl || ''
      if (documentFile) {
        documentUrl = await uploadToCloudinary(documentFile, "VRL/journal/articles/documents")
      }

      // Upload author photos
      const uploadedAuthors = []
      for (const author of authors) {
        if (!author.name.trim()) continue
        let photoUrl = author.photoUrl
        if (author.photoFile) {
          photoUrl = await uploadToCloudinary(author.photoFile, "VRL/journal/articles/authors")
        }
        uploadedAuthors.push({
          name: author.name,
          description: author.description || '',
          photo: photoUrl || '',
        })
      }

      const id = article?._id || article?.id
      const payload = {
        title,
        abstract,
        category,
        volume,
        issue,
        keywords,
        peerReviewed,
        documentUrl,
        authors: uploadedAuthors,
      }

      await updateJournalArticle(id, payload)
      onClose()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message)
        alert('Failed to update journal article. Please check the console for errors.')
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
      maxWidth="lg"
      PaperProps={{
        sx: { height: '90vh' },
      }}
    >
      <DialogTitle>Edit Journal Article</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
        <FormTextField
          label="Title"
          value={title}
          onChange={setTitle}
          size="small"
        />

        <FormTextField
          label="Abstract"
          value={abstract}
          onChange={setAbstract}
          size="small"
          multiline
          rows={4}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormTextField
            label="Category"
            value={category}
            onChange={setCategory}
            size="small"
          />
          <FormTextField
            label="Volume"
            value={volume}
            onChange={setVolume}
            size="small"
          />
          <FormTextField
            label="Issue"
            value={issue}
            onChange={setIssue}
            size="small"
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
          id="document-upload"
          accept=".pdf"
          label="Article Document (PDF)"
          buttonText="Choose PDF"
          onFileSelect={setDocumentFile}
          currentFile={article?.documentUrl}
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
                {authors.length > 1 && (
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

