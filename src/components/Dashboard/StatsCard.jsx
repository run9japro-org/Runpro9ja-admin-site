import React from "react";

const StatsCard = ({ title, value, subtitle, icon }) => {
  return (
    <div className="bg-gray-50 rounded-xl  border border-gray-200 px-3 py-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="mr-2 w-7 h-7 flex items-center justify-center">
            {typeof icon === "string" ? (
              <img src={icon} alt={title} className="w-6 h-6" />
            ) : (
              icon
            )}
          </div>
          <h3 className="text-2xl  text-gray-600">{title}</h3>
        </div>
      </div>
      <p className="text-3xl font-bold text-primary text-end mx-12">{value}</p>
      {subtitle && (
        <p className="text-xs text-gray-500 mt-1 text-end">{subtitle}</p>
      )}
    </div>
  );
};

export default StatsCard;
