import { DashboardLayout } from "@/components/DashboardLayout";
import { KPICard } from "@/components/KPICard";
import { DollarSign, TrendingUp, Users, CheckCircle, BarChart3, AlertTriangle } from "lucide-react";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold">Central de Controle</h2>
          <p className="text-muted-foreground">Visão geral da plataforma</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <KPICard
            title="GMV (Mês)"
            value="R$ 245K"
            icon={DollarSign}
            variant="admin"
            trend={{ value: 18, label: "vs. mês passado" }}
          />
          <KPICard
            title="Receita (12%)"
            value="R$ 29.4K"
            icon={TrendingUp}
            variant="admin"
            trend={{ value: 18, label: "vs. mês passado" }}
          />
          <KPICard
            title="Usuários Ativos"
            value="3.284"
            icon={Users}
            subtitle="1.890 oficinas • 1.394 mecânicos"
          />
          <KPICard
            title="Tx. Conclusão"
            value="87%"
            icon={CheckCircle}
            variant="admin"
            trend={{ value: 3, label: "vs. mês passado" }}
          />
          <KPICard
            title="NPS"
            value="72"
            icon={BarChart3}
            subtitle="Excelente"
            trend={{ value: 5, label: "vs. trimestre" }}
          />
          <KPICard
            title="Disputas"
            value={4}
            icon={AlertTriangle}
            subtitle="2 pendentes de resolução"
            trend={{ value: -20, label: "vs. mês passado" }}
          />
        </div>

        {/* Recent activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-display text-lg font-bold">Mecânicos Pendentes de Aprovação</h3>
            <div className="space-y-3">
              {[
                { name: "Carlos Eduardo Silva", specialty: "Motor e câmbio", date: "há 2h" },
                { name: "Roberto Santos", specialty: "Elétrica automotiva", date: "há 5h" },
                { name: "Felipe Oliveira", specialty: "Suspensão e freios", date: "há 1d" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.specialty}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-display text-lg font-bold">Últimas Transações</h3>
            <div className="space-y-3">
              {[
                { desc: "Troca de embreagem - Oficina AutoCenter", value: "R$ 1.800", fee: "R$ 216" },
                { desc: "Revisão 30.000km - Oficina CarFix", value: "R$ 950", fee: "R$ 114" },
                { desc: "Reparo A/C - Oficina RefriCar", value: "R$ 620", fee: "R$ 74" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">{item.desc}</p>
                    <p className="text-xs text-muted-foreground">Taxa: {item.fee}</p>
                  </div>
                  <span className="text-sm font-semibold text-admin">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
