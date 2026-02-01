const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('🌐 2 Bots are Online 24/7'));
app.listen(3000, () => console.log('🌐 Web server running on port 3000'));

function createBot(username, password) {
    const bot = mineflayer.createBot({
        host: 'Goldmc.xyz',
        port: 25565,
        username: username,
        version: '1.20.1'
    });

    bot.on('login', () => {
        console.log(`[✔] البوت ${username} دخل اللوبي`);
        
        // تسجيل الدخول بعد 7 ثوانٍ
        setTimeout(() => {
            bot.chat(`/login ${password}`); 
            console.log(`[🔑] ${username}: تم إرسال الباسورد`);
        }, 7000);

        // دخول السيرفايفل بعد 20 ثانية
        setTimeout(() => {
            bot.chat('/survival');
            console.log(`[↕] ${username}: دخل السيرفايفل`);
        }, 20000);

        // البقاء لمدة ساعتين (7200000ms) ثم الخروج لتجديد الاتصال
        setTimeout(() => {
            console.log(`[🔄] تجديد اتصال ${username} بعد ساعتين عمل`);
            bot.quit();
        }, 7200000); 
    });

    bot.on('error', (err) => console.log(`خطأ في ${username}:`, err));
    
    // إعادة الدخول بعد دقيقة واحدة من الخروج
    bot.on('end', () => {
        setTimeout(() => createBot(username, password), 60000);
    });
}

// تشغيل الحسابين المطلوبين فقط
createBot('mohammadking78', '1234567');
createBot('mohammadking3', '1234567');
