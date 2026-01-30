import React, { useState, useEffect } from "react";
import {
  Building2,
  Mail,
  User,
  Phone,
  FileCheck,
  MapPin,
  Map,
  Landmark,
  Hash,
  CheckCircle2,
  Circle,
  Star,
  TrendingUp,
  Users,
  Shield,
  Zap,
  Crown,
  ArrowRight,
  Sparkles,
  Award,
  Target,
  ChevronRight,
  MessageCircle,
  BarChart3,
  Globe,
  Lock,
  ChevronLeft,
  Home,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FEATURED_AGENCIES = [
  {
    name: "Urban Realty Solutions",
    properties: 2847,
    rating: 4.9,
    image: "🏢",
  },
  { name: "Prime Estate Group", properties: 1923, rating: 4.8, image: "🏛️" },
  {
    name: "Metro Property Advisors",
    properties: 3156,
    rating: 4.9,
    image: "🌆",
  },
  { name: "Elite Homes Network", properties: 2634, rating: 4.7, image: "🏘️" },
  { name: "Skyline Realtors", properties: 1845, rating: 4.8, image: "🌃" },
];

const PLATFORM_STATS = [
  { icon: Users, value: "50K+", label: "Active Firms" },
  { icon: Building2, value: "2M+", label: "Properties Listed" },
  { icon: TrendingUp, value: "98%", label: "Success Rate" },
  { icon: Globe, value: "50+", label: "Cities Covered" },
];

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const MAJOR_CITIES = {
  Delhi: [
    "New Delhi",
    "South Delhi",
    "North Delhi",
    "East Delhi",
    "West Delhi",
  ],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"],
  Karnataka: ["Bangalore", "Mysore", "Mangalore", "Hubli", "Belgaum"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
  "West Bengal": ["Kolkata", "Siliguri", "Asansol", "Durgapur", "Howrah"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi"],
  Punjab: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
};

export default function FirmRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    owner: "John Doe",
    phone: "",
    rera_cert_number: "",
    addresses: {
      state: "",
      city: "",
      pincode: "",
      area: "",
      landmark: "",
    },
  });

  const [roleConfirmed, setRoleConfirmed] = useState(false);
  const [currentFirm, setCurrentFirm] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [availableCities, setAvailableCities] = useState([]);
  const navigate = useNavigate();
  // Auto-rotate featured agencies
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFirm((prev) => (prev + 1) % FEATURED_AGENCIES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Update available cities when state changes
  useEffect(() => {
    if (formData.addresses.state && MAJOR_CITIES[formData.addresses.state]) {
      setAvailableCities(MAJOR_CITIES[formData.addresses.state]);
    } else {
      setAvailableCities([]);
    }
  }, [formData.addresses.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("addresses.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        addresses: { ...prev.addresses, [addressField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDropdownSelect = (field, value) => {
    if (field.startsWith("addresses.")) {
      const addressField = field.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        addresses: { ...prev.addresses, [addressField]: value },
      }));
      if (addressField === "state") {
        setFormData((prev) => ({
          ...prev,
          addresses: { ...prev.addresses, city: "" },
        }));
      }
    }
    setOpenDropdown(null);
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      formData.rera_cert_number.trim() &&
      formData.addresses.state.trim() &&
      formData.addresses.city.trim() &&
      formData.addresses.pincode.trim() &&
      formData.addresses.area.trim() &&
      roleConfirmed
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        rera_cert_number: formData.rera_cert_number,
        addresses: {
          pincode: formData.addresses.pincode,
          city: formData.addresses.city,
          area: formData.addresses.area,
          landmark: formData.addresses.landmark,
        },
      };
      console.log("Firm Registration:", payload);
    }
  };

  const handleBackToHome = () => {
    // Add your navigation logic here
    navigate("/");
  };

  const handleViewSubscriptions = () => {
    console.log("Navigating to subscription page...");
    // Add your navigation logic here
  };

  const nextFirm = () =>
    setCurrentFirm((prev) => (prev + 1) % FEATURED_AGENCIES.length);
  const prevFirm = () =>
    setCurrentFirm(
      (prev) =>
        (prev - 1 + FEATURED_AGENCIES.length) % FEATURED_AGENCIES.length,
    );

  const CustomDropdown = ({
    label,
    value,
    options,
    field,
    placeholder,
    required = false,
  }) => {
    const isOpen = openDropdown === field;

    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label} {required && <span className="text-blue-400">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setOpenDropdown(isOpen ? null : field)}
          className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-left flex items-center justify-between focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all group"
        >
          <span className={value ? "text-gray-100" : "text-gray-600"}>
            {value || placeholder}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180 text-blue-400" : ""}`}
          />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpenDropdown(null)}
            ></div>
            <div className="absolute z-50 w-full mt-2 max-h-60 overflow-y-auto bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl shadow-black/50">
              {options.length > 0 ? (
                options.map((option, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleDropdownSelect(field, option)}
                    className={`w-full px-4 py-3 text-left hover:bg-blue-500/20 transition-colors ${
                      value === option
                        ? "bg-blue-500/10 text-blue-300"
                        : "text-gray-300"
                    } ${idx === 0 ? "rounded-t-xl" : ""} ${idx === options.length - 1 ? "rounded-b-xl" : ""}`}
                  >
                    {option}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500 text-sm">
                  {field === "addresses.city" && !formData.addresses.state
                    ? "Please select a state first"
                    : "No options available"}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-gray-950 to-purple-950/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Back to Home Button - Fixed Top Left */}
      <button
        onClick={handleBackToHome}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur-xl border border-white/10 rounded-xl text-gray-300 hover:text-white transition-all hover:scale-105 shadow-lg group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      {/* View Subscriptions Button - Fixed Top Right */}
      <button
        onClick={handleViewSubscriptions}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 backdrop-blur-xl border border-blue-500/30 rounded-xl text-blue-300 hover:text-blue-200 transition-all hover:scale-105 shadow-lg shadow-blue-500/10 group"
      >
        <Crown className="w-4 h-4" />
        <span className="text-sm font-medium">View Plans</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="relative min-h-screen flex flex-col">
        {/* Hero Section - Mobile Optimized */}
        <div className="relative pt-24 pb-8 px-6">
          <div className="max-w-7xl mx-auto text-center space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full animate-fade-in">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-xs sm:text-sm font-medium text-blue-300">
                India's #1 Real Estate Firms Powering Company
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-blue-100 to-gray-100 leading-tight px-4">
              Scale Your Firm
              <br className="hidden sm:block" /> to New Heights
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4">
              Join 50,000+ firms transforming real estate with AI-powered tools
            </p>

            {/* Stats Grid - Mobile Optimized */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-8">
              {PLATFORM_STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:bg-white/[0.04] transition-all duration-300 hover:scale-105 group"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mb-2 sm:mb-3 mx-auto group-hover:scale-110 transition-transform" />
                  <div className="text-xl sm:text-2xl font-bold text-gray-100 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Registration Form - Mobile Optimized */}
        <div className="flex-1 px-4 sm:px-6 pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 border-b border-white/10 px-5 sm:px-8 py-5 sm:py-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 flex-shrink-0">
                    <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-100 truncate">
                      Firm Registration
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                      Join the future of real estate
                    </p>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="p-5 sm:p-8 space-y-6 sm:space-y-8"
              >
                {/* Firm Details */}
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex items-center gap-2 pb-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                      Firm Info
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                  </div>

                  {/* Firm Name - Full Width */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Firm Name *
                    </label>
                    <div className="relative group">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors pointer-events-none" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-gray-100 placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                        placeholder="Enter your agency name"
                        required
                      />
                    </div>
                  </div>

                  {/* Email & Phone - Grid on larger screens */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors pointer-events-none" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-gray-100 placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                          placeholder="agency@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors pointer-events-none" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-gray-100 placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                          placeholder="+91 XXXXX XXXXX"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Owner & RERA - Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Owner Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.owner}
                          disabled
                          className="w-full pl-12 pr-4 py-3.5 bg-white/[0.01] border border-white/5 rounded-xl text-gray-500 cursor-not-allowed"
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-1.5 ml-1">
                        Auto-filled from account
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        RERA Certificate *
                      </label>
                      <div className="relative group">
                        <FileCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors pointer-events-none" />
                        <input
                          type="text"
                          name="rera_cert_number"
                          value={formData.rera_cert_number}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-gray-100 placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                          placeholder="RERA number"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex items-center gap-2 pb-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
                    <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                      Location
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
                  </div>

                  {/* State & City Dropdowns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <CustomDropdown
                      label="State"
                      value={formData.addresses.state}
                      options={INDIAN_STATES}
                      field="addresses.state"
                      placeholder="Select state"
                      required
                    />

                    <CustomDropdown
                      label="City"
                      value={formData.addresses.city}
                      options={availableCities}
                      field="addresses.city"
                      placeholder="Select city"
                      required
                    />
                  </div>

                  {/* Pincode & Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Pincode *
                      </label>
                      <div className="relative group">
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors pointer-events-none" />
                        <input
                          type="text"
                          name="addresses.pincode"
                          value={formData.addresses.pincode}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-gray-100 placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                          placeholder="110001"
                          maxLength="6"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Area/Locality *
                      </label>
                      <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors pointer-events-none" />
                        <input
                          type="text"
                          name="addresses.area"
                          value={formData.addresses.area}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-gray-100 placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                          placeholder="Area or locality"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Landmark - Full Width */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Landmark{" "}
                      <span className="text-gray-600 text-xs">(Optional)</span>
                    </label>
                    <div className="relative group">
                      <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors pointer-events-none" />
                      <input
                        type="text"
                        name="addresses.landmark"
                        value={formData.addresses.landmark}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-gray-100 placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                        placeholder="Nearby landmark"
                      />
                    </div>
                  </div>
                </div>

                {/* Role Confirmation */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                      Confirmation
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setRoleConfirmed(!roleConfirmed)}
                    className={`w-full relative overflow-hidden transition-all duration-500 ${
                      roleConfirmed
                        ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/40 shadow-lg shadow-blue-500/20"
                        : "bg-white/[0.02] border-white/10 hover:bg-white/[0.04]"
                    } border-2 rounded-xl sm:rounded-2xl p-4 sm:p-6`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                            roleConfirmed
                              ? "bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30"
                              : "bg-white/5"
                          }`}
                        >
                          {roleConfirmed ? (
                            <CheckCircle2 className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                          ) : (
                            <Circle className="w-5 h-5 sm:w-7 sm:h-7 text-gray-500" />
                          )}
                        </div>
                        <div className="text-left min-w-0">
                          <p
                            className={`font-semibold mb-0.5 sm:mb-1 text-sm sm:text-base transition-colors truncate ${
                              roleConfirmed ? "text-blue-300" : "text-gray-300"
                            }`}
                          >
                            I confirm that I am authorized to register this firm
                          </p>
                          <p className="text-xs text-gray-500 hidden sm:block">
                            Confirm your role to activate features
                          </p>
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm transition-all flex-shrink-0 ${
                          roleConfirmed
                            ? "bg-blue-500/30 text-blue-300 border border-blue-500/30"
                            : "bg-white/5 text-gray-500 border border-white/10"
                        }`}
                      >
                        {roleConfirmed ? "✓" : "Required"}
                      </div>
                    </div>
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid()}
                  className={`w-full relative overflow-hidden group transition-all duration-300 ${
                    isFormValid()
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-[1.02]"
                      : "bg-white/5 cursor-not-allowed opacity-50"
                  } rounded-xl px-6 sm:px-8 py-3.5 sm:py-4 font-semibold text-white flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base`}
                >
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Create Firm Account</span>
                  <ArrowRight
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isFormValid() ? "group-hover:translate-x-1" : ""}`}
                  />
                  {isFormValid() && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  )}
                </button>

                <p className="text-center text-xs text-gray-600 px-2">
                  By registering, you agree to our{" "}
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Terms
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </p>
              </form>
            </div>

            {/* Trust Badges - Mobile Optimized */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-gray-600 px-4">
              <div className="flex items-center gap-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                <span>RERA Verified</span>
              </div>
              <div className="h-3 w-px bg-gray-700 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                <span>Secure</span>
              </div>
              <div className="h-3 w-px bg-gray-700 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                <span>ISO Certified</span>
              </div>
            </div>

            {/* Support CTA - Mobile Optimized */}
            <div className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
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
                Contact Our Agent
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        /* Custom scrollbar for dropdowns */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
}
