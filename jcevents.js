const eris = justcord.eris;
const config = justcord.config;
const chat = justcord.chat;

// Chat
jcmp.events.Add("chat_message", (player, message) => {
    if (message.beginsWith("/")) return;
    eris.createMessage(config.eris.id, `${player.name}: ${message}`);
});

// JC3MP
jcmp.events.Add('ClientConnected', client => {
    eris.createMessage(config.eris.id, `${client.name} connected to the server.`);
});

jcmp.events.Add('ClientDisconnected', (client, reason) => {
    eris.createMessage(config.eris.id, `${client.name} disconnected from the server.`);
});
