import React from "react";
import web_logo from "../../assets/images/web-logo.png";
import SearchNearbyCTA from "../../components/main/cta/SearchNearbyCTA.jsx";
import SearchBar from "../../components/header/SearchBar.jsx";
import { Heart, User } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";

function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <nav className="fixed z-50 top-0 w-full transition-all duration-500 bg-[#131515]">
      <div className="h-16 sm:h-14 md:h-16 lg:h-16 px-5 sm:px-4 lg:px-6 xl:px-8 flex items-center justify-between">
        <div className="flex items-center justify-start space-x-2">
          {/* Company Name */}
          <div>
            <div className="flex bg-[#343a40] border border-gray-800/60 shadow-lg items-center justify-center px-4 py-1 rounded-md  space-x-3">
              <span>
                <img
                  src="*"
                  alt="logo"
                  className="rounded-full w-7 h-7 border-2 border-green-900/60 p-1"
                />
              </span>
              <span className="text-pretty text-white font-medium text-sm">
                Company Name
              </span>
            </div>
          </div>
          {/* Backend/Platform name */}
          <div className="flex items-center">
            <span className="text-gray-500 text-xs font-medium italic flex items-center">
              powered by
            </span>

            <div className="w-12">
              {" "}
              <img src={web_logo} alt="logo" />
            </div>
          </div>
        </div>
        {/* Top Search Sections */}
        <div>
          <SearchBar variant="compact" />
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3">
          <motion.div
            whileTap={{ scale: 0.92 }}
            onClick={() => navigate("/wishlist")}
            className="cursor-pointer p-1 sm:p-2 transition-colors duration-300 font-mono"
          >
            <Heart className={`size-2 sm:size-3 text-gray-500`} />
          </motion.div>
          {/* Divider - Hidden on mobile */}
          <div
            className={`lg:block w-[1px] h-[30px] transition-colors duration-300 bg-gray-800/60`}
          ></div>
          {/* Desktop Login Button - Hidden on smaller screens */}
          {!user ? (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/auth/login")}
              className={`hidden lg:flex items-center space-x-2 rounded-md px-2 lg:px-3 py-1 lg:py-1.5 font-normal shadow-lg transition-all duration-300 text-sm bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700`}
            >
              <User size={12} className="text-gray-300" />
              <div
                className={`h-3 lg:h-3 w-[1px] transition-colors duration-300 bg-gray-950/50`}
              ></div>
              <span className="text-xs lg:text-xs text-gray-300">Login</span>
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={toggleProfile}
              className={`hidden lg:flex items-center justify-center space-x-2 rounded-lg h-8 w-8 px-2 lg:px-3 py-1 lg:py-2 font-normal shadow-lg transition-all duration-300 text-sm bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700`}
            >
              {user?.username?.[0]?.toUpperCase() || "NIL"}
            </motion.button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
