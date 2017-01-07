const eris = justcord.eris;
const config = justcord.config;
const chat = justcord.chat;

const evalTemplate = require("./util.js").evalTemplate;

function formatToDiscord(format, player, message) {
    let scope = {
        username: player.name,
        message,
        player
    };
    return evalTemplate(format, scope);
}

function formatTopic() {
    let scope = {
        players: jcmp.players.length,
        maxPlayers: JSON.parse(jcmp.server.config).maxPlayers,
        jcmp
    };
    return evalTemplate(config.formatting.gameToDiscord.topic, scope);
}

function sendDiscordMessage(message) {
    eris.createMessage(config.eris.id, message);
}

function setTopic(topic) {
    eris.editChannel(config.eris.id, { topic });
}

// Chat
jcmp.events.Add("chat_message", (player, message) => {
    sendDiscordMessage(formatToDiscord(config.formatting.gameToDiscord.chat, player, message));
});

// JC3MP
jcmp.events.Add("ClientConnected", client => {
    sendDiscordMessage(formatToDiscord(config.formatting.gameToDiscord.connect, client));
});

jcmp.events.Add("ClientDisconnected", (client, reason) => {
    sendDiscordMessage(formatToDiscord(config.formatting.gameToDiscord.disconnect, client));
});

// Topic updater
setTimeout(() => {
    setTopic(formatTopic());
}, config.eris.topicTimeout);
