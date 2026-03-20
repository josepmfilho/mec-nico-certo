import { useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Calendar, DollarSign, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MecanicoDemandaDetalhe = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [valor, setValor] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Proposta enviada!", description: "A oficina será notificada. Acompanhe na aba Propostas." });
      setValor("");
      setMensagem("");
    }, 800);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl space-y-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="font-display text-xl font-bold">Troca de pastilhas de freio — Honda Civic 2019</h2>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge>Suspensão e Freios</Badge>
              <Badge variant="secondary" className="flex items-center gap-1"><Calendar className="h-3 w-3" /> 22/03/2025</Badge>
              <Badge variant="secondary" className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> Até R$500</Badge>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Preciso trocar as pastilhas de freio dianteiras de um Honda Civic 2019 com 38.000km. Pastilhas Fras-le ou similar de qualidade. Carro já está no elevador. Estimativa de 1h30 de serviço.
            </p>

            {/* Map placeholder */}
            <div className="mt-4 rounded-xl border border-border bg-muted/50 h-32 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-6 w-6 mx-auto mb-1 text-primary" />
                <p className="text-xs">Vila Mariana, São Paulo — 2.3km de você</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Oficina info */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-display font-bold mb-3">Sobre a oficina</h3>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary">AC</div>
              <div>
                <p className="font-semibold">Auto Center Silva</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-warning fill-warning" /> 4.6</span>
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> 47 contratações</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proposal form */}
        <Card className="border-mecanico/20">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-display font-bold">Enviar proposta</h3>
            <div className="space-y-2">
              <Label>Valor cobrado (R$)</Label>
              <Input type="number" placeholder="350" value={valor} onChange={(e) => setValor(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Mensagem personalizada</Label>
              <Textarea placeholder="Descreva sua experiência com este tipo de serviço, tempo estimado, garantias..." value={mensagem} onChange={(e) => setMensagem(e.target.value)} rows={4} />
            </div>
            <Button onClick={handleSend} disabled={loading || !valor || !mensagem} className="w-full bg-mecanico hover:bg-mecanico/90">
              {loading ? "Enviando..." : "Enviar proposta"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MecanicoDemandaDetalhe;
