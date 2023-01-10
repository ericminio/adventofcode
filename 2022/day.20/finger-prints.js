const { circularIndex } = require('../support/circular-index');

const fingerPrints = (message) => {
    let zero = message.indexOf(0);
    return [1000, 2000, 3000].map(n => message[circularIndex(zero + n, message.length)]);
};

module.exports = { fingerPrints };
