// src/admin/components/layout/AdminSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  MessageSquare,
  FileText,
  Settings,
  Bell,
  BarChart,
  LogOut
} from 'lucide-react';

const AdminSidebar = ({ isOpen, admin }) => {
  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: '/admin/members', icon: Users, label: 'Members' },
    { path: '/admin/payments', icon: CreditCard, label: 'Payments' },
    { path: '/admin/communications', icon: MessageSquare, label: 'Communications' },
    { path: '/admin/reports', icon: BarChart, label: 'Reports' },
    { path: '/admin/notifications', icon: Bell, label: 'Notifications' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  // Filter menu items based on permissions
  const filteredMenuItems = menuItems.filter(item => {
    if (admin?.role === 'super_admin') return true;
    // Add permission-based filtering here
    return true;
  });

  return (
    <aside className={`fixed left-0 top-16 h-full bg-white shadow-lg transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-20'
    }`}>
      <nav className="p-4">
        {filteredMenuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) => `
              flex items-center p-3 mb-2 rounded-lg transition-colors
              ${isActive 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            <item.icon size={20} />
            {isOpen && <span className="ml-3">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;