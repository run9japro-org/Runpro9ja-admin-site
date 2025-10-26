import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-blue-800">
              Your privacy is important to us. This Privacy Policy explains how RunPro 9ja collects, 
              uses, discloses, and safeguards your information when you use our mobile application and services.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">Personal Information</h3>
            <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
              <li><strong>Account Information:</strong> Name, email address, phone number, profile picture</li>
              <li><strong>Contact Information:</strong> Address, location data for service delivery</li>
              <li><strong>Payment Information:</strong> Payment method details (securely processed through our payment partners)</li>
              <li><strong>Identity Verification:</strong> Government-issued ID (for professional service providers)</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">Service Information</h3>
            <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
              <li><strong>Service Requests:</strong> Service details, location, timing, and specific requirements</li>
              <li><strong>Communication Data:</strong> Messages between customers and service providers</li>
              <li><strong>Transaction History:</strong> Order details, payment history, service ratings</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">Technical Information</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Device Information:</strong> Device type, operating system, unique device identifiers</li>
              <li><strong>Usage Data:</strong> App usage patterns, features accessed, session duration</li>
              <li><strong>Location Data:</strong> GPS data for service matching and delivery tracking</li>
              <li><strong>Biometric Data:</strong> Optional fingerprint or facial recognition for app authentication</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Provide, maintain, and improve our services</li>
              <li>Match customers with appropriate service providers</li>
              <li>Process payments and prevent fraud</li>
              <li>Communicate about services, orders, and promotions</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Ensure safety and security of our platform</li>
              <li>Personalize user experience and recommendations</li>
              <li>Comply with legal obligations and enforce our terms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Service Providers:</strong> With verified agents and professionals to fulfill your service requests</li>
              <li><strong>Payment Processors:</strong> With secure payment providers to process transactions</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or business transfers</li>
              <li><strong>With Your Consent:</strong> When you explicitly agree to share specific information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement comprehensive security measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Secure authentication and access controls</li>
              <li>Regular security assessments and monitoring</li>
              <li>Secure payment processing through certified providers</li>
              <li>Limited access to personal information on a need-to-know basis</li>
            </ul>
            <p className="text-gray-700 mt-4">
              While we implement robust security measures, no method of transmission over the Internet 
              or electronic storage is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights and Choices</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Access and Update:</strong> View and update your personal information in the app</li>
              <li><strong>Data Portability:</strong> Request a copy of your personal data</li>
              <li><strong>Account Deletion:</strong> Request deletion of your account and personal data</li>
              <li><strong>Communication Preferences:</strong> Opt-out of marketing communications</li>
              <li><strong>Location Services:</strong> Control location sharing through device settings</li>
              <li><strong>Biometric Data:</strong> Enable or disable biometric authentication in app settings</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Retention</h2>
            <p className="text-gray-700">
              We retain your personal information for as long as necessary to fulfill the purposes 
              outlined in this policy, unless a longer retention period is required or permitted by law. 
              Transaction data is typically retained for 5 years for legal and accounting purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Third-Party Services</h2>
            <p className="text-gray-700 mb-4">
              Our app may contain links to third-party websites or services. This Privacy Policy 
              does not apply to third-party services, and we are not responsible for their privacy practices.
            </p>
            <p className="text-gray-700">
              We use the following types of third-party services:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
              <li>Payment processors (Stripe, PayPal, etc.)</li>
              <li>Cloud storage and hosting providers</li>
              <li>Analytics and monitoring services</li>
              <li>Communication and notification services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
            <p className="text-gray-700">
              Our services are not intended for individuals under the age of 18. We do not knowingly 
              collect personal information from children. If you believe we have collected information 
              from a child, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. International Data Transfers</h2>
            <p className="text-gray-700">
              Your information may be transferred to and processed in countries other than your 
              country of residence. We ensure appropriate safeguards are in place to protect your 
              data in accordance with this Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new policy on this page and updating the "Last updated" date.
            </p>
            <p className="text-gray-700">
              Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or 
              your personal information, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong>{" "}
                <a 
                  href="mailto:privacy@runpro9ja.com" 
                  className="text-green-600 hover:text-green-700 underline"
                >
                  privacy@runpro9ja.com
                </a>
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Address:</strong> RunPro 9ja, 123 Service Lane, Lagos, Nigeria
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Phone:</strong> +234 800 RUNPRO9
              </p>
            </div>
          </section>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-8">
            <p className="text-yellow-800">
              <strong>Note:</strong> By using RunPro 9ja services, you acknowledge that you have 
              read and understood this Privacy Policy and agree to the collection, use, and 
              disclosure of your information as described herein.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;