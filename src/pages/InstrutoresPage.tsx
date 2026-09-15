import { useState } from "react";
import { mockInstrutores } from "../data/mockData";
import { Plus, Search, Building2, User } from "lucide-react";

export default function InstrutoresPage() {
  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState<"todos" | "interno" | "externo">("todos");

  const filtered = mockInstrutores.filter(i => {
    const matchTipo = tipo === "todos" || (tipo === "interno" ? i.interno : !i.interno);
    const matchSearch = i.nome.toLowerCase().includes(search.toLowerCase()) ||
      i.especialidade.toLowerCase().includes(search.toLowerCase());
    return matchTipo && matchSearch;
  });

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-4xl mb-1">Instrutores</h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{mockInstrutores.length} instrutores cadastrados</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          <Plus size={16} />
          Novo Instrutor
        </button>
      </div>

      {/* Tipo filters */}
      <div className="flex gap-2 mb-5">
        {(["todos", "interno", "externo"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTipo(t)}
            className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all capitalize"
            style={tipo === t
              ? { backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }
              : { backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }
            }
          >
            {t === "todos" ? "Todos" : t === "interno" ? "Internos" : "Externos"}
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
          placeholder="Nome ou especialidade..."
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
              <th className="text-left px-6 py-3 text-xs font-mono font-medium tracking-wider uppercase" style={{ color: "var(--muted-foreground)" }}>Instrutor</th>
              <th className="text-left px-4 py-3 text-xs font-mono font-medium tracking-wider uppercase hidden sm:table-cell" style={{ color: "var(--muted-foreground)" }}>Especialidade</th>
              <th className="text-left px-4 py-3 text-xs font-mono font-medium tracking-wider uppercase hidden md:table-cell" style={{ color: "var(--muted-foreground)" }}>Registro</th>
              <th className="text-left px-4 py-3 text-xs font-mono font-medium tracking-wider uppercase" style={{ color: "var(--muted-foreground)" }}>Tipo</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-12 text-sm" style={{ color: "var(--muted-foreground)" }}>
                  Nenhum instrutor encontrado.
                </td>
              </tr>
            )}
            {filtered.map(i => (
              <tr key={i.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                      <User size={15} className="opacity-50" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{i.nome}</div>
                      <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{i.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 hidden sm:table-cell">
                  <span className="text-sm">{i.especialidade}</span>
                </td>
                <td className="px-4 py-4 hidden md:table-cell">
                  <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>{i.registro}</span>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium ${
                    i.interno
                      ? "bg-blue-100 text-blue-800 border border-blue-200"
                      : "bg-purple-100 text-purple-800 border border-purple-200"
                  }`}>
                    {i.interno ? <Building2 size={11} /> : <User size={11} />}
                    {i.interno ? "Interno" : "Externo"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
