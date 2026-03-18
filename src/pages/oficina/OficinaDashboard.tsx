import { DashboardLayout } from "@/components/DashboardLayout";
import { KPICard } from "@/components/KPICard";
import { FileText, Wrench, CheckCircle, DollarSign } from "lucide-react";

const OficinaDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold">Painel da Oficina</h2>
          <p className="text-muted-foreground">Acompanhe suas demandas e gastos</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Demandas Abertas"
            value={8}
            icon={FileText}
            variant="primary"
            trend={{ value: 12, label: "vs. mês passado" }}
          />
          <KPICard
            title="Em Andamento"
            value={3}
            icon={Wrench}
            subtitle="2 com prazo esta semana"
          />
          <KPICard
            title="Concluídas no Mês"
            value={15}
            icon={CheckCircle}
            variant="primary"
            trend={{ value: 8, label: "vs. mês passado" }}
          />
          <KPICard
            title="Gasto Total (Mês)"
            value="R$ 12.450"
            icon={DollarSign}
            subtitle="Média R$ 830/demanda"
            trend={{ value: -5, label: "vs. mês passado" }}
          />
        </div>

        {/* Placeholder for recent activity */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 font-display text-lg font-bold">Atividade Recente</h3>
          <div className="space-y-3">
            {[
              { text: "Nova proposta recebida para 'Troca de embreagem'", time: "há 2h" },
              { text: "Serviço 'Revisão completa' foi concluído", time: "há 5h" },
              { text: "Pagamento de R$ 1.200 liberado para Carlos Silva", time: "há 1d" },
              { text: "Demanda 'Reparo no ar-condicionado' criada", time: "há 2d" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                <p className="text-sm">{item.text}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OficinaDashboard;
