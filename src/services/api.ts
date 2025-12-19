// src/services/api.ts
import axios from 'axios';
import {
  API_URLS,
  PROFILE_REQUEST_BODY,
  CREDIT_CARD_REQUEST_BODY,
} from '../utils/constants';

// Create axios instance
const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===== PROFILE API =====
export const fetchProfiles = async () => {
  try {
    const response = await api.post(API_URLS.PROFILE, PROFILE_REQUEST_BODY);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle API-specific errors
      const errorMessage = error.response?.data?.message || error.message;
      console.error('Profiles API Error:', errorMessage);
      throw new Error(`Failed to fetch profiles: ${errorMessage}`);
    }
    // Handle unexpected errors
    console.error('Unexpected error fetching profiles:', error);
    throw new Error('An unexpected error occurred while fetching profiles');
  }
};

// ===== CREDIT CARD API =====
export const fetchCreditCards = async () => {
  try {
    const response = await api.post(
      API_URLS.CREDIT_CARD,
      CREDIT_CARD_REQUEST_BODY
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('Credit Cards API Error:', errorMessage);
      throw new Error(`Failed to fetch credit cards: ${errorMessage}`);
    }
    console.error('Unexpected error fetching credit cards:', error);
    throw new Error('An unexpected error occurred while fetching credit cards');
  }
};

// Optional: Type definitions
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}