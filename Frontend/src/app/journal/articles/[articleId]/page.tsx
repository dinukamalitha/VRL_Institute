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
import { JournalArticle } from '@/types/journal';
import { getJournalArticleById } from '@/api/journal-articles';

export default function JournalArticlePage() {
  const params = useParams();
  const router = useRouter();
  const navLinks = useNavLinks();
  const [article, setArticle] = useState<JournalArticle | null>(null);
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const article = await getJournalArticleById(params.articleId as string);
        setArticle(article);
      } catch (error) {
        console.error('Error fetching article:', error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
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
            {/* <Breadcrumbs sx={{ mb: 3 }}>
              <MuiLink
                component="button"
                onClick={() => router.push('/journal')}
                sx={{ cursor: 'pointer', textDecoration: 'none' }}
              >
                Journal
              </MuiLink>
              <Typography color="text.primary">Articles</Typography>
              <Typography color="text.primary">{article.title.substring(0, 30)}...</Typography>
            </Breadcrumbs> */}

            {/* Back Button */}
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => router.push('/journal')}
              sx={{ mb: 3 }}
            >
              Back 
            </Button>

            {/* Article Header */}
            <Paper elevation={2} sx={{ px: 4, py: 2, mb: 4, borderRadius: 3 }}>
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
                    {article.authors && article.authors.map((author, index) => (
                        <Typography key={author._id || index} variant="body1" sx={{ mb: 0.5 }}>
                          • {author.name}
                        </Typography>
                    ))}
                  </Box>
                </Box>

                {/* Publication Details */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                <Chip
                    icon={<CalendarTodayIcon sx={{ fontSize: 18 }} />}
                    label={
                      <span>
                        <strong>Published:</strong> {new Date(article.publishedDate).getFullYear()}
                      </span>
                    }
                    variant="outlined"
                  />
                  <Chip
                    label={
                      <span>
                        <strong>Volume:</strong> {article.volume}
                      </span>
                    }
                    variant="outlined"
                  />
                  <Chip
                    label={
                      <span>
                        <strong>Issue:</strong> {article.issue}
                      </span>
                    }
                    variant="outlined"
                  />
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
                {article.documentUrl && (
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    href={article.documentUrl}
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
                  <strong>Year:</strong> {article.publishedDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Volume:</strong> {article.volume}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Issue:</strong> {article.issue}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ textAlign: 'center' }}>
                {/* <Chip
                  label="CC Attribution 4.0"
                  size="small"
                  sx={{ mr: 1 }}
                /> */}
                <Typography variant="caption" color="#000">
                <strong>Published by Veritas Research & Learning Institute</strong>
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

