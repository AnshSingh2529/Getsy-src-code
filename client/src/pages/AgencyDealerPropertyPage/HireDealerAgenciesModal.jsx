import React, { useState } from "react";
import Navbar from "./Navbar";
import ProfileSection from "./ProfileSection";
import PropertySection from "./PropertySection";
import { motion, spring } from "framer-motion";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  ArrowUpRightFromCircleIcon,
} from "lucide-react";

function HireDealerAgenciesModal() {
  const [activeFilter, setActiveFilter] = useState("premium");

  const borderClass =
    activeFilter === "premium"
      ? "border-yellow-800"
      : activeFilter === "gFeatured"
      ? "border-green-800"
      : "border-gray-700";

  return (
    <div className="relative">
      <Navbar />
      <div className="relative m-0">
        <div className="flex">
          <button
            onClick={() => setActiveFilter("premium")}
            className={`absolute -top-2.5 left-[25%] px-3 py-[1px] text-xs rounded-sm font-semibold border-t border-r border-l transition-all bg-yellow-800/40 outline-none
            ${
              activeFilter === "premium"
                ? "border-yellow-600 text-yellow-600"
                : "border-gray-700/50 text-gray-400"
            }`}
          >
            Premium
          </button>

          <button
            onClick={() => setActiveFilter("gFeatured")}
            className={`absolute -top-2.5 left-[32%] px-3 py-[1px] text-xs rounded-sm font-semibold border-t border-r border-l transition-all bg-green-800/40 outline-none
            ${
              activeFilter === "gFeatured"
                ? "border-green-600 text-green-600"
                : "border-gray-700/50 text-gray-400"
            }`}
          >
            G-Featured
          </button>
          <motion.button
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.92 }}
            className="absolute flex items-center justify-center space-x-2 z-30 -top-2 right-4 px-4 py-2 text-xs rounded-xl font-semibold border transition-all bg-blue-700 outline-none text-white"
          >
            <p>Visit Page</p>
            <ArrowUpRightFromCircleIcon width={14} height={14} />
          </motion.button>
        </div>

        {/* Agencies Portfolio Container */}
        <div
          className={`relative flex flex-1 items-center justify-stretch m-2 p-1 border-2 rounded-xl transition-all ${borderClass} h-full overflow-auto space-x-0.5`}
        >
          {/* Profile Showing section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.12 }}
            className="w-[30%] rounded-xl bg-gray-950/20 p-2 min-h-screen overflow-hidden"
          >
            <ProfileSection />
          </motion.div>
          {/* Propert and trusted partner showing section */}
          <div className="w-[70%] rounded-xl bg-gray-950/20 p-2 min-h-screen overflow-auto">
            <PropertySection />
          </div>
        </div>
      </div>
      {/* left prev CTA */}
      <motion.button
        whileHover={{ scale: 0.98 }}
        whileTap={{ scale: 0.92 }}
        className="fixed flex items-center justify-center space-x-2 z-30 bottom-5 left-4 px-4 py-2 text-xs rounded-xl font-semibold border transition-all bg-zinc-600/40 outline-none text-gray-400"
      >
        <ArrowLeftCircleIcon width={14} height={14} />
        <p>Prev</p>
      </motion.button>
      {/* Bottom NavBar */}
      <div className="fixed right-1/2 bottom-4 bg-gray-[#131515] border border-gray-800/40 px-3 py-2 flex flex-1 items-center justify-between rounded-md">
        Bottom Navigation Bar
      </div>
      {/* Right next CTA  */}
      <motion.button
        whileHover={{ scale: 0.98 }}
        whileTap={{ scale: 0.92 }}
        className="fixed flex items-center justify-center space-x-2 z-30 bottom-5 right-4 px-4 py-2 text-xs rounded-xl font-semibold border transition-all bg-zinc-800/20 outline-none text-white"
      >
        <p>Next</p>
        <ArrowRightCircleIcon width={14} height={14} />
      </motion.button>
    </div>
  );
}

export default HireDealerAgenciesModal;
