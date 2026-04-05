import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle, XCircle, Calendar, User } from "lucide-react";

interface PendingUser {
  id: string;
  name: string;
  email: string;
  role: string;
  approved: boolean;
}

const AdminAprovacao = () => {
  const { getPendingMecanicos, approveUser } = useAuth();
  const [pending, setPending] = useState<PendingUser[]>([]);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [motivo, setMotivo] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setPending(getPendingMecanicos());
  }, [getPendingMecanicos]);

  const approve = (id: string) => {
    approveUser(id);
    setPending((p) => p.filter((x) => x.id !== id));
    toast({ title: "Mecânico aprovado!", description: "O profissional agora pode acessar o dashboard." });
  };

  const reject = () => {
    if (!motivo.trim() || !rejectId) return;

    const updated = pending.filter((x) => x.id !== rejectId);
    const savedUsers: PendingUser[] = JSON.parse(localStorage.getItem("mecanico_users") || "[]");
    const nextUsers = savedUsers.filter((storedUser) => storedUser.id !== rejectId);

    localStorage.setItem("pending_mecanicos", JSON.stringify(updated));
    localStorage.setItem("mecanico_users", JSON.stringify(nextUsers));
    setPending(updated);
    setRejectId(null);
    setMotivo("");
    toast({ title: "Mecânico reprovado", description: "O motivo foi registrado.", variant: "destructive" });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold">Aprovação de Mecânicos</h2>
          <p className="text-muted-foreground">{pending.length} aguardando verificação</p>
        </div>

        {pending.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-600" />
            <p className="font-medium">Nenhum mecânico pendente de aprovação</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pending.map((m) => (
              <Card key={m.id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.email}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs mb-3">Mecânico</Badge>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mb-4">
                    <Calendar className="h-3 w-3" /> Aguardando aprovação
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 gap-1 bg-green-600 hover:bg-green-700 text-white" onClick={() => approve(m.id)}>
                      <CheckCircle className="h-4 w-4" /> Aprovar
                    </Button>
                    <Button size="sm" variant="destructive" className="flex-1 gap-1" onClick={() => setRejectId(m.id)}>
                      <XCircle className="h-4 w-4" /> Reprovar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={rejectId !== null} onOpenChange={() => { setRejectId(null); setMotivo(""); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Motivo da reprovação</DialogTitle>
          </DialogHeader>
          <Textarea placeholder="Explique o motivo da reprovação..." value={motivo} onChange={(e) => setMotivo(e.target.value)} />
          <DialogFooter>
            <Button variant="outline" onClick={() => { setRejectId(null); setMotivo(""); }}>Cancelar</Button>
            <Button variant="destructive" onClick={reject} disabled={!motivo.trim()}>Confirmar reprovação</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminAprovacao;
