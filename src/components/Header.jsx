import React, { useState, useEffect, useRef } from "react";
import notificationIcon from "../assets/icons/notification.png";
import admin from "../assets/icons/admin.png";
import axios from "axios";

const Header = ({ sidebarOpen, setSidebarOpen, activePage }) => {
  const API_URL = "https://runpro9ja-pxqoa.ondigitalocean.app/api";
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const searchRef = useRef(null);
  
  const [user, setUser] = useState({ name: "Admin", image: admin });

  // Load user data (localStorage)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser({
        name: storedUser.name || "Admin",
        image: storedUser.image || admin,
      });
    }
  }, []);

  // Fetch notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.notifications || [];

        setNotifications(data);

      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };
    fetchNotifications();
  }, []);

  // Search functionality with proper API_URL
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    console.log('🔍 Starting search for:', query);
    setIsSearching(true);
    
    try {
      const token = localStorage.getItem("token");
      console.log('📡 Making API request to:', `${API_URL}/search?q=${encodeURIComponent(query)}`);
      
      const res = await axios.get(`${API_URL}/search?q=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log('✅ Search response:', res.data);
      setSearchResults(res.data.results || []);
      setShowSearchResults(true);
      
    } catch (err) {
      console.error('❌ Search failed:', err);
      console.log('Error details:', err.response?.data || err.message);
      console.log('Error status:', err.response?.status);
      
      // Show user-friendly error message
      if (err.response?.status === 404) {
        setSearchResults([{
          id: 'error_404',
          title: 'Search Not Available',
          description: 'The search feature is not yet configured on the server.',
          type: 'Info',
          status: 'info',
          icon: '⚙️'
        }]);
      } else if (err.response?.status === 401) {
        setSearchResults([{
          id: 'error_401',
          title: 'Authentication Required',
          description: 'Please log in again to use search.',
          type: 'Error',
          status: 'error',
          icon: '🔒'
        }]);
      } else {
        setSearchResults([{
          id: 'error_generic',
          title: 'Search Temporarily Unavailable',
          description: 'Please try again later or contact support.',
          type: 'Error',
          status: 'error',
          icon: '❌'
        }]);
      }
      setShowSearchResults(true);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery);
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleSearchItemClick = (item) => {
    // Handle navigation based on item type
    if (item.type === 'Error' || item.type === 'Info') {
      // Don't navigate for error/info items
      console.log('Info/Error item clicked:', item.title);
      setShowSearchResults(false);
      setSearchQuery("");
      return;
    }

    switch (item.type) {
      case 'Order':
        window.location.href = `/delivery/${item.id}`;
        break;
      case 'Payment':
        window.location.href = `/payments/${item.id}`;
        break;
      case 'User':
        window.location.href = `/accounts/${item.id}`;
        break;
      default:
        console.log('Selected item:', item);
    }
    
    setShowSearchResults(false);
    setSearchQuery("");
  };

  const unreadCount = Array.isArray(notifications)
    ? notifications.filter((n) => !n.read).length
    : 0;

  return (
    <header className="bg-gray-100 border-b border-gray-200">
      <div className="flex items-center justify-between px-3 md:px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-3 md:space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
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
          <h1 className="text-lg md:text-2xl font-medium text-gray-900">
            {getPageTitle()}
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative hidden md:block w-2/5" ref={searchRef}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders, payments, users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowSearchResults(true)}
              className="w-full outline-none pl-12 pr-10 py-2 border bg-gray-50 border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
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
            
            {/* Loading indicator */}
            {isSearching && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              </div>
            )}
            
            {/* Clear search button */}
            {searchQuery && !isSearching && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setShowSearchResults(false);
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  className="h-4 w-4 text-gray-400 hover:text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
              {searchResults.length > 0 ? (
                <div>
                  <div className="px-4 py-3 border-b border-gray-100 font-medium text-gray-700 bg-gray-50 flex justify-between items-center">
                    <span>Search Results</span>
                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                      {searchResults.length} found
                    </span>
                  </div>
                  {searchResults.map((result, index) => (
                    <button
                      key={result.id || index}
                      onClick={() => handleSearchItemClick(result)}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors ${
                        result.type === 'Error' ? 'bg-red-50 hover:bg-red-100' : 
                        result.type === 'Info' ? 'bg-blue-50 hover:bg-blue-100' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                          result.type === 'Error' ? 'bg-red-100' : 
                          result.type === 'Info' ? 'bg-blue-100' : 'bg-blue-100'
                        }`}>
                          {result.icon || '📄'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-800 truncate">
                              {result.title}
                            </p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              result.status === 'completed' || result.status === 'success' || result.status === 'verified' 
                                ? 'bg-green-100 text-green-800'
                                : result.status === 'pending' || result.status === 'requested'
                                ? 'bg-yellow-100 text-yellow-800'
                                : result.status === 'failed' || result.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : result.status === 'error'
                                ? 'bg-red-100 text-red-800'
                                : result.status === 'info'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {result.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {result.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500 capitalize">
                              {result.type}
                            </span>
                            {result.amount && (
                              <span className="text-xs font-medium text-gray-700">
                                ₦{result.amount.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : searchQuery && !isSearching ? (
                <div className="px-4 py-8 text-center text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="font-medium">No results found</p>
                  <p className="text-sm mt-1">Try searching for orders, payments, or users</p>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3 md:space-x-5 relative">
          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full border border-gray-200 bg-gray-50 transition-colors"
            >
              <img
                src={notificationIcon}
                alt="notification"
                className="w-5 h-5"
              />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </button>

            {/* Notification Dropdown */}
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50 max-h-96 overflow-y-auto">
                <div className="px-4 py-2 border-b border-gray-100 font-medium text-gray-700 flex justify-between items-center">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div
                      key={n._id}
                      className={`px-4 py-3 text-sm ${n.read
                        ? "bg-white hover:bg-gray-50"
                        : "bg-blue-50 hover:bg-blue-100"
                        } border-b border-gray-100 transition-colors`}
                    >
                      <p className="font-medium text-gray-800">{n.title}</p>
                      <p className="text-gray-500 text-xs mt-1">{n.message}</p>
                      {!n.read && (
                        <span className="inline-block mt-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-gray-500">
                    <p>No notifications yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-3 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <img
                src={user.image}
                alt="user"
                className="w-8 h-8 rounded-full object-cover border-2 border-white"
              />
              <svg
                className={`h-4 w-4 text-gray-500 transform transition-transform ${dropdownOpen ? "rotate-180" : ""
                  }`}
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
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm text-gray-700 font-medium">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Administrator</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center space-x-2 transition-colors"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;