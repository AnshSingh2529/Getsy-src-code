import React from "react";
import web_logo from "../../assets/images/web-logo.png";
import SearchBar from "../../components/header/SearchBar.jsx";
import { Heart, User } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";
import NavItems from "../../components/header/NavItems.jsx";

function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#131515]/95 backdrop-blur-md border-b border-gray-800/30">
      <div className="mx-auto flex h-14 lg:h-16 max-w-[1600px] items-center px-4 sm:px-6 lg:px-8">
        {/* LEFT — Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 rounded-md border border-gray-800 bg-[#1c1f21] px-3 py-1.5">
            <img
              src="*"
              alt="logo"
              className="h-6 w-6 rounded-full border border-green-800/60 p-0.5"
            />
            <span className="text-sm font-medium text-gray-100">
              Company Name
            </span>
          </div>

          <div className="flex items-center gap-x-1 text-[11px] text-gray-500">
            <span className="italic">powered by</span>
            <img
              src={web_logo}
              alt="platform"
              className="h-6 opacity-100 object-cover"
            />
          </div>
        </div>

        {/* CENTER — Primary Navigation */}
        <div className="flex flex-1 justify-center">
          <NavItems />
        </div>

        {/* RIGHT — Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Wishlist */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => navigate("/wishlist")}
            className="flex h-7 w-8 items-center justify-center rounded-md border border-gray-800 hover:border-gray-700 transition"
          >
            <Heart className="h-3.5 w-3.5 text-gray-400" />
          </motion.button>

          {/* Divider */}
          <div className="hidden lg:block h-6 w-px bg-gray-800" />

          {/* Auth */}
          {!user ? (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/auth/login")}
              className="
                hidden lg:flex items-center gap-2 rounded-md
                bg-gradient-to-r from-blue-600 to-blue-700
                px-3 py-1.5 text-xs font-medium text-white
                shadow-sm transition hover:from-blue-700 hover:to-blue-800
              "
            >
              <User size={12} />
              <span>Login</span>
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="
                hidden lg:flex h-8 w-8 items-center justify-center
                rounded-full bg-gradient-to-r from-blue-600 to-blue-700
                text-xs font-semibold text-white
              "
            >
              {user?.username?.[0]?.toUpperCase() || "U"}
            </motion.button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
