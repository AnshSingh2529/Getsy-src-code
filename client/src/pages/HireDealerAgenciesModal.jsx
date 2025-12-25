import React, { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  Star,
  Phone,
  Mail,
  Heart,
  ChevronDown,
  ChevronUp,
  Building2,
  Home,
  Users,
  Briefcase,
  CheckCircle,
  Send,
  Eye,
  Bookmark,
  Filter,
  X,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react";
import {
  charcoal,
  cyanPro,
  darkSlate,
  deepBlue,
  deepIndigo,
  glassGreen,
  modernGreen,
  oceanBlue,
  oceanBreeze,
  skyBlueGlass,
  steelGray,
} from "../utils/EnhanceButtons.js";

const PropertyNetworkTree = () => {
  const [userRole, setUserRole] = useState("user"); // "owner" or "user"
  const [activeTab, setActiveTab] = useState("all"); // "all", "dealers", "agencies"
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [savedItems, setSavedItems] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [experienceFilter, setExperienceFilter] = useState("all");

  const dealersAndAgencies = [
    {
      id: "d1",
      type: "dealer",
      name: "Rajesh Kumar",
      experience: 8,
      rating: 4.9,
      reviews: 156,
      phone: "+91 98765 43210",
      email: "rajesh@properties.com",
      location: "Mumbai, Maharashtra",
      specialization: "Luxury Apartments",
      totalDeals: 234,
      responseTime: "2 hours",
      verified: true,
      properties: [
        {
          id: "p1",
          name: "Skyline Residency",
          location: "Andheri West",
          type: "Apartment",
          price: "₹1.2 Cr",
          units: 12,
        },
        {
          id: "p2",
          name: "Pearl Heights",
          location: "Bandra East",
          type: "Penthouse",
          price: "₹3.5 Cr",
          units: 5,
        },
        {
          id: "p3",
          name: "Green Valley",
          location: "Powai",
          type: "Villa",
          price: "₹2.8 Cr",
          units: 8,
        },
      ],
    },
    {
      id: "a1",
      type: "agency",
      name: "Prime Properties Group",
      experience: 15,
      rating: 4.8,
      reviews: 423,
      phone: "+91 98765 43211",
      email: "contact@primeproperties.com",
      location: "Delhi NCR",
      specialization: "Commercial & Residential",
      totalDeals: 567,
      responseTime: "1 hour",
      verified: true,
      teamSize: 25,
      properties: [
        {
          id: "p4",
          name: "Corporate Plaza",
          location: "Connaught Place",
          type: "Commercial",
          price: "₹8.5 Cr",
          units: 20,
        },
        {
          id: "p5",
          name: "Garden Homes",
          location: "Gurgaon",
          type: "Apartment",
          price: "₹95 Lakh",
          units: 45,
        },
        {
          id: "p6",
          name: "Tech Park Avenue",
          location: "Noida",
          type: "Office Space",
          price: "₹5.2 Cr",
          units: 15,
        },
        {
          id: "p7",
          name: "Royal Enclave",
          location: "Dwarka",
          type: "Villa",
          price: "₹4.5 Cr",
          units: 6,
        },
      ],
    },
    {
      id: "d2",
      type: "dealer",
      name: "Priya Sharma",
      experience: 12,
      rating: 4.7,
      reviews: 298,
      phone: "+91 98765 43212",
      email: "priya.sharma@realty.com",
      location: "Bangalore, Karnataka",
      specialization: "Premium Villas",
      totalDeals: 189,
      responseTime: "3 hours",
      verified: true,
      properties: [
        {
          id: "p8",
          name: "Emerald Gardens",
          location: "Whitefield",
          type: "Villa",
          price: "₹3.2 Cr",
          units: 10,
        },
        {
          id: "p9",
          name: "Tech Valley Apartments",
          location: "Electronic City",
          type: "Apartment",
          price: "₹85 Lakh",
          units: 30,
        },
      ],
    },
    {
      id: "a2",
      type: "agency",
      name: "Elite Realty Solutions",
      experience: 10,
      rating: 4.9,
      reviews: 512,
      phone: "+91 98765 43213",
      email: "info@eliterealty.com",
      location: "Pune, Maharashtra",
      specialization: "Investment Properties",
      totalDeals: 445,
      responseTime: "1 hour",
      verified: true,
      teamSize: 18,
      properties: [
        {
          id: "p10",
          name: "Riverside Complex",
          location: "Kharadi",
          type: "Apartment",
          price: "₹1.1 Cr",
          units: 25,
        },
        {
          id: "p11",
          name: "Business Hub",
          location: "Hinjewadi",
          type: "Commercial",
          price: "₹6.5 Cr",
          units: 12,
        },
        {
          id: "p12",
          name: "Sunset Villas",
          location: "Baner",
          type: "Villa",
          price: "₹2.9 Cr",
          units: 7,
        },
      ],
    },
    {
      id: "d3",
      type: "dealer",
      name: "Amit Patel",
      experience: 6,
      rating: 4.6,
      reviews: 145,
      phone: "+91 98765 43214",
      email: "amit.patel@homes.com",
      location: "Ahmedabad, Gujarat",
      specialization: "Budget Homes",
      totalDeals: 156,
      responseTime: "4 hours",
      verified: true,
      properties: [
        {
          id: "p13",
          name: "Affordable Heights",
          location: "Maninagar",
          type: "Apartment",
          price: "₹45 Lakh",
          units: 50,
        },
        {
          id: "p14",
          name: "City View Homes",
          location: "Satellite",
          type: "Apartment",
          price: "₹68 Lakh",
          units: 35,
        },
      ],
    },
  ];

  const filteredData = useMemo(() => {
    let filtered = dealersAndAgencies.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.properties.some((prop) =>
          prop.location.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "dealers" && item.type === "dealer") ||
        (activeTab === "agencies" && item.type === "agency");

      const matchesRating = item.rating >= ratingFilter;

      const matchesExperience =
        experienceFilter === "all" ||
        (experienceFilter === "junior" && item.experience <= 5) ||
        (experienceFilter === "mid" &&
          item.experience > 5 &&
          item.experience <= 10) ||
        (experienceFilter === "senior" && item.experience > 10);

      return matchesSearch && matchesTab && matchesRating && matchesExperience;
    });

    return filtered;
  }, [searchTerm, activeTab, ratingFilter, experienceFilter]);

  const toggleExpand = (id) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSave = (id) => {
    setSavedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const stats = {
    totalDealers: dealersAndAgencies.filter((i) => i.type === "dealer").length,
    totalAgencies: dealersAndAgencies.filter((i) => i.type === "agency").length,
    totalProperties: dealersAndAgencies.reduce(
      (sum, item) => sum + item.properties.length,
      0
    ),
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-800/50 border border-gray-800 rounded-lg sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Title and Role Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-300 mb-2">
                Property Network
              </h1>
              <p className="text-gray-600 text-sm">
                Connect with verified dealers and agencies
              </p>
            </div>

            {/* Role Switcher */}
            <div className="flex items-center gap-3 bg-gray-700/50 rounded-xl p-1">
              <button
                onClick={() => setUserRole("user")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  userRole === "user"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                User
              </button>
              <button
                onClick={() => setUserRole("owner")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  userRole === "owner"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Home className="w-4 h-4 inline mr-2" />
                Owner
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, location, or property area..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3.5 text-gray-300 placeholder-gray-300 focus:outline-none focus:placeholder:text-transparent shadow-sm text-xs truncate"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-6 py-3.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-sm ${
                  showFilters
                    ? "bg-blue-600 text-white text-xs"
                    : "bg-gray-700/50 border border-gray-700 text-gray-300 text-xs hover:border-gray-600"
                }`}
              >
                <Filter className="w-3 h-3" />
                <span className="hidden sm:inline text-xs">Filters</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-gray-700/50 border border-gray-700 rounded-xl p-1.5 shadow-sm">
              <button
                onClick={() => setActiveTab("all")}
                className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-xs transition-all duration-200 outline-none ${
                  activeTab === "all"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md truncate"
                    : "text-gray-600 hover:text-gray-900 truncate"
                }`}
              >
                All ({dealersAndAgencies.length})
              </button>
              <button
                onClick={() => setActiveTab("dealers")}
                className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-xs transition-all duration-200 outline-none ${
                  activeTab === "dealers"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md truncate"
                    : "text-gray-600 hover:text-gray-900 truncate"
                }`}
              >
                Dealers ({stats.totalDealers})
              </button>
              <button
                onClick={() => setActiveTab("agencies")}
                className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-xs transition-all duration-200 outline-none ${
                  activeTab === "agencies"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md truncate"
                    : "text-gray-600 hover:text-gray-900 truncate"
                }`}
              >
                Agencies ({stats.totalAgencies})
              </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm animate-in slide-in-from-top duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level
                    </label>
                    <select
                      value={experienceFilter}
                      onChange={(e) => setExperienceFilter(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Levels</option>
                      <option value="junior">Junior (0-5 years)</option>
                      <option value="mid">Mid-level (6-10 years)</option>
                      <option value="senior">Senior (10+ years)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Rating
                    </label>
                    <select
                      value={ratingFilter}
                      onChange={(e) => setRatingFilter(Number(e.target.value))}
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={0}>All Ratings</option>
                      <option value={4.5}>4.5+ Stars</option>
                      <option value={4.0}>4.0+ Stars</option>
                      <option value={3.5}>3.5+ Stars</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setExperienceFilter("all");
                        setRatingFilter(0);
                      }}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg font-medium transition-all"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content - Tree View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredData.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Results Found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="bg-blue-200 rounded-2xl shadow-lg border border-blue-600 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Main Profile Card */}
                <div className="p-6 relative">
                  <div className="md:flex inline-block items-start gap-6 ">
                    {/* Avatar Section */}
                    <div className="relative flex-shrink-0">
                      <div
                        className={`min-w-md md:w-32 h-32 md:min-h-max rounded-xl flex items-center justify-center text-gray-900 text-2xl font-bold shadow-lg ${
                          item.type === "dealer"
                            ? "bg-gradient-to-br from-blue-500 to-blue-600"
                            : "bg-gradient-to-br from-indigo-500 to-indigo-600"
                        }`}
                      >
                        {item.type === "dealer" ? (
                          <Briefcase className="w-10 h-10" />
                        ) : (
                          <Building2 className="w-10 h-10" />
                        )}
                      </div>
                      {item.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 shadow-lg">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 min-w-0 mt-2 md:mt-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-xl font-bold text-gray-900 ">
                              {item.name}
                            </h3>
                          </div>
                          <p className="text-gray-600 font-medium mb-2 truncate">
                            {item.specialization}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {item.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {item.responseTime}
                            </div>
                            {item.type === "agency" && (
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                Team of {item.teamSize}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <button
                          onClick={() => toggleSave(item.id)}
                          className="absolute top-2 right-2 p-2 hover:bg-gray-100 rounded-lg transition-colors outline-none"
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              savedItems.has(item.id)
                                ? "fill-red-500 text-red-500"
                                : "text-gray-400"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Stats Row */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
                          <div className="flex items-center text-blue-600 mb-1">
                            <Star className="w-4 h-4 mr-1 fill-current" />
                            <span className="text-xs font-medium">Rating</span>
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            {item.rating}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.reviews} reviews
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3">
                          <div className="flex items-center text-green-600 mb-1">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            <span className="text-xs font-medium">Deals</span>
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            {item.totalDeals}
                          </p>
                          <p className="text-xs text-gray-500">completed</p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3">
                          <div className="flex items-center text-purple-600 mb-1">
                            <Award className="w-4 h-4 mr-1" />
                            <span className="text-xs font-medium">
                              Experience
                            </span>
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            {item.experience}
                          </p>
                          <p className="text-xs text-gray-500">years</p>
                        </div>

                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3">
                          <div className="flex items-center text-orange-600 mb-1">
                            <Home className="w-4 h-4 mr-1" />
                            <span className="text-xs font-medium">
                              Properties
                            </span>
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            {item.properties.length}
                          </p>
                          <p className="text-xs text-gray-500">available</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        <button className="flex-1 sm:flex-none bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 outline-none">
                          <Phone className="w-4 h-4" />
                          Call
                        </button>

                        {userRole === "owner" ? (
                          <button className="flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 outline-none">
                            <Send className="w-4 h-4" />
                            Send Property
                          </button>
                        ) : (
                          <>
                            <button className="flex-1 sm:flex-none bg-white border border-blue-500 text-blue-600 hover:bg-blue-50 px-6 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 outline-none">
                              <Eye className="w-4 h-4" />
                              Explore
                            </button>
                            <button className="flex-1 sm:flex-none bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 outline-none">
                              <Bookmark className="w-4 h-4" />
                              Save
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => toggleExpand(item.id)}
                          className={`${modernGreen} px-6 py-2.5 focus:outline-none hover:shadow-none gap-1`}
                        >
                          {expandedItems.has(item.id) ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              Hide
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              View
                            </>
                          )}
                          <span className="hidden sm:inline">Properties</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tree Structure - Properties */}
                {expandedItems.has(item.id) && (
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 border-t border-gray-200">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                      <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                        Connected Properties ({item.properties.length})
                      </h4>
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    </div>

                    {/* Tree Visualization */}
                    <div className="relative">
                      {/* Vertical trunk line */}
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-indigo-400"></div>

                      <div className="space-y-4">
                        {item.properties.map((property, index) => (
                          <div key={property.id} className="relative pl-12">
                            {/* Branch line */}
                            <div className="absolute left-6 top-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-400 to-transparent"></div>

                            {/* Branch node */}
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full shadow-md"></div>

                            {/* Property Card */}
                            <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300 group">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
                                      <Home className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                      <h5 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {property.name}
                                      </h5>
                                      <p className="text-xs text-gray-500">
                                        {property.type}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div className="flex items-center gap-2 text-sm">
                                      <MapPin className="w-4 h-4 text-gray-400" />
                                      <span className="text-gray-600 truncate">
                                        {property.location}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                      <Building2 className="w-4 h-4 text-gray-400" />
                                      <span className="text-gray-600">
                                        {property.units} units
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                      {property.price}
                                    </span>

                                    <button
                                      className={`${deepIndigo} px-4 py-2.5`}
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Connect Option for Users */}
                    {userRole === "user" && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-4 text-white">
                          <div className="md:flex inline-block items-center justify-between">
                            <div>
                              <h5 className="font-bold mb-1 truncate">
                                Want to see listed properties?
                              </h5>
                              <p className="text-xs sm:text-sm text-blue-100">
                                Connect with {item.name} to explore their
                                complete portfolio
                              </p>
                            </div>
                            <button
                              className={`${charcoal} mt-4 md:mt-0 px-5 py-2.5 font-medium`}
                            >
                              Connect Now
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800/50 backdrop-blur-xl border-t border-gray-600 rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <CheckCircle className="w-4 h-4 text-green-500" />
              All professionals are RERA Verified and trusted
            </div>
            <div className="text-gray-500">
              Showing {filteredData.length} of {dealersAndAgencies.length}{" "}
              results
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyNetworkTree;
