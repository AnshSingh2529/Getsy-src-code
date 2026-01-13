import React, { useState } from "react";

import TenantRequestForm from "../../../modalForms/tenants/TenantRequestForm";
import { MapPinHouse, Search } from "lucide-react";
import { motion } from "framer-motion";
import { skyBlueGlass } from "../../../utils/EnhanceButtons";

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
        }
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
          className={`lg:flex items-center justify-center gap-2 ${
            compact
              ? "px-5 py-5 text-sm bg-gray-700/60 rounded-md border border-gray-600 hover:border-gray-500 transition w-full"
              : skyBlueGlass
          }`}
        >
          {compact && (
            <div className="flex justify-between items-center">
              {" "}
              <MapPinHouse size={compact ? 16 : 18} color="limegreen" />{" "}
            </div>
          )}

          {!compact && (
            <span className="text-gray-300 font-medium truncate flex items-center space-x-2">
              <MapPinHouse size={compact ? 16 : 18} color="limegreen" />{" "}
              <p>Nearby</p>
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
