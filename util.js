const fs = require("fs");

function evalTemplate(template, scope) {
    with(scope) {
        try {
            return eval(`\`${template.replace(/`/g, '\\`')}\``);
        } catch (error) {
            console.log("Error encountered while evaluating a template:");
            console.log(`Message: ${error.message}`);
            console.log(`Stack trace: \n${error.stack}`);
        }
    }
}

function hexToRGB(hex) {
    let bigint = parseInt(hex, 16);
    return new RGB((bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255);
}

function loadJSON(path) {
    return JSON.parse(fs.readFileSync(path));
}

function saveJSON(path, object) {
    return fs.writeFileSync(path, JSON.stringify(object, null, 4));
}
/* Versions are "compatible" if:
 * - The majors are both zero and the minors are the same
 * - The majors are the same
 */
function isVersionCompatible(a, b) {
    let as = a.split(".");
    let bs = b.split(".");
    return (!as[0] && !bs[0] ? as[1] === bs[1] : as[0] === bs[0]);
}

module.exports = {
    evalTemplate,
    hexToRGB,
    loadJSON,
    saveJSON,
    isVersionCompatible,
}
