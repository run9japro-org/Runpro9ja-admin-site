import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, MoreVertical, Edit2, Trash2, Eye, EyeOff, Filter, Download } from 'lucide-react';
import { getAccounts, deleteAccounts, updateAccount } from '../services/adminService';

export default function AccountsManagement() {
  const [activeTab, setActiveTab] = useState('users');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showPasswords, setShowPasswords] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchAccounts();
  }, [activeTab, currentPage, searchTerm]);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const response = await getAccounts(activeTab, currentPage, 13, searchTerm);
      
      if (response && response.success) {
        setAccounts(response.accounts || []);
        setPagination(response.pagination || {});
      } else {
        setAccounts(getSampleAccounts());
        setPagination({ current: 1, pages: 1, total: 13, showing: 13 });
      }
    } catch (err) {
      console.error("Error fetching accounts:", err);
      setError("Failed to load accounts data");
      setAccounts(getSampleAccounts());
      setPagination({ current: 1, pages: 1, total: 13, showing: 13 });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccounts = async () => {
    if (selectedUsers.length === 0) return;

    try {
      const accountIds = selectedUsers.map(idx => accounts[idx]?.id).filter(Boolean);
      const response = await deleteAccounts(accountIds);
      
      if (response && response.success) {
        alert(`Successfully deleted ${response.deletedCount} accounts`);
        setSelectedUsers([]);
        fetchAccounts(); // Refresh the list
      } else {
        alert('Failed to delete accounts');
      }
    } catch (err) {
      console.error("Error deleting accounts:", err);
      alert('Error deleting accounts');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === accounts.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(accounts.map((_, idx) => idx));
    }
  };

  const toggleSelect = (idx) => {
    if (selectedUsers.includes(idx)) {
      setSelectedUsers(selectedUsers.filter(i => i !== idx));
    } else {
      setSelectedUsers([...selectedUsers, idx]);
    }
  };

  const togglePasswordVisibility = (idx) => {
    setShowPasswords(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Sample data fallback
  const getSampleAccounts = () => {
    return [
      { 
        id: 1, 
        name: "Rakeem Amze", 
        phone: "+234-7034434567", 
        address: "32, Olanipule street, Alukuko", 
        email: "amzeamja9657@gmail.com", 
        dob: "27/09/2001", 
        password: "Sxxxxxx909990",
        avatar: "RA"
      },
      { 
        id: 2, 
        name: "Rakeem Amze", 
        phone: "+234 8009654545", 
        address: "32, Olanipule street, Alukuko", 
        email: "rakemmju7865@gmail.com", 
        dob: "18/10/1876", 
        password: "Sxxxxxx909990",
        avatar: "RA"
      },
    ];
  };

  // Safe data access
  const safeString = (value, fallback = 'N/A') => {
    if (value === null || value === undefined || value === '') return fallback;
    if (typeof value === 'object') return fallback;
    return String(value);
  };

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    const totalPages = pagination.pages || 1;
    const current = pagination.current || 1;

    // Always show first page
    buttons.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
          current === 1
            ? 'bg-emerald-600 text-white border border-emerald-600'
            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
        }`}
      >
        1
      </button>
    );

    // Show ellipsis if needed
    if (current > 3) {
      buttons.push(
        <span key="ellipsis1" className="px-2 text-slate-500">
          ...
        </span>
      );
    }

    // Show pages around current page
    for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) {
      if (i !== 1 && i !== totalPages) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              current === i
                ? 'bg-emerald-600 text-white border border-emerald-600'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {i}
          </button>
        );
      }
    }

    // Show ellipsis if needed
    if (current < totalPages - 2) {
      buttons.push(
        <span key="ellipsis2" className="px-2 text-slate-500">
          ...
        </span>
      );
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            current === totalPages
              ? 'bg-emerald-600 text-white border border-emerald-600'
              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Content */}
        <div className="p-8">
          {error && (
            <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 text-orange-700 mb-6">
              {error} - Showing sample data
            </div>
          )}

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => {
                  setActiveTab('users');
                  setCurrentPage(1);
                }}
                className={`px-8 py-4 font-semibold transition-all ${
                  activeTab === 'users'
                    ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                Users ({pagination.total || 0})
              </button>
              <button
                onClick={() => {
                  setActiveTab('service-provider');
                  setCurrentPage(1);
                }}
                className={`px-8 py-4 font-semibold transition-all ${
                  activeTab === 'service-provider'
                    ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                Service Provider
              </button>
              <button
                onClick={() => {
                  setActiveTab('customer-care');
                  setCurrentPage(1);
                }}
                className={`px-8 py-4 font-semibold transition-all ${
                  activeTab === 'customer-care'
                    ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                Customer care
              </button>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              {selectedUsers.length > 0 && (
                <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2">
                  <span className="text-sm font-medium text-emerald-700">
                    {selectedUsers.length} selected
                  </span>
                  <button 
                    onClick={handleDeleteAccounts}
                    className="text-emerald-600 hover:text-emerald-700 p-1 hover:bg-emerald-100 rounded transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all">
                <Filter className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Filter</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all">
                <Download className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Export</span>
              </button>
            </div>
            <button 
              onClick={handleDeleteAccounts}
              disabled={selectedUsers.length === 0}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                selectedUsers.length > 0
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              Delete Account{selectedUsers.length !== 1 ? 's' : ''}
            </button>
          </div>

          {/* Accounts Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === accounts.length && accounts.length > 0}
                        onChange={toggleSelectAll}
                        disabled={accounts.length === 0}
                        className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Phone number</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">E-mail Address</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date of Birth</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Password</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    // Loading skeleton
                    Array.from({ length: 5 }).map((_, idx) => (
                      <tr key={idx} className="animate-pulse">
                        <td className="px-6 py-4">
                          <div className="w-4 h-4 bg-slate-200 rounded"></div>
                        </td>
                        {Array.from({ length: 7 }).map((_, cellIdx) => (
                          <td key={cellIdx} className="px-6 py-4">
                            <div className="h-4 bg-slate-200 rounded"></div>
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : accounts.length > 0 ? (
                    accounts.map((user, idx) => (
                      <tr key={user.id || idx} className={`hover:bg-slate-50 transition-colors ${selectedUsers.includes(idx) ? 'bg-emerald-50/30' : ''}`}>
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(idx)}
                            onChange={() => toggleSelect(idx)}
                            className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {safeString(user.avatar, 'U')}
                            </div>
                            <span className="text-sm font-medium text-slate-800">
                              {safeString(user.name, 'User')}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {safeString(user.phone, 'Not provided')}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {safeString(user.address, 'Address not specified')}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {safeString(user.email, 'No email')}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {safeString(user.dob, 'Not provided')}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-mono text-slate-600">
                              {showPasswords[idx] ? safeString(user.password, 'No password') : '••••••••'}
                            </span>
                            <button
                              onClick={() => togglePasswordVisibility(idx)}
                              className="p-1 hover:bg-slate-100 rounded transition-all"
                            >
                              {showPasswords[idx] ? (
                                <EyeOff className="w-4 h-4 text-slate-400" />
                              ) : (
                                <Eye className="w-4 h-4 text-slate-400" />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-all">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => {
                                const accountIds = [accounts[idx]?.id].filter(Boolean);
                                if (accountIds.length > 0) {
                                  if (window.confirm('Are you sure you want to delete this account?')) {
                                    deleteAccounts(accountIds).then(fetchAccounts);
                                  }
                                }
                              }}
                              className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-all">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-8 text-center text-slate-500">
                        No accounts found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {!loading && accounts.length > 0 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
                <div className="text-sm text-slate-600">
                  Showing <span className="font-medium text-slate-800">1-{pagination.showing}</span> of{' '}
                  <span className="font-medium text-slate-800">{pagination.total}</span> accounts
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentPage === 1
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {renderPaginationButtons()}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.pages}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentPage === pagination.pages
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}