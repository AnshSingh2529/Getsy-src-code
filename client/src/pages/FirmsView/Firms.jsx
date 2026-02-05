import React, { useState } from "react";
import Navbar from "./Navbar";
import ProfileSection from "./ProfileSection";
import PropertySection from "./PropertySection";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import web_logo from "../../assets/images/building.png";
import SmallFooter from "../../components/footer/SmallFooter";

function Firms() {
  const [activeFilter, setActiveFilter] = useState("premium");
  const [propertyType, setPropertyType] = useState("rent");

  const accent =
    activeFilter === "premium"
      ? "border-yellow-700 shadow-inner shadow-yellow-700/50"
      : activeFilter === "gFeatured"
        ? "border-emerald-700 shadow-inner shadow-emerald-700/50"
        : "border-slate-700 shadow-inner shadow-slate-700/50";

  return (
    <>
      <Navbar />

      {/* PAGE WRAPPER */}
      <div className="px-2">
        <div
          className={`min-h-screen mx-auto max-w-[1600px] rounded-lg border ${accent} bg-[#0f1113] overflow-auto`}
        >
          {/* TOP CONTROL BAR */}
          <div className="flex items-center justify-between border-b border-gray-800 px-4 py-2">
            {/* Filters */}
            <div className="flex items-center gap-1 rounded-lg bg-[#16191c] p-1">
              {[
                { id: "premium", label: "Premium" },
                { id: "gFeatured", label: "Featured" },
                { id: "affordable", label: "Affordable" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-4 py-1.5 text-xs font-medium rounded-md transition
        ${
          activeFilter === f.id
            ? f.id === "premium"
              ? "bg-yellow-500/10 text-yellow-300"
              : f.id === "gFeatured"
                ? "bg-emerald-500/10 text-emerald-300"
                : "bg-slate-500/10 text-slate-300"
            : "text-gray-400 hover:text-gray-200"
        }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Visit Page */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="
                flex items-center gap-2
                rounded-md px-4 py-2
                text-xs font-medium
                bg-blue-600 text-white
                hover:bg-blue-700 transition
              "
            >
              <span>Visit Page</span>
              <ExternalLink size={14} />
            </motion.button>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex h-screen gap-0">
            {/* LEFT — PROFILE */}
            <div className="w-[33%] border-r border-gray-800 bg-[#111315] overflow-auto p-1 h-screen rounded-lg">
              <ProfileSection />
            </div>

            {/* RIGHT — PROPERTIES */}
            <div className="w-[77%] flex flex-col">
              {/* PROPERTY CONTROLS */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800">
                {/* Trusted Partners */}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="group relative inline-flex items-center gap-2 px-4 py-1 rounded-lg text-xs font-semibold tracking-wide text-cyan-200 bg-gradient-to-r from-slate-900 via-cyan-900/40 to-slate-900 border border-cyan-600/50 shadow-sm hover:shadow-cyan-500/60 transition-all"
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

                  {/* Mini grid preview */}
                  <div className="p-1 rounded-lg grid grid-cols-2 grid-rows-2 bg-[#0f1113] gap-1 transition-transform group-hover:rotate-6">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={i}
                        src={web_logo}
                        alt=""
                        className="rounded-sm object-cover w-2.5 h-2.5"
                      />
                    ))}
                  </div>

                  {/* Arrow */}
                  <svg
                    className="w-3 h-3 text-cyan-400 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>

                  {/* Tooltip */}
                  <div className="pointer-events-none absolute right-full top-1/2 z-50 mr-3 -translate-y-1/2 translate-x-2 rounded-xl border border-cyan-500/20 bg-black/85 backdrop-blur-md p-3 text-[11px] text-cyan-100 opacity-0 shadow-xl shadow-cyan-900/30 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 w-80 overflow-visible">
                    <p className="font-semibold text-cyan-300">
                      Trusted Partner Network
                    </p>

                    <p className="mt-1 leading-relaxed text-cyan-100/90">
                      These companies are bonded and trusted by this firm. You
                      can explore their profiles, review capabilities, and
                      directly hire them for specialized work.
                    </p>

                    {/* Services grid */}
                    <div className="mt-3 grid grid-cols-2 gap-2 text-cyan-200/90">
                      <span className="rounded-md bg-cyan-900/30 p-1">
                        Interior
                      </span>
                      <span className="rounded-md bg-cyan-900/30 p-1">
                        Exterior
                      </span>
                      <span className="rounded-md bg-cyan-900/30 p-1">
                        Vastu
                      </span>
                      <span className="rounded-md bg-cyan-900/30 p-1">
                        Decoration
                      </span>
                    </div>

                    {/* Tooltip arrow */}
                    <span className="absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rotate-45 bg-black/85 border-r border-t border-cyan-500/20" />
                  </div>

                  {/* Click affordance glow */}
                  <span className="absolute inset-0 rounded-lg ring-1 ring-cyan-400/20 pointer-events-none" />
                </motion.button>

                {/* Property Type Tabs */}
                <div className="flex items-center gap-1 rounded-md bg-[#16191c] p-1">
                  {["rent", "sale", "lease", "new projects"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setPropertyType(type)}
                      className={`px-4 py-1.5 text-xs font-medium capitalize rounded transition
                        ${
                          propertyType === type
                            ? "bg-white/10 text-white"
                            : "text-gray-400 hover:text-gray-200"
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* PROPERTY LIST */}
              <div className="flex-1 overflow-auto p-4">
                <PropertySection propertyType={propertyType} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER NAV CONTROLS */}
      <div className="fixed z-40 bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-5 bg-gray-800/30 p-2 border border-gray-900/50 rounded-xl">
        <motion.button
          whileTap={{ scale: 0.96 }}
          className="
            flex items-center gap-2
            rounded-md px-4 py-2
            text-xs font-medium
            border border-gray-700
            bg-[#16191c]
            text-gray-300
            hover:bg-[#1c1f23] transition
          "
        >
          <ArrowLeft size={14} />
          Prev
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.96 }}
          className="
            flex items-center gap-2
            rounded-md px-4 py-2
            text-xs font-medium
            border border-cyan-600/40
            bg-cyan-950
            text-cyan-300
            hover:bg-cyan-800 transition
          "
        >
          Next
          <ArrowRight size={14} />
        </motion.button>
      </div>
      <SmallFooter />
    </>
  );
}

export default Firms;
