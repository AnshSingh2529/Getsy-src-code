import { motion } from "framer-motion";
import textImage from "../../../assets/images/getsy-banner.svg";
import AgencyDealerCTA from "../cta/AgencyDealerCTA";
import AnimatedCard from "./AnimatedCard";
import QuickActions from "../QuickActions";

import addImage from "../../../assets/images/Modern_design.png";

const DesktopBanner = ({ showCTA }) => {
  return (
    <div className="flex items-center justify-center bg-[#131515] outline-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full flex flex-col items-center text-center space-y-6"
      >
        <motion.img
          initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
          src={textImage}
          alt="Getsy Banner"
        />

        {showCTA && <AgencyDealerCTA />}

        <p className="text-base text-gray-600 max-w-md leading-loose">
          Search for VERIFIED FIRMS & BROKERS in your area in just a{" "}
          <span className="bg-blue-200 text-[#131515] rounded-md p-1 text-sm">
            few clicks
          </span>
        </p>
        <div
          className="
  flex flex-col space-y-3
  border border-gray-700/20
  w-full h-auto
  p-4
  rounded-xl
  bg-gray-900/40
  shadow-inner shadow-black/40
"
        >
          {/* Heading */}
          <div className="flex items-center justify-between w-full">
            <h2 className="text-base font-semibold text-gray-100">
              Trending Properties
            </h2>
            <span className="text-xs text-gray-500">High demand right now</span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 grid-rows-2 gap-3">
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="
          w-full h-36
          rounded-lg
          border border-gray-800/40
          bg-gradient-to-b from-gray-800/40 to-gray-900/60
          shadow-inner shadow-black/30
          transition-all
          hover:border-gray-600/50
          cursor-pointer
        "
              >
                {/* Placeholder for property card */}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <div className="lg:hidden">
        <AnimatedCard>
          <QuickActions />
        </AnimatedCard>
      </div>
    </div>
  );
};

export default DesktopBanner;
