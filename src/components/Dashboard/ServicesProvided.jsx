// src/components/Dashboard/ServicesProvided.jsx
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { getCompanyAnalytics } from "../../services/adminService";
import serviceMapper from "../../utils/serviceMapper";

const ServicesProvided = () => {
  const [chartData, setChartData] = useState([]);
  const [totalServices, setTotalServices] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = [
    "#5ba585", "#4e9a84", "#a5d0b6", 
    "#cce3d7", "#285c4c", "#97d1a8",
    "#3a8a6f", "#7bc4a4", "#2d705c", "#8fd8b2",
    "#1e4f3f", "#6bbd99", "#449c7a", "#88c6a3"
  ];

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        const response = await getCompanyAnalytics();
        
        if (response.success && response.analytics.serviceBreakdown) {
          transformChartData(response.analytics.serviceBreakdown);
        } else {
          setError("No analytics data available");
          setChartData(getSampleData());
        }
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
        setError("Failed to load service data");
        setChartData(getSampleData());
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const transformChartData = (serviceBreakdown) => {
    if (!serviceBreakdown || serviceBreakdown.length === 0) {
      console.log("No service breakdown data available");
      setChartData(getSampleData());
      return;
    }

    // console.log("Raw service breakdown from API:", serviceBreakdown);
    
    const total = serviceBreakdown.reduce((sum, service) => sum + service.count, 0);
    
    const transformedData = serviceBreakdown.map((service, index) => {
      // Your backend returns category IDs in _id field, so we need to map them
      const categoryId = service._id;
      const displayName = serviceMapper.getServiceNameByCategoryId(categoryId);
      
      // console.log(`Mapping category ${categoryId} to:`, displayName);

      const percentage = total > 0 ? ((service.count / total) * 100).toFixed(1) + "%" : "0%";
      
      return {
        name: displayName,
        value: service.count,
        percentage: percentage,
        originalId: service._id,
        categoryId: categoryId
      };
    });

    // console.log("Final transformed data:", transformedData);
    setChartData(transformedData);
    setTotalServices(total);
  };

  const getSampleData = () => {
    // Sample data using actual category IDs from your data
    const sampleData = [
      { name: "Cleaning Services", value: 31, percentage: "41.9%", categoryId: "68eab135001131897a342de4" },
      { name: "Painting Services", value: 9, percentage: "12.2%", categoryId: "68eab133001131897a342dac" },
      { name: "Professional Plumbing", value: 8, percentage: "10.8%", categoryId: "68eab131001131897a342d85" },
      { name: "Moving Services", value: 6, percentage: "8.1%", categoryId: "68eab135001131897a342ddb" },
      { name: "Errand Services", value: 5, percentage: "6.8%", categoryId: "68eab134001131897a342dc9" },
      { name: "Electrical Services", value: 4, percentage: "5.4%", categoryId: "68eab131001131897a342d8f" },
    ];
    
    const total = sampleData.reduce((sum, entry) => sum + entry.value, 0);
    setTotalServices(total);
    return sampleData;
  };

  if (loading) {
    return (
      <div className="">
        <h2 className="text-xl font-semibold mb-4 md:ml-10">Services Provided</h2>
        <div className="w-full max-w-3xl mx-auto bg-gray-50 rounded-2xl shadow p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading service data...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4 md:ml-10">Services Provided</h2>
      <div className="w-full max-w-3xl mx-auto bg-gray-50 rounded-2xl shadow p-6">
        <div className="flex flex-col md:flex-row items-center md:py-4 justify-between gap-6">
          {/* Pie Chart */}
          <div className="w-full md:w-1/2 h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  innerRadius="70%"
                  outerRadius="90%"
                  paddingAngle={2}
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-center"
                >
                  <tspan
                    x="50%"
                    dy="-0.3em"
                    style={{ fontSize: "14px", fontWeight: "500" }}
                  >
                    Total Services
                  </tspan>
                  <tspan
                    x="50%"
                    dy="1.5em"
                    style={{ fontSize: "28px", fontWeight: "700" }}
                  >
                    {totalServices.toLocaleString()}
                  </tspan>
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-3 text-md w-full md:w-1/2 max-h-80 overflow-y-auto">
            {chartData.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-lg font-medium truncate">{item.name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 flex-shrink-0">
                  <span className="text-lg font-medium">{item.value.toLocaleString()}</span>
                  <span className="text-green-600 text-md font-medium">
                    {item.percentage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Debug info */}
        {error && (
          <div className="mt-4 text-sm text-orange-600 text-center">
            {error} - Showing sample data
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesProvided;