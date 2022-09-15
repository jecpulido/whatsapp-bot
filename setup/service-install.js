const { Service } = require("node-windows");

var svc = new Service({
    name : 'Chat-Bot',
    description : "Chat Bot remember ",
    script : "D:\\JavaScript\\whatsapp-bot\\index.js"
});

svc.on('install', () => {
    svc.start();
});

svc.install();