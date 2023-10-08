const qrcode = require("qrcode-terminal");

const { Client, LocalAuth } = require("whatsapp-web.js");
const {
  Dado,
  Cartas,
  MultipleDados,
  Piada,
  Significado,
  Fatos,
  EscadaFunc,
  Pokemon,
  Clima,
  Cep,
} = require("./ResFunctions");
const { Dog } = require("./utilities/Copys");
const getComandos = require("./utilities/ComandosHelper");
const fatosInteressantes = require("./utilities/FatosInteressantes");
const Escada = require("./utilities/Escada");
const downloadImage = require("./utilities/DownloadImage");

const client = new Client({
  puppeteer: {
    executablePath: "/usr/bin/chromium-browser",
    headless: false,
    args: ["--no-sandbox","--disable-setuid-sandbox"],
  },
  // authStrategy: new LocalAuth()
});
client.on("auth_failure", (message) => {
  console.log("teste");
});
client.on("authenticated", () => console.log("Autenticou!!!"));
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
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
            `);
client.on("ready", () => {
  console.log("Servidor pronto!");
});
client.on("message_create", async (message) => {
  let MSGNORMALIZED;
  // if (!message.hasMedia) {
  //     MSGNORMALIZED = message.body.toUpperCase();
  // }
  MSGNORMALIZED = message.body.toUpperCase();
  if (MSGNORMALIZED.startsWith("!ESCADA")) {
    message.reply(EscadaFunc(MSGNORMALIZED));
  }
  if (MSGNORMALIZED === "!COMANDOS") {
    message.reply(getComandos());
  }
  if (
    MSGNORMALIZED.startsWith("!DADO") &&
    !MSGNORMALIZED.startsWith("!DADOS")
  ) {
    client.sendMessage(message.from, Dado(MSGNORMALIZED));
  } else if (MSGNORMALIZED.startsWith("!CARTAS")) {
    client.sendMessage(message.from, Cartas(MSGNORMALIZED));
  } else if (MSGNORMALIZED.startsWith("!DADOS")) {
    client.sendMessage(message.from, MultipleDados(MSGNORMALIZED));
  } else if (MSGNORMALIZED === "!PIADA") {
    client.sendMessage(message.from, Piada());
  } else if (MSGNORMALIZED.startsWith("!SIGNIFICADO")) {
    client.sendMessage(message.from, await Significado(MSGNORMALIZED));
  } else if (MSGNORMALIZED === "!DOG") {
    client.sendMessage(message.from, Dog);
  } else if (MSGNORMALIZED === "!FATOS") {
    client.sendMessage(message.from, Fatos());
  } else if (MSGNORMALIZED.startsWith("!POKEMON")) {
    // console.log(await Pokemon(MSGNORMALIZED))
    // Pokemon().then(Response => )
    Pokemon(MSGNORMALIZED).then((Response) => {
      console.log(Response);
      client.sendMessage(message.from, Response.media, {
        caption: Response.caption,
      });
    });
    // client.sendMessage(message.from, await Pokemon(MSGNORMALIZED))
    // Pokemon(MSGNORMALIZED,message.from,client.sen)
  } else if (MSGNORMALIZED.startsWith("!CLIMA")) {
    client.sendMessage(message.from, await Clima(MSGNORMALIZED));
  }
});
Cep("!cep 20541190").then((Response) => console.log(Response));

client.initialize();
