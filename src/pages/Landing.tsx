import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wrench, Building2, UserCog, ArrowRight, Shield, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="h-7 w-7 text-primary" />
            <span className="font-display text-xl font-bold">MecânicoApp</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Cadastrar</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Zap className="h-3.5 w-3.5" />
            Marketplace de mão de obra mecânica
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Conecte sua oficina aos{" "}
            <span className="text-primary">melhores mecânicos</span> do Brasil
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Publique demandas, receba propostas, contrate e pague com segurança.
            Tudo em uma plataforma feita para o mercado automotivo brasileiro.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="gap-2 text-base" asChild>
              <Link to="/register">
                Comece Agora <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-base" asChild>
              <Link to="/login">Já tenho conta</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/30 py-20">
        <div className="container">
          <h2 className="mb-12 text-center font-display text-3xl font-bold">Como funciona</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Building2,
                title: "Para Oficinas",
                desc: "Publique demandas de serviço, receba propostas, contrate e pague via PIX com escrow seguro.",
                color: "text-primary bg-primary/10",
              },
              {
                icon: UserCog,
                title: "Para Mecânicos",
                desc: "Encontre demandas próximas no mapa, envie propostas competitivas e receba pagamentos garantidos.",
                color: "text-mecanico bg-mecanico/10",
              },
              {
                icon: Shield,
                title: "Pagamento Seguro",
                desc: "Sistema de escrow: o valor fica retido até a conclusão do serviço, protegendo ambas as partes.",
                color: "text-admin bg-admin/10",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className={`mb-4 inline-flex rounded-xl p-3 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-lg font-bold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-border py-16">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "5.000+", label: "Oficinas cadastradas" },
              { value: "12.000+", label: "Mecânicos ativos" },
              { value: "R$ 2M+", label: "Em transações" },
              { value: "4.8", label: "Avaliação média", icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" />
            <span className="font-display font-bold">MecânicoApp</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 MecânicoApp. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
