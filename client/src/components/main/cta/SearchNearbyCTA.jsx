import React, { useState } from "react";

import TenantRequestForm from "../../../modalForms/tenants/TenantRequestForm";
import { motion } from "framer-motion";
import { skyBlueGlass } from "../../../utils/EnhanceButtons";
import voice_icon from "../../../assets/images/voice_icon.png";

function SearchNearbyCTA({ showNearby = true, variant = "default" }) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(null);

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
        },
      );
    } else {
      alert("Geolocation not supported by your browser.");
    }
  };

  const compact = variant === "compact";

  return (
    <div>
      {" "}
      {showNearby && (
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleCurrentLocationSearch}
          className={` lg:flex items-center justify-center gap-2 ${
            compact
              ? "px-1 py-1 h-full text-sm bg-gray-700/60 rounded-md border border-gray-600 hover:border-gray-500 transition w-full"
              : skyBlueGlass
          }`}
        >
          {compact && (
            <div className="">
              {" "}
              <img
                src={voice_icon}
                alt="ai_search"
                className="w-12 h-10 object-cover brightness-100"
              />
            </div>
          )}

          {!compact && (
            <span className="text-blue-300 font-medium flex items-center justify-center text-xs px-2">
              <img
                src={voice_icon}
                alt="ai_search"
                className="w-10 h-8 object-cover brightness-100"
              />
              <p>Search</p>
            </span>
          )}
        </motion.button>
      )}
      <TenantRequestForm
        isOpen={open}
        onClose={() => setOpen(false)}
        location={location}
      />
    </div>
  );
}

export default SearchNearbyCTA;
