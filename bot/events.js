const { formatTopic, formatFromDiscord } = require("./format");

const hexToRGB = util.hexToRGB;

let firstConnect = true;

function setTopic(topic) {
    eris.editChannel(config.eris.id, { topic }).catch((reason) => {
        log(`Could not update topic (reason: ${reason})`);
    });
}

eris.on("ready", () => {
    log("Connected to Discord!");
    let msg;
    if (firstConnect) {
        msg = config.formatting.gameToDiscord.dConnect;
        firstConnect = false;

        // Topic updater
        if (config.eris.topicTimeout > 0) {
            setInterval(() => {
                setTopic(formatTopic());
            }, config.eris.topicTimeout);
        }
    } else {
        msg = config.formatting.gameToDiscord.dReconnect;
    }
    eris.createMessage(config.eris.id, msg).catch((reason) => {
        log(`Could not send connection message (reason: ${reason})`);
    });
    eris.editStatus("online", { name: config.eris.playing });
});

eris.on("messageCreate", (_message) => {
    if (_message.channel.id === config.eris.id && _message.member.id !== eris.user.id) {
        const message = formatFromDiscord(config.formatting.discordToGame.chat, _message);
        chat.broadcast(message, hexToRGB(config.formatting.discordToGame.colour));
        log(`Discord: ${message}`);
    }
});

process.on("exit", () => {
    eris.createMessage(config.eris.id, config.formatting.gameToDiscord.dExit).catch((reason) => {
        log(`Could not send shutdown message (reason: ${reason})`);
    });
    eris.editStatus("dnd", { name: "Server stopping" });
});
