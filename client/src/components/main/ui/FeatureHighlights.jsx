import React from "react";
import BecomeMemberCTA from "../cta/BecomeMemberCTA";

function FeatureHighlights() {
  return (
    <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-700 space-y-3">
      {/* Feature Highlights */}
      <div className="bg-[#131515] rounded-lg w-full border border-gray-950/60 p-3 sm:p-4">
        <div
          className="
      flex flex-col
      sm:flex-row
      items-center
      justify-center
      sm:justify-between
      gap-2
      text-slate-300
      text-xs
      sm:text-sm
      font-medium
    "
        >
          {/* Text */}
          <div className="flex flex-wrap items-center justify-center gap-x-1 text-center sm:text-left">
            <span>Join to Improve</span>
            <span className="text-green-500/50">SOCIETY's ENVIRONMENT</span>
          </div>

          {/* CTA */}
          <div className="shrink-0">
            <BecomeMemberCTA compact />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {[
          { label: "Verified Listings", value: "10K+" },
          { label: "Happy Customers", value: "5K+" },
          { label: "Cities Covered", value: "50+" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-1 sm:p-1 lg:p-1 border border-gray-800/60 text-center shadow-lg"
          >
            <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1 sm:mb-2">
              {stat.value}
            </div>
            <div className="text-slate-600 font-medium text-xs sm:text-sm lg:text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureHighlights;
