import React from "react";
import { UserPlusIcon } from "lucide-react";

function BecomeMemberCTA({ compact = false }) {
  const basePadding = compact ? "px-4 py-2" : "px-6 py-4";

  return (
    <div>
      {/* Become Dealer */}
      <button
        className={`group relative ${basePadding} bg-gradient-to-r from-emerald-800 to-emerald-700 text-white font-semibold rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-emerald-950/50`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-center gap-3">
          <UserPlusIcon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300 text-green-200/60" />
          <span>Become a Member</span>
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
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </button>
    </div>
  );
}

export default BecomeMemberCTA;
