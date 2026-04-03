import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Wrench,
  ArrowRight,
  ArrowDown,
  Shield,
  Star,
  ClipboardList,
  Clock,
  MessageSquare,
  CheckCircle2,
  TrendingUp,
  Instagram,
  Linkedin,
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

const specialties = [
  "Mecânica Geral",
  "Elétrica Automotiva",
  "Injeção Eletrônica",
  "Motor",
  "Suspensão e Freios",
  "Transmissão",
  "Ar Condicionado",
  "Funilaria e Pintura",
  "Diesel",
];

const ParaOficinas = () => {
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
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-primary/3 blur-3xl" />

        <div className="reveal container relative mx-auto max-w-4xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            100% gratuito para oficinas
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Precisa de mecânico?{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Encontre em horas, não dias.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Publique uma demanda, receba propostas de mecânicos verificados e escolha o melhor profissional para o serviço. Sem vínculo CLT, sem dor de cabeça.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["Perfis verificados", "Especialistas sob demanda", "Sem custo para a oficina"].map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <CheckCircle2 className="h-3.5 w-3.5" /> {b}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="h-13 gap-2 px-8 text-base shadow-lg shadow-primary/25" asChild>
              <Link to="/cadastro/oficina">Cadastrar minha oficina <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="h-13 gap-2 px-8 text-base" asChild>
              <a href="#confianca">Como funciona <ArrowDown className="h-4 w-4" /></a>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ SEÇÃO 2 — CONFIANÇA ═══ */}
      <section id="confianca" className="border-t border-border bg-muted/40 py-20">
        <div className="container max-w-5xl">
          <h2 className="reveal text-center font-display text-3xl font-bold sm:text-4xl">
            Você não vai contratar um desconhecido.<br />
            <span className="text-primary">Vai contratar um profissional com histórico.</span>
          </h2>
          <p className="reveal mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
            Cada mecânico no MecânicoApp tem perfil verificado, especialidades declaradas e avaliações
            reais de outras oficinas que já contrataram. Você vê o histórico completo antes de decidir
            — quantos serviços fez, qual nota recebeu, o que as oficinas falaram. Sem surpresa.
          </p>

          <div className="reveal mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Perfil verificado",
                desc: "CPF, selfie com documento e localização confirmados no cadastro.",
              },
              {
                icon: Star,
                title: "Avaliações reais",
                desc: "Nota e comentários de oficinas que já contrataram esse profissional.",
              },
              {
                icon: ClipboardList,
                title: "Histórico público",
                desc: "Serviços concluídos e especialidade mais realizada.",
              },
            ].map((c) => (
              <Card key={c.title} className="border-border bg-card">
                <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-bold">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="reveal mx-auto mt-10 max-w-2xl text-center text-base italic text-muted-foreground">
            "Um mecânico com 4.8 de avaliação e 30 serviços concluídos diz mais sobre ele do que qualquer entrevista."
          </p>
        </div>
      </section>

      {/* ═══ SEÇÃO 3 — ESPECIALIDADE ═══ */}
      <section className="border-t border-border py-20">
        <div className="container max-w-4xl">
          <h2 className="reveal text-center font-display text-3xl font-bold sm:text-4xl">
            O cliente que você perde por não ter{" "}
            <span className="text-primary">o especialista certo.</span>
          </h2>
          <p className="reveal mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
            O carro entrou com problema de injeção eletrônica. Ninguém na sua equipe domina. Você tem
            duas opções: arriscar um serviço que não é especialidade da casa — ou mandar o cliente embora.
            Os dois têm um custo que você sente todo dia. Com o MecânicoApp você filtra por especialidade
            e encontra quem domina aquele serviço específico — sem precisar ter todo especialista na folha.
          </p>
          <div className="reveal mt-10 flex flex-wrap justify-center gap-3">
            {specialties.map((s) => (
              <span key={s} className="rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-foreground">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SEÇÃO 4 — OCIOSIDADE ═══ */}
      <section className="border-t border-border bg-muted/40 py-20">
        <div className="container max-w-3xl text-center">
          <h2 className="reveal font-display text-3xl font-bold sm:text-4xl">
            Você paga pelo mecânico mesmo quando ele{" "}
            <span className="text-primary">não está gerando receita.</span>
          </h2>
          <p className="reveal mt-6 text-base leading-relaxed text-muted-foreground">
            Dias fracos, horas de espera, serviços simples que qualquer um faz. O profissional fixo
            está lá, o custo está rodando, e a receita não acompanha. Com o MecânicoApp você aciona
            um especialista quando tem serviço — e não paga nada quando não tem.
          </p>
          <div className="reveal mt-8 rounded-xl border border-primary/30 bg-primary/5 px-6 py-4">
            <p className="font-display text-base font-semibold text-foreground">
              "Custo fixo em dias de movimento variável nunca foi uma boa equação. Agora você tem uma alternativa."
            </p>
          </div>
        </div>
      </section>

      {/* ═══ SEÇÃO 5 — VELOCIDADE ═══ */}
      <section className="border-t border-border py-20">
        <div className="container max-w-5xl">
          <h2 className="reveal text-center font-display text-3xl font-bold sm:text-4xl">
            Publicou a demanda.{" "}
            <span className="text-primary">Em minutos os mecânicos da sua região já estão vendo.</span>
          </h2>

          <div className="reveal mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ClipboardList, step: "1", title: "Publique em 2 minutos", desc: "Especialidade, data e o que precisa." },
              { icon: MessageSquare, step: "2", title: "Receba propostas", desc: "Mecânicos qualificados da região respondem." },
              { icon: Shield, step: "3", title: "Escolha com segurança", desc: "Veja perfil, avaliações e valor antes de decidir." },
              { icon: Wrench, step: "4", title: "Mecânico na sua oficina", desc: "Combine no chat e pronto." },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <s.icon className="h-7 w-7" />
                </div>
                <span className="mt-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{s.step}</span>
                <h3 className="mt-2 font-display font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal mt-10 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary">
              <Clock className="h-4 w-4" /> Demandas urgentes têm prioridade — primeiras propostas em menos de 1 hora
            </span>
          </div>
        </div>
      </section>

      {/* ═══ SEÇÃO 6 — CRESCIMENTO ═══ */}
      <section className="border-t border-border bg-muted/40 py-20">
        <div className="container max-w-4xl">
          <h2 className="reveal text-center font-display text-3xl font-bold sm:text-4xl">
            Sua oficina pode crescer{" "}
            <span className="text-primary">sem aumentar o custo fixo.</span>
          </h2>
          <p className="reveal mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
            Tem demanda para abrir mais uma baia? Para pegar serviços que hoje você recusa? Com o
            MecânicoApp você escala a operação quando precisar — sem admissão, sem treinamento, sem
            risco trabalhista. Você cresce na medida da sua demanda.
          </p>

          <div className="reveal mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { value: "1/3", label: "das oficinas sem mão de obra" },
              { value: "+52%", label: "demanda desde 2020" },
              { value: "500k+", label: "oficinas no Brasil" },
            ].map((s) => (
              <div key={s.value} className="text-center">
                <p className="font-display text-4xl font-bold text-primary">{s.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <p className="reveal mx-auto mt-8 max-w-2xl text-center text-base font-semibold text-foreground">
            "Sua oficina pode capturar esse crescimento — ou deixar para a concorrência."
          </p>
          <p className="reveal mt-3 text-center text-xs text-muted-foreground/70">
            Fonte: Pesquisa Oficina Brasil / Sindirepa, 2025
          </p>
        </div>
      </section>

      {/* ═══ SEÇÃO 7 — CTA FINAL ═══ */}
      <section className="border-t border-border bg-foreground py-20 text-background">
        <div className="container max-w-3xl text-center">
          <h2 className="reveal font-display text-3xl font-bold sm:text-4xl">
            Sua oficina merece o profissional certo, na hora certa, para cada serviço.
          </h2>
          <p className="reveal mt-4 text-lg opacity-80">
            Cadastro gratuito em 3 minutos. Sem cartão. Sem compromisso.
          </p>
          <div className="reveal mt-8">
            <Button size="lg" className="gap-2 text-base" asChild>
              <Link to="/cadastro/oficina">Cadastrar minha oficina — é grátis <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>

          {/* FAQ */}
          <div className="reveal mx-auto mt-16 max-w-2xl text-left">
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "A oficina paga algo?", a: "Nunca. Gratuito para sempre." },
                { q: "Como sei que o mecânico é bom?", a: "Avaliações reais de outras oficinas que já contrataram." },
                { q: "Gera vínculo CLT?", a: "Não. Contratação autônoma por serviço, sem vínculo empregatício." },
                { q: "Consigo mecânico urgente?", a: "Sim. Primeiras propostas em menos de 1 hora." },
                { q: "Preciso assinar contrato?", a: "Não. Sem compromisso de frequência ou exclusividade." },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-background/20">
                  <AccordionTrigger className="text-background hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-background/80">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
              <p className="mt-1 text-sm text-muted-foreground">A maior rede de mecânicos autônomos do Brasil</p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <Link to="/para-oficinas" className="hover:text-foreground transition-colors">Para oficinas</Link>
              <Link to="/para-mecanicos" className="hover:text-foreground transition-colors">Para mecânicos</Link>
              <Link to="/precos" className="hover:text-foreground transition-colors">Preços</Link>
              <Link to="/sobre" className="hover:text-foreground transition-colors">Sobre</Link>
              <Link to="/termos" className="hover:text-foreground transition-colors">Termos</Link>
              <Link to="/privacidade" className="hover:text-foreground transition-colors">Privacidade</Link>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-muted-foreground">© 2025 MecânicoApp. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default ParaOficinas;
