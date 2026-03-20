import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { KPICard } from "@/components/KPICard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Wrench, CheckCircle, DollarSign, Plus, Star, ArrowRight } from "lucide-react";

const MOCK_DEMANDS = [
  { id: 1, title: "Troca de embreagem — Fiat Toro 2021", specialty: "Transmissão", date: "22/03", status: "com propostas", proposals: 3 },
  { id: 2, title: "Diagnóstico motor falhando — Civic 2019", specialty: "Motor", date: "23/03", status: "aberta", proposals: 0 },
  { id: 3, title: "Revisão completa 50.000km — Onix 2022", specialty: "Mecânica Geral", date: "24/03", status: "em andamento", proposals: 5 },
  { id: 4, title: "Reparo ar-condicionado — Corolla 2020", specialty: "Ar Condicionado", date: "25/03", status: "aberta", proposals: 1 },
];

const statusColor: Record<string, string> = {
  aberta: "bg-primary/10 text-primary",
  "com propostas": "bg-warning/10 text-warning",
  "em andamento": "bg-mecanico/10 text-mecanico",
  concluída: "bg-success/10 text-success",
};

const FAVORITES = [
  { name: "Carlos Eduardo", rating: 4.9, jobs: 23 },
  { name: "Roberto Santos", rating: 4.7, jobs: 15 },
  { name: "Felipe Oliveira", rating: 4.8, jobs: 19 },
];

const OficinaDashboard = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Painel da Oficina</h2>
          <p className="text-muted-foreground">Acompanhe suas demandas e gastos</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard title="Demandas Abertas" value={3} icon={FileText} variant="primary" />
        <KPICard title="Em Andamento" value={1} icon={Wrench} />
        <KPICard title="Concluídos no mês" value={12} icon={CheckCircle} variant="primary" trend={{ value: 20, label: "vs. mês passado" }} />
        <KPICard title="Gasto Total no mês" value="R$4.800" icon={DollarSign} subtitle="Média R$400/demanda" />
      </div>

      {/* Feed */}
      <div>
        <h3 className="font-display text-lg font-bold mb-4">Demandas ativas</h3>
        <div className="space-y-3">
          {MOCK_DEMANDS.map((d) => (
            <Card key={d.id} className="hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="font-medium text-sm">{d.title}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">{d.specialty}</Badge>
                    <span className="text-xs text-muted-foreground">{d.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[d.status]}`}>
                    {d.status}
                  </span>
                  {d.proposals > 0 && (
                    <span className="text-xs text-muted-foreground">{d.proposals} propostas</span>
                  )}
                  <Button size="sm" variant="outline" className="gap-1" asChild>
                    <Link to={`/oficina/demandas/${d.id}`}>Ver propostas <ArrowRight className="h-3 w-3" /></Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Favoritos */}
      <div>
        <h3 className="font-display text-lg font-bold mb-4">Mecânicos favoritos</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {FAVORITES.map((f) => (
            <Card key={f.name}>
              <CardContent className="p-5 text-center">
                <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-mecanico/10 flex items-center justify-center font-display font-bold text-mecanico text-lg">
                  {f.name.split(" ").map(n => n[0]).join("")}
                </div>
                <p className="font-semibold text-sm">{f.name}</p>
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
                  <Star className="h-3 w-3 text-warning fill-warning" /> {f.rating} • {f.jobs} serviços
                </p>
                <Button size="sm" variant="outline" className="mt-3 w-full text-xs">Contratar novamente</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAB */}
      <Link to="/oficina/nova-demanda" className="fixed bottom-6 right-6 z-40">
        <Button size="lg" className="rounded-full shadow-lg gap-2 h-14 px-6">
          <Plus className="h-5 w-5" /> Nova Demanda
        </Button>
      </Link>
    </div>
  </DashboardLayout>
);

export default OficinaDashboard;
