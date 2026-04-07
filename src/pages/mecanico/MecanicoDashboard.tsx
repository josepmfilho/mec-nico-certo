import { useState } from "react";
import { Link } from "react-router-dom";
import { MecanicoLayout } from "@/components/MecanicoLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Wallet, Clock, MapPin, Star, Bell, ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const MOCK_NEARBY = [
  { id: 1, title: "Troca de pastilhas de freio", oficina: "Auto Center Silva", distance: "2.3km", budgetMax: 500, date: "22/03 · 14h", urgente: true },
  { id: 2, title: "Diagnóstico motor falhando", oficina: "Oficina do Zé", distance: "4.1km", budgetMax: 400, date: "23/03 · 09h", urgente: false },
  { id: 3, title: "Revisão completa 50.000km", oficina: "Mecânica Express", distance: "5.8km", budgetMax: 1200, date: "24/03 · 10h", urgente: false },
  { id: 4, title: "Troca correia dentada", oficina: "Car Fix Ltda", distance: "7.2km", budgetMax: 900, date: "25/03 · 08h", urgente: true },
  { id: 5, title: "Reparo ar-condicionado", oficina: "RefriCar", distance: "9.5km", budgetMax: 700, date: "26/03 · 11h", urgente: false },
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
      <div className="bg-[#065F46] text-white px-5 pt-6 pb-8 lg:rounded-b-2xl">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold">{getGreeting()}, {firstName}</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium">4.8</span>
              <span className="text-white/60 text-sm">· 38 avaliações</span>
            </div>
          </div>
          <button className="relative p-2">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-5 w-5 rounded-full bg-red-500 text-[10px] font-bold flex items-center justify-center">3</span>
          </button>
        </div>

        {/* Availability toggle */}
        <div className="flex items-center justify-between bg-white/10 backdrop-blur rounded-2xl px-5 py-4">
          <div className="flex items-center gap-3">
            {disponivel && (
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400" />
              </span>
            )}
            <span className="font-semibold text-[16px]">
              {disponivel ? "Disponível agora" : "Indisponível"}
            </span>
          </div>
          <Switch
            checked={disponivel}
            onCheckedChange={setDisponivel}
            className="data-[state=checked]:bg-green-400 data-[state=unchecked]:bg-white/20"
          />
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-5 lg:px-6">
        {/* KPI cards 2x2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 gap-3"
        >
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-full bg-[#065F46]/10 flex items-center justify-center">
                  <Wallet className="h-4 w-4 text-[#065F46]" />
                </div>
              </div>
              <p className="text-[22px] font-bold text-[#065F46]">R$2.640</p>
              <p className="text-xs text-muted-foreground mt-0.5">Recebido este mês</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-amber-500" />
                </div>
              </div>
              <p className="text-[22px] font-bold text-amber-600">R$660</p>
              <p className="text-xs text-muted-foreground mt-0.5">A receber em breve</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-blue-500" />
                </div>
              </div>
              <p className="text-[22px] font-bold text-blue-600">8</p>
              <p className="text-xs text-muted-foreground mt-0.5">Demandas próximas</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="h-4 w-4 text-primary" />
                </div>
              </div>
              <p className="text-[22px] font-bold text-primary">4.8 ⭐</p>
              <p className="text-xs text-muted-foreground mt-0.5">Minha avaliação</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Demand list */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[16px] font-bold">{MOCK_NEARBY.length} demandas próximas</h2>
            <Link to="/mecanico/mapa" className="text-sm text-[#065F46] font-medium flex items-center gap-0.5">
              Ver mapa <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {MOCK_NEARBY.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {d.urgente ? (
                          <Badge className="bg-red-500 text-white text-[11px] border-0 font-semibold px-2 py-0.5">URGENTE</Badge>
                        ) : (
                          <Badge className="bg-primary/10 text-primary text-[11px] border-0 font-semibold px-2 py-0.5">NORMAL</Badge>
                        )}
                        <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                          <MapPin className="h-3 w-3" />{d.distance}
                        </span>
                      </div>
                    </div>

                    <p className="font-semibold text-[15px] mb-1">{d.title}</p>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <span>{d.oficina}</span>
                      <span>·</span>
                      <span>{d.date}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-[15px]">
                        <span className="text-muted-foreground text-sm">Até R${d.budgetMax} → </span>
                        <span className="font-bold text-[#065F46]">você recebe R${calcReceive(d.budgetMax)}</span>
                      </p>
                      <Button size="sm" className="bg-[#065F46] hover:bg-[#065F46]/90 text-white h-10 px-4 text-sm" asChild>
                        <Link to={`/mecanico/demandas/${d.id}`}>Ver detalhes</Link>
                      </Button>
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

export default MecanicoDashboard;
