const evalTemplate = util.evalTemplate;

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

module.exports = {
    formatTopic,
    formatFromDiscord,
};
