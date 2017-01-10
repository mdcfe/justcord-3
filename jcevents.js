const eris = justcord.eris;
const config = justcord.config;
const chat = justcord.chat;

const evalTemplate = require("./util.js").evalTemplate;

function formatChat(format, player, message) {
    let scope = {
        username: player.name,
        message,
        player
    };
    return evalTemplate(format, scope);
}

function formatDeath(player, killer) {
    let scope = {
        killer,
        player,
        reason
    };
    return evalTemplate(config.formatting.gameToDiscord.death, scope);
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
    sendDiscordMessage(formatChat(config.formatting.gameToDiscord.chat, player, message));
});

// JC3MP
jcmp.events.Add("ClientConnected", client => {
    sendDiscordMessage(formatChat(config.formatting.gameToDiscord.connect, client));
});

jcmp.events.Add("ClientDisconnected", (client, reason) => {
    sendDiscordMessage(formatChat(config.formatting.gameToDiscord.disconnect, client));
});

jcmp.events.Add("PlayerDeath", (player, killer, reason) => {
    sendDiscordMessage(formatDeath(player, killer, reason));
});

// Topic updater
if (config.eris.topicTimeout > 0) setInterval(() => {
    setTopic(formatTopic());
}, config.eris.topicTimeout);
