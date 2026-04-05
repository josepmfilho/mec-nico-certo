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

const CURRENT_USER_KEY = "mecanico_user";
const USERS_KEY = "mecanico_users";
const LEGACY_PENDING_KEY = "pending_mecanicos";

const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    return fallback;
  }
};

const dedupeUsers = (users: User[]) => {
  const usersMap = new Map<string, User>();
  users.forEach((storedUser) => {
    usersMap.set(storedUser.email.toLowerCase(), storedUser);
  });
  return Array.from(usersMap.values());
};

const readUsers = (): User[] => {
  const currentUser = readStorage<User | null>(CURRENT_USER_KEY, null);
  const legacyPending = readStorage<User[]>(LEGACY_PENDING_KEY, []);
  const savedUsers = readStorage<User[]>(USERS_KEY, []);

  return dedupeUsers([
    ...(currentUser ? [currentUser] : []),
    ...legacyPending,
    ...savedUsers,
  ]);
};

const saveUsers = (users: User[]) => {
  const normalizedUsers = dedupeUsers(users);
  localStorage.setItem(USERS_KEY, JSON.stringify(normalizedUsers));
  localStorage.setItem(
    LEGACY_PENDING_KEY,
    JSON.stringify(normalizedUsers.filter((storedUser) => storedUser.role === "mecanico" && !storedUser.approved)),
  );
};

const saveCurrentUser = (nextUser: User | null) => {
  if (nextUser) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(nextUser));
    return;
  }

  localStorage.removeItem(CURRENT_USER_KEY);
};

const resolveRole = (email: string): UserRole => {
  let role: UserRole = "oficina";
  if (email.includes("mecanico")) role = "mecanico";
  if (email.includes("admin")) role = "admin";
  return role;
};

const createMockUser = (email: string, name?: string): User => {
  const normalizedEmail = email.trim().toLowerCase();
  const role = resolveRole(normalizedEmail);

  return {
    id: crypto.randomUUID(),
    email: normalizedEmail,
    name: name?.trim() || normalizedEmail.split("@")[0],
    role,
    approved: role !== "mecanico" || normalizedEmail.includes("demo"),
  };
};

const upsertUser = (users: User[], nextUser: User) => {
  const filteredUsers = users.filter((storedUser) => storedUser.email.toLowerCase() !== nextUser.email.toLowerCase());
  return [...filteredUsers, nextUser];
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => readStorage<User | null>(CURRENT_USER_KEY, null));
  const [isLoading] = useState(false);

  const login = useCallback(async (email: string, _password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = readUsers();
    const existingUser = users.find((storedUser) => storedUser.email.toLowerCase() === normalizedEmail);
    const nextUser = existingUser ?? createMockUser(normalizedEmail);

    saveUsers(existingUser ? users : upsertUser(users, nextUser));
    saveCurrentUser(nextUser);
    setUser(nextUser);
  }, []);

  const register = useCallback(async (email: string, _password: string, name: string, role: UserRole) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = readUsers();
    const existingUser = users.find((storedUser) => storedUser.email.toLowerCase() === normalizedEmail);

    const nextUser: User = {
      id: existingUser?.id ?? crypto.randomUUID(),
      email: normalizedEmail,
      name,
      role,
      approved: role !== "mecanico",
    };

    saveUsers(upsertUser(users, nextUser));
    saveCurrentUser(nextUser);
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    saveCurrentUser(null);
    setUser(null);
  }, []);

  const getPendingMecanicos = useCallback((): User[] => {
    const users = readUsers();
    saveUsers(users);
    return users.filter((storedUser) => storedUser.role === "mecanico" && !storedUser.approved);
  }, []);

  const approveUser = useCallback((userId: string) => {
    const users = readUsers();
    const updatedUsers = users.map((storedUser) =>
      storedUser.id === userId ? { ...storedUser, approved: true } : storedUser,
    );

    saveUsers(updatedUsers);

    const currentUser = readStorage<User | null>(CURRENT_USER_KEY, null);
    if (currentUser?.id === userId) {
      const approvedUser = { ...currentUser, approved: true };
      saveCurrentUser(approvedUser);
      setUser(approvedUser);
      return;
    }

    if (user?.id === userId) {
      setUser((current) => (current ? { ...current, approved: true } : current));
    }
  }, [user?.id]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, approveUser, getPendingMecanicos }}>
      {children}
    </AuthContext.Provider>
  );
};
