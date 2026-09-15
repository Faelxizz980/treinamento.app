type StatusKey = "pendente" | "em_andamento" | "concluido" | "cancelado" | "valido" | "expirado" | "aprovado" | "reprovado";

const config: Record<StatusKey, { label: string; cls: string }> = {
  pendente:     { label: "Pendente",     cls: "bg-amber-100 text-amber-800 border border-amber-200" },
  em_andamento: { label: "Em andamento", cls: "bg-blue-100 text-blue-800 border border-blue-200" },
  concluido:    { label: "Concluído",    cls: "bg-emerald-100 text-emerald-800 border border-emerald-200" },
  cancelado:    { label: "Cancelado",    cls: "bg-red-100 text-red-700 border border-red-200" },
  valido:       { label: "Válido",       cls: "bg-emerald-100 text-emerald-800 border border-emerald-200" },
  expirado:     { label: "Expirado",     cls: "bg-orange-100 text-orange-800 border border-orange-200" },
  aprovado:     { label: "Aprovado",     cls: "bg-emerald-100 text-emerald-800 border border-emerald-200" },
  reprovado:    { label: "Reprovado",    cls: "bg-red-100 text-red-700 border border-red-200" },
};

export default function StatusBadge({ status }: { status: string }) {
  const c = config[status as StatusKey] ?? { label: status, cls: "bg-gray-100 text-gray-600 border border-gray-200" };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-mono font-medium tracking-wide ${c.cls}`}>
      {c.label}
    </span>
  );
}
