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
  Pagination
} from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import SearchIcon from '@mui/icons-material/Search'
import Navbar from '@/components/Navbar'
import { NavLink } from '@/types/navbar'
import Footer from '@/components/Footer'
import InfoCard from '@/components/InfoCard'
import CategoryDropdown from '@/components/CategoryDropdown'
import { useHydration } from '@/hooks/useHydration'
import { getAllNewsBlogs, getNewsBlogsCategories } from '@/api/news-blogs'
import NewsSidebar from '@/sections/NewsBlog/news-sidebar'
import NewsBlogView from "@/sections/NewsBlog/newsBlogView";
import EventsSidebar from "@/sections/Events/events-sidebar";


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
    { label: 'Services', href: '/#services' },
    { label: "Writers' Hub", href: '/news-blogs' },
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
            0% { background-position: 0 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0 50%; }
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
                    {/*<Breadcrumbs sx={{ mb: 3 }}>*/}
                    {/*  <Link*/}
                    {/*    color="inherit"*/}
                    {/*    href="/"*/}
                    {/*    sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}*/}
                    {/*  >*/}
                    {/*    Home*/}
                    {/*  </Link>*/}
                    {/*  <Typography color="text.primary">News & Blogs</Typography>*/}
                    {/*</Breadcrumbs>*/}

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
              <NewsBlogView selectedArticle={selectedArticle} handleBackToList={handleBackToList} />
            )}
          </Box>
          <EventsSidebar/>
        </Box>
      </main>
      <Footer />
    </>
  )
}