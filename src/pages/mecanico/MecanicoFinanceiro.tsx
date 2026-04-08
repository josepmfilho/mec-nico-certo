import { useState } from "react";
import { MecanicoLayout } from "@/components/MecanicoLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const MONTHS = ["Janeiro", "Fevereiro", "Março", "Abril"];

const TRANSACTIONS = [
  { date: "20/03", oficina: "Auto Center Silva", servico: "Troca de embreagem", valor: 1320, status: "recebido" },
  { date: "18/03", oficina: "Oficina do Zé", servico: "Revisão completa", valor: 836, status: "recebido" },
  { date: "15/03", oficina: "Mecânica Express", servico: "Diagnóstico motor", valor: 246, status: "recebido" },
  { date: "12/03", oficina: "Car Fix Ltda", servico: "Troca correia", valor: 660, status: "a_caminho" },
  { date: "10/03", oficina: "RefriCar", servico: "Reparo A/C", valor: 546, status: "recebido" },
  { date: "08/03", oficina: "Auto Center Silva", servico: "Pastilhas de freio", valor: 308, status: "recebido" },
  { date: "05/03", oficina: "Oficina do Zé", servico: "Troca de óleo", valor: 158, status: "recebido" },
];

const MecanicoFinanceiro = () => {
  const [monthIdx, setMonthIdx] = useState(2); // Março
  const { toast } = useToast();

  const totalRecebido = TRANSACTIONS.filter(t => t.status === "recebido").reduce((acc, t) => acc + t.valor, 0);
  const totalPendente = TRANSACTIONS.filter(t => t.status === "a_caminho").reduce((acc, t) => acc + t.valor, 0);

  const handleWithdraw = () => {
    toast({ title: "Saque solicitado! 💸", description: "O valor será transferido via PIX em até 24h úteis." });
  };

  return (
    <MecanicoLayout>
      {/* Green header */}
      <div className="bg-[#065F46] text-white px-5 pt-6 pb-12 lg:rounded-b-2xl">
        {/* Month selector */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={() => setMonthIdx(Math.max(0, monthIdx - 1))}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors active:scale-90"
            disabled={monthIdx === 0}
          >
            <ChevronLeft className={cn("h-5 w-5", monthIdx === 0 && "opacity-30")} />
          </button>
          <span className="text-sm font-semibold min-w-[100px] text-center">{MONTHS[monthIdx]} 2025</span>
          <button
            onClick={() => setMonthIdx(Math.min(MONTHS.length - 1, monthIdx + 1))}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors active:scale-90"
            disabled={monthIdx === MONTHS.length - 1}
          >
            <ChevronRight className={cn("h-5 w-5", monthIdx === MONTHS.length - 1 && "opacity-30")} />
          </button>
        </div>

        <p className="text-white/60 text-sm text-center">Total recebido</p>
        <p className="text-4xl font-bold text-center mt-1">R${totalRecebido.toLocaleString("pt-BR")}</p>
        <p className="text-white/50 text-sm mt-1 text-center">↑ 15% vs. mês passado</p>
      </div>

      <div className="px-4 -mt-7 space-y-4 lg:px-6 lg:max-w-2xl lg:mx-auto pb-6">
        {/* Two cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3"
        >
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-2">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
              <p className="text-xl font-bold text-amber-600">R${totalPendente.toLocaleString("pt-BR")}</p>
              <p className="text-xs text-muted-foreground mt-1">A receber ⏳</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="h-10 w-10 rounded-xl bg-[#065F46]/10 flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="h-5 w-5 text-[#065F46]" />
              </div>
              <p className="text-xl font-bold text-[#065F46]">R$880</p>
              <p className="text-xs text-muted-foreground mt-1">Disponível ✓</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Withdraw CTA */}
        <Button
          onClick={handleWithdraw}
          className="w-full h-12 text-[15px] font-bold bg-[#065F46] hover:bg-[#065F46]/90 gap-2 shadow-lg shadow-[#065F46]/20"
        >
          <ArrowUpRight className="h-5 w-5" />
          Sacar via PIX
        </Button>

        {/* Transaction list */}
        <div>
          <h2 className="text-[16px] font-bold mb-3">Histórico</h2>
          <div className="space-y-2">
            {TRANSACTIONS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                      t.status === "recebido" ? "bg-[#065F46]/10" : "bg-amber-500/10"
                    )}>
                      {t.status === "recebido" ? (
                        <CheckCircle className="h-5 w-5 text-[#065F46]" />
                      ) : (
                        <Clock className="h-5 w-5 text-amber-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold truncate">{t.servico}</p>
                      <p className="text-xs text-muted-foreground">{t.oficina} · {t.date}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={cn(
                        "text-[15px] font-bold",
                        t.status === "recebido" ? "text-[#065F46]" : "text-amber-600"
                      )}>
                        R${t.valor.toLocaleString("pt-BR")}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {t.status === "recebido" ? "Recebido ✓" : "A caminho ⏳"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MecanicoLayout>
  );
};

export default MecanicoFinanceiro;
