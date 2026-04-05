import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wrench, Clock, CheckCircle2, Shield, LogOut } from "lucide-react";

const MecanicoAguardandoAprovacao = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-bold">MecânicoApp</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-muted-foreground">
            <LogOut className="h-4 w-4" /> Sair
          </Button>
        </div>
      </header>

      <div className="container max-w-lg px-4 py-16 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
          <Clock className="h-10 w-10 text-amber-600" />
        </div>

        <h1 className="mb-3 font-display text-3xl font-bold">Cadastro recebido!</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Seu perfil está sendo analisado pela nossa equipe. Você receberá uma notificação assim que for aprovado.
        </p>

        <Card className="mb-8 text-left">
          <CardContent className="space-y-4 p-6">
            <h3 className="text-lg font-semibold">O que acontece agora?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                <div>
                  <p className="font-medium">Cadastro enviado</p>
                  <p className="text-sm text-muted-foreground">Seus dados foram recebidos com sucesso</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <div>
                  <p className="font-medium">Verificação em andamento</p>
                  <p className="text-sm text-muted-foreground">Nossa equipe está analisando seus documentos e informações</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-medium">Aprovação em até 24h</p>
                  <p className="text-sm text-muted-foreground">Você será notificado por e-mail e WhatsApp quando seu perfil for aprovado</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {user && (
          <p className="text-sm text-muted-foreground">
            Cadastrado como <span className="font-semibold">{user.email}</span>
          </p>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" /> Entrar com outra conta
          </Button>
          <Button asChild>
            <Link to="/cadastro/mecanico">Fazer novo cadastro</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MecanicoAguardandoAprovacao;
