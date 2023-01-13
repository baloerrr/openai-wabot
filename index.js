const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { chatAI } = require('./feature/bot_chatAi.js');
const { stickerBot } = require('./feature/bot_sticker.js'); //

const whatsapp = new Client({
    authStrategy: new LocalAuth()
});

whatsapp.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

whatsapp.on('ready', () => {
    console.log('Client is ready!');
});

whatsapp.on('message', async message => {
    const msg = message.body.toLowerCase();

    if(msg === '#menu') {
        whatsapp.sendMessage(message.from, '1. Ketik #ask/pertanyaanmu.\n2. Kirim gambar dengan pesan #sticker/');
    }

    if(msg.includes("#ask/")) {
        await chatAI(msg, message);
    }

    if(msg.includes("#sticker")) {
        await stickerBot(whatsapp, message);
    }
});

whatsapp.initialize();
 
