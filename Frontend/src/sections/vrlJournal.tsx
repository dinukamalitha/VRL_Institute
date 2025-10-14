'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import journalImage from '@/app/assets/images/journal-Image.jpg';

const JournalSection = () => {
  return (
    <Box id="journals" sx={{ py: 8, bgColor: '#f5f5f5' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#333' }}
        >
          VRL Journal
        </Typography>

        {/* Journal Image */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Image
            src={journalImage} 
            alt="VRL Journal Cover"
            width={400}
            height={600}
            style={{ borderRadius: '12px' }}
          />
        </Box>

        <Typography align="center" color="text.secondary" paragraph>
          Explore - Learn - Transform. <br />
          Multidisciplinary Research for Real-World Impact.
        </Typography>
        <Link href="/journal" passHref>
          <Button variant="contained" color="primary" sx={{ mt: 3 }}>
            See More
          </Button>
        </Link>
      </Container>
    </Box>
  );
};

export default JournalSection;
