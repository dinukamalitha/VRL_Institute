'use client'

import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, Box, SelectProps } from '@mui/material'

interface CategoryDropdownProps {
  value: string
  onChange: (value: string) => void
  label?: string
  categories?: string[]
  required?: boolean
  fullWidth?: boolean
  size?: 'small' | 'medium'
  variant?: SelectProps['variant']
  sx?: any
}

export default function CategoryDropdown({
                                           value,
                                           onChange,
                                           label = "Category",
                                           categories = [],
                                           required = false,
                                           fullWidth = true,
                                           size = 'small',
                                           variant = 'outlined',
                                           sx,
                                         }: CategoryDropdownProps) {
  return (
    <Box sx={{ mt: 2, mb: 1 }}>
      <FormControl fullWidth={fullWidth} size={size} required={required} sx={sx} variant={variant}>
        <InputLabel id="category-select-label">{label}</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={value}
          label={label}
          onChange={(e) => onChange(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E91E63',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#C2185B',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E91E63',
            },
            height: size === 'small' ? '40px' : '50px',
          }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
