import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import NavbarContainer from "./NavbarContainer.jsx";
import FooterContainer from "./FooterContainer.jsx";
import PageTransition from "./PageTransitions.jsx";

import useResponsive from "./UseResponsive.jsx";
import useScroll from "./UseScroll.jsx";
import ScrollToTop from "./ScrollTOTop.jsx";

const Layout = () => {
  const location = useLocation();
  const { isMobile, navbarHeight } = useResponsive();
  const scrollY = useScroll();

  const noFooterRoutes = [
    "/user-dashboard",
    "/agent-dashboard",
    "/admin-dashboard",
    "/owner-dashboard",
    "/hire-agents",
  ];
  const noNavbarRoutes = [
    "/user-dashboard",
    "/agent-dashboard",
    "/admin-dashboard",
    "/owner-dashboard",
  ];

  const isFooterExcluded = noFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
  const isNavbarExcluded = noNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  const isDashboardRoute = noFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  const fullHeightRoutes = ["/", "/property"];
  const isFullHeightRoute = fullHeightRoutes.some(
    (route) =>
      location.pathname === route || location.pathname.startsWith("/property/")
  );

  return (
    <div className="min-h-screen select-none bg-surface-dark dark:bg-[#131515] transition-colors duration-300 outline-none">
      {/* Toaster kept in Layout so it's globally available */}
      <Toaster
        position={isMobile ? "top-center" : "top-right"}
        gutter={isMobile ? 8 : 12}
        containerStyle={{
          top: navbarHeight + 10,
          left: isMobile ? 16 : undefined,
          right: isMobile ? 16 : undefined,
          zIndex: 9999,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            padding: isMobile ? "12px 16px" : "16px 20px",
            color: "#fff",
            fontSize: isMobile ? "14px" : "15px",
            fontWeight: "500",
            boxShadow:
              "0 10px 40px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
            maxWidth: isMobile ? "calc(100vw - 32px)" : "400px",
          },
          success: {
            style: {
              background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
            },
            iconTheme: { primary: "#fff", secondary: "#11998e" },
          },
          error: {
            style: {
              background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
            },
            iconTheme: { primary: "#fff", secondary: "#ff6b6b" },
          },
          loading: {
            style: {
              background: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
            },
          },
        }}
      />

      {/* Navbar */}
      {!isNavbarExcluded && (
        <NavbarContainer navbarHeight={navbarHeight} scrollY={scrollY} />
      )}

      {/* Main Content */}
      <main
        className="w-full transition-all duration-300"
        style={{
          paddingTop: navbarHeight,
          minHeight: `calc(100vh - ${!isFooterExcluded ? 200 : 0}px)`,
        }}
      >
        <div
          className={`w-full ${
            isDashboardRoute
              ? ""
              : isFullHeightRoute
              ? ""
              : "px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16"
          }`}
        >
          <ScrollToTop />
          <PageTransition
            keyProp={location.pathname}
            isFullHeightRoute={isFullHeightRoute}
            navbarHeight={navbarHeight}
          >
            <Outlet />
          </PageTransition>
        </div>
      </main>

      {/* Footer */}
      {!isFooterExcluded && <FooterContainer />}

      {location.state?.isLoading && (
        <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
              <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-b-purple-600 rounded-full animate-spin animate-reverse" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base">
              Loading...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
