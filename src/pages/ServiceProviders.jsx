import React, { useState, useEffect } from "react";
import { getServiceProviders, getPotentialProviders } from "../services/adminService";
import { Check, X, MoreVertical, Eye, UserCheck, UserX, Mail, Phone, Loader, MapPin, Calendar, Briefcase, FileText, Star, Clock, Shield } from "lucide-react";

const ServiceProviders = () => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [potentialProviders, setPotentialProviders] = useState([]);
  const [loadingProviders, setLoadingProviders] = useState(true);
  const [loadingPotential, setLoadingPotential] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [verificationNotes, setVerificationNotes] = useState('');
  const [processingVerification, setProcessingVerification] = useState(false);
  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'potential'

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch service providers
        const providersResponse = await getServiceProviders(50, filterStatus);
        console.log("Service providers response:", providersResponse);
        
        if (providersResponse && providersResponse.success) {
          setServiceProviders(providersResponse.serviceProviders || []);
        } else {
          setServiceProviders(getSampleServiceProviders());
        }

        // Fetch potential providers
        const potentialResponse = await getPotentialProviders(20);
        console.log("Potential providers response:", potentialResponse);
        
        if (potentialResponse && potentialResponse.success) {
          setPotentialProviders(potentialResponse.potentialProviders || []);
        } else {
          setPotentialProviders(getSamplePotentialProviders());
        }

      } catch (err) {
        console.error("Error fetching providers data:", err);
        setError("Failed to load providers data");
        setServiceProviders(getSampleServiceProviders());
        setPotentialProviders(getSamplePotentialProviders());
      } finally {
        setLoadingProviders(false);
        setLoadingPotential(false);
      }
    };

    fetchData();
  }, [filterStatus]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveMenu(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // API call to verify agent
  const verifyAgent = async (agentId, status, notes = '') => {
    try {
      setProcessingVerification(true);
      const token = localStorage.getItem("token");
      const API_URL = "https://runpro9ja-pxqoa.ondigitalocean.app/api";
      
      const response = await fetch(`${API_URL}/admin/agents/${agentId}/verify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: status,
          notes: notes
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }

      return data;
    } catch (error) {
      console.error('Verification error:', error);
      throw error;
    } finally {
      setProcessingVerification(false);
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      const statusStr = String(status || '').toLowerCase();
      switch (statusStr) {
        case "active":
        case "verified":
          return "text-green-700 bg-green-50 border border-green-200";
        case "waitlisted":
        case "pending":
          return "text-yellow-600 bg-yellow-50 border border-yellow-200";
        case "reviewing":
          return "text-blue-600 bg-blue-50 border border-blue-200";
        case "cancelled":
        case "rejected":
        case "inactive":
          return "text-red-600 bg-red-50 border border-red-200";
        default:
          return "text-gray-600 bg-gray-50 border border-gray-200";
      }
    };

    const formatStatus = (status) => {
      const statusStr = String(status || '');
      const statusMap = {
        'verified': 'Verified',
        'active': 'Active',
        'pending': 'Pending',
        'reviewing': 'Reviewing',
        'waitlisted': 'Waitlisted',
        'rejected': 'Rejected',
        'inactive': 'Inactive'
      };
      
      return statusMap[statusStr.toLowerCase()] || statusStr || 'Unknown';
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}
      >
        {formatStatus(status)}
      </span>
    );
  };

  // Provider Details Modal
  const ProviderDetailsModal = ({ provider, onClose }) => {
    if (!provider) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold">
                  {safeString(provider.name?.charAt(0), 'U')}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {safeString(provider.name, 'Unknown Provider')}
                  </h3>
                  <p className="text-gray-600 mt-1">{safeString(provider.appliedFor, 'Service Provider')}</p>
                  <div className="mt-2">
                    <StatusBadge status={provider.status} />
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Basic Information */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-gray-400" />
                    Contact Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Email</span>
                      <span className="font-medium text-gray-900">
                        {safeString(provider.email, 'Not provided')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Phone</span>
                      <span className="font-medium text-gray-900">
                        {safeString(provider.phone, 'Not provided')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-600">Location</span>
                      <span className="font-medium text-gray-900 text-right">
                        {safeString(provider.location, 'Location not specified')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Experience & Qualifications */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-gray-400" />
                    Professional Details
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Service</span>
                      <span className="font-medium text-gray-900">
                        {safeString(provider.appliedFor, 'Not specified')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Experience</span>
                      <span className="font-medium text-gray-900">
                        {safeString(provider.experience, 'Not specified')}
                      </span>
                    </div>
                    {provider.workRate !== undefined && (
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-600">Work Rate</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-green-500"
                              style={{ width: `${safeNumber(provider.workRate, 0)}%` }}
                            ></div>
                          </div>
                          <span className="font-medium text-gray-900 text-sm">
                            {safeNumber(provider.workRate, 0)}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-gray-400" />
                    Additional Information
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {provider.additionalInfo || "No additional information provided by the applicant."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Actions & Timeline */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-gray-400" />
                    Management Actions
                  </h4>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        setSelectedProvider(provider);
                        setShowVerificationModal(true);
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      <UserCheck className="w-5 h-5" />
                      <span>Verify Provider</span>
                    </button>
                    <button
                      onClick={async () => {
                        if (window.confirm(`Are you sure you want to reject ${provider.name}'s application?`)) {
                          try {
                            const result = await verifyAgent(provider.id, 'rejected');
                            alert(`Provider ${provider.name} has been rejected.`);
                            setPotentialProviders(prev => 
                              prev.map(p => 
                                p.id === provider.id ? { ...p, status: 'rejected' } : p
                              )
                            );
                            setShowDetailsModal(false);
                          } catch (error) {
                            alert(`Failed to reject provider: ${error.message}`);
                          }
                        }
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      <UserX className="w-5 h-5" />
                      <span>Reject Application</span>
                    </button>
                    <button
                      onClick={() => {
                        // Add to waitlist logic
                        alert(`${provider.name} added to waitlist`);
                        setShowDetailsModal(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
                    >
                      <Clock className="w-5 h-5" />
                      <span>Add to Waitlist</span>
                    </button>
                  </div>
                </div>

                {/* Application Timeline */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                    Application Timeline
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Application Received</span>
                      <span className="font-medium text-gray-900 text-sm">
                        {provider.applicationDate || '2 days ago'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Last Updated</span>
                      <span className="font-medium text-gray-900 text-sm">
                        {provider.lastUpdated || 'Today'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">Status</span>
                      <StatusBadge status={provider.status} />
                    </div>
                  </div>
                </div>

                {/* Provider Rating (for active providers) */}
                {provider.rating && (
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-yellow-400" />
                      Customer Rating
                    </h4>
                    <div className="flex items-center justify-center">
                      <div className="text-3xl font-bold text-gray-900">{provider.rating}</div>
                      <div className="ml-2">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= Math.floor(provider.rating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {provider.reviewCount || 0} reviews
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Verification Modal
  const VerificationModal = ({ provider, onClose, onVerify, onReject }) => {
    if (!provider) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Verify Service Provider
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                disabled={processingVerification}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Provider Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <p className="text-lg font-semibold text-gray-900">{provider.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Applied For
                  </label>
                  <p className="text-sm text-gray-900">{provider.appliedFor}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience
                  </label>
                  <p className="text-sm text-gray-900">{provider.experience}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <p className="text-sm text-gray-900">{provider.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <p className="text-sm text-gray-900">{provider.phone}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <p className="text-sm text-gray-900">{provider.location}</p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Information
              </label>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  {provider.additionalInfo || "No additional information provided."}
                </p>
              </div>
            </div>

            {/* Verification Notes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Notes
              </label>
              <textarea
                placeholder="Add notes about this verification..."
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                rows="3"
                value={verificationNotes}
                onChange={(e) => setVerificationNotes(e.target.value)}
                disabled={processingVerification}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                disabled={processingVerification}
              >
                Cancel
              </button>
              <button
                onClick={() => onReject(provider)}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
                disabled={processingVerification}
              >
                {processingVerification ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <UserX className="w-4 h-4" />
                )}
                <span>Reject</span>
              </button>
              <button
                onClick={() => onVerify(provider)}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                disabled={processingVerification}
              >
                {processingVerification ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <UserCheck className="w-4 h-4" />
                )}
                <span>Verify Provider</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Action Menu for Potential Providers
  const ActionMenu = ({ provider, onVerify, onReject, onViewDetails }) => {
    const handleMenuClick = (e) => {
      e.stopPropagation();
      setActiveMenu(activeMenu === provider.id ? null : provider.id);
    };

    const handleVerify = (e) => {
      e.stopPropagation();
      onVerify(provider);
      setActiveMenu(null);
    };

    const handleReject = (e) => {
      e.stopPropagation();
      onReject(provider);
      setActiveMenu(null);
    };

    const handleViewDetails = (e) => {
      e.stopPropagation();
      onViewDetails(provider);
      setActiveMenu(null);
    };

    return (
      <div className="relative">
        <button
          onClick={handleMenuClick}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <MoreVertical className="w-4 h-4 text-gray-500" />
        </button>

        {activeMenu === provider.id && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            <div className="py-1">
              <button
                onClick={handleViewDetails}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </button>
              <button
                onClick={handleVerify}
                className="flex items-center w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50 transition-colors"
              >
                <UserCheck className="w-4 h-4 mr-2" />
                Verify Provider
              </button>
              <button
                onClick={handleReject}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <UserX className="w-4 h-4 mr-2" />
                Reject Application
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Handler functions
  const handleVerifyProvider = async (provider) => {
    try {
      console.log("Verifying provider:", provider);
      
      const result = await verifyAgent(provider.id, 'verified', verificationNotes);
      
      alert(`Provider ${provider.name} has been verified successfully!`);
      
      // Update the provider status in the state
      setPotentialProviders(prev => 
        prev.map(p => 
          p.id === provider.id ? { ...p, status: 'verified' } : p
        )
      );
      
      // Also add to service providers if needed
      setServiceProviders(prev => [...prev, {
        ...provider,
        status: 'active',
        workRate: 0,
        agentId: `SP${Date.now()}`
      }]);
      
      setShowVerificationModal(false);
      setVerificationNotes('');
    } catch (error) {
      alert(`Failed to verify provider: ${error.message}`);
    }
  };

  const handleRejectProvider = async (provider) => {
    try {
      console.log("Rejecting provider:", provider);
      
      if (window.confirm(`Are you sure you want to reject ${provider.name}'s application?`)) {
        const result = await verifyAgent(provider.id, 'rejected', verificationNotes);
        
        alert(`Provider ${provider.name} has been rejected.`);
        
        setPotentialProviders(prev => 
          prev.map(p => 
            p.id === provider.id ? { ...p, status: 'rejected' } : p
          )
        );
        
        setShowVerificationModal(false);
        setVerificationNotes('');
      }
    } catch (error) {
      alert(`Failed to reject provider: ${error.message}`);
    }
  };

  const handleViewProviderDetails = (provider) => {
    setSelectedProvider(provider);
    setShowDetailsModal(true);
  };

  const handleTableRowClick = (provider) => {
    setSelectedProvider(provider);
    setShowDetailsModal(true);
  };

  // Quick action buttons for table rows
  const QuickActionButtons = ({ provider }) => (
    <div className="flex space-x-1">
      <button
        onClick={async (e) => {
          e.stopPropagation();
          try {
            const result = await verifyAgent(provider.id, 'verified');
            alert(`Provider ${provider.name} has been verified!`);
            setPotentialProviders(prev => 
              prev.map(p => 
                p.id === provider.id ? { ...p, status: 'verified' } : p
              )
            );
          } catch (error) {
            alert(`Failed to verify provider: ${error.message}`);
          }
        }}
        className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
        title="Verify Provider"
        disabled={processingVerification}
      >
        {processingVerification ? <Loader className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
      </button>
      <button
        onClick={async (e) => {
          e.stopPropagation();
          if (window.confirm(`Reject ${provider.name}'s application?`)) {
            try {
              const result = await verifyAgent(provider.id, 'rejected');
              alert(`Provider ${provider.name} has been rejected.`);
              setPotentialProviders(prev => 
                prev.map(p => 
                  p.id === provider.id ? { ...p, status: 'rejected' } : p
                )
              );
            } catch (error) {
              alert(`Failed to reject provider: ${error.message}`);
            }
          }
        }}
        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
        title="Reject Provider"
        disabled={processingVerification}
      >
        {processingVerification ? <Loader className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
      </button>
    </div>
  );

  // Safe data access helper functions
  const safeString = (value, fallback = 'N/A') => {
    if (value === null || value === undefined || value === '') return fallback;
    if (typeof value === 'object') return fallback;
    return String(value);
  };

  const safeNumber = (value, fallback = 0) => {
    if (value === null || value === undefined) return fallback;
    const num = Number(value);
    return isNaN(num) ? fallback : num;
  };

  // Sample data fallback
  const getSampleServiceProviders = () => {
    return [
      {
        id: "890221",
        agentId: "SP890221",
        name: "Oladejo Nehemiah",
        service: "Plumber",
        status: "Active",
        workRate: 89,
        location: "No 16, Complex 2, Tejuosho Market, Yaba, Lagos",
        email: "oladejo.nehemiah@email.com",
        phone: "+234-8012345678",
        rating: 4.8,
        reviewCount: 127
      },
      {
        id: "890222",
        agentId: "SP890222",
        name: "Adebola Johnson",
        service: "Electrician",
        status: "Active",
        workRate: 92,
        location: "25, Allen Avenue, Ikeja, Lagos",
        email: "adebola.johnson@email.com",
        phone: "+234-8023456789",
        rating: 4.9,
        reviewCount: 89
      },
      {
        id: "890223",
        agentId: "SP890223",
        name: "Chinedu Okoro",
        service: "Cleaner",
        status: "Active",
        workRate: 78,
        location: "14, Awolowo Road, Ikoyi, Lagos",
        email: "chinedu.okoro@email.com",
        phone: "+234-8034567890",
        rating: 4.6,
        reviewCount: 203
      },
    ];
  };

  const getSamplePotentialProviders = () => {
    return [
      {
        id: "P001",
        name: "Ajayi Suleiman",
        appliedFor: "Mechanic",
        experience: "6 years",
        location: "Idi-araba Arepo",
        phone: "+234-569800345",
        email: "suleyi890@gmail.com",
        status: "Waitlisted",
        additionalInfo: "Has own tools and workshop. Specializes in Japanese cars. Certified mechanic with experience in both petrol and diesel engines.",
        applicationDate: "3 days ago",
        lastUpdated: "Today"
      },
      {
        id: "P002",
        name: "Fatima Bello",
        appliedFor: "Beautician",
        experience: "4 years",
        location: "Victoria Island, Lagos",
        phone: "+234-701234567",
        email: "fatima.bello@email.com",
        status: "Reviewing",
        additionalInfo: "Certified beautician with salon experience. Specializes in bridal makeup, gele tying, and professional skincare. Trained at L'oreal Academy.",
        applicationDate: "5 days ago",
        lastUpdated: "Yesterday"
      },
      {
        id: "P003",
        name: "Musa Abdullahi",
        appliedFor: "Driver",
        experience: "8 years",
        location: "Agege, Lagos",
        phone: "+234-812345678",
        email: "musa.abdullahi@email.com",
        status: "Pending",
        additionalInfo: "Professional driver with clean record. Familiar with Lagos routes. Has valid driver's license and LASDRI card. Owns a well-maintained vehicle.",
        applicationDate: "1 day ago",
        lastUpdated: "Today"
      },
    ];
  };

  // Loading skeleton for table rows
  const TableRowSkeleton = ({ columns }) => {
    return (
      <tr>
        {Array.from({ length: columns }).map((_, index) => (
          <td key={index} className="py-3 px-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </td>
        ))}
      </tr>
    );
  };

  // Safe length access
  const serviceProvidersLength = Array.isArray(serviceProviders) ? serviceProviders.length : 0;
  const potentialProvidersLength = Array.isArray(potentialProviders) ? potentialProviders.length : 0;

  return (
    <div className="w-full mx-auto p-4 md:p-6 space-y-8">
      {error && (
        <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 text-orange-700">
          {error} - Showing sample data
        </div>
      )}

      {/* Header with Tabs */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Service Providers Management</h1>
            <p className="text-gray-600 mt-1">Manage active providers and review new applications</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'active'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Active Providers ({serviceProvidersLength})
              </button>
              <button
                onClick={() => setActiveTab('potential')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'potential'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Applications ({potentialProvidersLength})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICE PROVIDERS TABLE */}
      {activeTab === 'active' && (
        <div className="overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
              Active Service Providers ({serviceProvidersLength})
            </h3>
            <div className="flex items-center space-x-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-xl">
            <table className="w-full min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-800 whitespace-nowrap">
                    ID
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-800 whitespace-nowrap">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-800 whitespace-nowrap">
                    Service
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-800 whitespace-nowrap">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-800 whitespace-nowrap">
                    Work Rate
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-800 whitespace-nowrap">
                    Location
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loadingProviders ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRowSkeleton key={index} columns={6} />
                  ))
                ) : serviceProvidersLength > 0 ? (
                  serviceProviders.map((provider, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                      onClick={() => handleTableRowClick(provider)}
                    >
                      <td className="py-3 px-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {safeString(provider.agentId || provider.id, 'N/A')}
                      </td>
                      <td className="py-3 px-4 flex items-center gap-2 whitespace-nowrap">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                          {safeString(provider.name?.charAt(0), 'U')}
                        </div>
                        <span className="font-medium text-gray-800 text-sm">
                          {safeString(provider.name, 'Unknown Provider')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800 whitespace-nowrap">
                        {safeString(provider.service, 'General Service')}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <StatusBadge status={provider.status} />
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 min-w-24">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${safeNumber(provider.workRate, 0)}%`,
                                backgroundColor: "#0D7957CC",
                              }}
                            ></div>
                          </div>
                          <span className="text-gray-700 font-semibold text-sm">
                            {safeNumber(provider.workRate, 0)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-700 max-w-xs truncate">
                        {safeString(provider.location, 'Location not specified')}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-500">
                      No service providers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* POTENTIAL SERVICE PROVIDERS TABLE */}
      {activeTab === 'potential' && (
        <div className="overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
              Provider Applications ({potentialProvidersLength})
            </h3>
            <span className="text-sm text-gray-500">
              Click on providers to view details and manage applications
            </span>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-xl">
            <table className="w-full min-w-full">
              <thead className="bg-green-600">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-white whitespace-nowrap">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-white whitespace-nowrap">
                    Applied for
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-white whitespace-nowrap">
                    Experience
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-white whitespace-nowrap">
                    Location
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-white whitespace-nowrap">
                    Phone
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-white whitespace-nowrap">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-white whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loadingPotential ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <TableRowSkeleton key={index} columns={7} />
                  ))
                ) : potentialProvidersLength > 0 ? (
                  potentialProviders.map((provider, index) => (
                    <tr 
                      key={index} 
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleTableRowClick(provider)}
                    >
                      <td className="py-3 px-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {safeString(provider.name, 'Unknown Applicant')}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800 whitespace-nowrap">
                        {safeString(provider.appliedFor, 'Service Provider')}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800 whitespace-nowrap">
                        {safeString(provider.experience, 'Not specified')}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800 max-w-xs truncate">
                        {safeString(provider.location, 'Location not specified')}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800 whitespace-nowrap">
                        {safeString(provider.phone, 'Not provided')}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <StatusBadge status={provider.status} />
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center space-x-2">
                          <QuickActionButtons provider={provider} />
                          <ActionMenu 
                            provider={provider}
                            onVerify={handleVerifyProvider}
                            onReject={handleRejectProvider}
                            onViewDetails={handleViewProviderDetails}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-500">
                      No potential providers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Verification Modal */}
      {showVerificationModal && (
        <VerificationModal
          provider={selectedProvider}
          onClose={() => setShowVerificationModal(false)}
          onVerify={handleVerifyProvider}
          onReject={handleRejectProvider}
        />
      )}

      {/* Provider Details Modal */}
      {showDetailsModal && (
        <ProviderDetailsModal
          provider={selectedProvider}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

export default ServiceProviders;