// hooks/useAuth.js
import { useSelector, useDispatch } from "react-redux";
import { setCredentials, logout } from "../store/auth/authSlice.js";

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return {
    ...auth,
    login: (user) => dispatch(setCredentials(user)),
    logout: () => dispatch(logout()),
  };
};
