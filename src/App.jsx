import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Delivery from "./pages/Delivery";
// import ServiceProviders from "./pages/ServiceProviders";
// import Support from "./pages/Support";
// import Payments from "./pages/Payments";
// import Settings from "./pages/Settings";
// import Accounts from "./pages/Accounts";
// import Complaint from "./pages/Complaint";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "services":
        return <Services />;
      case "delivery":
        return <Delivery />;
      case "providers":
        return <ServiceProviders />;
      case "support":
        return <Support />;
      case "payments":
        return <Payments />;
      case "settings":
        return <Settings />;
      case "accounts":
        return <Accounts />;
      case "complaint":
        return <Complaint />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activePage={activePage} // Pass activePage to Header
        />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
