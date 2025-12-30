import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, User, PlusCircle, LucideHousePlug } from "lucide-react";
import { useAuth } from "../features/auth/hooks.js";
import { createPortal } from "react-dom";
import { getBottomNavItems } from "../utils/BottomNavs.js";
import SearchBar from "./cards/others/SearchBar.jsx";

function BottomNavPortal({ children }) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}

function Navbar({ toggleDrawer }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user } = useAuth();

  const showSearchBar = ["/property-view"].some((path) =>
    location.pathname.startsWith(path)
  );

  // Handle search submission
  const handleSearch = () => {
  
  };

  // Handle scroll behavior for bottom nav
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show nav when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        // Scrolling up or at top of page
        setIsBottomNavVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down and past threshold
        setIsBottomNavVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    // Only add listener on mobile screens
    if (window.innerWidth < 1024) {
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [lastScrollY]);

  // Define color themes based on current route
  const getThemeColors = (pathname) => {
    // Dark theme pages
    const darkPages = ["/hire-agents", "/properties", "/agents"];

    if (darkPages.some((page) => pathname.startsWith(page))) {
      return {
        // Dark theme colors
        navbarBg: "bg-[#131515]",
        logoFilter: "brightness-0 invert",
        textColor: "text-gray-300",
        textHoverColor: "hover:text-white",
        activeTextColor: "bg-gray-800/50 text-white",
        heartColor: "text-gray-400 hover:text-white",
        dividerColor: "bg-gray-700",
        loginButtonBg:
          "bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700",
        loginButtonText: "text-white",
        loginButtonDivider: "bg-white/20",
        mobileMenuBg: "bg-gray-900",
        mobileToggleBg: "bg-gray-800 hover:bg-gray-700",
        mobileToggleIcon: "text-gray-300",
        mobileBackdrop: "bg-black/70",
        mobileLinkColor: "text-gray-300",
        mobileLinkHover: "hover:text-white hover:bg-gray-800",
        mobileLinkActive:
          "text-white bg-gradient-to-r from-blue-600/20 to-blue-600/20",
        postPropertyBtn:
          "bg-gradient-to-b from-green-700 to-green-700 hover:from-green-800 hover:to-green-800 text-white shadow-lg hover:shadow-green-500/25",
        // Bottom nav specific
        bottomNavBg: "bg-[#1a1d1d]",
        bottomNavBorder: "border-gray-800",
        bottomNavActive: "text-blue-500",
        bottomNavInactive: "text-gray-400",
        bottomNavActiveBg: "bg-blue-500/10 rounded-full p-5",
      };
    }

    // Default theme (Home and other pages)
    return {
      navbarBg: "bg-[#131515]",
      logoFilter: "brightness-100",
      textColor: "text-gray-600",
      textHoverColor: "hover:text-gray-400",
      activeTextColor: "bg-gray-800/60 text-white shadow-2xl",
      heartColor: "text-gray-500 hover:text-gray-400",
      dividerColor: "bg-gray-700",
      loginButtonBg:
        "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600",
      loginButtonText: "text-gray-300",
      loginButtonDivider: "bg-gray-700",
      mobileMenuBg: "bg-[#343a40]",
      mobileToggleBg: "bg-[#343a40] hover:bg-gray-600",
      mobileToggleIcon: "text-gray-600",
      mobileBackdrop: "bg-black/50",
      mobileLinkColor: "text-[#131515]",
      mobileLinkHover: "hover:text-gray-400 hover:bg-gray-50",
      mobileLinkActive: "text-gray-300 bg-[#131515]",
      postPropertyBtn:
        "bg-gradient-to-b from-green-700 to-green-700 hover:from-green-800 hover:to-green-800 text-white shadow-lg hover:shadow-green-500/25",
      // Bottom nav specific
      bottomNavBg: "bg-[#1a1d1d] w-auto",
      bottomNavBorder: "border-gray-800",
      bottomNavActive: "text-blue-500",
      bottomNavInactive: "text-gray-400",
      bottomNavActiveBg: "bg-blue-500/10 rounded-full p-5",
    };
  };

  const theme = getThemeColors(location.pathname);

  const handleLogoClick = () => navigate("/");
  const handlePostProperty = () => {
    navigate("/post-property");
  };

  const toggleProfile = () => {
    navigate('user-profile')
  };

  const navLinkClasses = `text-sm font-normal transition-all duration-400 ease-in-out rounded-lg px-3 py-2 ${theme.textColor} ${theme.textHoverColor}`;

  const getActiveLinkStyle = (isActive) => {
    if (isActive) {
      return {
        color: theme.activeTextColor.includes("white") ? "white" : "#131515",
        background: theme.activeTextColor.includes("gradient")
          ? "bg-gray-900"
          : theme.activeTextColor.replace("bg-", ""),
        
      };
    }
    return {};
  };

  // Bottom nav items configuration
  const bottomNavItems = getBottomNavItems(user, toggleProfile);
  return (
    <>
      {/* Top Navbar */}
      <nav
        className={`fixed z-50 top-0 w-full transition-all duration-500 ${theme.navbarBg}`}
      >
        {/* Desktop and Tablet Navigation */}
        <div className="h-16 sm:h-14 md:h-16 lg:h-20 px-5 sm:px-4 lg:px-6 xl:px-8 flex items-center justify-between">
          {/* Left Section - Logo */}
          <motion.img
            src="../src/assets/images/Getsy_logo.png"
            alt="logo"
            className={`cursor-pointer w-28 h-auto sm:w-20 md:w-24 lg:w-28 transition-all duration-500`}
            style={{ filter: theme.logoFilter }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogoClick}
            onContextMenu={(e) => e.preventDefault()}
          />

          {showSearchBar && (
            <div className="ml-8 w-[400px] hidden lg:block">
              <SearchBar onSearch={handleSearch} variant="compact" />
            </div>
          )}
          {/* Desktop Navigation Links - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? theme.activeTextColor : ""}`
              }
              style={({ isActive }) => getActiveLinkStyle(isActive)}
            >
              Home
            </NavLink>

            <NavLink
              to="/top-dealer-agencies-list"
              className={({ isActive }) =>
                `${navLinkClasses}  ${isActive ? theme.activeTextColor : ""}`
              }
              style={({ isActive }) => getActiveLinkStyle(isActive)}
            >
              Dealers | Agencies
            </NavLink>

            {/* Desktop CTA Button */}
            {user?.role === "dealer" && (
              <div className="relative px-8 py-2">
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={handlePostProperty}
                  className={` flex items-center px-5 py-3 sm:py-2 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${theme.postPropertyBtn}`}
                >
                  <span className="hidden xl:inline w-full">Post Property</span>
                  <span className="xl:hidden">Post</span>
                  <LucideHousePlug className="size-4 text-gray-300 ml-1 xl:ml-2" />
                </motion.button>
                <div className="absolute top-1 right-3 text-black bg-gradient-to-r from-white/10 to-white px-3 py-1 bg-transparent rounded-md font-medium text-xs">
                  Free
                </div>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Post Property Button - Mobile only */}
            {user?.role === "dealer" && (
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={handlePostProperty}
                className={`lg:hidden flex items-center px-3 py-2 rounded-lg font-semibold text-xs transition-all duration-300 ${theme.postPropertyBtn}`}
              >
                <PlusCircle className="size-4 mr-1" />
                <span>Post</span>
              </motion.button>
            )}

            {/* Wishlist Icon - Now visible on mobile */}
            <motion.div
              whileTap={{ scale: 0.92 }}
              onClick={() => navigate("/wishlist")}
              className="cursor-pointer p-1 sm:p-2 rounded-lg transition-colors duration-300"
            >
              <Heart
                className={`size-4 sm:size-5 transition-colors duration-300 ${theme.heartColor}`}
              />
            </motion.div>

            {/* Divider - Hidden on mobile */}
            <div
              className={`hidden lg:block w-[1px] h-[40px] transition-colors duration-300 ${theme.dividerColor}`}
            ></div>

            {/* Desktop Login Button - Hidden on smaller screens */}
            {!user ? (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/auth/login")}
                className={`hidden lg:flex items-center space-x-2 rounded-lg px-2 lg:px-3 py-1 lg:py-2 font-normal shadow-lg transition-all duration-300 text-sm ${theme.loginButtonBg} ${theme.loginButtonText}`}
              >
                <User size={15} />
                <div
                  className={`h-3 lg:h-4 w-[1px] transition-colors duration-300 ${theme.loginButtonDivider}`}
                ></div>
                <span className="text-xs lg:text-sm">Login</span>
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={toggleProfile}
                className={`hidden lg:flex items-center justify-center space-x-2 rounded-lg h-8 w-8 px-2 lg:px-3 py-1 lg:py-2 font-normal shadow-lg transition-all duration-300 text-sm ${theme.loginButtonBg} ${theme.loginButtonText}`}
              >
                {user?.username?.[0]?.toUpperCase() || "NIL"}
              </motion.button>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-12 sm:h-14 md:h-16 lg:h-20"></div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNavPortal>
        <motion.nav
          initial={{ y: 0 }}
          animate={{ y: isBottomNavVisible ? 0 : 100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`lg:hidden fixed w-full bottom-4 left-0 right-0 z-40 ${theme.bottomNavBg} border-t ${theme.bottomNavBorder} backdrop-blur-lg bg-opacity-95 rounded-full shadow-lg transition-all duration-300 ease-in-out mx-auto max-w-md`}
        >
          <div className="flex-1 flex flex-row items-center justify-center max-w-md mx-auto">
            {bottomNavItems.map((item, index) => {
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);
              const Icon = item.icon;

              return (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else {
                      navigate(item.path);
                    }
                  }}
                  className="relative flex items-center justify-center focus:outline-none flex-1 p-[6px] mx-auto"
                >
                  {/* Icon container */}
                  <motion.div
                    className={`relative flex flex-col items-center justify-center transition-all duration-200 w-full p-5 ${
                      isActive ? theme.bottomNavActiveBg : ""
                    }`}
                    animate={{
                      scale: isActive ? 1.05 : 1,
                    }}
                  >
                    <Icon
                      className={`transition-all duration-200 ${
                        isActive
                          ? theme.bottomNavActive
                          : theme.bottomNavInactive
                      }`}
                      size={22}
                      strokeWidth={isActive ? 2.5 : 2}
                    />

                    {/* Label */}
                    <span
                      className={`text-xs mt-0.5 font-medium transition-all duration-200 truncate max-w-full ${
                        isActive
                          ? theme.bottomNavActive
                          : theme.bottomNavInactive
                      }`}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                </motion.button>
              );
            })}
          </div>
        </motion.nav>
      </BottomNavPortal>

      {/* Bottom spacer for mobile to prevent content from hiding behind bottom nav */}
      <div className="lg:hidden h-20"></div>

    </>
  );
}

export { Navbar };
