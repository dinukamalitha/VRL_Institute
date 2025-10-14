'use client'

import React from 'react'
import { TextField, InputAdornment, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  width?: number | string
  size?: 'small' | 'medium'
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  width = 300,
  size = 'small'
}: SearchBarProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        size={size}
        variant="outlined"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          width: width,
          '& .MuiOutlinedInput-root': {
            borderRadius: 1,
            height: size === 'small' ? 40 : 48,
          },
        }}
      />
    </Box>
  )
} 