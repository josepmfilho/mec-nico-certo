import { Link } from "react-router-dom";
import { ArrowLeft, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const Termos = () => (
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
      <h1 className="mb-8 text-3xl font-bold md:text-4xl">Termos de Uso</h1>
      <p className="text-lg text-muted-foreground">
        Esta página está em construção. Os termos de uso completos serão publicados em breve.
      </p>
    </main>
  </div>
);

export default Termos;
