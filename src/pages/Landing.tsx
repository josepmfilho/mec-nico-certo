import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Wrench,
  ArrowRight,
  Car,
  Zap,
  Users,
  Clock,
  DollarSign,
  MapPin,
  Shield,
  CheckCircle2,
  TrendingUp,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useEffect, useRef } from "react";

/* ── scroll-triggered fade-in ────────────────────────────── */
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

          <div className="hidden items-center gap-6 md:flex">
            <a href="#como-funciona" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Como funciona
            </a>
            <a href="#precos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Preços
            </a>
            <a href="#sobre" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Sobre
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/register">Cadastrar</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* ═══ SEÇÃO 1 — HERO ═══ */}
      <section className="container py-20 lg:py-32">
        <div className="reveal mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Sua oficina parou porque faltou mecânico?{" "}
            <span className="text-primary">Isso tem solução.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            O MecânicoApp conecta sua oficina com mecânicos autônomos qualificados na sua região
            — em horas, não dias. Sem CLT, sem encargo, sem burocracia.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="gap-2 text-base" asChild>
              <Link to="/cadastro/oficina">
                Cadastrar minha oficina <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-base" asChild>
              <Link to="/cadastro/mecanico">Sou mecânico autônomo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ SEÇÃO 2 — A DOR ═══ */}
      <section className="border-t border-border bg-muted/40 py-20">
        <div className="container">
          <h2 className="reveal mb-12 text-center font-display text-3xl font-bold sm:text-4xl">
            Você já viveu alguma dessas situações?
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                icon: Users,
                title: "Tenho 4 carros na fila e 2 mecânicos de férias",
                desc: "O pico de demanda chega na hora errada. E você fica sem opção.",
              },
              {
                icon: Zap,
                title: "Preciso de alguém em elétrica automotiva agora",
                desc: "Especialidade rara, cliente esperando, e nenhum contato disponível.",
              },
              {
                icon: TrendingUp,
                title: "Quero crescer mas não tenho quem contratar",
                desc: "Demanda existe. Espaço existe. Mão de obra qualificada, não.",
              },
              {
                icon: DollarSign,
                title: "Contratar fixo não cabe no meu custo",
                desc: "CLT mais encargos chegam a 70% do salário. Inviável para o tamanho da maioria das oficinas.",
              },
            ].map((item, i) => (
              <Card key={i} className="reveal border-border bg-card">
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

      {/* ═══ SEÇÃO 3 — NÚMEROS ═══ */}
      <section className="border-t border-border py-20">
        <div className="container max-w-4xl text-center">
          <h2 className="reveal font-display text-3xl font-bold sm:text-4xl">Você não está sozinho</h2>
          <p className="reveal mt-3 text-lg text-muted-foreground">
            1 em cada 3 oficinas no Brasil enfrenta o mesmo problema agora.
          </p>

          <div className="reveal mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { value: "1/3", label: "das oficinas brasileiras sem mão de obra qualificada" },
              { value: "R$269B", label: "mercado automotivo brasileiro em 2025" },
              { value: "+52%", label: "aumento no volume de veículos atendidos desde 2020" },
            ].map((s) => (
              <div key={s.value}>
                <p className="font-display text-5xl font-bold text-primary">{s.value}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <p className="reveal mt-12 text-base leading-relaxed text-muted-foreground">
            A demanda por manutenção cresce sem parar. O número de mecânicos qualificados não
            acompanhou. O MecânicoApp existe para fechar esse gap.
          </p>
          <p className="reveal mt-4 text-xs text-muted-foreground/70">
            Fonte: Pesquisa Oficina Brasil / Sindirepa, 2025
          </p>
        </div>
      </section>

      {/* ═══ SEÇÃO 4 — COMO FUNCIONA ═══ */}
      <section id="como-funciona" className="border-t border-border bg-muted/40 py-20">
        <div className="container">
          <h2 className="reveal mb-14 text-center font-display text-3xl font-bold sm:text-4xl">
            Como funciona
          </h2>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Oficinas */}
            <div className="reveal">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Car className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-bold">Para oficinas</h3>
              </div>
              <ol className="space-y-6 border-l-2 border-primary/20 pl-6">
                {[
                  {
                    icon: Clock,
                    title: "Poste sua demanda em 2 minutos",
                    desc: "Especialidade, data, valor máximo. Sem burocracia.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Receba propostas de mecânicos qualificados",
                    desc: "Com avaliação, histórico e localização. Você escolhe.",
                  },
                  {
                    icon: Shield,
                    title: "Pague com segurança pelo app",
                    desc: "PIX ou cartão. O dinheiro só é liberado quando o serviço for concluído.",
                  },
                ].map((step, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[1.85rem] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <h4 className="font-display font-bold">{step.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Mecânicos */}
            <div className="reveal">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mecanico/10 text-mecanico">
                  <Wrench className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-bold">Para mecânicos</h3>
              </div>
              <ol className="space-y-6 border-l-2 border-mecanico/20 pl-6">
                {[
                  {
                    icon: Users,
                    title: "Cadastre seu perfil e especialidades",
                    desc: "Sua reputação digital começa aqui.",
                  },
                  {
                    icon: MapPin,
                    title: "Veja demandas perto de você no mapa",
                    desc: "Filtre por especialidade, distância e valor.",
                  },
                  {
                    icon: DollarSign,
                    title: "Execute e receba no PIX",
                    desc: "Pagamento garantido. Sem risco de calote.",
                  },
                ].map((step, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[1.85rem] flex h-6 w-6 items-center justify-center rounded-full bg-mecanico text-xs font-bold text-mecanico-foreground">
                      {i + 1}
                    </span>
                    <h4 className="font-display font-bold">{step.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SEÇÃO 5 — TENDÊNCIA ═══ */}
      <section className="border-t border-border bg-foreground py-20 text-background">
        <div className="container max-w-3xl text-center">
          <h2 className="reveal font-display text-3xl font-bold sm:text-4xl">
            Quem entrar primeiro sai na frente
          </h2>
          <p className="reveal mt-8 text-base leading-relaxed opacity-90">
            O mercado de trabalho por demanda chegou na medicina, no direito, na engenharia. A
            mecânica automotiva é o próximo setor — e no Brasil, com 120 milhões de veículos, o
            tamanho da oportunidade é gigante.
          </p>
          <p className="reveal mt-6 text-base leading-relaxed opacity-80">
            As oficinas que adotarem esse modelo agora vão ter acesso a uma rede de profissionais
            qualificados antes da concorrência. As que esperarem vão continuar perdendo dias
            produtivos por falta de gente.
          </p>
          <div className="reveal mt-10 inline-flex items-center gap-2 rounded-full border border-primary bg-primary/15 px-5 py-2 text-sm font-semibold text-primary">
            <Zap className="h-4 w-4" /> Gratuito para os primeiros usuários
          </div>
        </div>
      </section>

      {/* ═══ SEÇÃO 6 — CTA FINAL ═══ */}
      <section className="border-t border-border py-20">
        <div className="container grid gap-8 md:grid-cols-2">
          {/* Card Oficinas */}
          <Card className="reveal border-primary/30 bg-primary/5">
            <CardContent className="flex flex-col items-start gap-4 p-8">
              <Car className="h-8 w-8 text-primary" />
              <h3 className="font-display text-2xl font-bold">Nunca mais pare por falta de mecânico</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Cadastre sua oficina gratuitamente e acesse mecânicos qualificados na sua região hoje.
              </p>
              <Button className="mt-2 gap-2" asChild>
                <Link to="/cadastro/oficina">
                  Cadastrar minha oficina <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Card Mecânicos */}
          <Card className="reveal border-border bg-card">
            <CardContent className="flex flex-col items-start gap-4 p-8">
              <Wrench className="h-8 w-8 text-mecanico" />
              <h3 className="font-display text-2xl font-bold">Transforme sua habilidade em renda garantida</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Crie seu perfil, apareça para oficinas que precisam de você e receba sem risco de calote.
              </p>
              <Button variant="outline" className="mt-2 gap-2" asChild>
                <Link to="/cadastro/mecanico">
                  Quero trabalhar como freela <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ═══ SEÇÃO 7 — SOBRE (teaser) ═══ */}
      <section id="sobre" className="border-t border-border bg-muted/40 py-16">
        <div className="container max-w-2xl text-center">
          <p className="reveal text-base italic leading-relaxed text-muted-foreground">
            "O MecânicoApp não nasceu numa planilha. Nasceu da memória de quem trabalhou numa
            oficina aos 12 anos, viu o problema de perto, e 30 anos depois teve as ferramentas
            para resolvê-lo."
          </p>
          <Link
            to="/sobre"
            className="reveal mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Conhecer a história completa <ArrowRight className="h-4 w-4" />
          </Link>
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
                A maior rede de mecânicos autônomos do Brasil
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <a href="#como-funciona" className="hover:text-foreground transition-colors">Como funciona</a>
              <a href="#precos" className="hover:text-foreground transition-colors">Preços</a>
              <a href="#sobre" className="hover:text-foreground transition-colors">Sobre</a>
              <Link to="/termos" className="hover:text-foreground transition-colors">Termos</Link>
              <Link to="/privacidade" className="hover:text-foreground transition-colors">Privacidade</Link>
            </div>

            <div className="flex items-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
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
