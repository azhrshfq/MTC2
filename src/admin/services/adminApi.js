// src/admin/services/adminApi.js
class AdminApiService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL;
    this.token = localStorage.getItem('adminToken');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}/admin${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const config = {
      ...options,
      headers,
      credentials: 'include'
    };

    try {
      const response = await fetch(url, config);
      
      if (response.status === 401) {
        // Token expired
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
        throw new Error('Session expired');
      }

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Dashboard
  getDashboardStats() {
    return this.request('/dashboard/stats');
  }

  getRecentActivity() {
    return this.request('/dashboard/recent-activity');
  }

  // Members
  getMembers(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/members?${queryParams}`);
  }

  getMemberDetails(id) {
    return this.request(`/members/${id}`);
  }

  updateMember(id, data) {
    return this.request(`/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  approveMember(id) {
    return this.request(`/members/${id}/approve`, {
      method: 'POST'
    });
  }

  // Payments
  getPayments(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/payments?${queryParams}`);
  }

  getFailedPayments() {
    return this.request('/payments/failed');
  }

  // Communications
  sendBroadcast(data) {
    return this.request('/communications/broadcast', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  getEmailTemplates() {
    return this.request('/communications/templates');
  }

  // Reports
  getMemberReport(dateRange) {
    return this.request('/reports/members', {
      method: 'POST',
      body: JSON.stringify(dateRange)
    });
  }

  getFinancialReport(dateRange) {
    return this.request('/reports/financial', {
      method: 'POST',
      body: JSON.stringify(dateRange)
    });
  }

  // Settings
  getSystemSettings() {
    return this.request('/settings');
  }

  updateSystemSettings(settings) {
    return this.request('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings)
    });
  }

  getAuditLogs(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/settings/audit-logs?${queryParams}`);
  }
}

export default new AdminApiService();