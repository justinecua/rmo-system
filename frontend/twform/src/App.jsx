import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/pages/loginPage";
import RegisterPage from "./features/auth/pages/regsiterPage";
import PrivateRoute from "./components/private/private_route";
import PublicRoute from "./components/public/public_route";

/*Dashboard */
import AdviserDashboard from "./features/user_types/adviser/pages/dashboard";
import DeanDashboard from "./features/user_types/dean/pages/dashboard";
import PanelDashboard from "./features/user_types/panel/pages/dashboard";
import RMOStaffDashboard from "./features/user_types/rmo_staff/pages/dashboard";
import StudentDashboard from "./features/user_types/student/pages/dashboard";
import HomePage from "./features/home/homepage";
import { useAuth } from "./context/useAuth";
import StudentForms from "./features/user_types/student/pages/forms";

/* Research  */
import RMOStaffAnnouncements from "./features/user_types/rmo_staff/pages/announcements";
import RMOStaffActivities from "./features/user_types/rmo_staff/pages/activities";
import RMOStaffIRA from "./features/user_types/rmo_staff/pages/ira";
import RMOStaffRCA from "./features/user_types/rmo_staff/pages/rca";
import RMOStaffForms from "./features/user_types/rmo_staff/pages/forms";
import RMOStaffArticles from "./features/user_types/rmo_staff/pages/articles";
import ArticleView from "./features/user_types/rmo_staff/components/articles/ArticleView";
import { Toaster } from "sonner";

import NotFoundPage from "./features/errors/NotFoundPage";
import { getDashboardPath } from "./utils/roleMap";

function App() {
  const { user, loading } = useAuth();

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            width: "fit-content",
            minWidth: "0",
            padding: "0.75rem 1rem",
          },
        }}
      />

      <Routes>
        {/* <Route path="/500" element={<ServerErrorPage />} /> */}
        <Route path="*" element={<NotFoundPage />} />

        <Route
          path="/"
          element={
            <PublicRoute>
              {" "}
              <HomePage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              {" "}
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              {" "}
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/adviser/dashboard"
          element={
            <PrivateRoute>
              <AdviserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dean/dashboard"
          element={
            <PrivateRoute>
              <DeanDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/panel/dashboard"
          element={
            <PrivateRoute>
              <PanelDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/research/dashboard"
          element={
            <PrivateRoute>
              <RMOStaffDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/research/announcements"
          element={
            <PrivateRoute>
              <RMOStaffAnnouncements />
            </PrivateRoute>
          }
        />
        <Route
          path="/research/activities"
          element={
            <PrivateRoute>
              <RMOStaffActivities />
            </PrivateRoute>
          }
        />
        <Route
          path="/research/ira"
          element={
            <PrivateRoute>
              <RMOStaffIRA />
            </PrivateRoute>
          }
        />
        <Route
          path="/research/rca"
          element={
            <PrivateRoute>
              <RMOStaffRCA />
            </PrivateRoute>
          }
        />
        <Route
          path="/research/forms"
          element={
            <PrivateRoute>
              <RMOStaffForms />
            </PrivateRoute>
          }
        />
        <Route
          path="/research/articles"
          element={
            <PrivateRoute>
              <RMOStaffArticles />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/dashboard"
          element={
            <PrivateRoute>
              <StudentDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/forms"
          element={
            <PrivateRoute>
              <StudentForms />
            </PrivateRoute>
          }
        />
        <Route
          path="/articles/:id"
          element={
            <PublicRoute>
              <ArticleView />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            user ? (
              <Navigate
                to={getDashboardPath(user.user_type) || "/login"}
                replace
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
