import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./main.css";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

// Local Imports
import Home from "./pages/Home.jsx";
import HireDealerAgenciesModal from "./pages/HireDealerAgenciesModal.jsx";
import PostProperty from "./pages/PostProperty.jsx";
import LoginPage from "./pages/authentication/LoginPage.jsx";

// Property Views Imports
import CommonView from "./pages/PropertyViews/CommonView.jsx";
import OwnersForBachelors from "./pages/PropertyViews/ThroughOwners/OwnersForBachelors.jsx";
import ForCouples from "./pages/PropertyViews/ThroughAgents/ForCouples.jsx";
import ForFamilies from "./pages/PropertyViews/ThroughAgents/ForFamilies.jsx";

import Layout from "./Layout/Layout.jsx";

// Dashboard Imports

import AgentDashboard from "./Dashboards/Agents/AgentDashboard.jsx";
import AuthGate from "./components/AuthGate.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* PUBLIC_ROUTES */}

      {/* page-routes */}
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route
        path="top-dealer-agencies-list"
        element={<HireDealerAgenciesModal />}
      />
      <Route path="post-property" element={<PostProperty />} />
      <Route path="/auth/login" element={<LoginPage />} />
      {/* auth-routes */}

      {/* Dashboard-Section */}
      <Route path="agent-dashboard" element={<AgentDashboard />}>
        {/* Agent-Nested-Routes */}
      </Route>

      {/* Property-Views-Section */}
      <Route path="property-view/common" element={<CommonView />} />
      <Route
        path="property-view/owners-for-bachelors"
        element={<OwnersForBachelors />}
      />
      <Route path="property-view/for-couples" element={<ForCouples />} />
      <Route path="property-view/for-families" element={<ForFamilies />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthGate>
        <RouterProvider router={router} />
      </AuthGate>
    </Provider>
  </StrictMode>
);
