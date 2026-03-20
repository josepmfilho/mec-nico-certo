import { DashboardLayout } from "@/components/DashboardLayout";
import { KPICard } from "@/components/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, TrendingUp, Users, CheckCircle, BarChart3, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { cn } from "@/lib/utils";

const chartData = [
  { month: "Out", gmv: 32000, receita: 3840 },
  { month: "Nov", gmv: 35500, receita: 4260 },
  { month: "Dez", gmv: 41000, receita: 4920 },
  { month: "Jan", gmv: 38200, receita: 4584 },
  { month: "Fev", gmv: 44800, receita: 5376 },
  { month: "Mar", gmv: 48200, receita: 5784 },
];

const TRANSACTIONS = [
  { id: "TXN-001", oficina: "Auto Center Silva", mecanico: "Carlos Eduardo", servico: "Troca de embreagem", valor: "R$1.800", taxa: "R$216", status: "concluído" },
  { id: "TXN-002", oficina: "Oficina do Zé", mecanico: "Roberto Santos", servico: "Revisão 30.000km", valor: "R$950", taxa: "R$114", status: "pendente" },
  { id: "TXN-003", oficina: "Mecânica Express", mecanico: "Felipe Oliveira", servico: "Reparo A/C", valor: "R$620", taxa: "R$74", status: "concluído" },
  { id: "TXN-004", oficina: "Car Fix Ltda", mecanico: "Marcos Pereira", servico: "Diagnóstico eletrônico", valor: "R$280", taxa: "R$34", status: "cancelado" },
  { id: "TXN-005", oficina: "RefriCar", mecanico: "André Lima", servico: "Troca de correia", valor: "R$750", taxa: "R$90", status: "concluído" },
];

const statusStyles: Record<string, string> = {
  concluído: "bg-success/10 text-success",
  pendente: "bg-warning/10 text-warning",
  cancelado: "bg-destructive/10 text-destructive",
};

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold">Central de Controle</h2>
          <p className="text-muted-foreground">Visão geral da plataforma</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <KPICard title="GMV Total" value="R$48.200" icon={DollarSign} variant="admin" trend={{ value: 8, label: "vs. mês passado" }} />
          <KPICard title="Receita Plataforma" value="R$5.784" icon={TrendingUp} variant="primary" trend={{ value: 8, label: "vs. mês passado" }} />
          <KPICard title="Usuários Ativos" value="127" icon={Users} variant="default" subtitle="84 oficinas • 43 mecânicos" />
          <KPICard title="Taxa de Conclusão" value="84%" icon={CheckCircle} variant="admin" trend={{ value: 3, label: "vs. mês passado" }} />
          <KPICard title="NPS Médio" value="67" icon={BarChart3} variant="admin" subtitle="Bom" />
          <KPICard title="Disputas Abertas" value="3" icon={AlertTriangle} variant="default" subtitle="1 urgente" />
        </div>

        {/* Chart */}
        <Card>
          <CardHeader><CardTitle className="text-lg">GMV e receita dos últimos 6 meses</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => `R$${v.toLocaleString("pt-BR")}`} />
                <Legend />
                <Line type="monotone" dataKey="gmv" name="GMV" stroke="hsl(32 100% 44%)" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="receita" name="Receita" stroke="hsl(263 66% 51%)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Transactions */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Últimas transações</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Oficina</TableHead>
                  <TableHead className="hidden md:table-cell">Mecânico</TableHead>
                  <TableHead className="hidden lg:table-cell">Serviço</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead className="hidden md:table-cell">Taxa</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TRANSACTIONS.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-mono text-xs">{t.id}</TableCell>
                    <TableCell className="text-sm font-medium">{t.oficina}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{t.mecanico}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{t.servico}</TableCell>
                    <TableCell className="text-sm font-semibold">{t.valor}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{t.taxa}</TableCell>
                    <TableCell>
                      <span className={cn("inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize", statusStyles[t.status])}>
                        {t.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
