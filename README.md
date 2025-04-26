Seu README já está muito bem estruturado e informativo! 👏  
Mas como agora você também quer subir **uma landing page na Vercel**, é bom separar o conteúdo do bot e da landing, ou adicionar uma seção sobre a **landing page** no mesmo repositório, se ambos fazem parte do projeto.

Aqui vai uma sugestão atualizada com essa **nova seção**:

---

# FURIA CS2 Bot

Um bot para Telegram que fornece informações sobre a equipe de CS2 FURIA: próximos jogos, resultados recentes, notícias, curiosidades, enquetes e ranking de usuários.

---

## 🌐 Landing Page (Vercel)

Confira a landing page oficial do bot hospedada em:  
👉 https://furia-cs-2fanbot-99me.vercel.app/

Essa página contém uma introdução visual ao projeto, botão para entrar no grupo do Telegram, e o logo oficial da FURIA (fan-made).

---

## 📋 Funcionalidades do Bot

- **/start**: inicia o bot e registra usuário  
- 📅 **Jogos**: exibe próximos jogos da FURIA (dados de `data.json`)  
- 📊 **Resultados**: exibe resultados recentes da FURIA (dados de `data.json`)  
- 📰 **Notícias**: puxa últimas notícias da HLTV via RSS  
- 🧠 **Curiosidades**: exibe uma curiosidade aleatória cadastrada em `data.json`  
- 🗳️ **Enquetes**: votações entre KSCERATO e yuurih, com opção de ver resultado  
- 🏆 **Ranking**: exibe top 5 usuários por pontos  

---

## 🚀 Instalação

```bash
git clone https://github.com/seu-usuario/furia-cs2-bot.git
cd furia-cs2-bot
npm install
```

---

## ⚙️ Configuração

1. Renomeie `.env.example` para `.env`:
   ```ini
   TELEGRAM_TOKEN=seu_token_do_telegram
   ```
2. Edite `data.json` com os dados da FURIA:
   ```json
   {
     "upcomingMatches": [...],
     "recentResults": [...],
     "curiosidades": [...],
     "votos": {},
     "pontos": {},
     "nicknames": {}
   }
   ```

---

## ▶️ Como executar

```bash
npm start
```

---

## 📂 Estrutura de arquivos

```
📁 furia-cs2-bot/
├── index.js           # Código principal do bot
├── data.json          # Dados do bot
├── landing/           # Pasta da landing page (HTML, CSS, imagens)
├── package.json
├── .env.example
└── README.md
```

---

## 🤝 Contribuições

Pull requests são bem-vindas! Para grandes mudanças, abra uma issue explicando.

---

## 📜 Licença

MIT © Beatriz Santina

