import React, { useState } from "react";
import Navbar from "./Navbar";
import ProfileSection from "./ProfileSection";
import PropertySection from "./PropertySection";
import { motion, spring } from "framer-motion";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  ArrowUpRightFromCircleIcon,
  LucideStars,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function HireDealerAgenciesModal() {
  const [activeFilter, setActiveFilter] = useState("premium");

  const [propertyType, setPropertyType] = useState("rent");

  const borderClass =
    activeFilter === "premium"
      ? "border-yellow-800"
      : activeFilter === "gFeatured"
        ? "border-green-800"
        : "border-gray-700";

  return (
    <div>
      <Navbar />
      <div className="relative m-0">
        <div className="flex">
          <button
            onClick={() => setActiveFilter("premium")}
            className={`absolute -top-2.5 left-[5%] px-3 py-[1px] text-xs rounded-sm font-semibold border-t border-r border-l transition-all bg-yellow-800/40 outline-none
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
            className={`absolute -top-2.5 left-[13%] px-3 py-[1px] text-xs rounded-sm font-semibold border-t border-r border-l transition-all bg-green-800/40 outline-none
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
      </div>

      {/* Agencies Portfolio Container */}
      <div
        className=" sticky
      top-[100px] 
      left-0
      right-0
      bottom-0
      overflow-y-hidden
      scrollbar-hide
      "
      >
        <div
          className={`relative flex flex-1 m-2 border-2 rounded-xl transition-all ${borderClass} space-x-0.5
            `}
        >
          {/* Profile Showing section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.12 }}
            className="w-[30%] rounded-xl bg-gray-950/20 p-2 min-h-screen overflow-y-auto scrollbar-hide"
          >
            <ProfileSection />
          </motion.div>
          {/* Propert and trusted partner showing section */}
          <div className="w-[70%] rounded-xl bg-gray-950/20">
            {/* Top Area */}
            <div className="flex items-center justify-start w-full p-2 gap-x-4">
              {/* Trusted Partners */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="
    group relative inline-flex items-center gap-2
    px-4 py-2
    rounded-lg
    text-xs font-semibold tracking-wide
    text-cyan-200
    bg-gradient-to-r from-slate-900 via-cyan-900/40 to-slate-900
    border border-cyan-600/50
    shadow-md
    hover:shadow-cyan-500/30
    transition-all
  "
              >
                {/* Left trust marker */}
                <span className="flex items-center justify-center w-5 h-5 rounded-md bg-cyan-800/40 border border-cyan-600/40">
                  <svg
                    className="w-3 h-3 text-cyan-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l7 4v6c0 5-3.5 9.5-7 10-3.5-.5-7-5-7-10V6l7-4z" />
                  </svg>
                </span>

                <span>Trusted Partners</span>

                {/* Right arrow = opens something */}
                <svg
                  className="w-3 h-3 text-cyan-400 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>

                {/* Click affordance glow */}
                <span className="absolute inset-0 rounded-lg ring-1 ring-cyan-400/20 pointer-events-none" />
              </motion.button>

              {/* Rent and Sale CTA */}
              <div className="bg-gray-950/10 rounded-md py-1 px-1 flex gap-1 border border-gray-800 text-xs">
                {["rent", "sale", "lease", "New-Projects"].map((type) => (
                  <motion.button
                    key={type}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setPropertyType(type)}
                    className={`
        px-4 py-2 rounded-md font-semibold capitalize transition-all
        ${
          propertyType === type
            ? "bg-gray-800/80 text-white shadow-sm"
            : "text-indigo-300/40 hover:bg-indigo-500/10"
        }
      `}
                  >
                    For {type}
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="p-2 h-screen overflow-y-auto scrollbar-hide mb-16">
              <PropertySection propertyType={propertyType} />
            </div>
          </div>
        </div>
      </div>

      {/* left prev CTA */}
      <motion.button
        whileHover={{ scale: 0.98 }}
        whileTap={{ scale: 0.92 }}
        className="
    fixed bottom-5 left-4 z-30
    flex items-center gap-1.5
    px-4 py-2
    text-xs font-semibold
    rounded-xl
    border border-slate-600/40
    bg-slate-700/30
    text-slate-300
    backdrop-blur-sm
    hover:bg-slate-700/45 hover:text-slate-100
    transition-all
    outline-none
  "
      >
        <ArrowLeftCircleIcon width={14} height={14} />
        <span>Prev</span>
      </motion.button>
      {/* Bottom NavBar */}
      <div
        className="fixed  left-1/2
                  bottom-4
                  -translate-x-1/2
                  bg-gray-900
                  border border-gray-800/40
                  rounded-xl
                  px-2 py-1.5
                  flex items-center gap-1
                  shadow-inner
                  shadow-gray-200/30"
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `
      px-3 py-2 text-xs font-medium rounded-md transition
      ${isActive ? "text-white bg-white/10" : "text-gray-400 hover:text-white"}
      `
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/top-agencies"
          className={({ isActive }) =>
            `
    px-4 py-2 text-xs font-semibold rounded-lg transition
    ${
      isActive
        ? "text-green-600 bg-gradient-to-r border border-green-800 from-emerald-500/20 to-emerald-600/10 shadow-sm"
        : "text-slate-400 hover:text-slate-200"
    }
    `
          }
        >
          Agencies
        </NavLink>

        <NavLink
          to="/dealers"
          className={({ isActive }) =>
            `
      px-3 py-2 text-xs font-medium rounded-md transition
      ${isActive ? "text-white bg-white/10" : "text-gray-400 hover:text-white"}
      `
          }
        >
          Dealers
        </NavLink>

        <NavLink
          to="/new-projects"
          className={({ isActive }) =>
            `relative
      px-3 py-2 text-xs font-medium rounded-md transition
      ${
        isActive
          ? "text-indigo-700 bg-white/10"
          : "text-indigo-400 hover:text-indigo-700"
      }
      `
          }
        >
          New Projects{" "}
          <LucideStars
            className="absolute top-0 right-1 text-indigo-200"
            width={12}
            height={12}
          />
        </NavLink>

        {/* Primary CTA */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="
                      ml-1
                      px-4 py-2
                      text-xs font-semibold
                      rounded-lg
                      bg-gradient-to-r from-indigo-600 to-indigo-700
                      text-white
                      border border-cyan-400/30
                      shadow-sm
                      hover:from-indigo-500 hover:to-indigo-600
                      transition"
        >
          G-Prime
        </motion.button>
      </div>
      {/* Right next CTA  */}
      <motion.button
        whileHover={{ scale: 0.98 }}
        whileTap={{ scale: 0.92 }}
        className="
    fixed bottom-5 right-4 z-30
    flex items-center gap-1.5
    px-4 py-2
    text-xs font-semibold
    rounded-xl
    border border-cyan-400/30
    bg-cyan-950/80
    text-cyan-300
    backdrop-blur-sm
    hover:bg-cyan-500/20 hover:text-white
    transition-all
    outline-none
  "
      >
        <span>Next</span>
        <ArrowRightCircleIcon width={14} height={14} />
      </motion.button>
    </div>
  );
}

export default HireDealerAgenciesModal;
