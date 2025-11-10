'use client'

import { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';

const words = ["Explore", "Learn", "Transform"];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Loop through words every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="xl" sx={{ px: 0 }}>
      <Box
        id="hero"
        sx={{
          minHeight: '20vh',
          background: 'linear-gradient(-45deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite',
          borderRadius: 3,
          p: 6,
          color: 'white',
          textAlign: 'center',
          '@keyframes gradientShift': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            {/* Word 1 */}
            <Box
              component="span"
              sx={{
                transition: 'all 0.8s ease',
                opacity: activeIndex === 0 ? 1 : 0.4,
                transform: activeIndex === 0 ? 'scale(1.2)' : 'scale(1)',
                color: activeIndex === 0 ? '#ffd700' : 'white',
              }}
            >
              {words[0]}
            </Box>

            {/* Fixed hyphen */}
            <Box component="span">-</Box>

            {/* Word 2 */}
            <Box
              component="span"
              sx={{
                transition: 'all 0.8s ease',
                opacity: activeIndex === 1 ? 1 : 0.4,
                transform: activeIndex === 1 ? 'scale(1.2)' : 'scale(1)',
                color: activeIndex === 1 ? '#ffd700' : 'white',
              }}
            >
              {words[1]}
            </Box>

            {/* Fixed hyphen */}
            <Box component="span">-</Box>

            {/* Word 3 */}
            <Box
              component="span"
              sx={{
                transition: 'all 0.8s ease',
                opacity: activeIndex === 2 ? 1 : 0.4,
                transform: activeIndex === 2 ? 'scale(1.2)' : 'scale(1)',
                color: activeIndex === 2 ? '#ffd700' : 'white',
              }}
            >
              {words[2]}
            </Box>
          </Typography>
        </Container>
      </Box>
    </Container>
  );
}
