import React, { useState } from "react";
import {
  FaArrowUp,
  FaArrowDown,

} from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { RiArrowRightDownFill } from "react-icons/ri";
import icon from "../assets/icons/arrow-growth.png";
const Payments = () => {
  const [activeTab, setActiveTab] = useState("inflow");

  const inflowData = [
    {
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

  const outflowData = [
    {
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

  return (
    <div className=" min-h-screen p-4 sm:p-6">
      {/* HEADER CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Card 1 */}
        <div className="bg-primary flex justify-between  flex-col text-white rounded-xl p-5 shadow-md relative overflow-hidden">
          <div className="flex justify-between items-center">
            <p className="text-lg  flex items-center gap-1">
              Account Balance ₦
            </p>
            <HiOutlineInformationCircle size={16} className="opacity-80" />
          </div>
          <h2 className="text-3xl  flex align-center gap-2 mt-2">
            <span>
              <img src={icon} alt="" />
            </span>
            3,987,550.00
          </h2>
          <div className="mt-4 flex justify-end gap-8 text-lg font-medium">
            <span className="text-yellow-400 border border-yellow-400 px-3 py-1 rounded-full flex items-center gap-1">
              <FaArrowUp /> 23.4%
            </span>
            <span className="text-yellow-400 border border-yellow-400 px-3 py-1 rounded-full">
              +123 users
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-primary flex justify-between  flex-col text-white rounded-xl p-5 shadow-md relative overflow-hidden">
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium flex items-center gap-1">
              Monthly Transaction ₦
            </p>
            <HiOutlineInformationCircle size={16} className="opacity-80" />
          </div>
          <h2 className="text-3xl  flex align-center gap-2 mt-2">
            <span>
              <img src={icon} alt="" />
            </span>
            1,987,550.00
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

        {/* Card 3 */}
        <div className="bg-primary flex justify-between  flex-col text-white rounded-xl p-5 shadow-md relative overflow-hidden">
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium flex items-center gap-1">
              Daily Transaction ₦
            </p>
            <HiOutlineInformationCircle size={16} className="opacity-80" />
          </div>
          <h2 className="text-3xl  mt-2 flex align-center gap-2">
            <span>
              <RiArrowRightDownFill className="text-red-600 h-8 w-8" />
            </span>
            800,000.00
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
            <span className="bg-primary text-white   text-center rounded-xl">
              Daily
            </span>
            <span className="rounded-xl text-center border border-gray-500">
              Monthly
            </span>
            <span className=" border border-gray-500 rounded-xl text-center">
              Yearly
            </span>
          </div>

          <div className="space-y-2 text-gray-800 text-lg">
            <div className="flex gap-4">
              <div className="flex gap-2 ">
                <span>In:</span>
                <span className="font-semibold text-gray-900">₦800,908</span>
              </div>
              <div className="flex gap-2">
                <span>Out:</span>
                <span className="font-semibold text-gray-900">₦200,908</span>
              </div>
            </div>
          </div>

          <hr className="my-3 border-gray-200" />

          <div className="text-gray-800 text-lg space-y-2">
            <div className="flex justify-between">
              <span>Successful Transactions</span>
              <span className="font-semibold ">162</span>
            </div>
            <div className="flex justify-between">
              <span>Failed Transactions</span>
              <span className="font-semibold ">5</span>
            </div>
            <div className="flex justify-between">
              <span>Refunds</span>
              <span className="font-semibold">2</span>
            </div>
          </div>

          <hr className="my-3 border-gray-200" />

          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-green-600 ">
              Total Transactions
            </span>
            <span className="text-lg font-bold text-green-600">169</span>
          </div>
        </div>
      </div>

      {/* TOGGLE TABS */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab("inflow")}
          className={`w-1/2 p-3 font-semibold border rounded-xl  text-lg transition-colors ${
            activeTab === "inflow"
              ? "bg-primary text-white border-primary"
              : "bg-transparent text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          Cash Inflow
        </button>
        <button
          onClick={() => setActiveTab("outflow")}
          className={`w-1/2 p-3 font-semibold border rounded-xl text-lg transition-colors ${
            activeTab === "outflow"
              ? "bg-primary text-white border-primary"
              : "bg-transparent text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          Cash Outflow
        </button>
      </div>

      {/* TABLE SECTION */}
      <div className="  border border-gray-200 rounded-xl overflow-x-auto">
        {activeTab === "inflow" ? (
          <table className="min-w-full text-sm text-left">
            <thead className=" border-b ">
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
              {inflowData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="text-lg font-semibold py-3 px-4 text-gray-900">
                    {item.name}
                  </td>
                  <td className="text-lg font-semibold py-3 px-4 text-gray-900">
                    {item.orderId}
                  </td>
                  <td className="text-lg font-semibold py-3 px-4 text-gray-900">
                    {item.address}
                  </td>
                  <td className="text-lg font-semibold py-3 px-4 text-gray-900">
                    {item.service}
                  </td>
                  <td className="text-lg font-semibold py-3 px-4 text-gray-900">
                    {item.hours}
                  </td>
                  <td className="text-lg font-semibold py-3 px-4 text-gray-900">
                    {item.date}
                  </td>
                  <td className="text-lg font-semibold py-3 px-4 text-gray-900">
                    {item.amount}
                  </td>
                  <td className="text-lg font-semibold py-3 px-4 text-gray-900">
                    {item.type}
                  </td>
                  <td className="text-lg font-semibold py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        item.status === "Successful"
                          ? "bg-green-600 text-green-100"
                          : "bg-yellow-400 text-gray-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full text-sm text-left">
            <thead className=" border-b">
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
              {outflowData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="text-lg py-2 font-semibold px-4 text-gray-900">
                    {item.provider}
                  </td>
                  <td className="text-lg py-2 font-semibold px-4 text-gray-900">
                    {item.serviceId}
                  </td>
                  <td className="text-lg py-2 font-semibold px-4 text-gray-900">
                    {item.address}
                  </td>
                  <td className="text-lg py-2 font-semibold px-4 text-gray-900">
                    {item.service}
                  </td>
                  <td className="text-lg py-2 font-semibold px-4 text-gray-900">
                    {item.hours}
                  </td>
                  <td className="text-lg py-2 font-semibold px-4 text-gray-900">
                    {item.date}
                  </td>
                  <td className="text-lg py-2 font-semibold px-4 text-gray-900">
                    {item.amount}
                  </td>
                  <td className="text-lg py-2 font-semibold px-4">
                    <span
                      className={`px-3 text-sm py-1 rounded-full  font-semibold ${
                        item.status === "Successful"
                          ? "bg-green-600 text-green-100"
                          : "bg-yellow-400 text-gray-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Payments;
