import { motion } from "framer-motion";
import textImage from "../../../assets/images/getsy-banner.svg";
import AgencyDealerCTA from "../cta/AgencyDealerCTA.jsx";

const MobileBanner = ({ showCTA }) => {
  return (
    <div className="bg-[#131515] px-4">
      <motion.img
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-xs mx-auto"
        src={textImage}
        alt="Getsy Banner"
      />

      {showCTA && (
        <div className="mt-8">
          <AgencyDealerCTA compact />
        </div>
      )}
    </div>
  );
};

export default MobileBanner;
