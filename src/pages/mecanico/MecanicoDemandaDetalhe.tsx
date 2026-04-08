import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MecanicoLayout } from "@/components/MecanicoLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, ArrowLeft, Clock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const MecanicoDemandaDetalhe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showProposta, setShowProposta] = useState(false);
  const [valor, setValor] = useState("440");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Proposta enviada! 🎉", description: "A oficina será notificada. Acompanhe no chat." });
      navigate("/mecanico/dashboard");
    }, 800);
  };

  return (
    <MecanicoLayout hideBottomNav>
      <div className="min-h-screen flex flex-col">
        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b bg-background sticky top-0 z-10">
          <button
            onClick={() => navigate(-1)}
            className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-muted active:scale-90 transition-transform"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="font-semibold text-[16px]">Detalhe da demanda</span>
        </div>

        <div className="flex-1 px-4 py-4 space-y-4 lg:px-6 lg:max-w-2xl lg:mx-auto">
          {/* Urgency + title */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="bg-red-500/10 text-red-600 text-xs border-0 mb-2 font-semibold">🔴 URGENTE</Badge>
            <h1 className="text-xl font-bold leading-tight">Troca de pastilhas de freio — Honda Civic 2019</h1>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>Publicado há 2 horas</span>
            </div>
          </motion.div>

          {/* Two highlight cards */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="grid grid-cols-2 gap-3"
          >
            <Card className="border-0 shadow-md bg-[#065F46]/5">
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Você recebe</p>
                <p className="text-2xl font-bold text-[#065F46]">R$440</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md bg-[#065F46]/5">
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Distância</p>
                <p className="text-2xl font-bold text-[#065F46]">2.3km</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Oficina info */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary">AC</div>
                  <div className="flex-1">
                    <p className="font-semibold">Auto Center Silva</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" /> 4.6</span>
                      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> 47 contratações</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs shrink-0">
                    <Shield className="h-3 w-3 mr-1" /> Verificada
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-[15px] mb-2">Descrição do serviço</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Preciso trocar as pastilhas de freio dianteiras de um Honda Civic 2019 com 38.000km. Pastilhas Fras-le ou similar de qualidade. Carro já está no elevador. Estimativa de 1h30 de serviço.
            </p>
          </div>

          {/* Mini map */}
          <div className="rounded-2xl border bg-gradient-to-b from-[#e8e4d8] to-[#d8d4c8] h-36 flex items-center justify-center overflow-hidden relative">
            <div className="text-center text-muted-foreground relative z-10">
              <MapPin className="h-6 w-6 mx-auto mb-1 text-[#065F46]" />
              <p className="text-xs font-medium">Vila Mariana, São Paulo</p>
              <p className="text-[10px]">2.3km de você</p>
            </div>
          </div>

          {/* Proposal form (expandable) */}
          <AnimatePresence>
            {showProposta && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <Card className="border-0 shadow-md">
                  <CardContent className="p-4 space-y-4">
                    <h3 className="font-bold text-[16px]">Enviar proposta</h3>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Valor (R$)</label>
                      <Input
                        type="number"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        className="h-12 text-[16px] text-center font-bold text-[#065F46]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Mensagem (opcional)</label>
                      <Textarea
                        placeholder="Ex: Tenho experiência com Honda. Consigo fazer em 1h."
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        rows={3}
                        className="text-[16px]"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Fixed bottom CTA */}
        <div className="sticky bottom-0 border-t bg-background px-4 py-3 space-y-2 safe-area-bottom">
          {!showProposta ? (
            <>
              <Button
                onClick={() => setShowProposta(true)}
                className="w-full h-14 text-[16px] font-bold bg-[#065F46] hover:bg-[#065F46]/90 shadow-lg shadow-[#065F46]/20 active:scale-[0.98] transition-transform"
              >
                Enviar proposta — R$440
              </Button>
              <button
                onClick={() => navigate(-1)}
                className="w-full text-center text-sm text-muted-foreground py-2 active:opacity-70"
              >
                Não tenho interesse
              </button>
            </>
          ) : (
            <Button
              onClick={handleSend}
              disabled={loading || !valor}
              className="w-full h-14 text-[16px] font-bold bg-[#065F46] hover:bg-[#065F46]/90 shadow-lg shadow-[#065F46]/20 active:scale-[0.98] transition-transform disabled:opacity-50"
            >
              {loading ? "Enviando..." : `Confirmar proposta — R$${valor}`}
            </Button>
          )}
        </div>
      </div>
    </MecanicoLayout>
  );
};

export default MecanicoDemandaDetalhe;
