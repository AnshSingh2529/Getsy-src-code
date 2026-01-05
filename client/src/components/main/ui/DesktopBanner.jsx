import { motion } from "framer-motion";
import textImage from "../../../assets/images/getsy-banner.svg";
import AgencyDealerCTA from "../cta/AgencyDealerCTA";
import AnimatedCard from "./AnimatedCard";
import QuickActions from "../QuickActions";

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

        <p className="text-lg text-gray-600 max-w-md leading-loose">
          Search for thousands of VERIFIED AGENCIES & DEALER in your area in
          just a{" "}
          <span className="bg-blue-400 text-white rounded-md p-1">
            few clicks
          </span>
        </p>
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
