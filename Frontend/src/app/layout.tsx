import type { Metadata } from 'next'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import 'react-quill/dist/quill.snow.css'
import ThemeRegistry from '@/components/ThemeRegistry'
import { AuthProvider } from '@/context/authContext'

export const metadata: Metadata = {
  title: 'VRL Institute',
  description: 'A modern Next.js application with Material-UI',
  keywords: ['Next.js', 'React', 'TypeScript', 'Material-UI'],
  icons: {
    icon: '/images/favicon.ico',
  },
  authors: [{ name: 'VRL Team' }],
  robots: 'index, follow',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ThemeRegistry>
          <AuthProvider>{children}</AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
} 