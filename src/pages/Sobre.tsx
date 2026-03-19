import { Link } from "react-router-dom";
import { ArrowLeft, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const Sobre = () => (
  <div className="min-h-screen bg-background">
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Wrench className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">MecânicoApp</span>
        </Link>
        <Button variant="outline" size="sm" asChild>
          <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" />Voltar</Link>
        </Button>
      </div>
    </header>

    <main className="container mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold md:text-4xl">Nossa História</h1>
      <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
        <p>
          O MecânicoApp não nasceu numa planilha. Nasceu da memória de quem trabalhou numa oficina
          aos 12 anos, viu o problema de perto, e 30 anos depois teve as ferramentas para resolvê-lo.
        </p>
        <p>
          A ideia é simples: conectar oficinas que precisam de mão de obra qualificada com mecânicos
          autônomos que querem trabalhar. Sem burocracia, sem encargos desnecessários, com segurança
          para ambos os lados.
        </p>
        <p>
          Estamos construindo a maior rede de mecânicos autônomos do Brasil. E você pode fazer parte
          desde o começo.
        </p>
      </div>
    </main>
  </div>
);

export default Sobre;
