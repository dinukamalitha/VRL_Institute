import api from '../utils/api';
import { JournalArticle } from '@/types/journal';

// Get all journal articles
export const getAllJournalArticles = async () => {
  try {
    const response = await api.get("/api/journal-articles");
    if (response.status === 200) {
      return response.data.data || response.data;
    }
    return [];
  } catch (error: any) {
    console.error('Error fetching journal articles:', error);
    return [];
  }
};

// Get journal article by ID
export const getJournalArticleById = async (id: string) => {
  try {
    const response = await api.get(`/api/journal-articles/${id}`);
    if (response.status === 200) {
      return response.data.data || response.data;
    }
    return null;
  } catch (error: any) {
    console.error('Error fetching journal article:', error);
    return null;
  }
};

// Get latest journal articles
export const getLatestJournalArticles = async (limit: number = 5) => {
  try {
    const response = await api.get(`/api/journal-articles/latest?limit=${limit}`);
    if (response.status === 200) {
      return response.data.data || response.data;
    }
    return [];
  } catch (error: any) {
    console.error('Error fetching latest journal articles:', error);
    return [];
  }
};

// Get journal articles by volume and issue
export const getJournalArticlesByVolumeIssue = async (volume: string, issue: string) => {
  try {
    const response = await api.get(`/api/journal-articles/volume/${volume}/issue/${issue}`);
    if (response.status === 200) {
      return response.data.data || response.data;
    }
    return [];
  } catch (error: any) {
    console.error('Error fetching journal articles by volume/issue:', error);
    return [];
  }
};

// Get journal articles by category
export const getJournalArticlesByCategory = async (category: string) => {
  try {
    const response = await api.get(`/api/journal-articles/category/${category}`);
    if (response.status === 200) {
      return response.data.data || response.data;
    }
    return [];
  } catch (error: any) {
    console.error('Error fetching journal articles by category:', error);
    return [];
  }
};

// Get journal article categories
export const getJournalArticleCategories = async () => {
  try {
    const response = await api.get('/api/journal-articles/categories');
    if (response.status === 200) {
      return response.data.data || response.data;
    }
    return [];
  } catch (error: any) {
    console.error('Error fetching journal article categories:', error);
    return [];
  }
};

// Create journal article (admin only)
export const createJournalArticle = async (payload: JournalArticle) => {
  try {
    const response = await api.post('/api/journal-articles', payload);
    if (response.status === 201) {
      return response.data.data || response.data;
    }
    return null;
  } catch (error: any) {
    console.error('Error creating journal article:', error);
    return null;
  }
};

// Update journal article (admin only)
export const updateJournalArticle = async (id: string, payload: Partial<JournalArticle>) => {
  try {
    const response = await api.patch(`/api/journal-articles/${id}`, payload);
    if (response.status === 200) {
      return response.data.data || response.data;
    }
    return null;
  } catch (error: any) {
    console.error('Error updating journal article:', error);
    return null;
  }
};

// Delete journal article (admin only)
export const deleteJournalArticle = async (id: string) => {
  try {
    const response = await api.delete(`/api/journal-articles/${id}`);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error: any) {
    console.error('Error deleting journal article:', error);
    return null;
  }
};

