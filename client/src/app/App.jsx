import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { bootstrapAuth } from "../store/auth/authSlice";
import { router } from "./router.jsx";
import { RouterProvider } from "react-router-dom";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);
  return <RouterProvider router={router} />;
}
