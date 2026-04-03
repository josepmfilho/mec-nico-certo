import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wrench, ArrowRight, Instagram, Linkedin } from "lucide-react";

const Sobre = () => (
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

    {/* A história */}
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 via-background to-background py-24 lg:py-32">
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="container relative max-w-3xl">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          Nossa história
        </span>
        <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          Nascido na oficina.{" "}
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Construído com tecnologia.</span>
        </h1>
        <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Meu primeiro emprego foi aos 12 anos numa oficina mecânica, há mais de 30 anos. Já via o problema: quando faltavam mecânicos, a oficina parava. O dono ficava nas mãos dos profissionais. Os profissionais reclamavam do salário. Um ciclo que ninguém resolvia.
          </p>
          <p>
            Hoje trabalho com tecnologia. Meus amigos donos de oficina reclamam exatamente da mesma coisa que eu vi décadas atrás. Decidi que era hora de usar o que sei para resolver o que vi.
          </p>
        </div>
        <p className="mt-8 text-base font-semibold text-foreground">— Founder, MecânicoApp</p>
      </div>
    </section>

    {/* Números */}
    <section className="border-t border-border bg-muted/40 py-16">
      <div className="container max-w-4xl">
        <div className="grid gap-8 sm:grid-cols-3 text-center">
          {[
            { value: "1/3", label: "oficinas sem mão de obra" },
            { value: "R$269B", label: "mercado automotivo 2025" },
            { value: "120M", label: "veículos no Brasil" },
          ].map((s) => (
            <div key={s.value}>
              <p className="font-display text-4xl font-bold text-primary">{s.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">Fonte: Pesquisa Oficina Brasil / Sindirepa, 2025</p>
      </div>
    </section>

    {/* Missão */}
    <section className="container max-w-3xl py-16 text-center">
      <h2 className="font-display text-2xl font-bold mb-6">Nossa missão</h2>
      <p className="text-lg leading-relaxed text-muted-foreground">
        Ser a maior rede de mão de obra mecânica do Brasil — conectando quem precisa com quem sabe, com segurança, transparência e tecnologia.
      </p>
      <Button className="mt-8 gap-2" asChild>
        <Link to="/cadastro/oficina">Comece agora <ArrowRight className="h-4 w-4" /></Link>
      </Button>
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

export default Sobre;
