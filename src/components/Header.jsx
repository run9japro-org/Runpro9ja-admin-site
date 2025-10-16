import React from "react";
import notification from "../assets/icons/notification.png";
import admin from "../assets/icons/admin.png";
const Header = ({ sidebarOpen, setSidebarOpen, activePage }) => {
  // Function to get page title based on active page
  const getPageTitle = () => {
    const pageTitles = {
      dashboard: "Dashboard",
      services: "Services",
      delivery: "Delivery Tracking",
      providers: "Service Providers",
      support: "Customer Support Team",
      payments: "Payment History",
      accounts: "Accounts",
      complaint: "Complaint",
      settings: "Settings",
    };
    return pageTitles[activePage] || "Dashboard";
  };

  return (
    <header className="bg-gray-100 ">
      <div className="flex items-center justify-between px-2 md:px-6 py-4">
        {/* Left Section: Menu button and Page Title */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Page Title */}
          <div className="flex flex-col">
            <h1 className="text-lg md:text-2xl font-medium text-gray-900">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative md:w-3/5 space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="md:w-full mx-auto outline-none pl-14 pr-4 py-2 border bg-gray-50 border-gray-300 rounded-2xl "
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-7 w-7 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        {/* Right Section: Search and User Profile */}
        <div className="flex  ">
          {/* Notification and User Profile */}
          <div className="flex items-center md:space-x-4 ">
            {/* Notification Bell */}
            <div className="bg-gray-50 rounded border border-gray-200">
              <button className="relative p-2  text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                <img
                  src={notification}
                  alt="notification icon"
                  className="w-5 h-5"
                />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-3 bg-gray-50 px-2 rounded border border-gray-200">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-white font-semibold">
                <img src={admin} alt="admin icon" />
              </div>
              {/* Dropdown arrow */}
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
