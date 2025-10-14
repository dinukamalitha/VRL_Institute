'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Pagination,
  Breadcrumbs,
  Link,
  IconButton,
  Divider,
  Avatar
} from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import SearchIcon from '@mui/icons-material/Search'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ShareIcon from '@mui/icons-material/Share'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Navbar from '@/components/Navbar'
import { NavLink } from '@/types/navbar'
import Footer from '@/components/Footer'
import InfoCard from '@/components/InfoCard'
import CategoryDropdown from '@/components/CategoryDropdown'
import { useHydration } from '@/hooks/useHydration'
import { getAllNewsBlogs, getNewsBlogsCategories } from '@/api/news-blogs'
import NewsSidebar from '@/sections/news-sidebar'
import EventsSidebar from '@/sections/events-sidebar'
import AuthorsSection from '@/sections/authorsSection'


export default function NewsBlogsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [categories, setCategories] = useState<string[]>(["All"])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedArticle, setSelectedArticle] = useState<any>(null)
  const [allNewsItems, setAllNewsItems] = useState<any[]>([])
  const [, setLoading] = useState(false)
  const [showArticle, setShowArticle] = useState(false)
  const mounted = useHydration()
  const itemsPerPage = 9

  // Fetch from backend
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      try {
        const res = await getAllNewsBlogs();
        const raw = Array.isArray(res) ? res : []
        const mapped = raw.map((item: any) => {
          const description: string = item.description || ""
          const textOnly = description.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
          const excerpt = textOnly.slice(0, 160) + (textOnly.length > 160 ? "…" : "")

          return {
            id: item._id,
            title: item.title,
            excerpt,
            date: item.date || "",
            time: item.time || "",
            category: item.category || "",
            description,
            image: Array.isArray(item.images) ? item.images[0] || "" : item.image || "",
            authors: item.authors || [],
          }
        })
        setAllNewsItems(mapped)
      } catch (e) {
        console.error('Failed to fetch news', e)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  // Check for article ID in URL parameters on component mount (only after hydration)
  useEffect(() => {
    if (!mounted) return

    const articleId = searchParams.get('article')
    if (articleId) {
      const article = allNewsItems.find(item =>
        item.title.toLowerCase().replace(/[^a-z0-9]/g, '-') === articleId
      )
      if (article) {
        setSelectedArticle(article)
        setShowArticle(true)
      }
    }
  }, [searchParams, mounted, allNewsItems])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getNewsBlogsCategories()
        if (Array.isArray(res)) {
          setCategories(["All", ...res.filter(Boolean)])
        }
      } catch (error) {
        console.error("Failed to fetch categories", error)
      }
    }

    fetchCategories()
  }, [])


  const navLinks: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: "Writer's Hub", href: '/news-blogs' },
    { label: 'Services', href: '/#services' },
    { label: 'Events & Programs', href: '/#events' },
    { label: 'Publications', href: '/#publications' },
    { label: 'VRL Journal', href: '/#journals' },
    { label: 'Contact', href: '/#contact' },
  ]

  // Filter news based on search term and category
  const filteredNews = allNewsItems.filter((news: any) => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || news.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentNews = filteredNews.slice(startIndex, endIndex)

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setSelectedCategory('All')
    setSearchTerm('')
    setCurrentPage(1)
  }

  const handleArticleClick = (article: any) => {
    setSelectedArticle(article)
    setShowArticle(true)
  }

  const handleBackToList = () => {
    setShowArticle(false)
    setSelectedArticle(null)
    // Clear the URL parameter
    router.push('/news-blogs')
  }

  // Show loading during hydration
  if (!mounted) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(-45deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite'
      }}>
        <Typography variant="h5" sx={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Loading News & Blogs...
        </Typography>
        <style jsx>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </Box>
    )
  }

  return (
    <>
      <Navbar
        navLinks={navLinks}
        logoSize="medium"
      />
      <main>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>

          <NewsSidebar/>

          <Box sx={{ flex: 1 }}>
            {!showArticle ? (
              <>
                {/* Page Header */}
                <Box sx={{ py: 6, px: 4, bgColor: '#f8f9fa' }}>
                  <Container maxWidth="lg">
                    <Breadcrumbs sx={{ mb: 3 }}>
                      <Link
                        color="inherit"
                        href="/"
                        sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                      >
                        Home
                      </Link>
                      <Typography color="text.primary">News & Blogs</Typography>
                    </Breadcrumbs>

                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                        {"Writer's Hub"}
                      </Typography>
                      <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 2 }}>
                        Stay updated with the latest research, partnerships, innovations, and insights from VRL Institute
                      </Typography>
                      <Box sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        py: 2,
                        px: 3,
                        borderRadius: 2,
                        display: 'inline-block',
                        boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)'
                      }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                          📧 Submit Your News & Blogs
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          Send your articles to: <strong>news@vrlinstitute.com</strong>
                        </Typography>
                      </Box>
                    </Box>

                    {/* Search and Filter Section */}
                    <Box sx={{ mb: 4 }}>
                      <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={8}>
                          <TextField
                            fullWidth
                            placeholder="Search news and blogs..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                backgroundColor: 'white',
                              }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <CategoryDropdown
                            categories={categories}
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            label="Category"
                            fullWidth={true}
                            size="medium"
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                backgroundColor: 'white',
                              }
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Results Count */}
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                        p: 2,
                        backgroundColor: 'rgba(233, 30, 99, 0.05)',
                        borderRadius: 2,
                        border: '1px solid rgba(233, 30, 99, 0.1)'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            📊 Results: {filteredNews.length} of {allNewsItems.length} articles
                          </Typography>
                          {selectedCategory !== 'All' && (
                            <Chip
                              label={`Category: ${selectedCategory}`}
                              size="small"
                              sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                fontWeight: 'bold'
                              }}
                            />
                          )}
                          {searchTerm && (
                            <Chip
                              label={`Search: "${searchTerm}"`}
                              size="small"
                              sx={{
                                backgroundColor: 'secondary.main',
                                color: 'white',
                                fontWeight: 'bold'
                              }}
                            />
                          )}
                        </Box>
                        {(selectedCategory !== 'All' || searchTerm) && (
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={handleClearFilters}
                            sx={{
                              borderColor: 'primary.main',
                              color: 'primary.main',
                              '&:hover': {
                                backgroundColor: 'primary.main',
                                color: 'white',
                              }
                            }}
                          >
                            Clear Filters
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Container>
                </Box>

                {/* News Grid */}
                <Box sx={{ py: 4, px: 4 }}>
                  <Container maxWidth="lg">
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                      {currentNews.map((news: any, index: number) => (
                        <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
                          <Box sx={{ width: '100%', cursor: 'pointer' }} onClick={() => handleArticleClick(news)}>
                            <InfoCard {...news} isEvent={false} />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>

                    {/* No Results Message */}
                    {filteredNews.length === 0 && (
                      <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h5" color="text.secondary" gutterBottom>
                          No articles found
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          Try adjusting your search terms or category filter
                        </Typography>
                      </Box>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                          count={totalPages}
                          page={currentPage}
                          onChange={(event, page) => setCurrentPage(page)}
                          color="primary"
                          size="large"
                          showFirstButton
                          showLastButton
                        />
                      </Box>
                    )}
                  </Container>
                </Box>
              </>
            ) : (
              /* Full Article View */
              <Box sx={{ py: 4, px: 4 }}>
                <Container maxWidth="lg">
                  {/* Back Button */}
                  <Box sx={{ mb: 4 }}>
                    <Button
                      startIcon={<ArrowBackIcon />}
                      onClick={handleBackToList}
                      sx={{
                        color: 'text.secondary',
                        '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
                      }}
                    >
                      {"Back to Writer's Hub"}
                    </Button>
                  </Box>

                  {/* Article Header */}
                  <Box sx={{ mb: 4 }}>
                    <Breadcrumbs sx={{ mb: 2 }}>
                      <Link
                        color="inherit"
                        href="/"
                        sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                      >
                        Home
                      </Link>
                      <Link
                        color="inherit"
                        onClick={handleBackToList}
                        sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                      >
                        {"Writer's Hub"}
                      </Link>
                      <Typography color="text.primary">{selectedArticle?.category}</Typography>
                    </Breadcrumbs>

                    <Box sx={{ mb: 3 }}>
                      <Chip
                        label={selectedArticle?.category}
                        sx={{
                          backgroundColor: 'primary.main',
                          color: 'white',
                          fontWeight: 'bold',
                          mb: 2
                        }}
                      />
                      <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333', mb: 2, lineHeight: 1.2 }}>
                        {selectedArticle?.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
                          {selectedArticle?.author?.charAt(0) || 'V'}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {selectedArticle?.author}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {selectedArticle?.date} • {selectedArticle?.time}
                          </Typography>
                        </Box>
                        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                          <IconButton sx={{ color: 'text.secondary' }}>
                            <ShareIcon />
                          </IconButton>
                          <IconButton sx={{ color: 'text.secondary' }}>
                            <BookmarkIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/* Article Content */}
                  <Box sx={{ mb: 4 }}>
                    <Box
                      sx={{
                        lineHeight: 1.85,
                        color: "#333",
                        "& h1, & h2, & h3, & h4, & h5, & h6": {
                          fontWeight: 700,
                          lineHeight: 1.25,
                          mt: 3,
                          mb: 1.5,
                          color: "#222",
                        },
                        "& h1": { fontSize: "2rem" },
                        "& h2": { fontSize: "1.6rem" },
                        "& h3": { fontSize: "1.3rem" },
                        "& p": {
                          textAlign: "justify",
                          marginTop: "0.5em",
                          marginBottom: "0.5em",
                        },
                        "& a": { color: "primary.main", textDecoration: "underline" },
                        "& ul, & ol": { pl: 3, mb: 2 },
                        "& li": { mb: 0.75 },
                        "& blockquote": {
                          borderLeft: "4px solid rgba(0,0,0,0.1)",
                          pl: 2,
                          ml: 0,
                          color: "text.secondary",
                          fontStyle: "italic",
                          my: 2,
                        },
                        "& img": {
                          width: "100%",
                          height: "auto",
                          borderRadius: 2,
                          display: "block",
                          margin: "16px 0",
                          objectFit: "cover",
                        },
                        "& table": {
                          width: "100%",
                          borderCollapse: "collapse",
                          my: 2,
                        },
                        "& th, & td": {
                          border: "1px solid rgba(0,0,0,0.12)",
                          p: 1,
                          textAlign: "left",
                        },
                        "& pre, & code": {
                          fontFamily:
                            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                        },
                        "& pre": {
                          backgroundColor: "#f5f5f5",
                          p: 2,
                          borderRadius: 8,
                          overflowX: "auto",
                          my: 2,
                        },
                      }}
                      dangerouslySetInnerHTML={{
                        __html: selectedArticle?.description || "",
                      }}
                    />
                  </Box>

                  <AuthorsSection authors={selectedArticle?.authors || []} />

                  {/* Article Footer */}
                  <Divider sx={{ my: 4 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      Published on {selectedArticle?.date} at {selectedArticle?.time}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button variant="outlined" size="small" startIcon={<FacebookIcon />}>
                        Share on Facebook
                      </Button>
                      <Button variant="outlined" size="small" startIcon={<TwitterIcon />}>
                        Share on Twitter
                      </Button>
                      <Button variant="outlined" size="small" startIcon={<LinkedInIcon />}>
                        Share on LinkedIn
                      </Button>
                    </Box>
                  </Box>
                </Container>
              </Box>
            )}
          </Box>
          
          <EventsSidebar/>
        </Box>
      </main>
      <Footer />
    </>
  )
}