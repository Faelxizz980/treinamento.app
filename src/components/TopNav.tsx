import { LayoutDashboard, BookOpen, Users, GraduationCap, Award, ClipboardList } from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "treinamentos", label: "Treinamentos", icon: BookOpen },
  { id: "funcionarios", label: "Funcionários", icon: Users },
  { id: "instrutores", label: "Instrutores", icon: GraduationCap },
  { id: "certificados", label: "Certificados", icon: Award },
  { id: "auditoria", label: "Auditoria", icon: ClipboardList },
];

interface TopNavProps {
  active: string;
  onNavigate: (page: string) => void;
  open?: boolean;
}

export default function TopNav({ active, onNavigate, open }: TopNavProps) {
  return (
    <nav
      className="sticky top-[64px] z-30 border-b"
      style={{ backgroundColor: "var(--nav-bg)", borderColor: "var(--border)" }}
      aria-label="Navegação principal"
    >
      <div className="px-2 sm:px-4 lg:px-8">
        {/* Mobile: hamburger controls vertical dropdown, but also horizontal scroll fallback.
            Quando open=true em mobile, mostra grade vertical; senão scroll horizontal. */}
        <div
          className={`${
            open ? "grid grid-cols-2 sm:flex" : "flex"
          } items-center gap-1 py-2 overflow-x-auto lg:overflow-visible`}
        >
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                aria-current={isActive ? "page" : undefined}
                className={`nav-item flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium whitespace-nowrap shrink-0 ${
                  isActive ? "nav-item-active" : ""
                }`}
                style={
                  isActive
                    ? {}
                    : { color: "var(--text-muted)" }
                }
              >
                <Icon size={16} className={isActive ? "opacity-100" : "opacity-70"} />
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
