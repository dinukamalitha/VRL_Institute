'use client'

import { useState, useCallback, useRef } from 'react'
import AlertSnackbar from '@/components/alert'
import {ToastState} from "@/types/components";

export function useToast() {
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: '',
    severity: 'info',
  })

  // store timeout ID to clear when needed
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const showToast = useCallback(
      (message: string, severity: 'success' | 'error' | 'info' | 'warning' = 'info') => {
        // clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        // show toast
        setToast({
          open: true,
          message,
          severity,
        })

        // auto hide after 5s
        timeoutRef.current = setTimeout(() => {
          setToast((prev) => ({ ...prev, open: false }))
        }, 5000)
      },
      []
  )

  const hideToast = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setToast((prev) => ({ ...prev, open: false }))
  }, [])

  const ToastComponent = () => (
      <AlertSnackbar
          open={toast.open}
          message={toast.message}
          severity={toast.severity}
          onClose={hideToast}
      />
  )

  return {
    showToast,
    hideToast,
    ToastComponent,
  }
}
