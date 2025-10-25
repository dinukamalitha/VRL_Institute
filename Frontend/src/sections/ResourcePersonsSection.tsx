import { Container, Typography, Grid } from '@mui/material';
import ResourcePersonCard from './ResourcePersonCard';
import { getAllResourcePersons } from '@/api/resourcePersons'
import { useEffect, useState } from 'react'
import { ResourcePerson } from '@/types/components'
import SupportStaffCard from "@/components/SupportStaffCard";
import {getAllStaffMembers} from "@/api/staff";
import {StaffMember} from "@/types/sections";

export default function ResourcePersonsSection() {
  const [resourcePersons, setResourcePersons] = useState<ResourcePerson[]>([]);
  const [supportStaff, setSupportStaff] = useState<StaffMember[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllResourcePersons();
      console.log("API response:", res);
      setResourcePersons(Array.isArray(res) ? res : []);
    };
    fetchData();
  }, []);

  useEffect(() => {
      const fetchData = async () => {
          const res = await getAllStaffMembers();
          console.log("API response:", res);
          setSupportStaff(Array.isArray(res) ? res : []);
      };
      fetchData();
 }, []);


  const firstRow = resourcePersons.slice(0, 3);
  const secondRow = resourcePersons.slice(3);

    const staffMembers = [
        {
            name: 'Jane Doe',
            role: 'Program Coordinator',
            image: "staff1Img",
            description: 'Jane coordinates all VRL events and assists researchers with publication processes.',
        },
        {
            name: 'John Smith',
            role: 'Research Assistant',
            image: "staff2Img",
            description: 'John supports data collection, statistical analysis, and manuscript preparation.',
        },
    ];

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

        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mt: 8, mb:4 }}>
            Admin & Tech Support
        </Typography>

        <Grid container spacing={3}>
            {supportStaff.map((staff, index) => (
                <Grid item xs={12} sm={6} key={index}>
                    <SupportStaffCard
                        staff={staff}
                        width={250}
                    />
                </Grid>
            ))}
        </Grid>
    </Container>
  );
}
