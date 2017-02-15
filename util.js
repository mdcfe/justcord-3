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

function isMergeableObject(object) {
    return object && typeof object == "object";
}

function deepClone(object) {
    if (!object || typeof object !== 'object') return object;

    var output = object.constructor();
    for (var key in object) {
        output[key] = deepClone(object[key]);
    }

    return output;
}

function deepMerge(target, ...sources) {
    if (sources.length < 1) return target;
    const output = deepClone(target);
    const source = sources.shift();

    if (isMergeableObject(output) && isMergeableObject(source)) {
        for (const key in source) {
            if (isMergeableObject(source[key])) {
                if (!output[key]) Object.assign(output, { [key]: {} });
                deepMerge(output[key], source[key]);
            } else if (Array.isArray(source[key])) {
                if (!output[key]) Object.assign(output, { [key]: [] });
                output[key] = output[key].concat(source[key]).unique();
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        }
    }

    return deepMerge(target, sources);
}

module.exports = {
    evalTemplate,
    hexToRGB,
    loadJSON,
    saveJSON,
    isMergeableObject,
    deepClone,
    deepMerge
}
