builder = function(number) {

    return {
        isWall: function(location) {
            var x = location.x;
            var y = location.y;
            if (location.x<0 || location.y<0) { return true; }
            
            var base = x*x + 3*x + 2*x*y + y + y*y + number;
            var inBin = base.toString(2);

            return count1(inBin.toString()) % 2 != 0;
        }
    };
};

var count1 = function(a) {
    return a.split('1').length-1;
};

module.exports = builder;
module.exports.count1 = count1;
