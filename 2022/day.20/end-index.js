const { circularIndex } = require('../support/circular-index');

const endIndex = (start, offset, list) => {
    let end = (start + offset) % (list.length - 1);
    if (end < 0) {
        end = circularIndex(end - 1, list.length);
    }
    return end;
};

module.exports = { endIndex };