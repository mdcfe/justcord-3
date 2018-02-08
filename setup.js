const fs = require("fs");
const path = require("path");
const cp = require("child_process");

if (!fs.existsSync(path.join(__dirname, "node_modules"))) {
    try {
        cp.execSync("npm install --no-optional");
    } catch (error) {
        console.error("Justcord could not perform initial setup. \nMake sure NPM is installed and try again.", error);
        module.exports = error;
    }
}
