import React, { useState, useEffect, useRef } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { Search, Send, User, Clock, Check, CheckCheck } from "lucide-react";
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
  
  // Chat states
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
        if (requestsResponse && employeesResponse.success) {
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

        // Load customers for chat
        setCustomers(getSampleCustomers());

      } catch (err) {
        console.error("Error fetching support data:", err);
        setError("Failed to load support data");
        setEmployees(getSampleEmployees());
        setRequests(getSampleRequests());
        setMessages(getSampleMessages());
        setCustomers(getSampleCustomers());
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

  // Filter customers based on search
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle customer selection
  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    // In real app, fetch messages for this customer
    setMessages(getCustomerMessages(customer.id));
  };

  // Handle sending new message to customer
  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !selectedCustomer) return;

    const newMsg = {
      id: Date.now(),
      sender: "admin",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: new Date(),
      status: 'sent',
      type: 'outgoing'
    };

    // Add to messages
    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");

    // Simulate API call to send message
    try {
      // await sendMessageToCustomer(selectedCustomer.id, newMessage);
      console.log("Sending message to customer:", selectedCustomer.name, newMessage);
      
      // Update message status to delivered after a delay
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMsg.id ? { ...msg, status: 'delivered' } : msg
          )
        );
      }, 1000);

      // Simulate customer typing and response
      simulateCustomerResponse(selectedCustomer);

    } catch (error) {
      console.error("Failed to send message:", error);
      // Revert message on error
      setMessages(prev => prev.filter(msg => msg.id !== newMsg.id));
    }
  };

  // Simulate customer response
  const simulateCustomerResponse = (customer) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      const responses = [
        "Thank you for your help!",
        "I understand, thank you for explaining.",
        "When can I expect an update?",
        "That works for me, thank you!",
        "Could you please provide more details?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const customerMsg = {
        id: Date.now() + 1,
        sender: customer.name,
        text: randomResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: new Date(),
        status: 'delivered',
        type: 'incoming'
      };
      
      setMessages(prev => [...prev, customerMsg]);
    }, 2000);
  };

  // Handle request assignment
  const handleAssignRequest = (requestId, action) => {
    console.log(`Assigning request ${requestId} with action:`, action);
    alert(`Request ${requestId} ${action === 'assign' ? 'assigned' : 'status updated'}`);
  };

  // Message status icon
  const MessageStatus = ({ status }) => {
    if (status === 'sent') return <Check className="w-3 h-3 text-gray-400" />;
    if (status === 'delivered') return <CheckCheck className="w-3 h-3 text-gray-400" />;
    if (status === 'read') return <CheckCheck className="w-3 h-3 text-blue-500" />;
    return null;
  };

  // Format message time
  const formatMessageTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  // Sample data
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
        sender: "admin",
        text: "Hello! How can I help you with your order today?",
        time: "2:30 PM",
        timestamp: new Date(Date.now() - 300000),
        status: 'read',
        type: 'outgoing'
      },
      {
        id: 2,
        sender: "Grace Okafor",
        text: "I need help tracking my delivery order #DL-789",
        time: "2:32 PM",
        timestamp: new Date(Date.now() - 240000),
        status: 'delivered',
        type: 'incoming'
      },
    ];
  };

  const getSampleCustomers = () => {
    return [
      {
        id: 1,
        name: "Grace Okafor",
        email: "grace.okafor@email.com",
        phone: "+234-8012345678",
        orderId: "DL-789",
        lastMessage: "I need help tracking my delivery",
        unread: 2,
        lastActive: "2 min ago",
        avatar: "G"
      },
      {
        id: 2,
        name: "Michael Adekunle",
        email: "michael.ade@email.com",
        phone: "+234-8023456789",
        orderId: "SR-456",
        lastMessage: "When will my service provider arrive?",
        unread: 0,
        lastActive: "1 hour ago",
        avatar: "M"
      },
      {
        id: 3,
        name: "Funke Balogun",
        email: "funke.balogun@email.com",
        phone: "+234-8034567890",
        orderId: "OR-123",
        lastMessage: "Thank you for resolving my issue!",
        unread: 0,
        lastActive: "5 hours ago",
        avatar: "F"
      },
      {
        id: 4,
        name: "Chinedu Okoro",
        email: "chinedu.okoro@email.com",
        phone: "+234-8045678901",
        orderId: "DL-901",
        lastMessage: "The service was excellent",
        unread: 1,
        lastActive: "1 day ago",
        avatar: "C"
      }
    ];
  };

  const getCustomerMessages = (customerId) => {
    // Return messages specific to this customer
    return getSampleMessages();
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

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
        {/* LEFT COLUMN - Employees Detail & Requests */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 text-lg mb-2">
            Employees detail ({employees.length})
          </h3>
          <div className="flex flex-wrap gap-4">
            {loading.employees ? (
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
        </div>

        {/* RIGHT COLUMN - Customer Chat */}
        <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-[800px]">
          {/* Chat Header */}
          <div className="bg-[#0D7957] text-white px-5 py-3">
            <h3 className="font-semibold text-lg text-gray-200">
              Customer Support Chat
            </h3>
            <p className="text-sm text-gray-300">
              Chat with customers and provide support
            </p>
          </div>

          {/* Customers List */}
          <div className="border-b border-gray-200">
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#0D7957]"
                />
              </div>
            </div>
            
            <div className="max-h-48 overflow-y-auto">
              {filteredCustomers.map(customer => (
                <div
                  key={customer.id}
                  className={`flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedCustomer?.id === customer.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                  onClick={() => handleSelectCustomer(customer)}
                >
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-3">
                    {customer.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-gray-800 text-sm truncate">
                        {customer.name}
                      </h4>
                      {customer.unread > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-5 text-center">
                          {customer.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 truncate">
                      {customer.lastMessage}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">
                        Order: {customer.orderId}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {customer.lastActive}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedCustomer ? (
              <>
                {/* Chat Header */}
                <div className="border-b border-gray-200 p-3 bg-white">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-3">
                      {selectedCustomer.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {selectedCustomer.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Order: {selectedCustomer.orderId} • {selectedCustomer.lastActive}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.type === 'outgoing' ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] p-3 rounded-lg ${
                          msg.type === 'outgoing'
                            ? "bg-[#E5F3EC] text-gray-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">
                          {msg.text}
                        </p>
                        <div className="flex items-center justify-end mt-1 space-x-1">
                          <span className="text-xs text-gray-500">
                            {formatMessageTime(msg.timestamp)}
                          </span>
                          {msg.type === 'outgoing' && (
                            <MessageStatus status={msg.status} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="border-t border-gray-200 p-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0D7957]"
                    />
                    <button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-[#0D7957] text-white p-2 rounded-lg hover:bg-[#0a5f45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* No Customer Selected State */
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-gray-500">
                <User className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Customer Selected</h3>
                <p className="text-sm text-center">
                  Select a customer from the list to start chatting and provide support.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;