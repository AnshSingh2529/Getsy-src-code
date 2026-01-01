import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { CorruptedAuthState } from "../pages/errors/CorruptedAuthState.jsx";
import { GetsyAuthPage } from "../pages/errors/GetsyAuthPage.jsx";
import { Unauthorized } from "../pages/errors/Unauthorized.jsx";
import LoadingSpinner from "../utils/LoadingSpinner.jsx";

export const ProtectedRoutes = ({ allowedRoles = [] }) => {
  const { isAuthenticated, user, isLoading, tokenValid } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <LoadingSpinner /> <span className="ml-2">Checking session…</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <GetsyAuthPage tokenValid={tokenValid} />;
  }

  if (!user?.role) {
    return <CorruptedAuthState />;
  }

  if (allowedRoles.length && !allowedRoles.includes(user?.role)) {
    return <Unauthorized userRole={user?.role} requiredRoles={allowedRoles} />;
  }

  return <Outlet />;
};
