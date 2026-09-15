import { useState } from "react";
import { mockAuditorias } from "../data/mockData";
import { Search, Clock, Tag } from "lucide-react";

function fmt(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

const ACOES = ["todas", "criacao", "atualizacao", "exclusao"] as const;
const ENTIDADES = ["todas", "treinamentos", "certificados", "funcionarios", "instrutores"];

const acaoColors: Record<string, { bg: string; text: string; label: string }> = {
  criacao:     { bg: "#D1FAE5", text: "#065F46", label: "Criação" },
  atualizacao: { bg: "#DBEAFE", text: "#1E40AF", label: "Atualização" },
  exclusao:    { bg: "#FEE2E2", text: "#991B1B", label: "Exclusão" },
};

export default function AuditoriaPage() {
  const [search, setSearch] = useState("");
  const [acao, setAcao] = useState<string>("todas");
  const [entidade, setEntidade] = useState("todas");

  const filtered = mockAuditorias.filter(a => {
    const matchAcao = acao === "todas" || a.acao === acao;
    const matchEntidade = entidade === "todas" || a.entidade === entidade;
    const matchSearch = a.detalhe.toLowerCase().includes(search.toLowerCase()) ||
      a.usuario.toLowerCase().includes(search.toLowerCase());
    return matchAcao && matchEntidade && matchSearch;
  });

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-4xl mb-1">Auditoria</h1>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Log de todas as operações realizadas no sistema
        </p>
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-3 mb-5 items-center">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider mr-2" style={{ color: "var(--muted-foreground)" }}>Ação:</span>
          <span className="inline-flex gap-1.5">
            {ACOES.map(a => (
              <button
                key={a}
                onClick={() => setAcao(a)}
                className="px-3 py-1 rounded-full text-xs font-mono font-medium transition-all capitalize"
                style={acao === a
                  ? { backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }
                  : { backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }
                }
              >
                {a === "todas" ? "Todas" : acaoColors[a]?.label ?? a}
              </button>
            ))}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-5 items-center">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider mr-2" style={{ color: "var(--muted-foreground)" }}>Entidade:</span>
          <span className="inline-flex flex-wrap gap-1.5">
            {ENTIDADES.map(e => (
              <button
                key={e}
                onClick={() => setEntidade(e)}
                className="px-3 py-1 rounded-full text-xs font-mono font-medium transition-all"
                style={entidade === e
                  ? { backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }
                  : { backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }
                }
              >
                {e === "todas" ? "Todas" : e}
              </button>
            ))}
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por detalhe ou usuário..."
          className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none"
          style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}
          onFocus={e => e.target.style.borderColor = "var(--accent)"}
          onBlur={e => e.target.style.borderColor = "var(--border)"}
        />
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-sm rounded-xl" style={{ color: "var(--muted-foreground)", backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
            Nenhum registro encontrado.
          </div>
        )}
        {filtered.map((a, i) => {
          const ac = acaoColors[a.acao] ?? { bg: "#F3F4F6", text: "#374151", label: a.acao };
          return (
            <div key={a.id} className="flex gap-4">
              {/* Line */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0"
                  style={{ backgroundColor: ac.bg, color: ac.text }}>
                  {i + 1}
                </div>
                {i < filtered.length - 1 && (
                  <div className="w-px flex-1 mt-2" style={{ backgroundColor: "var(--border)" }} />
                )}
              </div>

              {/* Content */}
              <div className="rounded-xl p-4 flex-1 mb-3 hover:shadow-sm transition-shadow"
                style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-semibold"
                      style={{ backgroundColor: ac.bg, color: ac.text }}>
                      <Tag size={10} />
                      {ac.label}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded"
                      style={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }}>
                      {a.entidade}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono shrink-0" style={{ color: "var(--muted-foreground)" }}>
                    <Clock size={11} />
                    {fmt(a.realizadoEm)}
                  </div>
                </div>
                <p className="text-sm mt-2.5 leading-relaxed">{a.detalhe}</p>
                <p className="text-xs mt-1.5 font-mono" style={{ color: "var(--muted-foreground)" }}>
                  por <span className="font-medium">{a.usuario}</span> · entidadeId #{a.entidadeId}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
