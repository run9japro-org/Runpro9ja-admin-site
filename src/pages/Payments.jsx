import React, { useState, useEffect } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { RiArrowRightDownFill } from "react-icons/ri";
import icon from "../assets/icons/arrow-growth.png";
import { 
  getPaymentsSummary, 
  getPaymentsInflow, 
  getPaymentsOutflow,
  getPendingPayments 
} from "../services/adminService";

const Payments = () => {
  const [activeTab, setActiveTab] = useState("inflow");
  const [summary, setSummary] = useState(null);
  const [inflowData, setInflowData] = useState([]);
  const [outflowData, setOutflowData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [period, setPeriod] = useState("daily");
  const [inflowFilter, setInflowFilter] = useState("all"); // all, success, pending, failed
  const [outflowFilter, setOutflowFilter] = useState("all"); // all, processed, pending
  const [loading, setLoading] = useState({
    summary: true,
    inflow: true,
    outflow: true,
    pending: false
  });
  const [error, setError] = useState(null);
  const [pendingStats, setPendingStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        
        // Fetch payments summary
        const summaryResponse = await getPaymentsSummary(period);
        if (summaryResponse && summaryResponse.success) {
          setSummary(summaryResponse.summary);
        } else {
          setSummary(getSampleSummary());
        }

        // Fetch inflow data with all statuses including pending
        const inflowResponse = await getPaymentsInflow({ 
          status: inflowFilter,
          includePending: true 
        });
        if (inflowResponse && inflowResponse.success) {
          setInflowData(inflowResponse.inflowData || []);
        } else {
          setInflowData(getSampleInflowData());
        }

        // Fetch outflow data
        const outflowResponse = await getPaymentsOutflow({ 
          includePending: outflowFilter === 'all' ? true : outflowFilter 
        });
        if (outflowResponse && outflowResponse.success) {
          setOutflowData(outflowResponse.outflowData || []);
        } else {
          setOutflowData(getSampleOutflowData());
        }

        // Fetch pending payments specifically
        const pendingResponse = await getPendingPayments();
        if (pendingResponse && pendingResponse.success) {
          setPendingData(pendingResponse.pendingPayments || []);
          setPendingStats(pendingResponse.statistics || {});
        }

      } catch (err) {
        console.error("Error fetching payments data:", err);
        setError("Failed to load payments data");
        setSummary(getSampleSummary());
        setInflowData(getSampleInflowData());
        setOutflowData(getSampleOutflowData());
        setPendingData(getSampleInflowData().filter(item => item.status === 'Pending'));
      } finally {
        setLoading({
          summary: false,
          inflow: false,
          outflow: false,
          pending: false
        });
      }
    };

    fetchData();
  }, [period, inflowFilter, outflowFilter]);

  // Handle period change
  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
    setLoading(prev => ({ ...prev, summary: true }));
  };

  // Handle inflow filter change
  const handleInflowFilterChange = (filter) => {
    setInflowFilter(filter);
    setLoading(prev => ({ ...prev, inflow: true }));
  };

  // Handle outflow filter change
  const handleOutflowFilterChange = (filter) => {
    setOutflowFilter(filter);
    setLoading(prev => ({ ...prev, outflow: true }));
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (typeof amount === 'string' && amount.includes('₦')) {
      return amount; // Already formatted
    }
    return `₦${typeof amount === 'number' ? amount.toLocaleString() : '0'}`;
  };

  // Get status badge color
  const getStatusColor = (status, isOverdue = false) => {
    const statusLower = status.toLowerCase();
    
    if (isOverdue) {
      return "bg-red-100 text-red-800 border border-red-300";
    }
    
    switch (statusLower) {
      case 'successful':
      case 'success':
      case 'paid':
      case 'processed':
        return "bg-green-100 text-green-800 border border-green-300";
      case 'pending':
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case 'failed':
      case 'cancelled':
        return "bg-red-100 text-red-800 border border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  // Sample data fallback
  const getSampleSummary = () => ({
    accountBalance: 3987550,
    monthlyTransaction: 1987550,
    dailyTransaction: 800000,
    inflow: 800908,
    pendingAmount: 150000,
    pendingCount: 5,
    outflow: 200908,
    successfulTransactions: 162,
    failedTransactions: 5,
    pendingTransactions: 8,
    refunds: 2,
    totalTransactions: 177
  });

  const getSampleInflowData = () => [
    {
      id: 1,
      name: "Rakeem Arinze",
      orderId: "ORD-90543",
      address: "32, Olaopade street, Alakuko",
      service: "Babysitting",
      hours: 6,
      date: "27/09/25",
      amount: "₦30,000",
      type: "Transfer",
      status: "Successful",
      isPending: false,
      isOverdue: false,
    },
    {
      id: 2,
      name: "Chinedu Okoro",
      orderId: "ORD-90544",
      address: "12, Alagbado street, Ikeja",
      service: "Tutoring",
      hours: 4,
      date: "29/09/25",
      amount: "₦15,000",
      type: "Transfer",
      status: "Pending",
      isPending: true,
      isOverdue: true,
      pendingDuration: "2 days",
    },
    {
      id: 3,
      name: "Funke Adebayo",
      orderId: "ORD-90545",
      address: "45, Allen Avenue, Ikeja",
      service: "Cleaning",
      hours: 3,
      date: "28/09/25",
      amount: "₦12,000",
      type: "Card",
      status: "Failed",
      isPending: false,
      isOverdue: false,
    },
  ];

  const getSampleOutflowData = () => [
    {
      id: 1,
      provider: "Samuel Biyomi",
      serviceId: "SRV-90543",
      address: "32, Olaopade street, Alakuko",
      service: "Errand",
      hours: 6,
      date: "27/09/25",
      amount: "₦21,000",
      status: "Paid",
      payoutStatus: "processed",
      isPending: false,
    },
    {
      id: 2,
      provider: "Grace Okafor",
      serviceId: "SRV-90544",
      address: "14, Ajayi street, Agege",
      service: "Bricklayer",
      hours: 6,
      date: "28/09/25",
      amount: "₦14,000",
      status: "Pending",
      payoutStatus: "pending",
      isPending: true,
    },
  ];

  // Safe data access
  const safeString = (value, fallback = 'N/A') => {
    if (value === null || value === undefined || value === '') return fallback;
    if (typeof value === 'object') return fallback;
    return String(value);
  };

  // Mock growth data
  const growthData = {
    daily: { percentage: 23.4, users: 123, trend: 'up' },
    monthly: { percentage: 15.2, users: 50, trend: 'up' },
    yearly: { percentage: 10.4, users: -50, trend: 'down' }
  };

  const currentGrowth = growthData[period] || growthData.daily;

  // Filter inflow data based on selected filter
  const filteredInflowData = inflowFilter === 'all' 
    ? inflowData 
    : inflowData.filter(item => {
        const statusLower = item.status?.toLowerCase();
        const originalStatus = item.originalStatus?.toLowerCase();
        
        if (inflowFilter === 'success') {
          return statusLower === 'successful' || originalStatus === 'success';
        }
        if (inflowFilter === 'pending') {
          return statusLower === 'pending' || originalStatus === 'pending' || item.isPending;
        }
        if (inflowFilter === 'failed') {
          return statusLower === 'failed' || originalStatus === 'failed' || originalStatus === 'cancelled';
        }
        return true;
      });

  // Filter outflow data based on selected filter
  const filteredOutflowData = outflowFilter === 'all' 
    ? outflowData 
    : outflowData.filter(item => {
        if (outflowFilter === 'processed') {
          return !item.isPending;
        }
        if (outflowFilter === 'pending') {
          return item.isPending;
        }
        return true;
      });

  if (loading.summary) {
    return (
      <div className="min-h-screen p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="bg-gray-200 rounded-xl p-5 h-40 animate-pulse"></div>
          ))}
        </div>
        <div className="bg-gray-200 rounded-xl h-64 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      {error && (
        <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 text-orange-700 mb-4">
          {error} - Showing sample data
        </div>
      )}

      {/* PENDING PAYMENTS ALERT */}
      {pendingStats && pendingStats.totalPending > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaClock className="text-yellow-600 text-xl" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800">
                  Pending Payments Alert
                </h3>
                <p className="text-yellow-700">
                  You have {pendingStats.totalPending} pending payments totaling {formatCurrency(pendingStats.totalPendingAmount)}
                  {pendingStats.overdueCount > 0 && (
                    <span className="ml-2 text-red-600 font-semibold">
                      ({pendingStats.overdueCount} overdue)
                    </span>
                  )}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab("inflow")}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-semibold"
            >
              View Pending
            </button>
          </div>
        </div>
      )}

      {/* HEADER CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Card 1 - Account Balance */}
        <div className="bg-primary flex justify-between flex-col text-white rounded-xl p-5 shadow-md relative overflow-hidden">
          <div className="flex justify-between items-center">
            <p className="text-lg flex items-center gap-1">
              Account Balance
            </p>
            <HiOutlineInformationCircle size={16} className="opacity-80" />
          </div>
          <h2 className="text-3xl flex align-center gap-2 mt-2">
            <span>
              <img src={icon} alt="" className="h-8 w-8" />
            </span>
            {formatCurrency(summary?.accountBalance || 0)}
          </h2>
          <div className="mt-4 flex justify-end gap-8 text-lg font-medium">
            <span className="text-yellow-400 border border-yellow-400 px-3 py-1 rounded-full flex items-center gap-1">
              <FaArrowUp /> {currentGrowth.percentage}%
            </span>
            <span className="text-yellow-400 border border-yellow-400 px-3 py-1 rounded-full">
              +{currentGrowth.users} users
            </span>
          </div>
        </div>

        {/* Card 2 - Monthly Transaction */}
        <div className="bg-primary flex justify-between flex-col text-white rounded-xl p-5 shadow-md relative overflow-hidden">
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium flex items-center gap-1">
              Monthly Transaction
            </p>
            <HiOutlineInformationCircle size={16} className="opacity-80" />
          </div>
          <h2 className="text-3xl flex align-center gap-2 mt-2">
            <span>
              <img src={icon} alt="" className="h-8 w-8" />
            </span>
            {formatCurrency(summary?.monthlyTransaction || 0)}
          </h2>
          <div className="mt-4 flex justify-end gap-8 font-medium">
            <span className="text-yellow-400 border text-lg border-yellow-400 px-3 py-1 rounded-full flex items-center gap-1">
              <FaArrowUp /> 15.2%
            </span>
            <span className="text-yellow-400 border border-yellow-400 text-lg px-3 py-1 rounded-full">
              +50 users
            </span>
          </div>
        </div>

        {/* Card 3 - Daily Transaction */}
        <div className="bg-primary flex justify-between flex-col text-white rounded-xl p-5 shadow-md relative overflow-hidden">
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium flex items-center gap-1">
              {period.charAt(0).toUpperCase() + period.slice(1)} Transaction
            </p>
            <HiOutlineInformationCircle size={16} className="opacity-80" />
          </div>
          <h2 className="text-3xl mt-2 flex align-center gap-2">
            <span>
              <RiArrowRightDownFill className="text-red-600 h-8 w-8" />
            </span>
            {formatCurrency(summary?.dailyTransaction || 0)}
          </h2>
          <div className="mt-4 flex justify-end gap-8 text-lg font-medium">
            <span className="text-red-600 border border-red-600 px-3 py-1 rounded-full flex items-center gap-1">
              <FaArrowDown /> 10.4%
            </span>
            <span className="text-red-600 border border-red-600 px-3 py-1 rounded-full">
              -50 users
            </span>
          </div>
        </div>

        {/* Card 4 (Detailed Summary Card) */}
        <div className="bg-gray-50 rounded-xl p-5 shadow-md border border-gray-200">
          <div className="grid grid-cols-3 font-medium gap-4 text-lg text-gray-600 mb-3">
            {['daily', 'monthly', 'yearly'].map((p) => (
              <button
                key={p}
                onClick={() => handlePeriodChange(p)}
                className={`text-center rounded-xl transition-colors ${
                  period === p
                    ? 'bg-primary text-white'
                    : 'border border-gray-500 hover:bg-gray-100'
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

          <div className="space-y-2 text-gray-800 text-lg">
            <div className="flex gap-4">
              <div className="flex gap-2">
                <span>In:</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(summary?.inflow || 0)}
                </span>
              </div>
              <div className="flex gap-2">
                <span>Out:</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(summary?.outflow || 0)}
                </span>
              </div>
            </div>
            {summary?.pendingAmount > 0 && (
              <div className="flex gap-2 items-center">
                <FaClock className="text-yellow-500" />
                <span>Pending:</span>
                <span className="font-semibold text-yellow-600">
                  {formatCurrency(summary.pendingAmount)}
                </span>
                <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  {summary.pendingCount} payments
                </span>
              </div>
            )}
          </div>

          <hr className="my-3 border-gray-200" />

          <div className="text-gray-800 text-lg space-y-2">
            <div className="flex justify-between">
              <span>Successful</span>
              <span className="font-semibold text-green-600">{summary?.successfulTransactions || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Pending</span>
              <span className="font-semibold text-yellow-600">{summary?.pendingTransactions || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Failed</span>
              <span className="font-semibold text-red-600">{summary?.failedTransactions || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Refunds</span>
              <span className="font-semibold text-orange-600">{summary?.refunds || 0}</span>
            </div>
          </div>

          <hr className="my-3 border-gray-200" />

          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-green-600">
              Total Transactions
            </span>
            <span className="text-lg font-bold text-green-600">
              {summary?.totalTransactions || 0}
            </span>
          </div>
        </div>
      </div>

      {/* TOGGLE TABS */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab("inflow")}
          className={`w-1/2 p-3 font-semibold border rounded-xl text-lg transition-colors ${
            activeTab === "inflow"
              ? "bg-primary text-white border-primary"
              : "bg-transparent text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          Cash Inflow ({inflowData.length})
          {summary?.pendingCount > 0 && (
            <span className="ml-2 bg-yellow-500 text-white text-sm px-2 py-1 rounded-full">
              {summary.pendingCount} pending
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("outflow")}
          className={`w-1/2 p-3 font-semibold border rounded-xl text-lg transition-colors ${
            activeTab === "outflow"
              ? "bg-primary text-white border-primary"
              : "bg-transparent text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          Cash Outflow ({outflowData.length})
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          {activeTab === "inflow" ? (
            <>
              <button
                onClick={() => handleInflowFilterChange("all")}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  inflowFilter === "all"
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleInflowFilterChange("success")}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  inflowFilter === "success"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Successful
              </button>
              <button
                onClick={() => handleInflowFilterChange("pending")}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  inflowFilter === "pending"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => handleInflowFilterChange("failed")}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  inflowFilter === "failed"
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Failed
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleOutflowFilterChange("all")}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  outflowFilter === "all"
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleOutflowFilterChange("processed")}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  outflowFilter === "processed"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Paid
              </button>
              <button
                onClick={() => handleOutflowFilterChange("pending")}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  outflowFilter === "pending"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Pending Payout
              </button>
            </>
          )}
        </div>
        
        <div className="text-sm text-gray-600">
          Showing {activeTab === "inflow" ? filteredInflowData.length : filteredOutflowData.length} records
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="border border-gray-200 rounded-xl overflow-x-auto">
        {activeTab === "inflow" ? (
          <table className="min-w-full text-sm text-left">
            <thead className="border-b bg-gray-50">
              <tr>
                {[
                  "Customer Name",
                  "Order ID",
                  "Address",
                  "Service",
                  "Hours",
                  "Date",
                  "Amount",
                  "Type",
                  "Status",
                  "Duration"
                ].map((header, i) => (
                  <th
                    key={i}
                    className="py-4 px-4 font-semibold text-lg text-gray-700 whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading.inflow ? (
                // Loading skeleton for inflow
                Array.from({ length: 3 }).map((_, index) => (
                  <tr key={index} className="border-b">
                    {Array.from({ length: 10 }).map((_, cellIndex) => (
                      <td key={cellIndex} className="py-3 px-4">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredInflowData.length > 0 ? (
                filteredInflowData.map((item, index) => (
                  <tr key={item.id || index} className="border-b hover:bg-gray-50">
                    <td className="text-lg font-semibold py-3 px-4 text-gray-900">
                      <div className="flex items-center space-x-2">
                        {safeString(item.name, 'Customer')}
                        {item.isOverdue && (
                          <FaExclamationTriangle className="text-red-500 text-sm" title="Overdue payment" />
                        )}
                      </div>
                    </td>
                    <td className="text-lg font-semibold py-3 px-4 text-gray-900">
                      {safeString(item.orderId, 'N/A')}
                    </td>
                    <td className="text-lg font-semibold py-3 px-4 text-gray-900">
                      {safeString(item.address, 'Address not specified')}
                    </td>
                    <td className="text-lg font-semibold py-3 px-4 text-gray-900">
                      {safeString(item.service, 'Service')}
                    </td>
                    <td className="text-lg font-semibold py-3 px-4 text-gray-900">
                      {safeString(item.hours, '0')}
                    </td>
                    <td className="text-lg font-semibold py-3 px-4 text-gray-900">
                      {safeString(item.date, 'N/A')}
                    </td>
                    <td className="text-lg font-semibold py-3 px-4 text-gray-900">
                      {safeString(item.amount, '₦0')}
                    </td>
                    <td className="text-lg font-semibold py-3 px-4 text-gray-900">
                      {safeString(item.type, 'Transfer')}
                    </td>
                    <td className="text-lg font-semibold py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(item.status, item.isOverdue)}`}
                      >
                        {safeString(item.status, 'Pending')}
                      </span>
                    </td>
                    <td className="text-lg font-semibold py-3 px-4 text-gray-900">
                      {item.pendingDuration && (
                        <div className="flex items-center space-x-1 text-yellow-600">
                          <FaClock className="text-sm" />
                          <span>{item.pendingDuration}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="py-8 text-center text-gray-500">
                    No inflow data found for the selected filter
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full text-sm text-left">
            <thead className="border-b bg-gray-50">
              <tr>
                {[
                  "Service Provider",
                  "Service ID",
                  "Address",
                  "Service",
                  "Hours",
                  "Date",
                  "Amount",
                  "Status",
                ].map((header, i) => (
                  <th
                    key={i}
                    className="py-4 px-4 text-lg font-semibold text-gray-700 whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading.outflow ? (
                // Loading skeleton for outflow
                Array.from({ length: 3 }).map((_, index) => (
                  <tr key={index} className="border-b">
                    {Array.from({ length: 8 }).map((_, cellIndex) => (
                      <td key={cellIndex} className="py-3 px-4">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredOutflowData.length > 0 ? (
                filteredOutflowData.map((item, index) => (
                  <tr key={item.id || index} className="border-b hover:bg-gray-50">
                    <td className="text-lg py-2 font-semibold px-4 text-gray-900">
                      {safeString(item.provider, 'Service Provider')}
                    </td>
                    <td className="text-lg py-2 font-semibold px-4 text-gray-900">
                      {safeString(item.serviceId, 'N/A')}
                    </td>
                    <td className="text-lg py-2 font-semibold px-4 text-gray-900">
                      {safeString(item.address, 'Address not specified')}
                    </td>
                    <td className="text-lg py-2 font-semibold px-4 text-gray-900">
                      {safeString(item.service, 'Service')}
                    </td>
                    <td className="text-lg py-2 font-semibold px-4 text-gray-900">
                      {safeString(item.hours, '0')}
                    </td>
                    <td className="text-lg py-2 font-semibold px-4 text-gray-900">
                      {safeString(item.date, 'N/A')}
                    </td>
                    <td className="text-lg py-2 font-semibold px-4 text-gray-900">
                      {safeString(item.amount, '₦0')}
                    </td>
                    <td className="text-lg py-2 font-semibold px-4">
                      <span
                        className={`px-3 text-sm py-1 rounded-full font-semibold ${getStatusColor(item.status)}`}
                      >
                        {safeString(item.status, 'Pending')}
                        {item.isPending && (
                          <span className="ml-1 text-xs">⏳</span>
                        )}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-gray-500">
                    No outflow data found for the selected filter
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Payments;