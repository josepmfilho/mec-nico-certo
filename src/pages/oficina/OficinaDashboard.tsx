import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { KPICard } from "@/components/KPICard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Wrench, CheckCircle, DollarSign, Plus, Star, ArrowRight, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_DEMANDS = [
  { id: 1, title: "Troca de embreagem — Fiat Toro 2021", specialty: "Transmissão", date: "Hoje", status: "com propostas", proposals: 3 },
  { id: 2, title: "Diagnóstico motor falhando — Civic 2019", specialty: "Motor", date: "Amanhã", status: "aberta", proposals: 0 },
  { id: 3, title: "Revisão completa 50.000km — Onix 2022", specialty: "Mecânica Geral", date: "24/03", status: "em andamento", proposals: 5 },
  { id: 4, title: "Reparo ar-condicionado — Corolla 2020", specialty: "Ar Condicionado", date: "25/03", status: "aberta", proposals: 1 },
];

const statusConfig: Record<string, { color: string; icon: typeof Clock; label: string }> = {
  aberta: { color: "bg-blue-500/10 text-blue-600", icon: Clock, label: "Aberta" },
  "com propostas": { color: "bg-amber-500/10 text-amber-600", icon: FileText, label: "Com propostas" },
  "em andamento": { color: "bg-[#065F46]/10 text-[#065F46]", icon: Wrench, label: "Em andamento" },
  concluída: { color: "bg-green-500/10 text-green-600", icon: CheckCircle, label: "Concluída" },
};

const FAVORITES = [
  { name: "Carlos Eduardo", rating: 4.9, jobs: 23, specialty: "Motor" },
  { name: "Roberto Santos", rating: 4.7, jobs: 15, specialty: "Transmissão" },
  { name: "Felipe Oliveira", rating: 4.8, jobs: 19, specialty: "Freios" },
];

const OficinaDashboard = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Painel da Oficina</h2>
          <p className="text-muted-foreground text-sm">Acompanhe suas demandas e gastos</p>
        </div>
        <Button className="gap-2 shadow-lg" asChild>
          <Link to="/oficina/nova-demanda">
            <Plus className="h-4 w-4" /> Nova Demanda
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard title="Demandas Abertas" value={3} icon={FileText} variant="primary" />
        <KPICard title="Em Andamento" value={1} icon={Wrench} />
        <KPICard title="Concluídos no mês" value={12} icon={CheckCircle} variant="primary" trend={{ value: 20, label: "vs. mês passado" }} />
        <KPICard title="Gasto Total no mês" value="R$4.800" icon={DollarSign} subtitle="Média R$400/demanda" />
      </div>

      {/* Feed */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-bold">Demandas ativas</h3>
          <span className="text-sm text-muted-foreground">{MOCK_DEMANDS.length} demandas</span>
        </div>
        <div className="space-y-3">
          {MOCK_DEMANDS.map((d) => {
            const status = statusConfig[d.status] || statusConfig.aberta;
            return (
              <Link key={d.id} to={`/oficina/demandas/${d.id}`} className="block">
                <Card className="hover:shadow-md transition-all active:scale-[0.995] cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="space-y-2 flex-1 min-w-0">
                        <p className="font-semibold text-sm leading-snug">{d.title}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="secondary" className="text-xs">{d.specialty}</Badge>
                          <span className="text-xs text-muted-foreground">{d.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold", status.color)}>
                          <status.icon className="h-3 w-3" />
                          {status.label}
                        </span>
                        {d.proposals > 0 && (
                          <span className="text-xs font-semibold text-primary bg-primary/10 rounded-full px-2 py-0.5">
                            {d.proposals} propostas
                          </span>
                        )}
                        <ChevronRight className="h-4 w-4 text-muted-foreground/50 hidden sm:block" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Favoritos */}
      <div>
        <h3 className="font-display text-lg font-bold mb-4">Mecânicos favoritos</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {FAVORITES.map((f) => (
            <Card key={f.name} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 text-center">
                <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-[#065F46]/10 flex items-center justify-center font-display font-bold text-[#065F46] text-lg">
                  {f.name.split(" ").map(n => n[0]).join("")}
                </div>
                <p className="font-semibold text-sm">{f.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{f.specialty}</p>
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" /> {f.rating} · {f.jobs} serviços
                </p>
                <Button size="sm" variant="outline" className="mt-3 w-full text-xs gap-1">
                  Contratar novamente <ArrowRight className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default OficinaDashboard;
