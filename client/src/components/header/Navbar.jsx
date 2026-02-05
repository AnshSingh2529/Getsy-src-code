import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, User, PlusCircle, LucideStars } from "lucide-react";
import { createPortal } from "react-dom";

import { useAuth } from "../../hooks/useAuth.jsx";
import { getBottomNavItems } from "../../utils/BottomNavs.js";
import SearchBar from "../../components/header/SearchBar.jsx";
import NavItems from "./NavItems.jsx";

function BottomNavPortal({ children }) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}

function Navbar({ toggleDrawer }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [isBottomNavVisible, setIsBottomNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const showSearchBar = location.pathname.startsWith("/property-view");

  const buttonRef = useRef(null);

  const isWishlistActive = location.pathname === "/wishlist";

  useEffect(() => {
    if (isWishlistActive && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [isWishlistActive]);
  useEffect(() => {
    if (window.innerWidth >= 1024) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsBottomNavVisible(true);
      } else {
        setIsBottomNavVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const POST_PROPERTY_ROLES = ["agency", "dealer"];
  const canPostProperty = POST_PROPERTY_ROLES.includes(user?.role);

  const bottomNavItems = getBottomNavItems(user, () =>
    navigate("/user-profile"),
  );

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-[#131515] shadow-sm">
        <div className="h-14 px-5 sm:px-4 lg:px-6 xl:px-8 flex items-center justify-between">
          {/* Logo */}
          <motion.img
            src="../src/assets/images/web-logo.png"
            alt="logo"
            className="cursor-pointer w-20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            onContextMenu={(e) => e.preventDefault()}
          />

          {showSearchBar && (
            <div className="ml-8 w-[400px] hidden lg:block">
              <SearchBar onSearch={() => {}} variant="compact" />
            </div>
          )}

          {/* Center Desktop Nav */}
          <div className="fixed left-1/2 -translate-x-1/2 ">
            <NavItems />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {(canPostProperty || !user) && (
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/post-property")}
                className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold text-emerald-300 bg-[#0e1512] border border-emerald-500/30"
              >
                <PlusCircle size={14} />
                <span className="hidden xl:inline">Post Property</span>
                <span className="xl:hidden">Post</span>
              </motion.button>
            )}

            <motion.button
              ref={buttonRef}
              whileTap={{ scale: 0.92 }}
              onClick={() => navigate("/wishlist")}
              className={`flex h-7 w-8 items-center justify-center rounded-md border transition outline-none
        ${
          isWishlistActive
            ? "bg-indigo-700/20 border-indigo-600"
            : "border-gray-800 hover:border-gray-700"
        }
      
      `}
            >
              <Heart
                className={`h-3.5 w-3.5 ${
                  isWishlistActive ? "text-red-400" : "text-gray-400"
                }`}
              />
            </motion.button>
            <div className="w-[1px] bg-slate-400/30  h-4"></div>
            <div className="flex items-center space-x-2">
              {(canPostProperty || !user) && (
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigate("/post-property")}
                  className="lg:hidden flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold text-emerald-300 bg-[#0e1512] border border-emerald-500/30"
                >
                  <PlusCircle size={14} />
                  <span className="flex">Post Property</span>
                  <span className="hidden">Post</span>
                </motion.button>
              )}
            </div>
            {!user ? (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/auth/login")}
                className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-xs"
              >
                <User size={14} />
                Login
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/user-profile")}
                className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white text-xs"
              >
                {user?.username?.[0]?.toUpperCase()}
              </motion.button>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-14 lg:h-20" />

      {/* Mobile Bottom Nav */}
      <BottomNavPortal>
        <motion.nav
          animate={{ y: isBottomNavVisible ? 0 : 100 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden fixed bottom-4 left-0 right-0 mx-auto max-w-md bg-[#1a1d1d] border-t border-gray-800 rounded-full shadow-lg"
        >
          <div className="flex">
            {bottomNavItems.map((item, i) => {
              const isActive = location.pathname.startsWith(item.path);
              const Icon = item.icon;

              return (
                <button
                  key={i}
                  onClick={() =>
                    item.action ? item.action() : navigate(item.path)
                  }
                  className="flex-1 p-3 flex flex-col items-center"
                >
                  <Icon
                    size={22}
                    className={isActive ? "text-blue-500" : "text-gray-400"}
                  />
                  <span className="text-xs mt-1 text-gray-400">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.nav>
      </BottomNavPortal>

      <div className="lg:hidden h-20" />
    </>
  );
}

export { Navbar };
