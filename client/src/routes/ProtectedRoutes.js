import { useAuth } from "../hooks/useAuth";
import CorruptedAuthState from "../pages/errors/CorruptedAuthState.jsx";
import Unauthenticated from "../pages/errors/Unauthenticated.jsx";
import Unauthorized from "../pages/errors/Unauthorized.jsx";

const ProtectedRoutes = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, isLoading, tokenValid } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Unauthenticated tokenValid={tokenValid} />;
  }

  if (!user?.role) {
    return <CorruptedAuthState />;
  }

  if (allowedRoles.length && !allowedRoles.includes(user?.role)) {
    return <Unauthorized userRole={user?.role} requiredRoles={allowedRoles} />;
  }

  return children;
};

export default ProtectedRoutes;
