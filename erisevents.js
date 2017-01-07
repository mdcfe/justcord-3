const eris = justcord.eris;
const config = justcord.config;
const chat = justcord.chat;

const utils = require("./util.js");
const evalTemplate = utils.evalTemplate;
const hexToRGB = utils.hexToRGB;

function formatFromDiscord(format, _message) {
    let scope = {
        username: _message.member.user.username,
        nick: _message.member.nick || _message.member.user.username,
        channel: _message.channel.name || "Unknown channel",
        message: _message.content,
        _message
    };
    return evalTemplate(format, scope);
}

eris.on("ready", () => {
    console.log("Justcord ready!"); // TODO: Add logging utility functions
    eris.createMessage(config.eris.id, "Server connected to the guild successfully!");
    eris.editStatus("online", { name: config.eris.playing });
});

eris.on("messageCreate", (_message) => {
    if (_message.channel.id == config.eris.id && _message.member.id != eris.user.id) {
        let message = formatFromDiscord(config.formatting.discordToGame.chat, _message);
        chat.broadcast(message, hexToRGB(config.formatting.discordToGame.colour));
        console.log(`Discord: ${message}`);
    }
});
