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
import CadastroOficina from "./pages/cadastro/CadastroOficina";
import CadastroMecanico from "./pages/cadastro/CadastroMecanico";
import OficinaDashboard from "./pages/oficina/OficinaDashboard";
import OficinaNovaDemanda from "./pages/oficina/OficinaNovaDemanda";
import OficinaDemandaDetalhe from "./pages/oficina/OficinaDemandaDetalhe";
import MecanicoDashboard from "./pages/mecanico/MecanicoDashboard";
import MecanicoAguardandoAprovacao from "./pages/mecanico/MecanicoAguardandoAprovacao";
import MecanicoDemandaDetalhe from "./pages/mecanico/MecanicoDemandaDetalhe";
import MecanicoFinanceiro from "./pages/mecanico/MecanicoFinanceiro";
import MecanicoReputacao from "./pages/mecanico/MecanicoReputacao";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import AdminAprovacao from "./pages/admin/AdminAprovacao";
import AdminConfiguracoes from "./pages/admin/AdminConfiguracoes";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import Sobre from "./pages/Sobre";
import Termos from "./pages/Termos";
import Privacidade from "./pages/Privacidade";
import Precos from "./pages/Precos";
import ParaOficinas from "./pages/ParaOficinas";
import ParaMecanicos from "./pages/ParaMecanicos";

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
            <Route path="/para-oficinas" element={<ParaOficinas />} />
            <Route path="/para-mecanicos" element={<ParaMecanicos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cadastro/oficina" element={<CadastroOficina />} />
            <Route path="/cadastro/mecanico" element={<CadastroMecanico />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/termos" element={<Termos />} />
            <Route path="/privacidade" element={<Privacidade />} />
            <Route path="/precos" element={<Precos />} />

            {/* Oficina Routes */}
            <Route path="/oficina/dashboard" element={<ProtectedRoute allowedRoles={["oficina"]}><OficinaDashboard /></ProtectedRoute>} />
            <Route path="/oficina/nova-demanda" element={<ProtectedRoute allowedRoles={["oficina"]}><OficinaNovaDemanda /></ProtectedRoute>} />
            <Route path="/oficina/demandas/:id" element={<ProtectedRoute allowedRoles={["oficina"]}><OficinaDemandaDetalhe /></ProtectedRoute>} />
            <Route path="/oficina/chat/:id" element={<ProtectedRoute allowedRoles={["oficina"]}><Chat /></ProtectedRoute>} />

            {/* Mecânico Routes */}
            <Route path="/mecanico/aguardando-aprovacao" element={<MecanicoAguardandoAprovacao />} />
            <Route path="/mecanico/dashboard" element={<ProtectedRoute allowedRoles={["mecanico"]}><MecanicoDashboard /></ProtectedRoute>} />
            <Route path="/mecanico/demandas/:id" element={<ProtectedRoute allowedRoles={["mecanico"]}><MecanicoDemandaDetalhe /></ProtectedRoute>} />
            <Route path="/mecanico/financeiro" element={<ProtectedRoute allowedRoles={["mecanico"]}><MecanicoFinanceiro /></ProtectedRoute>} />
            <Route path="/mecanico/reputacao" element={<ProtectedRoute allowedRoles={["mecanico"]}><MecanicoReputacao /></ProtectedRoute>} />
            <Route path="/mecanico/chat/:id" element={<ProtectedRoute allowedRoles={["mecanico"]}><Chat /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/usuarios" element={<ProtectedRoute allowedRoles={["admin"]}><AdminUsuarios /></ProtectedRoute>} />
            <Route path="/admin/mecanicos/aprovacao" element={<ProtectedRoute allowedRoles={["admin"]}><AdminAprovacao /></ProtectedRoute>} />
            <Route path="/admin/configuracoes" element={<ProtectedRoute allowedRoles={["admin"]}><AdminConfiguracoes /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
