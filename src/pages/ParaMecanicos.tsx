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
  ShieldAlert,
  Eye,
  DollarSign,
  CalendarX,
  MessageSquareWarning,
  Building2,
  MapPin,
  CreditCard,
  Star,
  CheckCircle2,
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

const ParaMecanicos = () => {
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
            <Link to="/para-oficinas" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Para oficinas</Link>
            <Link to="/para-mecanicos" className="text-sm font-medium text-foreground transition-colors">Para mecânicos</Link>
            <Link to="/precos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Preços</Link>
            <Link to="/sobre" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sobre</Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild><Link to="/login">Entrar</Link></Button>
            <Button size="sm" className="bg-mecanico hover:bg-mecanico/90 text-mecanico-foreground" asChild>
              <Link to="/cadastro/mecanico">Cadastrar</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* ═══ SEÇÃO 1 — HERO ═══ */}
      <section className="container py-20 lg:py-32">
        <div className="reveal mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Sua habilidade vale mais do que R$2.153 por mês.{" "}
            <span className="text-mecanico">Muito mais.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            O MecânicoApp conecta você com oficinas que precisam do seu trabalho — com pagamento
            garantido antes de você começar. Sem calote. Sem enrolação. Só serviço e dinheiro no PIX.
          </p>
          <div className="mt-8 flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-mecanico/30 bg-mecanico/10 px-4 py-1.5 text-sm font-medium text-mecanico">
              <Building2 className="h-3.5 w-3.5" /> Você atende oficinas com CNPJ — não desconhecidos
            </span>
          </div>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="gap-2 text-base bg-mecanico hover:bg-mecanico/90 text-mecanico-foreground" asChild>
              <Link to="/cadastro/mecanico">Quero trabalhar com oficinas <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-base" asChild>
              <a href="#dores">Entender como funciona <ArrowDown className="h-4 w-4" /></a>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ SEÇÃO 2 — DORES ═══ */}
      <section id="dores" className="border-t border-border bg-muted/40 py-20">
        <div className="container max-w-5xl">
          <h2 className="reveal text-center font-display text-3xl font-bold sm:text-4xl">
            Situações que todo mecânico autônomo{" "}
            <span className="text-mecanico">conhece de perto</span>
          </h2>

          <div className="reveal mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: ShieldAlert,
                title: "\"Fiz o serviço e não recebi\"",
                desc: "Trabalhar para pessoa física sem garantia é roleta russa. No MecânicoApp o dinheiro está retido antes de você começar.",
              },
              {
                icon: Eye,
                title: "\"Tenho 15 anos de experiência mas ninguém me acha\"",
                desc: "Sua reputação fica presa no boca a boca. Aqui você constrói histórico digital.",
              },
              {
                icon: DollarSign,
                title: "\"Trabalho 44h por semana e ganho R$2.000\"",
                desc: "Mecânico CLT ganha em média R$2.153/mês. Autônomo cobrando R$60/hora supera isso em menos de 2 semanas.",
              },
              {
                icon: CalendarX,
                title: "\"Tem semana que não entra nada\"",
                desc: "Sem canal estruturado de clientes, a renda é imprevisível. Aqui as oficinas vêm até você.",
              },
              {
                icon: MessageSquareWarning,
                title: "\"O cliente questiona tudo e quer desconto\"",
                desc: "Oficinas são empresas. Respeitam prazo e combinado — porque precisam de você de novo.",
              },
            ].map((c) => (
              <Card key={c.title} className="border-border bg-card">
                <CardContent className="flex flex-col gap-3 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mecanico/10 text-mecanico">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-sm font-bold leading-snug">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SEÇÃO 3 — DIFERENCIAL B2B ═══ */}
      <section className="border-t border-border py-20">
        <div className="container max-w-4xl">
          <h2 className="reveal text-center font-display text-3xl font-bold sm:text-4xl">
            Aqui você não trabalha para desconhecidos.{" "}
            <span className="text-mecanico">Você trabalha para empresas.</span>
          </h2>
          <p className="reveal mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
            Todo mecânico autônomo já tomou calote de alguém que pediu um freela. Isso acontece porque
            pessoa física some, nega o serviço, inventa problema. No MecânicoApp é diferente: você atende
            oficinas mecânicas com CNPJ, endereço físico verificado e reputação a zelar na plataforma.
            Elas precisam de você amanhã, depois de amanhã, semana que vem. Não somem. Não dão calote.
          </p>

          {/* Tabela comparativa */}
          <div className="reveal mt-12 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="border-b border-border px-4 py-3 text-left font-display font-bold">Critério</th>
                  <th className="border-b border-border bg-warning/10 px-4 py-3 text-center font-display font-bold">CLT na oficina</th>
                  <th className="border-b border-border bg-mecanico/10 px-4 py-3 text-center font-display font-bold">Autônomo no App</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Salário mensal", "R$2.153 fixo", "Você define"],
                  ["Horário", "44h fixas", "Você escolhe"],
                  ["Clientes", "Os da oficina", "Oficinas da região"],
                  ["Risco de calote", "Zero (salário)", "Zero (escrow)"],
                  ["Reconhecimento", "Nenhum público", "Reputação digital"],
                  ["Crescimento", "Reajuste anual", "Ilimitado"],
                ].map(([criteria, clt, app]) => (
                  <tr key={criteria} className="border-b border-border/50">
                    <td className="px-4 py-3 font-medium">{criteria}</td>
                    <td className="bg-warning/5 px-4 py-3 text-center text-muted-foreground">{clt}</td>
                    <td className="bg-mecanico/5 px-4 py-3 text-center font-semibold text-mecanico">{app}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ SEÇÃO 4 — NÚMEROS ═══ */}
      <section className="border-t border-border bg-muted/40 py-20">
        <div className="container max-w-4xl">
          <div className="reveal grid gap-8 sm:grid-cols-3">
            {[
              { value: "R$2.153", label: "salário médio CLT (CAGED 2026)" },
              { value: "R$50–100", label: "valor hora autônomo especializado" },
              { value: "500k+", label: "oficinas ativas no Brasil" },
            ].map((s) => (
              <div key={s.value} className="text-center">
                <p className="font-display text-4xl font-bold text-mecanico">{s.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="reveal mx-auto mt-12 max-w-xl rounded-xl border border-mecanico/30 bg-mecanico/5 p-6 text-center">
            <p className="text-base leading-relaxed text-foreground">
              Cobrando <span className="font-bold">R$60/hora</span>, 8h/dia, 5 dias/semana →{" "}
              <span className="font-bold text-mecanico">R$9.600/mês bruto</span>.
            </p>
            <p className="mt-2 text-base leading-relaxed text-foreground">
              Descontando 12% da plataforma →{" "}
              <span className="font-bold text-mecanico">R$8.448 líquido</span>.
            </p>
            <p className="mt-2 text-lg font-bold text-mecanico">4x o salário CLT médio da categoria.</p>
          </div>

          <p className="reveal mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
            1 em cada 3 oficinas no Brasil sofre com falta de mão de obra qualificada.{" "}
            <span className="font-semibold text-foreground">Elas estão procurando você.</span>
          </p>
          <p className="reveal mt-3 text-center text-xs text-muted-foreground/70">
            Fonte: Pesquisa Oficina Brasil / Sindirepa, 2025
          </p>
        </div>
      </section>

      {/* ═══ SEÇÃO 5 — COMO FUNCIONA ═══ */}
      <section className="border-t border-border py-20">
        <div className="container max-w-5xl">
          <h2 className="reveal text-center font-display text-3xl font-bold sm:text-4xl">
            Como funciona
          </h2>

          <div className="reveal mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Wrench, step: "1", title: "Crie seu perfil em 3 minutos", desc: "Foto, especialidades e chave PIX." },
              { icon: MapPin, step: "2", title: "Veja demandas no mapa", desc: "Oficinas próximas que precisam de você agora." },
              { icon: CreditCard, step: "3", title: "A oficina paga antes de você começar", desc: "Dinheiro retido e liberado no PIX ao concluir. Sem calote." },
              { icon: Star, step: "4", title: "Construa sua reputação", desc: "Cada serviço vira avaliação. Mais avaliações, mais você cobra." },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mecanico/10 text-mecanico">
                  <s.icon className="h-7 w-7" />
                </div>
                <span className="mt-3 flex h-7 w-7 items-center justify-center rounded-full bg-mecanico text-xs font-bold text-mecanico-foreground">{s.step}</span>
                <h3 className="mt-2 font-display font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SEÇÃO 6 — CTA FINAL ═══ */}
      <section className="border-t border-border bg-[hsl(var(--mecanico))] py-20 text-mecanico-foreground">
        <div className="container max-w-3xl text-center">
          <h2 className="reveal font-display text-3xl font-bold sm:text-4xl">
            Você tem o talento. A gente traz a oficina, garante o pagamento e cuida da sua reputação.
          </h2>
          <p className="reveal mt-4 text-lg opacity-80">
            Cadastro gratuito. Você só paga 12% quando receber. Comece agora.
          </p>
          <div className="reveal mt-8">
            <Button size="lg" className="gap-2 text-base bg-background text-mecanico hover:bg-background/90" asChild>
              <Link to="/cadastro/mecanico">Criar meu perfil — é grátis <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>

          {/* FAQ */}
          <div className="reveal mx-auto mt-16 max-w-2xl text-left">
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "Preciso ter CNPJ ou MEI?", a: "Não obrigatório. Pode cadastrar como pessoa física." },
                { q: "Como funciona o pagamento?", a: "A oficina paga via PIX ou cartão. Valor fica retido e liberado em até 24h úteis após concluir." },
                { q: "Qual é a taxa?", a: "12% por serviço concluído. Só paga quando receber." },
                { q: "Posso recusar serviços?", a: "Sim. Você vê tudo antes de aceitar." },
                { q: "E se a oficina não confirmar?", a: "Você abre disputa. Nossa equipe analisa e libera se o serviço foi realizado." },
                { q: "Posso trabalhar em mais de uma cidade?", a: "Sim. Configure seu raio de atendimento." },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-mecanico-foreground/20">
                  <AccordionTrigger className="text-mecanico-foreground hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-mecanico-foreground/80">{faq.a}</AccordionContent>
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

export default ParaMecanicos;
