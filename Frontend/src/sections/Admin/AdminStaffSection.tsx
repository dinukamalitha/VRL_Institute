'use client';

import { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Grid,
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
import SupportStaffCard from '@/components/SupportStaffCard';

import {
    getAllStaffMembers,
    createStaffMember,
    updateStaffMemberById,
    removeStaffMember,
} from '@/api/staff';
import { StaffMember } from '@/types/sections';
import { uploadToCloudinary } from '@/utils/fileUpload';

export default function AdminStaffSection() {
    const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentStaff, setCurrentStaff] = useState<StaffMember | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    // Delete confirmation state
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // Fetch staff members
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllStaffMembers();
                setStaffMembers(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Failed to fetch staff members', err);
                setStaffMembers([]);
            }
        };
        fetchData();
    }, []);

    const handleEdit = (staff: StaffMember) => {
        setCurrentStaff(staff);
        setSelectedFile(null);
        setOpenDialog(true);
    };

    const handleAdd = () => {
        setCurrentStaff({ _id: '', name: '', photo: '', role: '', description: '' });
        setSelectedFile(null);
        setOpenDialog(true);
    };

    const handleSave = async () => {
        if (!currentStaff) return;
        setLoading(true);

        try {
            let photoUrl = currentStaff.photo;
            if (selectedFile) {
                photoUrl = await uploadToCloudinary(selectedFile);
            }

            const payload: StaffMember = { ...currentStaff, photo: photoUrl || '' };

            if (currentStaff._id) {
                const response = await updateStaffMemberById(currentStaff._id, payload);
                const updatedStaff = response.data;
                if (updatedStaff) {
                    setStaffMembers((prev) =>
                        prev.map((s) => (s._id === updatedStaff._id ? updatedStaff : s))
                    );
                }
            } else {
                const response = await createStaffMember(payload);
                const newStaff = response.data;
                if (newStaff) {
                    setStaffMembers((prev) => [...prev, newStaff]);
                }
            }

            setOpenDialog(false);
            setSelectedFile(null);
            setCurrentStaff(null);
        } catch (error) {
            console.error('Failed to save staff member:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (staffId: string | undefined) => {
        if (!staffId) return;
        setDeleteId(staffId);
        setDeleteConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;
        try {
            const deleted = await removeStaffMember(deleteId);
            if (deleted) {
                setStaffMembers((prev) => prev.filter((s) => s._id !== deleteId));
            }
        } catch (err) {
            console.error('Failed to delete staff member:', err);
        } finally {
            setDeleteConfirmOpen(false);
            setDeleteId(null);
        }
    };

    return (
        <Container id="support-staff" maxWidth="lg" sx={{ py: 8 }}>
            <Typography
                variant="h3"
                component="h2"
                textAlign="center"
                gutterBottom
                sx={{ fontWeight: 'bold', color: '#222', mb: 4 }}
            >
                Support Staff
            </Typography>

            <Box textAlign="center" mb={4}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                    sx={{
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        borderRadius: 2,
                        background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                        '&:hover': { background: 'linear-gradient(45deg, #388E3C, #66BB6A)' },
                    }}
                >
                    Add Staff Member
                </Button>
            </Box>

            <Grid container spacing={2}>
                {staffMembers.map((staff, index) => (
                    <Grid item xs={12} sm={6} md={4} key={staff._id || index}>
                        <Box>
                            <Button
                                size="small"
                                startIcon={<EditIcon />}
                                sx={{ textTransform: 'none' }}
                                onClick={() => handleEdit(staff)}
                            >
                                Edit
                            </Button>
                            <Button
                                size="small"
                                sx={{ textTransform: 'none', color: 'red' }}
                                onClick={() => handleDelete(staff._id)}
                            >
                                Delete
                            </Button>

                            <SupportStaffCard staff={staff}  />
                        </Box>
                    </Grid>
                ))}
            </Grid>


            {/* Add/Edit Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 'bold' }}>
                    {currentStaff?._id ? 'Edit Staff Member' : 'Add Staff Member'}
                </DialogTitle>

                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField
                        label="Name"
                        fullWidth
                        value={currentStaff?.name || ''}
                        onChange={(e) =>
                            setCurrentStaff((prev) => (prev ? { ...prev, name: e.target.value } : null))
                        }
                    />
                    <TextField
                        label="Role"
                        fullWidth
                        value={currentStaff?.role || ''}
                        onChange={(e) =>
                            setCurrentStaff((prev) => (prev ? { ...prev, role: e.target.value } : null))
                        }
                    />

                    <FileUpload
                        label="Photo"
                        showPreview
                        accept="image/*"
                        buttonText={
                            selectedFile
                                ? 'Replace Photo'
                                : currentStaff?.photo
                                    ? 'Replace Photo'
                                    : 'Upload Photo'
                        }
                        currentFile={
                            selectedFile
                                ? URL.createObjectURL(selectedFile)
                                : currentStaff?.photo || ''
                        }
                        onFileSelect={(file: File) => setSelectedFile(file)}
                        id="staff-photo"
                    />

                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        minRows={3}
                        value={currentStaff?.description || ''}
                        onChange={(e) =>
                            setCurrentStaff((prev) =>
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
                        {loading ? 'Saving...' : currentStaff?._id ? 'Save' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation */}
            <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this staff member?</Typography>
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
