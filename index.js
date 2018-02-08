/* justcord-3
 * A JC3MP-Discord bridge.
 *
 * Author: MD678685
 * Licensed under the MIT license.
 *
 * Uses Eris, a Discord library licensed under the MIT license.
 * Requires the chat package.
 */

/* eslint-disable global-require */

// Run npm install if packages dir missing
const setupError = require("./setup");

if (setupError) {
    console.error("Justcord cannot start due to a setup error.");
    throw setupError;
} else {
    // External Modules
    const ErisClient = require("eris").Client;
    const debug = require("debug");

    // Listeners
    const util = require("./util");

    // Logging
    const log = debug("justcord");
    log.enabled = true;

    // Config
    const configHelper = require("./config.js");

    let conf;
    try {
        conf = configHelper();
    } catch (e) {
        log(e);
    }

    const config = conf || configHelper.defaultConfig;

    // Initialise Eris
    const eris = new ErisClient(config.eris.token);

    // Globally exposed variables (within Justcord)
    global.chat = jcmp.events.Call("get_chat")[0];
    global.config = config;
    global.eris = eris;
    global.log = log;
    global.util = util;

    // Bot event handlers
    require("./bot/events");

    // JC3MP event handlers
    require("./jcmp/events");
    require("./jcmp/api");

    eris.connect();

    log("Loaded!");
}
