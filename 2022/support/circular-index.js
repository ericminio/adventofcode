const circularIndex = (index, array) => ((index % array.length) + array.length) % array.length;

module.exports = { circularIndex };