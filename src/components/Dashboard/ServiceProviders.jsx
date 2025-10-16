import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CompanyAnalytics = () => {
  const [view, setView] = useState("Monthly");

  // Monthly data
  const monthlyData = [
    { name: "Jan", value: 65 },
    { name: "Feb", value: 80 },
    { name: "Mar", value: 30 },
    { name: "Apr", value: 10 },
    { name: "May", value: 5 },
    { name: "Jun", value: 15 },
    { name: "Jul", value: 100 },
    { name: "Aug", value: 100 },
    { name: "Sept", value: 85 },
    { name: "Oct", value: 0 },
    { name: "Nov", value: 0 },
    { name: "Dec", value: 0 },
  ];

  // Weekly data
  const weeklyData = [
    { name: "Monday", value: 0 },
    { name: "Tuesday", value: 75 },
    { name: "Wednesday", value: 100 },
    { name: "Thursday", value: 20 },
    { name: "Friday", value: 10 },
    { name: "Saturday", value: 70 },
    { name: "Sunday", value: 30 },
  ];

  return (
    <div className="">
      {/* Header */}
      <h3 className="text-xl mb-3 font-semibold text-gray-700">
        Company Analytics
      </h3>
      <div className="bg-gray-50 rounded-2xl  border border-gray-200 p-5 pl-0 w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-end mb-4">
          <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 font-semibold py-1 text-md text-gray-900 focus:outline-none"
          >
            <option value="Monthly">Monthly</option>
            <option value="Weekly">Weekly</option>
          </select>
        </div>

        {/* Chart */}
        <div className="h-72 sm:h-80 md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            {view === "Monthly" ? (
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />{" "}
                {/* gray-200 */}
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#111827", fontWeight: 500 }} // text-gray-900
                  axisLine={{ stroke: "#9ca3af" }} // gray-400
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#111827", fontWeight: 500 }} // text-gray-900
                  axisLine={{ stroke: "#9ca3af" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    color: "#111827", // text-gray-900
                    fontSize: "13px",
                  }}
                />
                <Bar dataKey="value" fill="#0D7957CC" radius={[5, 5, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#111827", fontWeight: 500 }}
                  axisLine={{ stroke: "#9ca3af" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#111827", fontWeight: 500 }}
                  axisLine={{ stroke: "#9ca3af" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    color: "#111827",
                    fontSize: "13px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0D7957CC"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#0D7957CC" }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CompanyAnalytics;
