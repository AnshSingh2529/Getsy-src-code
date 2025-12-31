import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFetchJwtQuery } from "../api/authApi.js";
import { setCredentials } from "../../store/auth/authSlice.js";

const AuthGate = ({ children }) => {
  const dispatch = useDispatch();
  const { data, isSuccess } = useFetchJwtQuery();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(
        setCredentials({
          access: data.access,
          refresh: data.refresh,
          user: data.user,
        })
      );
    }
  }, [isSuccess, data, dispatch]);

  return children;
};

export default AuthGate;
