'use client';

import { Box, Container, Typography, Divider, Button, Chip, Paper, Breadcrumbs, Link as MuiLink } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavLinks } from '@/hooks/useNavLinks';
import { useParams, useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LabelIcon from '@mui/icons-material/Label';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useEffect, useState } from 'react';

interface JournalArticle {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  keywords: string[];
  publishDate: string;
  volume: string;
  issue: string;
  year: string;
  pages?: string;
  doi?: string;
  category?: string;
  thumbnail?: string;
  pdfUrl?: string;
  peerReviewed?: boolean;
}

export default function JournalArticlePage() {
  const params = useParams();
  const router = useRouter();
  const navLinks = useNavLinks();
  const [article, setArticle] = useState<JournalArticle | null>(null);
  const [loading, setLoading] = useState(true);

  // Sample article data - In production, fetch from API using articleId
  useEffect(() => {
    // TODO: Replace with actual API call
    const articleId = params.articleId as string;
    
    // Sample data based on article ID
    const sampleArticles: { [key: string]: JournalArticle } = {
      'factors-affecting-to-acceptance-and-adaption-of-hr-analytics': {
        id: '1',
        title: 'Factors Affecting to Acceptance and Adaption of HR Analytics of Apparel Companies in Western province Sri Lanka',
        authors: ['D. M. T. D. Dissanayake', 'A. G. M. A. Kumari'],
        abstract: 'This study examines the factors influencing the adoption and acceptance of Human Resource (HR) analytics in Sri Lanka\'s apparel industry, focusing on bridging the gap between theoretical advancements and practical implementation. As HR analytics becomes an essential strategic tool for human capital management, understanding its key drivers is crucial. This research explores the impact of social influence, resource availability, data availability, and HR professionals\' self-efficacy on adopting of HR analytics technologies. Using a cross-sectional survey of HR experts in apparel companies, the study finds strong positive relationships among these factors, with data availability and self-efficacy emerging as the most significant predictors. While resource availability shows a positive association, its impact on adoption remains statistically insignificant. The findings highlight the necessity of equipping HR professionals with the required tools and fostering confidence in analytics-driven decision-making. Organizations should prioritize structured training programs and create supportive environments that enable HR specialists to engage effectively with analytics. By addressing key barriers to data-driven HR practices, this study contributes to the broader understanding of HR analytics adoption in developing economies and provides insights applicable to other labor-intensive industries.',
        keywords: ['Acceptance', 'Adoption', 'Apparel industry', 'Data availability', 'HR analytics', 'Self-efficacy', 'Social influence'],
        publishDate: 'Jun 1, 2025',
        volume: '1',
        issue: '1',
        year: '2025',
        pages: '19-38',
        doi: '10.4038/vrlj.v1i1.1',
        category: 'HR Analytics',
        pdfUrl: '/VRL_Journal_V1_01.pdf',
        peerReviewed: true,
      },
      'employee-work-engagement-an-analysis-of-antecedents': {
        id: '2',
        title: 'Employee Work Engagement: An Analysis of Antecedents in Teaching Context',
        authors: ['Susil K. Silva', 'Jayantha N. Dewasiri', 'Lilani S. Dangalla'],
        abstract: 'This research investigates the antecedents of employee work engagement within the teaching profession, examining how various factors contribute to teachers\' commitment and involvement in their work. The study employs a comprehensive survey methodology to explore the relationships between organizational support, job resources, personal resources, and work engagement among educators. Findings reveal significant positive associations between perceived organizational support and work engagement, with job resources such as autonomy, feedback, and social support playing crucial mediating roles. Personal resources, including self-efficacy and optimism, also demonstrate strong predictive power for work engagement. The research contributes to the understanding of engagement dynamics in educational settings and provides practical insights for educational institutions seeking to enhance teacher motivation and performance.',
        keywords: ['Work engagement', 'Teaching', 'Antecedents', 'Organizational support', 'Job resources'],
        publishDate: 'Jun 1, 2025',
        volume: '1',
        issue: '1',
        year: '2025',
        pages: '39-58',
        doi: '10.4038/vrlj.v1i1.2',
        category: 'Human Resources',
        pdfUrl: '/VRL_Journal_V1_01.pdf',
        peerReviewed: true,
      },
      'impact-of-social-media-usage-on-psychological-wellbeing': {
        id: '3',
        title: 'Impact of Social Media Usage on Psychological Wellbeing of Undergraduates at a Selected State University of Sri Lanka: The Mediating Role of Smartphone Addiction',
        authors: ['W. M. A. G. N. K. Wasala', 'K. A. K. S. Rathnakara'],
        abstract: 'This study explores the complex relationship between social media usage, smartphone addiction, and psychological wellbeing among undergraduate students in Sri Lanka. The research employs a quantitative approach to examine how excessive social media consumption affects mental health outcomes, with smartphone addiction serving as a mediating variable. Results indicate a significant negative relationship between social media usage and psychological wellbeing, with smartphone addiction partially mediating this relationship. The findings highlight the need for educational institutions to develop interventions that promote healthy technology use and support student mental health. The study contributes to the growing body of literature on digital wellbeing and provides evidence-based recommendations for addressing technology-related mental health challenges in academic environments.',
        keywords: ['Social media', 'Psychological wellbeing', 'Smartphone addiction', 'Undergraduates', 'Mental health'],
        publishDate: 'Jun 1, 2025',
        volume: '1',
        issue: '1',
        year: '2025',
        pages: '59-78',
        doi: '10.4038/vrlj.v1i1.3',
        category: 'Psychology',
        pdfUrl: '/VRL_Journal_V1_01.pdf',
        peerReviewed: true,
      },
    };

    // Simulate API call
    setTimeout(() => {
      const foundArticle = sampleArticles[articleId];
      if (foundArticle) {
        setArticle(foundArticle);
      }
      setLoading(false);
    }, 500);
  }, [params.articleId]);

  if (loading) {
    return (
      <>
        <Navbar navLinks={navLinks} logoSize="medium" />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <Typography>Loading article...</Typography>
        </Box>
        <Footer />
      </>
    );
  }

  if (!article) {
    return (
      <>
        <Navbar navLinks={navLinks} logoSize="medium" />
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Typography variant="h4" gutterBottom>Article Not Found</Typography>
          <Button startIcon={<ArrowBackIcon />} onClick={() => router.push('/journal')}>
            Back to Journal
          </Button>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar navLinks={navLinks} logoSize="medium" />
      <main>
        <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Breadcrumbs */}
            <Breadcrumbs sx={{ mb: 3 }}>
              <MuiLink
                component="button"
                onClick={() => router.push('/journal')}
                sx={{ cursor: 'pointer', textDecoration: 'none' }}
              >
                Journal
              </MuiLink>
              <Typography color="text.primary">Articles</Typography>
              <Typography color="text.primary">{article.title.substring(0, 30)}...</Typography>
            </Breadcrumbs>

            {/* Back Button */}
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => router.push('/journal')}
              sx={{ mb: 3 }}
            >
              Back to Journal
            </Button>

            {/* Article Header */}
            <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: '#1a1a1a',
                    mb: 3,
                    lineHeight: 1.3,
                  }}
                >
                  {article.title}
                </Typography>

                {/* Authors */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Authors
                    </Typography>
                  </Box>
                  <Box sx={{ pl: 3 }}>
                    {article.authors.map((author, index) => (
                      <Typography key={index} variant="body1" sx={{ mb: 0.5 }}>
                        • {author}
                      </Typography>
                    ))}
                  </Box>
                </Box>

                {/* Publication Details */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                  <Chip
                    icon={<CalendarTodayIcon />}
                    label={`Published: ${article.publishDate}`}
                    variant="outlined"
                  />
                  <Chip
                    label={`Volume ${article.volume}, Issue ${article.issue}, ${article.year}`}
                    variant="outlined"
                  />
                  {article.pages && (
                    <Chip label={`Pages: ${article.pages}`} variant="outlined" />
                  )}
                  {article.doi && (
                    <Chip label={`DOI: ${article.doi}`} variant="outlined" />
                  )}
                  {article.peerReviewed && (
                    <Chip
                      icon={<VerifiedIcon />}
                      label="Peer Reviewed"
                      color="success"
                      variant="outlined"
                    />
                  )}
                </Box>

                {/* Download Button */}
                {article.pdfUrl && (
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    href={article.pdfUrl}
                    target="_blank"
                    sx={{
                      mb: 2,
                      py: 1.5,
                      px: 3,
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      borderRadius: 2,
                    }}
                  >
                    Download PDF (English)
                  </Button>
                )}
              </Box>
            </Paper>

            {/* Abstract Section */}
            <Paper elevation={1} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ArticleIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Abstract
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  color: 'text.primary',
                  textAlign: 'justify',
                }}
              >
                {article.abstract}
              </Typography>
            </Paper>

            {/* Keywords Section */}
            {article.keywords && article.keywords.length > 0 && (
              <Paper elevation={1} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LabelIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Keywords
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {article.keywords.map((keyword, index) => (
                    <Chip
                      key={index}
                      label={keyword}
                      size="small"
                      sx={{
                        backgroundColor: '#e3f2fd',
                        color: '#1976d2',
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            )}

            {/* Publication Info */}
            <Paper elevation={1} sx={{ p: 3, borderRadius: 3 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Year:</strong> {article.year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Volume:</strong> {article.volume}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Issue:</strong> {article.issue}
                </Typography>
                {article.pages && (
                  <Typography variant="body2" color="text.secondary">
                    <strong>Page/Article:</strong> {article.pages}
                  </Typography>
                )}
                {article.doi && (
                  <Typography variant="body2" color="text.secondary">
                    <strong>DOI:</strong> {article.doi}
                  </Typography>
                )}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ textAlign: 'center' }}>
                <Chip
                  label="CC Attribution 4.0"
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="caption" color="text.secondary">
                  Published by Veritas Research & Learning Institute
                </Typography>
              </Box>
            </Paper>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}

