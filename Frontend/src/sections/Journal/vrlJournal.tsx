'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import {useEffect, useState} from "react";
import {useToast} from "@/hooks/useToast";
import {getJournalContent} from "@/api/journal-content";

const JournalSection = () => {
  const [journalContent, setJournalContent] = useState<any>(null)
  const { showToast, ToastComponent } = useToast()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        const content = await getJournalContent()
        if (content) {
          setJournalContent(content)
        }
      } catch {
        showToast('Failed to load journal content. Please try again later.', 'error')
      } finally {
        setLoading(false)
      }
    }
    fetchContent()
  }, [showToast])

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
        {/* <Box sx={{ position: 'relative', width: '100%', height: 600, mb: 3 }}>
          {!loading && (
              <Box sx={{ position: 'relative', width: '100%', height: 600, mb: 3 }}>
                <Image
                    src={journalContent?.imageUrl}
                    alt="VRL Journal Cover"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
              </Box>
          )}
        </Box> */}

        {/* ISSN Number */}
        <Box sx={{mb: 2, bgcolor: 'background.paper', borderRadius: 2 }}>

          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 900, 
              color: 'primary.main', 
              letterSpacing: 2,
              textTransform: 'uppercase'
            }}
          >
            ISSN 3121-3073
          </Typography>
        </Box>


        <Typography 
          align="center" 
          color="text.secondary" 
          paragraph
          sx={{
            fontWeight: 500,
            fontSize: '1.2rem'
          }}
        >
          Explore - Learn - Transform. <br />
          Multidisciplinary Research for Real-World Impact.
        </Typography>
        <Link href="/journal" passHref>
          <Button variant="outlined" color="primary" sx={{ mt: 3 }}>
            See More...
          </Button>
        </Link>
      </Container>
      <ToastComponent />
    </Box>
  );
};

export default JournalSection;
