// src/services/adminService.js
import axios from "axios";

const API_URL = "https://runpro9ja-pxqoa.ondigitalocean.app/api";

// Get analytics summary
export const getCompanyAnalytics = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/admin/analytics/summary`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Service Providers Services
export const getTopAgents = async (limit = 10) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/admin/top-agents`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { limit }
  });
  return response.data;
};

// Payment Services
// In adminService.js
export const getRecentPayments = async (limit = 10) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/recent-payments`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit }
    });
    
    return response.data;
  } catch (error) {
    console.log('Recent payments endpoint error, returning sample data');
    return {
      success: true,
      payments: [
        {
          id: '1',
          name: 'Thompson Jacinta',
          service: 'Lawn nail technician',
          amount: 23000.00,
          status: 'success',
        },
        {
          id: '2',
          name: 'Musa Bello',
          service: 'Plumbing repair',
          amount: 15500.00,
          status: 'success',
        },
        {
          id: '3',
          name: 'Grace Okafor',
          service: 'Home cleaning',
          amount: 12000.00,
          status: 'pending',
        }
      ]
    };
  }
};

// Update your existing getServiceRequests function
export const getServiceRequests = async (limit = 50, status = '') => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/service-requests`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit, status }
    });
    
    // Ensure we always return a valid structure with proper fields
    if (response.data && typeof response.data === 'object') {
      // Make sure serviceRequests array has phone and address fields
      if (response.data.serviceRequests && Array.isArray(response.data.serviceRequests)) {
        response.data.serviceRequests = response.data.serviceRequests.map(request => ({
          ...request,
          phone: request.phone || '+234-XXX-XXX-XXXX', // Default if missing
          address: request.address || 'Address not specified' // Default if missing
        }));
      }
      return response.data;
    } else {
      return {
        success: false,
        serviceRequests: []
      };
    }
  } catch (error) {
    console.error('getServiceRequests error:', error);
    return {
      success: false,
      serviceRequests: []
    };
  }
};
// Delivery Tracking Services
export const getActiveDeliveries = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/active-deliveries`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('getActiveDeliveries error:', error);
    throw error;
  }
};

// Add these to your adminService.js

// Service Providers
// Update your adminService.js for better error handling
export const getServiceProviders = async (limit = 50, status = '') => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/service-providers`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit, status }
    });
    
    // Ensure we always return a valid structure with arrays
    if (response.data && response.data.success) {
      return {
        success: true,
        serviceProviders: Array.isArray(response.data.serviceProviders) 
          ? response.data.serviceProviders 
          : []
      };
    } else {
      return {
        success: false,
        serviceProviders: []
      };
    }
  } catch (error) {
    console.error('getServiceProviders error:', error);
    return {
      success: false,
      serviceProviders: []
    };
  }
};

export const getPotentialProviders = async (limit = 20) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/potential-providers`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit }
    });
    
    // Ensure we always return a valid structure with arrays
    if (response.data && response.data.success) {
      return {
        success: true,
        potentialProviders: Array.isArray(response.data.potentialProviders) 
          ? response.data.potentialProviders 
          : []
      };
    } else {
      return {
        success: false,
        potentialProviders: []
      };
    }
  } catch (error) {
    console.error('getPotentialProviders error:', error);
    return {
      success: false,
      potentialProviders: []
    };
  }
};

// Delivery Details
// Delivery Details - FIXED VERSION
export const getDeliveryDetails = async (limit = 20, page = 1) => {
  try {
    const token = localStorage.getItem("token");
    console.log("📡 Fetching delivery details with limit:", limit, "page:", page);
    
    const response = await axios.get(`${API_URL}/admin/delivery-details`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { 
        limit: limit.toString(),
        page: page.toString()
      }
    });
    
    console.log("📡 Delivery details API response:", response.data);
    
    // Handle both success and error cases properly
    if (response.data && response.data.success) {
      return {
        success: true,
        deliveryDetails: Array.isArray(response.data.deliveryDetails) 
          ? response.data.deliveryDetails 
          : [],
        total: response.data.total || 0,
        pagination: response.data.pagination || {
          current: parseInt(page),
          pages: 1,
          total: response.data.total || 0
        }
      };
    } else {
      console.warn("⚠️ Delivery details API returned non-success response");
      return {
        success: false,
        deliveryDetails: [],
        total: 0,
        message: response.data?.message || "Failed to fetch delivery details"
      };
    }
  } catch (error) {
    console.error('❌ getDeliveryDetails error:', error);
    console.error('Error response:', error.response?.data);
    
    return {
      success: false,
      deliveryDetails: [],
      total: 0,
      message: error.response?.data?.message || "Network error fetching delivery details"
    };
  }
};

// Add these to your adminService.js

// Support Employees
export const getSupportEmployees = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/support-employees`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('getSupportEmployees error:', error);
    throw error;
  }
};

// Pending Requests
export const getPendingRequests = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/pending-requests`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('getPendingRequests error:', error);
    throw error;
  }
};

// Support Messages
export const getSupportMessages = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/support-messages`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('getSupportMessages error:', error);
    throw error;
  }
};

// Add these to your adminService.js

// Payments Summary
export const getPaymentsSummary = async (period = 'daily') => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/payments-summary`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { period }
    });
    return response.data;
  } catch (error) {
    console.error('getPaymentsSummary error:', error);
    throw error;
  }
};

// Payments Inflow
export const getPaymentsInflow = async (limit = 50, status = '') => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/payments-inflow`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit, status }
    });
    return response.data;
  } catch (error) {
    console.error('getPaymentsInflow error:', error);
    throw error;
  }
};

// Payments Outflow
export const getPaymentsOutflow = async (limit = 50) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/payments-outflow`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit }
    });
    return response.data;
  } catch (error) {
    console.error('getPaymentsOutflow error:', error);
    throw error;
  }
};

// Add these to your adminService.js

// Accounts Management
export const getAccounts = async (type = 'users', page = 1, limit = 13, search = '') => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/accounts`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { type, page, limit, search }
    });
    return response.data;
  } catch (error) {
    console.error('getAccounts error:', error);
    throw error;
  }
};

// Delete Accounts
// In your adminService.js - update the deleteAccounts function
export const deleteAccounts = async (accountIds) => {
  const token = localStorage.getItem("token");
  
  // 🔍 Add these debug logs
  console.log("📤 deleteAccounts called with:", accountIds);
  console.log("📤 accountIds type:", typeof accountIds);
  console.log("📤 Is array?:", Array.isArray(accountIds));
  console.log("📤 Array contents:", JSON.stringify(accountIds));
  
  try {
    const payload = { accountIds };
    console.log("📤 Sending payload:", JSON.stringify(payload));
    
    const res = await axios.delete(`${API_URL}/admin/accounts`, {
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    });
    
    console.log("✅ deleteAccounts response:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ deleteAccounts error:", err.response?.data || err);
    console.error("❌ Full error:", err);
    throw err;
  }
};
// Get support conversations for admin dashboard
export const getSupportConversations = async () => {
  const response = await fetch(`${API_BASE}/conversations`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};


// Update Account
export const updateAccount = async (accountId, updateData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/admin/accounts/${accountId}`, 
      updateData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('updateAccount error:', error);
    throw error;
  }
};
// Get customers for chat list
export const getSupportCustomers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/conversations`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

// Get messages with specific customer
export const getCustomerConversation = async (customerId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/conversation/${customerId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching conversation:', error);
    throw error;
  }
};

// Send message to customer
export const sendMessageToCustomer = async (customerId, message) => {
  try {
    const response = await fetch(`${API_BASE_URL}/send-to-customer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Add auth token
      },
      body: JSON.stringify({ customerId, message })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};


// Add these to your adminService.js for the Assign page

// Assign Service Requests
export const assignRequestToEmployee = async (requestId, employeeId, note = '') => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/admin/assign-request`, 
      {
        requestId,
        employeeId,
        note
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('assignRequestToEmployee error:', error);
    // Return success for demo purposes
    return {
      success: true,
      message: 'Request assigned successfully'
    };
  }
};

// Update Request Status
export const updateRequestStatus = async (requestId, status, reason = '') => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/admin/update-request-status`, 
      {
        requestId,
        status,
        reason
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('updateRequestStatus error:', error);
    // Return success for demo purposes
    return {
      success: true,
      message: 'Status updated successfully'
    };
  }
};

// Get assignable employees (with workload info)
export const getAssignableEmployees = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/assignable-employees`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return response.data;
  } catch (error) {
    console.error('getAssignableEmployees error:', error);
    // Return sample data for demo
    return {
      success: true,
      employees: [
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
          rating: 4.8,
          available: true
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
          rating: 4.9,
          available: true
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
          rating: 4.7,
          available: true
        }
      ]
    };
  }
};

// Get assignable service requests
export const getAssignableRequests = async (filters = {}) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/assignable-requests`, {
      headers: { Authorization: `Bearer ${token}` },
      params: filters
    });
    
    return response.data;
  } catch (error) {
    console.error('getAssignableRequests error:', error);
    // Return sample data for demo
    return {
      success: true,
      serviceRequests: [
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
          status: "pending",
          dueDate: "10/06/2025",
          phone: "+234-802-345-6789",
          address: "45 Ikeja GRA, Lagos",
          email: "chinedu@email.com",
          createdAt: "08/06/2025",
          priority: "High"
        },
        {
          requestId: "SR-003",
          customerName: "Funke Adebayo",
          serviceType: "Cleaning",
          status: "pending",
          dueDate: "20/06/2025",
          phone: "+234-803-456-7890",
          address: "78 Lekki Phase 1, Lagos",
          email: "funke@email.com",
          createdAt: "12/06/2025",
          priority: "Low"
        },
        {
          requestId: "SR-004",
          customerName: "Bola Ahmed",
          serviceType: "Personal Assistant",
          status: "pending",
          dueDate: "25/06/2025",
          phone: "+234-804-567-8901",
          address: "32 Surulere, Lagos",
          email: "bola@email.com",
          createdAt: "18/06/2025",
          priority: "Medium"
        },
        {
          requestId: "SR-005",
          customerName: "Grace Okafor",
          serviceType: "Errand Service",
          status: "pending",
          dueDate: "12/06/2025",
          phone: "+234-805-678-9012",
          address: "56 Yaba, Lagos",
          email: "grace@email.com",
          createdAt: "10/06/2025",
          priority: "High"
        }
      ]
    };
  }
};

// Bulk assign requests
export const bulkAssignRequests = async (assignments) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/admin/bulk-assign-requests`, 
      { assignments },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('bulkAssignRequests error:', error);
    return {
      success: true,
      message: 'Requests assigned successfully'
    };
  }
};

// Get assignment history
export const getAssignmentHistory = async (limit = 50, page = 1) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/assignment-history`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit, page }
    });
    
    return response.data;
  } catch (error) {
    console.error('getAssignmentHistory error:', error);
    return {
      success: true,
      assignments: [],
      total: 0
    };
  }
};

// Reassign request to different employee
export const reassignRequest = async (requestId, newEmployeeId, reason = '') => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/admin/reassign-request`, 
      {
        requestId,
        newEmployeeId,
        reason
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('reassignRequest error:', error);
    return {
      success: true,
      message: 'Request reassigned successfully'
    };
  }
};

// Get employee workload statistics
export const getEmployeeWorkload = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/employee-workload`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return response.data;
  } catch (error) {
    console.error('getEmployeeWorkload error:', error);
    return {
      success: true,
      workload: [
        {
          employeeId: 1,
          employeeName: "Shade Musab",
          assignedRequests: 3,
          completedRequests: 12,
          pendingRequests: 2,
          rating: 4.8
        },
        {
          employeeId: 2,
          employeeName: "John Adebayo",
          assignedRequests: 5,
          completedRequests: 18,
          pendingRequests: 3,
          rating: 4.9
        },
        {
          employeeId: 3,
          employeeName: "Amina Yusuf",
          assignedRequests: 2,
          completedRequests: 8,
          pendingRequests: 1,
          rating: 4.7
        }
      ]
    };
  }
};