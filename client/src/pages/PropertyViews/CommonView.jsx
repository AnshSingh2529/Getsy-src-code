import React, { useEffect, useState } from "react";
import {
  Home,
  Building2,
  Users,
  Heart,
  Briefcase,
  MapPin,
  Map,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

const PropertyBrowser = () => {
  const [params] = useSearchParams();
  const [activeMode, setActiveMode] = useState("rent");
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const selectedMode = params.get("mode");
    if (selectedMode) {
      setActiveMode(selectedMode);
    }
  }, [params]);

  const rentCategories = [
    {
      id: 1,
      title: "FOR PG/CO-LIVING",
      icon: <Users className="w-7 h-7 sm:w-8 sm:h-8" />,
      description:
        "Affordable single & sharing occupancy spaces perfect for students and young professionals.",
      color: "from-blue-500 to-cyan-500",
      properties: "2,453+ listings",
    },
    {
      id: 2,
      title: "FOR COUPLES",
      icon: <Heart className="w-7 h-7 sm:w-8 sm:h-8" />,
      description:
        "Cozy apartments and homes ideal for couples starting their journey.",
      color: "from-pink-500 to-rose-500",
      properties: "1,832+ listings",
    },
    {
      id: 3,
      title: "FOR FAMILY",
      icon: <Home className="w-7 h-7 sm:w-8 sm:h-8" />,
      description: "Spacious family homes with all essential amenities.",
      color: "from-emerald-500 to-teal-500",
      properties: "3,621+ listings",
    },
    {
      id: 4,
      title: "OFFICE SPACES ",
      icon: <Briefcase className="w-7 h-7 sm:w-8 sm:h-8" />,
      description:
        "Office spaces, retail shops, and commercial properties for your business.",
      color: "from-violet-500 to-purple-500",
      properties: "987+ listings",
    },
    {
      id: 5,
      title: "INDEPENDENT HOUSE/VILLA",
      icon: <Home className="w-7 h-7 sm:w-8 sm:h-8" />,
      description: "Spacious independent houses and villas with all essential amenities.",
      color: "from-emerald-500 to-teal-500",
      properties: "3,621+ listings",
    },
    {
      id: 6,
      title: "1RK/STUDIO APARTMENT",
      icon: <Briefcase className="w-7 h-7 sm:w-8 sm:h-8" />,
      description:
        "Compact and efficient living spaces designed for modern lifestyles.",
      color: "from-violet-500 to-purple-500",
      properties: "987+ listings",
    },
    {
      id: 7,
      title: "SERVICE APARTMENT",
      icon: <Home className="w-7 h-7 sm:w-8 sm:h-8" />,
      description: "Spacious service apartments with all essential amenities.",
      color: "from-emerald-500 to-teal-500",
      properties: "3,621+ listings",
    },
    {
      id: 8,
      title: "FARM HOUSE",
      icon: <Briefcase className="w-7 h-7 sm:w-8 sm:h-8" />,
      description:
        "Charming farmhouses with vast open spaces and rustic appeal.",
      color: "from-violet-500 to-purple-500",
      properties: "987+ listings",
    },
  ];

  const buyCategories = [
    {
      id: 1,
      title: "Residential",
      icon: <Home className="w-7 h-7 sm:w-8 sm:h-8" />,
      description: "Houses, apartments, and villas for your dream home.",
      color: "from-orange-500 to-amber-500",
      properties: "4,234+ listings",
    },
    {
      id: 2,
      title: "Commercial",
      icon: <Building2 className="w-7 h-7 sm:w-8 sm:h-8" />,
      description: "Investment opportunities in commercial real estate.",
      color: "from-indigo-500 to-blue-500",
      properties: "1,543+ listings",
    },
    {
      id: 3,
      title: "Plot/Land",
      icon: <Map className="w-7 h-7 sm:w-8 sm:h-8" />,
      description: "Vacant plots and land ready for development.",
      color: "from-green-500 to-emerald-500",
      properties: "2,876+ listings",
    },
  ];

  const categories = activeMode === "buy" ? buyCategories : rentCategories;

  const handleCardClick = (category) => {
    alert(`Opening ${category.title} page...`);
  };

  return (
    <div className="min-h-screen text-gray-200">
      {/* Header */}
      <div className="border-b border-gray-800/50  px-5 sm:px-10 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-1">
            {activeMode === "rent"
              ? "Browse Rental Properties"
              : "Browse Properties for Sale"}
          </h2>
          <p className="text-sm text-gray-500">
            Select a category to explore available properties.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-lime-500" />
          <span className="border border-gray-700 bg-gray-800/60 px-3 py-1.5 rounded-md text-xs sm:text-sm truncate">
            Location
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(category)}
              className={`group relative bg-gray-800/40 border border-gray-700/70 rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                hoveredCard === category.id ? "scale-[1.02]" : ""
              }`}
              style={{
                animationDelay: `${index * 120}ms`,
                animation: "fadeInUp 0.5s ease-out forwards",
                opacity: 0,
              }}
            >
              {/* Background Hover Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative p-5 sm:p-6 flex flex-col h-full">
                <div className="flex items-center gap-5 mb-4">
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {category.title}
                  </h3>
                </div>

                <p className="text-gray-400 text-sm sm:text-base flex-1 mb-4 leading-relaxed">
                  {category.description}
                </p>

                <div className="flex items-center justify-between">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${category.color} text-white`}
                  >
                    {category.properties}
                  </span>

                  <div className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                    <svg
                      className="w-4 h-4 text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div
                className={`h-1 bg-gradient-to-r ${category.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PropertyBrowser;
