// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation, replace } from "react-router-dom";
import { useState, useEffect } from "react";

// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// UI utilities (Toaster, Sonner, Tooltip)
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { isTokenExpired } from "./utils/jwt";
import { refreshToken, logout } from "./services/authService";
import ProtectedRoute from "./components/login/ProtectedRoute";

// Login Components
import AdminLogin from "./components/login/AdminLogin";

// CGS Admin pages
import CGSLayout from "./components/cgs/CGSLayout";
import CGSDashboard from "./pages/cgs/CGSDashboard";
import CGSRegisterUsers from "./pages/cgs/CGSRegisterUsers";
import CGSMonitoring from "./pages/cgs/CGSMonitoring";
import CGSVerifyDocuments from "./pages/cgs/CGSVerifyDocuments";

// QueryClient
const queryClient = new QueryClient();

function AppWrapper() {
  const navigate = useNavigate();

  // Persistent login
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const location = useLocation();
  const [loading, setLoading] = useState(true); // Block is render until check is done.

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    
    if (token && storedRole === "cgs" && !isTokenExpired(token)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
  if (!loading && !isAuthenticated && location.pathname !== "/adminlogin" ) {
    navigate("/adminlogin", { replace: true });
  }
}, [loading, isAuthenticated, navigate, location.pathname]);
  
  // Callback from Login.jsx
  const handleLogin = () => {
    localStorage.setItem("role", "cgs");
    setIsAuthenticated(true);
    navigate("/cgs/dashboard"); {replace: true};
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
    navigate("/adminlogin", {replace: ture} ) // redirect after logout
  };

   if (loading)
  return (
    <div className="flex items-center justify-center h-screen text-lg font-semibold">
      Loading...
    </div>
  );
  
  return (

      <Routes>
      {/* ===== LOGIN PAGES ===== */}
      <Route path="/adminlogin" element={<AdminLogin onLogin={handleLogin} />} />

      {/* ===== CGS ===== */}
      <Route path="/cgs/*" element={
        <ProtectedRoute isAuthenticated={isAuthenticated} userRole="cgs" allowedRole="cgs">
          <CGSLayout onLogout={handleLogout} />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<CGSDashboard />} />
        <Route path="register" element={<CGSRegisterUsers />} />
        <Route path="monitoring" element={<CGSMonitoring />} />
        <Route path="documents" element={<CGSVerifyDocuments />} />
      </Route>

      {/* ===== FALLBACK ===== */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

// Export wrapper
export default function App() {
  return (
     <QueryClientProvider client={queryClient}>
    <Router>
      <AppWrapper />
    </Router>
    </QueryClientProvider>
  );
}