const evalTemplate = util.evalTemplate;
const hexToRGB = util.hexToRGB;

let firstConnect = true;

function formatFromDiscord(format, _message) {
    const scope = {
        username: _message.member.user.username,
        nick: _message.member.nick || _message.member.user.username,
        channel: _message.channel.name || "Unknown channel",
        message: _message.content,
        _message
    };
    return evalTemplate(format, scope);
}

function formatTopic() {
    const scope = {
        players: jcmp.players.length,
        maxPlayers: JSON.parse(jcmp.server.config).maxPlayers,
        jcmp
    };
    return evalTemplate(config.formatting.gameToDiscord.topic, scope);
}

function setTopic(topic) {
    eris.editChannel(config.eris.id, { topic }).catch((reason) => {
        log(`Could not update topic (reason: ${reason})`);
    });
}

eris.on("ready", () => {
    log("Connected to Discord.")
    eris.createMessage(config.eris.id, (firstConnect ? config.gameToDiscord.dConnect : config.gameToDiscord.dReconnect)).catch((reason) => {
        log(`Could not send connection message (reason: ${reason})`);
    });
    eris.editStatus("online", { name: config.eris.playing });

    // Topic updater
    if (config.eris.topicTimeout > 0) {
        setInterval(() => {
            setTopic(formatTopic());
        }, config.eris.topicTimeout);
    }
});

eris.on("messageCreate", (_message) => {
    if (_message.channel.id === config.eris.id && _message.member.id !== eris.user.id) {
        const message = formatFromDiscord(config.formatting.discordToGame.chat, _message);
        chat.broadcast(message, hexToRGB(config.formatting.discordToGame.colour));
        log(`Discord: ${message}`);
    }
});

process.on("exit", () => {
    eris.createMessage(config.eris.id, config.gameToDiscord.dExit).catch(() => log("wat"));
    eris.editStatus("dnd", { name: "Server stopping" });
});
