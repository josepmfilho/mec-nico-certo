import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wrench, ArrowLeft, ArrowRight, Upload, CheckCircle2, Camera, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { maskCPF, maskPhone } from "@/lib/masks";
import { cn } from "@/lib/utils";

const SPECIALTIES = [
  "Mecânica Geral", "Elétrica Automotiva", "Suspensão e Freios",
  "Motor", "Transmissão", "Ar Condicionado", "Injeção Eletrônica",
  "Funilaria e Pintura", "Diesel",
];

const CadastroMecanico = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Step 1
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // Step 2
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [raio, setRaio] = useState("");
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [hasPhoto, setHasPhoto] = useState(false);

  // Step 3
  const [tipoChavePix, setTipoChavePix] = useState("");
  const [chavePix, setChavePix] = useState("");
  const [aceitaTermos, setAceitaTermos] = useState(false);

  const toggleSpecialty = (s: string) =>
    setSpecialties((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const canProceed1 = nome && cpf && whatsapp && email && experiencia && senha && confirmarSenha && senha === confirmarSenha;
  const canProceed2 = cep && raio && specialties.length > 0 && hasPhoto;
  const canSubmit = tipoChavePix && chavePix && aceitaTermos;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await register(email, senha, nome, "mecanico");
      toast({ title: "Perfil criado!", description: "Bem-vindo ao MecânicoApp!" });
      navigate("/mecanico/dashboard");
    } catch {
      toast({ title: "Erro no cadastro", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
        <div className="container flex h-16 items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-bold">MecânicoApp</span>
          </Link>
        </div>
      </header>

      <div className="container max-w-2xl py-8 px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <span className={step >= 1 ? "font-semibold text-mecanico" : ""}>1. Dados pessoais</span>
            <span className={step >= 2 ? "font-semibold text-mecanico" : ""}>2. Local e skills</span>
            <span className={step >= 3 ? "font-semibold text-mecanico" : ""}>3. Pagamento</span>
          </div>
          <Progress value={(step / 3) * 100} className="h-2 [&>div]:bg-mecanico" />
        </div>

        <Card>
          <CardContent className="p-6 sm:p-8">
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h2 className="font-display text-2xl font-bold">Dados pessoais</h2>
                  <p className="text-sm text-muted-foreground mt-1">Leva menos de 3 minutos</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nome completo</Label>
                    <Input placeholder="Carlos Eduardo Silva" value={nome} onChange={(e) => setNome(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>CPF</Label>
                    <Input placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(maskCPF(e.target.value))} />
                  </div>
                  <div className="space-y-2">
                    <Label>WhatsApp</Label>
                    <Input placeholder="(11) 99999-9999" value={whatsapp} onChange={(e) => setWhatsapp(maskPhone(e.target.value))} />
                  </div>
                  <div className="space-y-2">
                    <Label>E-mail</Label>
                    <Input type="email" placeholder="mecanico@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Anos de experiência</Label>
                    <Select value={experiencia} onValueChange={setExperiencia}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<1">Menos de 1 ano</SelectItem>
                        <SelectItem value="1-3">1 a 3 anos</SelectItem>
                        <SelectItem value="3-5">3 a 5 anos</SelectItem>
                        <SelectItem value="5-10">5 a 10 anos</SelectItem>
                        <SelectItem value="10+">Mais de 10 anos</SelectItem>
                      </SelectContent>
                    </Select>
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
                  <Button onClick={() => setStep(2)} disabled={!canProceed1} className="gap-2 bg-mecanico hover:bg-mecanico/90">
                    Próximo <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h2 className="font-display text-2xl font-bold">Localização e especialidades</h2>
                  <p className="text-sm text-muted-foreground mt-1">Onde você atua e no que é bom</p>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>CEP</Label>
                      <Input placeholder="00000-000" value={cep} onChange={(e) => setCep(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Cidade</Label>
                      <Input placeholder="Preenchido pelo CEP" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Raio de atendimento</Label>
                    <Select value={raio} onValueChange={setRaio}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 km</SelectItem>
                        <SelectItem value="15">15 km</SelectItem>
                        <SelectItem value="30">30 km</SelectItem>
                        <SelectItem value="any">Qualquer distância</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Especialidades (mínimo 1)</Label>
                    <div className="flex flex-wrap gap-2">
                      {SPECIALTIES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleSpecialty(s)}
                          className={cn(
                            "rounded-full border px-4 py-2 text-sm font-medium transition-all active:scale-95",
                            specialties.includes(s)
                              ? "border-mecanico bg-mecanico text-mecanico-foreground"
                              : "border-border bg-card text-foreground hover:border-mecanico/40"
                          )}
                        >
                          {specialties.includes(s) && <CheckCircle2 className="mr-1 inline h-3.5 w-3.5" />}
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Foto de perfil (obrigatório)</Label>
                    <div
                      onClick={() => setHasPhoto(true)}
                      className={cn(
                        "flex h-32 items-center justify-center rounded-xl border-2 border-dashed cursor-pointer transition-colors",
                        hasPhoto
                          ? "border-mecanico bg-mecanico/5"
                          : "border-border bg-muted/30 hover:border-mecanico/40"
                      )}
                    >
                      <div className="text-center text-muted-foreground">
                        {hasPhoto ? (
                          <>
                            <CheckCircle2 className="h-8 w-8 mx-auto mb-1 text-mecanico" />
                            <p className="text-sm font-medium text-mecanico">Foto selecionada</p>
                          </>
                        ) : (
                          <>
                            <Camera className="h-8 w-8 mx-auto mb-1" />
                            <p className="text-sm">Clique para enviar sua foto</p>
                          </>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-mecanico font-medium flex items-center gap-1">
                      <Info className="h-3 w-3" /> Perfis com foto recebem 3x mais propostas
                    </p>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Voltar
                  </Button>
                  <Button onClick={() => setStep(3)} disabled={!canProceed2} className="gap-2 bg-mecanico hover:bg-mecanico/90">
                    Próximo <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h2 className="font-display text-2xl font-bold">Dados de pagamento</h2>
                  <p className="text-sm text-muted-foreground mt-1">Para receber pelos seus serviços via PIX</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tipo de chave PIX</Label>
                    <Select value={tipoChavePix} onValueChange={setTipoChavePix}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cpf">CPF</SelectItem>
                        <SelectItem value="celular">Celular</SelectItem>
                        <SelectItem value="email">E-mail</SelectItem>
                        <SelectItem value="aleatoria">Chave aleatória</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Chave PIX</Label>
                    <Input placeholder="Sua chave PIX" value={chavePix} onChange={(e) => setChavePix(e.target.value)} />
                  </div>
                </div>

                <div className="rounded-xl border border-mecanico/30 bg-mecanico/5 p-4">
                  <p className="text-sm font-medium text-mecanico flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5 shrink-0" />
                    Plataforma gratuita agora. Quando ativarmos a comissão de 12%, você será avisado com 15 dias de antecedência.
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="termos"
                    checked={aceitaTermos}
                    onCheckedChange={(c) => setAceitaTermos(c === true)}
                  />
                  <label htmlFor="termos" className="text-sm text-muted-foreground leading-snug">
                    Li e aceito os{" "}
                    <Link to="/termos" className="text-primary hover:underline" target="_blank">Termos de Uso</Link>{" "}e a{" "}
                    <Link to="/privacidade" className="text-primary hover:underline" target="_blank">Política de Privacidade</Link>
                  </label>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Voltar
                  </Button>
                  <Button onClick={handleSubmit} disabled={!canSubmit || loading} className="gap-2 bg-mecanico hover:bg-mecanico/90">
                    {loading ? "Criando perfil..." : "Criar meu perfil"}
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

export default CadastroMecanico;
