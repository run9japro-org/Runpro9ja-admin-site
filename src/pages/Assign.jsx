import React, { useState, useEffect } from "react";
import { Search, Filter, User, Mail, Phone, MapPin, Calendar, Clock, CheckCircle, XCircle, AlertCircle, MoreVertical } from "lucide-react";
import { 
  getServiceRequests, 
  getSupportEmployees,
  assignRequestToEmployee,
  updateRequestStatus
} from "../services/adminService";

const Assign = () => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState({
    requests: true,
    employees: true
  });
  const [error, setError] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceTypeFilter, setServiceTypeFilter] = useState("all");
  const [employeeFilter, setEmployeeFilter] = useState("all");
  
  // Assignment states
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [assignmentNote, setAssignmentNote] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [activeActionMenu, setActiveActionMenu] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch service requests
        const requestsResponse = await getServiceRequests(100, '');
        if (requestsResponse && requestsResponse.success) {
          setServiceRequests(requestsResponse.serviceRequests || []);
        } else {
          setServiceRequests(getSampleServiceRequests());
        }

        // Fetch employees
        const employeesResponse = await getSupportEmployees();
        if (employeesResponse && employeesResponse.success) {
          setEmployees(employeesResponse.employees || []);
        } else {
          setEmployees(getSampleEmployees());
        }

      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
        setServiceRequests(getSampleServiceRequests());
        setEmployees(getSampleEmployees());
      } finally {
        setLoading({
          requests: false,
          employees: false
        });
      }
    };

    fetchData();
  }, []);

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveActionMenu(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Filter requests based on search and filters
  const filteredRequests = serviceRequests.filter(request => {
    const matchesSearch = 
      request.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requestId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.serviceType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.phone?.includes(searchTerm) ||
      request.address?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    const matchesServiceType = serviceTypeFilter === "all" || request.serviceType === serviceTypeFilter;
    const matchesEmployee = employeeFilter === "all" || request.assignedTo === employeeFilter;

    return matchesSearch && matchesStatus && matchesServiceType && matchesEmployee;
  });

  // Handle assignment
  const handleAssignRequest = (request) => {
    setSelectedRequest(request);
    setShowAssignmentModal(true);
  };

  const handleConfirmAssignment = async () => {
    if (!selectedRequest || !selectedEmployee) return;

    setAssigning(true);
    try {
      // Call API to assign request
      const result = await assignRequestToEmployee(
        selectedRequest.requestId, 
        selectedEmployee.id,
        assignmentNote
      );

      if (result && result.success) {
        // Update local state
        setServiceRequests(prev => 
          prev.map(req => 
            req.requestId === selectedRequest.requestId 
              ? { 
                  ...req, 
                  status: 'assigned',
                  assignedTo: selectedEmployee.name,
                  assignedEmployeeId: selectedEmployee.id,
                  assignmentDate: new Date().toLocaleDateString(),
                  assignmentNote: assignmentNote
                }
              : req
          )
        );
        
        setShowAssignmentModal(false);
        setSelectedRequest(null);
        setSelectedEmployee(null);
        setAssignmentNote("");
        alert(`Successfully assigned ${selectedRequest.requestId} to ${selectedEmployee.name}`);
      } else {
        throw new Error('Assignment failed');
      }
    } catch (error) {
      console.error("Assignment error:", error);
      alert("Failed to assign request. Please try again.");
    } finally {
      setAssigning(false);
    }
  };

  // Handle status updates (Reject, Pending, etc.)
  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      const result = await updateRequestStatus(requestId, newStatus);
      
      if (result && result.success) {
        // Update local state
        setServiceRequests(prev =>
          prev.map(req =>
            req.requestId === requestId
              ? {
                  ...req,
                  status: newStatus,
                  statusUpdateDate: new Date().toLocaleDateString()
                }
              : req
          )
        );
        
        let statusMessage = "";
        switch (newStatus) {
          case 'rejected':
            statusMessage = "Request rejected successfully";
            break;
          case 'pending':
            statusMessage = "Request marked as pending";
            break;
          case 'completed':
            statusMessage = "Request marked as completed";
            break;
          default:
            statusMessage = "Status updated successfully";
        }
        
        alert(statusMessage);
      } else {
        throw new Error('Status update failed');
      }
    } catch (error) {
      console.error("Status update error:", error);
      alert("Failed to update status. Please try again.");
    }
    setActiveActionMenu(null);
  };

  // Action Menu Component
  const ActionMenu = ({ request }) => {
    const handleMenuClick = (e) => {
      e.stopPropagation();
      setActiveActionMenu(activeActionMenu === request.requestId ? null : request.requestId);
    };

    const handleAction = (e, action) => {
      e.stopPropagation();
      switch (action) {
        case 'assign':
          handleAssignRequest(request);
          break;
        case 'reject':
          if (confirm(`Are you sure you want to reject request ${request.requestId}?`)) {
            handleStatusUpdate(request.requestId, 'rejected');
          }
          break;
        case 'pending':
          handleStatusUpdate(request.requestId, 'pending');
          break;
        case 'complete':
          handleStatusUpdate(request.requestId, 'completed');
          break;
        default:
          break;
      }
    };

    return (
      <div className="relative">
        <button
          onClick={handleMenuClick}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <MoreVertical className="w-4 h-4 text-gray-500" />
        </button>

        {activeActionMenu === request.requestId && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            <div className="py-1">
              {/* Assign Button */}
              <button
                onClick={(e) => handleAction(e, 'assign')}
                disabled={request.status === 'assigned' || request.status === 'completed'}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <User className="w-4 h-4 mr-2 text-blue-600" />
                {request.status === 'assigned' ? 'Already Assigned' : 'Assign to Employee'}
              </button>

              {/* Pending Button */}
              <button
                onClick={(e) => handleAction(e, 'pending')}
                disabled={request.status === 'pending'}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Clock className="w-4 h-4 mr-2 text-yellow-600" />
                {request.status === 'pending' ? 'Already Pending' : 'Mark as Pending'}
              </button>

              {/* Complete Button */}
              <button
                onClick={(e) => handleAction(e, 'complete')}
                disabled={request.status === 'completed'}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                {request.status === 'completed' ? 'Completed' : 'Mark as Completed'}
              </button>

              {/* Reject Button */}
              <button
                onClick={(e) => handleAction(e, 'reject')}
                disabled={request.status === 'rejected'}
                className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <XCircle className="w-4 h-4 mr-2 text-red-600" />
                {request.status === 'rejected' ? 'Rejected' : 'Reject Request'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    const getStatusConfig = (status) => {
      switch (status?.toLowerCase()) {
        case 'assigned':
          return { color: 'bg-blue-100 text-blue-800 border-blue-200', text: 'Assigned' };
        case 'completed':
          return { color: 'bg-green-100 text-green-800 border-green-200', text: 'Completed' };
        case 'pending':
          return { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', text: 'Pending' };
        case 'rejected':
          return { color: 'bg-red-100 text-red-800 border-red-200', text: 'Rejected' };
        case 'in progress':
          return { color: 'bg-purple-100 text-purple-800 border-purple-200', text: 'In Progress' };
        default:
          return { color: 'bg-gray-100 text-gray-800 border-gray-200', text: status || 'Unknown' };
      }
    };

    const config = getStatusConfig(status);

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
        {config.text}
      </span>
    );
  };

  // Sample data
  const getSampleServiceRequests = () => {
    return [
      {
        requestId: "SR-001",
        customerName: "Adejabola Ayomide",
        serviceType: "Babysitting",
        status: "pending",
        dueDate: "15/06/2025",
        phone: "+234-801-234-5678",
        address: "123 Victoria Island, Lagos",
        email: "adejabola@email.com",
        createdAt: "10/06/2025",
        priority: "Medium"
      },
      {
        requestId: "SR-002",
        customerName: "Chinedu Okoro",
        serviceType: "Plumbing",
        status: "assigned",
        dueDate: "10/06/2025",
        phone: "+234-802-345-6789",
        address: "45 Ikeja GRA, Lagos",
        email: "chinedu@email.com",
        assignedTo: "Shade Musab",
        assignedEmployeeId: 1,
        assignmentDate: "09/06/2025",
        createdAt: "08/06/2025",
        priority: "High"
      },
      {
        requestId: "SR-003",
        customerName: "Funke Adebayo",
        serviceType: "Cleaning",
        status: "completed",
        dueDate: "20/06/2025",
        phone: "+234-803-456-7890",
        address: "78 Lekki Phase 1, Lagos",
        email: "funke@email.com",
        assignedTo: "John Adebayo",
        assignedEmployeeId: 2,
        assignmentDate: "15/06/2025",
        completionDate: "18/06/2025",
        createdAt: "12/06/2025",
        priority: "Low"
      },
      {
        requestId: "SR-004",
        customerName: "Bola Ahmed",
        serviceType: "Personal Assistant",
        status: "in progress",
        dueDate: "25/06/2025",
        phone: "+234-804-567-8901",
        address: "32 Surulere, Lagos",
        email: "bola@email.com",
        assignedTo: "Shade Musab",
        assignedEmployeeId: 1,
        assignmentDate: "20/06/2025",
        createdAt: "18/06/2025",
        priority: "Medium"
      },
      {
        requestId: "SR-005",
        customerName: "Grace Okafor",
        serviceType: "Errand Service",
        status: "rejected",
        dueDate: "12/06/2025",
        phone: "+234-805-678-9012",
        address: "56 Yaba, Lagos",
        email: "grace@email.com",
        rejectionReason: "Service not available in area",
        createdAt: "10/06/2025",
        priority: "High"
      }
    ];
  };

  const getSampleEmployees = () => {
    return [
      {
        id: 1,
        name: "Shade Musab",
        role: "Customer Service Agent",
        department: "Customer care service",
        email: "shademusab78@gmail.com",
        phone: "+234-809-456-7300",
        hired: "22/02/2025",
        specialization: ["Babysitting", "Personal Assistant", "Errand Service"],
        currentWorkload: 3,
        maxWorkload: 8,
        rating: 4.8
      },
      {
        id: 2,
        name: "John Adebayo",
        role: "Agent Service Manager",
        department: "Agent Service Department",
        email: "john.adebayo@company.com",
        phone: "+234-809-456-7400",
        hired: "15/01/2025",
        specialization: ["Plumbing", "Cleaning", "Professional Services"],
        currentWorkload: 5,
        maxWorkload: 10,
        rating: 4.9
      },
      {
        id: 3,
        name: "Amina Yusuf",
        role: "Support Specialist",
        department: "Customer care service",
        email: "amina.yusuf@company.com",
        phone: "+234-809-456-7500",
        hired: "10/03/2025",
        specialization: ["Cleaning", "Errand Service", "Delivery"],
        currentWorkload: 2,
        maxWorkload: 8,
        rating: 4.7
      }
    ];
  };

  // Loading skeleton
  const TableRowSkeleton = () => {
    return (
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-20"></div>
        </td>
      </tr>
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Request Assignment</h1>
          <p className="text-gray-600">Assign service requests to available employees</p>
        </div>
        <div className="text-sm text-gray-500">
          {filteredRequests.length} requests found
        </div>
      </div>

      {error && (
        <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 text-orange-700">
          {error} - Showing sample data
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Service Type Filter */}
          <select
            value={serviceTypeFilter}
            onChange={(e) => setServiceTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Services</option>
            <option value="Babysitting">Babysitting</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Personal Assistant">Personal Assistant</option>
            <option value="Errand Service">Errand Service</option>
          </select>

          {/* Employee Filter */}
          <select
            value={employeeFilter}
            onChange={(e) => setEmployeeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Employees</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.name}>{emp.name}</option>
            ))}
          </select>

          {/* Reset Filters */}
          <button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setServiceTypeFilter("all");
              setEmployeeFilter("all");
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Request ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Phone & Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Service Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading.requests ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRowSkeleton key={index} />
                ))
              ) : filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <tr key={request.requestId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {request.requestId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{request.customerName}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {request.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <Phone className="w-3 h-3 mr-1 text-gray-400" />
                          {request.phone}
                        </div>
                        <div className="flex items-start mt-1">
                          <MapPin className="w-3 h-3 mr-1 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-gray-600 break-words">{request.address}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.serviceType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={request.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                        {request.dueDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.assignedTo || "Not assigned"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <ActionMenu request={request} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                    No service requests found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assignment Modal */}
      {showAssignmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Assign Request {selectedRequest?.requestId}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Employee
                  </label>
                  <select
                    value={selectedEmployee?.id || ''}
                    onChange={(e) => {
                      const emp = employees.find(e => e.id === parseInt(e.target.value));
                      setSelectedEmployee(emp);
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Choose an employee...</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} - {emp.role} ({emp.currentWorkload}/{emp.maxWorkload} workload)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assignment Notes (Optional)
                  </label>
                  <textarea
                    value={assignmentNote}
                    onChange={(e) => setAssignmentNote(e.target.value)}
                    placeholder="Add any special instructions or notes..."
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  />
                </div>

                {selectedEmployee && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Employee Details:</h4>
                    <p className="text-sm text-gray-600">
                      <strong>Name:</strong> {selectedEmployee.name}<br/>
                      <strong>Role:</strong> {selectedEmployee.role}<br/>
                      <strong>Specialization:</strong> {selectedEmployee.specialization?.join(', ')}<br/>
                      <strong>Current Workload:</strong> {selectedEmployee.currentWorkload}/{selectedEmployee.maxWorkload}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAssignmentModal(false);
                    setSelectedEmployee(null);
                    setAssignmentNote("");
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAssignment}
                  disabled={!selectedEmployee || assigning}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {assigning ? 'Assigning...' : 'Assign Request'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assign;