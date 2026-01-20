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
      {/* About Section */}
      <div className="flex items-center justify-center text-pretty text-center p-2 text-[8px] text-gray-700 font-extralight bg-gray-800/30 rounded-md h-16 truncate">
        {" `` "}
        About Section of this Profile*
        {" `` "}
      </div>
      <div className="w-full h-[1px] bg-gray-700/10"></div>
      <div className="flex items-center justify-center text-pretty text-center p-2 text-[8px] text-gray-700 font-extralight bg-gray-950/30 rounded-md truncate h-32">
        Advertisement Area*
      </div>
    </div>
  );
}

export default ProfileSection;
