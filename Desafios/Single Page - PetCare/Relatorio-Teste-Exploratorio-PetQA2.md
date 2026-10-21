# Relatório de teste exploratório — PetCare + PetQA

## Identificação

- **Produto:** PetCare + PetQA — Gestão Inteligente
- **Data de atualização:** 20/10/2026
- **Artefato avaliado:** `PetCare_PetQA_Gestao_Inteligente.html`
- **Escopo:** reconciliação dos achados do relatório anterior com as correções presentes no código atual e verificações pontuais documentadas.
- **Limite:** esta atualização documental não é uma nova campanha completa de testes. Resultados anteriores são identificados como históricos e não são apresentados como testes atuais.

## Resumo executivo

O relatório anterior descrevia exclusão de atendimento concluído após confirmação. Essa abordagem foi substituída no código por anulação com motivo obrigatório, preservação no histórico e exigência de estorno integral dos pagamentos antes da anulação. Os fluxos de anulação, estorno e backup foram exercitados em navegador com dados sintéticos; não equivalem a uma campanha completa de regressão.

O risco de dados armazenados apenas no navegador **permanece**: a aplicação não tem servidor nem sincronização. O backup JSON é uma medida de recuperação manual, não substitui armazenamento central. Os registros de anulação e estorno também são locais e podem ser alterados ou apagados junto com os dados do navegador; não constituem trilha inviolável. O registro de estorno exige confirmação de devolução já realizada, mas não processa nem comprova a transferência. Além disso, o PDF anterior dizia que horários duplicados eram bloqueados, mas o código atual não contém validação de conflito. Como a regra de negócio não está definida, isso deve ser confirmado antes de classificar como defeito.

## Achados anteriores e estado atual

| ID | Achado anterior | Estado atual | Evidência e observação |
|---|---|---|---|
| DEF-01 — P2 | Conclusão permitida antes da data/hora agendadas. | **Corrigido no código.** | A abertura da finalização e o envio do formulário verificam data e hora agendadas. Tentativa antecipada é recusada; também há validação da data de conclusão. O comportamento foi verificado anteriormente no navegador; repetir como regressão antes de nova liberação. |
| DEF-02 — P2 | Exclusão de atendimento concluído sem preservar histórico e efeitos financeiros. | **Mitigado no código e verificado nos fluxos funcionais exercitados.** | Atendimentos concluídos não podem ser excluídos, editados ou reabertos. A ação Anular exige motivo e mantém o registro no histórico, fora dos indicadores de serviços concluídos e saldo a receber. Em navegador, foi verificado que a anulação fica bloqueada com recebimento líquido, que estornos parciais vinculam-se a cada pagamento e que, após estorno integral, a anulação exige motivo e preserva o histórico. A validação de estorno acima do pagamento também foi exercitada na restauração de backup; a proteção do formulário de estorno do Financeiro deve ser coberta em regressão. |
| DEF-04 — P2 | Estorno de pagamento não executa nem comprova a devolução financeira. | **Limitação explicitada; confirmação de registro verificada, não comprovação financeira.** | O diálogo avisa que a devolução deve ocorrer pelo meio de pagamento e exige confirmação antes de registrar o estorno. A interface recusou o envio sem confirmação no teste de navegador. Isso é uma declaração manual, não integração com gateway, comprovante nem auditoria inviolável. |
| DEF-03 — P3 | Diálogos sem semântica acessível e gerenciamento de foco. | **Corrigido no código.** | Os diálogos funcionais têm `role="dialog"`, `aria-modal="true"` e título associado. O código controla foco inicial e retorno ao fechar. Avaliação formal com leitor de tela/tecnologias assistivas permanece pendente. |
| RSK-01 — P2 condicional | Dados armazenados somente no navegador. | **Limitação/riscos residuais; não corrigido por backend.** | Os dados usam `localStorage`, não sincronizam entre dispositivos e podem ser removidos pelo navegador. Exportar backup JSON reduz o risco de perda, mas depende de exportação e guarda manual. Para uso operacional multiusuário, é necessário definir e implementar armazenamento central, controle de acesso e recuperação. |
| REQ-01 — pendente de regra | Agendamentos do mesmo horário. O PDF anterior afirmava que duplicidade era bloqueada. | **Afirmação anterior não confirmada no código atual.** | A validação de cadastro de agendamento não detecta conflito de animal/data/horário. A regra do produto (bloquear, alertar ou permitir) precisa ser decidida; até lá, não registrar como teste aprovado nem como defeito confirmado. |

## Verificações pontuais registradas

| Área | Resultado | Limite |
|---|---|---|
| Conclusão antecipada | Comportamento de bloqueio foi verificado anteriormente no navegador, mantendo o atendimento em andamento e sem criar pagamento. | Regressão na versão atual ainda recomendada. |
| Anulação e estorno | Fluxo exercitado no navegador com dados sintéticos: sem confirmação, o estorno não foi salvo; estorno de R$ 40,00 ficou vinculado ao primeiro pagamento; anulação foi bloqueada enquanto restava R$ 60,00; depois do estorno integral, motivo vazio foi recusado e o motivo informado foi persistido. | A confirmação não prova que a devolução foi efetivada. Valor excedente, data futura, restauração de backup e todas as combinações de pagamentos ainda precisam de teste. |
| Exclusão | Registro anulado permaneceu listado sem ações de editar/excluir; serviços ativos, saldo e recebimentos líquidos ficaram em zero no cenário sintético. | Teste de navegador foi pontual; armazenamento local não é trilha de auditoria imutável. |
| Diálogos | Semântica e foco foram adicionados; estrutura atual inspecionada no código. | Não equivale a uma auditoria com leitores de tela. |
| Relatórios e PDF gerado pela aplicação | As seis categorias e a visão Total foram percorridas; os PDFs gerados tinham tipo `application/pdf`, cabeçalho, xref e `%%EOF`. | Essa verificação é do gerador da aplicação e não comprova a legibilidade de todas as páginas em leitores de PDF. |
| Backup | Com dados sintéticos no navegador: importação e exportação do JSON preservaram estornos e vínculos; backup antigo sem coleções financeiras criou listas vazias; JSON malformado, estrutura incompleta, tipo financeiro incorreto e estorno acima do pagamento foram recusados antes da confirmação, sem alterar a base; cancelamento e falha simulada de `localStorage` mantiveram o estado anterior. | Testes pontuais, não campanha completa. O conteúdo/nome do JSON exportado foi inspecionado e o fluxo de download já havia sido percorrido em BAK-06; repetir em navegador e pasta de destino de produção antes de liberar. |
| Navegação e Tutorial | As 10 páginas do menu foram verificadas; Backup e Tutorial abriram; Visão geral não exibiu atalho de agendamento. | Verificação pontual de interface; não é teste completo de todos os fluxos. |
| JavaScript | Sintaxe do script incorporado verificada com `node --check` após extração do HTML. | Não substitui testes funcionais. |

## Disposição e próximos passos

1. Repetir `AGE-04`, `FIN-06`, `FIN-07`, `FIN-08` e `UX-03` em uma sessão exploratória registrada; incluir excesso de valor no formulário de estorno do Financeiro e múltiplos pagamentos do mesmo atendimento.
2. Decidir a regra para agendamentos duplicados e atualizar código e testes se o produto exigir bloqueio ou aviso.
3. Manter aviso e exportação de backup enquanto os dados permanecerem locais; avaliar backend, autenticação e auditoria protegida antes do uso multiusuário ou operacional.
4. Antes de uma liberação, repetir a exportação/restauração válida e inválida, incluindo pagamentos e estornos, no navegador e em uma pasta de destino real.
5. Registrar ambiente, evidências e resultados por sessão; não reutilizar resultados de avaliações anteriores como resultados atuais.

## Referência de testes

Consulte [Testes Exploratórios PetCare PetQA.md](./Testes%20Explorat%C3%B3rios%20PetCare%20PetQA.md) para passos por cenário e ficha de registro. Cenários não executados permanecem **A executar**.
