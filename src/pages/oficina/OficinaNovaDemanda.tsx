import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MapPin, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
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
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const toggleSpec = (s: string) =>
    setSpecialties((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);

  const handlePublish = () => {
    if (!titulo || specialties.length === 0) {
      setTouched({ titulo: true, specialties: true });
      toast({ title: "Campos obrigatórios", description: "Preencha o título e selecione ao menos uma especialidade.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Demanda publicada! 🚀", description: "Mecânicos da região já podem ver sua demanda." });
      navigate("/oficina/dashboard");
    }, 800);
  };

  const isValid = titulo.trim().length > 0 && specialties.length > 0;

  return (
    <DashboardLayout>
      <div className="max-w-2xl space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-muted">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="font-display text-2xl font-bold">Nova Demanda</h2>
            <p className="text-muted-foreground text-sm">Descreva o serviço que sua oficina precisa</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-6 space-y-5">
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Título do serviço
                <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="Ex: Troca de embreagem — Fiat Toro 2021"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, titulo: true }))}
                className={cn(
                  "h-12",
                  touched.titulo && !titulo.trim() && "border-red-400 focus-visible:ring-red-400"
                )}
              />
              {touched.titulo && !titulo.trim() && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Campo obrigatório
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Especialidade
                <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-wrap gap-2">
                {SPECIALTIES.map((s) => (
                  <button key={s} type="button" onClick={() => toggleSpec(s)}
                    className={cn("rounded-full border px-3.5 py-2 text-sm font-medium transition-all active:scale-95",
                      specialties.includes(s) ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/40"
                    )}>
                    {specialties.includes(s) && <CheckCircle2 className="mr-1.5 inline h-3.5 w-3.5" />}{s}
                  </button>
                ))}
              </div>
              {touched.specialties && specialties.length === 0 && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Selecione ao menos uma especialidade
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Descrição detalhada</Label>
              <Textarea placeholder="Descreva o problema, modelo do veículo, peças necessárias..." value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={4} className="text-[15px]" />
              <p className="text-xs text-muted-foreground">💡 Quanto mais detalhes, melhores propostas você recebe.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data</Label>
                <Input type="date" value={data} onChange={(e) => setData(e.target.value)} className="h-12" />
              </div>
              <div className="space-y-2">
                <Label>Horário</Label>
                <Input type="time" value={horario} onChange={(e) => setHorario(e.target.value)} className="h-12" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Orçamento máximo (R$)</Label>
              <Input type="number" placeholder="500" value={orcamento} onChange={(e) => setOrcamento(e.target.value)} className="h-12" />
              <p className="text-xs text-muted-foreground">Mecânicos verão esse valor como referência.</p>
            </div>

            <div className="flex items-center justify-between bg-red-500/5 rounded-xl p-4">
              <div>
                <Label className="text-sm font-semibold">Urgência</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Destaque e priorize no feed de mecânicos</p>
              </div>
              <Switch checked={urgente} onCheckedChange={setUrgente} />
            </div>

            {/* Mini map */}
            <div className="rounded-xl border border-border bg-muted/50 h-32 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-6 w-6 mx-auto mb-1 text-primary" />
                <p className="text-xs font-medium">Localização da sua oficina confirmada</p>
              </div>
            </div>

            <Button
              onClick={handlePublish}
              disabled={loading}
              className={cn(
                "w-full h-12 text-[15px] font-bold transition-all",
                !isValid && "opacity-60"
              )}
            >
              {loading ? "Publicando..." : "Publicar demanda"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OficinaNovaDemanda;
