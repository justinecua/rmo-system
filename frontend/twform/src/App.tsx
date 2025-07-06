import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/pages/loginPage";
import HomePage from "./features/student/pages/homepage";
import PrivateRoute from "./components/private/private_route";
import PublicRoute from "./components/public/public_route";

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            {" "}
            {/* optional, for redirecting if already logged in */}
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      {/* <Route
        path="/profile"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      /> */}
      <Route path="*" element={<Navigate to="/login" replace />} />{" "}
      {/* catch-all fallback */}
    </Routes>
  );
}

export default App;
