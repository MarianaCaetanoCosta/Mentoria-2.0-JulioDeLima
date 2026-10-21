# Plano de testes — PetCare + PetQA

## 1. Identificação

- **Produto:** PetCare + PetQA — Gestão Inteligente
- **Unidade sob teste:** `PetCare_PetQA_Gestao_Inteligente.html`
- **Tipo:** testes manuais funcionais, exploratórios, de interface e de regressão
- **Abordagem:** baseada em riscos; validar fluxos completos e observar dados relacionados
- **Automação:** não faz parte deste plano

## 2. Objetivos

- Confirmar criação, edição, pesquisa e exclusão segura dos cadastros.
- Verificar relacionamentos entre tutores, animais, clínicas, lembretes e agendamentos.
- Validar transições do atendimento e bloqueios de conclusão antecipada.
- Conferir recebimentos líquidos de estornos, serviços concluídos e saldos sem misturar conceitos.
- Avaliar relatórios, impressão, geração de PDF e backup/restauração.
- Verificar navegação, tutorial, semântica acessível e comportamento responsivo.

## 3. Escopo

### Incluído

- Visão geral e navegação do Menu principal.
- Tutores, animais, clínicas e lembretes.
- Agendamentos, histórico/financeiro e recebimentos parciais.
- Relatórios por tutor, animal, clínica, agendamento, lembrete e financeiro, além de Total.
- Download PDF, diálogo nativo de impressão, exportação e restauração JSON.
- Modais, campos identificáveis por `id`/`name`, teclado e viewport estreito.

### Fora do escopo

- Serviços remotos, backend, autenticação e concorrência entre usuários.
- Sincronização entre dispositivos ou navegadores.
- Envio automático de WhatsApp/e-mail.
- Transações processadas por gateway de pagamento.
- Compatibilidade certificada com todos os navegadores e leitores de tela.

## 4. Ambiente e preparação

1. Abrir a cópia local do HTML em um navegador atualizado.
2. Usar perfil de navegador e dados de teste, sem informações pessoais reais.
3. Cadastrar tutor, animal e clínica fictícios antes de testar lembretes/agendamentos.
4. Para testes financeiros, usar valores pequenos e registrar cada pagamento de forma controlada.
5. Antes de restaurar dados, exportar um backup e confirmar que o arquivo usado é descartável.
6. Registrar navegador, versão, sistema operacional e viewport.

## 5. Critérios de entrada

- Arquivo HTML disponível e carregado sem erro visível.
- Base de teste identificada e sem dados que precisem ser preservados.
- Dados pré-requisitos criados para os cenários que dependem de vínculos.

## 6. Critérios de saída

- Todos os cenários selecionados têm status e observações preenchidos.
- Achados de alto impacto têm passos de reprodução e evidência segura.
- Nenhuma falha de regressão crítica permanece sem registro.
- Cenários não executados continuam marcados como **A executar** ou **Bloqueado**; não são contabilizados como aprovados.

## 7. Priorização por risco

| Prioridade | Risco | Exemplos |
|---|---|---|
| Alta | Integridade de histórico ou dinheiro | conclusão antes do horário, saldo incorreto, anulação sem motivo ou sem estorno integral |
| Alta | Perda ou substituição de dados | restauração de backup, armazenamento local, exclusão de registros |
| Média | Relacionamentos incorretos | animal/tutor, lembrete/animal, atendimento/clínica |
| Média | Relatórios divergentes | totais, filtros, categorias e PDF diferentes dos dados atuais |
| Média | Barreiras de uso | foco em diálogos, identificação de campos, navegação por teclado |
| Baixa | Apresentação e conteúdo | rótulos, alinhamento, mensagens e comportamento em telas menores |

## 8. Cenários principais

| ID | Cenário | Resultado esperado |
|---|---|---|
| PLAN-01 | Navegar por cada opção do Menu principal, incluindo Backup e Tutorial. | Cada opção abre a tela correspondente; Backup oferece exportar/restaurar; o Tutorial explica os fluxos reais. |
| PLAN-02 | Cadastrar tutor, animal e clínica, depois editar e pesquisar os registros. | Dados e vínculos permanecem corretos; buscas retornam resultados compatíveis. |
| PLAN-03 | Tentar excluir registros com dependências. | Exclusão protegida com mensagem; registros relacionados permanecem íntegros. |
| PLAN-04 | Criar lembrete e testar conclusão, busca e links de compartilhamento. | Lembrete mantém animal/data/estado corretos; links não enviam mensagens sem ação do usuário. |
| PLAN-05 | Criar agendamento futuro, iniciar e tentar concluir antes do horário. | Conclusão antecipada é bloqueada, sem criar histórico ou valor financeiro. |
| PLAN-06 | Concluir atendimento em horário permitido e registrar recebimentos parciais. | Valor do serviço, recebido líquido de estornos e saldo são calculados e exibidos separadamente. |
| PLAN-07 | Anular atendimento concluído sem pagamento e tentar excluir/editar o registro anulado. | Motivo é obrigatório; o atendimento permanece no histórico, sai dos indicadores ativos e não pode ser editado ou excluído. |
| PLAN-08 | Estornar pagamentos de um atendimento concluído e tentar anulá-lo antes e depois do estorno integral. | Anulação é bloqueada enquanto houver saldo recebido; estornos parciais não excedem cada pagamento e precisam confirmar devolução já realizada; após estorno integral, anulação exige motivo e preserva os movimentos financeiros. |
| PLAN-09 | Navegar pelos relatórios e gerar PDF de categoria e Total. | Cada seleção exibe o relatório correto; PDFs são arquivos separados e imprimíveis. |
| PLAN-10 | Exportar e restaurar backups válidos e inválidos em base descartável; incluir estornos, backup antigo, cancelamento e falha simulada de armazenamento. | Exportação gera JSON com estornos/vínculos; coleção inválida ou estorno acima do pagamento é recusado antes da confirmação; cancelar e falhas de gravação preservam os dados; backup antigo sem coleções financeiras restaura listas vazias. |
| PLAN-11 | Usar diálogos e navegação com teclado e em viewport estreito. | Foco e semântica compreensíveis; controles permanecem operáveis e conteúdo utilizável. |

## 9. Rastreamento

Use o documento [Testes Exploratórios PetCare PetQA.md](./Testes%20Explorat%C3%B3rios%20PetCare%20PetQA.md) para passos detalhados, registro de sessão e status por cenário. Registre somente evidências realmente observadas na execução.

## 10. Premissas conhecidas

- Os dados ficam no armazenamento local do navegador.
- A exportação é um arquivo JSON; a restauração substitui os dados atuais após confirmação.
- A coleção de estornos é compatível com backups anteriores sem esse campo; quando há recebimentos, a anulação só é permitida após registrar estorno integral de cada pagamento.
- Pagamentos são lançamentos manuais; o aplicativo não cobra o cliente.
- O disparo de links de mensagem é externo e manual.
- Horários duplicados e demais regras de negócio não especificadas devem ser registrados como dúvida, não presumidos como defeito.
