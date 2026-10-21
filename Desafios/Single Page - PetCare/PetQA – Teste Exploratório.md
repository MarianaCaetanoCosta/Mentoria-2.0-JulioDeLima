# PetQA — Teste exploratório

## Identificação

- **Produto:** PetCare + PetQA — Gestão Inteligente
- **Tipo:** roteiro de exploração manual
- **Aplicação avaliada:** `PetCare_PetQA_Gestao_Inteligente.html`
- **Dados:** use somente dados fictícios em uma cópia de teste
- **Status deste documento:** roteiro; não representa uma rodada completa aprovada

## Missão

Explorar os fluxos de negócio da aplicação, procurando inconsistências de dados, transições de estado inesperadas, mensagens pouco claras, falhas de navegação e barreiras de acessibilidade.

## Áreas de exploração

1. **Navegação e tutorial:** percorra as opções do Menu principal, confirme que cada uma abre a página correspondente e consulte o Tutorial.
2. **Cadastros e relacionamentos:** crie tutor, animal e clínica; confira as associações e os bloqueios de exclusão de registros vinculados.
3. **Lembretes:** crie, pesquise e conclua lembretes; confira os links externos de WhatsApp e e-mail sem enviar mensagens.
4. **Agendamentos:** percorra criação, início, conclusão e cancelamento; tente concluir antes da data e horário previstos.
5. **Financeiro e histórico:** conclua um atendimento de teste e registre pagamentos parciais; explore estornos, bloqueio da anulação até o estorno integral, motivo obrigatório e preservação do registro anulado.
6. **Relatórios:** percorra as categorias e a visão Total, baixe PDFs separados e teste a impressão nativa.
7. **Backup:** exporte um JSON e confirme sua estrutura; teste restauração somente com um arquivo fictício controlado e confirme a substituição.
8. **Acessibilidade e responsividade:** use teclado, leitores de tela quando disponíveis e larguras de tela diferentes; observe foco, nomes acessíveis e conteúdo cortado.

## Procedimento

1. Abra o HTML em um navegador atualizado.
2. Registre navegador, versão, sistema operacional e dimensões da janela.
3. Use dados artificiais. Não coloque dados pessoais reais em capturas ou exemplos.
4. Execute os cenários do [roteiro detalhado de testes exploratórios](./Testes%20Explorat%C3%B3rios%20PetCare%20PetQA.md).
5. Para cada achado, anote passos para reprodução, resultado esperado, resultado observado, impacto, frequência e evidência.
6. Marque cada cenário como **Passou**, **Falhou**, **Bloqueado** ou **A executar** somente depois da execução correspondente.

## Registro de observações

| Campo | Registro |
|---|---|
| Data e horário | |
| Pessoa testadora | |
| Navegador/versão | |
| Sistema operacional | |
| Viewport | |
| Cenários explorados | |
| Observações e evidências | |

## Limites

A aplicação é um protótipo local: não possui backend, login, sincronização entre dispositivos, processamento de pagamentos nem envio automático de mensagens. Links externos dependem da revisão e ação da pessoa usuária. Não se deve inferir cobertura completa a partir de uma exploração pontual.
