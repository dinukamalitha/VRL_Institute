import { Container, Typography, Grid } from '@mui/material';
import ResourcePersonCard from './ResourcePersonCard';
import { getAllResourcePersons } from '@/api/resourcePersons'
import { useEffect, useState } from 'react'
import { ResourcePerson } from '@/types/components'

export default function ResourcePersonsSection() {
  const [resourcePersons, setResourcePersons] = useState<ResourcePerson[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllResourcePersons();
      console.log("API response:", res);
      setResourcePersons(Array.isArray(res) ? res : []);
    };
    fetchData();
  }, []);


  const firstRow = resourcePersons.slice(0, 3);
  const secondRow = resourcePersons.slice(3);

  return (
    <Container id="resource-persons" maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        component="h2"
        textAlign="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#333', mb: 6 }}
      >
        Key Resource Personnel
      </Typography>

      <Grid container spacing={6} justifyContent="center">
        {firstRow.map((person, index) => (
          <Grid item xs={12} sm={6} md={4} key={`row1-${person._id || index}`}>
            <ResourcePersonCard person={person} />
          </Grid>
        ))}
      </Grid>

      {secondRow.length > 0 && (
        <Grid container spacing={6} justifyContent="center" sx={{ mt: 2 }}>
          {secondRow.map((person, index) => (
            <Grid item xs={12} sm={6} md={4} key={`row2-${person._id || index}`}>
              <ResourcePersonCard person={person} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
