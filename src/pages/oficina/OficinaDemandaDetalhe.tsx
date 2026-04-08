import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, MessageSquare, Shield, ArrowLeft, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const MOCK_DEMAND = {
  title: "Troca de embreagem — Fiat Toro 2021",
  specialty: "Transmissão",
  date: "22/03/2025",
  budget: "R$1.800",
  description: "Embreagem patinando ao engatar marchas. Carro com 45.000km. Preciso de mecânico com experiência em câmbio Fiat.",
};

const MOCK_PROPOSALS = [
  { id: 1, name: "Carlos Eduardo", rating: 4.9, reviews: 38, specialties: ["Motor", "Transmissão"], value: "R$1.500", distance: "2.3km", message: "Tenho experiência com Fiat Toro. Consigo fazer em 1 dia. Peças inclusas no valor.", recommended: true },
  { id: 2, name: "Roberto Santos", rating: 4.7, reviews: 22, specialties: ["Transmissão"], value: "R$1.650", distance: "5.1km", message: "Trabalho com câmbio há 8 anos. Garantia de 90 dias no serviço.", recommended: false },
  { id: 3, name: "Felipe Oliveira", rating: 4.5, reviews: 15, specialties: ["Mecânica Geral", "Transmissão"], value: "R$1.400", distance: "8.7km", message: "Posso fazer na sexta. Já troquei embreagem de várias Toro.", recommended: false },
];

const OficinaDemandaDetalhe = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const accept = (name: string) => {
    toast({ title: "Proposta aceita! ✅", description: `Você contratou ${name}. Acesse o chat para combinar detalhes.` });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">
        {/* Back + heading */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-muted">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="font-display text-xl font-bold">Detalhes da demanda</h2>
        </div>

        {/* Demand summary */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <h2 className="font-display text-xl font-bold">{MOCK_DEMAND.title}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge>{MOCK_DEMAND.specialty}</Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {MOCK_DEMAND.date}</span>
              <span className="text-sm font-bold text-primary">{MOCK_DEMAND.budget}</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{MOCK_DEMAND.description}</p>
          </CardContent>
        </Card>

        {/* Proposals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-bold">Propostas recebidas</h3>
            <Badge variant="secondary" className="text-sm">{MOCK_PROPOSALS.length} propostas</Badge>
          </div>
          <div className="space-y-4">
            {MOCK_PROPOSALS.map((p) => (
              <Card key={p.id} className={`hover:shadow-md transition-shadow ${p.recommended ? "ring-2 ring-[#065F46]/20" : ""}`}>
                <CardContent className="p-6">
                  {p.recommended && (
                    <Badge className="bg-[#065F46]/10 text-[#065F46] border-0 mb-3 text-xs">
                      ⭐ Recomendado — Melhor custo-benefício
                    </Badge>
                  )}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      <div className="h-12 w-12 shrink-0 rounded-full bg-[#065F46]/10 flex items-center justify-center font-display font-bold text-[#065F46]">
                        {p.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{p.name}</p>
                          <Badge variant="secondary" className="text-[10px] gap-0.5">
                            <Shield className="h-2.5 w-2.5" /> Verificado
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium">{p.rating}</span>
                          <span className="text-xs text-muted-foreground">({p.reviews} avaliações)</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {p.specialties.map((s) => <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>)}
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                          <MapPin className="h-3 w-3" /> {p.distance} da oficina
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-2xl font-bold text-[#065F46]">{p.value}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground bg-muted/50 rounded-xl p-3.5 leading-relaxed">"{p.message}"</p>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="gap-1 bg-[#065F46] hover:bg-[#065F46]/90 text-white" onClick={() => accept(p.name)}>
                      Aceitar proposta
                    </Button>
                    <Button size="sm" variant="outline">Recusar</Button>
                    <Button size="sm" variant="ghost" className="gap-1 ml-auto" asChild>
                      <Link to={`/oficina/chat/${p.id}`}><MessageSquare className="h-4 w-4" /> Chat</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OficinaDemandaDetalhe;
