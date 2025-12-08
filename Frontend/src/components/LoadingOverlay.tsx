'use client'

import { Box, CircularProgress, Backdrop } from '@mui/material'

interface LoadingOverlayProps {
  open: boolean
  message?: string
  fullScreen?: boolean
}

export default function LoadingOverlay({ open, message, fullScreen = false }: LoadingOverlayProps) {
  if (fullScreen) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CircularProgress color="inherit" size={60} />
          {message && (
            <Box sx={{ color: 'white', textAlign: 'center' }}>
              {message}
            </Box>
          )}
        </Box>
      </Backdrop>
    )
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: open ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 1,
        borderRadius: 1,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <CircularProgress size={60} />
        {message && (
          <Box sx={{ color: 'text.primary', textAlign: 'center' }}>
            {message}
          </Box>
        )}
      </Box>
    </Box>
  )
}

