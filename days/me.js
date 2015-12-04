var request = require('request');

var authentifyMeFor = function(url) {
    var jar = request.jar();
    var cookie = request.cookie('session=53616c7465645f5fed8873028110d5b95d725301541bd2e6b5c2a777f8915aebd739168369f0e5af148009b825c54013; _gat=1; _ga=GA1.2.1608089354.1449241085');
    jar.setCookie(cookie, url);  
    
    return jar;
}

module.exports = authentifyMeFor;
