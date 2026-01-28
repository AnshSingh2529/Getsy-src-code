import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/useAuth.jsx";
import { motion } from "framer-motion";
import { CheckCircle, X } from "lucide-react";
import SearchCard from "../components/main/SearchCard.jsx";
import DesktopBanner from "../components/main/ui/DesktopBanner.jsx";
import MobileBanner from "../components/main/ui/MobileBanner.jsx";

import QuickActions from "../components/main/QuickActions.jsx";
import AnimatedCard from "../components/main/ui/AnimatedCard.jsx";
import PropertyDiscovery from "../components/main/PropertDiscovery.jsx";
import FeatureHighlights from "../components/main/ui/FeatureHighlights.jsx";

const HomePage = () => {
  const { user } = useAuth();

  const [searchFilters, setSearchFilters] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  const canBecomeAgencyDealer = !user || user?.role === "user";

  return (
    <div className="min-h-screen w-full bg-[#131515] px-4">
      {/* Main Vertical Stack Container */}
      <div className="flex flex-col  mx-auto md:px-2  md:box-content">
        {/* Section 1: Banner + SearchCard (Horizontal on Desktop) */}
        <section className="flex flex-col lg:flex-row gap-x-2 md:gap-x-2 lg:gap-x-4 w-full box-content">
          {/* Banner - Left Side */}
          <div className="flex-1 lg:w-[55%] h-screen">
            <div className="hidden lg:block">
              <PropertyDiscovery />
            </div>
            <div className="lg:hidden">
              <div className="lg:flex-1 lg:flex lg:max-w-max lg:mx-auto">
                <AnimatedCard>
                  <QuickActions />
                </AnimatedCard>
              </div>
              <MobileBanner showCTA={canBecomeAgencyDealer} />
            </div>
          </div>

          {/* SearchCard + PropertyDiscovery - Right Side */}
          <div className="flex-1 mt-4 lg:m-0">
            <SearchCard
              onFiltersChange={setSearchFilters}
              currentFilters={searchFilters}
            />
            <div className="hidden lg:block">
              <DesktopBanner showCTA={canBecomeAgencyDealer} />
            </div>
          </div>
        </section>
        {/* PropertyDiscovery - Mobile Only (below QuickActions) */}
        <section className="lg:hidden mt-4 lg:m-0">
          <PropertyDiscovery />
        </section>
        {/* Section 2: FeatureHighlights + QuickActions (Horizontal on Desktop) */}
        <section className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 lg:items-center lg:justify-between lg:box-content my-4">
          {/* QuickActions - Right Side */}
          <div className="lg:flex-1 lg:flex lg:max-w-max hidden lg:mx-auto">
            <AnimatedCard>
              <QuickActions />
            </AnimatedCard>
          </div>
          {/* FeatureHighlights - Left Side */}
          <div className="flex-1">
            <FeatureHighlights />
          </div>
        </section>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-4 rounded-lg shadow-2xl border border-green-400 flex items-center gap-3 max-w-sm"
          >
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold">Contact Request Sent!</p>
              <p className="text-sm opacity-90">We'll get back to you soon.</p>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
