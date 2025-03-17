


import React, { useContext } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import "./styles/globals.css";

// Page imports
import HomePage from "./pages/HomePage";
import PickUp from "./pages/PickUp";
import Catering from "./pages/Catering";
import Backend from "./pages/Backend";
import AuthPage from "./pages/AuthPage";
import PartnerPage from "./pages/PartnerPage";
import OurStoryPage from "./pages/OurStoryPage";
import MerchPage from "./pages/MerchPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";

// Component imports
import HeaderTest from "./components/HeaderTest";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner"; // You'll need to create this component

// Context import
import { UserProvider, UserContext } from "./contexts/UserContext";

// Protected Route component
const ProtectedRoute = ({ element, requireAdmin }) => {

  const location = useLocation();
  const { user, loading } = useContext(UserContext);
  
  if (loading) {
    return <LoadingSpinner />; // Show loading spinner while checking auth
  }

  // Redirect to auth page if not authenticated
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Redirect to home if admin access is required but user is not admin
  if (requireAdmin && !user.isAdmin) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return element;
};

// AppContent component
function AppContent() {
  const location = useLocation();
  const { user, loading } = useContext(UserContext);

  // Optional: Show loading spinner while initial auth check is happening
  if (loading && location.pathname !== '/auth') {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* Show header on all pages except auth page */}
      {location.pathname !== "/auth" && <HeaderTest />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/pickup" element={<PickUp />} />
        <Route path="/catering" element={<Catering />} />
        <Route path="/partner" element={<PartnerPage />} />
        <Route path="/ourstory" element={<OurStoryPage />} />
        <Route path="/merch" element={<MerchPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Auth route - redirect to home if already logged in */}
        <Route 
          path="/auth" 
          element={
            user ? 
            <Navigate to="/home" replace /> : 
            <AuthPage />
          } 
        />

        {/* Protected routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute
              element={<CartPage />}
              requireAdmin={false}
            />
          }
        />
        <Route
          path="/backend"
          element={
            <ProtectedRoute
              element={<Backend />}
              requireAdmin={true}
            />
          }
        />
      </Routes>

      {/* Show footer on all pages except auth page */}
      {location.pathname !== "/auth" && <Footer />}
    </div>
  );
}

// Main App component
export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}