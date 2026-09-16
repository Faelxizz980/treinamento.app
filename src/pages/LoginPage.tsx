import { useState } from "react";
import { Shield, Eye, EyeOff, AlertCircle } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("carlo.souza@empresa.com");
  const [senha, setSenha] = useState("senhaSegura123");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !senha) { setError("Preencha e-mail e senha."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 900);
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--powder)" }}>
      {/* Left panel — brand : Shadow Grey */}
      <div className="hidden lg:flex lg:w-[480px] flex-col justify-between p-12" style={{ backgroundColor: "var(--shadow)" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: "var(--lavender)" }}>
            <Shield size={20} className="text-white" />
          </div>
          <span className="font-display text-2xl text-white">TrainPro</span>
        </div>

        <div>
          <p className="font-display text-5xl text-white leading-tight mb-6">
            Gestão de<br />
            <em style={{ color: "var(--pale-sky)" }}>Treinamentos</em><br />
            Corporativos
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--powder)" }}>
            Controle completo de treinamentos, instrutores, participantes, certificados e conformidade regulatória.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Treinamentos", value: "17" },
            { label: "Certificados", value: "134" },
            { label: "Funcionários", value: "48" },
            { label: "Instrutores",  value: "9" },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-lg p-4" style={{ backgroundColor: "rgba(189,212,231,0.08)", border: "1px solid rgba(170,185,207,0.15)" }}>
              <div className="font-display text-3xl text-white">{value}</div>
              <div className="text-xs font-mono mt-1 tracking-wide uppercase" style={{ color: "var(--pale-sky)" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form : Pale Sky / Powder */}
      <div className="flex-1 flex items-center justify-center px-6 py-12" style={{ backgroundColor: "var(--pale-sky)" }}>
        <div className="w-full max-w-sm rounded-xl p-8" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 8px 32px rgba(33,34,39,0.08)" }}>
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: "var(--lavender)" }}>
              <Shield size={16} className="text-white" />
            </div>
            <span className="font-display text-xl" style={{ color: "var(--shadow)" }}>TrainPro</span>
          </div>

          <h1 className="font-display text-3xl mb-1" style={{ color: "var(--shadow)" }}>Entrar</h1>
          <p className="text-sm mb-8" style={{ color: "var(--dim)" }}>
            Acesse sua conta para continuar
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono font-medium tracking-wider uppercase mb-2" style={{ color: "var(--dim)" }}>
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-field w-full px-4 py-3 rounded-md text-sm outline-none"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  color: "var(--shadow)",
                }}
                placeholder="seu@empresa.com"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium tracking-wider uppercase mb-2" style={{ color: "var(--dim)" }}>
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  className="input-field w-full px-4 py-3 pr-10 rounded-md text-sm outline-none"
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    color: "var(--shadow)",
                  }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "var(--dim)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--shadow)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--dim)")}
                  aria-label={showPwd ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-md border" style={{ color: "#7F1D1D", backgroundColor: "#FEE2E2", borderColor: "#FECACA" }}>
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 rounded-md text-sm font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Autenticando..." : "Entrar"}
            </button>
          </form>

          <p className="text-xs mt-8 text-center" style={{ color: "var(--dim)" }}>
            Credenciais de demonstração já preenchidas
          </p>
        </div>
      </div>
    </div>
  );
}
