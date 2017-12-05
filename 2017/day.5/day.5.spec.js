var expect = require('chai').expect;

var jump = function(lines) {
    var index = 0;
    var count = 0;
    while (index < lines.length && index >= 0) {
        var offset = lines[index];
        lines[index] ++;
        index += offset;
        count ++;
    }

    return count;
};
var jump2 = function(lines) {
    var index = 0;
    var count = 0;
    while (index < lines.length && index >= 0) {
        var offset = lines[index];
        if (offset >= 3) { lines[index] --; }
        else { lines[index] ++; }
        index += offset;
        count ++;
    }

    return count;
};

describe('day 5 challenge', function() {
    it('exploration of part 1', function() {
        var lines = [
            0,
            3,
            0,
            1,
            -3
        ];
        expect(jump(lines)).to.equal(5);
    });
    it('contains part 1', function() {
        var content = require('fs').readFileSync('./2017/day.5/input.txt').toString().trim();
        var lines = content.split('\n');
        for (var i=0; i<lines.length; i ++) {
            lines[i] = parseInt(lines[i]);
        }

        expect(jump(lines)).to.equal(336905);
    });
    it('exploration of part 2', function() {
        var lines = [
            0,
            3,
            0,
            1,
            -3
        ];
        expect(jump2(lines)).to.equal(10);
    });
    it('contains part 2', function() {
        var content = require('fs').readFileSync('./2017/day.5/input.txt').toString().trim();
        var lines = content.split('\n');
        for (var i=0; i<lines.length; i ++) {
            lines[i] = parseInt(lines[i]);
        }

        expect(jump2(lines)).to.equal(21985262);
    });
});
