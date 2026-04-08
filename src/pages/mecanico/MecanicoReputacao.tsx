import { MecanicoLayout } from "@/components/MecanicoLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const DISTRIBUTION = [
  { stars: 5, count: 24, pct: 63 },
  { stars: 4, count: 9, pct: 24 },
  { stars: 3, count: 3, pct: 8 },
  { stars: 2, count: 1, pct: 3 },
  { stars: 1, count: 1, pct: 3 },
];

const REVIEWS = [
  { oficina: "Auto Center Silva", date: "18/03/2025", stars: 5, comment: "Excelente profissional. Trocou a embreagem em menos tempo que o previsto. Super organizado e limpo." },
  { oficina: "Oficina do Zé", date: "15/03/2025", stars: 5, comment: "Fez a revisão completa com atenção a cada detalhe. Recomendo fortemente." },
  { oficina: "Mecânica Express", date: "12/03/2025", stars: 4, comment: "Bom serviço. Chegou pontual e resolveu o problema." },
  { oficina: "Car Fix Ltda", date: "08/03/2025", stars: 5, comment: "Profissional nota 10. Encontrou um problema adicional e me avisou antes de mexer." },
  { oficina: "RefriCar", date: "05/03/2025", stars: 4, comment: "Serviço bem feito. O resultado ficou perfeito." },
  { oficina: "Auto Center Silva", date: "01/03/2025", stars: 5, comment: "Segunda vez que contrato. Mesma qualidade de sempre." },
];

const MecanicoReputacao = () => (
  <MecanicoLayout>
    <div className="px-4 py-6 space-y-5 lg:px-6 lg:max-w-2xl lg:mx-auto pb-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-bold mb-1">Minha reputação</h1>
        <p className="text-sm text-muted-foreground">Sua nota é visível para todas as oficinas</p>
      </motion.div>

      {/* Average */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card className="border-0 shadow-md">
          <CardContent className="p-5">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-[#065F46]">4.8</p>
                <div className="flex items-center gap-0.5 mt-1 justify-center">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-4 w-4 ${s <= 4 ? "text-yellow-500 fill-yellow-500" : "text-yellow-500/40 fill-yellow-500/40"}`} />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">38 avaliações</p>
              </div>
              <div className="flex-1 space-y-2">
                {DISTRIBUTION.map((d) => (
                  <div key={d.stars} className="flex items-center gap-2">
                    <span className="text-xs w-3 text-right font-medium">{d.stars}</span>
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <Progress value={d.pct} className="flex-1 h-2 [&>div]:bg-[#065F46]" />
                    <span className="text-[11px] text-muted-foreground w-6 text-right">{d.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border flex items-center gap-2 text-sm text-[#065F46]">
              <TrendingUp className="h-4 w-4" />
              <span className="font-medium">Sua nota subiu 0.2 este mês</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Reviews */}
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-bold">Avaliações recentes</h2>
        <span className="text-xs text-muted-foreground">{REVIEWS.length} total</span>
      </div>
      <div className="space-y-2">
        {REVIEWS.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.04 }}
          >
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center font-display text-xs font-bold text-primary">
                      {r.oficina.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold">{r.oficina}</p>
                      <p className="text-[11px] text-muted-foreground">{r.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`h-3.5 w-3.5 ${s <= r.stars ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/20"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{r.comment}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </MecanicoLayout>
);

export default MecanicoReputacao;
