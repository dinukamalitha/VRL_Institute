'use client'

import Link from 'next/link'
import { Box, Button, Typography, Container, Paper } from '@mui/material'

export default function NotFound() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          p: 4,
        }}
      >
        <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
          <Typography variant="h1" component="h1" color="primary" gutterBottom>
            404
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {"The page you're looking for doesn't exist or has been moved."}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
            <Button component={Link} href="/" variant="contained">
              Go home
            </Button>
            <Button variant="outlined" onClick={() => window.history.back()}>
              Go back
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
} 