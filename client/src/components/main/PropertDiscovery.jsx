import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  Key,
  FileText,
  Users,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PropertyDiscovery = () => {
  const [activeMode, setActiveMode] = useState("rent");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const autoSlideInterval = useRef(null);

  const modes = [
    { id: "rent", label: "Rent", icon: Home },
    { id: "buy", label: "Buy", icon: Key },
    { id: "lease", label: "Lease", icon: FileText },
    { id: "bachelor-students", label: "Bachelor / Student", icon: Users },
  ];

  const propertyCards = {
    rent: [
      {
        icon: Home,
        title: "Family Apartments",
        description: "Spacious rentals perfect for families",
        count: 2847,
        gradient: "from-blue-500 to-cyan-500",
        category: "family",
      },
      {
        icon: Users,
        title: "Shared Spaces",
        description: "Co-living options with amenities",
        count: 1523,
        gradient: "from-purple-500 to-pink-500",
        category: "shared",
      },
      {
        icon: Key,
        title: "Luxury Rentals",
        description: "Premium properties with modern features",
        count: 892,
        gradient: "from-amber-500 to-orange-500",
        category: "luxury",
      },
      {
        icon: Home,
        title: "Studio Living",
        description: "Compact, efficient urban spaces",
        count: 1654,
        gradient: "from-green-500 to-teal-500",
        category: "studio",
      },
    ],
    buy: [
      {
        icon: Home,
        title: "Residential Homes",
        description: "Own your dream family home",
        count: 3421,
        gradient: "from-blue-500 to-indigo-500",
        category: "residential",
      },
      {
        icon: Key,
        title: "Investment Properties",
        description: "High-value real estate opportunities",
        count: 987,
        gradient: "from-violet-500 to-purple-500",
        category: "investment",
      },
      {
        icon: FileText,
        title: "New Developments",
        description: "Pre-launch and under-construction projects",
        count: 564,
        gradient: "from-rose-500 to-pink-500",
        category: "new",
      },
      {
        icon: Home,
        title: "Villas & Plots",
        description: "Premium land and villa options",
        count: 1289,
        gradient: "from-emerald-500 to-green-500",
        category: "villas",
      },
    ],
    lease: [
      {
        icon: FileText,
        title: "Commercial Spaces",
        description: "Office and retail lease options",
        count: 1876,
        gradient: "from-cyan-500 to-blue-500",
        category: "commercial",
      },
      {
        icon: Home,
        title: "Long-term Rentals",
        description: "Multi-year residential leases",
        count: 2341,
        gradient: "from-indigo-500 to-purple-500",
        category: "longterm",
      },
      {
        icon: Key,
        title: "Flex Workspaces",
        description: "Modern co-working lease agreements",
        count: 756,
        gradient: "from-orange-500 to-red-500",
        category: "flex",
      },
      {
        icon: Users,
        title: "Corporate Housing",
        description: "Furnished properties for businesses",
        count: 1432,
        gradient: "from-teal-500 to-cyan-500",
        category: "corporate",
      },
    ],
    "bachelor-students": [
      {
        icon: Users,
        title: "Student Housing",
        description: "Budget-friendly near universities",
        count: 1967,
        gradient: "from-blue-500 to-cyan-500",
        category: "student",
      },
      {
        icon: Home,
        title: "Bachelor Pads",
        description: "Single occupancy affordable units",
        count: 2134,
        gradient: "from-purple-500 to-pink-500",
        category: "bachelor",
      },
      {
        icon: Key,
        title: "PG & Hostels",
        description: "Paying guest accommodations",
        count: 3421,
        gradient: "from-green-500 to-emerald-500",
        category: "pg",
      },
      {
        icon: Users,
        title: "Shared Rooms",
        description: "Cost-effective roommate options",
        count: 1789,
        gradient: "from-amber-500 to-orange-500",
        category: "shared-rooms",
      },
    ],
  };

  const currentCards = propertyCards[activeMode] || [];
  const maxSlide = Math.max(0, currentCards.length - 1);

  useEffect(() => {
    if (!isPaused && currentCards.length > 1) {
      autoSlideInterval.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % currentCards.length);
      }, 4000);
    }
    return () => clearInterval(autoSlideInterval.current);
  }, [isPaused, currentCards.length, activeMode]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [activeMode]);

  const handleModeChange = (modeId) => {
    setActiveMode(modeId);
    window.history.pushState({}, "", `?mode=${modeId}`);
  };

  const handleCardClick = (category) => {
    window.location.href = `/properties?mode=${activeMode}&type=${category}`;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Top Slider Menu Bar */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            {modes.map((mode) => {
              const Icon = mode.icon;
              const isActive = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => handleModeChange(mode.id)}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap
                    transition-all duration-300 ease-out font-medium text-sm
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                        : "bg-white text-slate-700 hover:bg-slate-50 hover:shadow-md border border-slate-200"
                    }
                  `}
                >
                  <Icon
                    className={`w-4 h-4 ${isActive ? "animate-pulse" : ""}`}
                  />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Discover Your Perfect Space
          </h1>
          <p className="text-lg text-slate-600">
            Explore curated property categories tailored to your needs
          </p>
        </div>

        {/* Common View Cards Container */}
        <div
          className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/60"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          {currentSlide > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {currentSlide < maxSlide && (
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Cards Carousel */}
          <div className="overflow-hidden" ref={carouselRef}>
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {currentCards.map((card, index) => {
                const CardIcon = card.icon;
                return (
                  <div key={index} className="w-full flex-shrink-0 px-2">
                    <div
                      onClick={() => handleCardClick(card.category)}
                      className="group cursor-pointer bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 border border-slate-200/60 hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1"
                    >
                      {/* Icon Container */}
                      <div
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
                      >
                        <CardIcon className="w-10 h-10 text-white" />
                      </div>

                      {/* Content */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                            {card.title}
                          </h3>
                          <p className="text-slate-600 text-base leading-relaxed">
                            {card.description}
                          </p>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                              {card.count.toLocaleString()}
                            </span>
                            <span className="text-sm text-slate-500">
                              listings
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-4 transition-all duration-300">
                            <span className="text-sm">Explore</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {currentCards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-gradient-to-r from-blue-600 to-indigo-600"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Verified Listings", value: "10K+" },
            { label: "Happy Customers", value: "5K+" },
            { label: "Cities Covered", value: "50+" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/60 text-center shadow-lg"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyDiscovery;
