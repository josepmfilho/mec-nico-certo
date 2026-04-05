import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import type { User } from "@/contexts/AuthContext";
import {
  CheckCircle, XCircle, Calendar, User as UserIcon,
  Phone, Mail, MapPin, Wrench, CreditCard, Clock,
  FileText, ChevronDown, ChevronUp, Shield
} from "lucide-react";

const AVAILABLE_DOCS = [
  "RG ou CNH (frente e verso)",
  "Comprovante de endereço",
  "Certificados de cursos técnicos",
  "Carteira de trabalho (página de qualificação)",
  "Fotos de trabalhos realizados",
  "Referências profissionais",
];

const experienciaLabels: Record<string, string> = {
  "<1": "Menos de 1 ano",
  "1-3": "1 a 3 anos",
  "3-5": "3 a 5 anos",
  "5-10": "5 a 10 anos",
  "10+": "Mais de 10 anos",
};

const AdminAprovacao = () => {
  const { getPendingMecanicos, approveUser, requestDocuments } = useAuth();
  const [pending, setPending] = useState<User[]>([]);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [docsId, setDocsId] = useState<string | null>(null);
  const [motivo, setMotivo] = useState("");
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setPending(getPendingMecanicos());
  }, [getPendingMecanicos]);

  const approve = (id: string) => {
    approveUser(id);
    setPending((p) => p.filter((x) => x.id !== id));
    toast({ title: "Mecânico aprovado!", description: "O profissional agora pode acessar o dashboard." });
  };

  const reject = () => {
    if (!motivo.trim() || !rejectId) return;
    const updated = pending.filter((x) => x.id !== rejectId);
    const savedUsers: User[] = JSON.parse(localStorage.getItem("mecanico_users") || "[]");
    const nextUsers = savedUsers.filter((u) => u.id !== rejectId);
    localStorage.setItem("pending_mecanicos", JSON.stringify(updated));
    localStorage.setItem("mecanico_users", JSON.stringify(nextUsers));
    setPending(updated);
    setRejectId(null);
    setMotivo("");
    toast({ title: "Mecânico reprovado", description: "O motivo foi registrado.", variant: "destructive" });
  };

  const handleRequestDocs = () => {
    if (!docsId || selectedDocs.length === 0) return;
    requestDocuments(docsId, selectedDocs);
    setPending((p) =>
      p.map((u) =>
        u.id === docsId
          ? { ...u, profile: { ...u.profile, statusDocumentos: "solicitado" as const, documentosSolicitados: selectedDocs } }
          : u,
      ),
    );
    setDocsId(null);
    setSelectedDocs([]);
    toast({ title: "Documentos solicitados", description: "O mecânico será notificado sobre os documentos pendentes." });
  };

  const toggleDoc = (doc: string) => {
    setSelectedDocs((prev) => (prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]));
  };

  const formatDate = (iso?: string) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold">Aprovação de Mecânicos</h2>
          <p className="text-muted-foreground">{pending.length} aguardando verificação</p>
        </div>

        {pending.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            <CheckCircle className="mx-auto mb-3 h-12 w-12 text-green-600" />
            <p className="font-medium">Nenhum mecânico pendente de aprovação</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pending.map((m) => {
              const p = m.profile;
              const isExpanded = expandedId === m.id;

              return (
                <Card key={m.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    {/* Header do card */}
                    <button
                      type="button"
                      className="flex w-full items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                      onClick={() => setExpandedId(isExpanded ? null : m.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 font-display text-lg font-bold text-primary">
                          {m.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold">{m.name}</p>
                          <p className="text-sm text-muted-foreground">{m.email}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">Mecânico</Badge>
                            {p?.statusDocumentos === "solicitado" && (
                              <Badge className="border-0 bg-amber-100 text-xs text-amber-700">Docs solicitados</Badge>
                            )}
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {formatDate(p?.dataCadastro)}
                            </span>
                          </div>
                        </div>
                      </div>
                      {isExpanded ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                    </button>

                    {/* Conteúdo expandido */}
                    {isExpanded && (
                      <div className="animate-fade-in border-t border-border px-5 pb-5 pt-4">
                        <div className="grid gap-6 md:grid-cols-2">
                          {/* Dados Pessoais */}
                          <div className="space-y-3">
                            <h4 className="flex items-center gap-2 text-sm font-semibold text-primary">
                              <UserIcon className="h-4 w-4" /> Dados Pessoais
                            </h4>
                            <div className="space-y-2 rounded-lg bg-muted/30 p-3 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Nome</span>
                                <span className="font-medium">{m.name}</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">CPF</span>
                                <span className="font-medium">{p?.cpf || "—"}</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">WhatsApp</span>
                                <span className="font-medium">{p?.whatsapp || "—"}</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">E-mail</span>
                                <span className="font-medium">{m.email}</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Experiência</span>
                                <span className="font-medium">{p?.experiencia ? experienciaLabels[p.experiencia] || p.experiencia : "—"}</span>
                              </div>
                            </div>
                          </div>

                          {/* Localização */}
                          <div className="space-y-3">
                            <h4 className="flex items-center gap-2 text-sm font-semibold text-primary">
                              <MapPin className="h-4 w-4" /> Localização e Atuação
                            </h4>
                            <div className="space-y-2 rounded-lg bg-muted/30 p-3 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">CEP</span>
                                <span className="font-medium">{p?.cep || "—"}</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Cidade</span>
                                <span className="font-medium">{p?.cidade || "—"}</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Raio de atendimento</span>
                                <span className="font-medium">{p?.raio ? `${p.raio} km` : "—"}</span>
                              </div>
                            </div>
                          </div>

                          {/* Especialidades */}
                          <div className="space-y-3">
                            <h4 className="flex items-center gap-2 text-sm font-semibold text-primary">
                              <Wrench className="h-4 w-4" /> Especialidades
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {p?.especialidades && p.especialidades.length > 0 ? (
                                p.especialidades.map((s) => (
                                  <Badge key={s} variant="secondary" className="text-xs">
                                    {s}
                                  </Badge>
                                ))
                              ) : (
                                <span className="text-sm text-muted-foreground">Nenhuma informada</span>
                              )}
                            </div>
                          </div>

                          {/* Pagamento */}
                          <div className="space-y-3">
                            <h4 className="flex items-center gap-2 text-sm font-semibold text-primary">
                              <CreditCard className="h-4 w-4" /> Dados de Pagamento
                            </h4>
                            <div className="space-y-2 rounded-lg bg-muted/30 p-3 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Tipo chave PIX</span>
                                <span className="font-medium capitalize">{p?.tipoChavePix || "—"}</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Chave PIX</span>
                                <span className="font-medium">{p?.chavePix || "—"}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Documentos solicitados */}
                        {p?.statusDocumentos === "solicitado" && p.documentosSolicitados && (
                          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
                            <h4 className="flex items-center gap-2 text-sm font-semibold text-amber-700">
                              <FileText className="h-4 w-4" /> Documentos solicitados
                            </h4>
                            <ul className="mt-2 space-y-1">
                              {p.documentosSolicitados.map((doc) => (
                                <li key={doc} className="flex items-center gap-2 text-sm text-amber-800">
                                  <Clock className="h-3 w-3" /> {doc}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Ações */}
                        <div className="mt-5 flex flex-wrap gap-2">
                          <Button size="sm" className="gap-1.5 bg-green-600 text-white hover:bg-green-700" onClick={() => approve(m.id)}>
                            <CheckCircle className="h-4 w-4" /> Aprovar
                          </Button>
                          <Button size="sm" variant="outline" className="gap-1.5" onClick={() => { setDocsId(m.id); setSelectedDocs(p?.documentosSolicitados || []); }}>
                            <FileText className="h-4 w-4" /> Solicitar documentos
                          </Button>
                          <Button size="sm" variant="destructive" className="gap-1.5" onClick={() => setRejectId(m.id)}>
                            <XCircle className="h-4 w-4" /> Reprovar
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Reprovar */}
      <Dialog open={rejectId !== null} onOpenChange={() => { setRejectId(null); setMotivo(""); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Motivo da reprovação</DialogTitle>
          </DialogHeader>
          <Textarea placeholder="Explique o motivo da reprovação..." value={motivo} onChange={(e) => setMotivo(e.target.value)} />
          <DialogFooter>
            <Button variant="outline" onClick={() => { setRejectId(null); setMotivo(""); }}>Cancelar</Button>
            <Button variant="destructive" onClick={reject} disabled={!motivo.trim()}>Confirmar reprovação</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Solicitar Documentos */}
      <Dialog open={docsId !== null} onOpenChange={() => { setDocsId(null); setSelectedDocs([]); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" /> Solicitar documentos
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Selecione os documentos que o mecânico precisa enviar:</p>
          <div className="space-y-3 py-2">
            {AVAILABLE_DOCS.map((doc) => (
              <div key={doc} className="flex items-center gap-3">
                <Checkbox id={doc} checked={selectedDocs.includes(doc)} onCheckedChange={() => toggleDoc(doc)} />
                <Label htmlFor={doc} className="text-sm cursor-pointer">{doc}</Label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setDocsId(null); setSelectedDocs([]); }}>Cancelar</Button>
            <Button onClick={handleRequestDocs} disabled={selectedDocs.length === 0}>
              Solicitar ({selectedDocs.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminAprovacao;