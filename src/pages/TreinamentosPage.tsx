import { useState } from "react";
import { mockTreinamentos } from "../data/mockData";
import StatusBadge from "../components/StatusBadge";
import { Plus, Search, Clock, CalendarDays, X } from "lucide-react";

const STATUS_FILTERS = ["todos", "pendente", "em_andamento", "concluido", "cancelado"] as const;
type StatusFilter = typeof STATUS_FILTERS[number];

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

interface Treinamento {
  id: number;
  titulo: string;
  descricao: string;
  cargaHoraria: number;
  status: string;
  dataInicio: string;
  dataFim: string;
}

function TreinamentoModal({ t, onClose }: { t: Treinamento; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl shadow-2xl z-10" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="px-6 pt-6 pb-4 border-b flex items-start justify-between" style={{ borderColor: "var(--border)" }}>
          <div>
            <div className="font-mono text-xs mb-2" style={{ color: "var(--accent)" }}>TREINAMENTO #{t.id}</div>
            <h2 className="font-display text-xl leading-tight">{t.titulo}</h2>
          </div>
          <button onClick={onClose} className="opacity-40 hover:opacity-70 transition-opacity ml-4 mt-1">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: "var(--muted-foreground)" }}>Descrição</div>
            <p className="text-sm leading-relaxed">{t.descricao}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg p-3" style={{ backgroundColor: "var(--muted)" }}>
              <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: "var(--muted-foreground)" }}>Carga Horária</div>
              <div className="font-semibold">{t.cargaHoraria}h</div>
            </div>
            <div className="rounded-lg p-3" style={{ backgroundColor: "var(--muted)" }}>
              <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: "var(--muted-foreground)" }}>Status</div>
              <StatusBadge status={t.status} />
            </div>
            <div className="rounded-lg p-3" style={{ backgroundColor: "var(--muted)" }}>
              <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: "var(--muted-foreground)" }}>Início</div>
              <div className="font-semibold text-sm">{fmt(t.dataInicio)}</div>
            </div>
            <div className="rounded-lg p-3" style={{ backgroundColor: "var(--muted)" }}>
              <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: "var(--muted-foreground)" }}>Término</div>
              <div className="font-semibold text-sm">{fmt(t.dataFim)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TreinamentosPage() {
  const [filter, setFilter] = useState<StatusFilter>("todos");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Treinamento | null>(null);

  const filtered = mockTreinamentos.filter(t => {
    const matchStatus = filter === "todos" || t.status === filter;
    const matchSearch = t.titulo.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const filterLabels: Record<StatusFilter, string> = {
    todos: "Todos",
    pendente: "Pendente",
    em_andamento: "Em andamento",
    concluido: "Concluído",
    cancelado: "Cancelado",
  };

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-4xl mb-1">Treinamentos</h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{mockTreinamentos.length} treinamentos cadastrados</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          <Plus size={16} />
          Novo Treinamento
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-5">
        {STATUS_FILTERS.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all"
            style={filter === s
              ? { backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }
              : { backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }
            }
          >
            {filterLabels[s]}
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
          placeholder="Buscar treinamento..."
          className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none"
          style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}
          onFocus={e => e.target.style.borderColor = "var(--accent)"}
          onBlur={e => e.target.style.borderColor = "var(--border)"}
        />
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", backgroundColor: "var(--muted)" }}>
              <th className="text-left px-6 py-3 text-xs font-mono font-medium tracking-wider uppercase" style={{ color: "var(--muted-foreground)" }}>Título</th>
              <th className="text-left px-4 py-3 text-xs font-mono font-medium tracking-wider uppercase" style={{ color: "var(--muted-foreground)" }}>Status</th>
              <th className="text-left px-4 py-3 text-xs font-mono font-medium tracking-wider uppercase hidden sm:table-cell" style={{ color: "var(--muted-foreground)" }}>Carga</th>
              <th className="text-left px-4 py-3 text-xs font-mono font-medium tracking-wider uppercase hidden md:table-cell" style={{ color: "var(--muted-foreground)" }}>Período</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-12 text-sm" style={{ color: "var(--muted-foreground)" }}>
                  Nenhum treinamento encontrado.
                </td>
              </tr>
            )}
            {filtered.map(t => (
              <tr
                key={t.id}
                onClick={() => setSelected(t)}
                className="hover:bg-gray-50/60 transition-colors cursor-pointer group"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-sm group-hover:text-amber-700 transition-colors">{t.titulo}</div>
                  <div className="text-xs mt-0.5 line-clamp-1" style={{ color: "var(--muted-foreground)" }}>{t.descricao}</div>
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={t.status} />
                </td>
                <td className="px-4 py-4 hidden sm:table-cell">
                  <div className="flex items-center gap-1.5 text-sm font-mono" style={{ color: "var(--muted-foreground)" }}>
                    <Clock size={13} />
                    {t.cargaHoraria}h
                  </div>
                </td>
                <td className="px-4 py-4 hidden md:table-cell">
                  <div className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "var(--muted-foreground)" }}>
                    <CalendarDays size={12} />
                    {fmt(t.dataInicio)} → {fmt(t.dataFim)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && <TreinamentoModal t={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
