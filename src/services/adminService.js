// src/services/adminService.js
import axios from "axios";

const API_URL = "https://runpro9ja-pxqoa.ondigitalocean.app/api/admin"; // adjust to your backend base URL

// Get analytics summary
export const getCompanyAnalytics = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/analytics/summary`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
