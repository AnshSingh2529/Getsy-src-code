import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
// """""""""""""""
// local imports
// """""""""""""""
import { ProtectedRoutes } from "../routes/ProtectedRoutes.jsx";
// import from layouts...
import Layout from "../layouts/Layout.jsx";
// import from pages...
// import Home from "../pages/Home.jsx";
import PostProperty from "../pages/postProperty/PostProperty.jsx";
import HireDealerAgenciesModal from "../pages/AgencyDealerPropertyPage/HireDealerAgenciesModal.jsx";
import LoginPage from "../pages/authentication/LoginPage.jsx";
import CommonView from "../pages/propertyPages/CommonView.jsx";
import ForCouples from "../pages/propertyPages/ThroughAgents/ForCouples.jsx";
import ForFamilies from "../pages/propertyPages/ThroughAgents/ForFamilies.jsx";
import UserProfile from "../pages/UserProfile.jsx";
import Getsy404Page from "../pages/Getsy404Page.jsx";
import DealersForBachelors from "../pages/propertyPages/ThroughDealers/DealersForBachelors.jsx";
// import form dashboard...
import AgencyDashboard from "../dashboards/Agents/AgencyDashboard.jsx";
import DealersDashboard from "../dashboards/Dealers/DealersDashboard.jsx";
import AgencyRegistration from "../pages/NewRegistrationPage/AgencyRegistration.jsx";
import HomePage from "../components/main/EnhancedHomePage.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        {/* PUBLIC_ROUTES */}

        {/* page-routes */}
        {/* <Route index element={<Home />} /> */}
        <Route index element={<HomePage />} />
        <Route path="top-agencies" element={<HireDealerAgenciesModal />} />

        <Route
          element={<ProtectedRoutes allowedRoles={["agency", "dealer"]} />}
        >
          {" "}
          <Route path="post-property" element={<PostProperty />} />{" "}
        </Route>

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
      </Route>
      <Route>
        <Route
          element={
            <ProtectedRoutes allowedRoles={["user", "agency", "dealer"]} />
          }
        >
          {" "}
          <Route path="user-profile" element={<UserProfile />}>
            {/* User-Nested-Routes */}
          </Route>
        </Route>

        {/* Dashboard-Section */}
        <Route element={<ProtectedRoutes allowedRoles={["agency"]} />}>
          {" "}
          <Route path="agent-dashboard" element={<AgencyDashboard />}>
            {/* Agent-Nested-Routes */}
          </Route>
        </Route>
        <Route element={<ProtectedRoutes allowedRoles={["dealer"]} />}>
          {" "}
          <Route path="dealer-dashboard" element={<DealersDashboard />}>
            {/* Dealer-Nested-Routes */}
          </Route>
        </Route>

        <Route path="*" element={<Getsy404Page />} />
        <Route path="/register-your-firm" element={<AgencyRegistration />} />
      </Route>
    </>,
  ),
);
