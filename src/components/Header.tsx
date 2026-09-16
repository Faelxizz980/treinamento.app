import { Shield, LogOut, Menu, X } from "lucide-react";

interface HeaderProps {
  userName: string;
  userRole: string;
  onLogout: () => void;
  onToggleNav?: () => void;
  navOpen?: boolean;
}

export default function Header({ userName, userRole, onLogout, onToggleNav, navOpen }: HeaderProps) {
  const initials = userName.split(" ").map((n) => n[0]).slice(0, 2).join("");

  return (
    <header
      className="h-[64px] flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-40"
      style={{ backgroundColor: "var(--header-bg)", color: "var(--header-fg)" }}
    >
      {/* Left: Logo + hamburger (mobile) */}
      <div className="flex items-center gap-3">
        {onToggleNav && (
          <button
            onClick={onToggleNav}
            aria-label={navOpen ? "Fechar navegação" : "Abrir navegação"}
            className="lg:hidden p-2 -ml-2 rounded-md hover:bg-white/10 transition-colors"
          >
            {navOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded flex items-center justify-center"
            style={{ backgroundColor: "var(--lavender)" }}
          >
            <Shield size={16} className="text-white" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm leading-tight">TrainPro</div>
            <div className="text-xs font-mono leading-tight" style={{ color: "var(--powder)" }}>
              v1.0.0
            </div>
          </div>
        </div>
      </div>

      {/* Right: User */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-medium text-white leading-tight">{userName}</div>
            <div className="text-xs font-mono" style={{ color: "var(--powder)" }}>
              {userRole}
            </div>
          </div>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ backgroundColor: "var(--lavender)" }}
          >
            {initials}
          </div>
        </div>

        {/* Mobile initials */}
        <div
          className="sm:hidden w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ backgroundColor: "var(--lavender)" }}
        >
          {initials}
        </div>

        <button
          onClick={onLogout}
          aria-label="Sair"
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors hover:bg-white/10"
          style={{ color: "var(--header-fg)" }}
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>
    </header>
  );
}
