# Documento de entrega — Testes PetCare + PetQA

**Data:** 21/10/2026
**Produto avaliado:** PetCare + PetQA — Gestão Inteligente
**Aplicação:** [PetCare_PetQA_Gestao_Inteligente.html](./PetCare_PetQA_Gestao_Inteligente.html)

## 1. Membros do grupo

- Kaique Do Prado Demucio
- Laiz Ines Da Rocha
- Mariana Caetano Costa
- Mayara Bernardo Ramos Epifanio Nogueira
- Weberth Silva Machado

## 2. Técnicas de teste

Para este produto, recomenda-se combinar:

1. **Teste exploratório baseado em risco:** percorrer fluxos reais e variar os dados, priorizando integridade de cadastros, histórico de atendimentos, valores financeiros e recuperação de dados.
2. **Teste funcional com cenários e casos de teste:** verificar pré-condições, ações e resultados esperados nos cadastros, lembretes, agenda, financeiro, relatórios e backup.
3. **Particionamento de equivalência e análise de valores-limite:** testar campos obrigatórios, valores válidos e inválidos, pagamentos parciais, limites de estorno e datas.
4. **Teste de transição de estado:** conferir os caminhos de agendamento, atendimento, conclusão, cancelamento, anulação e estorno, inclusive tentativas de transição não permitidas.
5. **Regressão, usabilidade, responsividade e acessibilidade:** repetir os fluxos corrigidos e avaliar navegação, mensagens, teclado, foco, viewport estreito e tecnologias assistivas.

Os testes desta entrega foram manuais, em navegador, com dados fictícios. A automação não faz parte do escopo definido para este exercício.

## 3. Artefatos de teste

- **Plano de testes:** [Planos de Testes.md](<./Planos%20de%20Testes.md>) — escopo, riscos, critérios e cenários principais.
- **Roteiro exploratório:** [Testes Exploratórios PetCare PetQA.md](<./Testes%20Explorat%C3%B3rios%20PetCare%20PetQA.md>) — missões, passos e campos para registrar a sessão.
- **Relatório de execução e defeitos:** este documento para os resultados da rodada atual; [Relatorio-Teste-Exploratorio-PetQA2.md](./Relatorio-Teste-Exploratorio-PetQA2.md) para verificações e achados anteriores.
- **Dados de teste:** registros fictícios, sem informações pessoais reais.
- **Evidências:** anotações dos resultados, ambiente, passos para reprodução e, quando necessário, capturas sem dados pessoais.
- **Backup de teste:** JSON fictício para validar exportação e restauração em ambiente descartável.

## 4. Execução dos testes

### Ambiente

- Navegador integrado baseado em Chromium; versão não exposta pela ferramenta.
- Sistema operacional: Windows.
- Viewport estreito: 375 CSS px de largura observada.
- Dados sintéticos usados: tutor “Marina QA” e animal “Mel QA”.

### Resultados desta rodada

| ID     | Verificação                                                                      | Resultado        | Observação                                                                                                                    |
| ------ | ---------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| ENT-01 | Abrir as dez opções do menu e confirmar que cada tela correspondente é exibida. | **Passou** | Visão geral, Tutores, Animais, Clínicas, Lembretes, Agendamentos, Financeiro, Relatórios, Backup e Tutorial foram acessados. |
| ENT-02 | Tentar salvar um tutor sem preencher o nome obrigatório.                          | **Passou** | O campo está marcado como obrigatório; o envio foi bloqueado e o diálogo permaneceu aberto.                                  |
| ENT-03 | Cadastrar tutor e animal vinculando o animal ao tutor.                             | **Passou** | Os registros foram salvos e a lista do animal mostrou “Marina QA” como responsável.                                          |
| ENT-04 | Pesquisar tutor por nome e limpar a busca.                                         | **Passou** | A busca encontrou “Marina QA”; limpar o campo restaurou o registro à lista.                                                  |
| ENT-05 | Verificar a página em viewport estreito.                                          | **Passou** | Com largura de 375 CSS px, a largura do documento e do corpo permaneceu em 375 px, sem rolagem horizontal.                      |

**Resumo:** 5 verificações passaram; 0 falharam; 0 bloqueadas. Esta é uma rodada pontual, não uma aprovação completa do produto.

### Não executado nesta rodada

Os fluxos financeiros e de anulação/estorno, conclusão antecipada de atendimento, importação/exportação de backup, geração e impressão de PDF, navegação completa por teclado e avaliação com leitor de tela não foram repetidos nesta sessão. Permanecem fora do resultado atual, mesmo quando há evidência de execuções pontuais anteriores no [relatório anterior](./Relatorio-Teste-Exploratorio-PetQA2.md).

## 5. Relato de defeitos, riscos e pendências

### Defeitos encontrados nesta rodada

**Nenhum defeito novo foi reproduzido** nos cinco testes executados. Isso não significa ausência de defeitos em áreas não cobertas nesta sessão.

### Achados e pendências já registrados

| ID     | Classificação                                                                  | Situação conhecida                                                                                                   | Próxima ação                                                                                  |
| ------ | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| DEF-01 | Defeito anterior — conclusão antes do horário agendado                        | **Corrigido no código**, segundo o relatório anterior; não repetido nesta rodada.                             | Reexecutar como regressão no fluxo de atendimento.                                              |
| DEF-02 | Defeito anterior — remoção de atendimento concluído sem preservar histórico | **Mitigado no código** por anulação com motivo e preservação do registro, segundo o relatório anterior.    | Revalidar junto com os fluxos financeiro e de estorno.                                           |
| DEF-03 | Defeito anterior — semântica/foco de diálogos                                 | **Correção registrada no código**; não houve auditoria formal com leitor de tela nesta rodada.               | Avaliar com teclado e tecnologia assistiva.                                                      |
| DEF-04 | Limitação — estorno não processa a devolução financeira                    | O sistema registra o estorno, mas a devolução ocorre fora dele; não há integração ou comprovação de pagamento. | Manter a confirmação explícita e tratar integração como requisito separado, se necessária. |
| RSK-01 | Risco — dados locais no navegador                                               | Os dados podem ser perdidos ao limpar o armazenamento e não são sincronizados; o backup é manual.                   | Reforçar exportação e avaliar armazenamento central para uso operacional/multiusuário.       |
| REQ-01 | Regra de negócio pendente — agendamentos duplicados                            | Não há regra confirmada para dois agendamentos no mesmo horário; não classificado como defeito.                    | Definir se deve bloquear, alertar ou permitir e então atualizar os testes.                      |

Os achados históricos e seus detalhes estão no [Relatorio-Teste-Exploratorio-PetQA2.md](./Relatorio-Teste-Exploratorio-PetQA2.md). Limitações e questões sem requisito confirmado não foram contabilizadas como defeitos reproduzidos nesta sessão.

## 6. Cinco principais aprendizados

1. **Plano não é evidência de execução:** um cenário só deve ser marcado como aprovado depois de ser executado e observado.
2. **Priorizar pelo impacto ajuda a encontrar problemas relevantes:** perda de dados, alterações de histórico e cálculos financeiros merecem mais atenção que detalhes cosméticos.
3. **Testar estados e transições evita inconsistências:** validar apenas o cadastro não basta; é importante tentar concluir, cancelar ou anular nos momentos permitidos e proibidos.
4. **Backup local não equivale a armazenamento seguro ou compartilhado:** dados em `localStorage` dependem do navegador e de cópias manuais; isso precisa estar claro para quem usa o sistema.
5. **Acessibilidade e responsividade exigem verificações próprias:** uma tela que cabe em viewport estreito ainda precisa de avaliação de teclado, foco, nomes acessíveis e leitor de tela.

## 7. Referências e próximos passos

1. Repetir os cenários financeiros, de atendimento e backup em uma sessão registrada, usando apenas dados fictícios.
2. Decidir a regra para conflitos de horário antes de classificar agendamentos duplicados como defeito.
3. Manter os estados **A executar** ou **Bloqueado** nos cenários que ainda não foram validados.
