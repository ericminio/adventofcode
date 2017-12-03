var expect = require('chai').expect;

var sum = function(lines) {
    var total = 0;
    for (var i=0; i<lines.length; i++) {
        var line = lines[i];
        line.sort(function(a, b) { return a-b; });
        total += line[line.length-1] - line[0];
    }
    return total;
};
var sum2 = function(lines) {
    var total = 0;
    for (var i=0; i<lines.length; i++) {
        for (var j=0; j<lines[i].length; j++) {
            for (var k=j+1; k<lines[i].length; k++) {
                var a = lines[i][j];
                var b = lines[i][k];
                if (a % b == 0) {
                    total += a/b;
                }
                if (b % a == 0) {
                    total += b/a;
                }
            }
        }
    }
    return total;
};


describe('day 2 challenge', function() {
    it('exploration of part 1', function() {
        var lines = [
            [5, 1, 9, 5],
            [7, 5, 3],
            [2, 4, 6, 8]
        ];
        expect(sum(lines)).to.equal(18);
    });
    it('contains part 1', function() {
        var content = require('fs').readFileSync('./2017/day.2/input.txt').toString().trim();
        var lines = content.split('\n');
        for (var i=0; i<lines.length; i ++) {
            lines[i] = lines[i].split('\t');
            for (var j=0; j<lines[i].length; j++) {
                lines[i][j] = parseInt(lines[i][j]);
            }
        }

        expect(sum(lines)).to.equal(41919);
    });
    it('exploration of part 2', function() {
        var lines = [
            [5, 9, 2, 8],
            [9, 4, 7, 3],
            [3, 8, 6, 5]
        ];
        expect(sum2(lines)).to.equal(9);
    });
    it('contains part 2', function() {
        var content = require('fs').readFileSync('./2017/day.2/input.txt').toString().trim();
        var lines = content.split('\n');
        for (var i=0; i<lines.length; i ++) {
            lines[i] = lines[i].split('\t');
            for (var j=0; j<lines[i].length; j++) {
                lines[i][j] = parseInt(lines[i][j]);
            }
        }

        expect(sum2(lines)).to.equal(303);
    });
});
