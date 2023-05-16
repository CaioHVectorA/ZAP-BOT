const qrcode = require('qrcode-terminal');


const { Client, LocalAuth } = require('whatsapp-web.js');
const { Dado, Cartas, MultipleDados, Piada, Significado } = require('./ResFunctions');
const { Dog } = require('./utilities/Copys');
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
console.log(` ZAP BOT - BY VECTOR
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⣶⣶⣶⣶⣶⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
   ⠀⠀⠀⠀⠀⠀⣠⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣄⡀⠀⠀⠀⠀⠀
    ⠀⠀⠀⣠⣴⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣮⣵⣄⠀⠀⠀
     ⠀⠀⢾⣻⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⡀⠀
      ⠀⠸⣽⣻⠃⣿⡿⠋⣉⠛⣿⣿⣿⣿⣿⣿⣿⣿⣏⡟⠉⡉⢻⣿⡌⣿⣳⡥⠀
       ⠀⢜⣳⡟⢸⣿⣷⣄⣠⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣤⣠⣼⣿⣇⢸⢧⢣⠀
        ⠀⠨⢳⠇⣸⣿⣿⢿⣿⣿⣿⣿⡿⠿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⠀⡟⢆⠀
         ⠀⠀⠈⠀⣾⣿⣿⣼⣿⣿⣿⣿⡀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣽⣿⣿⠐⠈⠀⠀
          ⠀⢀⣀⣼⣷⣭⣛⣯⡝⠿⢿⣛⣋⣤⣤⣀⣉⣛⣻⡿⢟⣵⣟⣯⣶⣿⣄⡀⠀
           ⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣶⣶⣾⣶⣶⣴⣾⣿⣿⣿⣿⣿⣿⢿⣿⣿⣧
            ⣿⣿⣿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⣿⡿
            O QR code está sendo gerado.
            Powered by Whatsapp-Web.js!
            `)
client.on('ready', () => {
    console.log('Servidor pronto!');
});

client.on('message_create', async message => {
    const MSGNORMALIZED = message.body.toUpperCase() 
    if (MSGNORMALIZED.startsWith('!DADO') && !MSGNORMALIZED.startsWith('!DADOS')) {
        client.sendMessage(message.from, Dado(MSGNORMALIZED))
    } else if (MSGNORMALIZED.startsWith('!CARTAS')) {
        client.sendMessage(message.from, Cartas(MSGNORMALIZED))
    } else if (MSGNORMALIZED.startsWith('!DADOS')) {
        client.sendMessage(message.from,MultipleDados(MSGNORMALIZED))
    } else if (MSGNORMALIZED === '!PIADA') {
        client.sendMessage(message.from,Piada())
    } else if (MSGNORMALIZED.startsWith('!SIGNIFICADO')) {
        client.sendMessage(message.from, await Significado(MSGNORMALIZED))
    } else if (MSGNORMALIZED === '!DOG') {
        client.sendMessage(message.from, Dog)
    }
})

client.initialize();
 