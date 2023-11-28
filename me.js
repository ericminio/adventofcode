var request = require("request");

var authentifyMeFor = function (url) {
    var jar = request.jar();
    var cookie = request.cookie(
        "session=53616c7465645f5f2cc9176b5463bb994a7d6d3c6f9f46f8e8e62671a0c8626052fccf7e5f7f877864c7053034f168bee1c7413e43ab3684bd28859e108de533; _ga=GA1.2.1333149380.1701146254"
    );
    jar.setCookie(cookie, url);

    return jar;
};

module.exports = authentifyMeFor;
