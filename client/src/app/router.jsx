import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../layouts/Layout.jsx";
import {
  Home,
  PostProperty,
  LoginPage,
  UserProfile,
  NotFound,
  HireDealerAgenciesModal,
} from "../pages";
import LoginPage from "../pages/authentication/LoginPage.jsx";
import CommonView from "../pages/propertyPages/CommonView.jsx";
import { ForCouples, ForFamilies } from "../pages/propertyPages/ThroughAgents";
import AgencyDashboard from "../dashboards/Agents/AgencyDashboard.jsx";
import DealersDashboard from "../dashboards/Dealers/DealersDashboard.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
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

        {/* Property-Views-Section */}
        <Route path="property-view/common" element={<CommonView />} />
        <Route
          path="property-view/dealers-for-bachelors"
          element={<DealersForBachelors />}
        />
        <Route path="property-view/for-couples" element={<ForCouples />} />
        <Route path="property-view/for-families" element={<ForFamilies />} />

        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="user-profile" element={<UserProfile />}>
        {/* User-Nested-Routes */}
      </Route>
      {/* Dashboard-Section */}
      <Route path="agent-dashboard" element={<AgencyDashboard />}>
        {/* Agent-Nested-Routes */}
      </Route>
      <Route path="dealer-dashboard" element={<DealersDashboard />}>
        {/* Dealer-Nested-Routes */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);
