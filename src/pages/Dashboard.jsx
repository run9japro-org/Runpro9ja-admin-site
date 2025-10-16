import React from 'react';
import StatsCard from '../components/Dashboard/StatsCard';
import ServiceProviders from '../components/Dashboard/ServiceProviders';
import ServicesProvided from '../components/Dashboard/ServicesProvided';
import PaymentHistory from '../components/Dashboard/PaymentHistory';
import icon1 from '../assets/icons/setting.png';
import icon3 from '../assets/icons/pending.png';
import icon4 from '../assets/icons/sales.png';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
const Dashboard = () => {
  const statsData = [
    { title: "Total service provided", value: "1,670", icon: icon1 },
    {
      title: "Total service completed",
      value: "1,400",
      icon: <IoIosCheckmarkCircleOutline size="20" color="#0D7957CC" />,
    },
    { title: "Total service pending", value: "270", icon: icon3 },
    { title: "Total Sales Amount", value: "#6,589,450.00", icon: icon4 },
  ];

  return (
    <div className="space-y-6 ">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            icon={stat.icon}
            value={stat.value}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className=" space-y-6 mt-10">
          <ServiceProviders />
        </div>

        {/* Right Column */}
        <div className="space-y-6 mt-10">
          <ServicesProvided />
        </div>
      </div>

      {/* Payment History */}
      <div className="mt-6">
        <PaymentHistory />
      </div>
    </div>
  );
};

export default Dashboard;