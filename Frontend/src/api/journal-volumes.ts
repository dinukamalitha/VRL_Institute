import api from '../utils/api';
import { JournalVolume } from '@/types/journal';

// Get all journal volumes
export const getAllJournalVolumes = async (limit?: number, sortBy?: 'newest' | 'oldest' | 'title') => {
  try {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (sortBy) params.append('sortBy', sortBy);

    const queryString = params.toString();
    const url = `/api/journal-volumes${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get(url);
    if (response.status === 200) {
      return response.data.data || response.data;
    }
    return [];
  } catch (error: any) {
    console.error('Error fetching journal volumes:', error);
    return [];
  }
};

// Get journal volume by ID
export const getJournalVolumeById = async (id: string) => {
  try {
    const response = await api.get(`/api/journal-volumes/${id}`);
    if (response.status === 200) {
      return response.data.data || response.data;
    }
    return null;
  } catch (error: any) {
    console.error('Error fetching journal volume:', error);
    return null;
  }
};

// Get current/latest journal volume
export const getCurrentJournalVolume = async () => {
  try {
    const response = await api.get('/api/journal-volumes/current');
    if (response.status === 200) {
      return response.data.data || response.data;
    }
    return null;
  } catch (error: any) {
    console.error('Error fetching current journal volume:', error);
    return null;
  }
};

// Create journal volume (admin only)
export const createJournalVolume = async (volume: JournalVolume) => {
  try {
    const response = await api.post('/api/journal-volumes', volume);
    if (response.status === 201) {
      return response.data.data || response.data;
    }
    return null;
  } catch (error: any) {
    console.error('Error creating journal volume:', error);
    return null;
  }
};

// Update journal volume (admin only)
export const updateJournalVolume = async (id: string, volume: Partial<JournalVolume>) => {
  try {
    const response = await api.patch(`/api/journal-volumes/${id}`, volume);
    if (response.status === 200) {
      return response.data.data || response.data;
    }
    return null;
  } catch (error: any) {
    console.error('Error updating journal volume:', error);
    return null;
  }
};

// Delete journal volume (admin only)
export const deleteJournalVolume = async (id: string) => {
  try {
    const response = await api.delete(`/api/journal-volumes/${id}`);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error: any) {
    console.error('Error deleting journal volume:', error);
    return null;
  }
};

