/* justcord-3
 * A JC3MP-Discord bridge.
 *
 * Author: MD678685
 * Licensed under the MIT license.
 *
 * Uses Eris, a Discord library licensed under the MIT license.
 * Requires the chat and command manager packages.
 */

const config = require("./config.json");

const ErisClient = require("eris");

const eris = new ErisClient(config.eris.token);

global.chatManager = events.Call('get_chat')[0];

eris.on("ready", () => {
    console.log("Justcord ready!"); // TODO: Add logging utility functions
});

eris.connect();
