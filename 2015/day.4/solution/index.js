const stuffer = require('./stuffer.js');

module.exports = {
    solvepartone: (secret) => stuffer(secret, 5),
    solveparttwo: (secret) => stuffer(secret, 6),
};
