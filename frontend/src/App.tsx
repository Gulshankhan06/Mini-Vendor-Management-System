import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// ================= PAGES =================
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Vendors from "./pages/Vendors";
import Categories from "./pages/Categories";
import VerifyEmail from "./pages/VerifyEmail";
import Chat from "./pages/Chat";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DataDeletion from "./pages/DataDeletion";
import LoginSuccess from "./pages/LoginSuccess";

import SplitChatDemo from "./components/SplitChatDemo";


// ================= VENDOR PAGES =================
import VendorDashboard from "./pages/VendorDashboard";
import VendorOrders from "./pages/Order";
import VendorChat from "./pages/VendorChat";
import VendorProfile from "./pages/Profile";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem("darkMode") || "true");
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return !!token && !!user;
});
  // ================= DARK MODE =================
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // ================= AUTH SYNC =================
  // useEffect(() => {
  //   localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  // }, [isAuthenticated]);

  useEffect(() => {
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    setIsAuthenticated(!!token && !!user);
  };

  window.addEventListener("storage", checkAuth);

  return () => window.removeEventListener("storage", checkAuth);
}, []);
  return (
    <div className="min-h-screen bg-white dark:bg-[#070B14] transition-all duration-300">

      <Routes>

        {/* ================= HOME ================= */}
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

        {/* ================= LOGIN ================= */}
        
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
/><Route
  path="/register"
  element={
    isAuthenticated ? (
      <Navigate to="/" />
    ) : (
      <Register darkMode={darkMode} />
    )
  }
/>
       
        {/* ================= VERIFY EMAIL ================= */}
 <Route
  path="/verify-email"
  element={
    <VerifyEmail
      setIsAuthenticated={setIsAuthenticated}
      darkMode={darkMode}
    />
  }
/>
        {/* ================= GOOGLE LOGIN SUCCESS ================= */}
        <Route
          path="/login-success"
          element={
            <LoginSuccess setIsAuthenticated={setIsAuthenticated} />
          }
        />

        {/* ================= ADMIN DASHBOARD ================= */}
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


        {/* ================= ADMIN MODULES ================= */}
        <Route
          path="/vendors"
          element={
            isAuthenticated ? (
         <Vendors
  darkMode={darkMode}
  setDarkMode={setDarkMode}
  setIsAuthenticated={setIsAuthenticated}
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
  setIsAuthenticated={setIsAuthenticated}
/>            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/categories"
          element={
            isAuthenticated ? (
              <Categories darkMode={darkMode} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
<Route
  path="/chat"
  element={
    isAuthenticated ? (
      <Chat />
    ) : (
      <Navigate to="/login" />
    )
  }
/>

<Route
  path="/split-chat"
  element={
    isAuthenticated ? (
      <SplitChatDemo darkMode={darkMode} />
    ) : (
      <Navigate to="/login" />
    )
  }
/>
    

        {/* ================= VENDOR ================= */}
        <Route
          path="/vendor-dashboard"
          element={
            isAuthenticated ? (
              <VendorDashboard darkMode={darkMode} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/vendor-orders"
          element={
            isAuthenticated ? (
              <VendorOrders darkMode={darkMode} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/vendor-chat"
          element={
            isAuthenticated ? (
              <VendorChat darkMode={darkMode} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/vendor-profile"
          element={
            isAuthenticated ? (
              <VendorProfile darkMode={darkMode} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ================= EXTRA PAGES ================= */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/delete-data" element={<DataDeletion />} />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </div>
  );
}

export default App;