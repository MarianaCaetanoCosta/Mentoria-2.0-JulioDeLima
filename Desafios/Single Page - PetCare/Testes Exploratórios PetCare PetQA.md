# Testes exploratórios — PetCare + PetQA

## Objetivo

Explorar os principais fluxos da aplicação PetCare + PetQA, registrar comportamentos inesperados e verificar se os dados e relacionamentos permanecem consistentes durante o uso. Este roteiro foi elaborado para a aplicação web local descrita neste projeto; não é uma suíte automatizada.

## Escopo

- Visão geral e indicadores.
- Cadastro, pesquisa, edição e exclusão de tutores, animais, clínicas e lembretes.
- Agendamentos, transições de atendimento e regras de horário.
- Financeiro, pagamentos parciais e saldo.
- Persistência local, exportação e restauração de backup.
- Navegação para Backup e Tutorial pelo Menu principal.
- Uso do tutorial e ausência do atalho de agendamento na Visão geral.
- Links de compartilhamento de lembretes e uso em telas menores.

Fora do escopo: envio automático de mensagens, pagamentos processados por gateway, sincronização entre usuários/dispositivos e testes de backend (a aplicação funciona localmente no navegador).

## Preparação

1. Abra `PetCare_PetQA_Gestao_Inteligente.html` em um navegador atualizado.
2. Use uma cópia de teste, sem dados pessoais reais. Os registros ficam no armazenamento local do navegador.
3. Antes de iniciar, confira se a base pode ser limpa. Se precisar preservar os dados existentes, exporte um backup e não os exclua.
4. Cadastre dados fictícios reutilizáveis:
   - Tutor: Marina QA; telefone fictício; e-mail `marina.qa@example.test`.
   - Animal: Mel; espécie Gato; vinculado a Marina QA.
   - Clínica: Clínica Exemplo; telefone e endereço fictícios.
5. Para explorar fluxos financeiros, crie agendamentos de teste em datas convenientes e use valores pequenos, por exemplo R$ 100,00.
6. Registre navegador, versão, tamanho da janela, dados utilizados, resultado, evidência e horário de cada observação.

## Como executar e registrar

Explore cada missão sem se limitar aos passos sugeridos: varie dados, volte etapas, cancele diálogos, atualize a página e observe os efeitos nas telas relacionadas. Os cenários abaixo são pontos de partida.

Use um status por cenário:

- **A executar** — ainda não avaliado.
- **Passou** — comportamento observado atende ao resultado esperado.
- **Falhou** — comportamento observado diverge do esperado.
- **Bloqueado** — não foi possível executar; registre o motivo.

Não marque nenhum cenário como executado sem realizá-lo. Ao encontrar um problema, anote os passos exatos para reproduzi-lo, o resultado observado e o impacto.

## Missões exploratórias

### M1 — Cadastros e relacionamentos

**Objetivo:** verificar os cadastros e a integridade dos vínculos entre tutores, animais, clínicas e lembretes.

**Riscos:** registros incompletos, relações incorretas, perda de dados ao editar ou excluir.

| ID | Exploração | Resultado esperado | Status |
|---|---|---|---|
| CAD-01 | Tente cadastrar um animal sem tutor e depois crie um tutor e cadastre o animal. | A aplicação orienta a cadastrar o tutor primeiro; depois permite selecionar o responsável e mostra o vínculo correto. | A executar |
| CAD-02 | Cadastre tutor, animal e clínica com os campos obrigatórios preenchidos; use acentos e caracteres comuns nos nomes e observações. | Os registros são salvos e exibidos com os dados corretos nas listas e seletores relacionados. | A executar |
| CAD-03 | Tente salvar tutor, animal, clínica e lembrete sem seus respectivos campos obrigatórios. | O formulário impede os campos obrigatórios vazios e informa o que precisa ser preenchido. | A executar |
| CAD-04 | Edite um tutor e um animal já vinculados; altere observações e dados opcionais. | As alterações são salvas no mesmo registro, sem duplicá-lo nem perder os vínculos. | A executar |
| CAD-05 | Pesquise tutor por nome, telefone e e-mail; animal por nome, espécie, raça ou tutor; clínica por nome, telefone ou endereço. | A lista exibe os registros correspondentes à busca e volta a mostrar todos ao limpar o campo. | A executar |
| CAD-06 | Tente excluir um tutor com animal vinculado, um animal com lembrete/agendamento e uma clínica com lembrete/agendamento. | A exclusão é impedida e a mensagem identifica o vínculo que protege o registro. | A executar |
| CAD-07 | Exclua um registro sem dependências; teste cancelar e confirmar o diálogo. | Cancelar mantém o registro; confirmar o remove e a lista é atualizada. | A executar |
| CAD-08 | Informe texto com acentos, apóstrofo e caracteres como `<` e `>` em campos de observação e nome. | O conteúdo é exibido como texto, sem quebrar a interface ou alterar a estrutura da página. | A executar |

### M2 — Lembretes e comunicação

**Objetivo:** explorar criação, ordenação, conclusão e compartilhamento de lembretes de cuidado.

**Riscos:** lembrete associado ao animal errado, estado inconsistente ou mensagem com contato incorreto.

| ID | Exploração | Resultado esperado | Status |
|---|---|---|---|
| LEM-01 | Crie lembretes de vacina, consulta e medicamento para animais diferentes; inclua e omita a clínica opcional. | Cada lembrete fica ligado ao animal escolhido, exibe o tipo e a data e aceita clínica opcional. | A executar |
| LEM-02 | Tente salvar sem título, animal, tipo ou data. | O formulário impede o salvamento enquanto faltar campo obrigatório. | A executar |
| LEM-03 | Cadastre lembretes em datas fora de ordem e pesquise por parte do título, tipo e nome do animal. | A lista é apresentada por data e a busca retorna os registros correspondentes. | A executar |
| LEM-04 | Conclua um lembrete, atualize a página e reabra-o. | O estado concluído/pendente permanece após recarregar e a ação disponível reflete o estado atual. | A executar |
| LEM-05 | Com tutor contendo telefone e e-mail, acione WhatsApp e e-mail sem enviar a mensagem. Repita com contato ausente. | Os links abrem o aplicativo/site externo com destinatário e texto preenchidos quando há contato; não há envio automático. Sem contato, a ação correspondente não é oferecida. | A executar |

### M3 — Agenda, atendimento e financeiro

**Objetivo:** seguir um atendimento desde o agendamento até a quitação e verificar estados e cálculos.

**Riscos:** transição indevida de estado, saldo incorreto ou histórico financeiro inconsistente.

| ID | Exploração | Resultado esperado | Status |
|---|---|---|---|
| AGE-01 | Tente criar um agendamento antes de cadastrar animal e clínica; depois cadastre ambos e preencha animal, clínica, serviço, data e horário. | A aplicação orienta os pré-requisitos e permite salvar o agendamento quando os dados relacionados existem. | A executar |
| AGE-02 | Pesquise agendamentos por pet, serviço e status; alterne o filtro de status. | A busca e o filtro mostram apenas os registros compatíveis; limpar ambos restaura a lista completa. | A executar |
| AGE-03 | Crie dois agendamentos para o mesmo animal, data e horário. Observe o resultado sem presumir uma regra de conflito. | Registre se a aplicação aceita ou rejeita a duplicidade. O código atual não evidencia uma validação de conflito; a regra de negócio precisa ser confirmada com o responsável pelo produto. | A executar |
| AGE-04 | Crie um agendamento para amanhã, inicie o atendimento e tente concluí-lo imediatamente. Depois, repita quando a data e o horário agendados já tiverem chegado; experimente informar uma data de conclusão anterior e uma futura. | Antes do horário agendado, a conclusão é bloqueada com uma mensagem indicando quando poderá ocorrer e o atendimento permanece em andamento, sem alterar histórico ou financeiro. Após o horário, a conclusão é permitida; datas anteriores ao agendamento ou futuras são rejeitadas. | A executar |
| AGE-05 | Conclua um atendimento com valor de R$ 100,00 e confira Visão geral, Agendamentos e Financeiro antes de registrar pagamento. | O atendimento aparece como concluído; o valor compõe serviços concluídos e saldo a receber, mas não recebimentos líquidos/faturamento. | A executar |
| FIN-01 | Registre um pagamento parcial de R$ 40,00 por Pix em um atendimento de R$ 100,00. | O total recebido passa a R$ 40,00, o saldo fica R$ 60,00 e a movimentação exibe forma e data. | A executar |
| FIN-02 | Registre o restante de R$ 60,00; tente registrar valor zero, negativo e valor maior que o saldo. | O pagamento válido quita o atendimento; valores inválidos ou acima do saldo são impedidos. | A executar |
| FIN-03 | Confira total de serviços concluídos, quantidade, ticket médio, saldo a receber e recebimentos líquidos após cada pagamento/estorno. | Os indicadores correspondem aos valores lançados; recebimentos menos estornos formam o total líquido e valores ainda não recebidos não são tratados como pagamento. | A executar |
| FIN-04 | Tente excluir e reabrir um atendimento com pagamento registrado. | A aplicação protege o histórico de pagamentos e informa que a ação não é permitida. | A executar |
| FIN-05 | Cancele um agendamento sem pagamento e depois tente iniciar atendimento de um cancelado. | O cancelamento pede confirmação; após confirmado, o status é atualizado e o fluxo não deve apresentar o registro como atendimento aberto. | A executar |
| FIN-06 | Conclua um atendimento sem pagamento e acione Anular; tente enviar sem motivo e depois informe um motivo fictício. Confira histórico, agendamentos, indicadores e relatórios. | Sem motivo, a anulação é recusada. Com motivo, o registro permanece no histórico com status, motivo e data da anulação, deixa de compor serviços concluídos/saldo e não pode ser editado ou excluído. | A executar |
| FIN-07 | Conclua um atendimento, registre um ou mais pagamentos parciais e tente anulá-lo. Registre um estorno parcial, tente ultrapassar o saldo estornável e tente registrar sem confirmar a devolução; depois estorne integralmente cada pagamento e anule com motivo. | A anulação é bloqueada enquanto houver recebimento líquido. Estornos ficam vinculados ao pagamento original e não excedem seu valor. Sem confirmação da devolução já realizada, o estorno não é registrado. Após estorno integral, é possível anular; histórico e movimentos financeiros permanecem, enquanto serviços ativos, saldo e recebimentos líquidos refletem os ajustes. | A executar |
| FIN-08 | Registre um estorno em um pagamento sem efetuar a devolução externamente. | O texto deixa claro que o aplicativo não transfere dinheiro e exige confirmação de que a devolução já ocorreu; não use essa confirmação como prova financeira independente. | A executar |

### M4 — Persistência, backup e usabilidade

**Objetivo:** verificar recuperação dos dados e uso das principais telas em condições usuais.

**Riscos:** perda de registros, restauração destrutiva não confirmada e ações inacessíveis.

| ID | Exploração | Resultado esperado | Status |
|---|---|---|---|
| BAK-01 | Cadastre dados relacionados, recarregue a página e navegue entre telas. | Os dados continuam disponíveis na mesma origem e navegador, com os vínculos e indicadores preservados. | A executar |
| BAK-02 | Exporte um backup JSON e confira se contém as coleções de tutores, animais, clínicas, lembretes, agendamentos, pagamentos e estornos. | O JSON exportado contém os dados atuais e os vínculos dos estornos aos pagamentos originais. | Passou — conteúdo JSON e nome `.json` verificados; abertura do download também coberta por BAK-06. |
| BAK-03 | Importe backup válido com estorno; confirme a substituição. Depois importe outro e cancele a confirmação. | A restauração mantém estornos e vínculos corretos; cancelar preserva a base atual. | Passou |
| BAK-04 | Tente importar JSON malformado, estrutura sem coleções obrigatórias, tipo incorreto em `pagamentos`/`estornos` e estorno acima do valor do pagamento. | A validação mostra erro antes da confirmação e mantém os dados atuais intactos. | Passou |
| BAK-05 | Importe backup antigo sem as coleções `pagamentos` e `estornos`, além de backup com pagamentos e sem `estornos`. | A restauração é aceita após confirmação; coleções ausentes ficam vazias e os pagamentos existentes são preservados. | Passou |
| UX-01 | Use navegação, diálogos, formulários, pesquisa e tabelas com teclado; repita em viewport estreito (por exemplo, 360 px). | As ações principais permanecem compreensíveis e utilizáveis; registre foco ausente, sobreposição, corte ou rolagem horizontal inesperada. | A executar |
| UX-02 | Abra e feche formulários e confirme/cancele exclusões repetidamente; atualize a página entre operações. | Diálogos e mensagens fecham corretamente, sem estado residual nem ações duplicadas. | A executar |
| UX-03 | Abra cada diálogo (cadastro, recebimento, finalização, anulação e estorno) por teclado; confira o nome anunciado, a semântica modal, o foco inicial, a navegação por Tab, o fechamento com Escape e o destino do foco ao fechar. | Cada diálogo tem seu título como nome acessível e é anunciado como modal; o foco inicia dentro do diálogo, não escapa para o conteúdo de fundo e retorna ao acionador ao fechar (ou ao conteúdo principal se o acionador foi removido após salvar). | A executar |
| UX-04 | Abra os formulários de tutor, animal, clínica, lembrete, agendamento, recebimento e finalização; inspecione os campos por `id` e `name`. | Não há IDs duplicados nem nomes repetidos entre os controles de formulário; os IDs seguem seletores estáveis e os nomes identificam o formulário e o tipo de registro. | A executar |
| REL-01 | Abra Relatórios e percorra Total, Tutores, Animais, Clínicas, Agendamentos, Lembretes e Financeiro; repita a navegação das abas com setas, Home e End. | Cada categoria mostra seus registros e campos relacionados; Total apresenta todos os grupos e indicadores consolidados. A aba selecionada e o conteúdo exibido permanecem sincronizados. | A executar |
| REL-02 | Crie ou altere um registro e confira a categoria correspondente e a visão Total; confira serviços concluídos e pagamentos parciais no relatório financeiro. | Os relatórios refletem os dados atuais e os cálculos separam valor de serviços, valor recebido e saldo a receber. | A executar |
| REL-03 | Baixe o PDF de uma categoria específica e depois o PDF Total; confira os arquivos e imprima uma categoria pela caixa de impressão. | Cada clique em Baixar PDF baixa um arquivo PDF separado com a categoria escolhida (ou todas as seções no Total), título, data de geração e tabelas legíveis. Imprimir relatório abre a caixa de impressão do navegador; menus, abas e botões não aparecem na página impressa. | A executar |
| BAK-06 | No Menu principal, abra Backup e verifique as ações de exportar e restaurar; escolha exportar e depois abra restaurar sem selecionar arquivo. | Backup fica no Menu principal; exportar continua baixando o JSON e restaurar continua abrindo o seletor de arquivos. | Passou |
| BAK-07 | Cancele a confirmação da restauração e simule falha de gravação no armazenamento local. | Cancelar não substitui os dados; falha de gravação mostra erro e mantém os dados e a tela no estado anterior. | Passou |
| NAV-01 | No Menu principal, abra Backup e depois Tutorial; volte à Visão geral. | Cada opção abre sua página correspondente e destaca a opção ativa; os dois botões de backup aparecem na página Backup. | Passou |
| NAV-02 | Abra Visão geral e confira os controles de ação exibidos no cabeçalho da tela. | A tela apresenta indicadores e informações gerais sem o botão de atalho "+ Novo agendamento"; agendamentos continuam disponíveis pela opção própria no Menu principal. | Passou |
| TUT-01 | Abra Tutorial e percorra as orientações sobre cadastros, lembretes, agendamentos, financeiro, relatórios e backup. | O tutorial orienta os fluxos e limitações atuais sem prometer sincronização, envio automático de mensagens ou processamento de pagamentos. | Passou |

## Registro de sessão e defeitos

Copie esta ficha para cada sessão:

| Campo | Registro |
|---|---|
| Data e hora | |
| Pessoa testadora | |
| Navegador e versão | |
| Sistema operacional | |
| Tamanho da viewport | |
| Missões/cenários executados | |
| Resultado geral | |
| Observações e evidências | |

Para cada defeito observado, registre:

- Identificador e título curto.
- Cenário e dados usados (sem dados pessoais reais).
- Pré-condições e passos para reproduzir.
- Resultado esperado e resultado observado.
- Impacto para tutor, pet shop ou integridade dos dados.
- Frequência e evidência (captura sem dados sensíveis, se possível).
- Severidade e prioridade propostas, sujeitas à triagem da equipe.

## Notas de escopo e interpretação

- Este roteiro descreve o comportamento funcional pretendido para exploração; não afirma que os cenários foram executados nem que a aplicação passou.
- A aplicação guarda dados no `localStorage` do navegador e não sincroniza entre dispositivos.
- WhatsApp e e-mail são links externos; a pessoa usuária revisa e envia a mensagem no aplicativo aberto.
- A aplicação bloqueia a conclusão antes da data e do horário agendados. A aceitação de horários duplicados permanece como regra de negócio a confirmar.
- Atendimentos concluídos são anulados, não excluídos nem reabertos. A anulação exige motivo; recebimentos devem ser devolvidos fora do sistema e estornados integralmente antes da anulação. O registro dos estornos no protótipo não realiza movimentação bancária.
- Se uma regra de negócio não estiver definida, registre a dúvida como questão para o responsável pelo produto em vez de classificar automaticamente como defeito.
