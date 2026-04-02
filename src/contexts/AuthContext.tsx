import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

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
      approved: role !== "mecanico" ? true : false, // mecânicos precisam de aprovação
    };
    localStorage.setItem("mecanico_user", JSON.stringify(mockUser));
    setUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("mecanico_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
