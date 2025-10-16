import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
const Support = () => {
  const employees = [
    {
      name: "Shade Musab",
      role: "Junior Employee",
      hired: "22/02/25",
      department: "Customer care service",
      email: "shademusad78@gmail.com",
      phone: "+234-80945673",
    },
    {
      name: "Shade Musab",
      role: "Junior Employee",
      hired: "22/02/25",
      department: "Customer care service",
      email: "shademusad78@gmail.com",
      phone: "+234-80945673",
    },
  ];

  const requests = [
    {
      name: "Tobi Ipeyenuqa",
      service: "Personal Assistant",
      id: "RP-9001245",
    },
    {
      name: "Tobi Ipeyenuqa",
      service: "Personal Assistant",
      id: "RP-9001245",
    },
    {
      name: "Tobi Ipeyenuqa",
      service: "Personal Assistant",
      id: "RP-9001245",
    },
    {
      name: "Tobi Ipeyenuqa",
      service: "Personal Assistant",
      id: "RP-9001245",
    },
    {
      name: "Tobi Ipeyenuqa",
      service: "Personal Assistant",
      id: "RP-9001245",
    },
  ];

  const messages = [
    {
      sender: "You",
      text: "Rose, can you see to it that the person that went to observe is back so that I can assign a service provider.",
      time: "Monday 11:20",
      self: true,
    },
    {
      sender: "Shade Musab",
      text: "And, why can’t you do it yourself? Rose has not responded in a while; would you keep the customer waiting?",
      time: "Monday 10:54",
    },
    {
      sender: "Rose Chukwu",
      text: "Sorry, I have diarrhea as a result of food poisoning. Had to rush to the pharmacy.",
      time: "Monday 11:54",
    },
    {
      sender: "You",
      text: "You could not inform anyone before rushing off. You know that’s bad. That will be dealt with later. This complaint on unsuccessful payment… see to it that it is resolved as soon as possible.",
      time: "Monday 11:56",
      self: true,
    },
    {
      sender: "Rose Chukwu",
      text: "Sorry, I have diarrhea as a result of food poisoning. Had to rush to the pharmacy.",
      time: "Monday 11:54",
    },

  ];

  return (
    <div className="w-full  p-6">
      {/* Adjusted grid width ratio */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
        {/* LEFT COLUMN - Employees Detail */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 text-lg mb-2">
            Employees detail
          </h3>
          <div className="flex flex-wrap gap-4 ">
            {employees.map((emp, idx) => (
              <div
                key={idx}
                className={`bg-customer border ${
                  idx === 0 ? "border-gray-100" : "border-gray-200"
                } rounded-lg shadow-sm p-4 flex flex-col gap-2 w-full sm:w-[48%]`}
              >
                <div className="flex  flex-col  gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-400"></div>
                  <div>
                    <p className="font-bold text-lg text-gray-800">
                      {emp.name}
                    </p>
                    <div className="flex items-center justify-between ">
                      <p className="text-lg text-gray-600">{emp.role}</p>
                      <span className="text-md text-gray-400">
                        Hired: {emp.hired}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-lg text-gray-700">
                  <p className="font-semibold">Department: {emp.department}</p>
                  <p>
                    <MdOutlineEmail className="inline mr-2 mb-1 text-2xl" />
                    {emp.email}
                  </p>
                  <p>
                    <IoCallOutline className="inline mr-2 mb-1 text-2xl" />
                    {emp.phone}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border border-gray-200 rounded-lg shadow-sm ">
            <h3 className="font-semibold text-gray-700 text-xl mb-2 py-4 px-3">
              Professional and other Order Request
            </h3>
            <div className=" overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#E5F3EC] border-t  border-gray-300 pb-2">
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
                  {requests.map((req, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 text-lg">{req.name}</td>
                      <td className="py-3 px-4 text-lg">{req.service}</td>
                      <td className="py-3 px-4 text-lg">{req.id}</td>
                      <td className="py-3 px-4 flex items-center gap-2">
                        <select className="border border-gray-300 rounded-md px-2 py-1 text-md">
                          <option>Service</option>
                          <option>Pending</option>
                          <option>Approved</option>
                        </select>
                        <button className="border border-[#0a5f45]-300 text-primary bg-gray-100 px-3 py-1 rounded-md text-md  font-semibold transition">
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Chat Section */}
        <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-[#0D7957] text-white px-5 py-3 ">
            <h3 className="font-semibold text-lg text-gray-200">
              Customer Service Team
            </h3>
            <p className="text-sm text-gray-300">
              Sharon, Shade, John, Roselyn
            </p>
          </div>

          {/* CHAT BODY */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[500px]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
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
                    {msg.text}
                  </p>
                  <p className="text-md font-medium text-gray-500 mt-1">
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CHAT INPUT */}
          <div className="flex items-center border-t border-gray-200 p-3">
            <input
              type="text"
              placeholder="Message"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0D7957]"
            />
            <button className="ml-2 bg-[#0D7957] text-white px-5 py-2 rounded-md hover:bg-[#0a5f45]">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
