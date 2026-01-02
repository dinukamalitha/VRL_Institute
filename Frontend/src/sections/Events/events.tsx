'use client'

import { Box, Container, Typography, Grid, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import InfoCard from '@/components/InfoCard'
import { useEffect, useState } from 'react'
import { SidebarItem } from '@/types/sidebar'
import { getAllEvents } from '@/api/events'
import { EventItem } from '@/types/event'

interface EventsSectionProps {
  onDataFetched?: (items: SidebarItem[]) => void
}

export default function EventsSection({ onDataFetched }: EventsSectionProps) {
  const router = useRouter()
  const [events, setEvents] = useState<SidebarItem[]>([])
  const [showAllEvents, setShowAllEvents] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getAllEvents()
        console.log(res)
        const raw = Array.isArray(res) ? res : []

        const mapped: SidebarItem[] = raw
          .filter((item: EventItem) => item.status !== 'deleted')
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
              location: item.location || '',
              type: item.type || '',
              image: Array.isArray(item.images) ? item.images[0] || '' : '',
            }
          })
        setEvents(mapped)
        onDataFetched?.(mapped)
      } catch (e) {
        console.error('Failed to fetch events', e)
      }
    }
    fetchEvents()
  }, [onDataFetched])

  return (
    <Box id="events" sx={{ py: 8, bgColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            Events & Programs
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {(showAllEvents ? events : events.slice(0, 6)).map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={event.id || index}>
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  const eventId = event.title.toLowerCase().replace(/[^a-z0-9]/g, '-')
                  router.push(`/events?event=${eventId}`)
                }}
              >
                <InfoCard
                  {...event}
                  image={Array.isArray(event.image) ? event.image[0] : event.image}
                  isEvent={true}
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        {events.length > 6 && !showAllEvents && (
          <Box sx={{ textAlign: 'center' }}>
              <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setShowAllEvents(true)}
              >
                Show More ...
              </Button>
          </Box>
        )}
      </Container>
    </Box>
  )
}
