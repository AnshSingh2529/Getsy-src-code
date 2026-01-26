import React from "react";
import { motion } from "framer-motion";
import {
  MessageCircleMore,
  PhoneCallIcon,
  PhoneIncomingIcon,
} from "lucide-react";

function ProfileSection() {
  return (
    <div className="space-y-2 h-full overflow-y-hidden outline-none">
      <div className="flex flex-col space-y-3 relative">
        {/* Background Banner Image */}
        <div className="relative flex items-center justify-center w-full bg-gray-500/10 rounded-md p-0 text-gray-400 h-20 text-xs">
          Company Banner
          {/* Negotiable tag */}
          <span className="absolute top-1 right-1 bg-green-800/20 border border-green-700 rounded-sm p-1 text-[5px] text-green-600">
            Negotiable
          </span>
        </div>
        {/* Owner details */}
        <div className="flex items-center justify-stretch box-content w-full outline-none">
          <div className="w-full"></div>
          <div className="flex flex-col space-y-2 w-full">
            {/* Owner-Name */}
            <span className="flex items-center justify-center bg-gray-800/10 border border-gray-800/30 rounded-md px-3 py-0.5 text-sm font-medium text-gray-300">
              Owner Name
            </span>
            {/* Working experiance Since */}
            <span className="flex items-center justify-between space-x-2">
              <p className="text-[8px] text-gray-600">Operating Since:</p>
              <p className="flex items-center justify-center bg-gray-800/10 border border-gray-800/30 rounded-md px-4 py-0.5 text-[10px] font-medium text-gray-500">
                Year*
              </p>
            </span>
            <span className="flex items-center justify-between space-x-2">
              <p className="text-[8px] text-gray-600">Deals Closed:</p>
              <p className="flex items-center justify-center bg-gray-800/10 border border-gray-800/30 rounded-md px-4 py-0.5 text-[10px] font-medium text-gray-500">
                Deals*
              </p>
            </span>
          </div>
        </div>
        <div className="absolute top-8 rounded-full bg-gray-800/10 w-28 h-28 border border-gray-800/30 flex items-center justify-center text-gray-500">
          Profile
        </div>
      </div>
      {/* Contact CTAs */}
      <div className="flex flex-1 items-center justify-between w-full bg-gray-950/30 rounded-md border border-gray-800/40 py-2 px-1">
        <div className="flex items-center justify-center space-x-1">
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 0.98, backgroundColor: "green" }}
            className="rounded-md py-2 px-2 text-xs bg-green-800 text-green-100 font-medium shadow-lg  flex items-center justify-center space-x-2"
          >
            <p>Request Call</p> <PhoneIncomingIcon width={12} height={12} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 0.98, backgroundColor: "blue" }}
            className="rounded-lg py-2 px-2 text-xs bg-blue-700 text-blue-100 font-medium shadow-lg border-t-2 border-blue-400 flex items-center justify-center space-x-2"
          >
            <p>Instant Call </p>
            <PhoneCallIcon width={12} height={12} />
          </motion.button>
        </div>
        <motion.button
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 0.98, backgroundColor: "green" }}
          className="rounded-xl py-2 px-2 text-xs bg-green-700 text-green-100 font-medium shadow-lg flex items-center justify-center space-x-2 border-t-2 border-green-400"
        >
          <p>WhatsApp</p> <MessageCircleMore width={12} height={12} />
        </motion.button>
      </div>

      <div className="w-full h-[1px] bg-gray-700/10"></div>
      {/* Introduction – Video Placeholders */}
      <div className="p-3 bg-gray-950/30 rounded-xl">
        <div className="grid grid-cols-3 gap-3">
          {/* Main Videos */}
          {[1, 2].map((_, idx) => (
            <div
              key={idx}
              className="
          relative h-24
          rounded-lg
          border border-gray-800/60
          bg-gradient-to-br from-gray-900/60 to-gray-950/60
          flex items-center justify-center
          overflow-hidden
        "
            >
              {/* Play Icon */}
              <div
                className="
          flex items-center justify-center
          w-8 h-8
          rounded-full
          bg-black/50
          border border-gray-700
          backdrop-blur-sm cursor-pointer
        "
              >
                <svg
                  className="w-5 h-5 text-white ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              {/* Label */}
              <span className="absolute bottom-1 left-2 translate-x-0 text-[8px] text-gray-400 tracking-wide">
                Partner Overview
              </span>
            </div>
          ))}

          {/* Show More */}
          <div
            className="
        relative h-24
        rounded-lg
        border border-dashed border-gray-700
        bg-gray-900/20
        flex flex-col items-center justify-center
        text-gray-400
        cursor-pointer
        hover:border-gray-500 hover:text-gray-300
        transition
      "
          >
            <span className="text-sm font-semibold">+ More</span>
            <span className="text-[10px] tracking-wide mt-1">
              View all videos
            </span>
          </div>
        </div>
      </div>

      {/* Testimonials – Client Deal Avatars */}
      <div className="p-3 bg-gray-950/30 rounded-xl">
        <p className="text-xs font-semibold text-gray-400 mb-2 tracking-wide">
          RECENT DEALS CLOSED
        </p>

        <div className="grid grid-cols-6 gap-3 items-center">
          {[1, 2, 3, 4, 5].map((_, idx) => (
            <div
              key={idx}
              className="
          flex flex-col items-center gap-1
        "
            >
              {/* Client Image */}
              <div
                className="
          w-10 h-10
          rounded-full
          border border-gray-700
          bg-gray-800
          overflow-hidden
        "
              >
                <img
                  src={`https://i.pravatar.cc/100?img=${idx + 10}`}
                  alt="Client"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Deal Tag */}
              <span className="text-[5px] text-gray-500">Client Name</span>
            </div>
          ))}

          {/* More indicator */}
          <div
            className="
      flex items-center justify-center
      w-10 h-10
      rounded-full
      border border-dashed border-gray-700
      text-xs text-gray-500
      cursor-pointer
      hover:border-gray-500 hover:text-gray-300
      transition
    "
          >
            +12
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;
