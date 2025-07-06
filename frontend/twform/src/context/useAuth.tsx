import React, { createContext, useContext, useState, useEffect } from "react";
import {
  authenticated_user,
  login,
  logout,
  register,
} from "../api/auth/endpoint";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await authenticated_user();
      setUser(res); // 👈 Save the logged in user
      console.log("Fetching user...");
      console.log("Fetched user:", res);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false); // 👈 Important!
    }
  };

  useEffect(() => {
    fetchUser(); // 👈 Load user on first mount
  }, []);

  const loginUser = async (email, password) => {
    const res = await login(email, password);
    if (res.success) {
      await fetchUser(); // 👈 Get user after login
      return true;
    }
    return false;
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
