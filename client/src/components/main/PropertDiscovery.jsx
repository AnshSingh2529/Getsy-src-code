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
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
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

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < maxSlide) {
      nextSlide();
    }
    if (isRightSwipe && currentSlide > 0) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 sm:max-w-full sm:mx-auto lg:max-w-max w-full max-w-7xl mx-auto">
      <div className="lg:p-0 mx-auto">
        {/* Top Slider Menu Bar */}
        <div className="mb-2 sm:mb-1 lg:mb-2 mx-auto p-0">
          <div className="backdrop-blur-xl bg-gray-800/10 rounded-2xl sm:rounded-2xl border border-slate-700/60 shadow-lg py-2 mx-auto">
            <div className="flex items-center justify-center gap-x-2 gap-y-3 overflow-x-auto scrollbar-hide">
              {modes.map((mode) => {
                const Icon = mode.icon;
                const isActive = activeMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => handleModeChange(mode.id)}
                    className={`
                      flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-4 lg:px-2 py-1 sm:py-1.5 lg:py-1 rounded-lg whitespace-nowrap
                      transition-all duration-300 ease-out font-medium text-xs sm:text-sm
                      ${
                        isActive
                          ? "bg-gradient-to-r from-blue-800 to-blue-950 text-white shadow-blue-950 shadow-inner scale-100 focus:outline-none outline-none"
                          : "text-slate-500 hover:bg-slate-800 hover:shadow-md border border-slate-600/20 hover:text-gray-300"
                      }
                    `}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                        isActive ? "animate-pulse" : ""
                      }`}
                    />
                    <span className="hidden xs:inline sm:inline">
                      {mode.label}
                    </span>
                    <span className="xs:hidden sm:hidden">
                      {mode.label.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {/* Common View Cards Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Arrows - Hidden on mobile, visible on tablet+ */}
          {currentSlide > 0 && (
            <button
              onClick={prevSlide}
              className="hidden sm:flex absolute left-1 lg:left-2/3 top-10 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white shadow-lg items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
          )}

          {currentSlide < maxSlide && (
            <button
              onClick={nextSlide}
              className="hidden sm:flex absolute right-1 lg:right-3/2 top-10 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white shadow-lg items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
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
                  <div
                    key={index}
                    className="w-full flex-shrink-0 px-1 sm:px-2"
                  >
                    <div
                      onClick={() => handleCardClick(card.category)}
                      className="group cursor-pointer bg-gradient-to-br from-blue-950 to-slate-500 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-4  transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1"
                    >
                      {/* Icon Container */}
                      <div
                        className={`w-12 h-12 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-3 sm:mb-2 lg:mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
                      >
                        <CardIcon className="w-3 h-3 sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-white" />
                      </div>

                      {/* Content */}
                      <div className="space-y-3 sm:space-y-4">
                        <div>
                          <h3 className="text-lg sm:text-lg lg:text-xl font-bold text-gray-300 mb-1.5 sm:mb-2 group-hover:text-gray-400 transition-colors duration-300">
                            {card.title}
                          </h3>
                          <p className="text-slate-300 text-xs sm:text-xs lg:text-xs leading-relaxed">
                            {card.description}
                          </p>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-800/70 rounded-xl">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold bg-blue-100 text-blue-700">
                              {card.count.toLocaleString()}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-300">
                              listings
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 sm:gap-2 text-blue-950 font-medium group-hover:gap-3 sm:group-hover:gap-4 transition-all duration-300">
                            <span className="text-xs sm:text-sm">Explore</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
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
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
            {currentCards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-6 sm:w-8 bg-gradient-to-r from-gray-600 to-indigo-800"
                    : "w-1.5 sm:w-2 bg-slate-500 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDiscovery;
