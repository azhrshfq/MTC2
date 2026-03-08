// src/admin/context/AdminContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import adminApi from '../services/adminApi';

const AdminContext = createContext();

const initialState = {
  admin: null,
  loading: true,
  notifications: [],
  unreadCount: 0,
  settings: null,
  permissions: []
};

const adminReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ADMIN':
      return {
        ...state,
        admin: action.payload,
        permissions: action.payload?.permissions || [],
        loading: false
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + 1
      };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => 
          n.id === action.payload ? { ...n, read: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1)
      };
    case 'SET_SETTINGS':
      return {
        ...state,
        settings: action.payload
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (token) {
        const adminData = await adminApi.getCurrentAdmin();
        dispatch({ type: 'SET_ADMIN', payload: adminData });
        
        const settings = await adminApi.getSystemSettings();
        dispatch({ type: 'SET_SETTINGS', payload: settings });
      } else {
        dispatch({ type: 'SET_ADMIN', payload: null });
      }
    } catch (error) {
      console.error('Failed to load admin data:', error);
      dispatch({ type: 'SET_ADMIN', payload: null });
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    dispatch({ type: 'LOGOUT' });
  };

  const hasPermission = (permission) => {
    return state.permissions.includes(permission);
  };

  return (
    <AdminContext.Provider value={{
      ...state,
      logout,
      hasPermission,
      dispatch
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};