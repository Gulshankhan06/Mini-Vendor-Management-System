import { useState, useEffect } from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Vendors from "./pages/Vendors";

function App() {

  const [darkMode, setDarkMode] = useState<boolean>(
    JSON.parse(localStorage.getItem("darkMode") || "true")
  );

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    JSON.parse(localStorage.getItem("isAuthenticated") || "false")
  );

  useEffect(() => {

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );

  }, [darkMode]);

  useEffect(() => {

    localStorage.setItem(
      "isAuthenticated",
      JSON.stringify(isAuthenticated)
    );

  }, [isAuthenticated]);

  return (
    <div className="bg-white dark:bg-[#070B14] transition duration-300">

      <Routes>

        <Route
          path="/"
          element={
            <Home
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Login
                darkMode={darkMode}
                setIsAuthenticated={setIsAuthenticated}
              />
            )
          }
        />

        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Register />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard
                darkMode={darkMode}
                setIsAuthenticated={setIsAuthenticated}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/vendors"
          element={
            isAuthenticated ? (
              <Vendors
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/products"
          element={
            isAuthenticated ? (
              <Products
                darkMode={darkMode}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    </div>
  );
}

export default App;
