
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

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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

    if (status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/';
      toast({
        title: 'Session expired',
        description: 'Please login again to continue.',
        variant: 'destructive',
      });
    } else if (status === 403) {
      // Forbidden
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

// Helper function for making authenticated API requests
export const makeRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
