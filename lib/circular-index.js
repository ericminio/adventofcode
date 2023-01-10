const circularIndex = (index, size) => ((index % size) + size) % size;

module.exports = { circularIndex };