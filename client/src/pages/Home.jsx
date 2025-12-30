import { useNavigate } from "react-router-dom";
import SearchCard from "../components/cards/others/SearchCard.jsx";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import textImage from "../assets/images/getsy-banner.svg";
import { useAuth } from "../features/auth/hooks.js";
import {
  Bookmark,
  Bell,
  X,
  TrendingUp,
  Zap,
  Calendar,
  Home,
  Award,
  Users,
  Building,
  CheckCircle,
  Building2,
  Briefcase,
} from "lucide-react";


const HomePage = ({ properties }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showNotification, setShowNotification] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    propertyType: "",
    location: "",
    minRating: 4.0,
  });
  const [savedSearches, setSavedSearches] = useState([
    {
      id: 1,
      name: "3BHK in Gomti Nagar",
      filters: { bedrooms: 3, location: "Gomti Nagar" },
    },
    { id: 2, name: "Budget Apartments", filters: { maxPrice: "30000" } },
  ]);

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };
   const onlyUser = ["user"]
   const canBecomeAgencyDealer = onlyUser.includes(user?.role)
  return (
    <div className="h-full w-full bg-[#131515] overflow-y-auto m-0 p-4">
      {/* Desktop Layout - Two Column Split Screen */}
      <div className="hidden lg:flex lg:h-screen lg:overflow-hidden">
        {/* Right Section - Banner (Fixed, Centered) */}
        <div className="flex-1 h-full flex justify-center bg-[#131515] overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl w-full flex flex-col items-center text-center space-y-6"
          >
            {/* Banner Image */}
            <motion.img
              initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-md h-auto object-contain"
              src={textImage}
              alt="Getsy Banner"
            />

            {/* Title & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              {/* Register your Agency or Become a Dealer Buttons */}
              {canBecomeAgencyDealer && (
                <div className="flex flex-wrap gap-3">
                  {/* Register Agency Button */}
                  <button className="group relative px-6 py-4 bg-gradient-to-r from-green-800  text-white font-semibold rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-emerald-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-900  opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-3">
                      <Building2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      <span>Register Your Agency</span>
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </button>

                  {/* Become a Dealer Button */}
                  <button className="group relative px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 opacity-10">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)",
                        }}
                      ></div>
                    </div>
                    <div className="relative flex items-center gap-3">
                      <Briefcase className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      <span>Become a Dealer</span>
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </button>
                </div>
              )}
              <p className="text-lg text-gray-600 max-w-md mx-auto leading-loose">
                Search for thousands of VERIFIED AGENTS in your area in just a{" "}
                <span className="bg-blue-400 text-white rounded-md p-1 text-lg font-sans">
                  few clicks
                </span>
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Left Section - Advanced Search (Scrollable) */}
        <div className="w-full lg:w-2/5 xl:w-1/2 h-full bg-[#131515]">
          <div className="h-full overflow-y-auto scrollbar-hide">
            <div className="p-6 space-y-6 pb-24">
              {/* Search Card */}
              <SearchCard
                onFiltersChange={setSearchFilters}
                currentFilters={searchFilters}
              />

              {/* Saved Searches Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-blue-400" />
                    Saved Searches
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    + Save Current
                  </motion.button>
                </div>
                <div className="space-y-2">
                  {savedSearches.map((search) => (
                    <motion.div
                      key={search.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-700/50 rounded-lg p-3 border border-gray-600 hover:border-blue-500/30 transition-all cursor-pointer"
                      onClick={() => setSearchFilters(search.filters)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm font-medium">
                          {search.name}
                        </span>
                        <div className="flex items-center gap-1">
                          <Bell className="w-3 h-3 text-gray-400" />
                          <button className="text-gray-400 hover:text-red-400 transition-colors">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {Object.entries(search.filters)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(", ")}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Market Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
              >
                <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  Market Insights
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">
                      Avg. Rent (3BHK)
                    </span>
                    <span className="text-white font-medium">₹42,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Price Trend</span>
                    <span className="text-green-400 font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +5.2%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Hot Locations</span>
                    <span className="text-blue-400 font-medium">
                      Gomti Nagar
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
              >
                <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-lg p-3 text-blue-400 hover:text-blue-300 transition-all flex flex-col items-center gap-2"
                  >
                    <Home className="w-5 h-5" />
                    <span className="text-xs">New Listings</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/30 rounded-lg p-3 text-green-400 hover:text-green-300 transition-all flex flex-col items-center gap-2"
                  >
                    <Award className="w-5 h-5" />
                    <span className="text-xs">Top Rated</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 border border-purple-500/30 rounded-lg p-3 text-purple-400 hover:text-purple-300 transition-all flex flex-col items-center gap-2"
                  >
                    <Users className="w-5 h-5" />
                    <span className="text-xs">Most Viewed</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-orange-600/20 to-orange-500/20 border border-orange-500/30 rounded-lg p-3 text-orange-400 hover:text-orange-300 transition-all flex flex-col items-center gap-2"
                  >
                    <Building className="w-5 h-5" />
                    <span className="text-xs">Luxury</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
              >
                <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  Recent Activity
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300 flex-1">
                      New property added in Gomti Nagar
                    </span>
                    <span className="text-gray-500 text-xs">2h ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300 flex-1">
                      Price reduced for Villa in Hazratganj
                    </span>
                    <span className="text-gray-500 text-xs">4h ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300 flex-1">
                      High interest property in Aliganj
                    </span>
                    <span className="text-gray-500 text-xs">6h ago</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Stacked Sections */}
      <div className="lg:hidden">
        {/* Mobile Banner Section */}
        <div className="bg-[#131515] px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-xs mx-auto h-auto object-contain"
              src={textImage}
              alt="Getsy Banner"
            />
          </motion.div>
                        {/* Register your Agency or Become a Dealer Buttons */}
              {canBecomeAgencyDealer && (
                <div className="flex flex-wrap gap-3 mt-8">
                  {/* Register Agency Button */}
                  <button className="group relative px-4 py-2 bg-gradient-to-r from-green-800  text-white font-semibold rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-emerald-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-900  opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-3">
                      <Building2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      <span>Register Your Agency</span>
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </button>

                  {/* Become a Dealer Button */}
                  <button className="group relative px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 opacity-10">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)",
                        }}
                      ></div>
                    </div>
                    <div className="relative flex items-center gap-3">
                      <Briefcase className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      <span>Become a Dealer</span>
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </button>
                </div>
              )}
        </div>
        {/* Mobile Search Section */}
        <div className="p-4 sm:p-6 space-y-4">
          <SearchCard
            onFiltersChange={setSearchFilters}
            currentFilters={searchFilters}
            compact
          />
        </div>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-4 rounded-lg shadow-2xl border border-green-400 flex items-center gap-3 max-w-sm"
          >
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold">Contact Request Sent!</p>
              <p className="text-sm opacity-90">We'll get back to you soon.</p>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
