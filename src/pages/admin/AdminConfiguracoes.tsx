import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Settings } from "lucide-react";

const AdminConfiguracoes = () => {
  const { toast } = useToast();
  const [taxa, setTaxa] = useState("12");
  const [raio, setRaio] = useState("50");
  const [escrowHoras, setEscrowHoras] = useState("24");
  const [cancelamentoHoras, setCancelamentoHoras] = useState("2");
  const [manutencao, setManutencao] = useState(false);
  const [msgManutencao, setMsgManutencao] = useState("Estamos em manutenção. Voltamos em breve!");
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({ title: "Configurações salvas!", description: "As alterações foram aplicadas." });
    }, 800);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h2 className="font-display text-2xl font-bold">Configurações</h2>
          <p className="text-muted-foreground">Variáveis globais da plataforma</p>
        </div>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Settings className="h-5 w-5" /> Parâmetros gerais</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Taxa da plataforma (%)</Label>
                <Input type="number" value={taxa} onChange={(e) => setTaxa(e.target.value)} min="0" max="100" />
              </div>
              <div className="space-y-2">
                <Label>Raio máximo de busca</Label>
                <Select value={raio} onValueChange={setRaio}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25 km</SelectItem>
                    <SelectItem value="50">50 km</SelectItem>
                    <SelectItem value="100">100 km</SelectItem>
                    <SelectItem value="200">200 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Horas para liberação do escrow</Label>
                <Input type="number" value={escrowHoras} onChange={(e) => setEscrowHoras(e.target.value)} min="1" />
              </div>
              <div className="space-y-2">
                <Label>Horas mínimas para cancelamento</Label>
                <Input type="number" value={cancelamentoHoras} onChange={(e) => setCancelamentoHoras(e.target.value)} min="0" />
              </div>
            </div>

            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Modo manutenção</Label>
                  <p className="text-xs text-muted-foreground">Desativa o acesso público à plataforma</p>
                </div>
                <Switch checked={manutencao} onCheckedChange={setManutencao} />
              </div>
              {manutencao && (
                <div className="space-y-2">
                  <Label>Mensagem de manutenção</Label>
                  <Textarea value={msgManutencao} onChange={(e) => setMsgManutencao(e.target.value)} />
                </div>
              )}
            </div>

            <Button onClick={handleSave} disabled={saving} className="bg-admin hover:bg-admin/90">
              {saving ? "Salvando..." : "Salvar configurações"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminConfiguracoes;
