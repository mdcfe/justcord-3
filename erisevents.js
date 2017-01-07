const eris = justcord.eris;
const config = justcord.config;
const chat = justcord.chat;

eris.on("ready", () => {
    console.log("Justcord ready!"); // TODO: Add logging utility functions
    eris.createMessage(config.eris.id, "Server connected to the guild successfully!")
});

eris.on("messageCreate", (message) => {
    if (message.channel.id == config.eris.id && message.member.id != eris.user.id) {
        let name = message.member.nick || message.member.user.username;
        chat.broadcast(`${name}: ${message.content}`);
        console.log(`Discord: ${name}: ${message.content}`);
    }
});
