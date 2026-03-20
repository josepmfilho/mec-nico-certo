import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, MapPin, Calendar } from "lucide-react";

const MOCK_PENDING = [
  { id: 1, name: "Carlos Eduardo Silva", specialties: ["Motor", "Câmbio"], city: "São Paulo", date: "18/03/2025", photo: "CE" },
  { id: 2, name: "Roberto Santos", specialties: ["Elétrica Automotiva"], city: "Guarulhos", date: "17/03/2025", photo: "RS" },
  { id: 3, name: "Felipe Oliveira", specialties: ["Suspensão e Freios", "Mecânica Geral"], city: "Campinas", date: "16/03/2025", photo: "FO" },
];

const AdminAprovacao = () => {
  const [pending, setPending] = useState(MOCK_PENDING);
  const [rejectId, setRejectId] = useState<number | null>(null);
  const [motivo, setMotivo] = useState("");
  const { toast } = useToast();

  const approve = (id: number) => {
    setPending((p) => p.filter((x) => x.id !== id));
    toast({ title: "Mecânico aprovado!", description: "O profissional foi notificado." });
  };

  const reject = () => {
    if (!motivo.trim()) return;
    setPending((p) => p.filter((x) => x.id !== rejectId));
    setRejectId(null);
    setMotivo("");
    toast({ title: "Mecânico reprovado", description: "O motivo foi enviado ao profissional.", variant: "destructive" });
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
            <CheckCircle className="h-12 w-12 mx-auto mb-3 text-success" />
            <p className="font-medium">Nenhum mecânico pendente de aprovação</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pending.map((m) => (
              <Card key={m.id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-admin/10 flex items-center justify-center font-display font-bold text-admin">
                      {m.photo}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{m.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{m.city}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {m.specialties.map((s) => (
                      <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mb-4">
                    <Calendar className="h-3 w-3" /> Cadastro em {m.date}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 gap-1 bg-success hover:bg-success/90" onClick={() => approve(m.id)}>
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
