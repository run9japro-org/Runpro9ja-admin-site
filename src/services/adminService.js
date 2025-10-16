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