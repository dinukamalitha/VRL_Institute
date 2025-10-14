'use client'

import React from 'react'
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Box
} from '@mui/material'

interface FormDialogProps {
  open: boolean
  onClose: () => void
  onSave: () => void
  title: string
  children: React.ReactNode
  saveButtonText?: string
  cancelButtonText?: string
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  loading?: boolean
  disableSave?: boolean
}

export default function FormDialog({
  open,
  onClose,
  onSave,
  title,
  children,
  saveButtonText = 'Save',
  cancelButtonText = 'Cancel',
  maxWidth = 'md',
  fullWidth = true,
  loading = false,
  disableSave = false
}: FormDialogProps) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth={maxWidth} 
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        }
      }}
    >
      <DialogTitle sx={{ 
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#f8f9fa',
        fontWeight: 'bold',
        color: '#333'
      }}>
        {title}
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ pt: 1 }}>
          {children}
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ 
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#f8f9fa',
        px: 3,
        py: 2
      }}>
        <Button 
          onClick={onClose}
          sx={{
            color: '#666',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            }
          }}
        >
          {cancelButtonText}
        </Button>
        <Button 
          onClick={onSave} 
          variant="contained"
          disabled={loading || disableSave}
          sx={{
            background: 'linear-gradient(45deg, #E91E63 30%, #9C27B0 90%)',
            color: 'white',
            fontWeight: 'bold',
            '&:hover': {
              background: 'linear-gradient(45deg, #C2185B 30%, #7B1FA2 90%)',
            },
            '&:disabled': {
              background: '#ccc',
              color: '#666',
            }
          }}
        >
          {loading ? 'Saving...' : saveButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
} 