import { Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { getHomeContent } from '@/api/home-content'

export const VisionMissionSection = ()=> {
  const [visionText, setVisionText] = useState('');
  const [purposeText, setPurposeText] = useState('');

  // Fetch home content on mount
  useEffect(() => {
    const fetchData = async () => {
      const res = await getHomeContent();
      if (res) {
        setVisionText(res.visionText || '');
        setPurposeText(res.purposeText || '');
      }
    };
    fetchData();
  }, []);

  return (
    <Box id="about" sx={{ py: 4, bgColor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'stretch',
          }}
        >
          {/* Left-Aligned Box */}
          <Box
            sx={{
              p: 3,
              bgColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: 2,
              borderLeft: '4px solid',
              borderColor: 'primary.main',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              maxWidth: 800,
              textAlign: 'left',
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}
            >
              👁️ Our Vision
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontStyle: 'italic',
                color: '#555',
                mb: 1,
                fontWeight: 500,
                fontSize: '1rem',
              }}
            >
              {visionText}
            </Typography>
          </Box>

          {/* Right-Aligned Box */}
          <Box
            sx={{
              p: 3,
              bgColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: 2,
              borderRight: '4px solid',
              borderColor: 'primary.main',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              maxWidth: 800,
              textAlign: 'right',
              ml: 'auto',
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}
            >
              🎯 Our Purpose
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontStyle: 'italic',
                color: '#555',
                mb: 1,
                fontWeight: 500,
                fontSize: '1rem',
              }}
            >
              {purposeText}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default VisionMissionSection;