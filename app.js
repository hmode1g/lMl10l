const mineflayer = require('mineflayer');
const express = require('express');

/* ====== KEEP ALIVE (Replit) ====== */
const app = express();
app.get('/', (req, res) => {
  res.send('Bot is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Web server running on port ${PORT}`);
});

/* ====== BOT SETTINGS ====== */
const BOT_CONFIG = {
  host: 'Goldmc.xyz',
  port: 1464,
  username: 'mohammadking78',
  auth: 'offline',
  version: false
};

let bot;
let reconnectTimeout = null;

function timeNow() {
  return new Date().toLocaleString();
}

/* ====== CREATE BOT ====== */
function createBot() {
  bot = mineflayer.createBot(BOT_CONFIG);

  bot.on('login', () => {
    console.log(`[✔] دخل البوت السيرفر | ${timeNow()}`);

    // /login
    setTimeout(() => {
      bot.chat('/login 1234567');
      console.log('[✔] تم إرسال /login');
    }, 2000);

    // /survival بعد 10 ثواني
    setTimeout(() => {
      bot.chat('/survival');
      console.log('[✔] تم إرسال /survival');
    }, 10000);
  });

  // AFK jump كل دقيقة
  const jumpInterval = setInterval(() => {
    if (!bot || !bot.entity) return;
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 400);
    console.log('[↕] قفز AFK');
  }, 60000);

  // إذا طلع أو انطرد
  bot.on('end', (reason) => {
    console.log(`[✖] البوت طلع من السيرفر (${reason}) | ${timeNow()}`);
    clearInterval(jumpInterval);
    reconnect();
  });

  bot.on('kicked', (reason) => {
    console.log(`[🚫] البوت انطرد: ${reason} | ${timeNow()}`);
  });

  bot.on('error', (err) => {
    console.log('[⚠] خطأ:', err.message);
  });
}

/* ====== RECONNECT AFTER 2 MINUTES ====== */
function reconnect() {
  if (reconnectTimeout) return;

  console.log('🔁 إعادة الدخول بعد دقيقتين...');
  reconnectTimeout = setTimeout(() => {
    reconnectTimeout = null;
    createBot();
  }, 120000); // دقيقتين
}

/* ====== START BOT ====== */
createBot();
