const crypto = require('crypto');

module.exports = (secret, number) => {
    const md5 = crypto.createHash('md5');
    return md5
        .update(secret + number)
        .digest('hex')
        .substring(0, 5);
};
