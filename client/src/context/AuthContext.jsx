import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api, { getToken } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  }, []);

  const clearToast = useCallback(() => {
    setToast(null);
  }, []);

  const checkAuth = useCallback(async () => {
    const sessionToast = sessionStorage.getItem('tripvault_toast');
    if (sessionToast) {
      showToast(sessionToast, 'error');
      sessionStorage.removeItem('tripvault_toast');
    }

    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get('/auth/me');
      setUser(data.user);
    } catch {
      localStorage.removeItem('tripvault_token');
      sessionStorage.removeItem('tripvault_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password, rememberMe = false) => {
    const { data } = await api.post('/auth/login', { email, password });
    if (rememberMe) {
      localStorage.setItem('tripvault_token', data.token);
      sessionStorage.removeItem('tripvault_token');
    } else {
      sessionStorage.setItem('tripvault_token', data.token);
      localStorage.removeItem('tripvault_token');
    }
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('tripvault_token', data.token);
    sessionStorage.removeItem('tripvault_token');
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('tripvault_token');
    sessionStorage.removeItem('tripvault_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, toast, showToast, clearToast }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
