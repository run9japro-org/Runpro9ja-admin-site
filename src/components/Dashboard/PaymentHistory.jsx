import React, { useState, useEffect } from "react";
import { getTopAgents, getRecentPayments } from "../../services/adminService";

const PaymentHistory = () => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loadingAgents, setLoadingAgents] = useState(true);
  const [loadingPayments, setLoadingPayments] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Starting to fetch data...");
        
        // Fetch top agents
        console.log("Fetching top agents...");
        const agentsResponse = await getTopAgents(5);
        console.log("Agents response:", agentsResponse);
        
        if (agentsResponse.success) {
          setServiceProviders(agentsResponse.agents);
          console.log("Agents data set:", agentsResponse.agents);
        } else {
          console.log("Using sample agents data");
          setServiceProviders(getSampleServiceProviders());
        }

        // Fetch recent payments
        console.log("Fetching recent payments...");
        const paymentsResponse = await getRecentPayments(5);
        console.log("Payments response:", paymentsResponse);
        
        if (paymentsResponse.success) {
          setPaymentHistory(paymentsResponse.payments);
          console.log("Payments data set:", paymentsResponse.payments);
        } else {
          console.log("Using sample payments data");
          setPaymentHistory(getSamplePaymentHistory());
        }
        
        console.log("Data fetch completed successfully");
        
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(`Failed to load data: ${err.message}`);
        setServiceProviders(getSampleServiceProviders());
        setPaymentHistory(getSamplePaymentHistory());
      } finally {
        setLoadingAgents(false);
        setLoadingPayments(false);
      }
    };

    fetchData();
  }, []);

  const getSampleServiceProviders = () => {
    return [
      {
        id: "890221",
        name: "Oladejo Nehemiah",
        service: "Plumber",
        status: "Active",
        workRate: 89,
      },
      {
        id: "890222",
        name: "Adebola Johnson",
        service: "Electrician",
        status: "Active",
        workRate: 92,
      },
      {
        id: "890223",
        name: "Chinedu Okoro",
        service: "Cleaner",
        status: "Active",
        workRate: 78,
      },
      {
        id: "890224",
        name: "Funke Adebayo",
        service: "Beautician",
        status: "Active",
        workRate: 85,
      },
    ];
  };

  const getSamplePaymentHistory = () => {
    return [
      {
        name: "Thompson Jacinta",
        service: "Lawn nail technician",
        amount: "23,000.00",
        status: "Successful",
      },
      {
        name: "Musa Bello",
        service: "Plumbing repair",
        amount: "15,500.00",
        status: "Successful",
      },
      {
        name: "Grace Okafor",
        service: "Home cleaning",
        amount: "12,000.00",
        status: "Pending",
      },
      {
        name: "David Smith",
        service: "Electrical wiring",
        amount: "45,000.00",
        status: "Successful",
      },
    ];
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'successful':
      case 'success':
      case 'completed':
        return 'text-green-700';
      case 'pending':
        return 'text-yellow-600';
      case 'failed':
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-700';
    }
  };

  const getStatusDotColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'successful':
      case 'success':
      case 'completed':
        return 'bg-green-700';
      case 'pending':
        return 'bg-yellow-600';
      case 'failed':
      case 'cancelled':
        return 'bg-red-600';
      default:
        return 'bg-gray-700';
    }
  };

  const formatAmount = (amount, currency = 'NGN') => {
    if (typeof amount === 'number') {
      return `₦${amount.toLocaleString('en-NG', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;
    }
    return `₦${amount}`;
  };

  if (loadingAgents && loadingPayments) {
    return (
      <div className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
          <div className="py-5">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Service Providers</h3>
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
              <div className="animate-pulse">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-center space-x-4 py-3 border-b border-gray-200">
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="py-5">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Company payment history</h3>
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
              <div className="animate-pulse">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-gray-200">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-32"></div>
                      <div className="h-3 bg-gray-300 rounded w-24"></div>
                    </div>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      {error && (
        <div className="mb-4 p-3 bg-orange-100 border border-orange-300 rounded-lg text-orange-700">
          {error} - Showing sample data
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        {/* SERVICE PROVIDERS SECTION */}
        <div className="py-5">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Top Service Providers
          </h3>
          <div className="overflow-x-auto bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="text-md">
                  <th className="text-lg py-2 px-3 font-medium text-gray-800">
                    ID
                  </th>
                  <th className="text-lg py-2 px-3 font-medium text-gray-800">
                    Name
                  </th>
                  <th className="text-lg py-2 px-3 font-medium text-gray-800">
                    Service
                  </th>
                  <th className="text-lg py-2 px-3 font-medium text-gray-800">
                    Status
                  </th>
                  <th className="text-lg py-2 px-3 font-medium text-gray-800 text-end">
                    Work Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {serviceProviders.map((provider, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-300 hover:bg-gray-50"
                  >
                    <td className="p-3 text-lg text-gray-700 font-bold">
                      {provider.agentId || provider.id}
                    </td>
                    <td className="p-3 flex text-lg font-semibold items-center gap-2 text-gray-700">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {provider.name?.charAt(0) || 'U'}
                      </div>
                      {provider.name}
                    </td>
                    <td className="p-3 text-gray-700 font-semibold text-lg">
                      {provider.service}
                    </td>
                    <td className="py-3 px-3 text-lg flex items-center">
                      <span 
                        className={`w-2 h-2 rounded-full mr-2 ${getStatusDotColor(provider.status)}`}
                      ></span>
                      <span className={getStatusColor(provider.status)}>
                        {provider.status}
                      </span>
                    </td>
                    <td className="">
                      <div className="flex align-center justify-end gap-8">
                        <div className="w-26 bg-gray-200 rounded-full h-2 overflow-hidden mt-3">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${provider.workRate}%`,
                              backgroundColor: "#0D7957CC",
                            }}
                          ></div>
                        </div>
                        <span className="text-lg">
                          {provider.workRate}% <span className="mx-2">..</span>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* COMPANY PAYMENT HISTORY */}
        <div className="py-5">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Recent Payments
          </h3>
          <div className="overflow-y-auto max-h-[400px] bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
            <ul className="divide-y divide-gray-200">
              {paymentHistory.map((payment, idx) => (
                <li
                  key={idx}
                  className="py-3 flex justify-between items-center"
                >
                  <div className="flex-1">
                    <p className="text-lg text-gray-800 font-medium truncate">
                      {payment.name}
                    </p>
                    <p className="text-md text-gray-700 truncate">
                      {payment.service}
                    </p>
                  </div>
                  <p className="text-gray-800 font-medium text-lg mx-4 flex-shrink-0">
                    {formatAmount(payment.amount, payment.currency)}
                  </p>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-lg font-bold ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;