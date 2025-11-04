'use client'

import { Box, Container, Typography, Grid, Card, CardContent, Button, Chip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import AdminResourcePersonsSection from '@/sections/Admin_ResourcePersonsSection'
import AdminHome from '@/sections/AdminHome'
import AdminStaffSection from "@/sections/AdminStaffSection";

export default function DashboardPage() {

  const stats = [
    { title: 'Total Users', value: '1,234', color: '#E91E63', change: '+12%' },
    { title: 'Publications', value: '567', color: '#9C27B0', change: '+8%' },
    { title: 'Events', value: '89', color: '#2196F3', change: '+15%' },
    { title: 'Research Projects', value: '45', color: '#4CAF50', change: '+5%' },
  ]


  const services = [
    { title: "Online Courses", description: "High-quality online learning content" },
    { title: "Workshops", description: "Hands-on workshops and seminars" },
  ]

  return (
    <Container maxWidth="xl">
      {/* Admin Hero Section */}
      <Box sx={{
        background: 'linear-gradient(-45deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
        borderRadius: 3,
        p: 4,
        mb: 4,
        color: 'white',
        textAlign: 'center'
      }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Welcome to Admin Dashboard
        </Typography>
        <Typography variant="h6" sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          Manage VRL Institute content, users, and events
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              mr: 2,
              background: 'rgba(255,255,255,0.2)',
              '&:hover': { background: 'rgba(255,255,255,0.3)' }
            }}
          >
            Add New Content
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: 'white',
              borderColor: 'white',
              '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            View Analytics
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card sx={{
              height: '100%',
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e0e0e0',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                borderColor: stat.color
              }
            }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom sx={{ fontWeight: 500 }}>
                  {stat.title}
                </Typography>
                <Typography variant="h4" component="div" sx={{ color: stat.color, fontWeight: 'bold' }}>
                  {stat.value}
                </Typography>
                <Chip
                  label={stat.change}
                  size="small"
                  sx={{
                    backgroundColor: stat.color,
                    color: 'white',
                    mt: 1,
                    fontWeight: 'bold'
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Vision & Mission Section */}
      <AdminHome/>

      {/* Resource Persons Section */}
      <AdminResourcePersonsSection/>

      {/*Admin & Tech Support Section*/}
      <AdminStaffSection/>

      {/* Services Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Services</Typography>
          <Button size="small" startIcon={<AddIcon />} variant="outlined">Add</Button>
        </Box>
        <Grid container spacing={2}>
          {services.map((service, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card sx={{ position: 'relative', p: 2 }}>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                  Edit
                </Button>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{service.title}</Typography>
                <Typography variant="body2">{service.description}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </Container>
  )
}
