import { DashboardLayout } from "@/components/DashboardLayout";
import { KPICard } from "@/components/KPICard";
import { Wallet, MapPin, FileText, Star } from "lucide-react";

const MecanicoDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold">Painel do Mecânico</h2>
          <p className="text-muted-foreground">Seus ganhos e oportunidades</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Recebido no Mês"
            value="R$ 8.760"
            icon={Wallet}
            variant="mecanico"
            trend={{ value: 15, label: "vs. mês passado" }}
          />
          <KPICard
            title="Demandas Próximas"
            value={12}
            icon={MapPin}
            variant="mecanico"
            subtitle="Raio de 20km"
          />
          <KPICard
            title="Propostas Enviadas"
            value={6}
            icon={FileText}
            subtitle="3 aguardando resposta"
          />
          <KPICard
            title="Minha Avaliação"
            value="4.8"
            icon={Star}
            variant="mecanico"
            subtitle="127 avaliações"
          />
        </div>

        {/* Demandas próximas */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 font-display text-lg font-bold">Demandas Próximas</h3>
          <div className="space-y-3">
            {[
              { title: "Troca de pastilhas de freio", location: "Vila Mariana - 2.3km", budget: "R$ 350-500", urgency: "Urgente" },
              { title: "Diagnóstico motor falhando", location: "Moema - 4.1km", budget: "R$ 200-400", urgency: "Normal" },
              { title: "Revisão completa 50.000km", location: "Itaim Bibi - 5.8km", budget: "R$ 800-1.200", urgency: "Normal" },
              { title: "Troca correia dentada", location: "Pinheiros - 7.2km", budget: "R$ 600-900", urgency: "Urgente" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-2 rounded-lg bg-muted/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {item.location}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-mecanico">{item.budget}</span>
                  {item.urgency === "Urgente" && (
                    <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                      Urgente
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MecanicoDashboard;
