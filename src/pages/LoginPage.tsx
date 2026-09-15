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
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--background)" }}>
      {/* Left panel — brand */}
      <div className="hidden lg:flex lg:w-[480px] flex-col justify-between p-12" style={{ backgroundColor: "var(--primary)" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: "var(--accent)" }}>
            <Shield size={20} className="text-white" />
          </div>
          <span className="font-display text-2xl text-white">TrainPro</span>
        </div>

        <div>
          <p className="font-display text-5xl text-white leading-tight mb-6">
            Gestão de<br />
            <em>Treinamentos</em><br />
            Corporativos
          </p>
          <p className="text-slate-400 text-base leading-relaxed">
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
            <div key={label} className="rounded-lg p-4" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="font-display text-3xl text-white">{value}</div>
              <div className="text-xs font-mono text-slate-400 mt-1 tracking-wide uppercase">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: "var(--accent)" }}>
              <Shield size={16} className="text-white" />
            </div>
            <span className="font-display text-xl">TrainPro</span>
          </div>

          <h1 className="font-display text-3xl mb-1">Entrar</h1>
          <p className="text-sm mb-8" style={{ color: "var(--muted-foreground)" }}>
            Acesse sua conta para continuar
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono font-medium tracking-wider uppercase mb-2" style={{ color: "var(--muted-foreground)" }}>
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-md text-sm outline-none transition-all"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
                onFocus={e => e.target.style.borderColor = "var(--accent)"}
                onBlur={e => e.target.style.borderColor = "var(--border)"}
                placeholder="seu@empresa.com"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium tracking-wider uppercase mb-2" style={{ color: "var(--muted-foreground)" }}>
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  className="w-full px-4 py-3 pr-10 rounded-md text-sm outline-none transition-all"
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                  }}
                  onFocus={e => e.target.style.borderColor = "var(--accent)"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-70 transition-opacity"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md border border-red-100">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-md text-sm font-semibold transition-all disabled:opacity-70"
              style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              {loading ? "Autenticando..." : "Entrar"}
            </button>
          </form>

          <p className="text-xs mt-8 text-center" style={{ color: "var(--muted-foreground)" }}>
            Credenciais de demonstração já preenchidas
          </p>
        </div>
      </div>
    </div>
  );
}
