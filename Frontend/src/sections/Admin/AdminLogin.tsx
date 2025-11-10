'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Box,
  Divider,
  IconButton,
  InputAdornment,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import CloseIcon from '@mui/icons-material/Close'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { loginUser } from '@/api/auth'
import { useAuth } from '@/context/authContext'

interface LoginDialogProps {
  open: boolean
  onClose: () => void
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose }) => {
  const router = useRouter()
  const { login } = useAuth()
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await loginUser(loginData)
      if (result) {
        login(result.user, result.token)

        if (result.user.role === 'ADMIN') {
          router.push('/admin/dashboard')
        } else {
          router.push('/dashboard')
        }
      } else {
        alert('Invalid email or password')
      }
    } catch (err) {
      console.error('Login failed:', err)
      alert('Login failed, please try again')
    } finally {
      setLoading(false)
      onClose()
    }
  }

  const handleCancel = () => {
    setLoginData({ email: '', password: '' })
    setShowPassword(false)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: 'linear-gradient(135deg, #fff 40%, #f3e5f5 100%)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          overflow: 'hidden',
        },
      }}
    >
      {/* Close button */}
      <IconButton
        onClick={handleCancel}
        sx={{ position: 'absolute', right: 12, top: 12, color: 'grey.600' }}
      >
        <CloseIcon />
      </IconButton>

      <Box textAlign="center" py={3}>
        <LockOutlinedIcon sx={{ fontSize: 48, color: '#E91E63', mb: 1 }} />
        <Typography variant="h5" sx={{ color: '#E91E63', fontWeight: 'bold', mb: 0.5 }}>
          VRL Institute
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Sign in to your account
        </Typography>
      </Box>

      <Divider />

      <form onSubmit={handleLoginSubmit}>
        <DialogContent sx={{ pt: 3, pb: 1 }}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={loginData.email}
            onChange={handleLoginChange}
            margin="normal"
            required
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={loginData.password}
            onChange={handleLoginChange}
            margin="normal"
            required
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, display: 'flex', gap: 2 }}>
          <Button
            onClick={handleCancel}
            fullWidth
            variant="outlined"
            disabled={loading}
            sx={{
              textTransform: 'none',
              borderRadius: 3,
              py: 1.2,
              borderColor: 'grey.400',
              color: 'grey.700',
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              textTransform: 'none',
              borderRadius: 3,
              py: 1.2,
              background: 'linear-gradient(45deg, #E91E63, #9C27B0)',
              fontWeight: 'bold',
              '&:hover': {
                background: 'linear-gradient(45deg, #C2185B, #7B1FA2)',
              },
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default LoginDialog
