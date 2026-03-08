// src/admin/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Users,
  CreditCard,
  TrendingUp,
  AlertCircle,
  Clock
} from 'lucide-react';
import RevenueChart from '../components/charts/RevenueChart';
import MemberGrowthChart from '../components/charts/MemberGrowthChart';
import StatusBadge from '../components/common/StatusBadge';
import { useAdminApi } from '../hooks/useAdminApi';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getDashboardStats, getRecentActivity } = useAdminApi();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsData, activityData] = await Promise.all([
        getDashboardStats(),
        getRecentActivity()
      ]);
      setStats(statsData);
      setRecentActivity(activityData);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Members',
      value: stats?.totalMembers || 0,
      icon: Users,
      change: stats?.memberGrowth || 0,
      color: 'blue'
    },
    {
      title: 'Active Subscriptions',
      value: stats?.activeSubscriptions || 0,
      icon: TrendingUp,
      change: stats?.subscriptionGrowth || 0,
      color: 'green'
    },
    {
      title: 'Pending Approvals',
      value: stats?.pendingApprovals || 0,
      icon: Clock,
      color: 'yellow'
    },
    {
      title: 'Failed Payments',
      value: stats?.failedPayments || 0,
      icon: AlertCircle,
      color: 'red'
    }
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`text-${stat.color}-600`} size={24} />
              </div>
              {stat.change && (
                <span className={`text-sm ${
                  stat.change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change > 0 ? '+' : ''}{stat.change}%
                </span>
              )}
            </div>
            <h3 className="text-gray-600 text-sm">{stat.title}</h3>
            <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <RevenueChart data={stats?.revenueData} />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Member Growth</h2>
          <MemberGrowthChart data={stats?.memberGrowthData} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </div>
        <div className="divide-y">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full bg-${activity.type}-100`}>
                  {activity.type === 'member' && <Users size={16} />}
                  {activity.type === 'payment' && <CreditCard size={16} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>{' '}
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <StatusBadge status={activity.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;