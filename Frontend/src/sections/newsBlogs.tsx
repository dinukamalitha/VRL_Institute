'use client'

import { Box, Container, Typography, Grid, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import InfoCard from '@/components/InfoCard'
import { useEffect, useState } from 'react'
import { SidebarItem } from '@/types/sidebar'
import { getAllNewsBlogs } from '@/api/news-blogs'

interface NewsBlogSectionProps {
  onDataFetched?: (items: SidebarItem[]) => void
}

export default function NewsBlogSection({ onDataFetched }: NewsBlogSectionProps) {
  const router = useRouter()
  const [newsItems, setNewsItems] = useState<SidebarItem[]>([])

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getAllNewsBlogs()
        const raw = Array.isArray(res) ? res : []

        const mapped: SidebarItem[] = raw
          .filter((item: any) => item.status !== 'deleted')
          .map((item: any) => {
            const description = item.description || ''
            const textOnly = description.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
            const excerpt = textOnly.slice(0, 120) + (textOnly.length > 120 ? '…' : '')
            return {
              id: item._id,
              title: item.title,
              excerpt,
              date: item.date || '',
              time: item.time || '',
              category: item.category || '',
              author: item.author || '',
              image: Array.isArray(item.images) ? item.images[0] || '' : '',
            }
          })

        setNewsItems(mapped)
        onDataFetched?.(mapped)
      } catch (e) {
        console.error('Failed to fetch news blogs', e)
      }
    }
    fetchNews()
  }, [onDataFetched])

  return (
    <Box id="newsblog" sx={{ py: 8, backgroundColor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
              Writers' Hub
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 2 }}>
            Stay updated with the latest news blogs from VRL Institute
          </Typography>

          {/* Highlight box */}
          <Box
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              py: 2,
              px: 3,
              borderRadius: 2,
              display: 'inline-block',
              boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)',
              mb: 4
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              📧 Submit Your Blog Articles here...
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              <strong>info@vrlinstitute.lk</strong>
            </Typography>
          </Box>
        </Box>

        {/* News grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {newsItems.slice(0, 6).map((news, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  const articleId = news.title.toLowerCase().replace(/[^a-z0-9]/g, '-')
                  router.push(`/news-blogs?article=${articleId}`)
                }}
              >
                <InfoCard {...news} isEvent={false} />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Show More */}
        {newsItems.length > 6 && (
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => router.push('/news-blogs')}
            >
              Show More News
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  )
}
