/* justcord-3
 * A JC3MP-Discord bridge.
 *
 * Author: MD678685
 * Licensed under the MIT license.
 *
 * Uses Eris, a Discord library licensed under the MIT license.
 * Requires the chat package.
 */

// External Modules
const ErisClient = require("eris").Client;
const debug = require("debug");

// Listeners
const util = require("./util");

// Logging
const log = debug("justcord");
log.enabled = true;

// Config
const configHelper = require("./config");

let conf;
try {
    conf = configHelper();
} catch (e) {
    log(e);
}

const config = conf || configHelper.defaultConfig;

// Initialise Eris
const eris = new ErisClient(config.eris.token);

// Globally-Exposed Variables
global.justcord = {
    chat: jcmp.events.Call("get_chat")[0],
    config,
    eris,
    log
};

// Event Handlers
require("./erisevents");
require("./jcevents");

eris.connect();
