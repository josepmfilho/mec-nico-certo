import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wrench, Clock, CheckCircle2, Shield, LogOut } from "lucide-react";

const MecanicoAguardandoAprovacao = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-bold">MecânicoApp</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={logout} className="gap-2 text-muted-foreground">
            <LogOut className="h-4 w-4" /> Sair
          </Button>
        </div>
      </header>

      <div className="container max-w-lg py-16 px-4 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
          <Clock className="h-10 w-10 text-amber-600" />
        </div>

        <h1 className="font-display text-3xl font-bold mb-3">Cadastro recebido!</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Seu perfil está sendo analisado pela nossa equipe. Você receberá uma notificação assim que for aprovado.
        </p>

        <Card className="text-left mb-8">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">O que acontece agora?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Cadastro enviado</p>
                  <p className="text-sm text-muted-foreground">Seus dados foram recebidos com sucesso</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Verificação em andamento</p>
                  <p className="text-sm text-muted-foreground">Nossa equipe está analisando seus documentos e informações</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
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

        <div className="mt-8">
          <Link to="/">
            <Button variant="outline">Voltar para a home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MecanicoAguardandoAprovacao;
