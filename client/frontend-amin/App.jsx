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
// import { refreshToken, logout } from "./services/authService";
import ProtectedRoute from "./components/login/ProtectedRoute";

// Login Components
import AdminLogin from "./components/login/AdminLogin";

// CGS Admin pages
import CGSLayout from "./components/cgs/CGSLayout";
import CGSDashboard from "./pages/cgs/CGSDashboard";
import CGSRegisterUsers from "./pages/cgs/CGSRegisterUsers";
import CGSMonitoring from "./pages/cgs/CGSMonitoring";
import CGSVerifyDocuments from "./pages/cgs/CGSVerifyDocuments";
import CGSIndex from "./pages/cgs/Index";
import { set } from "date-fns";

// QueryClient
const queryClient = new QueryClient();

function AppWrapper() {
  const navigate = useNavigate();
  const location = useLocation();

  // Persistent login
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Block is render until check is done.
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    
    if (token && storedRole && !isTokenExpired(token)) {
      setIsAuthenticated(true);
      setRole(storedRole);
    } else {
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setRole(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const publicRoutes = ["/adminlogin", "/cgsindex"];
    if (!loading && !isAuthenticated && !publicRoutes.includes(location.pathname.toLowerCase())) {
      navigate("/cgsindex", { replace: true });
    }

    if (isAuthenticated && location.pathname === "/adminlogin") {
      navigate("/cgs/dashboard", { replace: true });
    }

}, [loading, isAuthenticated, navigate, location.pathname]);
  
  // Callback from Login.jsx
  const handleLogin = () => {
    localStorage.setItem("role", data.token);
    localStorage.setItem("role", data.role);
    setIsAuthenticated(true);
    setRole(data.role);

    if (data.role === "cgs") {
    navigate("/cgs/dashboard", {replace: true});
  } else {
    navigate("/login", {replace: true});
  }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
    navigate("/cgsindex", { replace: true }) // redirect after logout
  };

   if (loading)
  return (
    <div className="flex items-center justify-center h-screen text-lg font-semibold">
      Loading...
    </div>
  );
  
  return (

      <Routes>
      {/* ===== Landing Pages ===== */}
      <Route path="/" element={<Navigate to="/cgsindex" replace />} />
      <Route path="/cgsindex" element={<CGSIndex />} />

      {/* ===== LOGIN PAGES ===== */}
      <Route path="/adminlogin" element={<AdminLogin onLogin={handleLogin} />} />

      {/* ===== CGS ===== */}
      <Route path="/cgs/*" element={
        <ProtectedRoute isAuthenticated={isAuthenticated} >
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
      <Route path="*" element={<Navigate to="/cgsindex" replace />} />
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


// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";

// // React Query
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// // JWT utils
// import { isTokenExpired } from "./utils/jwt";
// import ProtectedRoute from "./components/login/ProtectedRoute";

// // Login Components
// import AdminLogin from "./components/login/AdminLogin";

// // CGS Admin pages
// import CGSLayout from "./components/cgs/CGSLayout";
// import CGSDashboard from "./pages/cgs/CGSDashboard";
// import CGSRegisterUsers from "./pages/cgs/CGSRegisterUsers";
// import CGSMonitoring from "./pages/cgs/CGSMonitoring";
// import CGSVerifyDocuments from "./pages/cgs/CGSVerifyDocuments";
// import CGSIndex from "./pages/cgs/Index";

// // QueryClient
// const queryClient = new QueryClient();

// function AppWrapper() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Persistent login state
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [role, setRole] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedRole = localStorage.getItem("role");

//     if (token && storedRole && !isTokenExpired(token)) {
//       setIsAuthenticated(true);
//       setRole(storedRole);
//     } else {
//       localStorage.removeItem("token");
//       localStorage.removeItem("role");
//       setIsAuthenticated(false);
//       setRole(null);
//     }
//     setLoading(false);
//   }, []);

//   // Redirect logic
//   useEffect(() => {
//     if (!loading) {
//       // If not authenticated and not on login/index pages
//       if (!isAuthenticated && location.pathname !== "/adminlogin" && location.pathname !== "/cgsindex") {
//         navigate("/cgsindex", { replace: true });
//       }

//       // If authenticated and on login page
//       if (isAuthenticated && location.pathname === "/adminlogin") {
//         navigate("/cgs/dashboard", { replace: true });
//       }
//     }
//   }, [loading, isAuthenticated, navigate, location.pathname]);

//   // Login callback
//   const handleLogin = (data) => {
//     localStorage.setItem("token", data.token); // save token
//     localStorage.setItem("role", data.role);
//     setIsAuthenticated(true);
//     setRole("data.role");
//     if (data.role === "cgs") {
//     navigate("/cgs/dashboard");
//   } else {
//     navigate("/login");
//   }
//   };

//   // Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     setIsAuthenticated(false);
//     setRole(null);
//     navigate("/cgsindex", { replace: true });
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center h-screen text-lg font-semibold">
//         Loading...
//       </div>
//     );

//   return (
//     <Routes>
//       {/* Landing page */}
//       <Route path="/" element={<Navigate to="/cgsindex" replace />} />
//       <Route path="/cgsindex" element={<CGSIndex />} />

//       {/* Login page */}
//       <Route path="/adminlogin" element={<AdminLogin onLogin={handleLogin} />} />

//       {/* CGS Admin */}
//       <Route
//         path="/cgs/*"
//         element={
//           <ProtectedRoute isAuthenticated={isAuthenticated} userRole={role} allowedRole="cgs">
//             <CGSLayout onLogout={handleLogout} />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<Navigate to="dashboard" replace />} />
//         <Route path="dashboard" element={<CGSDashboard />} />
//         <Route path="register" element={<CGSRegisterUsers />} />
//         <Route path="monitoring" element={<CGSMonitoring />} />
//         <Route path="documents" element={<CGSVerifyDocuments />} />
//       </Route>

//       {/* Fallback */}
//       <Route path="*" element={<Navigate to="/cgsindex" replace />} />
//     </Routes>
//   );
// }

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Router>
//         <AppWrapper />
//       </Router>
//     </QueryClientProvider>
//   );
// }