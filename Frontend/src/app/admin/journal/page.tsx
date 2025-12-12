'use client'

import { Box, Container, Typography, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Tabs, Tab, TextField, Paper, Stack, IconButton, Divider, CircularProgress,} from '@mui/material'
import { useState, useEffect, useMemo, useCallback } from 'react'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import DataTable from '@/components/DataTable'
import SearchBar from '@/components/SearchBar'
import RichTextEditor from '@/components/RichTextEditor'
import FileUpload from '@/components/FileUpload'
import { uploadToCloudinary } from '@/utils/fileUpload'
import AddJournalArticleModal from '@/sections/Journal/AddJournalArticleModal'
import EditJournalArticleModal from '@/sections/Journal/EditJournalArticleModal'
import AddJournalVolumeModal from '@/sections/Journal/AddJournalVolumeModal'
import EditJournalVolumeModal from '@/sections/Journal/EditJournalVolumeModal'
import { getAllJournalArticles, deleteJournalArticle } from '@/api/journal-articles'
import { getAllJournalVolumes, deleteJournalVolume } from '@/api/journal-volumes'
import { getJournalContent, updateJournalContent } from '@/api/journal-content'
import {TabPanelProps} from "@/types/components";
import { useToast } from '@/hooks/useToast'
import { sanitizeHTML } from '@/utils/sanitize';

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`journal-tabpanel-${index}`}
      aria-labelledby={`journal-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

export default function JournalPage() {
  const [tabValue, setTabValue] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const { showToast: triggerToast, ToastComponent } = useToast()
  
  // Articles state
  const [addArticleOpen, setAddArticleOpen] = useState(false)
  const [editArticleOpen, setEditArticleOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<any>(null)
  const [articles, setArticles] = useState<any[]>([])
  const [articlesLoading, setArticlesLoading] = useState(false)

  // Volumes state
  const [addVolumeOpen, setAddVolumeOpen] = useState(false)
  const [editVolumeOpen, setEditVolumeOpen] = useState(false)
  const [selectedVolume, setSelectedVolume] = useState<any>(null)
  const [volumes, setVolumes] = useState<any[]>([])
  const [volumesLoading, setVolumesLoading] = useState(false)

  // Delete confirmation dialog state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteType, setDeleteType] = useState<'article' | 'volume'>('article')

  // Journal Content state
  const [isEditingContent, setIsEditingContent] = useState(false)
  const [journalContentLoading, setJournalContentLoading] = useState(false)
  const [journalContent, setJournalContent] = useState({
    pageTitle: '',
    welcomeText: '',
    aimOfJournal: '',
    peerReviewProcess: '',
    publicationPolicy: '',
    openAccessPolicy: '',
    publisher: '',
    chiefEditors: [''],
    submissionEmail: '',
    submissionText: '',
    typographicGuidance: '',
    maxWordCount: '',
    referencingProfessionalism: '',
    imageUrl: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const showToast = useCallback(
    (message: string, severity: 'success' | 'error' | 'info' | 'warning' = 'success') => {
      triggerToast(message, severity)
    },
    [triggerToast]
  )

  // Fetch articles from backend
  const fetchArticles = useCallback(async () => {
    setArticlesLoading(true)
    try {
      const res = await getAllJournalArticles()
      setArticles(res || [])
    } catch {
      showToast('Failed to fetch articles. Please try again.', 'error')
    } finally {
      setArticlesLoading(false)
    }
  }, [showToast])

  // Fetch volumes from backend
  const fetchVolumes = useCallback(async () => {
    setVolumesLoading(true)
    try {
      const res = await getAllJournalVolumes()
      setVolumes(res || [])
    } catch {
      showToast('Failed to fetch volumes. Please try again.', 'error')
    } finally {
      setVolumesLoading(false)
    }
  }, [showToast])

  // Fetch journal content
  const fetchJournalContent = useCallback(async () => {
    setJournalContentLoading(true)
    try {
      const res = await getJournalContent()
      if (res) {
        setJournalContent({
          pageTitle: res.pageTitle || 'VRL Journal',
          welcomeText: res.welcomeText || '',
          aimOfJournal: res.aimOfJournal || '',
          peerReviewProcess: res.peerReviewProcess || '',
          publicationPolicy: res.publicationPolicy || '',
          openAccessPolicy: res.openAccessPolicy || '',
          publisher: res.publisher || '',
          chiefEditors: res.chiefEditors && res.chiefEditors.length > 0 ? res.chiefEditors : [''],
          submissionEmail: res.submissionEmail || '',
          submissionText: res.submissionText || '',
          typographicGuidance: res.typographicGuidance || '',
          maxWordCount: res.maxWordCount || '',
          referencingProfessionalism: res.referencingProfessionalism || '',
          imageUrl: res.imageUrl || '',
        })
        setImageFile(null)
      }
    } catch (error) {
      console.error('Failed to fetch journal content:', error)
      showToast('Failed to fetch journal content. Please try again.', 'error')
    } finally {
      setJournalContentLoading(false)
    }
  }, [showToast])

  useEffect(() => {
    if (tabValue === 0) {
      fetchArticles()
    } else if (tabValue === 1) {
      fetchVolumes()
    } else if (tabValue === 2) {
      fetchJournalContent()
    }
  }, [tabValue, fetchArticles, fetchVolumes, fetchJournalContent])

  // Filter data based on search term
  const filteredArticles = useMemo(() => {
    if (!searchTerm) return articles
    return articles.filter((article) =>
      Object.values(article).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [articles, searchTerm])

  const filteredVolumes = useMemo(() => {
    if (!searchTerm) return volumes
    return volumes.filter((volume) =>
      Object.values(volume).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [volumes, searchTerm])

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    setSearchTerm('')
  }

  // Article handlers
  const handleAddArticle = () => setAddArticleOpen(true)
  const handleEditArticle = (article: any) => {
    setSelectedArticle(article)
    setEditArticleOpen(true)
  }
  const handleDeleteArticle = (article: any) => {
    setDeleteId(article._id)
    setDeleteType('article')
    setDeleteConfirmOpen(true)
  }

  // Volume handlers
  const handleAddVolume = () => setAddVolumeOpen(true)
  const handleEditVolume = (volume: any) => {
    setSelectedVolume(volume)
    setEditVolumeOpen(true)
  }
  const handleDeleteVolume = (volume: any) => {
    setDeleteId(volume._id)
    setDeleteType('volume')
    setDeleteConfirmOpen(true)
  }

  // Confirm delete API call
  const confirmDelete = async () => {
    if (!deleteId) return
    try {
      if (deleteType === 'article') {
        const result = await deleteJournalArticle(deleteId)
        if (result) {
          showToast('Article deleted successfully', 'success')
          fetchArticles()
        } else {
          showToast('Failed to delete article', 'error')
        }
      } else {
        const result = await deleteJournalVolume(deleteId)
        if (result) {
          showToast('Volume deleted successfully', 'success')
          fetchVolumes()
        } else {
          showToast('Failed to delete volume', 'error')
        }
      }
    } catch (err) {
      console.error('Failed to delete:', err)
      showToast(`Failed to delete ${deleteType}. Please try again.`, 'error')
    } finally {
      setDeleteConfirmOpen(false)
      setDeleteId(null)
    }
  }

  const handleCloseAddArticleModal = () => {
    setAddArticleOpen(false)
    fetchArticles()
    showToast('Article added successfully', 'success')
  }

  const handleCloseEditArticleModal = () => {
    setEditArticleOpen(false)
    setSelectedArticle(null)
    fetchArticles()
    showToast('Article updated successfully', 'success')
  }

  const handleCloseAddVolumeModal = () => {
    setAddVolumeOpen(false)
    fetchVolumes()
    showToast('Volume added successfully', 'success')
  }

  const handleCloseEditVolumeModal = () => {
    setEditVolumeOpen(false)
    setSelectedVolume(null)
    fetchVolumes()
    showToast('Volume updated successfully', 'success')
  }

  // Journal Content handlers
  const handleContentChange = (field: string, value: any) => {
    setJournalContent((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddEditor = () => {
    setJournalContent((prev) => ({
      ...prev,
      chiefEditors: [...prev.chiefEditors, ''],
    }))
  }

  const handleRemoveEditor = (index: number) => {
    if (journalContent.chiefEditors.length > 1) {
      setJournalContent((prev) => ({
        ...prev,
        chiefEditors: prev.chiefEditors.filter((_, i) => i !== index),
      }))
    }
  }

  const handleEditorChange = (index: number, value: string) => {
    const updatedEditors = [...journalContent.chiefEditors]
    updatedEditors[index] = value
    setJournalContent((prev) => ({ ...prev, chiefEditors: updatedEditors }))
  }

  const handleSaveContent = async () => {
    try {
      setJournalContentLoading(true)
      let imageUrl = journalContent.imageUrl
      if (imageFile) {
        try {
          imageUrl = await uploadToCloudinary(imageFile, "VRL/journal")
          showToast('Image uploaded successfully', 'success')
        } catch {
          showToast('Failed to upload image. Please try again.', 'error')
          setJournalContentLoading(false)
          return
        }
      }

      const payload = {
        ...journalContent,
        chiefEditors: journalContent.chiefEditors.filter((editor) => editor.trim() !== ''),
        imageUrl,
      }
      const updated = await updateJournalContent(payload)
      if (updated) {
        setIsEditingContent(false)
        setImageFile(null)
        fetchJournalContent()
        showToast('Journal content updated successfully', 'success')
      } else {
        showToast('Failed to update journal content', 'error')
      }
    } catch (error) {
      console.error('Failed to save journal content:', error)
      showToast('Failed to save journal content. Please try again.', 'error')
    } finally {
      setJournalContentLoading(false)
    }
  }

  return (
    <Container maxWidth="xl">
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#333', mt: 4 }}
        >
          Journal Management
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="journal tabs">
          <Tab label="Articles" />
          <Tab label="Volumes" />
          <Tab label="Journal Info" />
        </Tabs>
      </Box>

      {/* Articles Tab */}
      <TabPanel value={tabValue} index={0}>
        {/* Action Bar with Search */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search articles by title, category, volume, issue..."
            width={400}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddArticle}
            sx={{
              background: 'linear-gradient(45deg, #E91E63 30%, #9C27B0 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #C2185B 30%, #7B1FA2 90%)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Add Article
          </Button>
        </Box>

        {/* Articles Table */}
        <DataTable
          columns={[
            {
              id: 'title',
              label: 'Title',
              minWidth: 200,
              format: (value) => (
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
                  {value || "-"}
                </Typography>
              )
            },
            {
              id: 'authors',
              label: 'Authors',
              minWidth: 150,
              align: 'left',
              format: (value) => Array.isArray(value) ? value.map((a: any) => a.name).join(', ') : '-'
            },
            {
              id: 'category',
              label: 'Category',
              minWidth: 120,
              align: 'center',
              format: (value) => (
                <Chip
                  label={value || "Empty"}
                  size="small"
                  sx={{ backgroundColor: '#E91E63', color: 'white', fontWeight: 'bold', fontSize: '0.75rem' }}
                />
              )
            },
            {
              id: 'volume',
              label: 'Volume',
              minWidth: 80,
              align: 'center'
            },
            {
              id: 'issue',
              label: 'Issue',
              minWidth: 80,
              align: 'center'
            },
            {
              id: 'publishedDate',
              label: 'Published Date',
              minWidth: 120,
              align: 'center',
              format: (value) => {
                if (!value) return "-"
                const date = new Date(value)
                return date.toLocaleDateString()
              }
            },
            {
              id: 'peerReviewed',
              label: 'Peer Reviewed',
              minWidth: 100,
              align: 'center',
              format: (value) => (
                <Chip
                  label={value ? 'Yes' : 'No'}
                  size="small"
                  color={value ? 'success' : 'default'}
                  sx={{ fontSize: '0.75rem' }}
                />
              )
            }
          ]}
          data={articles}
          filteredData={filteredArticles}
          onEdit={handleEditArticle}
          onDelete={handleDeleteArticle}
          loading={articlesLoading}
        />
      </TabPanel>

      {/* Journal Info Tab */}
      <TabPanel value={tabValue} index={2}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, position: 'relative' }}>
          {journalContentLoading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                zIndex: 1,
                borderRadius: 3,
              }}
            >
              <CircularProgress size={60} />
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {isEditingContent ? 'Edit Journal Information' : 'Journal Information'}
              </Typography>
            <Stack direction="row" spacing={2}>
              {isEditingContent && (
                <Button variant="outlined" color="secondary" onClick={() => {
                  setIsEditingContent(false)
                  setImageFile(null)
                  fetchJournalContent()
                }}>
                  Cancel
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={() => (isEditingContent ? handleSaveContent() : setIsEditingContent(true))}
                disabled={journalContentLoading}
                startIcon={journalContentLoading ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {isEditingContent ? (journalContentLoading ? 'Saving...' : 'Save Changes') : 'Edit'}
              </Button>
            </Stack>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Page Title
            </Typography>
            {isEditingContent ? (
              <TextField
                fullWidth
                value={journalContent.pageTitle}
                onChange={(e) => handleContentChange('pageTitle', e.target.value)}
                placeholder="Enter page title (e.g., VRL Journal)"
              />
            ) : (
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {journalContent.pageTitle || 'VRL Journal'}
              </Typography>
            )}
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Journal Cover Image
            </Typography>
            {isEditingContent ? (
              <FileUpload
                id="journal-image-upload"
                accept="image/*"
                label="Journal Cover Image"
                buttonText="Choose Image"
                onFileSelect={setImageFile}
                currentFile={journalContent.imageUrl}
                showPreview
              />
            ) : (
              journalContent.imageUrl ? (
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: 800,
                    height: 400,
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: '2px solid #e0e0e0',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                >
                  <img
                    src={journalContent.imageUrl}
                    alt="Journal Cover"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      backgroundColor: '#f5f5f5',
                    }}
                  />
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  No image uploaded yet
                </Typography>
              )
            )}
          </Box>

          <Box sx={{ my: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Welcome Text
            </Typography>
            {isEditingContent ? (
              <RichTextEditor
                value={journalContent.welcomeText}
                onChange={(value) => handleContentChange('welcomeText', value)}
                placeholder="Enter welcome text..."
                height="200px"
                uploadFolder="VRL/journal"
              />
            ) : (
              <Box
                sx={{
                  p: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  minHeight: 100,
                  backgroundColor: '#f5f5f5',
                }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(journalContent.welcomeText || '') }}
              />
            )}
          </Box>

          <Box sx={{ my: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, my: 1 }}>
              Aim of the Journal
            </Typography>
            {isEditingContent ? (
              <RichTextEditor
                value={journalContent.aimOfJournal}
                onChange={(value) => handleContentChange('aimOfJournal', value)}
                placeholder="Enter aim of the journal..."
                height="250px"
                uploadFolder="VRL/journal/content"
              />
            ) : (
              <Box
                sx={{
                  p: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  minHeight: 120,
                  backgroundColor: '#f5f5f5',
                }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(journalContent.aimOfJournal || '') }}
              />
            )}
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Peer Review Process
            </Typography>
            {isEditingContent ? (
              <RichTextEditor
                value={journalContent.peerReviewProcess}
                onChange={(value) => handleContentChange('peerReviewProcess', value)}
                placeholder="Enter peer review process..."
                height="250px"
                uploadFolder="VRL/journal/content"
              />
            ) : (
              <Box
                sx={{
                  p: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  minHeight: 120,
                  backgroundColor: '#f5f5f5',
                }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(journalContent.peerReviewProcess || '') }}
              />
            )}
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Publication Policy
            </Typography>
            {isEditingContent ? (
              <RichTextEditor
                value={journalContent.publicationPolicy}
                onChange={(value) => handleContentChange('publicationPolicy', value)}
                placeholder="Enter publication policy..."
                height="250px"
                uploadFolder="VRL/journal/content"
              />
            ) : (
              <Box
                sx={{
                  p: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  minHeight: 120,
                  backgroundColor: '#f5f5f5',
                }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(journalContent.publicationPolicy || '') }}
              />
            )}
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Open Access Policy
            </Typography>
            {isEditingContent ? (
              <RichTextEditor
                value={journalContent.openAccessPolicy}
                onChange={(value) => handleContentChange('openAccessPolicy', value)}
                placeholder="Enter open access policy..."
                height="200px"
                uploadFolder="VRL/journal/content"
              />
            ) : (
              <Box
                sx={{
                  p: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  minHeight: 100,
                  backgroundColor: '#f5f5f5',
                }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(journalContent.openAccessPolicy || '') }}
              />
            )}
          </Box>

          <TextField
            label="Publisher"
            value={journalContent.publisher}
            onChange={(e) => handleContentChange('publisher', e.target.value)}
            fullWidth
            sx={{ mb: 3 }}
            InputProps={{ readOnly: !isEditingContent }}
          />

          <Divider sx={{ my: 3 }} />
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Chief Editors
            </Typography>
            {journalContent.chiefEditors.map((editor, index) => (
              <Paper
                key={index}
                variant="outlined"
                sx={{
                  p: 2,
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  backgroundColor: isEditingContent ? '#fff' : '#f5f5f5',
                }}
              >
                <TextField
                  value={editor}
                  onChange={(e) => handleEditorChange(index, e.target.value)}
                  fullWidth
                  placeholder={`Editor ${index + 1} name`}
                  InputProps={{ readOnly: !isEditingContent }}
                  variant={isEditingContent ? 'outlined' : 'standard'}
                />
                {isEditingContent && (
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveEditor(index)}
                    disabled={journalContent.chiefEditors.length === 1}
                    sx={{
                      flexShrink: 0,
                      '&:hover': {
                        backgroundColor: 'error.light',
                        color: 'white',
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Paper>
            ))}
            {isEditingContent && (
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddEditor}
                sx={{ mt: 1 }}
              >
                Add Editor
              </Button>
            )}
          </Box>
          <Divider sx={{ my: 3 }} />

          <TextField
            label="Submission Email"
            type="email"
            value={journalContent.submissionEmail}
            onChange={(e) => handleContentChange('submissionEmail', e.target.value)}
            fullWidth
            sx={{ mb: 3 }}
            InputProps={{ readOnly: !isEditingContent }}
          />

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Submission Text
            </Typography>
            {isEditingContent ? (
              <RichTextEditor
                value={journalContent.submissionText}
                onChange={(value) => handleContentChange('submissionText', value)}
                placeholder="Enter submission text..."
                height="150px"
                uploadFolder="VRL/journal/content"
              />
            ) : (
              <Box
                sx={{
                  p: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  minHeight: 80,
                  backgroundColor: '#f5f5f5',
                }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(journalContent.submissionText || '') }}
              />
            )}
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Typographic Guidance
            </Typography>
            {isEditingContent ? (
              <RichTextEditor
                value={journalContent.typographicGuidance}
                onChange={(value) => handleContentChange('typographicGuidance', value)}
                placeholder="Enter typographic guidance..."
                height="200px"
                uploadFolder="VRL/journal/content"
              />
            ) : (
              <Box
                sx={{
                  p: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  minHeight: 100,
                  backgroundColor: '#f5f5f5',
                }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(journalContent.typographicGuidance || '') }}
              />
            )}
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Maximum Word Count
            </Typography>
            {isEditingContent ? (
              <RichTextEditor
                value={journalContent.maxWordCount}
                onChange={(value) => handleContentChange('maxWordCount', value)}
                placeholder="Enter maximum word count information..."
                height="150px"
                uploadFolder="VRL/journal/content"
              />
            ) : (
              <Box
                sx={{
                  p: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  minHeight: 80,
                  backgroundColor: '#f5f5f5',
                }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(journalContent.maxWordCount || '') }}
              />
            )}
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Referencing & Professionalism
            </Typography>
            {isEditingContent ? (
              <RichTextEditor
                value={journalContent.referencingProfessionalism}
                onChange={(value) => handleContentChange('referencingProfessionalism', value)}
                placeholder="Enter referencing and professionalism guidelines..."
                height="200px"
                uploadFolder="VRL/journal/content"
              />
            ) : (
              <Box
                sx={{
                  p: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  minHeight: 100,
                  backgroundColor: '#f5f5f5',
                }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(journalContent.referencingProfessionalism || '') }}
              />
            )}
          </Box>
        </Paper>
      </TabPanel>

      {/* Volumes Tab */}
      <TabPanel value={tabValue} index={1}>
        {/* Action Bar with Search */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search volumes by title, publisher..."
            width={400}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddVolume}
            sx={{
              background: 'linear-gradient(45deg, #E91E63 30%, #9C27B0 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #C2185B 30%, #7B1FA2 90%)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Add Volume
          </Button>
        </Box>

        {/* Volumes Table */}
        <DataTable
          columns={[
            {
              id: 'title',
              label: 'Title',
              minWidth: 200,
              format: (value) => (
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
                  {value || "-"}
                </Typography>
              )
            },
            {
              id: 'publisher',
              label: 'Publisher',
              minWidth: 200,
              align: 'left'
            },
            {
              id: 'publishedDate',
              label: 'Published Date',
              minWidth: 120,
              align: 'center',
              format: (value) => {
                if (!value) return "-"
                const date = new Date(value)
                return date.toLocaleDateString()
              }
            },
            {
              id: 'createdAt',
              label: 'Created At',
              minWidth: 120,
              align: 'center',
              format: (value) => {
                if (!value) return "-"
                const date = new Date(value)
                return date.toLocaleDateString()
              }
            }
          ]}
          data={volumes}
          filteredData={filteredVolumes}
          onEdit={handleEditVolume}
          onDelete={handleDeleteVolume}
          loading={volumesLoading}
        />
      </TabPanel>

      {/* Modals */}
      <AddJournalArticleModal open={addArticleOpen} onClose={handleCloseAddArticleModal} />
      <EditJournalArticleModal open={editArticleOpen} onClose={handleCloseEditArticleModal} article={selectedArticle} />
      <AddJournalVolumeModal open={addVolumeOpen} onClose={handleCloseAddVolumeModal} />
      <EditJournalVolumeModal open={editVolumeOpen} onClose={handleCloseEditVolumeModal} volume={selectedVolume} />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this {deleteType === 'article' ? 'article' : 'volume'}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notification */}
      <ToastComponent />
    </Container>
  )
}
