import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type UserRole = "oficina" | "mecanico" | "admin";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  approved: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  approveUser: (userId: string) => void;
  getPendingMecanicos: () => User[];
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// Mock auth for now — will be replaced with Supabase
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("mecanico_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading] = useState(false);

  const login = useCallback(async (email: string, _password: string) => {
    // Mock: determine role from email for demo
    let role: UserRole = "oficina";
    if (email.includes("mecanico")) role = "mecanico";
    if (email.includes("admin")) role = "admin";

    const mockUser: User = {
      id: crypto.randomUUID(),
      email,
      name: email.split("@")[0],
      role,
      approved: role !== "mecanico" ? true : false, // mecânicos precisam de aprovação
    };
    localStorage.setItem("mecanico_user", JSON.stringify(mockUser));
    setUser(mockUser);
  }, []);

  const register = useCallback(async (email: string, _password: string, name: string, role: UserRole) => {
    const mockUser: User = {
      id: crypto.randomUUID(),
      email,
      name,
      role,
      approved: role !== "mecanico" ? true : false,
    };
    localStorage.setItem("mecanico_user", JSON.stringify(mockUser));
    setUser(mockUser);

    // Save pending mecanicos to a separate list for admin approval
    if (role === "mecanico") {
      const pending: User[] = JSON.parse(localStorage.getItem("pending_mecanicos") || "[]");
      pending.push(mockUser);
      localStorage.setItem("pending_mecanicos", JSON.stringify(pending));
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("mecanico_user");
    setUser(null);
  }, []);

  const getPendingMecanicos = useCallback((): User[] => {
    return JSON.parse(localStorage.getItem("pending_mecanicos") || "[]");
  }, []);

  const approveUser = useCallback((userId: string) => {
    // Remove from pending list
    const pending: User[] = JSON.parse(localStorage.getItem("pending_mecanicos") || "[]");
    const updated = pending.filter((u) => u.id !== userId);
    localStorage.setItem("pending_mecanicos", JSON.stringify(updated));

    // If the currently logged-in user is being approved, update their state
    const currentUser = localStorage.getItem("mecanico_user");
    if (currentUser) {
      const parsed: User = JSON.parse(currentUser);
      if (parsed.id === userId) {
        parsed.approved = true;
        localStorage.setItem("mecanico_user", JSON.stringify(parsed));
        setUser(parsed);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, approveUser, getPendingMecanicos }}>
      {children}
    </AuthContext.Provider>
  );
};
