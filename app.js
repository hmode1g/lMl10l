const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('🌐 3 Bots are Online 24/7'));
app.listen(3000, () => console.log('🌐 Web server running on port 3000'));

// دالة إنشاء البوتات
function createBot(username, password) {
    const bot = mineflayer.createBot({
        host: 'Goldmc.xyz',
        port: 25565,
        username: username,
        version: '1.20.1'
    });

    bot.on('login', () => {
        console.log(`[✔] البوت ${username} دخل اللوبي`);
        
        // 1. تسجيل الدخول بعد 7 ثوانٍ
        setTimeout(() => {
            bot.chat(`/login ${password}`); 
            console.log(`[🔑] ${username}: تم إرسال الباسورد`);
        }, 7000);

        // 2. دخول السيرفايفل بعد 20 ثانية
        setTimeout(() => {
            bot.chat('/survival');
            console.log(`[↕] ${username}: دخل السيرفايفل بنجاح`);
        }, 20000);

        // 3. البقاء لمدة ساعتين (7,200,000 مللي ثانية) ثم الخروج
        setTimeout(() => {
            console.log(`[🔄] انتهت الساعتين لـ ${username}.. جاري الراحة لدقيقة`);
            bot.quit();
        }, 7200000); 
    });

    // في حال حدوث خطأ أو طرد
    bot.on('error', (err) => console.log(`خطأ في ${username}:`, err));
    
    // إعادة الدخول بعد دقيقة واحدة (60000 مللي ثانية)
    bot.on('end', () => {
        setTimeout(() => createBot(username, password), 60000);
    });
}

// تشغيل الحسابات الثلاثة (تأكد من كتابة الباسورد الصحيح لكل حساب)
createBot('mohammadking78', '1234567');
createBot('mohammadking3', '1234567');
createBot('MR_Dark280', '1234567');
