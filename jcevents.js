const eris = justcord.eris;
const config = justcord.config;
const chat = justcord.chat;

const evalTemplate = require("./util.js").evalTemplate;

function formatToDiscord(format, player, message) {
    let scope = {
        username: player.name,
        message,
        player
    }
    return evalTemplate(format, scope);
}

function sendDiscordMessage(message) {
    eris.createMessage(config.eris.id, message);
}

// Chat
jcmp.events.Add("chat_message", (player, message) => {
    sendDiscordMessage(formatToDiscord(config.formatting.gameToDiscord.chat, player, message));
});

// JC3MP
jcmp.events.Add('ClientConnected', client => {
    sendDiscordMessage(formatToDiscord(config.formatting.gameToDiscord.connect, client));
});

jcmp.events.Add('ClientDisconnected', (client, reason) => {
    sendDiscordMessage(formatToDiscord(config.formatting.gameToDiscord.disconnect, client));
});
