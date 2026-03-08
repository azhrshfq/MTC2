// src/admin/routes/AdminRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout';
import RequireAdminAuth from '../components/auth/RequireAdminAuth';

// Lazy load admin pages
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const MemberList = React.lazy(() => import('../pages/members/MemberList'));
const MemberDetail = React.lazy(() => import('../pages/members/MemberDetail'));
const MemberApproval = React.lazy(() => import('../pages/members/MemberApproval'));
const PaymentList = React.lazy(() => import('../pages/payments/PaymentList'));
const GiroManagement = React.lazy(() => import('../pages/payments/GiroManagement'));
const BroadcastMessage = React.lazy(() => import('../pages/communications/BroadcastMessage'));
const EmailTemplates = React.lazy(() => import('../pages/communications/EmailTemplates'));
const MemberReports = React.lazy(() => import('../pages/reports/MemberReports'));
const FinancialReports = React.lazy(() => import('../pages/reports/FinancialReports'));
const SystemSettings = React.lazy(() => import('../pages/settings/SystemSettings'));
const AdminUsers = React.lazy(() => import('../pages/settings/AdminUsers'));
const AuditLogs = React.lazy(() => import('../pages/settings/AuditLogs'));

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <RequireAdminAuth>
          <AdminLayout />
        </RequireAdminAuth>
      }>
        <Route index element={<Dashboard />} />
        
        {/* Member routes */}
        <Route path="members">
          <Route index element={<MemberList />} />
          <Route path=":id" element={<MemberDetail />} />
          <Route path="approvals" element={<MemberApproval />} />
        </Route>
        
        {/* Payment routes */}
        <Route path="payments">
          <Route index element={<PaymentList />} />
          <Route path="giro" element={<GiroManagement />} />
        </Route>
        
        {/* Communication routes */}
        <Route path="communications">
          <Route index element={<BroadcastMessage />} />
          <Route path="templates" element={<EmailTemplates />} />
        </Route>
        
        {/* Report routes */}
        <Route path="reports">
          <Route path="members" element={<MemberReports />} />
          <Route path="financial" element={<FinancialReports />} />
        </Route>
        
        {/* Settings routes */}
        <Route path="settings">
          <Route index element={<SystemSettings />} />
          <Route path="admins" element={<AdminUsers />} />
          <Route path="audit-logs" element={<AuditLogs />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;