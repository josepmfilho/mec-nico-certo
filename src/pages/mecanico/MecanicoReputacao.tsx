import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

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
  { oficina: "Mecânica Express", date: "12/03/2025", stars: 4, comment: "Bom serviço. Chegou pontual e resolveu o problema. Poderia ter comunicado melhor o andamento." },
  { oficina: "Car Fix Ltda", date: "08/03/2025", stars: 5, comment: "Profissional nota 10. Encontrou um problema adicional e me avisou antes de mexer. Transparência total." },
  { oficina: "RefriCar", date: "05/03/2025", stars: 4, comment: "Serviço bem feito. Demorou um pouco mais que o estimado mas o resultado ficou perfeito." },
  { oficina: "Auto Center Silva", date: "01/03/2025", stars: 5, comment: "Segunda vez que contrato. Mesma qualidade de sempre. Já virou nosso mecânico de confiança." },
  { oficina: "Oficina do Zé", date: "25/02/2025", stars: 2, comment: "Chegou 40 minutos atrasado e não avisou. O serviço em si ficou ok mas a pontualidade precisa melhorar." },
];

const MecanicoReputacao = () => (
  <DashboardLayout>
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="font-display text-2xl font-bold">Reputação</h2>
        <p className="text-muted-foreground">Sua avaliação e feedback das oficinas</p>
      </div>

      {/* Average */}
      <Card>
        <CardContent className="p-6 flex flex-col items-center sm:flex-row sm:gap-8">
          <div className="text-center mb-4 sm:mb-0">
            <p className="font-display text-5xl font-bold text-mecanico">4.8</p>
            <div className="flex items-center gap-0.5 mt-1 justify-center">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`h-5 w-5 ${s <= 4 ? "text-warning fill-warning" : "text-warning/50 fill-warning/50"}`} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">38 avaliações</p>
          </div>
          <div className="flex-1 space-y-2 w-full">
            {DISTRIBUTION.map((d) => (
              <div key={d.stars} className="flex items-center gap-2">
                <span className="text-sm w-3 text-right">{d.stars}</span>
                <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                <Progress value={d.pct} className="flex-1 h-2" />
                <span className="text-xs text-muted-foreground w-6 text-right">{d.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reviews */}
      <div className="space-y-3">
        {REVIEWS.map((r, i) => (
          <Card key={i}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-display text-xs font-bold text-primary">
                    {r.oficina.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{r.oficina}</p>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-3.5 w-3.5 ${s <= r.stars ? "text-warning fill-warning" : "text-muted-foreground/30"}`} />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{r.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </DashboardLayout>
);

export default MecanicoReputacao;
