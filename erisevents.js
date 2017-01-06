const eris = justcord.eris;
const config = justcord.config;
const chat = justcord.chat;

eris.on("messageCreate", (message) => {
    if (message.channel.id == config.eris.id) {
        chat.broadcast(`${message.member.nick}: ${message.content}`);
        console.log(`Discord: ${message.member.nick}: ${message.content}`);
    }
});
