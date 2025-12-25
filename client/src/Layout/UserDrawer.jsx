// Layout/useDrawer.js (simple)
import { useCallback, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const closeDrawer = useCallback(() => setIsOpen(false), []);
  const openDrawer = useCallback(() => setIsOpen(true), []);
  const toggleDrawer = useCallback(() => setIsOpen((s) => !s), []);

  useEffect(() => {
    // close drawer when route changes
    setIsOpen(false);
  }, [location.pathname]);

  return { isOpen, toggleDrawer, openDrawer, closeDrawer };
}
