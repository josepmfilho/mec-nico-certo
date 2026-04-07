import { useState } from "react";
import { Link } from "react-router-dom";
import { MecanicoLayout } from "@/components/MecanicoLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <div className="relative h-[calc(100vh-80px)] lg:h-screen bg-[#e8e4d8]">
        {/* Filter bar */}
        <div className="absolute top-0 left-0 right-0 z-10 p-3">
          <div className="flex gap-2">
            <div className="flex gap-1.5 bg-white rounded-full shadow-lg px-1.5 py-1.5">
              {RAIOS.map(r => (
                <button
                  key={r}
                  onClick={() => setRaio(r)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    raio === r ? "bg-[#065F46] text-white" : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center"
            >
              <Filter className="h-4 w-4" />
            </button>
          </div>

          {showFilters && (
            <div className="mt-2 bg-white rounded-2xl shadow-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Especialidade</span>
                <button onClick={() => setShowFilters(false)}><X className="h-4 w-4" /></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {ESPECIALIDADES.map(e => (
                  <button
                    key={e}
                    onClick={() => { setEspecialidade(e); setShowFilters(false); }}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
                      especialidade === e ? "bg-[#065F46] text-white border-[#065F46]" : "border-border text-muted-foreground"
                    )}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Map placeholder with pins */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-2 text-[#065F46]" />
            <p className="text-sm font-medium">Mapa de demandas</p>
            <p className="text-xs">Integração Google Maps em breve</p>
          </div>
        </div>

        {/* Mock pins */}
        {PINS.map(pin => (
          <button
            key={pin.id}
            onClick={() => setSelectedPin(pin.id === selectedPin ? null : pin.id)}
            className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: pin.top, left: pin.left }}
          >
            <div className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center shadow-lg transition-transform",
              pin.id === selectedPin ? "scale-125 bg-[#065F46]" : "bg-primary",
            )}>
              <MapPin className="h-5 w-5 text-white" />
            </div>
          </button>
        ))}

        {/* Selected pin card */}
        {selected && (
          <div className="absolute bottom-4 left-3 right-3 z-20">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    {selected.urgente && <Badge className="bg-red-500 text-white text-[11px] border-0 mb-1">URGENTE</Badge>}
                    <p className="font-semibold text-[15px]">{selected.title}</p>
                    <p className="text-xs text-muted-foreground">{selected.oficina} · {selected.distance}</p>
                  </div>
                  <button onClick={() => setSelectedPin(null)}>
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="font-bold text-[#065F46]">Você recebe R${Math.round(selected.budget * 0.88)}</p>
                  <Button size="sm" className="bg-[#065F46] hover:bg-[#065F46]/90 h-10 px-4" asChild>
                    <Link to={`/mecanico/demandas/${selected.id}`}>Ver detalhes</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MecanicoLayout>
  );
};

export default MecanicoMapa;
