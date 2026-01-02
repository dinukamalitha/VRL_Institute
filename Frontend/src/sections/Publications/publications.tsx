'use client';

import {Box, Container, Grid, Typography} from '@mui/material';
import PublicationsCard from "@/components/PublicationsCard";
import {useCallback, useEffect, useState} from "react";
import {Publication} from "@/types/publications";
import {getAllPublications, getPublicationCountsByCategory} from "@/api/publications";

export default function PublicationsSection() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})

  // Fetch publications data
  const fetchPageData = useCallback(async () => {
    try {
      const [publicationsResponse, countsResponse] = await Promise.all([
        getAllPublications(),
        getPublicationCountsByCategory()
      ]);

      setPublications(Array.isArray(publicationsResponse) ? publicationsResponse : []);
      console.log(publications)
      setCategoryCounts(countsResponse.data || {});

    } catch (error) {
      console.error('Failed to fetch page data:', error)
    }
  }, []);

  useEffect(() => {
    fetchPageData();
  }, [fetchPageData]);

  const publicationData = [
    {
      category: 'Books',
      image: '/images/books.png',
      count: categoryCounts.Books || 0,
    },
    {
      category: 'Conference Proceedings',
      image: '/images/monograph.jpg',
      count: categoryCounts.Monographs || 0,
    },
    {
      category: 'Dissertations',
      image: '/images/dissertation.jpg',
      count: categoryCounts.Dissertations || 0,
    },
    {
      category: 'Thesis',
      image: '/images/thesis.jpg',
      count: categoryCounts.Thesis || 0,
    },
  ];

  return (
    <Box id="publications" sx={{ py: 8, bgColor: '#f5f5f5' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            Publications
            {/*<Typography sx={{ maxWidth: 700, mx: 'auto', mb: 2, fontSize: '1.25rem', fontWeight: 'semibold' }}>*/}
            {/*  (Books/Monographs/Dissertations/Thesis)*/}
            {/*</Typography>*/}
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
                    isLink={true}
                />
              </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
