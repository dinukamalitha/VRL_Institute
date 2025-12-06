import api from '../utils/api';

export interface JournalContent {
  welcomeText: string;
  aimOfJournal: string;
  peerReviewProcess: string;
  publicationPolicy: string;
  openAccessPolicy: string;
  publisher: string;
  chiefEditors: string[];
  submissionEmail: string;
  submissionText: string;
  typographicGuidance: string;
  maxWordCount: string;
  referencingProfessionalism: string;
  imageUrl?: string;
}

export const getJournalContent = async () => {
  try {
    const response = await api.get('/api/journal-content');
    if (response.status === 200) {
      return response.data.data || response.data;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch journal content', error);
    return null;
  }
};

export const updateJournalContent = async (payload: JournalContent) => {
  try {
    const response = await api.patch('/api/journal-content', payload);
    if (response.status === 200) {
      console.log('Journal content updated successfully:', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Failed to update journal content', error);
    return null;
  }
};

