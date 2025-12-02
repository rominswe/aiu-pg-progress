import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CGSLayout from "./components/cgs/CGSLayout";
import CGSDashboard from "./pages/cgs/CGSDashboard";
import CGSRegisterUsers from "./pages/cgs/CGSRegisterUsers";
import CGSMonitoring from "./pages/cgs/CGSMonitoring";
import CGSVerifyDocuments from "./pages/cgs/CGSVerifyDocuments";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* CGS Staff Routes */}
          <Route path="/cgs" element={<CGSLayout />}>
            <Route index element={<Navigate to="/cgs/dashboard" replace />} />
            <Route path="dashboard" element={<CGSDashboard />} />
            <Route path="register" element={<CGSRegisterUsers />} />
            <Route path="monitoring" element={<CGSMonitoring />} />
            <Route path="documents" element={<CGSVerifyDocuments />} />
          </Route>

          {/* Login Page Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;