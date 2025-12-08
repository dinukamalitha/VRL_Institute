'use client';

import { Box, Container, Typography, Button, Chip, Paper } from '@mui/material';
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
import { getCurrentJournalVolume } from '@/api/journal-volumes';
import { useToast } from '@/hooks/useToast';

export default function JournalArticlePage() {
  const params = useParams();
  const router = useRouter();
  const navLinks = useNavLinks();
  const { showToast, ToastComponent } = useToast();
  const [article, setArticle] = useState<JournalArticle | null>(null);
  const [currentVolume, setCurrentVolume] = useState<any>(null);
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [articleData, volumeData] = await Promise.all([
          getJournalArticleById(params.articleId as string),
          getCurrentJournalVolume()
        ]);
        setArticle(articleData);
        setCurrentVolume(volumeData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setArticle(null);
        showToast('Failed to load article. Please try again later.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.articleId, showToast]);

  const handlePreview = (article: JournalArticle) => {
    if (!article.documentUrl) {
      showToast("Document URL not available", 'error')
      return
    }

    // Extract fullPath from Cloudinary URL
    const match = article.documentUrl.match(/\/v\d+\/(.*)/)
    const fullPath = match ? match[1] : article.documentUrl

    if (!fullPath) {
      showToast("Invalid document URL", 'error')
      return
    }

    // Create download link and trigger download
    const downloadUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/journal-articles/stream/pdf?fullPath=${encodeURIComponent(fullPath)}`
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = fullPath.split('/').pop() || 'article.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  };

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
            <Box>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => router.push('/journal')}
                  sx={{ mb: 3 }}
                >
                  Back 
                </Button>

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

                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                          Authors
                        </Typography>
                      </Box>
                    <Box sx={{ pl: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      {article.authors && article.authors.length > 0 ? (
                        article.authors.map((author, index) => (
                          <Box
                            key={index}
                            sx={{
                              p: 1.25,
                              borderRadius: 2,
                              bgcolor: '#f5f7fb',
                            }}
                          >
                            <Typography variant="body1" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                              {author.name || 'Unknown Author'}
                            </Typography>
                            {author.description && (
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                {author.description}
                              </Typography>
                            )}
                          </Box>
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Author information not available.
                        </Typography>
                      )}
                    </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3, justifyContent: 'center' }}>
                    <Chip
                        label={
                          <span>
                            <strong>Published: </strong>
                            {article.publishedDate
                              ? new Date(article.publishedDate).getFullYear()
                              : "N/A"}
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
                  </Box>
                </Paper>

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

                {article.keywords && article.keywords.length > 0 && (
                  <Paper elevation={1} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LabelIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
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

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 4 }}>
                  {article?.documentUrl && article.documentUrl.trim() !== '' ? (
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<DownloadIcon />}
                      onClick={() => handlePreview(article)}
                      sx={{
                        py: 1,
                        px: 4,
                        fontSize: '1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: 2,
                      }}
                    >
                      Download
                    </Button>
                  ) : null}
                </Box>
            </Box>
          </Container>
        </Box>
      </main>
      <Footer />
      <ToastComponent />
    </>
  );
}

