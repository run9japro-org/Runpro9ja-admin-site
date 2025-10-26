import React, { useState, useEffect } from 'react';
import { ChevronDown, Calendar, RefreshCw, AlertCircle } from 'lucide-react';

const API_BASE_URL = 'https://runpro9ja-pxqoa.ondigitalocean.app/api';

export default function ComplaintsManagement() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0 });
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState('');

  // Get authentication data
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  const getUserInfo = () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };

  // Check if user has admin role according to backend
  const hasAdminRole = () => {
    const user = getUserInfo();
    if (!user || !user.role) return false;
    
    const userRole = user.role.trim();
    const adminRoles = [
      'super_admin',
      'admin_head', 
      'admin_agent_service',
      'admin_customer_service',
      'representative'
    ];
    
    const hasRole = adminRoles.includes(userRole);
    console.log('Role check:', { userRole, hasRole, adminRoles });
    return hasRole;
  };

  const isAuthenticated = () => {
    const token = getAuthToken();
    const user = getUserInfo();
    return !!token && !!user;
  };

  // Debug function to check authentication
  const checkAuthStatus = () => {
    const token = getAuthToken();
    const user = getUserInfo();
    
  };

  useEffect(() => {
    checkAuthStatus(); // Check auth status on component mount
    
    const initializeComponent = async () => {
      if (!isAuthenticated()) {
        setError('Please log in to access complaints');
        setLoading(false);
        return;
      }

      if (!hasAdminRole()) {
        const user = getUserInfo();
        setError(`Access denied. Your role "${user?.role}" does not have admin privileges.`);
        setLoading(false);
        return;
      }

      await fetchComplaints();
      await fetchStats();
    };

    initializeComponent();
  }, [filterStatus]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError('');
      const token = getAuthToken();
      
      if (!token) {
        setError('Authentication token missing');
        setLoading(false);
        return;
      }

      console.log('🔄 Fetching complaints with token:', token ? `${token.substring(0, 20)}...` : 'None');

      const status = filterStatus === 'all' ? '' : filterStatus;
      const response = await fetch(
        `${API_BASE_URL}/complaints?status=${status}&page=1&limit=20`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('📡 Complaints API Response:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url
      });

      if (response.status === 403) {
        const errorText = await response.text();
        console.error('❌ 403 Forbidden Details:', errorText);
        setError(`Admin access required. Server says: ${errorText || 'No additional details'}`);
        setLoading(false);
        return;
      }

      if (response.status === 401) {
        setError('Session expired. Please log in again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log('✅ Complaints data received:', data);
      setComplaints(data.complaints || []);
    } catch (error) {
      console.error('❌ Error fetching complaints:', error);
      setError(`Failed to fetch complaints: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = getAuthToken();
      
      if (!token) return;

      console.log('🔄 Fetching stats with token:', token ? `${token.substring(0, 20)}...` : 'None');

      const response = await fetch(`${API_BASE_URL}/complaints/stats/summary`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 Stats API Response:', {
        status: response.status,
        statusText: response.statusText
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
        console.log('✅ Stats data received:', data);
      } else if (response.status === 403) {
        console.warn('⚠️ No permission to access stats');
      } else {
        console.warn('⚠️ Stats fetch failed:', response.status);
      }
    } catch (error) {
      console.error('❌ Error fetching stats:', error);
    }
  };

  const handleRespond = async (complaintId) => {
    try {
      const token = getAuthToken();
      const user = getUserInfo();
      
      if (!token) {
        setError('Please log in to perform this action');
        return;
      }

      console.log('🔄 Responding to complaint:', complaintId);

      const response = await fetch(`${API_BASE_URL}/complaints/${complaintId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: 'Responded',
          response: 'Thank you for your complaint. We are looking into this matter.',
          respondedBy: user?.name || 'Admin'
        })
      });

      if (response.status === 403) {
        setError('Access denied. Admin privileges required to respond to complaints.');
        return;
      }

      if (response.ok) {
        console.log('✅ Response sent successfully');
        // Refresh the complaints list
        await fetchComplaints();
        await fetchStats();
        setError(''); // Clear any previous errors
      } else {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
      }
    } catch (error) {
      console.error('❌ Error responding to complaint:', error);
      setError(`Failed to respond to complaint: ${error.message}`);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString('en-GB');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const handleRetry = () => {
    setError('');
    checkAuthStatus();
    fetchComplaints();
    fetchStats();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleRefresh = () => {
    checkAuthStatus();
    fetchComplaints();
    fetchStats();
  };

  // Show loading state
  if (loading && complaints.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-teal-600 mx-auto mb-4" />
          <div className="text-lg text-gray-600">Loading complaints...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
       

        {/* Content */}
        <div className="p-6">
          {/* Date Range Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4 inline-flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-teal-600" />
            <span className="text-sm font-medium text-gray-700">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>

          {/* Complaints Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-800">
                Complaints ({stats.total || 0})
              </h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-3 pr-8 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm appearance-none cursor-pointer"
                  >
                    <option value="all">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Responded">Responded</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">S/N</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Complaint</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {complaints.length > 0 ? (
                    complaints.map((complaint, index) => (
                      <tr key={complaint._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{complaint.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDate(complaint.date)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                          <div className="max-w-xs truncate" title={complaint.complaint}>
                            {complaint.complaint}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded text-xs font-medium ${
                            complaint.status === 'Responded' || complaint.status === 'Resolved'
                              ? 'bg-green-100 text-green-800'
                              : complaint.status === 'In Progress'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => complaint.status === 'Pending' ? handleRespond(complaint._id) : null}
                            disabled={complaint.status !== 'Pending'}
                            className={`px-4 py-1.5 rounded text-xs font-medium transition-all ${
                              complaint.status === 'Pending'
                                ? 'bg-teal-600 text-white hover:bg-teal-700 cursor-pointer'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {complaint.status === 'Pending' ? 'Respond' : 'View'}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center justify-center">
                          <AlertCircle className="w-12 h-12 text-gray-300 mb-4" />
                          <div className="text-lg font-medium text-gray-400">
                            {error ? 'Unable to load complaints' : 'No complaints found'}
                          </div>
                          {!error && (
                            <button
                              onClick={handleRefresh}
                              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 flex items-center space-x-2"
                            >
                              <RefreshCw className="w-4 h-4" />
                              <span>Refresh</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}