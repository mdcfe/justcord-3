/* These are Justcord's API events. You can call them in your own package
 * to access Discord users, control the bot etc.
 */

// Send a message to the default channel.
jcmp.events.Add("justcord:broadcast", async (message) => {
    let result;
    try {
        result = await eris.sendMessage(config.eris.id, message);
    } catch (e) {
        result = e;
    }
    return result;
});

// Get the eris instance.
jcmp.events.Add("justcord:eris", () => eris);
