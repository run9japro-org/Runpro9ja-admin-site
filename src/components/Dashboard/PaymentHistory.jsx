import React from "react";

const PaymentHistory = () => {
  const serviceProviders = [
    {
      id: "890221",
      name: "Oladejo Nehemiah",
      service: "Plumber",
      status: "Active",
      workRate: 89,
    },
    {
      id: "890222",
      name: "Oladejo Nehemiah",
      service: "Plumber",
      status: "Active",
      workRate: 89,
    },
    {
      id: "890223",
      name: "Oladejo Nehemiah",
      service: "Plumber",
      status: "Active",
      workRate: 89,
    },
    {
      id: "890224",
      name: "Oladejo Nehemiah",
      service: "Plumber",
      status: "Active",
      workRate: 89,
    },
  ];

  const paymentHistory = [
    {
      name: "Thompson Jacinta",
      service: "Lawn nail technician",
      amount: "23,000.00",
      status: "Successful",
    },
    {
      name: "Thompson Jacinta",
      service: "Lawn nail technician",
      amount: "23,000.00",
      status: "Successful",
    },
    {
      name: "Thompson Jacinta",
      service: "Lawn nail technician",
      amount: "23,000.00",
      status: "Successful",
    },
    {
      name: "Thompson Jacinta",
      service: "Lawn nail technician",
      amount: "23,000.00",
      status: "Successful",
    },
  
  
  ];

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        {/* SERVICE PROVIDERS SECTION */}
        <div className="py-5  ">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Service Providers
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
                      {provider.id}
                    </td>
                    <td className="p-3 flex text-lg font-semibold items-center gap-2 text-gray-700">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      {provider.name}
                    </td>
                    <td className="p-3 text-gray-700 font-semibold text-lg">
                      {provider.service}
                    </td>
                    <td className="py-3 px-3 text-lg text-green-700 flex items-center">
                      <span className="w-2 h-2  bg-green-700 rounded-full mr-2"></span>
                      {provider.status}
                    </td>
                    <td className="">
                      <div className="flex align-center justify-end gap-8  ">
                        <div className="w-26 bg-gray-200 rounded-full h-2 overflow-hidden mt-3 ">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${provider.workRate}%`,
                              backgroundColor: "#0D7957CC",
                            }}
                          ></div>
                        </div>
                        <span className="text-lg ">
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
        <div className="py-5 ">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Company payment history
          </h3>
          <div className="overflow-y-auto max-h-[400px] bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
            <ul className="divide-y divide-gray-200">
              {paymentHistory.map((payment, idx) => (
                <li
                  key={idx}
                  className="py-3 flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg text-gray-800 font-medium">{payment.name}</p>
                    <p className="text-md text-gray-700">{payment.service}</p>
                  </div>
                  <p className="text-gray-800 font-medium text-lg">₦{payment.amount}</p>
                  <div className="text-right">
                    <p className="text-lg text-gray-800 font-bold">{payment.status}</p>
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
