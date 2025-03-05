import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to check if the user is already logged in (persist login)
  const checkAuth = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/auth/me", { withCredentials: true });
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
      console.error("Checking auth failed", error.response?.data || error.message);
    }
  };

  // Run checkAuth() when the app starts
  useEffect(() => {
    checkAuth();
  }, []);

  // Register function
  const register = async (username,email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        {username,email, password },
        { withCredentials: true }
      );

      setUser(res.data.user); // Store user info in state
      return { success: true, message: "Registration successful!" };
    } catch (error) {
      console.error("Registration failed", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed. Please try again.",
      };
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      setUser(res.data.user); // Store user info in state
      return { success: true, message: "Login successful!" };
    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed. Please try again.",
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
      return { success: true, message: "Logout successful!" };
    } catch (error) {
      console.error("Logout failed", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Logout failed. Please try again.",
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};