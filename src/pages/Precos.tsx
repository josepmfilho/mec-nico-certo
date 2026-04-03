import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Wrench, ArrowRight, Check, Shield, Clock, CreditCard, CheckCircle2, Instagram, Linkedin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Precos = () => (
  <div className="min-h-screen bg-background text-foreground">
    {/* Navbar */}
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
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

    {/* Hero */}
    <section className="container max-w-4xl py-20 text-center">
      <h1 className="font-display text-4xl font-bold sm:text-5xl">Simples assim: você só paga quando funcionar</h1>
    </section>

    {/* Oficinas */}
    <section className="container max-w-5xl pb-16">
      <h2 className="font-display text-2xl font-bold mb-6">Para oficinas</h2>
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-8">
          <Badge className="mb-4 bg-primary text-primary-foreground">SEMPRE GRATUITO</Badge>
          <ul className="space-y-3 mt-4">
            {["Cadastro grátis", "Demandas ilimitadas", "Receber propostas", "Chat com mecânicos", "Histórico completo"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary shrink-0" /> {item}
              </li>
            ))}
          </ul>
          <Button className="mt-6 gap-2" asChild>
            <Link to="/cadastro/oficina">Cadastrar minha oficina <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </CardContent>
      </Card>
    </section>

    {/* Mecânicos */}
    <section className="container max-w-5xl pb-16">
      <h2 className="font-display text-2xl font-bold mb-6">Para mecânicos</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-mecanico/30 bg-mecanico/5">
          <CardContent className="p-6">
            <Badge className="mb-3 bg-mecanico text-mecanico-foreground">AGORA</Badge>
            <h3 className="font-display text-xl font-bold">Gratuito total</h3>
            <p className="mt-2 text-sm text-muted-foreground">Cadastre-se, encontre demandas e receba 100% do valor.</p>
          </CardContent>
        </Card>
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-6">
            <Badge className="mb-3 bg-primary text-primary-foreground">EM BREVE</Badge>
            <h3 className="font-display text-xl font-bold">12% por serviço</h3>
            <p className="mt-2 text-sm text-muted-foreground">Comissão só quando você recebe.</p>
            <div className="mt-4 rounded-lg bg-card border border-border p-3">
              <p className="text-sm font-medium">Serviço R$500 → você recebe <span className="text-mecanico font-bold">R$440</span></p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-6">
            <Badge variant="secondary" className="mb-3">V2</Badge>
            <h3 className="font-display text-xl font-bold">Premium R$59/mês</h3>
            <p className="mt-2 text-sm text-muted-foreground">Opcional. Destaque no ranking, selo verificado e mais.</p>
          </CardContent>
        </Card>
      </div>
    </section>

    {/* Escrow steps */}
    <section className="border-t border-border bg-muted/40 py-16">
      <div className="container max-w-4xl">
        <h2 className="font-display text-2xl font-bold mb-8 text-center">Como funciona o pagamento seguro</h2>
        <div className="grid gap-6 sm:grid-cols-4">
          {[
            { icon: CreditCard, title: "Oficina paga", desc: "Valor retido na plataforma" },
            { icon: Shield, title: "Escrow seguro", desc: "Dinheiro protegido" },
            { icon: CheckCircle2, title: "Serviço concluído", desc: "Oficina confirma conclusão" },
            { icon: Clock, title: "PIX liberado", desc: "Mecânico recebe em 24h" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-sm font-bold">{s.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="container max-w-3xl py-16">
      <h2 className="font-display text-2xl font-bold mb-8 text-center">Perguntas frequentes</h2>
      <Accordion type="single" collapsible className="w-full">
        {[
          { q: "A plataforma é realmente gratuita?", a: "Sim, agora é 100% gratuita. Quando ativarmos a comissão de 12%, todos serão avisados com 15 dias de antecedência." },
          { q: "Como funciona o pagamento?", a: "A oficina paga pelo app (PIX ou cartão). O valor fica em escrow até o serviço ser concluído. Depois, é liberado ao mecânico em até 24h." },
          { q: "Posso cancelar um serviço?", a: "Sim, até 2 horas antes do horário agendado. Após isso, pode haver taxa de cancelamento." },
          { q: "Como sou avaliado?", a: "Após cada serviço, oficina e mecânico avaliam um ao outro com nota de 1 a 5 estrelas e comentário." },
          { q: "Preciso ter CNPJ para ser mecânico?", a: "Não. Mecânicos autônomos podem se cadastrar com CPF." },
          { q: "Como resolvo uma disputa?", a: "O MecânicoApp tem equipe de mediação. Disputas são analisadas em até 48h com base em evidências de ambos os lados." },
        ].map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left text-sm font-medium">{item.q}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>

    {/* CTA */}
    <section className="border-t border-border bg-foreground py-16 text-background">
      <div className="container max-w-3xl text-center">
        <h2 className="font-display text-3xl font-bold">Comece agora. É gratuito.</h2>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="gap-2" asChild>
            <Link to="/cadastro/oficina">Sou oficina <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <Button size="lg" variant="outline" className="gap-2 border-background/30 text-background hover:bg-background/10" asChild>
            <Link to="/cadastro/mecanico">Sou mecânico autônomo</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="border-t border-border py-10">
      <div className="container flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center gap-2 md:justify-start">
            <Wrench className="h-5 w-5 text-primary" />
            <span className="font-display font-bold">MecânicoApp</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">A maior rede de mecânicos autônomos do Brasil</p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link to="/#como-funciona" className="hover:text-foreground transition-colors">Como funciona</Link>
          <Link to="/precos" className="hover:text-foreground transition-colors">Preços</Link>
          <Link to="/sobre" className="hover:text-foreground transition-colors">Sobre</Link>
          <Link to="/termos" className="hover:text-foreground transition-colors">Termos</Link>
          <Link to="/privacidade" className="hover:text-foreground transition-colors">Privacidade</Link>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><Instagram className="h-5 w-5" /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin className="h-5 w-5" /></a>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-muted-foreground">© 2025 MecânicoApp. Todos os direitos reservados.</p>
    </footer>
  </div>
);

export default Precos;
