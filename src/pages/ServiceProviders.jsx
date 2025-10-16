import React from "react";

const ServiceProviders = () => {
  const serviceProviders = [
    {
      id: "890221",
      name: "Oladejo Nehemiah",
      service: "Plumber",
      status: "Active",
      workRate: 89,
      location: "No 16, Complex 2, Tejuosho Market, Yaba, Lagos",
    },
    {
      id: "890222",
      name: "Oladejo Nehemiah",
      service: "Plumber",
      status: "Active",
      workRate: 89,
      location: "No 16, Complex 2, Tejuosho Market, Yaba, Lagos",
    },
    {
      id: "890223",
      name: "Oladejo Nehemiah",
      service: "Plumber",
      status: "Active",
      workRate: 89,
      location: "No 16, Complex 2, Tejuosho Market, Yaba, Lagos",
    },
    {
      id: "890224",
      name: "Oladejo Nehemiah",
      service: "Plumber",
      status: "Active",
      workRate: 89,
      location: "No 16, Complex 2, Tejuosho Market, Yaba, Lagos",
    },
    {
      id: "890225",
      name: "Oladejo Nehemiah",
      service: "Plumber",
      status: "Active",
      workRate: 89,
      location: "No 16, Complex 2, Tejuosho Market, Yaba, Lagos",
    },
  ];

  const potentialProviders = [
    {
      name: "Ajayi Suleiman",
      appliedFor: "Mechanic",
      experience: "6 years",
      location: "Idi-araba Arepo",
      phone: "+234-569800345",
      email: "suleyi890@gmail.com",
      status: "Waitlisted",
    },
    {
      name: "Ajayi Suleiman",
      appliedFor: "Mechanic",
      experience: "6 years",
      location: "Idi-araba Arepo",
      phone: "+234-569800345",
      email: "suleyi890@gmail.com",
      status: "Reviewing",
    },
    {
      name: "Ajayi Suleiman",
      appliedFor: "Mechanic",
      experience: "6 years",
      location: "Idi-araba Arepo",
      phone: "+234-569800345",
      email: "suleyi890@gmail.com",
      status: "Cancelled",
    },
  ];

  // Status badge component
  const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case "Active":
          return "text-green-700";
        case "Waitlisted":
          return "text-yellow-500";
        case "Reviewing":
          return "text-blue-400";
        case "Cancelled":
          return "text-red-600";
        default:
          return "text-gray-600";
      }
    };

    return (
      <span
        className={`flex items-center font-semibold ${getStatusColor(status)}`}
      >
        <span
          className={`w-2 h-2 rounded-full mr-2 ${
            status === "Active"
              ? "bg-green-700"
              : status === "Waitlisted"
              ? "bg-yellow-500"
              : status === "Reviewing"
              ? "bg-blue-400"
              : "bg-red-600"
          }`}
        ></span>
        {status}
      </span>
    );
  };

  return (
    <div className="w-full mx-auto p-4 md:p-6 space-y-8">
      {/* SERVICE PROVIDERS TABLE */}
      <div className=" overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800">
            Employees Detail
          </h3>
        </div>

        <div className="overflow-x-auto border border-gray-200  rounded-xl">
          <table className="w-full min-w-full">
            <thead className="">
              <tr>
                <th className="py-3 px-4 text-left text-xl font-semibold text-gray-800 whitespace-nowrap">
                  ID
                </th>
                <th className="py-3 px-4 text-left text-xl font-semibold text-gray-800 whitespace-nowrap">
                  Name
                </th>
                <th className="py-3 px-4 text-left text-xl font-semibold text-gray-800 whitespace-nowrap">
                  Service
                </th>
                <th className="py-3 px-4 text-left text-xl font-semibold text-gray-800 whitespace-nowrap">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-xl font-semibold text-gray-800 whitespace-nowrap">
                  Work Rate
                </th>
                <th className="py-3 px-4 text-left text-xl font-semibold text-gray-800 whitespace-nowrap">
                  Location
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {serviceProviders.map((p, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="py-3 px-4 text-lg font-medium text-gray-800 whitespace-nowrap">
                    {p.id}
                  </td>
                  <td className="py-3 px-4 flex items-center gap-2 whitespace-nowrap">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
                    <span className="font-medium text-gray-800 text-lg md:text-base">
                      {p.name}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-lg text-gray-800 whitespace-nowrap">
                    {p.service}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 min-w-24">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${p.workRate}%`,
                            backgroundColor: "#0D7957CC",
                          }}
                        ></div>
                      </div>
                      <span className="text-gray-700 font-semibold text-lg">
                        {p.workRate}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-lg font-medium text-gray-700 max-w-xs truncate">
                    {p.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* POTENTIAL SERVICE PROVIDERS TABLE */}
      <div className=" overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800">
            Potential Service Providers
          </h3>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="w-full min-w-full">
            <thead className="bg-primary border-b border-gray-200">
              <tr>
                <th className="py-3 px-4 text-left text-xl font-medium text-white whitespace-nowrap">
                  Name
                </th>
                <th className="py-3 px-4 text-left text-xl font-medium text-white whitespace-nowrap">
                  Applied for
                </th>
                <th className="py-3 px-4 text-left text-xl font-medium text-white whitespace-nowrap">
                  Experience
                </th>
                <th className="py-3 px-4 text-left text-xl font-medium text-white whitespace-nowrap">
                  Location
                </th>
                <th className="py-3 px-4 text-left text-xl font-medium text-white whitespace-nowrap">
                  Phone
                </th>
                <th className="py-3 px-4 text-left text-xl font-medium text-white whitespace-nowrap">
                  Email
                </th>
                <th className="py-3 px-4 text-left text-xl font-medium text-white whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className=" bg-primary ">
              {potentialProviders.map((p, i) => (
                <tr key={i} className="">
                  <td className="py-3 px-4 text-lg font-medium text-gray-100 whitespace-nowrap">
                    {p.name}
                  </td>
                  <td className="py-3 px-4 text-lg text-gray-100 whitespace-nowrap">
                    {p.appliedFor}
                  </td>
                  <td className="py-3 px-4 text-lg text-gray-100 whitespace-nowrap">
                    {p.experience}
                  </td>
                  <td className="py-3 px-4 text-lg text-gray-100 max-w-xs truncate">
                    {p.location}
                  </td>
                  <td className="py-3 px-4 text-lg text-gray-100 whitespace-nowrap">
                    {p.phone}
                  </td>
                  <td className="py-3 px-4 text-lg text-gray-100 truncate max-w-xs">
                    {p.email}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <StatusBadge status={p.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviders;
