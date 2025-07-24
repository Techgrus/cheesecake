

import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Get the base URL from .env file



useEffect(() => {
  const checkAuth = async () => {
    // 👇 DEV MODE: Simulate user
    if (import.meta.env.DEV) {
      setUser({
        _id: 'dev123',
        name: 'Dev User',
        email: 'dev@example.com',
        isAdmin: true, // or false, depending on what UI you want to test
        token: 'fake-token'
      });
      setLoading(false);
      return;
    }

    // 👇 PRODUCTION: Use real backend
    try {
      const response = await fetch(`${BASE_URL}/api/auth/islogin`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();
      if (data.success) {
        const userData = {
          ...data.data,
          isAdmin: Boolean(data.data.isAdmin)
        };
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, []);


  const login = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        return { success: false, message: error.message || 'Login failed' };
      }

      const data = await response.json();

      if (data.success) {
        // Make sure to properly structure user data including admin status
        const userData = {
          ...data.data,
          isAdmin: Boolean(data.data.isAdmin) // Ensure isAdmin is properly set
        };

        // For debugging

        setUser(userData);
        navigate(userData.isAdmin ? '/backend' : '/home');
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'An error occurred during login' };
    }
  };

  
  const logout = async () => {
    try {
      const response = await fetch(BASE_URL+'/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);
        navigate('/home');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
    }
  };

  const authenticatedFetch = async (url, options = {}) => {
    try {
      const headers = {
        ...options.headers,
      };

      // Remove Content-Type header if the body is FormData
      if (options.body instanceof FormData) {
        delete headers['Content-Type'];
      }

      const response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers,
      });

      if (response.status === 401 || response.status === 403) {
        setUser(null);
        navigate('/auth');
        throw new Error('Authentication failed');
      }

      return response;
    } catch (error) {
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      login, 
      logout, 
      loading,
      authenticatedFetch 
    }}>
      {children}
    </UserContext.Provider>
  );
};