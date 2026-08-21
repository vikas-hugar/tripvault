import axios from 'axios';

export const getToken = () => {
  return localStorage.getItem('tripvault_token') || sessionStorage.getItem('tripvault_token');
};

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('tripvault_token');
      sessionStorage.removeItem('tripvault_token');
      sessionStorage.setItem('tripvault_toast', 'Your session has expired.');
      if (
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/register' &&
        window.location.pathname !== '/forgot-password'
      ) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
