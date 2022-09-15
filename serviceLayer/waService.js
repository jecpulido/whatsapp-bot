const { Client, LocalAuth } = require('whatsapp-web.js');

class WaService extends Client {

    constructor() {
        super({ authStrategy: new LocalAuth(), clientId: 'client-one' });

        console.log('Iniciando Wa...');

        this.initialize();

        this.on("qr", (qr) => {
            qrcode.generate(qr, { small: true });
        });

        this.on('authenticated', (session) => {
            console.log('WHATSAPP WEB => Authenticated -> Session ->' & session);
        });

        this.on("ready", async () => {
            let msgAdmin = "WHATSAPP WEB => Ready";
            console.log(msgAdmin);
            setTimeout(() => {
                let chatId = `${country_code}${number_admin}@c.us`;
                this.sendMessage(chatId, msgAdmin).then((response) => {
                    if (response.id.fromMe) {
                        console.log("It works!");
                    }
                });
            }, 5000);
        });
    }

    

}

export default WaService;