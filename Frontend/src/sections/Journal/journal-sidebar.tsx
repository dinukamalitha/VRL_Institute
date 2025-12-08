'use client';

import {Box, Typography, Divider, Link, Chip, Card, CardContent, TextField, InputAdornment, IconButton, Stack, FormControl, InputLabel, Select, MenuItem, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions,} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import ArticleIcon from '@mui/icons-material/Article';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { getAllJournalArticles } from '@/api/journal-articles';
import { JournalArticle } from '@/types/journal';

const JournalSidebar = () => {
  const router = useRouter();
  const [articles, setArticles] = useState<JournalArticle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [draftYear, setDraftYear] = useState('');
  const [draftAuthor, setDraftAuthor] = useState('');
  const [draftCategory, setDraftCategory] = useState('');

  // Fetch all articles for search/filter
  useEffect(() => {
    const fetchArticles = async () => {
      const all = await getAllJournalArticles();
      setArticles(all || []);
    };
    fetchArticles();
  }, []);

  const yearOptions = useMemo(() => {
    const years = articles
      .map((item) => (item.publishedDate ? new Date(item.publishedDate).getFullYear().toString() : ''))
      .filter(Boolean);
    return Array.from(new Set(years)).sort((a, b) => Number(b) - Number(a));
  }, [articles]);

  const authorOptions = useMemo(() => {
    const names = articles.flatMap((item) => item.authors?.map((a) => a.name).filter(Boolean) || []);
    return Array.from(new Set(names)).sort((a, b) => a.localeCompare(b));
  }, [articles]);

  const categoryOptions = useMemo(() => {
    const categories = articles.map((item) => item.category).filter(Boolean);
    return Array.from(new Set(categories)).sort((a, b) => a.localeCompare(b));
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return articles.filter((item) => {
      const matchesSearch = !term || item.title.toLowerCase().includes(term);
      const articleYear = item.publishedDate ? new Date(item.publishedDate).getFullYear().toString() : '';
      const matchesYear = !selectedYear || articleYear === selectedYear;
      const matchesAuthor =
        !selectedAuthor || (item.authors || []).some((a) => a.name?.toLowerCase() === selectedAuthor.toLowerCase());
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      return matchesSearch && matchesYear && matchesAuthor && matchesCategory;
    });
  }, [articles, searchTerm, selectedYear, selectedAuthor, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedYear('');
    setSelectedAuthor('');
    setSelectedCategory('');
    setDraftYear('');
    setDraftAuthor('');
    setDraftCategory('');
  };

  const activeFilterCount = useMemo(
    () =>
      [selectedYear, selectedAuthor, selectedCategory].filter((v) => Boolean(v)).length,
    [selectedYear, selectedAuthor, selectedCategory]
  );

  const openFilters = () => {
    setDraftYear(selectedYear);
    setDraftAuthor(selectedAuthor);
    setDraftCategory(selectedCategory);
    setFiltersOpen(true);
  };

  const applyFilters = () => {
    setSelectedYear(draftYear);
    setSelectedAuthor(draftAuthor);
    setSelectedCategory(draftCategory);
    setFiltersOpen(false);
  };

  const handleArticleClick = (article: JournalArticle) => {
    router.push(`/journal/articles/${article._id}`);
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
        position: 'relative',
        overflow: 'hidden',
        '&:before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(120deg, rgba(25,118,210,0.07), transparent 60%)',
          pointerEvents: 'none',
        },
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-2px)',
          borderColor: '#1976d2',
        },
      }}
      onClick={() => handleArticleClick(article)}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
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
                color: '#0f172a',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 700,
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
                  fontSize: '0.72rem',
                  display: 'block',
                  mb: 0.5,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {article.authors.map((a) => a.name).join(', ')}
              </Typography>
            )}

            {/* Published Date */}
            {article.publishedDate && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CalendarTodayIcon sx={{ fontSize: 12, color: '#999' }} />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: '0.7rem' }}
                >
                  {new Date(article.publishedDate).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  }).replace(',', '')}
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
        width: 350,
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
        {/* Results */}
        <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ArticleIcon sx={{ color: '#1976d2' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
              Latest Articles
            </Typography>
          </Box>
          {searchTerm || selectedAuthor || selectedCategory || selectedYear ? (
            <Button onClick={clearFilters} size="small" color="primary">
              Clear
            </Button>
          ) : null}
        </Box>

        {/* Search + filter trigger */}
        <Paper elevation={0} sx={{ p: 2.5, mb: 3, borderRadius: 3, border: '1px solid #e5e7eb' }}>
          <Stack spacing={1.25}>
            <TextField
              placeholder="Search by title"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
              <Button
                variant="outlined"
                size="small"
                startIcon={<FilterAltIcon />}
                onClick={openFilters}
                sx={{ textTransform: 'none', borderColor: '#e0e0e0' }}
              >
                Filters {activeFilterCount ? `(${activeFilterCount})` : ''}
              </Button>
              <Typography variant="caption" color="text.secondary">
                Showing {filteredArticles.length} of {articles.length || 0}
              </Typography>
              {(searchTerm || selectedAuthor || selectedCategory || selectedYear) && (
                <IconButton onClick={clearFilters} color="primary" size="small">
                  <RestartAltIcon />
                </IconButton>
              )}
            </Stack>
          </Stack>
        </Paper>
        
        <Divider sx={{ mb: 2 }} />
        {filteredArticles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
        {filteredArticles.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No articles match these filters yet.
          </Typography>
        )}
      </Box>

      {/* Filters dialog */}
      <Dialog open={filtersOpen} onClose={() => setFiltersOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Filter articles</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <FormControl size="small" fullWidth>
              <InputLabel>Year</InputLabel>
              <Select value={draftYear} label="Year" onChange={(e) => setDraftYear(e.target.value)}>
                <MenuItem value="">All</MenuItem>
                {yearOptions.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Author</InputLabel>
              <Select value={draftAuthor} label="Author" onChange={(e) => setDraftAuthor(e.target.value)}>
                <MenuItem value="">All</MenuItem>
                {authorOptions.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={draftCategory}
                label="Category"
                onChange={(e) => setDraftCategory(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {categoryOptions.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={clearFilters} color="inherit">
            Reset
          </Button>
          <Button onClick={() => setFiltersOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={applyFilters}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JournalSidebar;