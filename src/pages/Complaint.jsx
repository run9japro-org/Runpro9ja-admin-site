import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Calendar, Filter } from 'lucide-react';

export default function ComplaintsManagement() {
  const [filterStatus, setFilterStatus] = useState('all');

  const complaints = [
    { id: 1, name: "Salami Williams", date: "28/08/25", complaint: "I have not seen the laundry service I requested even though I had booked five days before and have been approved", status: "Not Responded" },
    { id: 2, name: "Salami Williams", date: "28/08/25", complaint: "I have not seen the laundry service I requested even though I had booked five days before and have been approved", status: "Not Responded" },
    { id: 3, name: "Salami Williams", date: "28/08/25", complaint: "I have not seen the laundry service I requested even though I had booked five days before and have been approved", status: "Not Responded" },
    { id: 4, name: "Salami Williams", date: "28/08/25", complaint: "I have not seen the laundry service I requested even though I had booked five days before and have been approved", status: "Responded" },
    { id: 5, name: "Salami Williams", date: "28/08/25", complaint: "I have not seen the laundry service I requested even though I had booked five days before and have been approved", status: "Not Responded" },
    { id: 6, name: "Salami Williams", date: "28/08/25", complaint: "I have not seen the laundry service I requested even though I had booked five days before and have been approved", status: "Responded" },
    { id: 7, name: "Salami Williams", date: "28/08/25", complaint: "I have not seen the laundry service I requested even though I had booked five days before and have been approved", status: "Responded" },
    { id: 8, name: "Salami Williams", date: "28/08/25", complaint: "I have not seen the laundry service I requested even though I had booked five days before and have been approved", status: "Responded" },
    { id: 9, name: "Salami Williams", date: "28/08/25", complaint: "I have not seen the laundry service I requested even though I had booked five days before and have been approved", status: "Not Responded" },
    { id: 10, name: "Salami Williams", date: "28/08/25", complaint: "I have not seen the laundry service I requested even though I had booked five days before and have been approved", status: "Not Responded" },
    { id: 11, name: "Salami Williams", date: "28/08/25", complaint: "I have not seen the laundry service I requested even though I had booked five days before and have been approved", status: "Responded" },
    { id: 12, name: "Salami Williams", date: "28/08/25", complaint: "I have not seen the laundry service I requested even though I had booked five days before and have been approved", status: "Responded" },
    { id: 13, name: "Salami Williams", date: "28/08/25", complaint: "I have not seen the laundry service I requested even though I had booked five days before and have been approved", status: "Responded" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}

        {/* Content */}
        <div className="p-6">
          {/* Date Range Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4 inline-flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-teal-600" />
            <span className="text-sm font-medium text-gray-700">03 Monday,October - 08 Saturday, October</span>
          </div>

          {/* Complaints Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-800">Complaints(213)</h2>
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-3 pr-8 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm appearance-none cursor-pointer"
                >
                  <option value="all">All</option>
                  <option value="responded">Responded</option>
                  <option value="not-responded">Not Responded</option>
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
                  {complaints.map((complaint) => (
                    <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-800">{complaint.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{complaint.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{complaint.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-md">{complaint.complaint}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded text-xs font-medium ${
                          complaint.status === 'Responded'
                            ? 'bg-gray-200 text-gray-700'
                            : 'bg-gray-200 text-gray-700'
                        }`}>
                          {complaint.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className={`px-4 py-1.5 rounded text-xs font-medium transition-all ${
                          complaint.status === 'Responded'
                            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            : 'bg-teal-600 text-white hover:bg-teal-700'
                        }`}>
                          {complaint.status === 'Responded' ? 'View' : 'Respond'}
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