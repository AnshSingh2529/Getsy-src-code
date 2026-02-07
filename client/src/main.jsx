import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./main.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
// local imports...
import { store } from "./store/store.js";
import { router } from "./app/router.jsx";
import AuthGate from "./services/auth/AuthGate.jsx";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthGate>
        <RouterProvider router={router} />
      </AuthGate>
    </Provider>
  </StrictMode>,
);
