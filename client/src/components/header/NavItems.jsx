import React from "react";
import { NavLink } from "react-router-dom";
import { LucideStars } from "lucide-react";
import { motion } from "framer-motion";

function NavItems() {
  return (
    <div className="hidden lg:flex items-center gap-1 rounded-xl border border-gray-800 bg-[#1a1d1f] px-2 py-1">
      {/* Home */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-3 py-1.5 text-xs rounded-lg transition-colors ${
            isActive
              ? "bg-gray-950/60 text-white"
              : "text-gray-400 hover:text-gray-200"
          }`
        }
      >
        Home
      </NavLink>

      {/* Firms */}
      <NavLink
        to="/top-firms"
        className={({ isActive }) =>
          `px-3 py-1.5 text-xs rounded-lg transition-colors ${
            isActive
              ? "bg-emerald-500/15 text-emerald-400"
              : "text-gray-400 hover:text-gray-200"
          }`
        }
      >
        Firms
      </NavLink>

      {/* Divider */}
      <div className="mx-1 h-4 w-px bg-gray-800" />

      {/* GConnect */}
      <NavLink
        to="/getsy-connect"
        className={({ isActive }) =>
          `group relative px-3 py-1.5 text-xs rounded-lg border transition-all ${
            isActive
              ? "border-emerald-600/40 bg-emerald-500/10 text-emerald-400"
              : "border-transparent text-emerald-300 hover:border-emerald-600/30 hover:bg-emerald-500/5"
          }`
        }
      >
        <span className="relative z-10 flex items-center gap-1">
          GConnect
          <LucideStars size={12} className="opacity-80" />
        </span>

        {/* Tooltip */}
        <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 translate-y-2 rounded-lg border border-emerald-500/20 bg-black/80 backdrop-blur-md px-3 py-2 text-[11px] text-emerald-100 opacity-0 shadow-lg transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="font-medium text-emerald-400">Getsy Connect</p>
          <p className="mt-1 opacity-90">
            Community access layer to collaborate, get updates, and engage with
            the Getsy ecosystem.
          </p>
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-black/80 border-l border-t border-emerald-500/20" />
        </div>
      </NavLink>

      {/* GPrime */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        className="group relative ml-1 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:from-indigo-700 hover:to-indigo-800"
      >
        GPrime
        {/* Tooltip */}
        <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-60 -translate-x-1/2 translate-y-2 rounded-lg border border-indigo-400/20 bg-black/85 backdrop-blur-md px-3 py-2 text-[11px] text-indigo-100 opacity-0 shadow-lg transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="font-semibold text-indigo-300">Getsy Prime Access</p>
          <p className="mt-1 opacity-90">
            Priority listings, early access deals, direct firm outreach, and
            premium insights.
          </p>
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-black/85 border-l border-t border-indigo-400/20" />
        </div>
      </motion.button>
    </div>
  );
}

export default NavItems;
