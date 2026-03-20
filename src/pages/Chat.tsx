import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Image, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_MESSAGES = [
  { id: 1, from: "oficina", text: "Boa tarde! Vi que você tem experiência em freios. Temos um Civic 2019 precisando trocar as pastilhas dianteiras.", time: "14:02", read: true },
  { id: 2, from: "mecanico", text: "Boa tarde! Tenho sim, trabalho com Honda há anos. Pastilhas originais ou similares?", time: "14:05", read: true },
  { id: 3, from: "oficina", text: "Pode ser similar de boa qualidade. Coramica ou Fras-le.", time: "14:06", read: true },
  { id: 4, from: "mecanico", text: "Fras-le é ótima opção. Consigo fazer amanhã de manhã, por volta das 9h. Leva cerca de 1h30.", time: "14:08", read: true },
  { id: 5, from: "oficina", text: "Perfeito. Pode vir às 9h então. O carro já vai estar no elevador.", time: "14:10", read: true },
  { id: 6, from: "mecanico", text: "Combinado! Vou levar as pastilhas. Precisa trocar disco também ou só pastilha?", time: "14:12", read: true },
  { id: 7, from: "oficina", text: "Só pastilha por enquanto. Os discos ainda estão na medida.", time: "14:14", read: true },
  { id: 8, from: "mecanico", text: "Beleza, amanhã estou aí. Obrigado pela oportunidade! 👍", time: "14:15", read: false },
];

const Chat = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState("");
  const myRole = user?.role === "oficina" ? "oficina" : "mecanico";

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setNewMessage("");
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[700px]">
        {/* Service banner */}
        <div className="rounded-lg bg-warning/10 border border-warning/30 px-4 py-3 mb-4">
          <p className="text-sm font-medium text-warning">
            Serviço: Troca de pastilha de freios — 20/03 às 09h — R$350
          </p>
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border pb-4 mb-4">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-display font-bold text-sm">
            {myRole === "oficina" ? "CE" : "AC"}
          </div>
          <div>
            <p className="text-sm font-semibold">{myRole === "oficina" ? "Carlos Eduardo" : "Auto Center Silva"}</p>
            <p className="text-xs text-mecanico">● Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {MOCK_MESSAGES.map((msg) => {
            const isMine = msg.from === myRole;
            return (
              <div key={msg.id} className={cn("flex", isMine ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-2.5",
                  isMine
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                )}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <div className={cn("flex items-center gap-1 mt-1", isMine ? "justify-end" : "justify-start")}>
                    <span className={cn("text-[10px]", isMine ? "text-primary-foreground/70" : "text-muted-foreground")}>{msg.time}</span>
                    {isMine && msg.read && <CheckCheck className="h-3 w-3 text-blue-300" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 pt-4 border-t border-border mt-4">
          <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground">
            <Image className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSend} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
