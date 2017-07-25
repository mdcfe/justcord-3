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

// Listeners
const util = require("./util");

// Config
const config = require("./config")();

// Initialise Eris
const eris = new ErisClient(config.eris.token);

// Globally-Exposed Variables
global.justcord = {
    chat: jcmp.events.Call("get_chat")[0],
    config,
    eris
};

// Event Handlers
require("./erisevents");
require("./jcevents");

eris.connect();
