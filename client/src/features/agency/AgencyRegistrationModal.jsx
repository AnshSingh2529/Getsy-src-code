import React, { useState } from 'react';
import { Building2, User, MapPin, Lock, Plus, X, CheckCircle, AlertCircle } from 'lucide-react';
import {useAuth} from '../auth/hooks.js'
const AgencyRegistrationModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Mock user email (in real app, this would come from auth context)
  const {user} = useAuth()
  const userEmail = user?.email;
  
  const [formData, setFormData] = useState({
    agencyName: '',
    reraCertificate: '',
    agencyEmail: '',
    phoneNumber: '',
    ownerEmail: userEmail,
    addresses: [
      { pincode: '', city: '', area: '', landmark: '' }
    ]
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'agencyName':
        return value.trim().length < 3 ? 'Agency name must be at least 3 characters' : '';
      case 'reraCertificate':
        return value.trim().length === 0 ? 'RERA certificate number is required' : '';
      case 'agencyEmail':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : '';
      case 'phoneNumber':
        return !/^\+?[\d\s-()]{10,}$/.test(value) ? 'Invalid phone number' : '';
      default:
        return '';
    }
  };

  const validateAddressField = (index, field, value) => {
    if (field === 'pincode') {
      return !/^\d{6}$/.test(value) ? 'Pincode must be 6 digits' : '';
    }
    if (['city', 'area'].includes(field)) {
      return value.trim().length === 0 ? 'This field is required' : '';
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleAddressChange = (index, field, value) => {
    const newAddresses = [...formData.addresses];
    newAddresses[index][field] = value;
    setFormData(prev => ({ ...prev, addresses: newAddresses }));
    
    setTouched(prev => ({ ...prev, [`address_${index}_${field}`]: true }));
    
    const error = validateAddressField(index, field, value);
    setErrors(prev => ({ ...prev, [`address_${index}_${field}`]: error }));
  };

  const addAddress = () => {
    setFormData(prev => ({
      ...prev,
      addresses: [...prev.addresses, { pincode: '', city: '', area: '', landmark: '' }]
    }));
  };

  const removeAddress = (index) => {
    if (formData.addresses.length > 1) {
      setFormData(prev => ({
        ...prev,
        addresses: prev.addresses.filter((_, i) => i !== index)
      }));
    }
  };

  const isFormValid = () => {
    const hasBasicErrors = ['agencyName', 'reraCertificate', 'agencyEmail', 'phoneNumber']
      .some(field => validateField(field, formData[field]));
    
    const hasAddressErrors = formData.addresses.some((addr, index) => 
      ['pincode', 'city', 'area'].some(field => 
        validateAddressField(index, field, addr[field])
      )
    );
    
    return !hasBasicErrors && !hasAddressErrors;
  };

  const handleSubmit = async () => {
    // Mark all fields as touched
    const allTouched = { agencyName: true, reraCertificate: true, agencyEmail: true, phoneNumber: true };
    formData.addresses.forEach((_, index) => {
      ['pincode', 'city', 'area'].forEach(field => {
        allTouched[`address_${index}_${field}`] = true;
      });
    });
    setTouched(allTouched);
    
    if (!isFormValid()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const SuccessScreen = () => (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Agency Registered Successfully!</h3>
      <p className="text-gray-600 mb-6">Your agency has been registered and is now active.</p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
        <h4 className="font-medium text-blue-900 mb-2">Next Steps:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Add dealers to your agency</li>
          <li>• Complete your agency profile</li>
          <li>• Start managing properties</li>
        </ul>
      </div>
      <button
        onClick={handleClose}
        className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        Get Started
      </button>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Agency Registration</h2>
              <p className="text-sm text-gray-500">Register your real estate agency</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {showSuccess ? (
            <SuccessScreen />
          ) : (
            <div className="space-y-8">
              {/* Agency Information */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-5 h-5 text-gray-700" />
                  <h3 className="text-lg font-semibold text-gray-900">Agency Information</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Agency Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="agencyName"
                      value={formData.agencyName}
                      onChange={handleInputChange}
                      placeholder="Enter registered agency name"
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        touched.agencyName && errors.agencyName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {touched.agencyName && errors.agencyName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.agencyName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      RERA Certificate Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="reraCertificate"
                      value={formData.reraCertificate}
                      onChange={handleInputChange}
                      placeholder="e.g., RERA/MH/2024/12345"
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        touched.reraCertificate && errors.reraCertificate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    <p className="mt-1 text-xs text-gray-500">Government-issued registration number</p>
                    {touched.reraCertificate && errors.reraCertificate && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.reraCertificate}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Agency Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="agencyEmail"
                        value={formData.agencyEmail}
                        onChange={handleInputChange}
                        placeholder="official@agency.com"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          touched.agencyEmail && errors.agencyEmail ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {touched.agencyEmail && errors.agencyEmail && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.agencyEmail}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          touched.phoneNumber && errors.phoneNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {touched.phoneNumber && errors.phoneNumber && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <div className="border-t border-gray-200" />

              {/* Owner Details */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-gray-700" />
                  <h3 className="text-lg font-semibold text-gray-900">Owner Details</h3>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Owner Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.ownerEmail}
                      disabled
                      className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">This account will be the agency owner</p>
                </div>
              </section>

              <div className="border-t border-gray-200" />

              {/* Agency Addresses */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-700" />
                    <h3 className="text-lg font-semibold text-gray-900">Agency Address</h3>
                  </div>
                  <button
                    type="button"
                    onClick={addAddress}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Another Address
                  </button>
                </div>

                <div className="space-y-6">
                  {formData.addresses.map((address, index) => (
                    <div key={index} className="relative p-5 border border-gray-200 rounded-lg bg-gray-50">
                      {formData.addresses.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAddress(index)}
                          className="absolute top-3 right-3 p-1 hover:bg-white rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Pincode <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={address.pincode}
                            onChange={(e) => handleAddressChange(index, 'pincode', e.target.value)}
                            placeholder="400001"
                            maxLength="6"
                            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all ${
                              touched[`address_${index}_pincode`] && errors[`address_${index}_pincode`] 
                                ? 'border-red-300 bg-red-50' 
                                : 'border-gray-300'
                            }`}
                          />
                          {touched[`address_${index}_pincode`] && errors[`address_${index}_pincode`] && (
                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors[`address_${index}_pincode`]}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            City <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={address.city}
                            onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                            placeholder="Mumbai"
                            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all ${
                              touched[`address_${index}_city`] && errors[`address_${index}_city`] 
                                ? 'border-red-300 bg-red-50' 
                                : 'border-gray-300'
                            }`}
                          />
                          {touched[`address_${index}_city`] && errors[`address_${index}_city`] && (
                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors[`address_${index}_city`]}
                            </p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Area / Society / Working Area <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={address.area}
                            onChange={(e) => handleAddressChange(index, 'area', e.target.value)}
                            placeholder="Bandra West, Andheri, etc."
                            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all ${
                              touched[`address_${index}_area`] && errors[`address_${index}_area`] 
                                ? 'border-red-300 bg-red-50' 
                                : 'border-gray-300'
                            }`}
                          />
                          {touched[`address_${index}_area`] && errors[`address_${index}_area`] && (
                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors[`address_${index}_area`]}
                            </p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Landmark <span className="text-gray-400">(Optional)</span>
                          </label>
                          <input
                            type="text"
                            value={address.landmark}
                            onChange={(e) => handleAddressChange(index, 'landmark', e.target.value)}
                            placeholder="Near Metro Station, Behind Mall, etc."
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Footer */}
        {!showSuccess && (
          <div className="px-8 py-5 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid() || isSubmitting}
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Registering...
                </>
              ) : (
                'Register Agency'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgencyRegistrationModal;