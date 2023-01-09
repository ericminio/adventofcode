const circularIndex = (index, list) => ((index % list.length) + list.length) % list.length;

module.exports = { circularIndex };