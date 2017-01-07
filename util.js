function evalTemplate(template, scope) {
    with (scope) {
        return eval(`\`${template.replace(/`/g, '\\`')}\``);
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