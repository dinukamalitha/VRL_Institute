'use client';

import {Box, Container, Grid, Typography} from '@mui/material';
import PublicationsCard from "@/components/PublicationsCard";
import {useEffect, useState} from "react";
import {Publication} from "@/types/sections";
import {getAllPublications} from "@/api/publications";

export default function PublicationsSection() {
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllPublications();
      console.log("API response:", res);
      setPublications(Array.isArray(res) ? res : []);
    };
    fetchData();
  }, []);

  const publicationData = [
    {
      category: 'Books',
      image: '/images/books.jpg',
      count: 0,
    },
    {
      category: 'Monographs',
      image: '/images/monographs.jpg',
      count: 0,
    },
    {
      category: 'Dissertations',
      image: '/images/dissertations.jpg',
      count: 0,
    },
    {
      category: 'Thesis',
      image: '/images/thesis.jpg',
      count: 0,
    },
  ];

  return (
    <Box id="publications" sx={{ py: 8, bgColor: '#f5f5f5' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            Publications
            <Typography sx={{ maxWidth: 700, mx: 'auto', mb: 2, fontSize: '1.25rem', fontWeight: 'semibold' }}>
              (Books/Monographs/Dissertations/Thesis)
            </Typography>
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 2 }}>
            Stay updated with the latest research, partnerships, innovations, and insights from VRL Institute
          </Typography>

          <Box sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            py: 2,
            px: 3,
            borderRadius: 2,
            display: 'inline-block',
            boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)'
          }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              📧 Submit Your publications here...
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Send your articles to: <strong>info@vrlinstitute.lk</strong>
            </Typography>
          </Box>
        </Box>

        {/* Grid of Publication Cards */}
        <Grid container spacing={3}>
          {publicationData.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <PublicationsCard
                    category={item.category}
                    image={item.image}
                    count={item.count}
                />
              </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
