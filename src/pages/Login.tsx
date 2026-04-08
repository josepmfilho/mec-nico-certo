import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wrench, Eye, EyeOff, Building2, HardHat } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quickLoading, setQuickLoading] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleQuickLogin = async (role: "oficina" | "mecanico" | "admin") => {
    setQuickLoading(role);
    try {
      const emails = { oficina: "oficina@demo.com", mecanico: "mecanico@demo.com", admin: "admin@demo.com" };
      await login(emails[role], "demo123");
      navigate(`/${role}/dashboard`);
    } catch {
      toast({ title: "Erro ao entrar", description: "Erro inesperado.", variant: "destructive" });
    } finally {
      setQuickLoading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Campos obrigatórios", description: "Preencha e-mail e senha.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      const saved = localStorage.getItem("mecanico_user");
      if (saved) {
        const user = JSON.parse(saved);
        navigate(`/${user.role}/dashboard`);
      }
    } catch {
      toast({ title: "Erro ao entrar", description: "Verifique suas credenciais.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-muted/50 to-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <Link to="/" className="mx-auto mb-4 flex items-center gap-2">
              <Wrench className="h-7 w-7 text-primary" />
              <span className="font-display text-xl font-bold">MecânicoApp</span>
            </Link>
            <CardTitle className="font-display text-2xl">Bem-vindo de volta</CardTitle>
            <CardDescription>Acesse sua conta para continuar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link to="/recuperar-senha" className="text-xs text-primary hover:underline">Esqueci minha senha</Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full h-12 text-[15px] font-semibold" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground whitespace-nowrap">acesso rápido (demo)</span>
              <Separator className="flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="flex-col h-auto py-4 gap-1.5 border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all active:scale-95"
                onClick={() => handleQuickLogin("oficina")}
                disabled={quickLoading !== null}
              >
                <Building2 className="h-5 w-5 text-primary" />
                <span className="text-xs font-semibold">{quickLoading === "oficina" ? "Entrando..." : "Oficina"}</span>
              </Button>
              <Button
                variant="outline"
                className="flex-col h-auto py-4 gap-1.5 border-[#065F46]/20 hover:bg-[#065F46]/5 hover:border-[#065F46]/40 transition-all active:scale-95"
                onClick={() => handleQuickLogin("mecanico")}
                disabled={quickLoading !== null}
              >
                <HardHat className="h-5 w-5 text-[#065F46]" />
                <span className="text-xs font-semibold">{quickLoading === "mecanico" ? "Entrando..." : "Mecânico"}</span>
              </Button>
            </div>

            <div className="my-5 flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">ou</span>
              <Separator className="flex-1" />
            </div>

            <Button variant="outline" className="w-full h-12 gap-2 text-sm" disabled>
              <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Entrar com Google (em breve)
            </Button>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Não tem conta? Cadastre-se:</p>
              <div className="mt-2 flex items-center justify-center gap-4">
                <Link to="/cadastro/oficina" className="font-semibold text-primary hover:underline">Sou oficina</Link>
                <span className="text-border">|</span>
                <Link to="/cadastro/mecanico" className="font-semibold text-[#065F46] hover:underline">Sou mecânico</Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
