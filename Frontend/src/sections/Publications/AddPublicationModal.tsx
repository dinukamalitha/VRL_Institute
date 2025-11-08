'use client';

import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    CircularProgress,
    Box,
    Typography,
    IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FormTextField from '@/components/FormTextField';
import FileUpload from '@/components/FileUpload';
import { uploadToCloudinary } from '@/utils/fileUpload';
import { PublicationDialogProps, Publication } from '@/types/publications';
import { Author } from "@/types/author";
import CategoryDropdown from "@/components/CategoryDropdown";

const PublicationDialog: React.FC<Omit<PublicationDialogProps, 'publication'>> = ({
                                                                                      open,
                                                                                      onClose,
                                                                                      onSave,
                                                                                  }) => {

    const getInitialState = (): Publication => ({
        title: '',
        documentUrl: '',
        category: '',
        authors: [{ name: '', description: '', photoFile: null }],
        thumbnail: ''
    });

    const [formData, setFormData] = useState<Publication>(getInitialState());
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [documentFile, setDocumentFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const publicationCategories = ['Books', 'Monographs', 'Dissertations', 'Thesis'];

    useEffect(() => {
        if (open) {
            resetForm();
        }
    }, [open]);

    const resetForm = () => {
        setFormData(getInitialState());
        setThumbnailFile(null);
        setDocumentFile(null);
    };

    const handleFieldChange = (name: keyof Publication, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAuthorChange = (index: number, updatedValues: Partial<Author>) => {
        const updatedAuthors = [...formData.authors];
        updatedAuthors[index] = { ...updatedAuthors[index], ...updatedValues };
        setFormData((prev) => ({ ...prev, authors: updatedAuthors }));
    };

    const addAuthor = () => {
        setFormData((prev) => ({
            ...prev,
            authors: [...prev.authors, { name: '', description: '', photoFile: null }],
        }));
    };

    const removeAuthor = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            authors: prev.authors.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            let thumbnailUrl = '';
            let documentUrl = '';

            const uploadPromises: Promise<void>[] = [];

            if (thumbnailFile) {
                uploadPromises.push(uploadToCloudinary(thumbnailFile).then(url => { thumbnailUrl = url; }));
            }
            if (documentFile) {
                uploadPromises.push(uploadToCloudinary(documentFile).then(url => { documentUrl = url; }));
            }

            const updatedAuthors = await Promise.all(
                formData.authors.map(async (author) => {
                    if (author.photoFile) {
                        const newPhotoUrl = await uploadToCloudinary(author.photoFile);
                        return { ...author, photoUrl: newPhotoUrl, photoFile: null };
                    }
                    return author;
                })
            );

            await Promise.all(uploadPromises);

            const finalData: Publication = {
                ...formData,
                thumbnail: thumbnailUrl,
                documentUrl,
                authors: updatedAuthors
            };

            onSave(finalData);
            onClose();
        } catch (error) {
            console.error('Error submitting publication:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Add New Publication</DialogTitle>

            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormTextField
                    label="Title"
                    value={formData.title}
                    onChange={(value) => handleFieldChange('title', value)}
                    size="small"
                    required
                />

                <CategoryDropdown
                    label="Category"
                    value={formData.category}
                    onChange={(value) => handleFieldChange('category', value)}
                    categories={publicationCategories}
                    required
                />

                <Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>Author/s</Typography>
                    {formData.authors.map((author, index) => (
                        <Box key={index} sx={{ position: 'relative', mb: 2, border: '1px solid #e0e0e0', p: 2, borderRadius: 2 }}>
                            <IconButton
                                aria-label="delete author"
                                onClick={() => removeAuthor(index)}
                                color="error"
                                sx={{ float: 'right', position: 'absolute', top: 0, right: 0, left: 'auto'}}
                            >
                                <DeleteIcon />
                            </IconButton>

                            <FormTextField
                                label="Author Name"
                                value={author.name}
                                onChange={(value) => handleAuthorChange(index, { name: value })}
                                sx={{ mb: 2, mt: 3 }}
                                required
                            />

                            <FormTextField
                                label="Description"
                                value={author.description || ''}
                                onChange={(value) => handleAuthorChange(index, { description: value })}
                                sx={{ mb: 2 }}
                            />

                            <FileUpload
                                id={`author-photo-${index}`}
                                accept="image/*"
                                label="Author Photo"
                                onFileSelect={(file) => handleAuthorChange(index, { photoFile: file })}
                                showPreview
                            />
                        </Box>
                    ))}

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="outlined" onClick={addAuthor}>
                            + Add Author
                        </Button>
                    </Box>
                </Box>

                <Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>Publication Thumbnail</Typography>
                    <FileUpload
                        id="thumbnail-upload"
                        label=""
                        onFileSelect={setThumbnailFile}
                        showPreview
                    />
                </Box>
                <Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>Publication Document (pdf/docx)</Typography>
                    <FileUpload
                        id="document-upload"
                        label=""
                        accept=".pdf,.doc,.docx"
                        onFileSelect={setDocumentFile}
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancel
                </Button>

                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : undefined
                    }>
                    {loading ? 'Saving...' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PublicationDialog;