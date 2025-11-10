'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FileUpload from '@/components/FileUpload';
import ResourcePersonCard from '../Other/ResourcePersonCard';

import {
  getAllResourcePersons,
  createResourcePerson,
  updateResourcePersonById,
  removeResourcePerson,
} from '@/api/resourcePersons';
import { ResourcePerson } from '@/types/components';
import { uploadToCloudinary } from '@/utils/fileUpload';

export default function AdminResourcePersonsSection() {
  const [resourcePersons, setResourcePersons] = useState<ResourcePerson[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPerson, setCurrentPerson] = useState<ResourcePerson | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  // Delete confirmation state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Fetch resource persons
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllResourcePersons();
        setResourcePersons(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch resource persons', err);
        setResourcePersons([]);
      }
    };
    fetchData();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleEdit = (person: ResourcePerson) => {
    setCurrentPerson(person);
    setSelectedFile(null);
    setOpenDialog(true);
  };

  const handleAdd = () => {
    setCurrentPerson({ _id: '', name: '', photo: '', description: '' });
    setSelectedFile(null);
    setOpenDialog(true);
  };

  const handleSave = async () => {
    if (!currentPerson) return;
    setLoading(true);

    try {
      let photoUrl = currentPerson.photo;

      if (selectedFile) {
        photoUrl = await uploadToCloudinary(selectedFile, "VRL/common");
      }

      const payload: ResourcePerson = {
        ...currentPerson,
        photo: photoUrl || '',
      };

      if (currentPerson._id) {
        // Edit existing
        const response = await updateResourcePersonById(currentPerson._id, payload);
        const updatedPerson = response.data; // <--- extract the actual object
        if (updatedPerson) {
          setResourcePersons((prev) =>
            prev.map((person) =>
              person._id === updatedPerson._id ? updatedPerson : person
            )
          );
        }
      } else {
        // Add new
        const response = await createResourcePerson(payload);
        const newPerson = response.data; // <--- extract the actual object
        if (newPerson) {
          setResourcePersons((prev) => [...prev, newPerson]);
        }
      }

      setOpenDialog(false);
      setSelectedFile(null);
      setCurrentPerson(null);
    } catch (error) {
      console.error('Failed to save resource person:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (personId: string | undefined) => {
    if (!personId) return;
    setDeleteId(personId);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const deleted = await removeResourcePerson(deleteId);
      if (deleted) {
        setResourcePersons((prev) => prev.filter((p) => p._id !== deleteId));
      }
    } catch (err) {
      console.error('Failed to delete resource person:', err);
    } finally {
      setDeleteConfirmOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <Container id="resource-persons" maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        component="h2"
        textAlign="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#222', mb: 4 }}
      >
        Key Resource Personnel
      </Typography>

      <Box textAlign="center" mb={6}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: 600,
            borderRadius: 2,
            background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
            '&:hover': { background: 'linear-gradient(45deg, #1976D2, #1AC7F2)' },
          }}
        >
          Add New Resource Person
        </Button>
      </Box>

      <Grid container spacing={2}>
        {resourcePersons.map((person, index) => {
          const isExpanded = expandedIndexes.includes(index);

          return (
            <Grid item xs={12} sm={6} md={4} key={person._id || index}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                }}
              >
                <CardActions sx={{ position: 'absolute', top: 6, right: 6, zIndex: 10 }}>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    sx={{ textTransform: 'none' }}
                    onClick={() => handleEdit(person)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    sx={{ textTransform: 'none', color: 'red' }}
                    onClick={() => handleDelete(person._id)}
                  >
                    Delete
                  </Button>
                </CardActions>

                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 6 }}>
                  <ResourcePersonCard
                    person={person}
                    isExpanded={isExpanded}
                    onToggle={() => toggleExpand(index)}
                  />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          {currentPerson?._id ? 'Edit Resource Person' : 'Add Resource Person'}
        </DialogTitle>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            fullWidth
            value={currentPerson?.name || ''}
            onChange={(e) =>
              setCurrentPerson((prev) => (prev ? { ...prev, name: e.target.value } : null))
            }
          />

          <FileUpload
            label="Image"
            showPreview
            accept="image/*"
            buttonText={
              selectedFile
                ? 'Replace Image'
                : currentPerson?.photo
                  ? 'Replace Image'
                  : 'Upload Image'
            }
            currentFile={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : currentPerson?.photo || ''
            }
            onFileSelect={(file: File) => setSelectedFile(file)}
            id="resource-person-photo"
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={4}
            value={currentPerson?.description || ''}
            onChange={(e) =>
              setCurrentPerson((prev) =>
                prev ? { ...prev, description: e.target.value } : null
              )
            }
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpenDialog(false)} color="inherit" disabled={loading}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : currentPerson?._id ? 'Save' : 'Add New'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this resource person?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}
