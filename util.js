function evalTemplate(template, scope) {
    with (scope) {
        try {
            return eval(`\`${template.replace(/`/g, '\\`')}\``);
        } catch (e) {
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

module.exports = {
    evalTemplate,
    hexToRGB
}