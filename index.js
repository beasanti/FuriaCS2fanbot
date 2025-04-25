const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const Parser = require('rss-parser');
require('dotenv').config();

const parser = new Parser();
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const loadData = () => JSON.parse(fs.readFileSync('./data.json'));
const saveData = data => fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));

function sendMainMenu(chatId, name) {
  const buttons = [
    [ { text: '📅 Jogos', callback_data: 'menu_jogos' }, { text: '📊 Resultados', callback_data: 'menu_resultados' } ],
    [ { text: '📰 Notícias', callback_data: 'menu_noticias' }, { text: '🧠 Curiosidades', callback_data: 'menu_curiosidades' } ],
    [ { text: '🗳️ Enquetes', callback_data: 'menu_enquetes' }, { text: '🏆 Ranking', callback_data: 'menu_ranking' } ],
  ];
  bot.sendMessage(chatId, `Salve, ${name}! 👊 Bem-vindo ao bot da FURIA!\nEscolha uma opção:`, {
    reply_markup: { inline_keyboard: buttons }
  });
}

function getUpcomingMatches() {
  const data = loadData();
  return Array.isArray(data.upcomingMatches) && data.upcomingMatches.length
    ? data.upcomingMatches
    : null;
}

function getRecentResults() {
  const data = loadData();
  return Array.isArray(data.recentResults) && data.recentResults.length
    ? data.recentResults
    : null;
}

bot.onText(/\/start/, msg => {
  const chatId = msg.chat.id;
  const userId = String(msg.from.id);
  const nick = msg.from.username || msg.from.first_name || `User${userId}`;

  const data = loadData();
  data.nicknames = data.nicknames || {};
  data.pontos = data.pontos || {};
  data.votos = data.votos || {};

  data.nicknames[userId] = nick;
  data.pontos[userId] = (data.pontos[userId] || 0) + 1;
  saveData(data);

  sendMainMenu(chatId, nick);
});

bot.on('callback_query', async query => {
  const chatId = query.message.chat.id;
  const userId = String(query.from.id);
  const data = loadData();
  const action = query.data;
  await bot.answerCallbackQuery(query.id).catch(() => {});

  try {
    if (action === 'menu_jogos') {
      const matches = getUpcomingMatches();
      if (!matches) return bot.sendMessage(chatId, 'Nenhum jogo agendado no momento.');
      const txt = matches.map(m =>
        `🗓 ${m.date} | ⏰ ${m.time}\n🆚 vs ${m.opponent} | 🏆 ${m.event}`
      ).join('\n\n');
      return bot.sendMessage(chatId, `📅 Próximos Jogos da FURIA:\n\n${txt}`);
    }

    if (action === 'menu_resultados') {
      const results = getRecentResults();
      if (!results) return bot.sendMessage(chatId, 'Nenhum resultado recente encontrado.');
      const txt = results.map(r =>
        `📅 ${r.date} | 🆚 ${r.opponent} | 🎯 ${r.score} | 🏆 ${r.event}`
      ).join('\n\n');
      return bot.sendMessage(chatId, `📊 Últimos Resultados da FURIA:\n\n${txt}`);
    }

    if (action === 'menu_noticias') {
      const feed = await parser.parseURL('https://www.hltv.org/rss/news');
      const msgs = feed.items.slice(0, 3).map(i => `• <a href="${i.link}">${i.title}</a>`).join('\n\n');
      return bot.sendMessage(chatId, `📰 Notícias:\n\n${msgs}`, { parse_mode: 'HTML' });
    }

    if (action === 'menu_curiosidades') {
      const curios = data.curiosidades || [];
      const cur = curios.length ? curios[Math.floor(Math.random() * curios.length)] : 'Sem curiosidades.';
      data.pontos[userId] = (data.pontos[userId] || 0) + 2;
      saveData(data);
      return bot.sendMessage(chatId, `${cur}\n(+2 pts)`);
    }

    if (action === 'menu_enquetes') {
      return bot.sendMessage(chatId, '📊 Quem vai brilhar hoje?', {
        reply_markup: {
          inline_keyboard: [
            [ { text: 'KSCERATO', callback_data: 'vote_KSCERATO' } ],
            [ { text: 'yuurih', callback_data: 'vote_yuurih' } ],
            [ { text: '📈 Ver Resultado', callback_data: 'menu_enquetes_resultado' } ]
          ]
        }
      });
    }

    if (/^vote_/.test(action)) {
      const choice = action.split('_')[1];
      data.votos[userId] = choice;
      data.pontos[userId] = (data.pontos[userId] || 0) + 5;
      saveData(data);
      return bot.sendMessage(chatId, `✅ Voto em ${choice} registrado! +5 pts`);
    }

    if (action === 'menu_enquetes_resultado') {
      const votos = Object.values(data.votos || {});
      const contK = votos.filter(v => v === 'KSCERATO').length;
      const contY = votos.filter(v => v === 'yuurih').length;
      return bot.sendMessage(chatId,
        `📈 Resultado da Enquete:
KSCERATO: ${contK} votos
 yuurih: ${contY} votos`
      );
    }

    if (action === 'menu_ranking') {
      const top = Object.entries(data.pontos || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id, pts], i) => `${i + 1}. ${data.nicknames[id] || `User${id}`}: ${pts} pts`)
        .join('\n');
      return bot.sendMessage(chatId, `🏆 Ranking:\n\n${top}`);
    }

  } catch (err) {
    console.error('Erro ao processar ação', action, err);
    return bot.sendMessage(chatId, '❌ Ocorreu um erro.');
  }
});