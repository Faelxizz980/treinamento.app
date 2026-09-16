import { useState } from "react";
import { mockUser } from "./data/mockData";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TreinamentosPage from "./pages/TreinamentosPage";
import FuncionariosPage from "./pages/FuncionariosPage";
import InstrutoresPage from "./pages/InstrutoresPage";
import CertificadosPage from "./pages/CertificadosPage";
import AuditoriaPage from "./pages/AuditoriaPage";
import Header from "./components/Header";
import TopNav from "./components/TopNav";

type Page = "dashboard" | "treinamentos" | "funcionarios" | "instrutores" | "certificados" | "auditoria";

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [page, setPage] = useState<Page>("dashboard");
  const [navOpen, setNavOpen] = useState(false);

  if (!authed) {
    return <LoginPage onLogin={() => setAuthed(true)} />;
  }

  const pageMap: Record<Page, React.ReactNode> = {
    dashboard:    <DashboardPage />,
    treinamentos: <TreinamentosPage />,
    funcionarios: <FuncionariosPage />,
    instrutores:  <InstrutoresPage />,
    certificados: <CertificadosPage />,
    auditoria:    <AuditoriaPage />,
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--background)" }}>
      <Header
        userName={mockUser.funcionario.nome}
        userRole={mockUser.perfis[0].nome}
        onLogout={() => setAuthed(false)}
        onToggleNav={() => setNavOpen((v) => !v)}
        navOpen={navOpen}
      />
      <TopNav
        active={page}
        onNavigate={(p) => {
          setPage(p as Page);
          setNavOpen(false);
        }}
        open={navOpen}
      />
      <main className="flex-1 overflow-auto">
        {pageMap[page]}
      </main>
    </div>
  );
}
