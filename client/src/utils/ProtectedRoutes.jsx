import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function ProtectedRoutes() {
  const access = useSelector((state) => state.auth.access);

  if (!access) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(access);
    const isExpired = decoded.exp * 1000 < Date.now();
    if (isExpired) {
      return <Navigate to="/login" replace />;
    }
  } catch {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
