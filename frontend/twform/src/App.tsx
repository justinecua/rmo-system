import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/pages/loginPage";
import HomePage from "./features/user_types/student/pages/homepage";
import PrivateRoute from "./components/private/private_route";
import PublicRoute from "./components/public/public_route";

/*Dashboard */
import AdviserDashboard from "./features/user_types/adviser/pages/dashboard";
import DeanDashboard from "./features/user_types/dean/pages/dashboard";
import PanelDashboard from "./features/user_types/panel/pages/dashboard";
import RMOStaffDashboard from "./features/user_types/rmo_staff/pages/dashboard";
import StudentDashboard from "./features/user_types/student/pages/dashboard";
import { useAuth } from "./context/useAuth";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return (
    <Routes>
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
        path="/rmo_staff/dashboard"
        element={
          <PrivateRoute>
            <RMOStaffDashboard />
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
        path="/"
        element={
          user && user.user_type ? (
            <Navigate
              to={`/${user.user_type
                .toLowerCase()
                .replace(" ", "_")}/dashboard`}
              replace
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* catch-all fallback */}
    </Routes>
  );
}

export default App;
