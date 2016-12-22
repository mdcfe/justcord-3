jcmp.events.Add('chat_message', (player, message) => {
    if (message.beginsWith("/")) return;
    justcord.eris.createMessage(justcord.config.eris.id, `${player.name}: ${message}`);
});
