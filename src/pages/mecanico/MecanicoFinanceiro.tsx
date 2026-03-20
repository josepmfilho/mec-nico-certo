import { DashboardLayout } from "@/components/DashboardLayout";
import { KPICard } from "@/components/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet, Clock, TrendingUp, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const TRANSACTIONS = [
  { date: "20/03", oficina: "Auto Center Silva", servico: "Troca de embreagem", bruto: "R$1.500", taxa: "R$180", liquido: "R$1.320", status: "pago" },
  { date: "18/03", oficina: "Oficina do Zé", servico: "Revisão completa", bruto: "R$950", taxa: "R$114", liquido: "R$836", status: "pago" },
  { date: "15/03", oficina: "Mecânica Express", servico: "Diagnóstico motor", bruto: "R$280", taxa: "R$34", liquido: "R$246", status: "pago" },
  { date: "12/03", oficina: "Car Fix Ltda", servico: "Troca correia", bruto: "R$750", taxa: "R$90", liquido: "R$660", status: "escrow" },
  { date: "10/03", oficina: "RefriCar", servico: "Reparo A/C", bruto: "R$620", taxa: "R$74", liquido: "R$546", status: "pago" },
  { date: "08/03", oficina: "Auto Center Silva", servico: "Pastilhas de freio", bruto: "R$350", taxa: "R$42", liquido: "R$308", status: "pago" },
  { date: "05/03", oficina: "Oficina do Zé", servico: "Troca de óleo", bruto: "R$180", taxa: "R$22", liquido: "R$158", status: "pago" },
  { date: "02/03", oficina: "Mecânica Express", servico: "Alinhamento", bruto: "R$120", taxa: "R$14", liquido: "R$106", status: "cancelado" },
];

const statusStyles: Record<string, string> = {
  pago: "bg-success/10 text-success",
  escrow: "bg-warning/10 text-warning",
  cancelado: "bg-destructive/10 text-destructive",
};

const MecanicoFinanceiro = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold">Financeiro</h2>
        <p className="text-muted-foreground">Seus ganhos e extrato completo</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard title="Saldo disponível" value="R$880" icon={Wallet} variant="mecanico" />
        <KPICard title="A receber (escrow)" value="R$440" icon={Clock} subtitle="Aguardando conclusão" />
        <KPICard title="Recebido este mês" value="R$2.640" icon={TrendingUp} variant="mecanico" trend={{ value: 15, label: "vs. mês passado" }} />
        <KPICard title="Recebido total" value="R$12.800" icon={DollarSign} subtitle="Desde jan/2025" />
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Histórico de transações</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Oficina</TableHead>
                <TableHead className="hidden md:table-cell">Serviço</TableHead>
                <TableHead className="hidden lg:table-cell">Bruto</TableHead>
                <TableHead className="hidden lg:table-cell">Taxa 12%</TableHead>
                <TableHead>Líquido</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TRANSACTIONS.map((t, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm">{t.date}</TableCell>
                  <TableCell className="text-sm font-medium">{t.oficina}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{t.servico}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm">{t.bruto}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{t.taxa}</TableCell>
                  <TableCell className="text-sm font-semibold text-mecanico">{t.liquido}</TableCell>
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

export default MecanicoFinanceiro;
