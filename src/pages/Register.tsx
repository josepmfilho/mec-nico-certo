import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth, type UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wrench, Building2, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      toast({ title: "Selecione seu perfil", description: "Escolha se você é uma oficina ou mecânico.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await register(email, password, name, role);
      navigate(`/${role}/dashboard`);
    } catch {
      toast({ title: "Erro no cadastro", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link to="/" className="mx-auto mb-4 flex items-center gap-2">
            <Wrench className="h-7 w-7 text-primary" />
            <span className="font-display text-xl font-bold">MecânicoApp</span>
          </Link>
          <CardTitle className="font-display text-2xl">Criar Conta</CardTitle>
          <CardDescription>Escolha seu perfil e comece agora</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Role Selection */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("oficina")}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                role === "oficina"
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/40"
              )}
            >
              <Building2 className="h-8 w-8" />
              <span className="text-sm font-semibold">Sou uma Oficina</span>
              <span className="text-xs text-muted-foreground">Preciso contratar mecânicos</span>
            </button>
            <button
              type="button"
              onClick={() => setRole("mecanico")}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                role === "mecanico"
                  ? "border-mecanico bg-mecanico/5 text-mecanico"
                  : "border-border hover:border-mecanico/40"
              )}
            >
              <UserCog className="h-8 w-8" />
              <span className="text-sm font-semibold">Sou Mecânico</span>
              <span className="text-xs text-muted-foreground">Quero encontrar serviços</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" placeholder="João da Silva" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading || !role}>
              {loading ? "Criando conta..." : "Criar Conta"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Já tem conta?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">Entrar</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
