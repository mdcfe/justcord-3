const eris = justcord.eris;
const config = justcord.config;
const chat = justcord.chat;

const evalTemplate = require("./util.js").evalTemplate;

function formatFromDiscord(format, _message) {
    let scope = {
        username: _message.member.user.username,
        nick: _message.member.nick || _message.member.user.username,
        channel: _message.channel.name || "Unknown channel",
        message: _message.content,
        _message
    }
    return evalTemplate(format, scope);
}

eris.on("ready", () => {
    console.log("Justcord ready!"); // TODO: Add logging utility functions
    eris.createMessage(config.eris.id, "Server connected to the guild successfully!")
});

eris.on("messageCreate", (_message) => {
    if (_message.channel.id == config.eris.id && _message.member.id != eris.user.id) {
        let message = formatFromDiscord(config.formatting.discordToGame, _message);
        chat.broadcast(message);
        console.log(`Discord: ${message}`);
    }
});
