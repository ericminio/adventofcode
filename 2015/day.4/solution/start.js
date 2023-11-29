const crypto = require('crypto');
const md5 = crypto.createHash('md5');

module.exports = (secret, number, zeros = 5) =>
    crypto
        .createHash('md5')
        .update(secret + number)
        .digest('hex')
        .substring(0, zeros);
