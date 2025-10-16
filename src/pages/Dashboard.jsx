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
    { title: "Total service provided", value: "0", icon: icon1 },
    { title: "Total service completed", value: "0", icon: <IoIosCheckmarkCircleOutline size="20" color="#0D7957CC" /> },
    { title: "Total service pending", value: "0", icon: icon3 },
    { title: "Total Sales Amount", value: "#0.00", icon: icon4 },
  ]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getCompanyAnalytics();
        // adjust field names based on your backend response
        setStatsData([
          { title: "Total service provided", value: data.totalOrders || "0", icon: icon1 },
          { title: "Total service completed", value: data.completedOrders || "0", icon: <IoIosCheckmarkCircleOutline size="20" color="#0D7957CC" /> },
          { title: "Total service pending", value: data.pendingOrders || "0", icon: icon3 },
          { title: "Total Sales Amount", value: `₦${data.totalRevenue?.toLocaleString() || "0.00"}`, icon: icon4 },
        ]);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={index} title={stat.title} icon={stat.icon} value={stat.value} />
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
