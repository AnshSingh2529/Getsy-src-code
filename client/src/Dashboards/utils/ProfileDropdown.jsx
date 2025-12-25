// Add these imports (if not already present)
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks";
// you already use this

// Drop-in ProfileDropdown component
function ProfileDropdown({ user, colors = {} }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const auth = useAuth(); // { user, logout? }
  const userRole = (user?.role || "USER").toUpperCase();

  // Close when clicking/touching outside
  useEffect(() => {
    function onDocClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
    };
  }, []);

  // Capitalize helper
  const capitalizeName = (name = "") =>
    name
      .split(" ")
      .filter(Boolean)
      .map((p) => p[0]?.toUpperCase() + p.slice(1))
      .join(" ");

  // Logout - try hook first, fallback to localStorage + redirect
  const handleLogout = () => {
   navigate("/")
  };

  const displayName = user?.name ? capitalizeName(user.name) : "User";

  return (
    <div
      ref={containerRef}
      className="relative px-3 pb-3 border-t"
      style={{ borderColor: colors.border ?? "#e5e7eb" }}
    >
      {/* Toggle button */}
      <button
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="w-full mt-3 px-3 py-2 rounded-lg flex items-center justify-between transition-colors"
        style={{
          backgroundColor: open
            ? colors.background ?? "#f9fafb"
            : "transparent",
        }}
      >
        <div className="flex items-center">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
            style={{ backgroundColor: colors.primary ?? "#2563eb" }}
          >
            {userRole.charAt(0)}
          </div>
          <div className="ml-2 text-left">
            <p
              className="text-xs font-semibold truncate"
              style={{ color: colors.textPrimary ?? "#111827" }}
            >
              {displayName}
            </p>
            <p
              className="text-xs"
              style={{ color: colors.textSecondary ?? "#6b7280" }}
            >
              {userRole}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`ml-1 w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          style={{ color: colors.textSecondary ?? "#6b7280" }}
        />
      </button>

      {/* Floating dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute left-3 right-3 mt-1 rounded-md shadow-lg z-50"
            style={{ backgroundColor: colors.card ?? "#fff" }}
          >
            <div
              onClick={() => {
                setOpen(false);
                navigate("/settings");
              }}
              className="w-full cursor-pointer px-3 py-2 rounded-lg flex items-center text-sm transition-colors hover:bg-gray-600/50"
              style={{ color: colors.textPrimary ?? "#111827" }}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </div>
            <div
              onClick={handleLogout}
              className="w-full cursor-pointer px-3 py-2 rounded-lg flex items-center text-sm transition-colors hover:bg-gray-600/50"
              style={{ color: colors.error ?? "#ef4444" }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Exit
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { ProfileDropdown };
