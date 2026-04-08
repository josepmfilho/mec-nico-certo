import { useState } from "react";
import { Link } from "react-router-dom";
import { MecanicoLayout } from "@/components/MecanicoLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Switch } from "@/components/ui/switch";
import { Wallet, Clock, MapPin, Star, Bell, ChevronRight, Zap, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_NEARBY = [
  { id: 1, title: "Troca de pastilhas de freio", oficina: "Auto Center Silva", distance: "2.3km", budgetMax: 500, date: "Hoje · 14h", urgente: true, specialty: "Freios" },
  { id: 2, title: "Diagnóstico motor falhando", oficina: "Oficina do Zé", distance: "4.1km", budgetMax: 400, date: "Amanhã · 09h", urgente: false, specialty: "Motor" },
  { id: 3, title: "Revisão completa 50.000km", oficina: "Mecânica Express", distance: "5.8km", budgetMax: 1200, date: "24/03 · 10h", urgente: false, specialty: "Geral" },
  { id: 4, title: "Troca correia dentada", oficina: "Car Fix Ltda", distance: "7.2km", budgetMax: 900, date: "25/03 · 08h", urgente: true, specialty: "Motor" },
  { id: 5, title: "Reparo ar-condicionado", oficina: "RefriCar", distance: "9.5km", budgetMax: 700, date: "26/03 · 11h", urgente: false, specialty: "A/C" },
];

const calcReceive = (max: number) => Math.round(max * 0.88);

const MecanicoDashboard = () => {
  const { user } = useAuth();
  const [disponivel, setDisponivel] = useState(true);
  const firstName = user?.name?.split(" ")[0] || "Mecânico";

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Bom dia";
    if (h < 18) return "Boa tarde";
    return "Boa noite";
  };

  return (
    <MecanicoLayout>
      {/* Green header */}
      <div className="bg-[#065F46] text-white px-5 pt-6 pb-10 lg:rounded-b-2xl">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-white/60 text-sm">{getGreeting()}</p>
            <h1 className="text-2xl font-bold mt-0.5">{firstName} 👋</h1>
            <div className="flex items-center gap-1.5 mt-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold">4.8</span>
              <span className="text-white/50 text-sm">· 38 avaliações</span>
            </div>
          </div>
          <button className="relative p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors active:scale-95">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-red-500 text-[10px] font-bold flex items-center justify-center ring-2 ring-[#065F46]">3</span>
          </button>
        </div>

        {/* Availability toggle */}
        <motion.div
          layout
          className={cn(
            "flex items-center justify-between rounded-2xl px-5 py-4 transition-colors",
            disponivel ? "bg-white/15" : "bg-white/5 border border-white/10"
          )}
        >
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {disponivel && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="relative flex h-3 w-3"
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400" />
                </motion.span>
              )}
            </AnimatePresence>
            <div>
              <span className="font-semibold text-[16px] block">
                {disponivel ? "Disponível agora" : "Você está offline"}
              </span>
              <span className="text-white/50 text-xs">
                {disponivel ? "Recebendo demandas próximas" : "Ative para receber demandas"}
              </span>
            </div>
          </div>
          <Switch
            checked={disponivel}
            onCheckedChange={setDisponivel}
            className="data-[state=checked]:bg-green-400 data-[state=unchecked]:bg-white/20 scale-110"
          />
        </motion.div>
      </div>

      <div className="px-4 -mt-5 space-y-5 lg:px-6 pb-6">
        {/* KPI cards 2x2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 gap-3"
        >
          {[
            { icon: Wallet, value: "R$2.640", label: "Recebido este mês", color: "text-[#065F46]", bgColor: "bg-[#065F46]/10", iconColor: "text-[#065F46]" },
            { icon: Clock, value: "R$660", label: "A receber em breve", color: "text-amber-600", bgColor: "bg-amber-500/10", iconColor: "text-amber-500" },
            { icon: MapPin, value: "8", label: "Demandas próximas", color: "text-blue-600", bgColor: "bg-blue-500/10", iconColor: "text-blue-500" },
            { icon: TrendingUp, value: "4.8 ⭐", label: "Minha avaliação", color: "text-primary", bgColor: "bg-primary/10", iconColor: "text-primary" },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow active:scale-[0.98]">
                <CardContent className="p-4">
                  <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center mb-2.5", kpi.bgColor)}>
                    <kpi.icon className={cn("h-4.5 w-4.5", kpi.iconColor)} />
                  </div>
                  <p className={cn("text-[22px] font-bold leading-none", kpi.color)}>{kpi.value}</p>
                  <p className="text-xs text-muted-foreground mt-1.5">{kpi.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Demand list */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#065F46]" />
              <h2 className="text-[16px] font-bold">{MOCK_NEARBY.length} demandas próximas</h2>
            </div>
            <Link to="/mecanico/mapa" className="text-sm text-[#065F46] font-semibold flex items-center gap-0.5 active:opacity-70">
              Ver mapa <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {MOCK_NEARBY.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.3 }}
              >
                <Link to={`/mecanico/demandas/${d.id}`} className="block">
                  <Card className="border-0 shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {/* Left accent */}
                        <div className={cn(
                          "w-1 self-stretch rounded-full shrink-0",
                          d.urgente ? "bg-red-500" : "bg-primary/30"
                        )} />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            {d.urgente ? (
                              <Badge className="bg-red-500/10 text-red-600 text-[11px] border-0 font-semibold px-2 py-0.5">🔴 URGENTE</Badge>
                            ) : (
                              <Badge className="bg-primary/10 text-primary text-[11px] border-0 font-semibold px-2 py-0.5">{d.specialty}</Badge>
                            )}
                            <span className="text-xs text-muted-foreground flex items-center gap-0.5 ml-auto">
                              <MapPin className="h-3 w-3" />{d.distance}
                            </span>
                          </div>

                          <p className="font-semibold text-[15px] leading-snug mb-1">{d.title}</p>

                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                            <span className="truncate">{d.oficina}</span>
                            <span>·</span>
                            <span className="shrink-0">{d.date}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-muted-foreground text-xs">Você recebe </span>
                              <span className="font-bold text-[17px] text-[#065F46]">R${calcReceive(d.budgetMax)}</span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground/50" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MecanicoLayout>
  );
};

export default MecanicoDashboard;
