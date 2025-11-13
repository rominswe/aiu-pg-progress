import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./components/login/Login";
import CGSAdminLogin from "./components/login/CGSAdminLogin";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/student/Dashboard";
import Uploads from "./pages/student/Uploads";
import ThesisSubmission from "./pages/student/ThesisSubmission";
import ProgressUpdates from "./pages/student/ProgressUpdates";
import Feedback from "./pages/student/Feedback";
import Analytics from "./pages/student/Analytics";
import SupervisorLayout from "./components/SupervisorLayout";
import SupervisorDashboard from "./pages/supervisor/Dashboard";
import StudentList from "./pages/supervisor/StudentList";
import ReviewSubmissions from "./pages/supervisor/ReviewSubmissions";
import ExaminerLayout from "./components/ExaminerLayout";
import ExaminerDashboard from "./pages/examiner/Dashboard";
import CGSAdminLayout from "./components/CGSAdminLayout";
import CGSAdminDashboard from "./pages/cgs-admin/Dashboard";
import SupervisorManagement from "./pages/cgs-admin/SupervisorManagement";
import StudentManagement from "./pages/cgs-admin/StudentManagement";
import CGSAnalytics from "./pages/cgs-admin/Analytics";

function AppWrapper() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (token && storedRole) {
      setIsAuthenticated(true);
      setRole(storedRole);
      // Redirect to appropriate dashboard if trying to access login
      if (window.location.pathname === "/login" || window.location.pathname === "/") {
        if (storedRole === "student") navigate("/student/dashboard");
        else if (storedRole === "supervisor") navigate("/supervisor/dashboard");
        else if (storedRole === "examiner") navigate("/examiner/dashboard");
        else if (storedRole === "cgs-admin") navigate("/cgs-admin/dashboard");
      }
    } else {
      if (!["/login", "/cgs-admin/login"].includes(window.location.pathname)) {
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleLogin = (userRole) => {
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start">
      <h1 className="text-3xl font-bold my-4">AIU PG Progress System</h1>

      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              role === "supervisor" ? (
                <Navigate to="/supervisor/dashboard" />
              ) : role === "examiner" ? (
                <Navigate to="/examiner/dashboard" />
              ) : role === "cgs-admin" ? (
                <Navigate to="/cgs-admin/dashboard" />
              ) : (
                <Navigate to="/student/dashboard" />
              )
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/cgs-admin/login"
          element={
            isAuthenticated && role === "cgs-admin" ? (
              <Navigate to="/cgs-admin/dashboard" />
            ) : (
              <CGSAdminLogin onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/student"
          element={
            isAuthenticated && role === "student" ? (
              <DashboardLayout onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route index element={<Navigate to="/student/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="uploads" element={<Uploads />} />
          <Route path="thesis-submission" element={<ThesisSubmission />} />
          <Route path="progress-updates" element={<ProgressUpdates />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        <Route
          path="/supervisor"
          element={
            isAuthenticated && role === "supervisor" ? (
              <SupervisorLayout onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<SupervisorDashboard />} />
          <Route path="students" element={<StudentList />} />
          <Route path="review-submissions" element={<ReviewSubmissions />} />
        </Route>

        <Route
          path="/examiner"
          element={
            isAuthenticated && role === "examiner" ? (
              <ExaminerLayout onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<ExaminerDashboard />} />
        </Route>

        <Route
          path="/cgs-admin"
          element={
            isAuthenticated && role === "cgs-admin" ? (
              <CGSAdminLayout onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<CGSAdminDashboard />} />
          <Route path="supervisors" element={<SupervisorManagement />} />
          <Route path="students" element={<StudentManagement />} />
          <Route path="analytics" element={<CGSAnalytics />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}