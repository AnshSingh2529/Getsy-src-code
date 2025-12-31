import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
// local imports...
import { bootstrapAuth } from "../store/auth/authSlice.js";
import { router } from "./router.jsx";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);
  return <RouterProvider router={router} />;
}
