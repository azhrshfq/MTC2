// backend/src/routes/admin/index.js
const express = require('express');
const router = express.Router();
const adminAuth = require('../../middleware/adminAuth');
const checkPermission = require('../../middleware/checkPermission');

// Import admin controllers
const dashboardController = require('../../controllers/admin/dashboardController');
const memberController = require('../../controllers/admin/memberController');
const paymentController = require('../../controllers/admin/paymentController');
const communicationController = require('../../controllers/admin/communicationController');
const reportController = require('../../controllers/admin/reportController');
const settingController = require('../../controllers/admin/settingController');

// Dashboard routes
router.get('/dashboard/stats', adminAuth, dashboardController.getStats);
router.get('/dashboard/recent-activity', adminAuth, dashboardController.getRecentActivity);
router.get('/dashboard/upcoming-deductions', adminAuth, dashboardController.getUpcomingDeductions);

// Member management routes
router.get('/members', adminAuth, checkPermission('view_members'), memberController.getMembers);
router.get('/members/pending', adminAuth, checkPermission('approve_members'), memberController.getPendingMembers);
router.get('/members/:id', adminAuth, checkPermission('view_members'), memberController.getMemberDetails);
router.put('/members/:id', adminAuth, checkPermission('edit_members'), memberController.updateMember);
router.post('/members/:id/approve', adminAuth, checkPermission('approve_members'), memberController.approveMember);
router.post('/members/:id/reject', adminAuth, checkPermission('approve_members'), memberController.rejectMember);
router.post('/members/import', adminAuth, checkPermission('import_members'), memberController.importMembers);
router.get('/members/export', adminAuth, checkPermission('export_data'), memberController.exportMembers);

// Payment management
router.get('/payments', adminAuth, checkPermission('view_payments'), paymentController.getPayments);
router.get('/payments/failed', adminAuth, checkPermission('view_payments'), paymentController.getFailedPayments);
router.put('/payments/:id/retry', adminAuth, checkPermission('process_payments'), paymentController.retryPayment);
router.post('/payments/manual', adminAuth, checkPermission('process_payments'), paymentController.recordManualPayment);
router.get('/giro/schedule', adminAuth, checkPermission('view_payments'), paymentController.getGiroSchedule);
router.put('/giro/:id/status', adminAuth, checkPermission('edit_payments'), paymentController.updateGiroStatus);

// Communication routes
router.post('/communications/broadcast', adminAuth, checkPermission('send_broadcast'), communicationController.sendBroadcast);
router.get('/communications/templates', adminAuth, checkPermission('manage_templates'), communicationController.getTemplates);
router.post('/communications/templates', adminAuth, checkPermission('manage_templates'), communicationController.createTemplate);
router.put('/communications/templates/:id', adminAuth, checkPermission('manage_templates'), communicationController.updateTemplate);
router.get('/communications/history', adminAuth, checkPermission('view_communications'), communicationController.getHistory);

// Reports
router.get('/reports/members', adminAuth, checkPermission('view_reports'), reportController.getMemberReport);
router.get('/reports/financial', adminAuth, checkPermission('view_reports'), reportController.getFinancialReport);
router.get('/reports/notifications', adminAuth, checkPermission('view_reports'), reportController.getNotificationReport);
router.post('/reports/export', adminAuth, checkPermission('export_data'), reportController.exportReport);

// Settings
router.get('/settings', adminAuth, checkPermission('manage_settings'), settingController.getSettings);
router.put('/settings', adminAuth, checkPermission('manage_settings'), settingController.updateSettings);
router.get('/settings/admin-users', adminAuth, checkPermission('manage_admins'), settingController.getAdminUsers);
router.post('/settings/admin-users', adminAuth, checkPermission('manage_admins'), settingController.createAdminUser);
router.put('/settings/admin-users/:id', adminAuth, checkPermission('manage_admins'), settingController.updateAdminUser);
router.get('/settings/audit-logs', adminAuth, checkPermission('view_audit'), settingController.getAuditLogs);

module.exports = router;