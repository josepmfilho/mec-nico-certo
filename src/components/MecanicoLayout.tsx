import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Map, MessageSquare, Wallet, User, Menu, X, LayoutDashboard, MapPin, FileText, Calendar, Star, LogOut, Wrench } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const bottomTabs = [
  { label: "Home", icon: Home, path: "/mecanico/dashboard" },
  { label: "Mapa", icon: Map, path: "/mecanico/mapa" },
  { label: "Chat", icon: MessageSquare, path: "/mecanico/chat" },
  { label: "Dinheiro", icon: Wallet, path: "/mecanico/financeiro" },
  { label: "Perfil", icon: User, path: "/mecanico/perfil" },
];

const sidebarNav = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/mecanico/dashboard" },
  { label: "Mapa", icon: MapPin, path: "/mecanico/mapa" },
  { label: "Demandas", icon: FileText, path: "/mecanico/demandas" },
  { label: "Chat", icon: MessageSquare, path: "/mecanico/chat" },
  { label: "Financeiro", icon: Wallet, path: "/mecanico/financeiro" },
  { label: "Reputação", icon: Star, path: "/mecanico/reputacao" },
  { label: "Perfil", icon: User, path: "/mecanico/perfil" },
];

export const MecanicoLayout = ({ children, hideBottomNav = false }: { children: React.ReactNode; hideBottomNav?: boolean }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar - hidden on mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex",
      )}>
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
          <Wrench className="h-7 w-7 text-primary" />
          <span className="font-display text-lg font-bold">MecânicoApp</span>
        </div>
        <div className="px-4 py-3">
          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-mecanico text-mecanico-foreground">
            Mecânico
          </div>
        </div>
        <nav className="flex-1 space-y-0.5 px-3 py-2">
          {sidebarNav.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground hover:bg-sidebar-accent/50"
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

      {/* Main content */}
      <main className="flex-1 lg:ml-64">
        <div className={cn("pb-20 lg:pb-0", hideBottomNav && "pb-0")}>
          {children}
        </div>
      </main>

      {/* Mobile bottom navigation */}
      {!hideBottomNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background lg:hidden">
          <div className="flex items-center justify-around py-2">
            {bottomTabs.map((tab) => {
              const active = isActive(tab.path);
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={cn(
                    "flex flex-col items-center gap-0.5 px-3 py-1.5 text-[11px] font-medium transition-colors",
                    active ? "text-[#065F46]" : "text-muted-foreground"
                  )}
                >
                  <tab.icon className={cn("h-6 w-6", active && "text-[#065F46]")} />
                  {tab.label}
                </Link>
              );
            })}
          </div>
          {/* Safe area for notch phones */}
          <div className="h-[env(safe-area-inset-bottom)]" />
        </nav>
      )}
    </div>
  );
};
