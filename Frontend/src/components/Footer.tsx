import { Box, Container, Typography, Grid } from '@mui/material';
import VRLLogo from '@/app/assets/images/VRL.jpg';
import Image from 'next/image';

export default function Footer() {
  return (
    <Box
      id="contact"
      sx={{
        bgcolor: '#1a1a1a',
        color: 'white',
        py: 6,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and About */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: 80, sm: 100, md: 120 }, 
                  height: { xs: 40, sm: 50, md: 60 },  
                  display: 'flex',
                  alignItems: 'center',
                  flex: '0 0 auto',
                }}
              >
                <Image
                  src={VRLLogo}
                  alt="VRL Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 600px) 80px, (max-width: 900px) 100px, 120px"
                  priority
                />
                
              </Box>
              
              <Typography variant="h6" sx={{ color: '#ccc', lineHeight: 1.6, my: 3 }}>
                Veritas Research & Learning Institute
              </Typography>
              <Typography variant="body2" sx={{ color: '#ccc', lineHeight: 1.6, mb: 3 }}>
                Explore - Learn - Transform
              </Typography>

              {/* <Typography variant="body2" sx={{ color: '#ccc', lineHeight: 1.6, mb: 3 }}>
                Empowering minds through innovative education and cutting-edge technology. 
                We are dedicated to advancing knowledge and fostering strategic partnerships 
                for sustainable success in the global marketplace.
              </Typography> */}
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
              Contact Information
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ color: '#ccc', display: 'flex', alignItems: 'center', mb: 1 }}>
                📍 148/2/C, Deniya Road, Polgasovita, Sri Lanka
              </Typography>
              <Typography variant="body2" sx={{ color: '#ccc', display: 'flex', alignItems: 'center', mb: 1 }}>
                📞 +94 70 618 8081
              </Typography>
              <Typography variant="body2" sx={{ color: '#ccc', display: 'flex', alignItems: 'center', mb: 1 }}>
                📧 info@vrlinstitute.lk
              </Typography>
              <Typography variant="body2" sx={{ color: '#ccc', display: 'flex', alignItems: 'center' }}>
                🌐 www.vrlinstitute.lk
              </Typography>
            </Box>
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: '#1877f2',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  }
                }}
              >
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                  f
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: '#1da1f2',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  }
                }}
              >
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                  𝕏
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: '#0077b5',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  }
                }}
              >
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                  in
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: '#ff0000',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  }
                }}
              >
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                  ▶
                </Typography>
              </Box>
            </Box>
            
            {/* Quick Links */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" sx={{ color: '#ccc', cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                About Us
              </Typography>
              <Typography variant="body2" sx={{ color: '#ccc', cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                Our Services
              </Typography>
              <Typography variant="body2" sx={{ color: '#ccc', cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                Research Publications
              </Typography>
              <Typography variant="body2" sx={{ color: '#ccc', cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                Contact Us
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box sx={{ borderTop: '1px solid #333', mt: 4, pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#999' }}>
            © 2024 VRL Institute. All rights reserved. | Designed with ❤️ for innovation and excellence
          </Typography>
        </Box>
      </Container>
    </Box>
  );
} 