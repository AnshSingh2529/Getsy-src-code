// src/components/common/SearchBar.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPinHouse, Search } from "lucide-react";
// local imports...
import TenantRequestForm from "../../modalForms/tenants/TenantRequestForm.jsx";
import AutoExpandingTextarea from "../../utils/AutoExpandingTextArea.jsx";
import { skyBlueGlass } from "../../utils/EnhanceButtons.js";

const SearchBar = ({
  onSearch,
  placeholder = "Search properties, areas or budgets...",
  variant = "default", // "default" | "compact"
  showNearby = true,
}) => {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [searchText, setSearchText] = useState("");

  const handleCurrentLocationSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setOpen(true);
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to retrieve your location.");
          setOpen(false);
        }
      );
    } else {
      alert("Geolocation not supported by your browser.");
    }
  };

  const handleSearch = () => {
    if (onSearch) onSearch(searchText);
  };

  const compact = variant === "compact";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`md:flex items-center justify-center gap-2 ${
        compact ? "p-0" : "p-2"
      }`}
    >
      {showNearby && (
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleCurrentLocationSearch}
          className={`flex items-center gap-2 ${
            compact
              ? "px-3 py-1.5 text-sm bg-gray-700/60 rounded-full border border-gray-600 hover:border-gray-400 transition"
              : skyBlueGlass
          }`}
        >
          {compact && (
            <div className="flex justify-between items-center space-x-2">
              {" "}
              <MapPinHouse size={compact ? 18 : 22} color="limegreen" />{" "}
              <span className="font-medium text-gray-300">Nearby</span>
            </div>
          )}

          {!compact && (
            <span className="text-gray-300 font-medium truncate">
              Search Nearby
            </span>
          )}
        </motion.button>
      )}

      <TenantRequestForm
        isOpen={open}
        onClose={() => setOpen(false)}
        location={location}
      />

      {/* Search box */}
      <div
        className={`flex items-center ${
          compact ? "px-2 py-1" : "pl-3 pr-1 py-1.5"
        } bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-600 hover:border-gray-500 transition-all duration-300 w-full`}
      >
        <AutoExpandingTextarea
          placeholder={placeholder}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={`bg-transparent outline-none text-gray-200 resize-none ${
            compact ? "text-sm" : "text-base"
          }`}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleSearch}
          className={`flex items-center justify-center ${
            compact
              ? "p-2 bg-blue-700/70 hover:bg-blue-600 rounded-full"
              : "p-4 bg-gradient-to-br from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-gray-100 rounded-full shadow-lg"
          } transition-all duration-300 ring-1 ring-blue-500/40 hover:ring-blue-400/60`}
        >
          <Search size={compact ? 18 : 22} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SearchBar;
