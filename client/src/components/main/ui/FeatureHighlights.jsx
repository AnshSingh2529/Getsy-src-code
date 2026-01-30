import React from "react";
import BecomeMemberCTA from "../cta/BecomeMemberCTA";

function FeatureHighlights() {
  return (
    <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-700 space-y-3">
      {/* Top CTA Strip */}
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
            <span>Become a Member and Access a</span>
            <span className="text-green-500/60">
              Structured Property Workspace
            </span>
          </div>

          {/* CTA */}
          <div className="shrink-0">
            <BecomeMemberCTA compact />
          </div>
        </div>
      </div>

      {/* Member Experience Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {[
          {
            title: "Country-Wise Channels",
            description:
              "Dedicated spaces for each country to explore local property prices, trends, and regional discussions.",
          },
          {
            title: "Live Deal Discussions",
            description:
              "Real-time conversations around verified listings, upcoming projects, and member-shared opportunities.",
          },
          {
            title: "Chat-Based Workspace",
            description:
              "A Discord-style interface with channels on the left and focused discussions on the right—built for clarity and speed.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="
              bg-gray-800/50
              backdrop-blur-sm
              rounded-xl
              sm:rounded-2xl
              p-3
              sm:p-4
              border
              border-gray-800/60
              text-left
              shadow-lg
            "
          >
            <div className="text-sm sm:text-base font-semibold text-slate-200 mb-1">
              {item.title}
            </div>
            <div className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureHighlights;
