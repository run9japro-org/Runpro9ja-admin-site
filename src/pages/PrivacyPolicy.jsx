import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-6 md:p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="mb-4">
        Your privacy is important to us. This Privacy Policy explains how we collect, use, and
        protect your personal information when you use our platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <p>
        We may collect personal information such as your name, email address, and usage data to
        improve our services and provide support.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data Usage</h2>
      <p>
        We use collected data to operate and maintain our services, communicate with users, and
        improve user experience.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Security</h2>
      <p>
        We implement reasonable security measures to protect your personal information. However,
        no method of transmission over the Internet is 100% secure.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Changes</h2>
      <p>
        We may update this Privacy Policy from time to time. Please review this page periodically
        for any changes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p>
        If you have any questions or concerns, please contact us at{" "}
        <a href="mailto:yourcompany@email.com" className="text-blue-600 underline">
          yourcompany@email.com
        </a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
