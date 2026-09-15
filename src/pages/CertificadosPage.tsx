import { useState } from "react";
import { mockCertificados } from "../data/mockData";
import StatusBadge from "../components/StatusBadge";
import { Search, Award, Download } from "lucide-react";

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

const STATUS_FILTERS = ["todos", "valido", "expirado", "cancelado"] as const;
type StatusFilter = typeof STATUS_FILTERS[number];

export default function CertificadosPage() {
  const [filter, setFilter] = useState<StatusFilter>("todos");
  const [search, setSearch] = useState("");

  const filtered = mockCertificados.filter(c => {
    const matchStatus = filter === "todos" || c.status === filter;
    const matchSearch =
      c.funcionario.toLowerCase().includes(search.toLowerCase()) ||
      c.numero.toLowerCase().includes(search.toLowerCase()) ||
      c.treinamento.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const filterLabels: Record<StatusFilter, string> = {
    todos:    "Todos",
    valido:   "Válidos",
    expirado: "Expirados",
    cancelado: "Cancelados",
  };

  const counts = {
    valido:   mockCertificados.filter(c => c.status === "valido").length,
    expirado: mockCertificados.filter(c => c.status === "expirado").length,
    cancelado: mockCertificados.filter(c => c.status === "cancelado").length,
  };

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-4xl mb-1">Certificados</h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{mockCertificados.length} certificados emitidos</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          <Award size={16} />
          Emitir Certificado
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {([
          { key: "valido",   label: "Válidos",   color: "#10B981", bg: "#D1FAE5", border: "#A7F3D0" },
          { key: "expirado", label: "Expirados", color: "#D97706", bg: "#FEF3C7", border: "#FDE68A" },
          { key: "cancelado",label: "Cancelados",color: "#EF4444", bg: "#FEE2E2", border: "#FECACA" },
        ] as const).map(({ key, label, color, bg, border }) => (
          <div key={key} className="rounded-xl p-4 flex items-center gap-3" style={{ backgroundColor: bg, border: `1px solid ${border}` }}>
            <Award size={20} style={{ color }} />
            <div>
              <div className="font-display text-2xl" style={{ color }}>{counts[key]}</div>
              <div className="text-xs font-mono" style={{ color }}>{label}</div>
            </div>
          </div>
        ))}
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
          placeholder="Funcionário, número ou treinamento..."
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
              <th className="text-left px-6 py-3 text-xs font-mono font-medium tracking-wider uppercase" style={{ color: "var(--muted-foreground)" }}>Número</th>
              <th className="text-left px-4 py-3 text-xs font-mono font-medium tracking-wider uppercase" style={{ color: "var(--muted-foreground)" }}>Funcionário</th>
              <th className="text-left px-4 py-3 text-xs font-mono font-medium tracking-wider uppercase hidden md:table-cell" style={{ color: "var(--muted-foreground)" }}>Treinamento</th>
              <th className="text-left px-4 py-3 text-xs font-mono font-medium tracking-wider uppercase hidden sm:table-cell" style={{ color: "var(--muted-foreground)" }}>Validade</th>
              <th className="text-left px-4 py-3 text-xs font-mono font-medium tracking-wider uppercase" style={{ color: "var(--muted-foreground)" }}>Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-12 text-sm" style={{ color: "var(--muted-foreground)" }}>
                  Nenhum certificado encontrado.
                </td>
              </tr>
            )}
            {filtered.map(c => (
              <tr key={c.id} className="hover:bg-gray-50/60 transition-colors group">
                <td className="px-6 py-4">
                  <span className="font-mono text-sm font-medium" style={{ color: "var(--accent)" }}>{c.numero}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm font-medium">{c.funcionario}</span>
                </td>
                <td className="px-4 py-4 hidden md:table-cell">
                  <span className="text-sm line-clamp-1">{c.treinamento}</span>
                </td>
                <td className="px-4 py-4 hidden sm:table-cell">
                  <span className="text-xs font-mono" style={{ color: "var(--muted-foreground)" }}>
                    {fmt(c.dataEmissao)} → {fmt(c.dataValidade)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-4 py-4">
                  <button className="opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity" title="Baixar certificado">
                    <Download size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
