function evalTemplate(template, scope) {
    with (scope) {
        return eval(`\`${template.replace(/`/g, '\\`')}\``);
    }
}

module.exports = {
    evalTemplate
}