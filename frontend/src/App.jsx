

import React, { useState, useEffect } from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Vendors from "./pages/Vendors";
import Products from "./pages/Products";

function App() {

  // ================= DARK MODE =================

  const [darkMode, setDarkMode] = useState(

    JSON.parse(localStorage.getItem("darkMode")) || true

  );

  // ================= AUTH STATE =================

  const [isAuthenticated, setIsAuthenticated] = useState(

    JSON.parse(localStorage.getItem("isAuthenticated")) || false

  );

  // ================= DARK MODE APPLY =================

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

  // ================= SAVE LOGIN =================

  useEffect(() => {

    localStorage.setItem(
      "isAuthenticated",
      JSON.stringify(isAuthenticated)
    );

  }, [isAuthenticated]);

  return (

    <div className="bg-white dark:bg-[#070B14] transition duration-300">

      <Routes>

        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={
            <Home
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        {/* ================= LOGIN ================= */}

        <Route
          path="/login"
          element={

            isAuthenticated ? (

              <Navigate to="/home" />

            ) : (

              <Login
                darkMode={darkMode}
                setIsAuthenticated={setIsAuthenticated}
              />

            )
          }
        />

        {/* ================= REGISTER ================= */}

        <Route
          path="/register"
          element={

            isAuthenticated ? (

              <Navigate to="/home" />

            ) : (

              <Register
                darkMode={darkMode}
              />

            )
          }
        />

        {/* ================= DASHBOARD ================= */}

        <Route
          path="/dashboard"
          element={

            isAuthenticated ? (

              <Dashboard
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                setIsAuthenticated={setIsAuthenticated}
              />

            ) : (

              <Navigate to="/login" />

            )
          }
        />

        {/* ================= VENDORS ================= */}

        <Route
          path="/vendors"
          element={

            isAuthenticated ? (

              <Vendors
                darkMode={darkMode}
              />

            ) : (

              <Navigate to="/login" />

            )
          }
        />

        {/* ================= PRODUCTS ================= */}

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

        {/* ================= INVALID ROUTE ================= */}

        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    </div>
  );
}

export default App;