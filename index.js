require('dotenv').config();
const cron = require('node-cron');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { Client, LocalAuth } = require('whatsapp-web.js');

const country_code = process.env.COUNTRY_CODE;
const number = process.env.NUMBER;
const msg = process.env.MSG;

const approveMsg = [
    'Me alegra amor, ¡Te amo!',
    'Que bueno, ¡recuerda que eres hermosa!',
    'Casi que no jeje me gustas',
    'Eso es bueno, ¡Cuidate mucho!',
    'Que bien que ya la tomaste Muak',
]

const disapproveMsg = [
    '¡Tomatela ya! lok',
    'Y que esperas >:',
    'Por favor, tomatela',
    '¡No me hagas ir hasta alla!',
    'Mas vale que te la tomes',
]


const client = new Client({
    authStrategy: new LocalAuth({
      clientId: "client-one"
    })
  });
  
  client.initialize();
  
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });
  
  client.on('authenticated', (session) => {
    console.log('WHATSAPP WEB => Authenticated -> Session ->' & session);
  });
  
  client.on("ready", async () => {
    console.log("WHATSAPP WEB => Ready");
  });

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

client.on('message', message => {
    if (message.body.includes('1') || message.body.toLowerCase === 'si') {
        message.reply(approveMsg[getRandomInt(5)]);
    }
    if (message.body.includes('2') || message.body.toLowerCase === 'no') {
        message.reply(disapproveMsg[getRandomInt(5)]);
    }
});

cron.schedule('0 11 * * *', () => {
    let chatId = `${country_code}${number}@c.us`;
    client.sendMessage(chatId, msg).then((response) => {
        if (response.id.fromMe) {
            console.log("It works!");
        }
    });
});