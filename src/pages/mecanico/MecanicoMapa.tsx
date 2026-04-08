import { useState } from "react";
import { Link } from "react-router-dom";
import { MecanicoLayout } from "@/components/MecanicoLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Filter, X, Navigation, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const RAIOS = ["5km", "15km", "30km"];
const ESPECIALIDADES = ["Todas", "Motor", "Freios", "Suspensão", "Elétrica", "A/C"];

const PINS = [
  { id: 1, title: "Troca de pastilhas", oficina: "Auto Center Silva", distance: "2.3km", budget: 500, urgente: true, top: "35%", left: "55%" },
  { id: 2, title: "Diagnóstico motor", oficina: "Oficina do Zé", distance: "4.1km", budget: 400, urgente: false, top: "25%", left: "30%" },
  { id: 3, title: "Revisão 50.000km", oficina: "Mecânica Express", distance: "5.8km", budget: 1200, urgente: false, top: "60%", left: "70%" },
  { id: 4, title: "Troca correia", oficina: "Car Fix Ltda", distance: "7.2km", budget: 900, urgente: true, top: "50%", left: "20%" },
  { id: 5, title: "Reparo A/C", oficina: "RefriCar", distance: "9.5km", budget: 700, urgente: false, top: "70%", left: "45%" },
];

const MecanicoMapa = () => {
  const [raio, setRaio] = useState("15km");
  const [especialidade, setEspecialidade] = useState("Todas");
  const [selectedPin, setSelectedPin] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const selected = PINS.find(p => p.id === selectedPin);

  return (
    <MecanicoLayout>
      <div className="relative h-[calc(100vh-80px)] lg:h-screen bg-gradient-to-b from-[#e8e4d8] to-[#d8d4c8]">
        {/* Filter bar */}
        <div className="absolute top-0 left-0 right-0 z-10 p-3 safe-area-top">
          <div className="flex gap-2 items-center">
            <div className="flex gap-1 bg-white/95 backdrop-blur-sm rounded-full shadow-lg px-1.5 py-1.5">
              {RAIOS.map(r => (
                <button
                  key={r}
                  onClick={() => setRaio(r)}
                  className={cn(
                    "px-3.5 py-2 rounded-full text-sm font-semibold transition-all active:scale-95",
                    raio === r ? "bg-[#065F46] text-white shadow-sm" : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "h-11 w-11 rounded-full shadow-lg flex items-center justify-center transition-colors active:scale-95",
                showFilters ? "bg-[#065F46] text-white" : "bg-white/95 backdrop-blur-sm"
              )}
            >
              <Filter className="h-4.5 w-4.5" />
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="mt-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold">Filtrar por especialidade</span>
                  <button onClick={() => setShowFilters(false)} className="p-1 rounded-full hover:bg-muted">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ESPECIALIDADES.map(e => (
                    <button
                      key={e}
                      onClick={() => { setEspecialidade(e); setShowFilters(false); }}
                      className={cn(
                        "px-3.5 py-2 rounded-full text-sm font-medium border transition-all active:scale-95",
                        especialidade === e ? "bg-[#065F46] text-white border-[#065F46]" : "border-border text-muted-foreground hover:border-[#065F46]/40"
                      )}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Map placeholder with pins */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground/60">
            <Navigation className="h-16 w-16 mx-auto mb-3 text-[#065F46]/30" />
            <p className="text-sm font-semibold text-muted-foreground/80">Mapa de demandas</p>
            <p className="text-xs mt-1">Integração Google Maps em breve</p>
          </div>
        </div>

        {/* "You are here" pin */}
        <div className="absolute z-5 transform -translate-x-1/2 -translate-y-1/2" style={{ top: "48%", left: "48%" }}>
          <div className="relative">
            <div className="h-5 w-5 rounded-full bg-blue-500 border-3 border-white shadow-lg" />
            <div className="absolute inset-0 h-5 w-5 rounded-full bg-blue-500 animate-ping opacity-30" />
          </div>
        </div>

        {/* Mock pins */}
        {PINS.map(pin => (
          <button
            key={pin.id}
            onClick={() => setSelectedPin(pin.id === selectedPin ? null : pin.id)}
            className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 active:scale-110 transition-transform"
            style={{ top: pin.top, left: pin.left }}
          >
            <div className={cn(
              "rounded-full flex items-center justify-center shadow-lg transition-all",
              pin.id === selectedPin ? "h-12 w-12 bg-[#065F46] ring-4 ring-[#065F46]/20" : "h-10 w-10",
              pin.id !== selectedPin && (pin.urgente ? "bg-red-500" : "bg-primary"),
            )}>
              <MapPin className="h-5 w-5 text-white" />
            </div>
            {pin.urgente && pin.id !== selectedPin && (
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
            )}
          </button>
        ))}

        {/* Selected pin card */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="absolute bottom-4 left-3 right-3 z-20"
            >
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      {selected.urgente && <Badge className="bg-red-500/10 text-red-600 text-[11px] border-0 mb-1.5">🔴 URGENTE</Badge>}
                      <p className="font-bold text-[16px] leading-snug">{selected.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{selected.oficina} · {selected.distance}</p>
                    </div>
                    <button onClick={() => setSelectedPin(null)} className="p-1.5 rounded-full hover:bg-muted active:scale-90">
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <div>
                      <span className="text-xs text-muted-foreground">Você recebe</span>
                      <p className="font-bold text-xl text-[#065F46]">R${Math.round(selected.budget * 0.88)}</p>
                    </div>
                    <Button size="sm" className="bg-[#065F46] hover:bg-[#065F46]/90 h-11 px-5 gap-1 text-sm font-semibold" asChild>
                      <Link to={`/mecanico/demandas/${selected.id}`}>Ver detalhes <ChevronRight className="h-4 w-4" /></Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MecanicoLayout>
  );
};

export default MecanicoMapa;
