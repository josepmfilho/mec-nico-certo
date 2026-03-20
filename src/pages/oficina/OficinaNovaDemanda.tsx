import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MapPin, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const SPECIALTIES = [
  "Mecânica Geral", "Elétrica Automotiva", "Suspensão e Freios",
  "Motor", "Transmissão", "Ar Condicionado", "Injeção Eletrônica",
  "Funilaria e Pintura", "Diesel",
];

const OficinaNovaDemanda = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [orcamento, setOrcamento] = useState("");
  const [urgente, setUrgente] = useState(false);

  const toggleSpec = (s: string) =>
    setSpecialties((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);

  const handlePublish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Demanda publicada!", description: "Mecânicos da região já podem ver sua demanda." });
      navigate("/oficina/dashboard");
    }, 800);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold">Nova Demanda</h2>
          <p className="text-muted-foreground">Descreva o serviço que sua oficina precisa</p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-5">
            <div className="space-y-2">
              <Label>Título do serviço</Label>
              <Input placeholder="Ex: Troca de embreagem — Fiat Toro 2021" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Especialidade</Label>
              <div className="flex flex-wrap gap-2">
                {SPECIALTIES.map((s) => (
                  <button key={s} type="button" onClick={() => toggleSpec(s)}
                    className={cn("rounded-full border px-3 py-1.5 text-xs font-medium transition-all active:scale-95",
                      specialties.includes(s) ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/40"
                    )}>
                    {specialties.includes(s) && <CheckCircle2 className="mr-1 inline h-3 w-3" />}{s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Descrição detalhada</Label>
              <Textarea placeholder="Descreva o problema, modelo do veículo, peças necessárias..." value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={4} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data</Label>
                <Input type="date" value={data} onChange={(e) => setData(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Horário</Label>
                <Input type="time" value={horario} onChange={(e) => setHorario(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Orçamento máximo (R$)</Label>
              <Input type="number" placeholder="500" value={orcamento} onChange={(e) => setOrcamento(e.target.value)} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Urgência</Label>
                <p className="text-xs text-muted-foreground">Destaque esta demanda como urgente</p>
              </div>
              <Switch checked={urgente} onCheckedChange={setUrgente} />
            </div>

            {/* Mini map */}
            <div className="rounded-xl border border-border bg-muted/50 h-32 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-6 w-6 mx-auto mb-1 text-primary" />
                <p className="text-xs">Localização da sua oficina confirmada</p>
              </div>
            </div>

            <Button onClick={handlePublish} disabled={loading || !titulo || specialties.length === 0} className="w-full">
              {loading ? "Publicando..." : "Publicar demanda"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OficinaNovaDemanda;
