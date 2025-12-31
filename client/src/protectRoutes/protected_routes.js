import React, { useState, useEffect } from "react";
import {
  Shield,
  Lock,
  AlertCircle,
  Home,
  LogIn,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

// ============================================
// PROTECTED ROUTE COMPONENT
// ============================================

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, isLoading, tokenValid } = useAuth();

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Check 1: User not authenticated
  if (!isAuthenticated) {
    return <Unauthenticated tokenValid={tokenValid} />;
  }

  // Check 2: User authenticated but role missing/corrupted
  if (!user?.role) {
    return <CorruptedAuthState />;
  }

  // Check 3: User authenticated but lacks required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Unauthorized userRole={user.role} requiredRoles={allowedRoles} />;
  }

  // All checks passed - render protected content
  return children;
};


// ============================================
// ROUTER & APP
// ============================================

const Router = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Update path when href changes
  useEffect(() => {
    const originalPushState = window.history.pushState;
    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      setCurrentPath(window.location.pathname);
    };
  }, []);

  const routes = {
    "/": <HomePage />,
    "/dashboard": (
      <ProtectedRoute allowedRoles={["user", "agency", "dealer", "admin"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
    "/user-profile": (
      <ProtectedRoute allowedRoles={["user", "agency", "dealer"]}>
        <UserProfile />
      </ProtectedRoute>
    ),
    "/agency": (
      <ProtectedRoute allowedRoles={["agency"]}>
        <AgencyDashboard />
      </ProtectedRoute>
    ),
    "/dealer": (
      <ProtectedRoute allowedRoles={["dealer"]}>
        <DealerPortal />
      </ProtectedRoute>
    ),
  };

  return routes[currentPath] || <NotFound />;
};

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
