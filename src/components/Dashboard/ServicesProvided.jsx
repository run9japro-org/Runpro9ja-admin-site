import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const ServicesProvided = () => {
  const data = [
    { name: "Errand service", value: 234, percentage: "12%" },
    { name: "Pick up & delivery", value: 400, percentage: "24%" },
    { name: "Hotel booking", value: 800, percentage: "56%" },
    { name: "Laundry & cleaning", value: 600, percentage: "5%" },
    { name: "Professional services", value: 322, percentage: "12%" },
    { name: "Babysitting", value: 444, percentage: "45%" },
  ];

  const COLORS = [
    "#5ba585",
    "#4e9a84",
    "#a5d0b6",
    "#cce3d7",
    "#285c4c",
    "#97d1a8",
  ];

  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4 md:ml-10">Services provided</h2>
      <div className="w-full max-w-3xl mx-auto bg-gray-50 rounded-2xl shadow p-6">
        <div className="flex flex-col md:flex-row items-center md:py-4 justify-between gap-6">
          <div className="w-full md:w-1/2 h-96">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  innerRadius="70%"
                  outerRadius="90%"
                  paddingAngle={0}
                  stroke="none"
                >
                  {data.map((entry, index) => (
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
                    Total Service Provided
                  </tspan>
                  <tspan
                    x="50%"
                    dy="1.5em"
                    style={{ fontSize: "28px", fontWeight: "700" }}
                  >
                    {total.toLocaleString()}
                  </tspan>
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-3 text-sm md:w-1/2">
            {data.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-lg font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-lg font-medium">{item.value}</span>
                  <span className="text-green-600 text-md font-medium">
                    {item.percentage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesProvided;
