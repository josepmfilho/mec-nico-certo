import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Wrench, ArrowLeft, ArrowRight, MapPin, Upload, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { maskCNPJ, maskPhone } from "@/lib/masks";
import { cn } from "@/lib/utils";

const SPECIALTIES = [
  "Mecânica Geral", "Elétrica Automotiva", "Suspensão e Freios",
  "Motor", "Transmissão", "Ar Condicionado", "Injeção Eletrônica",
  "Funilaria e Pintura", "Diesel",
];

const CadastroOficina = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Step 1
  const [nomeOficina, setNomeOficina] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // Step 2
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  // Step 3
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [aceitaTermos, setAceitaTermos] = useState(false);

  const toggleSpecialty = (s: string) =>
    setSpecialties((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const canProceed1 = nomeOficina && cnpj && responsavel && whatsapp && email && senha && confirmarSenha && senha === confirmarSenha;
  const canProceed2 = cep && rua && bairro && cidade && estado;
  const canSubmit = specialties.length > 0 && aceitaTermos;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await register(email, senha, nomeOficina, "oficina");
      toast({ title: "Cadastro realizado!", description: "Bem-vindo ao MecânicoApp!" });
      navigate("/oficina/dashboard");
    } catch {
      toast({ title: "Erro no cadastro", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
        <div className="container flex h-16 items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-bold">MecânicoApp</span>
          </Link>
        </div>
      </header>

      <div className="container max-w-2xl py-8 px-4">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <span className={step >= 1 ? "font-semibold text-primary" : ""}>1. Dados da empresa</span>
            <span className={step >= 2 ? "font-semibold text-primary" : ""}>2. Localização</span>
            <span className={step >= 3 ? "font-semibold text-primary" : ""}>3. Especialidades</span>
          </div>
          <Progress value={(step / 3) * 100} className="h-2" />
        </div>

        <Card>
          <CardContent className="p-6 sm:p-8">
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h2 className="font-display text-2xl font-bold">Dados da empresa</h2>
                  <p className="text-sm text-muted-foreground mt-1">Informações básicas da sua oficina</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nome da oficina</Label>
                    <Input placeholder="Ex: Auto Center Silva" value={nomeOficina} onChange={(e) => setNomeOficina(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>CNPJ</Label>
                    <Input placeholder="00.000.000/0000-00" value={cnpj} onChange={(e) => setCnpj(maskCNPJ(e.target.value))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Nome do responsável</Label>
                    <Input placeholder="João da Silva" value={responsavel} onChange={(e) => setResponsavel(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>WhatsApp</Label>
                    <Input placeholder="(11) 99999-9999" value={whatsapp} onChange={(e) => setWhatsapp(maskPhone(e.target.value))} />
                  </div>
                  <div className="space-y-2">
                    <Label>E-mail</Label>
                    <Input type="email" placeholder="oficina@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Senha</Label>
                      <Input type="password" placeholder="Mínimo 6 caracteres" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Confirmar senha</Label>
                      <Input type="password" placeholder="Repita a senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
                    </div>
                  </div>
                  {senha && confirmarSenha && senha !== confirmarSenha && (
                    <p className="text-sm text-destructive">As senhas não coincidem</p>
                  )}
                </div>
                <div className="flex justify-end pt-2">
                  <Button onClick={() => setStep(2)} disabled={!canProceed1} className="gap-2">
                    Próximo <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h2 className="font-display text-2xl font-bold">Localização</h2>
                  <p className="text-sm text-muted-foreground mt-1">Onde fica sua oficina?</p>
                </div>

                {/* Map placeholder */}
                <div className="relative overflow-hidden rounded-xl border border-border bg-muted/50 h-48 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-10 w-10 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">Mapa interativo</p>
                    <p className="text-xs">Integração Google Maps em breve</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> O endereço preciso ajuda os mecânicos a chegarem até você — como um motorista de Uber
                </p>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1 space-y-2">
                      <Label>CEP</Label>
                      <Input placeholder="00000-000" value={cep} onChange={(e) => setCep(e.target.value)} />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label>Rua</Label>
                      <Input placeholder="Rua das Flores" value={rua} onChange={(e) => setRua(e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Número</Label>
                      <Input placeholder="123" value={numero} onChange={(e) => setNumero(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Bairro</Label>
                      <Input placeholder="Centro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Cidade</Label>
                      <Input placeholder="São Paulo" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Estado</Label>
                    <Input placeholder="SP" value={estado} onChange={(e) => setEstado(e.target.value)} />
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Voltar
                  </Button>
                  <Button onClick={() => setStep(3)} disabled={!canProceed2} className="gap-2">
                    Próximo <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h2 className="font-display text-2xl font-bold">Especialidades e foto</h2>
                  <p className="text-sm text-muted-foreground mt-1">Selecione os serviços que sua oficina oferece</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {SPECIALTIES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSpecialty(s)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium transition-all active:scale-95",
                        specialties.includes(s)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-primary/40"
                      )}
                    >
                      {specialties.includes(s) && <CheckCircle2 className="mr-1 inline h-3.5 w-3.5" />}
                      {s}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label>Foto da oficina (opcional)</Label>
                  <div className="flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 cursor-pointer hover:border-primary/40 transition-colors">
                    <div className="text-center text-muted-foreground">
                      <Upload className="h-8 w-8 mx-auto mb-1" />
                      <p className="text-sm">Clique para enviar</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="termos"
                    checked={aceitaTermos}
                    onCheckedChange={(c) => setAceitaTermos(c === true)}
                  />
                  <label htmlFor="termos" className="text-sm text-muted-foreground leading-snug">
                    Li e aceito os{" "}
                    <Link to="/termos" className="text-primary hover:underline" target="_blank">
                      Termos de Uso
                    </Link>{" "}
                    e a{" "}
                    <Link to="/privacidade" className="text-primary hover:underline" target="_blank">
                      Política de Privacidade
                    </Link>
                  </label>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Voltar
                  </Button>
                  <Button onClick={handleSubmit} disabled={!canSubmit || loading} className="gap-2">
                    {loading ? "Cadastrando..." : "Cadastrar minha oficina"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Já tem conta?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">Entrar</Link>
        </p>
      </div>
    </div>
  );
};

export default CadastroOficina;
