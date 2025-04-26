# FURIA CS2 Bot

Um bot para Telegram que fornece informações sobre a equipe de CS2 FURIA: próximos jogos, resultados recentes, notícias, curiosidades, enquetes e ranking de usuários.

---

## 📋 Funcionalidades

- **/start**: inicia o bot e registra usuário
- 📅 **Jogos**: exibe próximos jogos da FURIA (dados de `data.json`)
- 📊 **Resultados**: exibe resultados recentes da FURIA (dados de `data.json`)
- 📰 **Notícias**: puxa últimas notícias da HLTV via RSS
- 🧠 **Curiosidades**: exibe uma curiosidade aleatória cadastrada em `data.json`
- 🗳️ **Enquetes**: votações entre KSCERATO e yuurih, com opção de ver resultado
- 🏆 **Ranking**: exibe top 5 usuários por pontos

---

## 🚀 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/furia-cs2-bot.git
   cd furia-cs2-bot
   ```
2. Instale dependências:
   ```bash
   npm install
   ```

---

## ⚙️ Configuração

1. Renomeie o arquivo `.env.example` para `.env` e preencha:
   ```ini
   TELEGRAM_TOKEN=seu_token_do_telegram
   ```
2. Crie ou edite `data.json` para incluir informações estáticas:
   ```json
   {
     "upcomingMatches": [
       { "date": "28/04/2025", "time": "15:00", "opponent": "Imperial", "event": "IEM Katowice" },
       { "date": "30/04/2025", "time": "18:00", "opponent": "Liquid", "event": "BLAST Premier" }
     ],
     "recentResults": [
       { "date": "20/04/2025", "opponent": "NAVI", "score": "2-1", "event": "ESL Pro League" },
       { "date": "15/04/2025", "opponent": "FaZe", "score": "1-2", "event": "IEM Rio" }
     ],
     "curiosidades": [
       "🎯 A FURIA foi o primeiro time brasileiro a vencer a Team Liquid em 2023.",
       "🐆 O nome FURIA vem de 'furioso', simbolizando agressividade.",
       "🏆 KSCERATO é um dos jogadores com mais MVPs da equipe."
     ],
     "votos": {},
     "pontos": {},
     "nicknames": {}
   }
   ```

---

## 📂 Estrutura de arquivos

```
📁 furia-cs2-bot/
├── index.js          # Código principal do bot
├── data.json         # Dados estáticos e estado (votos, pontos, curiosidades)
├── package.json      # Dependências e scripts
├── .env.example      # Exemplo de variáveis de ambiente
└── README.md         # Documentação do projeto
```

---

## ▶️ Como executar

```bash
npm start
```

O bot ficará em polling e responderá a comandos e botões inline.

---

## 🤝 Contribuições

Pull requests são bem-vindas! Para grandes mudanças, abra uma issue primeiro explicando a proposta.

---

## 📜 Licença

MIT © Beatriz Santina 

