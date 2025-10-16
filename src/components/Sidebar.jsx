import React from "react";
import image from "../assets/logo.png";
import icon1 from "../assets/icons/dashboard-icon.png";
import icon2 from "../assets/icons/services.png";
import icon3 from "../assets/icons/outline_delivery.png";
import icon4 from "../assets/icons/employees.png";
import icon5 from "../assets/icons/customer-support.png";
import icon6 from "../assets/icons/wallet.png";
import icon7 from "../assets/icons/accounts.png";
import icon8 from "../assets/icons/complaint.png";
import icon9 from "../assets/icons/logout.png";

const Sidebar = ({
  activePage,
  setActivePage,
  sidebarOpen,
  setSidebarOpen,
}) => {
  // Main navigation items
  const mainItems = [
    { id: "dashboard", label: "Dashboard", icon: icon1 },
    { id: "services", label: "Services", icon: icon2 },
    { id: "delivery", label: "Delivery tracking", icon: icon3 },
    { id: "providers", label: "Service Providers", icon: icon4 },
    { id: "support", label: "Customer Support Team", icon: icon5 },
    { id: "payments", label: "Payment History", icon: icon6 },
  ];


  // Settings navigation items
  const settingsItems = [
    { id: "accounts", label: "Accounts", icon: icon7 },
    { id: "complaint", label: "Complaint", icon: icon8 },
    { id: "logout", label: "Log out", icon: icon9 },
  ];

  const MenuSection = ({ title, items, showDivider = false }) => (
    <div
      className={`${
        showDivider ? "border-t  pt-4 mt-4" : ""
      }`}
    >
      {title && (
        <p className="text-gray-200 text-opacity-70 text-lg font-medium  tracking-wider px-6 py-2">
          {title}
        </p>
      )}
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            if (item.id !== "logout") {
              setActivePage(item.id);
              setSidebarOpen(false);
            } else {
              // Handle logout logic here
              console.log("Logout clicked");
            }
          }}
          className={`w-full cursor-pointer flex items-center text-md pl-8 py-3 text-left transition-colors duration-200 hover:bg-opacity-10 ${
            activePage === item.id
              ? "  text-gray-200  bg-primary rounded-2xl "
              : "text-gray-200 text-opacity-90"
          } ${item.id === "logout" ? "text-gray-200 " : ""}`}
        >
          <img src={item.icon} alt={item.label} className="w-6 h-6 mr-3" />
          <span className="text-md ">{item.label}</span>
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-50 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-68 bg-primary shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0  ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-start  py-6 px-8">
          <img src={image} alt="run pro logo" className="h-24 w-24" />
        </div>

        {/* Navigation Sections */}
        <div className="mb-4 md:mb-8 md:pl-4">
          <nav className="pt-4">
            {/* Main Section */}
            <MenuSection title="Main" items={mainItems} />
          </nav>
        </div>

        {/* Settings Section at Bottom */}
        <div className=" border-opacity-20  md:pl-4">
          <MenuSection title="Settings" items={settingsItems} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
