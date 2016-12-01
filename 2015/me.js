var request = require('request');

var authentifyMeFor = function(url) {
    var jar = request.jar();
    var cookie = request.cookie('session=53616c7465645f5f08b9be10e7dc778d3426b07cc73696beb8cbbdeefe70ae478bdf7ee6c9a324b589ce699792efce7f; _ga=GA1.2.1400579687.1480610880');
    jar.setCookie(cookie, url);

    return jar;
}

module.exports = authentifyMeFor;
