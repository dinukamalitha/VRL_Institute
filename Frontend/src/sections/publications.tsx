'use client';

import { Box, Container, Typography } from '@mui/material';

export default function PublicationsSection() {
  return (
    <Box id="services" sx={{ py: 8, bgColor: '#f5f5f5' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            Student Publications
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 2 }}>
            Stay updated with the latest research, partnerships, innovations, and insights from VRL Institute
          </Typography>
          <Box sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            py: 2,
            px: 3,
            borderRadius: 2,
            display: 'inline-block',
            boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)'
          }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              📧 Submit Your Publications
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Send your articles to: <strong>info@vrlinstitute.lk</strong>
            </Typography>
          </Box>
        </Box>
        <Typography align="center" color="text.secondary">
          (Section content coming soon...)
        </Typography>
      </Container>
    </Box>
  );
}
