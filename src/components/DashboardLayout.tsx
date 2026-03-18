import { useAuth, type UserRole } from "@/contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, FileText, MessageSquare, CreditCard, BarChart3,
  User, Wrench, MapPin, Calendar, Wallet, Star, Shield, Users,
  CheckCircle, AlertTriangle, Settings, LogOut, Menu, X
} from "lucide-react";
import { useState } from "react";

const navConfig: Record<UserRole, { label: string; icon: any; path: string }[]> = {
  oficina: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/oficina/dashboard" },
    { label: "Nova Demanda", icon: FileText, path: "/oficina/nova-demanda" },
    { label: "Demandas", icon: Wrench, path: "/oficina/demandas" },
    { label: "Pagamentos", icon: CreditCard, path: "/oficina/pagamentos" },
    { label: "Relatórios", icon: BarChart3, path: "/oficina/relatorios" },
    { label: "Perfil", icon: User, path: "/oficina/perfil" },
  ],
  mecanico: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/mecanico/dashboard" },
    { label: "Demandas", icon: MapPin, path: "/mecanico/demandas" },
    { label: "Propostas", icon: FileText, path: "/mecanico/propostas" },
    { label: "Agenda", icon: Calendar, path: "/mecanico/agenda" },
    { label: "Financeiro", icon: Wallet, path: "/mecanico/financeiro" },
    { label: "Reputação", icon: Star, path: "/mecanico/reputacao" },
    { label: "Perfil", icon: User, path: "/mecanico/perfil" },
  ],
  admin: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { label: "Usuários", icon: Users, path: "/admin/usuarios" },
    { label: "Aprovações", icon: CheckCircle, path: "/admin/mecanicos/aprovacao" },
    { label: "Demandas", icon: Wrench, path: "/admin/demandas" },
    { label: "Transações", icon: CreditCard, path: "/admin/transacoes" },
    { label: "Disputas", icon: AlertTriangle, path: "/admin/disputas" },
    { label: "Relatórios", icon: BarChart3, path: "/admin/relatorios" },
    { label: "Configurações", icon: Settings, path: "/admin/configuracoes" },
  ],
};

const roleLabels: Record<UserRole, string> = {
  oficina: "Oficina",
  mecanico: "Mecânico",
  admin: "Admin",
};

const roleColors: Record<UserRole, string> = {
  oficina: "bg-primary text-primary-foreground",
  mecanico: "bg-mecanico text-mecanico-foreground",
  admin: "bg-admin text-admin-foreground",
};

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;

  const nav = navConfig[user.role];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform lg:static lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
          <Wrench className="h-7 w-7 text-primary" />
          <span className="font-display text-lg font-bold">MecânicoApp</span>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 py-3">
          <div className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", roleColors[user.role])}>
            {roleLabels[user.role]}
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 px-3 py-2">
          {nav.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-display text-sm font-bold">
              {user.name[0]?.toUpperCase()}
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
          <Button variant="ghost" className="mt-1 w-full justify-start gap-3 text-muted-foreground" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1">
        <header className="flex h-16 items-center gap-4 border-b border-border px-4 lg:px-6">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-display text-lg font-bold">
            {nav.find((n) => n.path === location.pathname)?.label ?? "Dashboard"}
          </h1>
        </header>
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};
