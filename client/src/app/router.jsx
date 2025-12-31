import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
// """""""""""""""
// local imports
// """""""""""""""
import ProtectedRoutes from "../routes/ProtectedRoutes.js";
// import from layouts...
import Layout from "../layouts/Layout.jsx";
// import from pages...
import Home from "../pages/Home.jsx";
import PostProperty from "../pages/postProperty/PostProperty.jsx";
import HireDealerAgenciesModal from "../pages/HireDealerAgenciesModal.jsx";
import LoginPage from "../pages/authentication/LoginPage.jsx";
import CommonView from "../pages/propertyPages/CommonView.jsx";
import ForCouples from "../pages/propertyPages/ThroughAgents/ForCouples.jsx";
import ForFamilies from "../pages/propertyPages/ThroughAgents/ForFamilies.jsx";
import UserProfile from "../pages/UserProfile.jsx";
import NotFound from "../pages/NotFound.jsx";
// import form dashboard...
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
        <ProtectedRoutes allowedRoles={["agency", "dealer"]}>
          {" "}
          <Route path="post-property" element={<PostProperty />} />{" "}
        </ProtectedRoutes>

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
      <ProtectedRoutes allowedRoles={["user", "agency", "dealer"]}>
        {" "}
        <Route path="user-profile" element={<UserProfile />}>
          {/* User-Nested-Routes */}
        </Route>
      </ProtectedRoutes>

      {/* Dashboard-Section */}
      <ProtectedRoutes allowedRoles={["agency"]}>
        {" "}
        <Route path="agent-dashboard" element={<AgencyDashboard />}>
          {/* Agent-Nested-Routes */}
        </Route>
      </ProtectedRoutes>
      <ProtectedRoutes allowedRoles={["dealer"]}>
        {" "}
        <Route path="dealer-dashboard" element={<DealersDashboard />}>
          {/* Dealer-Nested-Routes */}
        </Route>
      </ProtectedRoutes>

      <Route path="*" element={<NotFound />} />
    </>
  )
);
