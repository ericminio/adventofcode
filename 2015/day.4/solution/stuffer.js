const start = require('./start.js');

module.exports = (secret, zeros = 5) => {
    const token = Array(zeros + 1).join('0');
    let candidate = 1;

    while (start(secret, candidate, zeros) !== token) {
        candidate += 1;
    }

    return candidate;
};
