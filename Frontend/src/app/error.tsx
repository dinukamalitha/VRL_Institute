'use client'

import { useEffect } from 'react'
import { Box, Button, Typography, Container, Paper } from '@mui/material'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

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
          <Typography variant="h4" component="h2" gutterBottom>
            Something went wrong!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            An unexpected error occurred. Please try again or contact support if the
            problem persists.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
            <Button onClick={reset} variant="contained">
              Try again
            </Button>
            <Button onClick={() => window.location.href = '/'} variant="outlined">
              Go home
            </Button>
          </Box>
          {process.env.NODE_ENV === 'development' && (
            <Box sx={{ mt: 3, textAlign: 'left' }}>
              <Typography variant="subtitle2" sx={{ cursor: 'pointer', mb: 1 }}>
                Error details
              </Typography>
              <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                <Typography variant="caption" component="pre" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {error.message}
                </Typography>
              </Paper>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  )
} 