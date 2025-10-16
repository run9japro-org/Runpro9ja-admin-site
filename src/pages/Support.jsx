import React, { useState, useEffect } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { 
  getSupportEmployees, 
  getPendingRequests, 
  getSupportMessages 
} from "../services/adminService";

const Support = () => {
  const [employees, setEmployees] = useState([]);
  const [requests, setRequests] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState({
    employees: true,
    requests: true,
    messages: true
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch support employees
        const employeesResponse = await getSupportEmployees();
        if (employeesResponse && employeesResponse.success) {
          setEmployees(employeesResponse.employees || []);
        } else {
          setEmployees(getSampleEmployees());
        }

        // Fetch pending requests
        const requestsResponse = await getPendingRequests();
        if (requestsResponse && requestsResponse.success) {
          setRequests(requestsResponse.requests || []);
        } else {
          setRequests(getSampleRequests());
        }

        // Fetch support messages
        const messagesResponse = await getSupportMessages();
        if (messagesResponse && messagesResponse.success) {
          setMessages(messagesResponse.messages || []);
        } else {
          setMessages(getSampleMessages());
        }

      } catch (err) {
        console.error("Error fetching support data:", err);
        setError("Failed to load support data");
        setEmployees(getSampleEmployees());
        setRequests(getSampleRequests());
        setMessages(getSampleMessages());
      } finally {
        setLoading({
          employees: false,
          requests: false,
          messages: false
        });
      }
    };

    fetchData();
  }, []);

  // Handle sending new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: Date.now(),
      sender: "You",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      self: true,
      timestamp: new Date()
    };

    setMessages(prev => [newMsg, ...prev]);
    setNewMessage("");

    // In a real app, you would send this to your backend
    console.log("Sending message:", newMessage);
  };

  // Handle request assignment
  const handleAssignRequest = (requestId, action) => {
    console.log(`Assigning request ${requestId} with action:`, action);
    // In a real app, you would make an API call to update the request
    alert(`Request ${requestId} ${action === 'assign' ? 'assigned' : 'status updated'}`);
  };

  // Sample data fallback
  const getSampleEmployees = () => {
    return [
      {
        id: 1,
        name: "Shade Musab",
        role: "Customer Service Agent",
        hired: "22/02/25",
        department: "Customer care service",
        email: "shademusad78@gmail.com",
        phone: "+234-80945673",
      },
      {
        id: 2,
        name: "John Adebayo",
        role: "Agent Service Manager",
        hired: "15/01/25",
        department: "Agent Service Department",
        email: "john.adebayo@company.com",
        phone: "+234-80945674",
      },
    ];
  };

  const getSampleRequests = () => {
    return [
      {
        id: 1,
        name: "Tobi Ipeyenuqa",
        service: "Personal Assistant",
        requestId: "RP-9001245",
        status: "requested"
      },
      {
        id: 2,
        name: "Amina Yusuf",
        service: "Professional Plumbing",
        requestId: "RP-9001246",
        status: "quotation_provided"
      },
    ];
  };

  const getSampleMessages = () => {
    return [
      {
        id: 1,
        sender: "You",
        text: "Rose, can you see to it that the person that went to observe is back so that I can assign a service provider.",
        time: "Monday 11:20",
        self: true,
      },
      {
        id: 2,
        sender: "Shade Musab",
        text: "And, why can't you do it yourself? Rose has not responded in a while; would you keep the customer waiting?",
        time: "Monday 10:54",
      },
      {
        id: 3,
        sender: "Rose Chukwu",
        text: "Sorry, I have diarrhea as a result of food poisoning. Had to rush to the pharmacy.",
        time: "Monday 11:54",
      },
    ];
  };

  // Safe data access
  const safeString = (value, fallback = 'N/A') => {
    if (value === null || value === undefined || value === '') return fallback;
    if (typeof value === 'object') return fallback;
    return String(value);
  };

  return (
    <div className="w-full p-6">
      {error && (
        <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 text-orange-700 mb-4">
          {error} - Showing sample data
        </div>
      )}

      {/* Adjusted grid width ratio */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
        {/* LEFT COLUMN - Employees Detail */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 text-lg mb-2">
            Employees detail ({employees.length})
          </h3>
          <div className="flex flex-wrap gap-4">
            {loading.employees ? (
              // Loading skeleton for employees
              Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="bg-gray-100 border border-gray-200 rounded-lg shadow-sm p-4 w-full sm:w-[48%] animate-pulse">
                  <div className="flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : employees.length > 0 ? (
              employees.map((emp, idx) => (
                <div
                  key={emp.id || idx}
                  className={`bg-white border ${
                    idx === 0 ? "border-gray-100" : "border-gray-200"
                  } rounded-lg shadow-sm p-4 flex flex-col gap-2 w-full sm:w-[48%]`}
                >
                  <div className="flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                      {safeString(emp.name?.charAt(0), 'E')}
                    </div>
                    <div>
                      <p className="font-bold text-lg text-gray-800">
                        {safeString(emp.name, 'Employee')}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg text-gray-600">
                          {safeString(emp.role, 'Employee')}
                        </p>
                        <span className="text-md text-gray-400">
                          Hired: {safeString(emp.hired, 'N/A')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-lg text-gray-700">
                    <p className="font-semibold">
                      Department: {safeString(emp.department, 'General')}
                    </p>
                    <p>
                      <MdOutlineEmail className="inline mr-2 mb-1 text-2xl" />
                      {safeString(emp.email, 'No email')}
                    </p>
                    <p>
                      <IoCallOutline className="inline mr-2 mb-1 text-2xl" />
                      {safeString(emp.phone, 'No phone')}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 w-full">
                No employees found
              </div>
            )}
          </div>

          <div className="mt-6 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-700 text-xl mb-2 py-4 px-3">
              Professional and other Order Request ({requests.length})
            </h3>
            <div className="overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#E5F3EC] border-t border-gray-300">
                  <tr className="text-left">
                    <th className="py-3 px-4 font-semibold text-gray-700 text-lg">
                      Name
                    </th>
                    <th className="py-3 px-4 font-semibold text-gray-700 text-lg">
                      Service
                    </th>
                    <th className="py-3 px-4 font-semibold text-gray-700 text-lg">
                      Request ID
                    </th>
                    <th className="py-3 px-4 font-semibold text-gray-700 text-lg">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading.requests ? (
                    // Loading skeleton for requests
                    Array.from({ length: 3 }).map((_, idx) => (
                      <tr key={idx} className="border-b border-gray-100">
                        <td className="py-3 px-4"><div className="h-4 bg-gray-200 rounded animate-pulse"></div></td>
                        <td className="py-3 px-4"><div className="h-4 bg-gray-200 rounded animate-pulse"></div></td>
                        <td className="py-3 px-4"><div className="h-4 bg-gray-200 rounded animate-pulse"></div></td>
                        <td className="py-3 px-4"><div className="h-8 bg-gray-200 rounded animate-pulse"></div></td>
                      </tr>
                    ))
                  ) : requests.length > 0 ? (
                    requests.map((req, idx) => (
                      <tr
                        key={req.id || idx}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 text-lg">
                          {safeString(req.name, 'Customer')}
                        </td>
                        <td className="py-3 px-4 text-lg">
                          {safeString(req.service, 'Service')}
                        </td>
                        <td className="py-3 px-4 text-lg">
                          {safeString(req.requestId, 'N/A')}
                        </td>
                        <td className="py-3 px-4 flex items-center gap-2">
                          <select 
                            className="border border-gray-300 rounded-md px-2 py-1 text-md"
                            onChange={(e) => handleAssignRequest(req.requestId, e.target.value)}
                          >
                            <option value="">Update Status</option>
                            <option value="assign">Assign Agent</option>
                            <option value="pending">Mark Pending</option>
                            <option value="approved">Approve</option>
                            <option value="rejected">Reject</option>
                          </select>
                          <button 
                            className="border border-primary-300 text-primary bg-gray-100 px-3 py-1 rounded-md text-md font-semibold transition hover:bg-green-50"
                            onClick={() => handleAssignRequest(req.requestId, 'assign')}
                          >
                            Assign
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-gray-500">
                        No pending requests found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Chat Section */}
        <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-[#0D7957] text-white px-5 py-3">
            <h3 className="font-semibold text-lg text-gray-200">
              Customer Service Team
            </h3>
            <p className="text-sm text-gray-300">
              {employees.slice(0, 4).map(emp => emp.name).join(', ')}
              {employees.length > 4 && `... +${employees.length - 4} more`}
            </p>
          </div>

          {/* CHAT BODY */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[500px]">
            {loading.messages ? (
              // Loading skeleton for messages
              Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className={`flex ${idx % 2 === 0 ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[75%] p-3 rounded-lg bg-gray-200 animate-pulse">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                  </div>
                </div>
              ))
            ) : messages.length > 0 ? (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.self ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-lg ${
                      msg.self
                        ? "bg-[#E5F3EC] text-gray-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-md font-medium leading-relaxed">
                      {safeString(msg.text, 'Message not available')}
                    </p>
                    <p className="text-md font-medium text-gray-500 mt-1">
                      {safeString(msg.time, 'Unknown time')}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No messages yet
              </div>
            )}
          </div>

          {/* CHAT INPUT */}
          <div className="flex items-center border-t border-gray-200 p-3">
            <input
              type="text"
              placeholder="Message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0D7957]"
            />
            <button 
              onClick={handleSendMessage}
              className="ml-2 bg-[#0D7957] text-white px-5 py-2 rounded-md hover:bg-[#0a5f45] transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;