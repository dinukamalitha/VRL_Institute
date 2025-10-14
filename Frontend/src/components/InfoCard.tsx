'use client'

import { Card, CardContent, Typography, Box } from '@mui/material'
import { FiCalendar, FiClock, FiMapPin, FiUser } from 'react-icons/fi'
import { InfoCardProps } from '@/types/components'
import { useTheme } from '@/hooks/useTheme'

export default function InfoCard({
                                   title,
                                   date,
                                   category,
                                   time,
                                   location,
                                   type,
                                   author,
                                   isEvent = false,
                                   image,
                                 }: InfoCardProps) {
  const { colors, typography, borderRadius, shadows, transitions } = useTheme()

  const imgSrc = Array.isArray(image) ? image[0] : image

  return (
    <Card
      sx={{
        mb: 2,
        transition: transitions.normal,
        border: `1px solid ${colors.neutral.grey[300]}`,
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: shadows.lg,
          borderColor: colors.primary.main,
        },
      }}
    >
      <CardContent sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Category Badge */}
        {category && (
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{
                backgroundColor: colors.primary.main,
                color: colors.primary.contrastText,
                px: 1.5,
                py: 0.5,
                borderRadius: borderRadius.base,
                fontWeight: typography.fontWeight.bold,
                fontSize: typography.fontSize.xs,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {category}
            </Typography>
          </Box>
        )}

        {/* Type Badge */}
        {type && (
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{
                backgroundColor: colors.secondary.main,
                color: colors.primary.contrastText,
                px: 1.5,
                py: 0.5,
                borderRadius: borderRadius.base,
                fontWeight: typography.fontWeight.bold,
                fontSize: typography.fontSize.xs,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {type}
            </Typography>
          </Box>
        )}

        {/* Layout: Thumbnail + Title OR Just Title */}
        {image ? (
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flex: 1 }}>
            {/* Thumbnail */}
            <Box
              component="img"
              src={imgSrc}
              alt={title}
              sx={{
                width: 80,
                height: 80,
                borderRadius: borderRadius.base,
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
            {/* Title */}
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: typography.fontWeight.bold,
                lineHeight: 1.4,
                fontSize: '0.95rem',
                color: colors.text.primary,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                flex: 1,
              }}
            >
              {title}
            </Typography>
          </Box>
        ) : (
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: typography.fontWeight.bold,
              lineHeight: 1.4,
              fontSize: '0.95rem',
              color: colors.text.primary,
              mb: 2,
            }}
          >
            {title}
          </Typography>
        )}

        {/* Date, Time, Location, Author */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
            borderTop: `1px solid ${colors.neutral.grey[100]}`,
            pt: 1.5,
            mt: 'auto',
          }}
        >
          {isEvent ? (
            <>
              <Typography
                variant="body2"
                sx={{
                  color: colors.text.secondary,
                  fontSize: typography.fontSize.xs,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <FiCalendar /> {date}
              </Typography>
              {time && (
                <Typography
                  variant="body2"
                  sx={{
                    color: colors.text.secondary,
                    fontSize: typography.fontSize.xs,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <FiClock /> {time}
                </Typography>
              )}
              {location && (
                <Typography
                  variant="body2"
                  sx={{
                    color: colors.text.secondary,
                    fontSize: typography.fontSize.xs,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <FiMapPin /> {location}
                </Typography>
              )}
            </>
          ) : (
            <>
              <Typography
                variant="body2"
                sx={{
                  color: colors.text.secondary,
                  fontSize: typography.fontSize.xs,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <FiCalendar /> {date} {time ? `• ${time}` : ''}
              </Typography>
              {author && (
                <Typography
                  variant="body2"
                  sx={{
                    color: colors.text.secondary,
                    fontSize: typography.fontSize.xs,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <FiUser /> {author}
                </Typography>
              )}
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}
