import React, { useState, useEffect } from 'react';
import { Plus, X, Search, Trash2, Check, CheckSquare, Square } from 'lucide-react';
import { getAccounts, deleteAccounts } from '../services/adminService';

const AccountsManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState(new Set());
  const [activeTab, setActiveTab] = useState('customers');
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newAdmin, setNewAdmin] = useState({
    username: '',
    fullName: '',
    role: 'ADMIN_CUSTOMER_SERVICE',
  });
  const [createMessage, setCreateMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAccounts = async (type = 'customers', search = '') => {
    try {
      setLoading(true);
      setError('');
      const response = await getAccounts(type, 1, 50, search);
      
      if (response.success) {
        setAccounts(response.data || []);
        // Clear selections when accounts change
        setSelectedAccounts(new Set());
      } else {
        setError(response.message || 'Failed to load accounts');
        setAccounts([]);
      }
    } catch (err) {
      console.error('Error fetching accounts:', err);
      setError('Failed to load accounts. Please try again.');
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts(activeTab, searchTerm);
  }, [activeTab]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchAccounts(activeTab, searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Selection handlers
  const toggleSelectAll = () => {
    if (selectedAccounts.size === accounts.length) {
      // Deselect all
      setSelectedAccounts(new Set());
    } else {
      // Select all
      const allIds = accounts.map(acc => acc._id);
      setSelectedAccounts(new Set(allIds));
    }
  };

  const toggleSelectAccount = (accountId) => {
    const newSelected = new Set(selectedAccounts);
    if (newSelected.has(accountId)) {
      newSelected.delete(accountId);
    } else {
      newSelected.add(accountId);
    }
    setSelectedAccounts(newSelected);
  };

  const isAllSelected = accounts.length > 0 && selectedAccounts.size === accounts.length;
  const isSomeSelected = selectedAccounts.size > 0 && selectedAccounts.size < accounts.length;

  // Delete handlers
  // Update your delete handlers with better error handling
const handleDeleteSelected = async () => {
  if (selectedAccounts.size === 0) {
    alert('Please select at least one account to delete.');
    return;
  }

  if (!window.confirm(`Are you sure you want to delete ${selectedAccounts.size} account(s)? This action cannot be undone.`)) {
    return;
  }
  
  try {
    setLoading(true);
    const accountIds = Array.from(selectedAccounts);
    console.log('🗑️ Attempting to delete accounts:', accountIds);
    
    const result = await deleteAccounts(accountIds);
    
    if (result.success) {
      console.log('✅ Delete successful:', result.message);
      alert(`✅ ${result.message}`);
      fetchAccounts(activeTab, searchTerm);
    } else {
      alert(`❌ ${result.message || 'Delete failed'}`);
    }
  } catch (err) {
    console.error('❌ Delete error:', err);
    const errorMessage = err.response?.data?.message || err.message || 'Failed to delete accounts';
    alert(`❌ ${errorMessage}`);
  } finally {
    setLoading(false);
  }
};

const handleDeleteSingle = async (id) => {
  // 🔍 Add these debug logs
  console.log('🔍 handleDeleteSingle called with id:', id);
  console.log('🔍 id type:', typeof id);
  console.log('🔍 id value:', JSON.stringify(id));
  
  if (!id) {
    alert('❌ Invalid account ID');
    return;
  }
  
  if (!window.confirm('Are you sure you want to delete this account? This action cannot be undone.')) {
    return;
  }
  
  try {
    setLoading(true);
    const accountIds = [id];
    console.log('🗑️ Attempting to delete account with IDs array:', accountIds);
    
    const result = await deleteAccounts(accountIds);
    
    if (result.success) {
      console.log('✅ Delete successful:', result.message);
      alert(`✅ ${result.message}`);
      fetchAccounts(activeTab, searchTerm);
    } else {
      alert(`❌ ${result.message || 'Delete failed'}`);
    }
  } catch (err) {
    console.error('❌ Delete error:', err);
    console.error('❌ Error response:', err.response?.data);
    const errorMessage = err.response?.data?.message || err.message || 'Failed to delete account';
    alert(`❌ ${errorMessage}`);
  } finally {
    setLoading(false);
  }
};

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      setCreateMessage('');
      const token = localStorage.getItem("token");
      const API_URL = "https://runpro9ja-pxqoa.ondigitalocean.app/api";
      
      const res = await fetch(`${API_URL}/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newAdmin)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setCreateMessage(`✅ Admin created! Temporary password: ${data.data.password}`);
        setShowAddAdmin(false);
        setNewAdmin({ username: '', fullName: '', role: 'ADMIN_CUSTOMER_SERVICE' });
        fetchAccounts(activeTab, searchTerm);
      } else {
        setCreateMessage(`❌ ${data.message || 'Error creating admin'}`);
      }
    } catch (err) {
      setCreateMessage(`❌ Error creating admin: ${err.message}`);
    }
  };

  const getRoleDisplayName = (role) => {
    const roleMap = {
      'CUSTOMER': 'Customer',
      'AGENT': 'Agent',
      'REPRESENTATIVE': 'Representative',
      'ADMIN_CUSTOMER_SERVICE': 'Customer Service Admin',
      'ADMIN_AGENT_SERVICE': 'Agent Service Admin',
      'SUPER_ADMIN': 'Super Admin',
      'ADMIN_HEAD': 'Admin Head'
    };
    return roleMap[role] || role;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">Accounts Management</h1>

          <div className="flex items-center space-x-3">
            {/* Bulk Delete Button - Show when accounts are selected */}
            {selectedAccounts.size > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Selected ({selectedAccounts.size})</span>
              </button>
            )}

            {/* Show Add Admin only on Admin tab */}
            {activeTab === 'admins' && (
              <button
                onClick={() => setShowAddAdmin(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Admin</span>
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-3 mb-6 border-b border-slate-200 overflow-x-auto">
          {[
            { key: 'customers', label: 'Customers' },
            { key: 'agents', label: 'Agents' },
            { key: 'admins', label: 'Admins' },
            { key: 'representatives', label: 'Representatives' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-t-lg font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-emerald-100 text-emerald-700 border-b-2 border-emerald-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Selection Info Bar */}
        {selectedAccounts.size > 0 && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-blue-700 font-medium">
                {selectedAccounts.size} account(s) selected
              </p>
              <button
                onClick={() => setSelectedAccounts(new Set())}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="text-slate-500 mt-2">Loading accounts...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => fetchAccounts(activeTab, searchTerm)}
              className="mt-2 text-red-600 hover:text-red-800 font-medium"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Account List */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-slate-700">
              <thead className="border-b border-slate-200 text-slate-500 text-sm uppercase">
                <tr>
                  <th className="py-3 px-4 w-12">
                    <button
                      onClick={toggleSelectAll}
                      className="flex items-center justify-center w-5 h-5 border border-slate-300 rounded hover:bg-slate-100 transition-colors"
                    >
                      {isAllSelected ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                      ) : isSomeSelected ? (
                        <div className="w-3 h-3 bg-emerald-600 rounded-sm" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </th>
                  <th className="py-3 px-4">Username/Email</th>
                  <th className="py-3 px-4">Full Name</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Created At</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {accounts.length > 0 ? (
                  accounts.map((acc) => (
                    <tr 
                      key={acc._id} 
                      className={`border-b hover:bg-slate-50 transition-all ${
                        selectedAccounts.has(acc._id) ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleSelectAccount(acc._id)}
                          className="flex items-center justify-center w-5 h-5 border border-slate-300 rounded hover:bg-slate-100 transition-colors"
                        >
                          {selectedAccounts.has(acc._id) ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{acc.username || acc.email}</div>
                          {acc.email && acc.username && (
                            <div className="text-xs text-slate-500">{acc.email}</div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">{acc.fullName || 'N/A'}</td>
                      <td className="py-3 px-4">{acc.phone || 'N/A'}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          acc.role?.includes('ADMIN') 
                            ? 'bg-purple-100 text-purple-800'
                            : acc.role === 'AGENT'
                            ? 'bg-blue-100 text-blue-800'
                            : acc.role === 'REPRESENTATIVE'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {getRoleDisplayName(acc.role)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          acc.isVerified 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {acc.isVerified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {acc.createdAt ? new Date(acc.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleDeleteSingle(acc._id)}
                            className="flex items-center space-x-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-6 text-slate-500 italic">
                      No {activeTab} found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Admin Drawer */}
      {showAddAdmin && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-xl p-6 relative animate-slideInRight">
            <button
              onClick={() => setShowAddAdmin(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-slate-800">
              Create New Admin
            </h2>
            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={newAdmin.username}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, username: e.target.value })
                  }
                  required
                  className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newAdmin.fullName}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, fullName: e.target.value })
                  }
                  required
                  className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Role
                </label>
                <select
                  value={newAdmin.role}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, role: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="ADMIN_CUSTOMER_SERVICE">Customer Service Admin</option>
                  <option value="ADMIN_AGENT_SERVICE">Agent Service Admin</option>
                  <option value="REPRESENTATIVE">Representative</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition-all"
              >
                Create Admin
              </button>
            </form>
            {createMessage && (
              <p className={`mt-4 text-sm text-center ${
                createMessage.includes('✅') ? 'text-green-600' : 'text-red-600'
              }`}>
                {createMessage}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountsManagement;