// src/admin/components/layout/AdminLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { useAdminAuth } from '../../hooks/useAdminAuth';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { admin, logout } = useAdminAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader 
        admin={admin} 
        onLogout={logout}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex">
        <AdminSidebar 
          isOpen={sidebarOpen} 
          admin={admin}
        />
        
        <main className={`flex-1 p-6 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;