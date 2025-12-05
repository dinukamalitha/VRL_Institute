'use client';

import { Box, Typography, Divider, Link, Chip, Paper, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ArticleIcon from '@mui/icons-material/Article';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BookIcon from '@mui/icons-material/Book';

interface JournalArticle {
  id: string;
  title: string;
  authors?: string[];
  publishDate?: string;
  category?: string;
  thumbnail?: string;
}

const JournalSidebar = () => {
  const router = useRouter();
  const [latestArticles, setLatestArticles] = useState<JournalArticle[]>([]);

  // Fetch latest articles (using publications as a placeholder)
  useEffect(() => {
    const sampleLatest: JournalArticle[] = [
      { 
        id: '1', 
        title: 'Factors Affecting to Acceptance and Adaption of HR Analytics of Apparel Companies in Western province Sri Lanka', 
        authors: ['Dissanayake & Kumari'], 
        publishDate: 'Jun 1, 2025',
        category: 'HR Analytics',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop'
      },
      { 
        id: '2', 
        title: 'Employee Work Engagement: An Analysis of Antecedents in Teaching Context', 
        authors: ['Silva et al.'], 
        publishDate: 'Jun 1, 2025',
        category: 'Human Resources',
        thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=150&h=150&fit=crop'
      },
      { 
        id: '3', 
        title: 'Impact of Social Media Usage on Psychological Wellbeing of Undergraduates at a Selected State University of Sri Lanka: The Mediating Role of Smartphone Addiction', 
        authors: ['Wasala & Rathnakara'], 
        publishDate: 'Jun 1, 2025',
        category: 'Psychology',
        thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150&h=150&fit=crop'
      },
    ];
    setLatestArticles(sampleLatest);
  }, []);

  const handleArticleClick = (article: JournalArticle) => {
    // Create URL-friendly slug from title
    const slug = article.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    router.push(`/journal/articles/${slug}`);
  };

  // Article Card Component
  const ArticleCard = ({ article }: { article: JournalArticle }) => (
    <Card
      sx={{
        mb: 2,
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-2px)',
          borderColor: '#1976d2',
        },
      }}
      onClick={() => handleArticleClick(article)}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* Thumbnail */}
          <Box
            sx={{
              position: 'relative',
              width: 80,
              height: 80,
              flexShrink: 0,
              borderRadius: 1,
              overflow: 'hidden',
              backgroundColor: '#f0f0f0',
            }}
          >
            
              <Box
                component="img"
                src={article.thumbnail}
                alt={article.title}
                sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 1,
                    objectFit: 'cover',
                    flexShrink: 0,
                }}
                />
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Category */}
            {article.category && (
              <Chip
                label={article.category}
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.65rem',
                  mb: 0.5,
                  backgroundColor: '#e3f2fd',
                  color: '#1976d2',
                  fontWeight: 500,
                }}
              />
            )}

            {/* Title */}
            <Link
              component="button"
              onClick={(e) => {
                e.stopPropagation();
                handleArticleClick(article);
              }}
              sx={{
                textAlign: 'left',
                color: '#333',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                mb: 0.5,
                lineHeight: 1.3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                '&:hover': {
                  color: '#1976d2',
                  textDecoration: 'underline',
                },
              }}
            >
              {article.title}
            </Link>

            {/* Authors */}
            {article.authors && article.authors.length > 0 && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontSize: '0.7rem',
                  display: 'block',
                  mb: 0.5,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {article.authors.join(', ')}
              </Typography>
            )}

            {/* Published Date */}
            {article.publishDate && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CalendarTodayIcon sx={{ fontSize: 12, color: '#999' }} />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: '0.7rem' }}
                >
                  {article.publishDate}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        width: 320,
        backgroundColor: '#f8f9fa',
        borderLeft: '1px solid #e0e0e0',
        overflowY: 'auto',
        maxHeight: '100vh',
        position: 'sticky',
        top: 0,
        '@media (max-width: 1200px)': {
          display: 'none',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        {/* Latest Articles */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <ArticleIcon sx={{ mr: 1, color: '#1976d2' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
              Latest Articles
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default JournalSidebar;

