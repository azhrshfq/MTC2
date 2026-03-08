import React, { createContext, useState, useContext, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // Clear any stale user data on initial load
        const savedUser = localStorage.getItem('skim-pintar-user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          const userData = await base44.auth.me();
          setUser(userData);
          if (userData) {
            localStorage.setItem('skim-pintar-user', JSON.stringify(userData));
          }
        }
      } catch (err) {
        console.error('Auth error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email) => {
    try {
      setLoading(true);
      // Mock login - just set the user
      const userData = { email };
      setUser(userData);
      localStorage.setItem('skim-pintar-user', JSON.stringify(userData));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Singpass login method
  const loginWithSingpass = async () => {
    try {
      setLoading(true);
      setError(null);

      // Step 1: Get session token from your backend (mock for now)
      const mockToken = "mock-singpass-token-" + Date.now();
      
      // Simulate Singpass verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock user data returned from Singpass
      const mockUserData = {
        email: "user@example.com",
        full_name: "Test User",
        nric: "S1234567A",
        phone: "91234567",
        address: "123 Test Street",
        postal_code: "123456",
        nationality: "Singaporean",
        singpass_verified: true,
        verified_at: new Date().toISOString()
      };
      
      // Set the user with Singpass data
      setUser(mockUserData);
      localStorage.setItem('skim-pintar-user', JSON.stringify(mockUserData));
      
      return { success: true, user: mockUserData };
      
    } catch (err) {
      console.error('Singpass login error:', err);
      setError(err.message || 'Singpass login failed');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Method to handle Singpass callback
  const handleSingpassCallback = async (code) => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/singpass/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      
      const userData = await response.json();
      setUser(userData);
      localStorage.setItem('skim-pintar-user', JSON.stringify(userData));
      
      return { success: true, user: userData };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Clear all auth state
      setUser(null);
      
      // Clear all storage
      localStorage.removeItem('skim-pintar-user');
      localStorage.removeItem('user'); // Remove old key just in case
      sessionStorage.clear(); // Clear any session storage
      
      // Clear any other app-specific storage
      localStorage.removeItem('auth-token');
      localStorage.removeItem('user-preferences');
      
      // Optionally call backend logout endpoint
      try {
        await base44.auth.logout();
      } catch (e) {
        console.warn('Backend logout failed:', e);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    loginWithSingpass,
    handleSingpassCallback,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <div id="singpass-container" style={{ display: 'none' }} />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};