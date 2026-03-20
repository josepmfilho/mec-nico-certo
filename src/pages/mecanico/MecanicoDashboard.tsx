import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { KPICard } from "@/components/KPICard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Wallet, MapPin, FileText, Star, ArrowRight } from "lucide-react";

const MOCK_NEARBY = [
  { id: 1, title: "Troca de pastilhas de freio", oficina: "Auto Center Silva", specialty: "Suspensão e Freios", distance: "2.3km", budget: "R$350-500", date: "22/03", urgente: true },
  { id: 2, title: "Diagnóstico motor falhando", oficina: "Oficina do Zé", specialty: "Motor", distance: "4.1km", budget: "R$200-400", date: "23/03", urgente: false },
  { id: 3, title: "Revisão completa 50.000km", oficina: "Mecânica Express", specialty: "Mecânica Geral", distance: "5.8km", budget: "R$800-1.200", date: "24/03", urgente: false },
  { id: 4, title: "Troca correia dentada", oficina: "Car Fix Ltda", specialty: "Motor", distance: "7.2km", budget: "R$600-900", date: "25/03", urgente: true },
  { id: 5, title: "Reparo ar-condicionado", oficina: "RefriCar", specialty: "Ar Condicionado", distance: "9.5km", budget: "R$400-700", date: "26/03", urgente: false },
];

const MecanicoDashboard = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold">Painel do Mecânico</h2>
        <p className="text-muted-foreground">Seus ganhos e oportunidades</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard title="Recebido no mês" value="R$2.640" icon={Wallet} variant="mecanico" trend={{ value: 15, label: "vs. mês passado" }} />
        <KPICard title="Demandas Próximas" value={8} icon={MapPin} variant="mecanico" subtitle="Raio de 15km" />
        <KPICard title="Propostas Enviadas" value={4} icon={FileText} subtitle="2 aguardando resposta" />
        <KPICard title="Minha Avaliação" value="4.8 ⭐" icon={Star} variant="mecanico" subtitle="38 avaliações" />
      </div>

      {/* Complete profile */}
      <Card className="border-mecanico/20 bg-mecanico/5">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display font-bold text-sm">Complete seu perfil</h3>
            <span className="text-sm font-semibold text-mecanico">65%</span>
          </div>
          <Progress value={65} className="h-2 [&>div]:bg-mecanico" />
          <p className="text-xs text-muted-foreground mt-2">Adicione "Sobre mim", portfólio e certificados para receber mais propostas.</p>
        </CardContent>
      </Card>

      {/* Map placeholder */}
      <div className="rounded-xl border border-border bg-muted/50 h-48 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <MapPin className="h-10 w-10 mx-auto mb-2 text-primary" />
          <p className="text-sm font-medium">Mapa de demandas próximas</p>
          <p className="text-xs">Integração Google Maps em breve</p>
        </div>
      </div>

      {/* Nearby demands */}
      <div>
        <h3 className="font-display text-lg font-bold mb-4">Demandas próximas</h3>
        <div className="space-y-3">
          {MOCK_NEARBY.map((d) => (
            <Card key={d.id} className="hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="font-medium text-sm">{d.title}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-xs">{d.specialty}</Badge>
                    <span className="text-xs text-muted-foreground">{d.oficina}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-0.5"><MapPin className="h-3 w-3" />{d.distance}</span>
                    {d.urgente && <Badge className="bg-destructive/10 text-destructive text-xs border-0">Urgente</Badge>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-mecanico">{d.budget}</p>
                    <p className="text-xs text-muted-foreground">{d.date}</p>
                  </div>
                  <Button size="sm" className="gap-1 bg-mecanico hover:bg-mecanico/90" asChild>
                    <Link to={`/mecanico/demandas/${d.id}`}>Enviar proposta <ArrowRight className="h-3 w-3" /></Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default MecanicoDashboard;
