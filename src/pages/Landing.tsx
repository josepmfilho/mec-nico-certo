import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Wrench,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Clock,
  Star,
  Lock,
  Target,
} from "lucide-react";
import { useEffect, useRef } from "react";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("animate-fade-in");
            (e.target as HTMLElement).style.opacity = "1";
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    targets.forEach((t) => {
      t.style.opacity = "0";
      io.observe(t);
    });
    return () => io.disconnect();
  }, []);
  return ref;
}

const Landing = () => {
  const root = useScrollReveal();

  return (
    <div ref={root} className="min-h-screen bg-background text-foreground">
      {/* ═══ NAVBAR ═══ */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <nav className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Wrench className="h-7 w-7 text-primary" />
            <span className="font-display text-xl font-bold">MecânicoApp</span>
          </Link>

          <div className="flex items-center">
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* ═══ SEÇÃO 1 — HERO ═══ */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 via-background to-background py-24 lg:py-36">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-primary/3 blur-3xl" />

        <div className="reveal container relative mx-auto max-w-4xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Wrench className="h-3.5 w-3.5" /> Marketplace de mão de obra mecânica do Brasil
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            Oficina sem mecânico?{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Problema resolvido.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Conectamos oficinas com mecânicos autônomos qualificados e verificados — em horas, não dias. Pagamento seguro, profissionais de verdade.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="h-13 gap-2 px-8 text-base shadow-lg shadow-primary/25" asChild>
              <Link to="/para-oficinas">
                Sou dono de oficina <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-13 gap-2 px-8 text-base" asChild>
              <Link to="/para-mecanicos">
                Sou mecânico autônomo <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Cadastro gratuito</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Aprovação em 24h</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Pagamento garantido</span>
          </div>
        </div>
      </section>

      {/* ═══ SEÇÃO 2 — O PROBLEMA QUE RESOLVEMOS ═══ */}
      <section className="border-t border-border bg-muted/40 py-20">
        <div className="container max-w-4xl text-center">
          <h2 className="reveal font-display text-3xl font-bold sm:text-4xl">
            Um mercado de R$269 bilhões com um problema invisível
          </h2>
          <p className="reveal mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            O Brasil tem mais de 500 mil oficinas mecânicas e uma frota de 120 milhões de veículos.
            A demanda por manutenção nunca foi tão alta. Mas 1 em cada 3 oficinas perde receita toda semana
            por falta de mão de obra qualificada. Do outro lado, mecânicos autônomos competentes ficam ociosos
            por falta de canal profissional. O MecânicoApp existe para fechar esse gap.
          </p>

          <div className="reveal mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { value: "1/3", label: "das oficinas sem mão de obra qualificada" },
              { value: "R$269B", label: "mercado automotivo brasileiro em 2025" },
              { value: "120M+", label: "veículos registrados no Brasil" },
            ].map((s) => (
              <div key={s.value}>
                <p className="font-display text-5xl font-bold text-primary">{s.value}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <p className="reveal mt-8 text-xs text-muted-foreground/70">
            Fonte: Pesquisa Oficina Brasil / Sindirepa, 2025
          </p>
        </div>
      </section>

      {/* ═══ SEÇÃO 3 — COMO FUNCIONA ═══ */}
      <section className="border-t border-border py-20">
        <div className="container">
          <h2 className="reveal mb-14 text-center font-display text-3xl font-bold sm:text-4xl">
            Como funciona
          </h2>

          <div className="reveal grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: CheckCircle2,
                title: "Cadastro aprovado",
                desc: "Oficinas e mecânicos passam por aprovação manual antes de acessar a plataforma.",
              },
              {
                icon: Users,
                title: "Conexão inteligente",
                desc: "Oficina publica demanda. Mecânicos qualificados da região recebem notificação e enviam propostas.",
              },
              {
                icon: ShieldCheck,
                title: "Contratação segura",
                desc: "Oficina escolhe, paga pelo app. Valor fica retido até o serviço ser concluído.",
              },
              {
                icon: Lock,
                title: "Pagamento garantido",
                desc: "Serviço aprovado pela oficina. PIX liberado ao mecânico em até 24h. Sem calote para ninguém.",
              },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <step.icon className="h-7 w-7" />
                </div>
                <div className="mt-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <h3 className="mt-3 font-display text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal mt-10 text-center">
            <Link
              to="/como-funciona"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              Entender o fluxo completo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SEÇÃO 4 — PARA QUEM É ═══ */}
      <section className="border-t border-border bg-muted/40 py-20">
        <div className="container">
          <h2 className="reveal mb-12 text-center font-display text-3xl font-bold sm:text-4xl">
            Para quem é o MecânicoApp
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Card Oficinas */}
            <Card className="reveal border-primary/30 bg-primary/5">
              <CardContent className="flex flex-col items-start gap-4 p-8">
                <Wrench className="h-8 w-8 text-primary" />
                <h3 className="font-display text-2xl font-bold">
                  Sua oficina precisa do profissional certo agora
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Acesse mecânicos autônomos verificados e especializados na sua região
                  — sem CLT, sem encargo, sem burocracia.
                </p>
                <Button className="mt-2 gap-2" asChild>
                  <Link to="/para-oficinas">
                    Saiba mais <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Card Mecânicos */}
            <Card className="reveal border-mecanico/30 bg-mecanico/5">
              <CardContent className="flex flex-col items-start gap-4 p-8">
                <Target className="h-8 w-8 text-mecanico" />
                <h3 className="font-display text-2xl font-bold">
                  Sua habilidade merece clientes de qualidade
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Trabalhe com oficinas verificadas, receba com segurança e construa
                  sua reputação profissional.
                </p>
                <Button className="mt-2 gap-2 bg-mecanico text-mecanico-foreground hover:bg-mecanico/90" asChild>
                  <Link to="/para-mecanicos">
                    Saiba mais <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══ SEÇÃO 5 — DIFERENCIAIS ═══ */}
      <section className="border-t border-border py-20">
        <div className="container max-w-4xl">
          <h2 className="reveal mb-12 text-center font-display text-3xl font-bold sm:text-4xl">
            Por que o MecânicoApp é diferente
          </h2>

          <div className="reveal grid gap-6 sm:grid-cols-2">
            {[
              {
                icon: ShieldCheck,
                title: "Acesso curado",
                desc: "Nenhum usuário entra sem aprovação manual. Só profissionais verificados na plataforma.",
              },
              {
                icon: Lock,
                title: "Pagamento com escrow",
                desc: "O dinheiro fica retido até o serviço ser concluído. Proteção para os dois lados.",
              },
              {
                icon: Target,
                title: "Marketplace vertical",
                desc: "100% focado em mecânica automotiva. Especialistas para cada tipo de serviço.",
              },
              {
                icon: Star,
                title: "Reputação digital",
                desc: "Avaliações reais constroem o histórico de cada profissional. Qualidade que se comprova com o tempo.",
              },
            ].map((item, i) => (
              <Card key={i} className="border-border bg-card">
                <CardContent className="flex gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold leading-snug">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SEÇÃO 6 — SOBRE (TEASER) ═══ */}
      <section className="border-t border-border bg-foreground py-20 text-background">
        <div className="container max-w-2xl text-center">
          <p className="reveal text-base italic leading-relaxed opacity-90">
            "O MecânicoApp não nasceu numa planilha. Nasceu da memória de quem trabalhou numa
            oficina aos 12 anos, viu o problema de perto, e 30 anos depois teve as ferramentas
            para resolvê-lo."
          </p>
          <Link
            to="/sobre"
            className="reveal mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Conhecer a história <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ═══ SEÇÃO 7 — CTA FINAL ═══ */}
      <section className="border-t border-border py-20">
        <div className="container max-w-3xl text-center">
          <h2 className="reveal font-display text-3xl font-bold sm:text-4xl">
            Faça parte do ecossistema
          </h2>
          <p className="reveal mt-4 text-lg text-muted-foreground">
            Cadastro gratuito. Aprovação em até 24 horas. Sem cartão de crédito.
          </p>
          <div className="reveal mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="gap-2 text-base" asChild>
              <Link to="/cadastro/oficina">
                Cadastrar minha oficina <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" className="gap-2 text-base bg-mecanico text-mecanico-foreground hover:bg-mecanico/90" asChild>
              <Link to="/cadastro/mecanico">
                Quero ser mecânico <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-border py-10">
        <div className="container">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Wrench className="h-5 w-5 text-primary" />
                <span className="font-display font-bold">MecânicoApp</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Conectando oficinas e mecânicos com segurança e tecnologia
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <Link to="/como-funciona" className="hover:text-foreground transition-colors">Como funciona</Link>
              <Link to="/para-oficinas" className="hover:text-foreground transition-colors">Para oficinas</Link>
              <Link to="/para-mecanicos" className="hover:text-foreground transition-colors">Para mecânicos</Link>
              <Link to="/precos" className="hover:text-foreground transition-colors">Preços</Link>
              <Link to="/sobre" className="hover:text-foreground transition-colors">Sobre</Link>
              <Link to="/termos" className="hover:text-foreground transition-colors">Termos</Link>
              <Link to="/privacidade" className="hover:text-foreground transition-colors">Privacidade</Link>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            © 2025 MecânicoApp. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
