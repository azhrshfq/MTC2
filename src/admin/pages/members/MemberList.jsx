// src/admin/pages/members/MemberList.jsx
import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Plus, MoreVertical } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import SearchBar from '../../components/common/SearchBar';
import ExportButton from '../../components/common/ExportButton';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [selectedMembers, setSelectedMembers] = useState([]);

  const columns = [
    {
      key: 'membership_number',
      label: 'Member ID',
      sortable: true
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (row) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600">
              {row.name.charAt(0)}
            </span>
          </div>
          <div className="ml-3">
            <p className="font-medium">{row.name}</p>
            <p className="text-sm text-gray-500">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      key: 'plan',
      label: 'Plan',
      render: (row) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
          {row.plan}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      key: 'joined_date',
      label: 'Joined',
      sortable: true,
      render: (row) => new Date(row.joined_date).toLocaleDateString()
    },
    {
      key: 'actions',
      label: '',
      render: (row) => (
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <MoreVertical size={16} />
        </button>
      )
    }
  ];

  const fetchMembers = async () => {
    setLoading(true);
    try {
      // API call to fetch members
      const response = await adminApi.getMembers(filters);
      setMembers(response.data);
    } catch (error) {
      console.error('Failed to fetch members:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [filters]);

  const handleBulkAction = (action) => {
    if (selectedMembers.length === 0) return;
    
    switch(action) {
      case 'approve':
        // Approve selected members
        break;
      case 'export':
        // Export selected members
        break;
      case 'delete':
        // Delete selected members
        break;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Member Management</h1>
        <div className="flex gap-2">
          <ExportButton 
            data={members}
            filename="members_export.csv"
          />
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={16} className="mr-2" />
            Add Member
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex gap-4">
          <SearchBar 
            placeholder="Search members..."
            onSearch={(term) => setFilters({ ...filters, search: term })}
          />
          
          <select 
            className="border rounded-lg px-3 py-2"
            onChange={(e) => setFilters({ ...filters, plan: e.target.value })}
          >
            <option value="">All Plans</option>
            <option value="basic">Basic</option>
            <option value="plus">Plus</option>
          </select>
          
          <select 
            className="border rounded-lg px-3 py-2"
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedMembers.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-4 mb-4 flex items-center justify-between">
          <span>{selectedMembers.length} members selected</span>
          <div className="flex gap-2">
            <button 
              onClick={() => handleBulkAction('approve')}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Approve
            </button>
            <button 
              onClick={() => handleBulkAction('export')}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Export
            </button>
          </div>
        </div>
      )}

      {/* Members Table */}
      <DataTable
        columns={columns}
        data={members}
        loading={loading}
        selectable
        onSelect={setSelectedMembers}
        onSort={(key, direction) => setFilters({ ...filters, sort: key, direction })}
      />

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Showing 1-10 of {members.length} members
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded hover:bg-gray-50">Previous</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default MemberList;