import React from "react";

export default function SupportPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Runpro9ja Support</h1>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Welcome to the Runpro9ja support page. Our goal is to ensure seamless communication between customers and agents.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-6">About Runpro9ja</h2>
        <p className="text-gray-700 mt-2 mb-6 leading-relaxed">
          Runpro9ja is a delivery and service request platform where customers can create orders and agents can accept and fulfill them.
          Our mission is to make local service delivery fast, reliable, and secure.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-6">Need Help?</h2>
        <p className="text-gray-700 mt-2 mb-6 leading-relaxed">
          If you are experiencing issues, have questions, or need assistance, feel free to reach out.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
          <p className="text-gray-800 font-medium">Support Email:</p>
          <a href="mailto:runpro9ja@gmail.com" className="text-blue-600 underline">runpro9ja@gmail.com</a>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          We usually respond within 24 hours.
        </p>
      </div>
    </div>
  );
}
