'use client';

import { Box, Container, Typography, Divider } from '@mui/material'
import Navbar from '@/components/Navbar'
import { NavLink } from '@/types/navbar'
import EventsSidebar from '@/sections/events-sidebar'
import Image from 'next/image'
import journalImage from '@/app/assets/images/journal-Image.jpg'
import Footer from '@/components/Footer'

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'News Blog', href: '/news-blogs' },
  { label: 'Services', href: '/#services' },
  { label: 'Events & Programs', href: '#events' },
  { label: 'Publications', href: '/#publications' },
  { label: 'VRL Journal', href: '/#journals' },
  { label: 'Contact', href: '/#contact' },
]

export default function JournalPage() {
  return (
    <>
      <Navbar navLinks={navLinks} logoSize="medium" />
      <main>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>

          {/* Main Journal Content */}
          <Box sx={{ flex: 1, py: 8, px: 3, bgColor: '#fff' }}>
            <Container maxWidth="md">
              <Typography
                variant="h3"
                align="center"
                gutterBottom
                sx={{ fontWeight: 'bold', color: '#333' }}
              >
                VRL Journal
              </Typography>

              <Typography align="center" color="text.secondary" paragraph>
                {"Welcome to the official Veritas Research & Learning Journal (VRLJ)."}
                {"Explore our multidisciplinary research publications that bridge theory and practice for real-world impact."}
              </Typography>

              {/* Journal Image */}
              <Box sx={{ position: 'relative', width: '100%', height: 600, mb: 3 }}>
                <Image
                    src={journalImage}
                    alt="VRL Journal Cover"
                    fill
                    style={{ objectFit: 'cover', borderRadius: '12px' }}
                />
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Aim of the Journal */}
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Aim of the Journal
              </Typography>
              <Typography paragraph>
                {"The Veritas Research & Learning Journal (VRLJ) dedicates itself to fostering high-quality, multidisciplinary research that connects theory and practice."}
                {"The journal aims to disseminate impactful knowledge that fosters innovation, informs policy, and contributes to real-world problem-solving across diverse academic and professional domains."}
              </Typography>

              {/* Screening & Peer Review */}
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mt: 3 }}>
                Initial Screening and Peer Review Process
              </Typography>
              <Typography paragraph>
                {"Upon submission, one of the editors will conduct a preliminary review to assess the manuscript's relevance, quality, and compliance with journal guidelines."}
                {"If deemed suitable, the manuscript will then undergo a double-blind peer review process by two independent reviewers, ensuring objectivity and academic rigor."}
              </Typography>

              {/* Publication Policy */}
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mt: 3 }}>
                Publication Policy
              </Typography>
              <Typography paragraph>
                {"VRLJ is a digital-only journal. Accepted articles will be published online within two weeks of the final manuscript submission."}
                {"A compiled electronic book version of the journal will be released semiannually (two volumes per year) and will be available for download. Printed versions can be obtained by interested parties."}
                {"A nominal publication fee is charged to cover administrative costs. Authors are solely responsible for the contents, plagiarism, and language quality of their submitted manuscripts."}
              </Typography>

              {/* Open Access */}
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mt: 3 }}>
                Open Access Policy
              </Typography>
              <Typography paragraph>
                {"This journal provides immediate and free open access to all its content, based on the principle that freely available research promotes a greater global exchange of knowledge and supports academic development."}
              </Typography>

              {/* Publisher & Editors */}
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mt: 3 }}>
                Publisher & Chief Editors
              </Typography>
              <Typography paragraph>
                <strong>Publisher:</strong> Veritas Research & Learning Institute <br />
                <strong>Chief Editors:</strong> Dr. Susil Kumara Silva, Dr. Jayantha Balasooriya, Dr. Mihira Wanninayake
              </Typography>

              {/* Submission */}
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mt: 3 }}>
                Submit Your Paper
              </Typography>
              <Typography paragraph>
                Email your manuscript to: <strong>infor@vrlj.com</strong>
              </Typography>

              {/* Instructions for Authors */}
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mt: 3 }}>
                Instructions for Authors
              </Typography>
              <Typography paragraph>
                <strong>Typographic guidance:</strong><br />
                Body text: Times New Roman, 11pt minimum, normal style.<br />
                Headings: Times New Roman, 11pt minimum, bold style.<br />
                Page setup: 2.54 cm margins on all sides, single line spacing.<br /><br />
                <strong>Maximum Word Count:</strong> 8,000 words (excluding references, appendices, tables, title, and abstract). Abstract ≤ 400 words.<br /><br />
                <strong>Referencing & Professionalism:</strong> Identify and acknowledge all sources, use consistent referencing style (Harvard or APA), maintain high-quality English. Diagrams, tables, and figures should be included in the main text; large tables may go in appendices.
              </Typography>

              {/* Button for latest PDF */}
              {/*<Box sx={{ textAlign: 'center', mt: 5 }}>*/}
              {/*  <Button*/}
              {/*    variant="outlined"*/}
              {/*    color="primary"*/}
              {/*    href="/VRL Journal_V1_01.pdf"*/}
              {/*    target="_blank"*/}
              {/*  >*/}
              {/*    Open Latest Journal (PDF)*/}
              {/*  </Button>*/}
              {/*</Box>*/}
            </Container>
          </Box>

          {/* Right Sidebar (Events) */}
          <EventsSidebar/>

        </Box>
      </main>
      <Footer />
    </>
  )
}
