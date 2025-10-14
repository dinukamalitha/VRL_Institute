'use client';

import { Box, Container, Typography, Card, CardContent, Grid } from '@mui/material';
import { services } from '@/app/data/data'

export default function ServicesSection() {

  return (
    <Box id="services" sx={{ py: 8, bgColor: '#f5f5f5' }}>
      <Container maxWidth="md">
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          {"Here's How We Support You!"}
        </Typography>
        <Typography align="center" color="text.secondary">
          Eight ways we partner to turn research and strategy into measurable results.
        </Typography>

        <Grid container spacing={2} sx={{ mt: 6 }}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <service.Icon sx={{ fontSize: 40, color: 'primary.main' }} />
                  <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {service.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}