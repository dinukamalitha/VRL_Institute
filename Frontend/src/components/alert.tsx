'use client'

import { Snackbar, Alert } from '@mui/material'

interface AlertSnackbarProps {
  open: boolean
  message: string
  severity?: 'success' | 'error' | 'info' | 'warning'
  onClose: () => void
  duration?: number
}

export default function AlertSnackbar({ open, message, severity = 'info', onClose, duration = 4000 }: AlertSnackbarProps) {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
