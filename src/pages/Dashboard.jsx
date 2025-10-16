// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import StatsCard from "../components/Dashboard/StatsCard";
import ServiceProviders from "../components/Dashboard/ServiceProviders";
import ServicesProvided from "../components/Dashboard/ServicesProvided";
import PaymentHistory from "../components/Dashboard/PaymentHistory";
import icon1 from "../assets/icons/setting.png";
import icon3 from "../assets/icons/pending.png";
import icon4 from "../assets/icons/sales.png";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { getCompanyAnalytics } from "../services/adminService";

const Dashboard = () => {
  const [statsData, setStatsData] = useState([
    { title: "Total Services", value: "0", icon: icon1 },
    { title: "Completed Services", value: "0", icon: <IoIosCheckmarkCircleOutline size="20" color="#0D7957CC" /> },
    { title: "Pending Services", value: "0", icon: icon3 },
    { title: "Total Revenue", value: "₦0.00", icon: icon4 },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await getCompanyAnalytics();
        
        if (response.success) {
          const analytics = response.analytics;
          
          setStatsData([
            { 
              title: "Total Services", 
              value: (analytics.totals?.orders || 0).toString(), 
              icon: icon1 
            },
            { 
              title: "Completed Services", 
              value: (analytics.completedOrders || 0).toString(), 
              icon: <IoIosCheckmarkCircleOutline size="20" color="#0D7957CC" /> 
            },
            { 
              title: "Pending Services", 
              value: (analytics.pendingOrders || 0).toString(), 
              icon: icon3 
            },
            { 
              title: "Total Revenue", 
              value: `₦${(analytics.totals?.revenue || 0).toLocaleString()}`, 
              icon: icon4 
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard 
            key={index} 
            title={stat.title} 
            icon={stat.icon} 
            value={stat.value} 
            loading={loading}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6 mt-10">
          <ServiceProviders />
        </div>
        <div className="space-y-6 mt-10">
          <ServicesProvided />
        </div>
      </div>

      <div className="mt-6">
        <PaymentHistory />
      </div>
    </div>
  );
};

export default Dashboard;