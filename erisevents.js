const eris = justcord.eris;
const config = justcord.config;
const chat = justcord.chat;

eris.on("messageCreate", (message) => {
    chat.broadcast(message.content);
});
