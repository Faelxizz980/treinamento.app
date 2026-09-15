export const mockUser = {
  usuario: { id: 1, email: "carlo.souza@empresa.com", funcionarioId: 1, ativo: true, criadoEm: "2026-01-10T08:00:00.000Z" },
  funcionario: { id: 1, nome: "Carlos Souza", matricula: "F001", cargo: "Analista de Qualidade", setor: "Qualidade" },
  perfis: [{ id: 1, nome: "Administrador", descricao: "Acesso total ao sistema" }],
};

export const mockDashboard = {
  quantidadeFuncionarios: 48,
  quantidadeUsuarios: 23,
  quantidadeTreinamentos: 17,
  quantidadeInstrutores: 9,
  quantidadeCertificados: 134,
};

export const mockTreinamentos = [
  { id: 1, titulo: "NR-35 — Trabalho em Altura", descricao: "Treinamento obrigatório conforme Norma Regulamentadora 35", cargaHoraria: 8, status: "concluido", dataInicio: "2026-03-10T08:00:00.000Z", dataFim: "2026-03-10T17:00:00.000Z" },
  { id: 2, titulo: "NR-10 — Segurança em Instalações Elétricas", descricao: "Treinamento conforme NR-10 para eletricistas e profissionais relacionados", cargaHoraria: 16, status: "em_andamento", dataInicio: "2026-09-01T08:00:00.000Z", dataFim: "2026-09-02T17:00:00.000Z" },
  { id: 3, titulo: "Primeiros Socorros — Básico", descricao: "Capacitação em técnicas de primeiros socorros no ambiente de trabalho", cargaHoraria: 4, status: "pendente", dataInicio: "2026-10-15T08:00:00.000Z", dataFim: "2026-10-15T12:00:00.000Z" },
  { id: 4, titulo: "NR-33 — Espaços Confinados", descricao: "Treinamento para trabalhos em espaços confinados", cargaHoraria: 16, status: "cancelado", dataInicio: "2026-07-05T08:00:00.000Z", dataFim: "2026-07-06T17:00:00.000Z" },
  { id: 5, titulo: "CIPA — Comissão Interna de Prevenção", descricao: "Formação de membros da CIPA conforme NR-05", cargaHoraria: 20, status: "concluido", dataInicio: "2026-02-01T08:00:00.000Z", dataFim: "2026-02-05T17:00:00.000Z" },
  { id: 6, titulo: "Brigada de Incêndio", descricao: "Treinamento de combate a incêndio e evacuação de emergência", cargaHoraria: 12, status: "pendente", dataInicio: "2026-11-10T08:00:00.000Z", dataFim: "2026-11-11T17:00:00.000Z" },
  { id: 7, titulo: "NR-06 — Equipamentos de Proteção Individual", descricao: "Uso correto e manutenção de EPIs", cargaHoraria: 8, status: "concluido", dataInicio: "2026-01-20T08:00:00.000Z", dataFim: "2026-01-20T17:00:00.000Z" },
];

export const mockFuncionarios = [
  { id: 1, nome: "Carlos Souza", matricula: "F001", cargo: "Analista de Qualidade", setor: "Qualidade" },
  { id: 2, nome: "Maria Oliveira", matricula: "F002", cargo: "Técnico de Segurança", setor: "Operações" },
  { id: 3, nome: "João Ferreira", matricula: "F003", cargo: "Operador de Máquinas", setor: "Produção" },
  { id: 4, nome: "Ana Lima", matricula: "F004", cargo: "Supervisora de Produção", setor: "Produção" },
  { id: 5, nome: "Roberto Mendes", matricula: "F005", cargo: "Engenheiro de Segurança", setor: "Segurança" },
  { id: 6, nome: "Fernanda Costa", matricula: "F006", cargo: "Técnica de Enfermagem", setor: "RH" },
  { id: 7, nome: "Lucas Pereira", matricula: "F007", cargo: "Eletricista Industrial", setor: "Manutenção" },
  { id: 8, nome: "Patricia Santos", matricula: "F008", cargo: "Analista de RH", setor: "RH" },
];

export const mockInstrutores = [
  { id: 1, nome: "Marcos Oliveira", especialidade: "Segurança do Trabalho", registro: "CREA-SP-123456", email: "marcos.oliveira@empresa.com", interno: true },
  { id: 2, nome: "João Silva", especialidade: "Primeiros Socorros", registro: "CFM-98765", email: "joao.silva@empresa.com", interno: false },
  { id: 3, nome: "Carla Nascimento", especialidade: "Combate a Incêndio", registro: "CBMESP-4512", email: "carla.nascimento@brigada.com", interno: false },
  { id: 4, nome: "Pedro Almeida", especialidade: "Espaços Confinados", registro: "CREA-RJ-654321", email: "pedro.almeida@empresa.com", interno: true },
  { id: 5, nome: "Renata Gomes", especialidade: "Trabalho em Altura", registro: "CREA-SP-789012", email: "renata.gomes@empresa.com", interno: true },
];

export const mockCertificados = [
  { id: 1, numero: "CERT-2026-0001", funcionario: "Carlos Souza", treinamento: "NR-35 — Trabalho em Altura", dataEmissao: "2026-03-11T08:00:00.000Z", dataValidade: "2027-03-11T08:00:00.000Z", status: "valido" },
  { id: 2, numero: "CERT-2026-0002", funcionario: "Maria Oliveira", treinamento: "NR-35 — Trabalho em Altura", dataEmissao: "2026-03-11T08:00:00.000Z", dataValidade: "2027-03-11T08:00:00.000Z", status: "valido" },
  { id: 3, numero: "CERT-2026-0003", funcionario: "Carlos Souza", treinamento: "CIPA — Comissão Interna de Prevenção", dataEmissao: "2026-02-06T08:00:00.000Z", dataValidade: "2027-02-06T08:00:00.000Z", status: "valido" },
  { id: 4, numero: "CERT-2025-0045", funcionario: "João Ferreira", treinamento: "NR-06 — Equipamentos de Proteção Individual", dataEmissao: "2025-08-10T08:00:00.000Z", dataValidade: "2026-08-10T08:00:00.000Z", status: "expirado" },
  { id: 5, numero: "CERT-2026-0004", funcionario: "Ana Lima", treinamento: "CIPA — Comissão Interna de Prevenção", dataEmissao: "2026-02-06T08:00:00.000Z", dataValidade: "2027-02-06T08:00:00.000Z", status: "valido" },
  { id: 6, numero: "CERT-2026-0005", funcionario: "Roberto Mendes", treinamento: "NR-35 — Trabalho em Altura", dataEmissao: "2026-03-11T08:00:00.000Z", dataValidade: "2027-03-11T08:00:00.000Z", status: "cancelado" },
];

export const mockAuditorias = [
  { id: 1, entidade: "certificados", entidadeId: 1, acao: "criacao", usuario: "Carlos Souza", detalhe: "Certificado CERT-2026-0001 emitido para Carlos Souza (NR-35)", realizadoEm: "2026-03-11T08:01:00.000Z" },
  { id: 2, entidade: "treinamentos", entidadeId: 2, acao: "atualizacao", usuario: "Carlos Souza", detalhe: "Status atualizado para em_andamento", realizadoEm: "2026-09-01T08:05:00.000Z" },
  { id: 3, entidade: "funcionarios", entidadeId: 8, acao: "criacao", usuario: "Carlos Souza", detalhe: "Funcionário Patricia Santos cadastrado", realizadoEm: "2026-08-15T10:30:00.000Z" },
  { id: 4, entidade: "treinamentos", entidadeId: 4, acao: "atualizacao", usuario: "Maria Oliveira", detalhe: "Status atualizado para cancelado", realizadoEm: "2026-07-04T16:20:00.000Z" },
  { id: 5, entidade: "instrutores", entidadeId: 3, acao: "criacao", usuario: "Carlos Souza", detalhe: "Instrutor Carla Nascimento cadastrado", realizadoEm: "2026-06-22T09:15:00.000Z" },
  { id: 6, entidade: "certificados", entidadeId: 6, acao: "atualizacao", usuario: "Maria Oliveira", detalhe: "Certificado CERT-2026-0005 cancelado", realizadoEm: "2026-05-10T14:00:00.000Z" },
];
