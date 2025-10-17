import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, X } from 'lucide-react';

const AccountsManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [activeTab, setActiveTab] = useState('customers');
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    username: '',
    fullName: '',
    role: 'ADMIN_CUSTOMER_SERVICE',
  });
  const [createMessage, setCreateMessage] = useState('');

  const fetchAccounts = async (type = 'customers') => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`/api/admin/accounts?type=${type}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccounts(res.data.accounts || []);
    } catch (err) {
      console.error('Error fetching accounts:', err);
    }
  };

  useEffect(() => {
    fetchAccounts(activeTab);
  }, [activeTab]);

  const handleDeleteAccount = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/admin/accounts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAccounts(activeTab);
    } catch (err) {
      console.error('Error deleting account:', err);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/admin', newAdmin, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCreateMessage(`✅ Admin created! Temporary password: ${res.data.data.password}`);
      setShowAddAdmin(false);
      setNewAdmin({ username: '', fullName: '', role: 'ADMIN_CUSTOMER_SERVICE' });
      fetchAccounts(activeTab);
    } catch (err) {
      setCreateMessage(`❌ ${err.response?.data?.message || 'Error creating admin'}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">Accounts Management</h1>

          {/* Show Add Admin only on Admin (customer-care) tab */}
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

        {/* Account List */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-slate-700">
            <thead className="border-b border-slate-200 text-slate-500 text-sm uppercase">
              <tr>
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Full Name</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Created At</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.length > 0 ? (
                accounts.map((acc) => (
                  <tr key={acc._id} className="border-b hover:bg-slate-50 transition-all">
                    <td className="py-3 px-4">{acc.username || acc.email}</td>
                    <td className="py-3 px-4">{acc.fullName}</td>
                    <td className="py-3 px-4">{acc.role}</td>
                    <td className="py-3 px-4">
                      {new Date(acc.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDeleteAccount(acc._id)}
                        className="text-red-500 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-slate-500 italic">
                    No accounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
              <p className="mt-4 text-sm text-center text-slate-600">
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
