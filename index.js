const qrcode = require('qrcode-terminal');
const naipes = ["ouros", "copas", "espadas", "paus"];
const valores = ["Ás", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Valete", "Rainha", "Rei"];


const { Client } = require('whatsapp-web.js');
const { Dado, Cartas } = require('./ResFunctions');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
    const MSGNORMALIZED = message.body.toUpperCase() 
    if (MSGNORMALIZED.startsWith('!DADO')) {
        client.sendMessage(message.from,Dado(MSGNORMALIZED))
    } else if (MSGNORMALIZED.startsWith('!CARTAS')) {
        client.sendMessage(message.from,Cartas(MSGNORMALIZED))
    }
    else if (message.body === '!teste') {
        client.sendMessage(message.from,'Teste')
    }
})

client.initialize();
 