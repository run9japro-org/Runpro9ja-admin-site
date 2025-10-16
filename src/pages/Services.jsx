import React from "react";

const Services = () => {
  // Service Request Data
  const serviceRequests = [
    {
      requestId: "IP-001",
      customerName: "Adejabola Ayomide",
      serviceType: "Babysiting",
      status: "In progress",
      dueDate: "15/06/2025",
    },
    {
      requestId: "IP-0021",
      customerName: "Adejabola Ayomide",
      serviceType: "Babysiting",
      status: "Completed",
      dueDate: "15/06/2025",
    },
    {
      requestId: "IP-0031",
      customerName: "Adejabola Ayomide",
      serviceType: "Babysiting",
      status: "Pending",
      dueDate: "15/06/2025",
    },
    {
      requestId: "IP-0041",
      customerName: "Adejabola Ayomide",
      serviceType: "Babysiting",
      status: "In progress",
      dueDate: "15/06/2025",
    },
    {
      requestId: "IP-0051",
      customerName: "Adejabola Ayomide",
      serviceType: "Babysiting",
      status: "In progress",
      dueDate: "15/06/2025",
    },
    {
      requestId: "IP-0061",
      customerName: "Adejabola Ayomide",
      serviceType: "Babysiting",
      status: "In progress",
      dueDate: "15/06/2025",
    },
    {
      requestId: "IP-0071",
      customerName: "Adejabola Ayomide",
      serviceType: "Babysiting",
      status: "In progress",
      dueDate: "15/06/2025",
    },
    {
      requestId: "IP-0081",
      customerName: "Adejabola Ayomide",
      serviceType: "Babysiting",
      status: "In progress",
      dueDate: "15/06/2025",
    },
    {
      requestId: "IP-0091",
      customerName: "Adejabola Ayomide",
      serviceType: "Babysiting",
      status: "In progress",
      dueDate: "15/06/2025",
    },
    {
      requestId: "IP-0101",
      customerName: "Adejabola Ayomide",
      serviceType: "Babysiting",
      status: "In progress",
      dueDate: "15/06/2025",
    },
    {
      requestId: "IP-0111",
      customerName: "Adejabola Ayomide",
      serviceType: "Babysiting",
      status: "In progress",
      dueDate: "15/06/2025",
    },
    {
      requestId: "IP-0121",
      customerName: "Adejabola Ayomide",
      serviceType: "Babysiting",
      status: "In progress",
      dueDate: "15/06/2025",
    },
    {
      requestId: "IP-0131",
      customerName: "Adejabola Ayomide",
      serviceType: "Babysiting",
      status: "In progress",
      dueDate: "15/06/2025",
    },
  ];

  // Delivery Details Data
  const deliveryDetails = [
    {
      orderId: "RP -267",
      deliveryType: "Errand service",
      pickupDestination:
        "From: Jeobel, Atakuko To: Quanna Micaline, Lekki Teligate",
      date: "09/10/25",
      estimatedTime: "2 Hours",
      riderInCharge: "Samuel Biyomi",
      orderBy: "Mariam Hassan",
      deliveredTo: "Mariam Hassan",
    },
    {
      orderId: "RP -267",
      deliveryType: "Dispatch deli...",
      pickupDestination:
        "From: 23. Sukenu Qie Road Casso To: Quanna Micaline, Lekki Teligate",
      date: "09/10/25",
      estimatedTime: "2 Hours",
      riderInCharge: "Samuel Biyomi",
      orderBy: "Mariam Hassan",
      deliveredTo: "Chakouma Berry",
    },
    {
      orderId: "RP -267",
      deliveryType: "Plumbing ser...",
      pickupDestination:
        "From: 23. Sukenu Qie Road Casso To: Quanna Micaline, Lekki Teligate",
      date: "09/10/25",
      estimatedTime: "5 Hours",
      riderInCharge: "Samuel Biyomi",
      orderBy: "Mariam Hassan",
      deliveredTo: "Shade Labah",
    },
    {
      orderId: "RP -267",
      deliveryType: "Errand service",
      pickupDestination:
        "From: 23. Sukenu Qie Road Casso To: Quanna Micaline, Lekki Teligate",
      date: "09/10/25",
      estimatedTime: "23 Hours",
      riderInCharge: "Samuel Biyomi",
      orderBy: "Abayemi Kawabe",
      deliveredTo: "Mariam Hassan",
    },
  ];

  // Status badge component
  const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case "completed":
          return " text-green-500";
        case "in progress":
          return " text-yellow-500";
        case "pending":
          return " text-red-500";
        default:
          return " text-gray-800";
      }
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-md font-medium ${getStatusColor(
          status
        )}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6 md:px-4">
      {/* Service Request List Section */}
      <div className="  overflow-hidden">
        <div className=" py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Service Request List
          </h2>
        </div>

        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-50">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-primary sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider rounded-tl-lg">
                      Request ID
                    </th>
                    <th className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider">
                      Service Type
                    </th>
                    <th className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider rounded-tr-lg">
                      Due Date
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
                  {serviceRequests.map((request, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-900">
                        {request.requestId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-900">
                        {request.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-900">
                        {request.serviceType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-md font-semibold">
                        <StatusBadge status={request.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-900">
                        {request.dueDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Details List Section */}
      <div className=" overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Delivery details list
          </h2>
        </div>

        <div className="overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-50">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-primary">
                <tr>
                  <th className="px-6 py-3 text-left text-md font-semibold text-white uppercase tracking-wider rounded-tl-lg">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-md font-semibold text-white uppercase tracking-wider">
                    Delivery Type
                  </th>
                  <th className="px-6 py-3 text-left text-md font-semibold text-white uppercase tracking-wider">
                    Pick up & Destination
                  </th>
                  <th className="px-6 py-3 text-left text-md font-semibold text-white uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-md font-semibold text-white uppercase tracking-wider">
                    Estimated Time
                  </th>
                  <th className="px-6 py-3 text-left text-md font-semibold text-white uppercase tracking-wider">
                    Rider in charge
                  </th>
                  <th className="px-6 py-3 text-left text-md font-semibold text-white uppercase tracking-wider">
                    Order by
                  </th>
                  <th className="px-6 py-3 text-left text-md font-semibold text-white uppercase tracking-wider rounded-tr-lg">
                    Delivered to
                  </th>
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-200">
                {deliveryDetails.map((delivery, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-md font-semibold  text-gray-900">
                      {delivery.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-900">
                      {delivery.deliveryType}
                    </td>
                    <td className="px-6 py-4 text-md font-semibold text-gray-900 max-w-xs">
                      <div className="break-words">
                        {delivery.pickupDestination}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-900">
                      {delivery.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-900">
                      {delivery.estimatedTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-900">
                      {delivery.riderInCharge}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-900">
                      {delivery.orderBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-md font-semibold text-gray-900">
                      {delivery.deliveredTo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
