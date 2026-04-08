import { MecanicoLayout } from "@/components/MecanicoLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Star, Camera, MapPin, Award, CreditCard, FileText, ChevronRight, LogOut, Edit, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const ESPECIALIDADES = ["Motor", "Freios", "Suspensão", "Elétrica", "Injeção eletrônica"];

const PROFILE_ITEMS = [
  { icon: FileText, label: "Sobre mim", desc: "Conte sua experiência", done: true },
  { icon: Camera, label: "Portfólio", desc: "Fotos dos seus trabalhos", done: false },
  { icon: Award, label: "Certificados", desc: "Comprove sua qualificação", done: false },
  { icon: CreditCard, label: "Dados PIX", desc: "Para receber pagamentos", done: true },
];

const completeness = 65;

const MecanicoPerfil = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEdit = () => {
    toast({ title: "Modo edição", description: "Funcionalidade em breve!" });
  };

  return (
    <MecanicoLayout>
      <div className="px-4 py-6 space-y-5 lg:px-6 lg:max-w-2xl lg:mx-auto pb-8">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center"
        >
          {/* Avatar */}
          <div className="relative mb-4">
            <div className="h-28 w-28 rounded-full bg-gradient-to-br from-[#065F46] to-[#065F46]/70 flex items-center justify-center text-white text-4xl font-bold font-display shadow-lg shadow-[#065F46]/20">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <button className="absolute bottom-1 right-1 h-9 w-9 rounded-full bg-white shadow-lg flex items-center justify-center border border-border active:scale-90 transition-transform">
              <Camera className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <h1 className="text-xl font-bold">{user?.name}</h1>
          <div className="flex items-center gap-1.5 mt-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold">4.8</span>
            <span className="text-sm text-muted-foreground">· 38 avaliações</span>
          </div>
          <div className="flex items-center gap-1 mt-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            São Paulo, SP · Raio de 15km
          </div>
        </motion.div>

        {/* Especialidades */}
        <div className="flex flex-wrap gap-2 justify-center">
          {ESPECIALIDADES.map(e => (
            <Badge key={e} className="bg-[#065F46]/10 text-[#065F46] border-0 font-medium px-3 py-1.5 text-sm">{e}</Badge>
          ))}
        </div>

        {/* Profile completeness — prominent CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className={cn(
            "border-0 shadow-md overflow-hidden",
            completeness < 80 ? "border-l-4 border-l-amber-500" : "border-l-4 border-l-[#065F46]"
          )}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Completude do perfil</span>
                <span className={cn(
                  "text-sm font-bold",
                  completeness < 80 ? "text-amber-600" : "text-[#065F46]"
                )}>{completeness}%</span>
              </div>
              <Progress value={completeness} className={cn(
                "h-2.5 rounded-full",
                completeness < 80 ? "[&>div]:bg-amber-500" : "[&>div]:bg-[#065F46]"
              )} />
              <p className="text-xs text-muted-foreground mt-2.5">
                💡 Perfis completos recebem <span className="font-semibold text-foreground">3x mais propostas</span>. Adicione portfólio e certificados.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Menu sections */}
        <div className="space-y-2">
          {PROFILE_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.04 }}
            >
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <button className="flex items-center justify-between w-full text-left active:opacity-70 transition-opacity">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center",
                        item.done ? "bg-[#065F46]/10" : "bg-muted"
                      )}>
                        {item.done ? (
                          <CheckCircle className="h-5 w-5 text-[#065F46]" />
                        ) : (
                          <item.icon className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="text-[15px] font-semibold">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground/50" />
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Button
          onClick={handleEdit}
          className="w-full h-12 text-[15px] font-semibold bg-[#065F46] hover:bg-[#065F46]/90 gap-2"
        >
          <Edit className="h-4 w-4" />
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
