import React, { useState, useEffect } from "react";
import {
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { RiArrowRightDownFill } from "react-icons/ri";
import icon from "../assets/icons/arrow-growth.png";
import { 
  getPaymentsSummary, 
  getPaymentsInflow, 
  getPaymentsOutflow 
} from "../services/adminService";

const Payments = () => {
  const [activeTab, setActiveTab] = useState("inflow");
  const [summary, setSummary] = useState(null);
  const [inflowData, setInflowData] = useState([]);
  const [outflowData, setOutflowData] = useState([]);
  const [period, setPeriod] = useState("daily");
  const [loading, setLoading] = useState({
    summary: true,
    inflow: true,
    outflow: true
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch payments summary
        const summaryResponse = await getPaymentsSummary(period);
        if (summaryResponse && summaryResponse.success) {
          setSummary(summaryResponse.summary);
        } else {
          setSummary(getSampleSummary());
        }

        // Fetch inflow data
        const inflowResponse = await getPaymentsInflow();
        if (inflowResponse && inflowResponse.success) {
          setInflowData(inflowResponse.inflowData || []);
        } else {
          setInflowData(getSampleInflowData());
        }

        // Fetch outflow data
        const outflowResponse = await getPaymentsOutflow();
        if (outflowResponse && outflowResponse.success) {
          setOutflowData(outflowResponse.outflowData || []);
        } else {
          setOutflowData(getSampleOutflowData());
        }

      } catch (err) {
        console.error("Error fetching payments data:", err);
        setError("Failed to load payments data");
        setSummary(getSampleSummary());
        setInflowData(getSampleInflowData());
        setOutflowData(getSampleOutflowData());
      } finally {
        setLoading({
          summary: false,
          inflow: false,
          outflow: false
        });
      }
    };

    fetchData();
  }, [period]);

  // Handle period change
  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
    setLoading(prev => ({ ...prev, summary: true }));
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `₦${typeof amount === 'number' ? amount.toLocaleString() : '0'}`;
  };

  // Sample data fallback
  const getSampleSummary = () => ({
    accountBalance: 3987550,
    monthlyTransaction: 1987550,
    dailyTransaction: 800000,
    inflow: 800908,
    outflow: 200908,
    successfulTransactions: 162,
    failedTransactions: 5,
    refunds: 2,
    totalTransactions: 169
  });

  const getSampleInflowData = () => [
    {
      id: 1,
      name: "Rakeem Arinze",
      orderId: "90543",
      address: "32, Olaopade street, Alakuko",
      service: "Babysitting",
      hours: 6,
      date: "27/09/25",
      amount: "₦30,000",
      type: "Transfer",
      status: "Successful",
    },
    {
      id: 2,
      name: "Rakeem Arinze",
      orderId: "90544",
      address: "12, Alagbado street, Ikeja",
      service: "Tutoring",
      hours: 4,
      date: "29/09/25",
      amount: "₦15,000",
      type: "Transfer",
      status: "Pending",
    },
  ];

  const getSampleOutflowData = () => [
    {
      id: 1,
      provider: "Rakeem Arinze",
      serviceId: "90543",
      address: "32, Olaopade street, Alakuko",
      service: "Errand",
      hours: 6,
      date: "27/09/25",
      amount: "₦30,000",
      status: "Successful",
    },
    {
      id: 2,
      provider: "Rakeem Arinze",
      serviceId: "90544",
      address: "14, Ajayi street, Agege",
      service: "Bricklayer",
      hours: 6,
      date: "28/09/25",
      amount: "₦20,000",
      status: "Pending",
    },
  ];

  // Safe data access
  const safeString = (value, fallback = 'N/A') => {
    if (value === null || value === undefined || value === '') return fallback;
    if (typeof value === 'object') return fallback;
    return String(value);
  };

  // Mock growth data (you would get this from your backend)
  const growthData = {
    daily: { percentage: 23.4, users: 123, trend: 'up' },
    monthly: { percentage: 15.2, users: 50, trend: 'up' },
    yearly: { percentage: 10.4, users: -50, trend: 'down' }
  };

  const currentGrowth = growthData[period] || growthData.daily;

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
          </div>

          <hr className="my-3 border-gray-200" />

          <div className="text-gray-800 text-lg space-y-2">
            <div className="flex justify-between">
              <span>Successful Transactions</span>
              <span className="font-semibold">{summary?.successfulTransactions || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Failed Transactions</span>
              <span className="font-semibold">{summary?.failedTransactions || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Refunds</span>
              <span className="font-semibold">{summary?.refunds || 0}</span>
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

      {/* TABLE SECTION */}
      <div className="border border-gray-200 rounded-xl overflow-x-auto">
        {activeTab === "inflow" ? (
          <table className="min-w-full text-sm text-left">
            <thead className="border-b">
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
                ].map((header, i) => (
                  <th
                    key={i}
                    className="py-6 px-4 font-semibold text-xl text-gray-700 whitespace-nowrap"
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
                    {Array.from({ length: 9 }).map((_, cellIndex) => (
                      <td key={cellIndex} className="py-3 px-4">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : inflowData.length > 0 ? (
                inflowData.map((item, index) => (
                  <tr key={item.id || index} className="border-b hover:bg-gray-50">
                    <td className="text-lg font-semibold py-3 px-4 text-gray-900">
                      {safeString(item.name, 'Customer')}
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
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          item.status === "Successful"
                            ? "bg-green-600 text-green-100"
                            : "bg-yellow-400 text-gray-700"
                        }`}
                      >
                        {safeString(item.status, 'Pending')}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-gray-500">
                    No inflow data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full text-sm text-left">
            <thead className="border-b">
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
                    className="py-6 px-4 text-xl font-semibold text-gray-700 whitespace-nowrap"
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
              ) : outflowData.length > 0 ? (
                outflowData.map((item, index) => (
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
                        className={`px-3 text-sm py-1 rounded-full font-semibold ${
                          item.status === "Successful"
                            ? "bg-green-600 text-green-100"
                            : "bg-yellow-400 text-gray-800"
                        }`}
                      >
                        {safeString(item.status, 'Pending')}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-gray-500">
                    No outflow data found
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