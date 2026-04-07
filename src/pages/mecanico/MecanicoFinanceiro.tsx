import { MecanicoLayout } from "@/components/MecanicoLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const TRANSACTIONS = [
  { date: "20/03", oficina: "Auto Center Silva", servico: "Troca de embreagem", valor: "R$1.320", status: "recebido" },
  { date: "18/03", oficina: "Oficina do Zé", servico: "Revisão completa", valor: "R$836", status: "recebido" },
  { date: "15/03", oficina: "Mecânica Express", servico: "Diagnóstico motor", valor: "R$246", status: "recebido" },
  { date: "12/03", oficina: "Car Fix Ltda", servico: "Troca correia", valor: "R$660", status: "a_caminho" },
  { date: "10/03", oficina: "RefriCar", servico: "Reparo A/C", valor: "R$546", status: "recebido" },
  { date: "08/03", oficina: "Auto Center Silva", servico: "Pastilhas de freio", valor: "R$308", status: "recebido" },
  { date: "05/03", oficina: "Oficina do Zé", servico: "Troca de óleo", valor: "R$158", status: "recebido" },
];

const MecanicoFinanceiro = () => (
  <MecanicoLayout>
    {/* Green header */}
    <div className="bg-[#065F46] text-white px-5 pt-6 pb-10 lg:rounded-b-2xl">
      <p className="text-white/70 text-sm mb-1">Total recebido este mês</p>
      <p className="text-4xl font-bold">R$2.640</p>
      <p className="text-white/60 text-sm mt-1">↑ 15% vs. mês passado</p>
    </div>

    <div className="px-4 -mt-6 space-y-4 lg:px-6 lg:max-w-2xl lg:mx-auto">
      {/* Two cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 gap-3"
      >
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-2">
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
            <p className="text-xl font-bold text-amber-600">R$660</p>
            <p className="text-xs text-muted-foreground mt-0.5">A receber ⏳</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="h-10 w-10 rounded-full bg-[#065F46]/10 flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="h-5 w-5 text-[#065F46]" />
            </div>
            <p className="text-xl font-bold text-[#065F46]">R$880</p>
            <p className="text-xs text-muted-foreground mt-0.5">Disponível ✓</p>
          </CardContent>
        </Card>
      </motion.div>

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
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
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
                  <div className="text-right">
                    <p className={cn(
                      "text-[15px] font-bold",
                      t.status === "recebido" ? "text-[#065F46]" : "text-amber-600"
                    )}>
                      {t.valor}
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

export default MecanicoFinanceiro;
