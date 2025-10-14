'use client'

import React from 'react'
import TextField from '@mui/material/TextField'
import { SxProps, Theme } from '@mui/material/styles'

export interface FormTextFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  fullWidth?: boolean
  type?: string
  placeholder?: string
  multiline?: boolean
  rows?: number
  margin?: 'none' | 'dense' | 'normal'
  helperText?: React.ReactNode
  error?: boolean
  sx?: SxProps<Theme>
  disabled?: boolean
  size?: 'small' | 'medium'
}

export default function FormTextField({
  label,
  value,
  onChange,
  required,
  fullWidth = true,
  type,
  placeholder,
  multiline,
  rows,
  margin = 'normal',
  helperText,
  error,
  sx,
  disabled,
  size = 'small',
}: FormTextFieldProps) {
  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      margin={margin}
      required={required}
      type={type}
      placeholder={placeholder}
      multiline={multiline}
      rows={rows}
      helperText={helperText}
      error={error}
      sx={sx}
      disabled={disabled}
      size={size}
    />
  )
}


