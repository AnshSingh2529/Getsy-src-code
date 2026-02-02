import React, { useState } from "react";
import {
  MapPin,
  Phone,
  BadgeCheck,
  ArrowRight,
  Building2,
  CheckCircle2,
  Sparkles,
  Home,
  CreditCard,
  Shield,
  Zap,
  Users,
  TrendingUp,
  MessageCircle,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import web_logo from "../../assets/images/web-logo.png";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import BrokerPreview from "./components/BrokerPreview.jsx";

const BrokerRegistration = () => {
  const [formData, setFormData] = useState({
    working_area: {
      pincode: "",
      city: "",
      area: "",
    },
  });

  const { user } = useAuth();
  const navigate = useNavigate();
  const [roleConfirmed, setRoleConfirmed] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetY, setSheetY] = useState(0);
  const startYRef = React.useRef(0);

  // Mock authenticated user data
  const authenticatedUser = {
    dealer: "John Anderson",
    phone: "+1 (555) 123-4567",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      working_area: {
        ...prev.working_area,
        [name]: value,
      },
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.working_area.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{5,6}$/.test(formData.working_area.pincode)) {
      newErrors.pincode = "Enter a valid pincode";
    }

    if (!formData.working_area.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.working_area.area.trim()) {
      newErrors.area = "Area is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    return (
      formData.working_area.pincode.trim() &&
      formData.working_area.city.trim() &&
      formData.working_area.area.trim() &&
      roleConfirmed
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm() || !roleConfirmed) {
      return;
    }

    const payload = {
      working_area: {
        pincode: formData.working_area.pincode,
        city: formData.working_area.city,
        area: formData.working_area.area,
      },
    };

    console.log("Submitting dealer registration:", payload);
    // Close sheet on successful submission
    setIsSheetOpen(false);
  };

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  const handleViewPlans = () => {
    console.log("Navigating to plans...");
    // window.location.href = '/plans';
  };

  const calculateProgress = () => {
    const fields = [
      formData.working_area.pincode,
      formData.working_area.city,
      formData.working_area.area,
      roleConfirmed ? "confirmed" : "",
    ];
    const filledFields = fields.filter(
      (field) => field && field.toString().trim(),
    ).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden">
      {/* Navigation Header */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3 animate-fadeIn">
              <div>
                <img
                  src={web_logo}
                  alt="web-logo"
                  className="w-20 h-12 object-cover"
                />
              </div>
            </div>

            {/* Navigation CTAs */}
            <div
              className="flex items-center gap-3 animate-fadeIn"
              style={{ animationDelay: "0.1s" }}
            >
              <button
                onClick={handleBackToHome}
                className="group flex items-center gap-2 px-3 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 rounded-lg text-gray-300 hover:text-white transition-all duration-300"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">
                  Back to Home
                </span>
              </button>

              <button
                onClick={handleViewPlans}
                className="group flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-800/50 to-yellow-900/40 hover:from-orange-600 hover:to-orange-800 rounded-lg text-white transition-all duration-300 shadow-lg border border-yellow-900"
              >
                <CreditCard className="w-4 h-4" />
                <span className="lg:text-sm font-medium text-[4px]">
                  View Plans
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Hero Section - Left Side */}
          <div className="space-y-8 lg:sticky lg:top-8 mb-20">
            {/* Main Hero Content */}
            <div
              className="space-y-6 animate-fadeIn"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300 tracking-wide">
                  Verified Broker Platform
                </span>
              </div>

              <div className="space-y-4">
                <h1
                  className="text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-100 leading-tight"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Join India's Premier Real Estate Network
                </h1>

                <p className="lg:text-lg text-xs text-gray-400 leading-relaxed max-w-xl">
                  Register as a professional broker to unlock exclusive property
                  listings, advanced marketplace tools, and connect with
                  verified buyers across your territory.
                </p>
              </div>
            </div>
            {/* Support CTA */}
            <div
              className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-600/10 to-green-600/10 border border-blue-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 animate-fadeIn"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-200 mb-1 text-sm sm:text-base">
                    Need help?
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Our specialists are ready to assist
                  </p>
                </div>
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
              </div>
              <button className="mt-3 sm:mt-4 w-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                Talk to a Registration Specialist
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
            {/* preview */}
            <BrokerPreview />
            {/* Benefits Grid */}
            <div
              className="grid sm:grid-cols-2 gap-4 animate-fadeIn"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="p-4 bg-slate-800/30 border border-slate-700/40 rounded-xl hover:bg-slate-800/50 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white mb-1">
                  Instant Access
                </h3>
                <p className="text-sm text-gray-500">
                  Get immediate access to premium listings and marketplace
                  features
                </p>
              </div>

              <div className="p-4 bg-slate-800/30 border border-slate-700/40 rounded-xl hover:bg-slate-800/50 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="font-semibold text-white mb-1">
                  Verified Network
                </h3>
                <p className="text-sm text-gray-500">
                  Connect with authenticated buyers and trusted property owners
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Sticky CTA */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-black via-black/90 to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-3">
              {/* Primary CTA */}
              <button
                onClick={() => setIsSheetOpen(true)}
                className="flex-1 py-3.5 rounded-xl bg-blue-700/90 text-white font-semibold shadow-xl shadow-zinc-900/40 active:scale-[0.98] transition-all"
              >
                Register Your Firm
              </button>

              {/* Secondary CTA */}
              {!user ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/auth/login")}
                  className="py-3.5 px-4 rounded-lg border border-blue-500/30 bg-blue-600/10 text-sm font-medium text-blue-400 backdrop-blur-sm transition-all active:scale-[0.97]"
                >
                  Login
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/user-profile")}
                  className="h-[46px] w-[46px] flex items-center justify-center rounded-xl bg-blue-600 text-white text-sm font-semibold"
                >
                  {user?.username?.[0]?.toUpperCase()}
                </motion.button>
              )}
            </div>
          </div>

          {/* Registration Form - Desktop Only */}
          <div
            className="hidden lg:block animate-fadeIn"
            style={{ animationDelay: "0.3s" }}
          >
            {/* Form Header */}
            <div className="text-center lg:text-left mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Complete Your Registration
              </h2>
              <p className="text-sm text-gray-400">
                Fill in your details to activate your broker account
              </p>
            </div>

            {/* Registration Form Component */}
            <RegistrationForm
              formData={formData}
              errors={errors}
              focusedField={focusedField}
              roleConfirmed={roleConfirmed}
              authenticatedUser={authenticatedUser}
              handleInputChange={handleInputChange}
              setFocusedField={setFocusedField}
              setRoleConfirmed={setRoleConfirmed}
              handleSubmit={handleSubmit}
              isFormValid={isFormValid}
              calculateProgress={calculateProgress}
            />

            {/* Footer Note */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 leading-relaxed">
                By creating a broker profile, you agree to our{" "}
                <button className="text-cyan-400 hover:text-cyan-300 transition-colors underline-offset-2 hover:underline">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button className="text-cyan-400 hover:text-cyan-300 transition-colors underline-offset-2 hover:underline">
                  Privacy Policy
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isSheetOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsSheetOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Sheet */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-slate-900 rounded-t-3xl shadow-2xl max-h-[90vh] flex flex-col transition-transform duration-300"
          style={{
            transform: isSheetOpen
              ? `translateY(${sheetY}px)`
              : "translateY(100%)",
          }}
          onPointerDown={(e) => {
            startYRef.current = e.clientY;
          }}
          onPointerMove={(e) => {
            if (!isSheetOpen) return;
            const delta = e.clientY - startYRef.current;
            if (delta > 0) setSheetY(delta);
          }}
          onPointerUp={() => {
            if (sheetY > 120) {
              setIsSheetOpen(false);
            }
            setSheetY(0);
          }}
        >
          {/* Sheet Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
            <div>
              <h2 className="text-xl font-bold text-white">
                Broker Registration
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Complete your broker profile
              </p>
            </div>
            <button
              onClick={() => setIsSheetOpen(false)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto px-4 pb-6">
            <div className="mt-4">
              <RegistrationForm
                formData={formData}
                errors={errors}
                focusedField={focusedField}
                roleConfirmed={roleConfirmed}
                authenticatedUser={authenticatedUser}
                handleInputChange={handleInputChange}
                setFocusedField={setFocusedField}
                setRoleConfirmed={setRoleConfirmed}
                handleSubmit={handleSubmit}
                isFormValid={isFormValid}
                calculateProgress={calculateProgress}
              />

              {/* Footer Note */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 leading-relaxed">
                  By registering, you agree to our{" "}
                  <button className="text-cyan-400 hover:text-cyan-300 transition-colors underline-offset-2 hover:underline">
                    Terms
                  </button>{" "}
                  and{" "}
                  <button className="text-cyan-400 hover:text-cyan-300 transition-colors underline-offset-2 hover:underline">
                    Privacy Policy
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

// Extracted Registration Form Component for reuse
const RegistrationForm = ({
  formData,
  errors,
  focusedField,
  roleConfirmed,
  authenticatedUser,
  handleInputChange,
  setFocusedField,
  setRoleConfirmed,
  handleSubmit,
  isFormValid,
  calculateProgress,
}) => {
  return (
    <div className="relative group">
      {/* Card */}
      <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
        {/* Top Border Accent */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 animate-shimmer bg-[length:200%_100%]"></div>

        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Broker Identity Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
                  <BadgeCheck className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-100">
                    Broker Identity
                  </h3>
                  <p className="text-xs text-gray-500">
                    Your authenticated account information
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Broker Name */}
                <div className="relative group/input">
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <span>Broker Name</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={authenticatedUser.dealer}
                      disabled
                      className="w-full px-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-lg text-gray-300 cursor-not-allowed transition-all text-sm"
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover/input:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="relative group/input">
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <span>Phone Number</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Phone className="w-4 h-4 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      value={authenticatedUser.phone}
                      disabled
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-lg text-gray-300 cursor-not-allowed transition-all text-sm"
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover/input:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/50"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-gradient-to-br from-slate-900/90 to-slate-800/90 text-xs text-gray-500 uppercase tracking-wider">
                  Working Territory
                </span>
              </div>
            </div>

            {/* Working Area Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-100">
                    Primary Operating Area
                  </h3>
                  <p className="text-xs text-gray-500">
                    Define your main service territory
                  </p>
                </div>
              </div>

              {/* Pincode */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Pincode
                  <span className="text-cyan-400 ml-1">*</span>
                </label>
                <div className="relative group/input">
                  <input
                    type="text"
                    name="pincode"
                    value={formData.working_area.pincode}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("pincode")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter 5-6 digit postal code"
                    className={`w-full px-4 py-3 bg-slate-800/40 border ${
                      focusedField === "pincode"
                        ? "border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                        : errors.pincode
                          ? "border-cyan-500/30"
                          : "border-slate-700/50"
                    } rounded-lg text-gray-100 placeholder-gray-600 transition-all duration-300 focus:outline-none focus:border-cyan-500/50 focus:shadow-lg focus:shadow-cyan-500/10 text-sm`}
                  />
                  <div
                    className={`absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 transition-opacity duration-300 pointer-events-none ${
                      focusedField === "pincode" ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>
                </div>
                {errors.pincode && (
                  <p className="mt-1.5 text-xs text-cyan-400 flex items-center gap-1.5 animate-fadeIn">
                    <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                    {errors.pincode}
                  </p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* City */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    City
                    <span className="text-cyan-400 ml-1">*</span>
                  </label>
                  <div className="relative group/input">
                    <input
                      type="text"
                      name="city"
                      value={formData.working_area.city}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("city")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="e.g., New Delhi"
                      className={`w-full px-4 py-3 bg-slate-800/40 border ${
                        focusedField === "city"
                          ? "border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                          : errors.city
                            ? "border-cyan-500/30"
                            : "border-slate-700/50"
                      } rounded-lg text-gray-100 placeholder-gray-600 transition-all duration-300 focus:outline-none focus:border-cyan-500/50 focus:shadow-lg focus:shadow-cyan-500/10 text-sm`}
                    />
                    <div
                      className={`absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 transition-opacity duration-300 pointer-events-none ${
                        focusedField === "city" ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>
                  </div>
                  {errors.city && (
                    <p className="mt-1.5 text-xs text-cyan-400 flex items-center gap-1.5 animate-fadeIn">
                      <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* Area */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Area / Locality
                    <span className="text-cyan-400 ml-1">*</span>
                  </label>
                  <div className="relative group/input">
                    <input
                      type="text"
                      name="area"
                      value={formData.working_area.area}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("area")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="e.g., Connaught Place"
                      className={`w-full px-4 py-3 bg-slate-800/40 border ${
                        focusedField === "area"
                          ? "border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                          : errors.area
                            ? "border-cyan-500/30"
                            : "border-slate-700/50"
                      } rounded-lg text-gray-100 placeholder-gray-600 transition-all duration-300 focus:outline-none focus:border-cyan-500/50 focus:shadow-lg focus:shadow-cyan-500/10 text-sm`}
                    />
                    <div
                      className={`absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 transition-opacity duration-300 pointer-events-none ${
                        focusedField === "area" ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>
                  </div>
                  {errors.area && (
                    <p className="mt-1.5 text-xs text-cyan-400 flex items-center gap-1.5 animate-fadeIn">
                      <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                      {errors.area}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-xs text-gray-500 flex items-start gap-2 bg-slate-800/30 border border-slate-700/30 rounded-lg p-3">
                <MapPin className="w-3.5 h-3.5 text-gray-500 mt-0.5 flex-shrink-0" />
                <span>
                  Specify your primary service area. Additional territories can
                  be added after registration.
                </span>
              </p>
            </div>

            {/* Divider */}
            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/50"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-gradient-to-br from-slate-900/90 to-slate-800/90 text-xs text-gray-500 uppercase tracking-wider">
                  Role Assignment
                </span>
              </div>
            </div>

            {/* Role Confirmation */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-200">
                    Confirm Registration Type
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    This defines your platform access level
                  </p>
                </div>
                {roleConfirmed && (
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                )}
              </div>

              <button
                type="button"
                onClick={() => setRoleConfirmed(!roleConfirmed)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-500 relative overflow-hidden group/role ${
                  roleConfirmed
                    ? "bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/50 shadow-xl shadow-cyan-500/20"
                    : "bg-slate-800/20 border-slate-700/50 hover:border-slate-600/50 hover:bg-slate-800/30"
                }`}
              >
                {roleConfirmed && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-cyan-500/5 animate-shimmer bg-[length:200%_100%]"></div>
                )}

                <div className="relative flex items-center gap-3">
                  <div
                    className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                      roleConfirmed
                        ? "bg-gradient-to-br from-cyan-500 to-blue-500 border-cyan-400 scale-110"
                        : "border-slate-600 group-hover/role:border-slate-500"
                    }`}
                  >
                    {roleConfirmed && (
                      <BadgeCheck className="w-3.5 h-3.5 text-white animate-fadeIn" />
                    )}
                  </div>

                  <div className="flex-1 text-left">
                    <div
                      className={`font-semibold text-sm transition-colors flex items-center gap-2 ${
                        roleConfirmed ? "text-cyan-300" : "text-gray-300"
                      }`}
                    >
                      Register as Professional Broker
                      {roleConfirmed && (
                        <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 text-[10px] font-bold rounded uppercase tracking-wider">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      Grants access to broker dashboard, property management,
                      and marketplace tools
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <div
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        roleConfirmed
                          ? "bg-cyan-400 shadow-lg shadow-cyan-400/50 animate-pulse"
                          : "bg-slate-700"
                      }`}
                    ></div>
                  </div>
                </div>
              </button>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!isFormValid()}
                className={`group/btn w-full py-3.5 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden text-sm ${
                  isFormValid()
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/40 hover:scale-[1.02]"
                    : "bg-slate-800/50 text-gray-600 cursor-not-allowed border-2 border-slate-700/50"
                }`}
              >
                {isFormValid() && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                    <CheckCircle2 className="w-4 h-4 animate-fadeIn" />
                  </>
                )}

                <span className="relative">Create Broker Profile</span>
                <ArrowRight
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isFormValid() ? "group-hover/btn:translate-x-1" : ""
                  }`}
                />
              </button>

              {/* Progress Indicator */}
              {!isFormValid() && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Registration Progress</span>
                    <span>{calculateProgress()}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 rounded-full"
                      style={{ width: `${calculateProgress()}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BrokerRegistration;
