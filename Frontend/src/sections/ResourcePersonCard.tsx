'use client';

import { useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { ResourcePerson } from '@/types/components';

export interface ResourcePersonCardProps {
  person: ResourcePerson;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export default function ResourcePersonCard({ person }: ResourcePersonCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: hovered ? 500 : 450,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-6px)',
        },
      }}
    >
      <Box
        sx={{
          height: 400,
          overflow: 'hidden',
          position: 'relative',
          bgColor: 'grey.200',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: person.photo ? `url(${person.photo})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {!person.photo && (
          <Typography variant="h4" sx={{ color: 'grey.500' }}>
            👤
          </Typography>
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center', fontSize: '1.1rem' }}
        >
          {person.name}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main', fontSize: '0.875rem', fontWeight: 500 }}>
            {hovered ? <KeyboardArrowUp fontSize="large" /> : <KeyboardArrowDown fontSize="large" />}
          </Box>
        </Box>

        {hovered && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              maxHeight: 300,
              overflowY: 'auto',
              animation: 'fadeIn 0.3s ease-in-out',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: 1,
              backgroundColor: 'rgba(0,0,0,0.02)',
              '@keyframes fadeIn': {
                '0%': { opacity: 0, transform: 'translateY(-10px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
              },
              '&::-webkit-scrollbar': { width: '8px' },
              '&::-webkit-scrollbar-track': { background: 'rgba(0,0,0,0.05)', borderRadius: '4px' },
              '&::-webkit-scrollbar-thumb': { background: 'rgba(0,0,0,0.2)', borderRadius: '4px', '&:hover': { background: 'rgba(0,0,0,0.3)' } },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.7,
                fontSize: '0.875rem',
                textAlign: 'justify',
                '& p': { marginBottom: 1 },
              }}
            >
              {person.description}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
