module.exports = (line) =>
    10 * parseInt(/(\d)/.exec(line)[1]) + parseInt(/.*(\d)/.exec(line)[1]);
