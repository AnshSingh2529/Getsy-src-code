// Layout/useResponsive.js
import { useState, useEffect } from "react";

/**
 * returns { isMobile, navbarHeight }
 * - uses requestAnimationFrame to throttle resize updates
 */
export default function useResponsive() {
  const [isMobile, setIsMobile] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(80);

  useEffect(() => {
    let rafId = null;

    const calc = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);

      if (w < 640) setNavbarHeight(48);
      else if (w < 768) setNavbarHeight(56);
      else if (w < 1024) setNavbarHeight(64);
      else setNavbarHeight(80);
    };

    const onResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        calc();
        rafId = null;
      });
    };

    // initial
    calc();
    window.addEventListener("resize", onResize);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { isMobile, navbarHeight };
}
