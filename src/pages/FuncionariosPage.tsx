import { useState } from "react";
import { mockFuncionarios } from "../data/mockData";
import { Plus, Search, User } from "lucide-react";

const SETORES = ["todos", "Qualidade", "Operações", "Produção", "Segurança", "RH", "Manutenção"];

export default function FuncionariosPage() {
  const [search, setSearch] = useState("");
  const [setor, setSetor] = useState("todos");

  const filtered = mockFuncionarios.filter(f => {
    const matchSetor = setor === "todos" || f.setor === setor;
    const matchSearch = f.nome.toLowerCase().includes(search.toLowerCase()) ||
      f.cargo.toLowerCase().includes(search.toLowerCase()) ||
      f.matricula.toLowerCase().includes(search.toLowerCase());
    return matchSetor && matchSearch;
  });

  const initials = (nome: string) => nome.split(" ").map(n => n[0]).slice(0, 2).join("");

  const setorColors: Record<string, string> = {
    Qualidade:  "#3B82F6",
    Operações:  "#8B5CF6",
    Produção:   "#10B981",
    Segurança:  "#EF4444",
    RH:         "#F59E0B",
    Manutenção: "#6B7280",
  };

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-4xl mb-1">Funcionários</h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{mockFuncionarios.length} colaboradores cadastrados</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          <Plus size={16} />
          Novo Funcionário
        </button>
      </div>

      {/* Setor filters */}
      <div className="flex flex-wrap gap-2 mb-5">
        {SETORES.map(s => (
          <button
            key={s}
            onClick={() => setSetor(s)}
            className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all"
            style={setor === s
              ? { backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }
              : { backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }
            }
          >
            {s === "todos" ? "Todos os setores" : s}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Nome, cargo ou matrícula..."
          className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none"
          style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}
          onFocus={e => e.target.style.borderColor = "var(--accent)"}
          onBlur={e => e.target.style.borderColor = "var(--border)"}
        />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-sm" style={{ color: "var(--muted-foreground)" }}>
            Nenhum funcionário encontrado.
          </div>
        )}
        {filtered.map(f => {
          const color = setorColors[f.setor] ?? "#6B7280";
          return (
            <div key={f.id} className="rounded-xl p-5 hover:shadow-sm transition-shadow group cursor-pointer"
              style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ backgroundColor: color }}>
                  {initials(f.nome)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm group-hover:text-amber-700 transition-colors">{f.nome}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{f.cargo}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded"
                      style={{ backgroundColor: `${color}15`, color }}>
                      {f.setor}
                    </span>
                    <span className="text-xs font-mono" style={{ color: "var(--muted-foreground)" }}>{f.matricula}</span>
                  </div>
                </div>
                <User size={15} className="opacity-20 group-hover:opacity-40 transition-opacity shrink-0 mt-0.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
