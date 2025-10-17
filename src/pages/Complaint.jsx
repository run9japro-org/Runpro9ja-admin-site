import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Calendar, Filter } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

export default function ComplaintsManagement() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0 });

  useEffect(() => {
    fetchComplaints();
    fetchStats();
  }, [filterStatus]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const status = filterStatus === 'all' ? '' : filterStatus;
      const response = await fetch(
        `${API_BASE_URL}/complaints?status=${status}&page=1&limit=20`
      );
      const data = await response.json();
      setComplaints(data.complaints);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/complaints/stats/summary`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleRespond = async (complaintId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/complaints/${complaintId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'Responded',
          response: 'Thank you for your complaint. We are looking into this matter.',
          respondedBy: 'Admin'
        })
      });

      if (response.ok) {
        // Refresh the complaints list
        fetchComplaints();
        fetchStats();
      }
    } catch (error) {
      console.error('Error responding to complaint:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading complaints...</div>
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
                Complaints({stats.total})
              </h2>
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
                  {complaints.map((complaint, index) => (
                    <tr key={complaint._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{complaint.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(complaint.date)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                        {complaint.complaint}
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
                          className={`px-4 py-1.5 rounded text-xs font-medium transition-all ${
                            complaint.status === 'Pending'
                              ? 'bg-teal-600 text-white hover:bg-teal-700'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {complaint.status === 'Pending' ? 'Respond' : 'View'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}