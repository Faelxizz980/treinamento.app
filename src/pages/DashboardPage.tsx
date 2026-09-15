import { mockDashboard, mockTreinamentos, mockCertificados } from "../data/mockData";
import StatusBadge from "../components/StatusBadge";
import { Users, BookOpen, GraduationCap, Award, TrendingUp, Clock } from "lucide-react";

const kpiCards = [
  { label: "Funcionários",  value: mockDashboard.quantidadeFuncionarios, icon: Users,          delta: "+3 este mês",  color: "#3B82F6" },
  { label: "Treinamentos",  value: mockDashboard.quantidadeTreinamentos, icon: BookOpen,        delta: "2 em andamento", color: "#8B5CF6" },
  { label: "Instrutores",   value: mockDashboard.quantidadeInstrutores,  icon: GraduationCap,  delta: "4 internos",   color: "#D97706" },
  { label: "Certificados",  value: mockDashboard.quantidadeCertificados, icon: Award,           delta: "+12 este mês", color: "#10B981" },
];

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

export default function DashboardPage() {
  const recentes = mockTreinamentos.slice(0, 4);
  const certs = mockCertificados.filter(c => c.status === "valido").slice(0, 3);
  const expirando = mockCertificados.filter(c => c.status === "expirado");

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="font-display text-4xl mb-1">Dashboard</h1>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Visão geral — {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiCards.map(({ label, value, icon: Icon, delta, color }) => (
          <div key={label} className="rounded-xl p-5 transition-shadow hover:shadow-sm" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div className="flex items-center gap-1 text-xs font-mono" style={{ color: "var(--muted-foreground)" }}>
                <TrendingUp size={11} />
                {delta}
              </div>
            </div>
            <div className="font-display text-4xl mb-1">{value}</div>
            <div className="text-xs font-mono tracking-wide uppercase" style={{ color: "var(--muted-foreground)" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Main content split */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Treinamentos recentes */}
        <div className="xl:col-span-2 rounded-xl overflow-hidden" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
            <h2 className="font-semibold text-sm">Treinamentos Recentes</h2>
            <span className="text-xs font-mono" style={{ color: "var(--muted-foreground)" }}>{mockTreinamentos.length} total</span>
          </div>
          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
            {recentes.map(t => (
              <div key={t.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
                <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 font-mono text-xs font-medium"
                  style={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }}>
                  #{t.id}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{t.titulo}</div>
                  <div className="text-xs mt-0.5 flex items-center gap-1.5" style={{ color: "var(--muted-foreground)" }}>
                    <Clock size={11} />
                    {t.cargaHoraria}h · {fmt(t.dataInicio)}
                  </div>
                </div>
                <StatusBadge status={t.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Certificados válidos */}
          <div className="rounded-xl" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="px-5 py-4 border-b" style={{ borderColor: "var(--border)" }}>
              <h2 className="font-semibold text-sm">Certificados Recentes</h2>
            </div>
            <div className="divide-y" style={{ borderColor: "var(--border)" }}>
              {certs.map(c => (
                <div key={c.id} className="px-5 py-3">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-mono text-xs font-medium" style={{ color: "var(--accent)" }}>{c.numero}</span>
                    <StatusBadge status={c.status} />
                  </div>
                  <div className="text-xs font-medium truncate">{c.funcionario}</div>
                  <div className="text-xs mt-0.5 truncate" style={{ color: "var(--muted-foreground)" }}>{c.treinamento}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Alertas */}
          {expirando.length > 0 && (
            <div className="rounded-xl p-5" style={{ backgroundColor: "#FEF3C7", border: "1px solid #FDE68A" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-800">Atenção</span>
              </div>
              <p className="text-sm text-amber-900 font-medium">{expirando.length} certificado{expirando.length > 1 ? "s" : ""} expirado{expirando.length > 1 ? "s" : ""}</p>
              <p className="text-xs text-amber-700 mt-1">Renove para manter conformidade.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
