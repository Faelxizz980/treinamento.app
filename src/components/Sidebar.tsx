import { LayoutDashboard, BookOpen, Users, GraduationCap, Award, ClipboardList, LogOut, Shield, ChevronRight } from "lucide-react";

const navItems = [
  { id: "dashboard",    label: "Dashboard",    icon: LayoutDashboard },
  { id: "treinamentos", label: "Treinamentos", icon: BookOpen },
  { id: "funcionarios", label: "Funcionários", icon: Users },
  { id: "instrutores",  label: "Instrutores",  icon: GraduationCap },
  { id: "certificados", label: "Certificados", icon: Award },
  { id: "auditoria",    label: "Auditoria",    icon: ClipboardList },
];

interface SidebarProps {
  active: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userName: string;
  userRole: string;
}

export default function Sidebar({ active, onNavigate, onLogout, userName, userRole }: SidebarProps) {
  const initials = userName.split(" ").map(n => n[0]).slice(0, 2).join("");

  return (
    <aside className="w-[240px] min-h-screen flex flex-col sidebar-scroll" style={{ backgroundColor: "var(--sidebar)", color: "var(--sidebar-foreground)" }}>
      {/* Logo */}
      <div className="px-6 pt-8 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: "var(--sidebar-active)" }}>
            <Shield size={16} className="text-white" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm leading-tight">TrainPro</div>
            <div className="text-xs opacity-40 font-mono leading-tight">v1.0.0</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <div className="px-3 mb-3">
          <span className="text-xs font-mono font-medium tracking-widest uppercase opacity-30">Menu</span>
        </div>
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all group ${
                isActive
                  ? "text-white"
                  : "hover:bg-white/5 hover:text-white"
              }`}
              style={isActive ? { backgroundColor: "rgba(217,119,6,0.15)", color: "var(--sidebar-active)" } : {}}
            >
              <Icon size={16} className={isActive ? "" : "opacity-60 group-hover:opacity-100 transition-opacity"} />
              <span className="flex-1 text-left">{label}</span>
              {isActive && <ChevronRight size={14} className="opacity-60" />}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 pb-4 border-t border-white/10 pt-4">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-md mb-1">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ backgroundColor: "var(--sidebar-active)" }}>
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-white truncate">{userName}</div>
            <div className="text-xs opacity-40 truncate">{userRole}</div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm opacity-50 hover:opacity-100 hover:bg-white/5 transition-all"
        >
          <LogOut size={15} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
