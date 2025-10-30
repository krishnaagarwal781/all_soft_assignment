import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import StaticAdminRegistration from "./components/Auth/StaticAdminRegistration";
import Layout from "./components/Layout";
import { useState, useEffect } from "react";

const AuthContext = React.createContext();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("authToken") ? true : false;
  });

  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    if (authToken) {
      setIsAuthenticated(true);
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("userId", userId);
    } else {
      setIsAuthenticated(false);
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
    }
  }, [authToken, userId, isAuthenticated]);

  const login = (token, id) => {
    setAuthToken(token);
    setUserId(id);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setAuthToken(null);
    setUserId(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, authToken, userId, login, logout }}
    >
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Layout>
                  <DashboardPage />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="admin-register"
            element={
              <Layout>
                <StaticAdminRegistration />
              </Layout>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
export { AuthContext };
