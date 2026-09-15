import { useState } from "react";
import { mockUser } from "./data/mockData";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TreinamentosPage from "./pages/TreinamentosPage";
import FuncionariosPage from "./pages/FuncionariosPage";
import InstrutoresPage from "./pages/InstrutoresPage";
import CertificadosPage from "./pages/CertificadosPage";
import AuditoriaPage from "./pages/AuditoriaPage";
import Sidebar from "./components/Sidebar";

type Page = "dashboard" | "treinamentos" | "funcionarios" | "instrutores" | "certificados" | "auditoria";

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [page, setPage] = useState<Page>("dashboard");

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
    <div className="flex min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <Sidebar
        active={page}
        onNavigate={(p) => setPage(p as Page)}
        onLogout={() => setAuthed(false)}
        userName={mockUser.funcionario.nome}
        userRole={mockUser.perfis[0].nome}
      />
      <main className="flex-1 overflow-auto">
        {pageMap[page]}
      </main>
    </div>
  );
}
