import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/useAuth.jsx";

import SearchCard from "../components/main/SearchCard.jsx";
import DesktopBanner from "../components/main/ui/DesktopBanner.jsx";
import MobileBanner from "../components/main/ui/MobileBanner.jsx";

import QuickActions from "../components/main/QuickActions.jsx";
import AnimatedCard from "../components/main/ui/AnimatedCard.jsx";

const HomePage = () => {
  const { user } = useAuth();

  const [searchFilters, setSearchFilters] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  const canBecomeAgencyDealer = !user || user?.role === "user";

  return (
    <div className="h-auto w-full bg-[#131515] md:p-4 p-3 relative">
      {/* Desktop */}
      <div className="hidden lg:flex lg:h-screen mt-8">
        <DesktopBanner showCTA={canBecomeAgencyDealer} />
        <div className="lg:w-2/5 xl:w-1/2 md:space-y-3 space-y-6">
          <SearchCard
            onFiltersChange={setSearchFilters}
            currentFilters={searchFilters}
          />
          <div className="p-4">
            <AnimatedCard>
              {" "}
              <QuickActions />
            </AnimatedCard>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="lg:hidden inline-block h-screen space-y-3 p-0">
        <MobileBanner showCTA={canBecomeAgencyDealer} />
        <div className="space-y-5">
          <SearchCard />
          <AnimatedCard>
            {" "}
            <QuickActions />
          </AnimatedCard>
        </div>
      </div>
      {/* Success Notification */}{" "}
      <AnimatePresence>
        {" "}
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-4 rounded-lg shadow-2xl border border-green-400 flex items-center gap-3 max-w-sm"
          >
            {" "}
            <CheckCircle className="w-5 h-5 flex-shrink-0" />{" "}
            <div className="flex-1">
              {" "}
              <p className="font-semibold">Contact Request Sent!</p>{" "}
              <p className="text-sm opacity-90">We'll get back to you soon.</p>{" "}
            </div>{" "}
            <button
              onClick={() => setShowNotification(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors flex-shrink-0"
            >
              {" "}
              <X className="w-4 h-4" />{" "}
            </button>{" "}
          </motion.div>
        )}{" "}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
