# RAT Games DEV — Arena Local

Este diretório contém **um jogo novo e jogável** para validar a execução de jogos dentro do Electron, **sem modificar** o launcher original, autenticação, assinatura ou licenciamento.

## Executar no Windows

1. No GitHub Desktop, selecione a branch **dev** e clique em **Fetch origin / Pull origin** para atualizar.
2. Abra um terminal na pasta do repositório.
3. Execute:

```cmd
npx --yes electron dev-game/main.cjs
```

Se o Electron já estiver instalado em `node_modules`, também funciona:

```cmd
.\node_modules\.bin\electron.cmd dev-game/main.cjs
```

## Como jogar

- Clique em **Iniciar partida** ou pressione **Espaço**.
- Clique nos alvos azuis (+10) e dourados (+30) durante 45 segundos.
- Selecione a dificuldade antes de começar.
- Pause/continue com o botão ou com **Espaço** quando o foco não estiver num botão.
- O recorde fica salvo localmente.

## Escopo e limitações

- O jogo é **Arena Local**, criado para o ambiente DEV; **não é um dos jogos originais** da RAT Games.
- Não acessa contas, licenças, TikTok LIVE, Roblox ou serviços remotos.
- Não executa scripts remotos, não exige credenciais e não altera a versão de produção.
- Os jogos originais e suas integrações exigem análise e testes próprios.
- A publicação do código no GitHub **não substitui o teste de execução no Windows**.
