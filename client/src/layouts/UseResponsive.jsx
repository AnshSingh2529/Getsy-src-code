import { useState, useEffect } from "react";

export default function useResponsive() {
  const [isMobile, setIsMobile] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(50);

  useEffect(() => {
    let rafId;

    const measure = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);

      const navbar = document.querySelector("header"); // your Navbar root
      if (navbar) {
        const rect = navbar.getBoundingClientRect();
        setNavbarHeight(Math.round(rect.height));
      }
    };

    const onResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        measure();
        rafId = null;
      });
    };

    // Initial measurement
    measure();

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return { isMobile, navbarHeight };
}