import React, { useState } from "react";
import {
  UserCircle2,
  Phone,
  MapPin,
  Lock,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const DealerRegistrationModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock user email (in real app, this would come from auth context)
  const userEmail = "dealer.user@example.com";

  const [formData, setFormData] = useState({
    dealerEmail: userEmail,
    phoneNumber: "",
    workingAreas: [{ pincode: "", city: "", area: "" }],
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validatePhone = (value) => {
    if (!value || value.trim().length === 0) {
      return "Phone number is required";
    }
    if (!/^\+?[\d\s-()]{10,}$/.test(value)) {
      return "Please enter a valid phone number";
    }
    return "";
  };

  const validateWorkingAreaField = (index, field, value) => {
    if (field === "pincode") {
      if (!value || value.trim().length === 0) {
        return "Pincode is required";
      }
      if (!/^\d{6}$/.test(value)) {
        return "Pincode must be 6 digits";
      }
    }
    if (field === "city" || field === "area") {
      if (!value || value.trim().length === 0) {
        return "This field is required";
      }
    }
    return "";
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phoneNumber: value }));
    setTouched((prev) => ({ ...prev, phoneNumber: true }));

    const error = validatePhone(value);
    setErrors((prev) => ({ ...prev, phoneNumber: error }));
  };

  const handleWorkingAreaChange = (index, field, value) => {
    const newWorkingAreas = [...formData.workingAreas];
    newWorkingAreas[index][field] = value;
    setFormData((prev) => ({ ...prev, workingAreas: newWorkingAreas }));

    setTouched((prev) => ({ ...prev, [`area_${index}_${field}`]: true }));

    const error = validateWorkingAreaField(index, field, value);
    setErrors((prev) => ({ ...prev, [`area_${index}_${field}`]: error }));
  };

  const addWorkingArea = () => {
    setFormData((prev) => ({
      ...prev,
      workingAreas: [...prev.workingAreas, { pincode: "", city: "", area: "" }],
    }));
  };

  const removeWorkingArea = (index) => {
    if (formData.workingAreas.length > 1) {
      setFormData((prev) => ({
        ...prev,
        workingAreas: prev.workingAreas.filter((_, i) => i !== index),
      }));

      // Clean up errors and touched states for removed area
      const newErrors = { ...errors };
      const newTouched = { ...touched };
      ["pincode", "city", "area"].forEach((field) => {
        delete newErrors[`area_${index}_${field}`];
        delete newTouched[`area_${index}_${field}`];
      });
      setErrors(newErrors);
      setTouched(newTouched);
    }
  };

  const isFormValid = () => {
    const phoneError = validatePhone(formData.phoneNumber);
    if (phoneError) return false;

    const hasAreaErrors = formData.workingAreas.some((area, index) =>
      ["pincode", "city", "area"].some((field) =>
        validateWorkingAreaField(index, field, area[field])
      )
    );

    return !hasAreaErrors;
  };

  const handleSubmit = async () => {
    // Mark all fields as touched
    const allTouched = { phoneNumber: true };
    formData.workingAreas.forEach((_, index) => {
      ["pincode", "city", "area"].forEach((field) => {
        allTouched[`area_${index}_${field}`] = true;
      });
    });
    setTouched(allTouched);

    // Revalidate all fields
    const phoneError = validatePhone(formData.phoneNumber);
    const newErrors = { phoneNumber: phoneError };

    formData.workingAreas.forEach((area, index) => {
      ["pincode", "city", "area"].forEach((field) => {
        const error = validateWorkingAreaField(index, field, area[field]);
        if (error) {
          newErrors[`area_${index}_${field}`] = error;
        }
      });
    });

    setErrors(newErrors);

    if (!isFormValid()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const SuccessScreen = () => (
    <div className="text-center py-12 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
        Dealer Registered Successfully
      </h3>
      <p className="text-gray-600 mb-6">
        The dealer account has been activated and is ready for operations.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left max-w-md mx-auto">
        <h4 className="font-medium text-blue-900 mb-2">Next Steps:</h4>
        <ul className="text-sm text-blue-800 space-y-1.5">
          <li>• Assign properties to this dealer</li>
          <li>• Configure lead routing preferences</li>
          <li>• Set up performance tracking</li>
        </ul>
      </div>
      <button
        onClick={handleClose}
        className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        Continue to Dashboard
      </button>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Dealer Registration
              </h2>
              <p className="text-sm text-gray-500">
                Onboard a new dealer to your agency
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {showSuccess ? (
            <SuccessScreen />
          ) : (
            <div className="space-y-6">
              {/* Dealer Identity */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <UserCircle2 className="w-5 h-5 text-gray-700" />
                  <h3 className="text-base font-semibold text-gray-900">
                    Dealer Identity
                  </h3>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Dealer Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.dealerEmail}
                      disabled
                      className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <p className="mt-1.5 text-xs text-gray-500">
                    This account will be registered as a dealer
                  </p>
                </div>
              </section>

              <div className="border-t border-gray-200" />

              {/* Contact Information */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="w-5 h-5 text-gray-700" />
                  <h3 className="text-base font-semibold text-gray-900">
                    Contact Information
                  </h3>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="+91 98765 43210"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      touched.phoneNumber && errors.phoneNumber
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
              </section>

              <div className="border-t border-gray-200" />

              {/* Working Areas */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-700" />
                    <h3 className="text-base font-semibold text-gray-900">
                      Working Area
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={addWorkingArea}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Another Area
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.workingAreas.map((area, index) => (
                    <div
                      key={index}
                      className="relative p-4 border border-gray-200 rounded-lg bg-gray-50"
                    >
                      {formData.workingAreas.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeWorkingArea(index)}
                          className="absolute top-3 right-3 p-1 hover:bg-white rounded transition-colors"
                          aria-label="Remove working area"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Pincode <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={area.pincode}
                            onChange={(e) =>
                              handleWorkingAreaChange(
                                index,
                                "pincode",
                                e.target.value
                              )
                            }
                            placeholder="400001"
                            maxLength="6"
                            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all ${
                              touched[`area_${index}_pincode`] &&
                              errors[`area_${index}_pincode`]
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300"
                            }`}
                          />
                          {touched[`area_${index}_pincode`] &&
                            errors[`area_${index}_pincode`] && (
                              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" />
                                {errors[`area_${index}_pincode`]}
                              </p>
                            )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            City <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={area.city}
                            onChange={(e) =>
                              handleWorkingAreaChange(
                                index,
                                "city",
                                e.target.value
                              )
                            }
                            placeholder="Mumbai"
                            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all ${
                              touched[`area_${index}_city`] &&
                              errors[`area_${index}_city`]
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300"
                            }`}
                          />
                          {touched[`area_${index}_city`] &&
                            errors[`area_${index}_city`] && (
                              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" />
                                {errors[`area_${index}_city`]}
                              </p>
                            )}
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Area / Society / Working Area{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={area.area}
                            onChange={(e) =>
                              handleWorkingAreaChange(
                                index,
                                "area",
                                e.target.value
                              )
                            }
                            placeholder="Bandra West, Andheri East, etc."
                            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all ${
                              touched[`area_${index}_area`] &&
                              errors[`area_${index}_area`]
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300"
                            }`}
                          />
                          {touched[`area_${index}_area`] &&
                            errors[`area_${index}_area`] && (
                              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" />
                                {errors[`area_${index}_area`]}
                              </p>
                            )}
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
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid() || isSubmitting}
              className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Registering...
                </>
              ) : (
                "Register Dealer"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealerRegistrationModal;
