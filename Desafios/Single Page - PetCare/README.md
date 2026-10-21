# PetCare + PetQA — Gestão Inteligente

Aplicação web local para organizar tutores, animais, clínicas, lembretes, agendamentos e recebimentos de serviços pet. A interface e a lógica estão reunidas em um único arquivo HTML, sem etapa de compilação ou dependências externas.

## Arquivo principal

- `PetCare_PetQA_Gestao_Inteligente.html`: contém a estrutura da página, os estilos CSS e o JavaScript da aplicação.
- `README.md`: documentação funcional e técnica do projeto.
- `PetQA – Teste Exploratório.md` e `PetQA – Teste Exploratório.pptx`: missão e resumo da avaliação exploratória.
- `Planos de Testes.md` e `Planos de Testes.docx`: plano de testes manuais e critérios de cobertura.
- `Testes Exploratórios PetCare PetQA.md`: roteiro detalhado, cenários e registros de execução.
- `Relatorio-Teste-Exploratorio-PetQA2.md` e `Relatorio-Teste-Exploratorio-PetQA2.pdf`: achados, verificações pontuais, limitações e próximos passos.

Os arquivos Markdown são as fontes editáveis e de referência. O DOCX, o PPTX e o PDF foram reconciliados com o estado atual do PetCare + PetQA; os resultados neles descritos distinguem verificações pontuais de uma campanha completa, que ainda não foi executada. Não use achados de versões anteriores como resultados atuais.

## Como executar

1. Abra `PetCare_PetQA_Gestao_Inteligente.html` em um navegador atualizado.
2. Para usar, editar e salvar o código, abra o mesmo arquivo no VS Code.
3. Não é necessário instalar dependências ou executar um processo de build.

Os registros são salvos no armazenamento local (`localStorage`) do navegador e da origem usados para abrir o arquivo. Para continuar vendo os mesmos dados, abra a mesma cópia do HTML no mesmo navegador. Limpar os dados do navegador pode apagar os registros. Use o menu **Backup** antes de limpar os dados, trocar de navegador ou mover os dados para outro dispositivo.

## Funcionalidades

### Visão geral

- Exibe a quantidade de tutores, animais e atendimentos em aberto.
- Soma os pagamentos registrados no caixa, descontados os estornos.
- Mostra próximos agendamentos e lembretes pendentes.

### Tutorial de utilização

O **Tutorial** no Menu principal explica a navegação, a ordem recomendada de cadastros, os fluxos de lembretes e atendimentos, a consulta financeira e o uso de relatórios e backups.

### Cadastros

- **Tutores:** nome, telefone, e-mail e observações.
- **Animais:** nome, tutor responsável, espécie, raça, sexo, nascimento, peso e observações.
- **Clínicas:** nome, telefone, e-mail, endereço, contato e observações.
- **Lembretes:** título, animal, tipo, data, clínica opcional, observações e situação concluído/pendente.

As listas oferecem busca e ações de edição e exclusão. Registros vinculados não podem ser excluídos enquanto houver dependências. Por exemplo, um tutor associado a animais ou uma clínica associada a lembretes/agendamentos é protegida para evitar referências quebradas.

### Lembretes por WhatsApp e e-mail

Na lista de lembretes, a coluna **Enviar lembrete** apresenta botões de WhatsApp e e-mail quando há contato do tutor associado ao animal:

- O botão **WhatsApp** abre o WhatsApp com o número e uma mensagem preenchida.
- O botão **E-mail** abre o programa de e-mail padrão com destinatário, assunto e corpo preenchidos.
- O usuário revisa e envia a mensagem no aplicativo aberto.

Esses botões **não fazem envio automático**. Envio direto pelo sistema exige backend e integração configurada com serviços de WhatsApp Business e de e-mail.

### Agendamentos e atendimento

Para criar um agendamento, cadastre primeiro:

1. Um tutor.
2. O animal e seu tutor responsável.
3. Uma clínica.

O formulário de agendamento solicita animal, clínica, serviço, data, horário e observações. Não há tabela de preços predefinida: o valor é informado ao finalizar o atendimento.

Fluxo do atendimento:

1. Criar o agendamento.
2. Selecionar **Iniciar atendimento**.
3. A partir da data e do horário agendados, selecionar **Concluir atendimento** e informar o valor combinado e a data de conclusão. Conclusões antecipadas e datas futuras ou anteriores ao agendamento são recusadas.
4. Registrar o recebimento, informando valor, forma de pagamento e data.

São aceitos pagamentos parciais, desde que o valor não exceda o saldo. Cada recebimento fica associado ao atendimento e aparece no Financeiro. Atendimentos concluídos não podem ser editados, reabertos ou excluídos: para corrigir uma conclusão, use **Anular** e informe um motivo obrigatório. O atendimento permanece no histórico com a data e o motivo da anulação, mas deixa de compor os indicadores de serviços concluídos e saldo a receber. A anulação não pode ser desfeita.

Se o atendimento tiver recebimentos líquidos, a anulação fica bloqueada até que cada pagamento seja estornado integralmente. O sistema aceita estornos parciais vinculados ao pagamento original; informe data e motivo e confirme que a devolução já foi realizada pelo meio de pagamento. **Registrar um estorno no aplicativo apenas atualiza os registros e totais: não transfere dinheiro nem processa a devolução.** O financeiro e os relatórios mostram os recebimentos líquidos dos estornos e preservam cada movimento.

### Financeiro

- **Recebimentos líquidos:** total dos lançamentos de pagamento menos os estornos.
- **Serviços concluídos:** valor total combinado para atendimentos concluídos.
- **A receber:** saldo dos serviços concluídos que ainda não foi recebido.
- Exibe atendimentos, clínica relacionada, valor combinado, valores recebidos, saldo e ação de registrar recebimento.
- Lista recebimentos e estornos por data, animal/serviço, clínica, forma ou motivo e valor.

### Relatórios

O menu **Relatórios** apresenta uma visão **Total**, com indicadores e tabelas completas, e relatórios independentes para **Tutores**, **Animais**, **Clínicas**, **Agendamentos**, **Lembretes** e **Financeiro**. Os vínculos entre registros são exibidos nos relatórios relacionados; os dados são atualizados junto com as demais telas. As categorias podem ser percorridas por mouse ou teclado. Use **Baixar PDF** para baixar diretamente um PDF da categoria selecionada; em **Total**, o PDF inclui todas as categorias e o resumo geral. Use **Imprimir relatório** para abrir a caixa de impressão do navegador e selecionar uma impressora.

### Backup e restauração

- No **Menu principal**, abra **Backup** para acessar a página com as ações **Exportar backup JSON** e **Restaurar backup**.
- Exportar baixa um arquivo JSON com os dados locais da aplicação.
- Restaurar permite selecionar um arquivo JSON exportado anteriormente.
- A restauração valida o arquivo e os estornos antes de pedir confirmação; depois da confirmação, substitui os dados atuais.
- Arquivos inválidos, coleções financeiras com formato incorreto e estornos acima do pagamento original são recusados sem substituir a base.
- Se o navegador não conseguir salvar os dados restaurados, a aplicação avisa e mantém o estado anterior em memória.
- Backups antigos sem as coleções `pagamentos` ou `estornos` continuam aceitos; cada coleção ausente é restaurada vazia.

## Estrutura interna do HTML

O arquivo está organizado em três partes:

1. **`<head>`:** codificação, viewport, título e CSS incorporado.
2. **`<body>`:** cabeçalho, navegação, seções das telas, formulários em diálogos e mensagens de estado.
3. **`<script>`:** modelo de dados, migração, persistência, renderização, validação, eventos, backup e integrações por links.

As telas são seções com IDs `page-dashboard`, `page-tutores`, `page-animais`, `page-clinicas`, `page-lembretes`, `page-agendamentos`, `page-historico`, `page-relatorios`, `page-backup` e `page-tutorial`. A navegação alterna a classe `hidden` entre as seções.

No JavaScript, as áreas principais são:

- **Dados e armazenamento:** `dadosVazios`, `carregarDados`, `persistir` e as funções de normalização/migração.
- **Renderização:** funções `renderizar...`, que geram as tabelas e indicadores a partir de `dados`; `renderizarRelatorios` atualiza os relatórios por categoria e a visão total.
- **Formulários:** objeto `definicoes`, `abrirFormulario` e `processarFormulario`.
- **Atendimento e caixa:** `alterarStatusAgendamento`, `finalizarAtendimento`, `registrarRecebimento`, `registrarAnulacao`, `registrarEstorno`, `totalRecebido` e `saldoDoAtendimento`.
- **Ações de lembrete:** `linksCompartilhamentoLembrete` e `abrirEnvioLembrete`.
- **Importação/exportação:** `exportarBackup` e `importarBackup`.

## Modelo de dados

O objeto salvo em `localStorage` contém coleções:

- `tutores`
- `animais`
- `clinicas`
- `lembretes`
- `agendamentos`
- `pagamentos`
- `estornos`

Os relacionamentos são feitos por identificadores: animais apontam para tutores; lembretes apontam para animais e, opcionalmente, clínicas; agendamentos apontam para animais e clínicas; pagamentos apontam para agendamentos; estornos apontam para pagamentos e atendimentos.

Chaves usadas no navegador:

- `petcare_petqa_v1`: dados atuais.
- `petcare_petqa_migracao_legado_v1`: indica que a migração de dados legados já foi realizada, evitando que registros antigos reapareçam após exclusão.
- `petcare_dados_v1` e `petshop.v1`: fontes legadas lidas uma única vez quando ainda não há dados atuais; são mantidas como cópias antigas.

## Interface e validações

- Layout responsivo com CSS incorporado.
- Formulários de cadastro e pagamento exibidos em elementos `<dialog>`.
- Diálogos com nome acessível ligado ao título, semântica modal e gerenciamento de foco: ao abrir, o foco vai para o primeiro campo; ao fechar, retorna ao acionador ou ao conteúdo principal se o acionador deixou de existir.
- Campos de formulário têm `id` previsível e único (`campo-<tipo>-<campo>` nos cadastros e IDs específicos nos diálogos fixos); os atributos `name` são prefixados por formulário e tipo de registro para evitar colisões e facilitar seletores de testes.
- Delegação de eventos no documento para ações de tabela geradas dinamicamente.
- Campos de texto interpolados em HTML são escapados antes de renderizar.
- Toasts e confirmações dão retorno para operações e exclusões.

## Limitações

- Os dados são locais ao navegador/origem; não existe sincronização entre dispositivos ou usuários.
- Não há servidor nem banco de dados remoto.
- As ações de WhatsApp e e-mail abrem aplicativos externos; o envio depende da confirmação do usuário.
- A aplicação não processa pagamento em cartão ou Pix. Ela registra manualmente um recebimento já realizado.
- A aplicação não processa devoluções. O estorno só deve ser registrado depois que a devolução tiver sido realizada externamente; a confirmação do usuário não é uma comprovação financeira independente.
- Os registros de atendimento, anulação e estorno ficam no `localStorage`; não há trilha inviolável nem auditoria no servidor.
- O armazenamento local não substitui backups. Exporte cópias periodicamente e guarde-as em local seguro.
