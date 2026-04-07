import { MecanicoLayout } from "@/components/MecanicoLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, Camera, MapPin, Award, CreditCard, FileText, ChevronRight, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ESPECIALIDADES = ["Motor", "Freios", "Suspensão", "Elétrica", "Injeção eletrônica"];

const MecanicoPerfil = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <MecanicoLayout>
      <div className="px-4 py-6 space-y-5 lg:px-6 lg:max-w-2xl lg:mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center"
        >
          {/* Avatar */}
          <div className="relative mb-3">
            <div className="h-24 w-24 rounded-full bg-[#065F46] flex items-center justify-center text-white text-3xl font-bold font-display">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center border">
              <Camera className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <h1 className="text-xl font-bold">{user?.name}</h1>
          <div className="flex items-center gap-1.5 mt-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold">4.8</span>
            <span className="text-sm text-muted-foreground">· 38 avaliações</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            São Paulo, SP · Raio de 15km
          </div>
        </motion.div>

        {/* Especialidades */}
        <div className="flex flex-wrap gap-2 justify-center">
          {ESPECIALIDADES.map(e => (
            <Badge key={e} className="bg-[#065F46]/10 text-[#065F46] border-0 font-medium px-3 py-1">{e}</Badge>
          ))}
        </div>

        {/* Profile completeness */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">Completude do perfil</span>
              <span className="text-sm font-bold text-[#065F46]">65%</span>
            </div>
            <Progress value={65} className="h-2 [&>div]:bg-[#065F46]" />
            <p className="text-xs text-muted-foreground mt-2">Adicione foto, portfólio e certificados para receber mais propostas.</p>
          </CardContent>
        </Card>

        {/* Menu sections */}
        <div className="space-y-2">
          {[
            { icon: FileText, label: "Sobre mim", desc: "Conte sua experiência" },
            { icon: Camera, label: "Portfólio", desc: "Fotos dos seus trabalhos" },
            { icon: Award, label: "Certificados", desc: "Comprove sua qualificação" },
            { icon: CreditCard, label: "Dados PIX", desc: "Para receber pagamentos" },
          ].map((item) => (
            <Card key={item.label} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <button className="flex items-center justify-between w-full text-left">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button variant="outline" className="w-full h-12 text-[15px] font-semibold border-[#065F46] text-[#065F46]">
          Editar perfil
        </Button>

        <Button variant="ghost" className="w-full h-12 text-[15px] text-muted-foreground gap-2" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          Sair da conta
        </Button>
      </div>
    </MecanicoLayout>
  );
};

export default MecanicoPerfil;
