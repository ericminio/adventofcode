const start = require('./start.js');

module.exports = (secret) => {
    let candidate = 1;

    while (start(secret, candidate) !== '00000') {
        candidate += 1;
    }

    return candidate;
};
