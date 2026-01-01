import { motion } from "framer-motion";
import { useState } from "react";
import { Filter, Home, DollarSign, Star } from "lucide-react";
// local imports...
import SearchBar from "../../components/header/SearchBar.jsx";
import PropertyModeSelector from "./PropertyModeSelector.jsx";

const SearchCard = ({ onFiltersChange, currentFilters }) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [pincode, setPincode] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(true);
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [bedrooms, setBedrooms] = useState("any");
  const [amenities, setAmenities] = useState([]);

  // Handle search submission
  const handleSearch = () => {
    console.log({
      location: searchLocation,
      pincode,
      propertyType,
      priceRange,
      bedrooms,
      amenities,
    });
  };

  const [open, setOpen] = useState(false);

  // Clear all filters
  const clearFilters = () => {
    setSearchLocation("");
    setPincode("");
    setPropertyType("all");
    setPriceRange([0, 100000]);
    setBedrooms("any");
    setAmenities([]);
  };

  // Toggle amenities
  const toggleAmenity = (amenity) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col h-auto w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden xl:mb-20 overflow-y-auto scrollbar-hide"
    >
      {/* Header Section with Banner */}

      {/* Search Content */}
      <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Main Search Bar */}
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Advanced Filters Section */}
      <div className="border-t border-gray-700">
        <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Quick Actions */}
          <motion.div
            variants={itemVariants}
            className="border-b border-gray-700/50 pb-4"
          >
            <h3 className="text-white font-medium text-sm sm:text-base mb-4">
              Quick Search
            </h3>
            <PropertyModeSelector />
          </motion.div>

          {/* divider */}
          <motion.div variants={itemVariants}>
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
            >
              <Filter className="w-4 h-4" />
              Advanced Filters
              <motion.div
                animate={{ rotate: showAdvancedFilters ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.div>
            </button>
          </motion.div>

          {/* Advanced Filters */}
          <motion.div
            initial={false}
            animate={{
              height: showAdvancedFilters ? "auto" : 0,
              opacity: showAdvancedFilters ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-4 sm:space-y-6 pt-2">
              {/* Property Type */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-white font-medium text-sm sm:text-base">
                  <Home className="w-4 h-4" />
                  Property Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {["all", "apartment", "house", "villa", "office", "shop"].map(
                    (type) => (
                      <button
                        key={type}
                        onClick={() => setPropertyType(type)}
                        className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                          propertyType === type
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600"
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-white font-medium text-sm sm:text-base">
                  <DollarSign className="w-4 h-4" />
                  Price Range (₹)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={priceRange[0] || ""}
                    onChange={(e) =>
                      setPriceRange([
                        parseInt(e.target.value) || 0,
                        priceRange[1],
                      ])
                    }
                    className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-600 hover:border-gray-500 focus:border-blue-500 outline-none text-white placeholder-gray-400 text-sm sm:text-base transition-all duration-300"
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={priceRange[1] || ""}
                    onChange={(e) =>
                      setPriceRange([
                        priceRange[0],
                        parseInt(e.target.value) || 100000,
                      ])
                    }
                    className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-600 hover:border-gray-500 focus:border-blue-500 outline-none text-white placeholder-gray-400 text-sm sm:text-base transition-all duration-300"
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div className="space-y-3">
                <label className="text-white font-medium text-sm sm:text-base">
                  Bedrooms
                </label>
                <div className="flex flex-wrap gap-2">
                  {["any", "1", "2", "3", "4", "5+"].map((room) => (
                    <button
                      key={room}
                      onClick={() => setBedrooms(room)}
                      className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        bedrooms === room
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                          : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600"
                      }`}
                    >
                      {room === "any" ? "Any" : room}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-white font-medium text-sm sm:text-base">
                  <Star className="w-4 h-4" />
                  Amenities
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    "Parking",
                    "Swimming Pool",
                    "Gym",
                    "Garden",
                    "Security",
                    "Elevator",
                  ].map((amenity) => (
                    <button
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                        amenities.includes(amenity)
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                          : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600"
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <div className="flex justify-center pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={clearFilters}
                  className="px-6 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-gray-300 hover:text-white font-medium text-sm transition-all duration-300 border border-gray-600"
                >
                  Clear All Filters
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
        <div>
          {/* Footer Stats */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 sm:p-6 border-t border-gray-600"
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg sm:text-xl font-bold text-white">
                  50K+
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  Properties
                </div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-white">
                  500+
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  Locations
                </div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-white">
                  24/7
                </div>
                <div className="text-xs sm:text-sm text-gray-400">Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchCard;
