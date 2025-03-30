
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from '@/hooks/use-toast';

// API URL from environment or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional API key for third-party access
const API_KEY = import.meta.env.VITE_API_KEY;

// Request interceptor for adding optional API key
apiClient.interceptors.request.use(
  (config) => {
    // Add API key if available (for optional third-party authentication)
    if (API_KEY) {
      config.headers['X-API-Key'] = API_KEY;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { response } = error;
    const status = response?.status;

    if (status === 429) {
      // Rate limit exceeded
      toast({
        title: 'Too many requests',
        description: 'Please wait a moment before trying again.',
        variant: 'destructive',
      });
    } else if (status === 403) {
      // Forbidden (likely API key issue if using one)
      toast({
        title: 'Access denied',
        description: 'You do not have permission to perform this action.',
        variant: 'destructive',
      });
    } else if (status === 404) {
      // Not found
      toast({
        title: 'Resource not found',
        description: 'The requested resource could not be found.',
        variant: 'destructive',
      });
    } else if (status === 500) {
      // Server error
      toast({
        title: 'Server error',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });
    }

    return Promise.reject(error);
  }
);

// Helper function for making API requests
export const makeRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

