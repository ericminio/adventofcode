const numbers = require('./numbers');

module.exports = new RegExp('(\\d|' + numbers.join('|') + ')');
