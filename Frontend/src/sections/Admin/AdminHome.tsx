'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Stack, Paper } from '@mui/material';
import { getHomeContent, updateHomeContent } from '@/api/home-content';

export default function AdminHome() {
  const [visionText, setVisionText] = useState('');
  const [purposeText, setPurposeText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Fetch home content on mount
  useEffect(() => {
    const fetchData = async () => {
      const res = await getHomeContent();
      if (res) {
        setVisionText(res.visionText || '');
        setPurposeText(res.purposeText || '');
      }
    };
    fetchData();
  }, []);

  // Separate change handlers
  const handleVisionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVisionText(e.target.value);
  };

  const handlePurposeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPurposeText(e.target.value);
  };

  const handleSave = async () => {
    const payload = {
      visionText,
      purposeText,
    };

    const updated = await updateHomeContent(payload);
    if (updated) {
      setIsEditing(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        component="h2"
        textAlign="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#222', mb: 4 }}
      >
        Home Page Content
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
          {isEditing ? 'Edit Vision & Mission' : 'Vision & Mission'}
        </Typography>

        <TextField
          label="Our Vision"
          multiline
          minRows={3}
          value={visionText}
          onChange={handleVisionChange}
          fullWidth
          sx={{ mb: 3 }}
          InputProps={{ readOnly: !isEditing }}
        />

        <TextField
          label="Our Purpose"
          multiline
          minRows={4}
          value={purposeText}
          onChange={handlePurposeChange}
          fullWidth
          sx={{ mb: 3 }}
          InputProps={{ readOnly: !isEditing }}
        />

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          {isEditing && (
            <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? 'Save Changes' : 'Edit'}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
