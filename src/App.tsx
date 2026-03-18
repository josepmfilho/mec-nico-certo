import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OficinaDashboard from "./pages/oficina/OficinaDashboard";
import MecanicoDashboard from "./pages/mecanico/MecanicoDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Oficina Routes */}
            <Route path="/oficina/dashboard" element={
              <ProtectedRoute allowedRoles={["oficina"]}><OficinaDashboard /></ProtectedRoute>
            } />

            {/* Mecânico Routes */}
            <Route path="/mecanico/dashboard" element={
              <ProtectedRoute allowedRoles={["mecanico"]}><MecanicoDashboard /></ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
