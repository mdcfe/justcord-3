/* justcord-3
 * A JC3MP-Discord bridge.
 *
 * Author: MD678685
 * Licensed under the MIT license.
 *
 * Uses Eris, a Discord library licensed under the MIT license.
 * Requires the chat package.
 */

// Modules
import { Client as ErisClient } from "eris";
import getConfig from "./configHelper";
import erisEventInit from "./erisevents";
import jcmpEventInit from "./jcevents";

// Config
const config = getConfig();

// Initialise Eris
const eris = new ErisClient(config.eris.token);

// Globally-Exposed Variables
global.justcord = {
    chat: jcmp.events.Call("get_chat")[0],
    config,
    eris
};

// Event Handlers
jcmpEventInit();
erisEventInit();

eris.connect();
