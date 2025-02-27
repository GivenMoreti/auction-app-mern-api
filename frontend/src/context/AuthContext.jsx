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
    }
  };

  // Run checkAuth() when the app starts
  useEffect(() => {
    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      
      setUser(res.data.user); // Store user info in state
      return true;
    } catch (error) {
      console.error("Login failed", error.response.data);
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
