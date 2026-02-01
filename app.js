const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('🌐 البوت الأصلي شغال 24/7'));
app.listen(3000, () => console.log('🌐 Web server running on port 3000'));

const botArgs = {
    host: 'Goldmc.xyz',
    port: 25565,
    username: 'mohammadking78',
    version: '1.20.1'
};

function createBot() {
    const bot = mineflayer.createBot(botArgs);

    bot.on('login', () => {
        console.log('[✔] البوت دخل.. جاري تنفيذ الأوامر');
        
        // تسجيل الدخول بعد 7 ثوانٍ
        setTimeout(() => {
            bot.chat('/login 1234567'); 
            console.log('[🔑] تم تسجيل الدخول');
        }, 7000);

        // دخول السيرفايفل بعد 20 ثانية
        setTimeout(() => {
            bot.chat('/survival');
            console.log('[↕] دخلنا السيرفايفل.. سيتم البقاء لمدة ساعة');
        }, 20000);

        // إغلاق الاتصال يدوياً بعد ساعة لتجديد الاتصال
        setTimeout(() => {
            console.log('🔄 انتهت الساعة، جاري تجديد الاتصال الآن..');
            bot.quit();
        }, 3600000); 
    });

    bot.on('error', (err) => console.log('خطأ:', err));
    
    // إعادة الدخول بعد دقيقتين من الخروج
    bot.on('end', () => {
        console.log('🔄 خارج السيرفر الآن.. العودة بعد دقيقتين');
        setTimeout(createBot, 120000);
    });
}

createBot();
