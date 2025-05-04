import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
}

// Auth functions
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await axios.post<AuthResponse>(`${API_URL}/users/token`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    localStorage.setItem('token', response.data.access_token);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const logout = (): void => {
  localStorage.removeItem('token');
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await api.get<User>('/users/me');
    return response.data;
  } catch (error) {
    console.error('Failed to get user:', error);
    return null;
  }
}; 