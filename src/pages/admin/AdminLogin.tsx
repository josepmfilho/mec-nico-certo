import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      const saved = localStorage.getItem("mecanico_user");
      if (saved) {
        const user = JSON.parse(saved);
        if (user.role !== "admin") {
          localStorage.removeItem("mecanico_user");
          toast({ title: "Acesso negado", description: "Esta área é restrita a administradores.", variant: "destructive" });
          return;
        }
        navigate("/admin/dashboard");
      }
    } catch {
      toast({ title: "Erro ao entrar", description: "Verifique suas credenciais.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-purple-200">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100">
            <Shield className="h-7 w-7 text-purple-600" />
          </div>
          <CardTitle className="font-display text-2xl">Painel Administrativo</CardTitle>
          <CardDescription>Acesso restrito à equipe MecânicoApp</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail do administrador</Label>
              <Input id="email" type="email" placeholder="admin@mecanicoapp.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
              {loading ? "Entrando..." : "Acessar painel"}
            </Button>
          </form>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Área restrita. <Link to="/login" className="text-primary hover:underline">Voltar ao login padrão</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
