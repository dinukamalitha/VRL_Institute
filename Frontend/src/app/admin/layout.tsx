'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/sections/AdminLayout'
import { useAuth } from '@/app/context/authContext'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminRootLayout({ children }: AdminLayoutProps) {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'ADMIN') {
      router.push('/') // redirect to root if not authorized
    }
  }, [isAuthenticated, user, router])

  // Show nothing while checking auth
  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return null
  }

  return <AdminLayout>{children}</AdminLayout>
}
