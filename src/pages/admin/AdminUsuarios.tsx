import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, Ban, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const FILTERS = ["Todos", "Oficinas", "Mecânicos", "Pendentes"] as const;

const MOCK_USERS = [
  { id: 1, name: "Auto Center Silva", type: "Oficina", city: "São Paulo", date: "10/01/2025", status: "Ativo" },
  { id: 2, name: "Carlos Eduardo", type: "Mecânico", city: "São Paulo", date: "12/01/2025", status: "Ativo" },
  { id: 3, name: "Oficina do Zé", type: "Oficina", city: "Campinas", date: "15/01/2025", status: "Ativo" },
  { id: 4, name: "Roberto Santos", type: "Mecânico", city: "Guarulhos", date: "18/01/2025", status: "Pendente" },
  { id: 5, name: "Mecânica Express", type: "Oficina", city: "Osasco", date: "20/01/2025", status: "Ativo" },
  { id: 6, name: "Felipe Oliveira", type: "Mecânico", city: "Santo André", date: "22/01/2025", status: "Suspenso" },
  { id: 7, name: "Car Fix Ltda", type: "Oficina", city: "São Bernardo", date: "25/01/2025", status: "Ativo" },
  { id: 8, name: "Marcos Pereira", type: "Mecânico", city: "Diadema", date: "28/01/2025", status: "Ativo" },
  { id: 9, name: "RefriCar", type: "Oficina", city: "Mauá", date: "01/02/2025", status: "Pendente" },
  { id: 10, name: "André Lima", type: "Mecânico", city: "Barueri", date: "03/02/2025", status: "Ativo" },
];

const statusColor: Record<string, string> = {
  Ativo: "bg-success/10 text-success",
  Pendente: "bg-warning/10 text-warning",
  Suspenso: "bg-destructive/10 text-destructive",
};

const AdminUsuarios = () => {
  const [filter, setFilter] = useState<typeof FILTERS[number]>("Todos");
  const [search, setSearch] = useState("");

  const filtered = MOCK_USERS.filter((u) => {
    if (filter === "Oficinas" && u.type !== "Oficina") return false;
    if (filter === "Mecânicos" && u.type !== "Mecânico") return false;
    if (filter === "Pendentes" && u.status !== "Pendente") return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="font-display text-2xl font-bold">Usuários</h2>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)}
                className={filter === f ? "bg-admin hover:bg-admin/90" : ""}>
                {f}
              </Button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome ou e-mail" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="hidden md:table-cell">Cidade</TableHead>
                <TableHead className="hidden md:table-cell">Cadastro</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-display text-xs font-bold">
                        {u.name[0]}
                      </div>
                      <span className="font-medium text-sm">{u.name}</span>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{u.type}</Badge></TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{u.city}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{u.date}</TableCell>
                  <TableCell>
                    <span className={cn("inline-flex rounded-full px-2 py-0.5 text-xs font-medium", statusColor[u.status])}>
                      {u.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Ban className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-success"><CheckCircle className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsuarios;
