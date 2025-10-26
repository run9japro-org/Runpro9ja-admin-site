import React, { useState } from "react";

const DeleteAccountPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    reason: "",
    message: "",
    confirmDeletion: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.confirmDeletion) {
      alert("Please confirm that you understand this action is permanent.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Deletion request:', formData);
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting deletion request:', error);
      alert('There was an error submitting your request. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Request Received</h2>
            <p className="text-gray-600 mb-6">
              We've received your account deletion request. Our team will verify and process your request within 30 days.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-left">
              <p className="text-sm text-blue-800">
                <strong>What happens next:</strong><br/>
                • You'll receive a confirmation email within 24 hours<br/>
                • Your account will be deactivated immediately<br/>
                • All personal data will be permanently deleted within 30 days<br/>
                • You may receive a follow-up call for verification
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Delete Your Account and Data</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're sorry to see you go. This page allows you to request permanent deletion of your RunPro 9ja account and associated personal data.
          </p>
        </div>

        {/* Warning Alert */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-r-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-red-800">Important: This action is permanent</h3>
              <div className="mt-2 text-red-700 text-sm">
                <p className="font-semibold">Once your account is deleted:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>All your personal data will be permanently removed</li>
                  <li>You will lose access to your service history and records</li>
                  <li>Any ongoing orders will be cancelled</li>
                  <li>This action cannot be undone</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Request Account Deletion</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-blue-800 text-sm">
                <strong>Alternative Method:</strong> You can also email us directly at{" "}
                <a 
                  href="mailto:privacy@runpro9ja.com" 
                  className="text-blue-700 underline font-medium"
                >
                  privacy@runpro9ja.com
                </a>{" "}
                with the subject "Account Deletion Request".
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Deletion Process Timeline</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">1</div>
                  <span>Submit request and receive confirmation email</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">2</div>
                  <span>Account deactivated immediately upon verification</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">3</div>
                  <span>All personal data permanently deleted within 30 days</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">4</div>
                  <span>Non-personal logs retained for up to 90 days for legal/security purposes</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Account Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter the email associated with your account"
                />
              </div>

              {/* Reason for Leaving */}
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Leaving (Optional)
                </label>
                <select
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select a reason...</option>
                  <option value="privacy-concerns">Privacy concerns</option>
                  <option value="found-alternative">Found an alternative service</option>
                  <option value="not-using">Not using the service anymore</option>
                  <option value="technical-issues">Technical issues</option>
                  <option value="customer-service">Customer service experience</option>
                  <option value="other">Other reason</option>
                </select>
              </div>

              {/* Additional Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Information (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Any additional information you'd like to share..."
                />
              </div>

              {/* Confirmation Checkbox */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <input
                    id="confirmDeletion"
                    name="confirmDeletion"
                    type="checkbox"
                    required
                    checked={formData.confirmDeletion}
                    onChange={handleChange}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="confirmDeletion" className="ml-3 block text-sm text-red-800">
                    <span className="font-semibold">I understand that this action is permanent and cannot be undone.</span><br/>
                    I confirm that I want to permanently delete my RunPro 9ja account and all associated personal data. 
                    I understand that some non-personal logs may be retained for legal or security reasons for up to 90 days.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.confirmDeletion}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Request...
                    </>
                  ) : (
                    "Permanently Delete My Account and Data"
                  )}
                </button>
              </div>

              {/* Help Text */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Need help or have questions? Contact our support team at{" "}
                  <a href="mailto:support@runpro9ja.com" className="text-green-600 hover:text-green-700 underline">
                    support@runpro9ja.com
                  </a>
                </p>
              </div>
            </form>
          </div>

          {/* Data Retention Notice */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Data Retention Notice</h4>
            <p className="text-xs text-gray-600">
              After account deletion, we may retain certain non-personal information in aggregated or anonymized form 
              for analytics, and may keep limited log data for security and legal compliance purposes for up to 90 days. 
              This retained data cannot be used to identify you personally.
            </p>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">How long does the deletion process take?</h4>
              <p className="text-sm text-gray-600 mt-1">
                Personal data is permanently deleted within 30 days of verification. Some non-personal logs may be retained for up to 90 days for legal and security purposes.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Can I recover my account after deletion?</h4>
              <p className="text-sm text-gray-600 mt-1">
                No, account deletion is permanent and cannot be reversed. You would need to create a new account if you wish to use our services again.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">What data is deleted?</h4>
              <p className="text-sm text-gray-600 mt-1">
                All personal data including profile information, contact details, service history, messages, and preferences are permanently deleted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountPage;