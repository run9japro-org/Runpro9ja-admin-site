import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Delivery from "./pages/Delivery";
import ServiceProviders from "./pages/ServiceProviders";
import Support from "./pages/Support";
import Payments from "./pages/Payments.jsx";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Accounts from "./pages/Accounts";
import ComplaintsManagement from "./pages/Complaint.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx"
import DeleteAccountPage from "./pages/Delete.jsx";
import Assign from "./pages/Assign.jsx";
import SupportPage from "./pages/SupportCustomer.jsx";
function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/delete-account" element={<DeleteAccountPage />} />
        <Route path="/support/customer" element={<SupportPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* All protected routes under main layout */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

// Separate layout component
const Layout = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/providers" element={<ServiceProviders />} />
            <Route path="/support" element={<Support />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/complaints" element={<ComplaintsManagement />} />
            <Route path="/assign" element={<Assign />} />
            
            {/* Catch all for protected routes */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;