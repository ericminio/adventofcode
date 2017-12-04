var expect = require('chai').expect;

var sum = function(lines) {
    var total = 0;
    for (var i=0; i<lines.length; i ++) {
        var tmp = [];
        for (var j=0; j<lines[i].length; j++) {
            if (tmp.indexOf(lines[i][j]) == -1) {
                tmp.push(lines[i][j]);
            }
        }
        if (tmp.length == lines[i].length) {
            total ++;
        }
    }
    return total;
};
var sum2 = function(lines) {
    var total = 0;
    for (var i=0; i<lines.length; i ++) {
        var tmp = [];
        for (var j=0; j<lines[i].length; j++) {
            var candidate = lines[i][j];
            candidate = candidate.split('').sort().join('');
            if (tmp.indexOf(candidate) == -1) {
                tmp.push(candidate);
            }
        }
        if (tmp.length == lines[i].length) {
            total ++;
        }
    }
    return total;
};

describe('day 4 challenge', function() {
    it('exploration of part 1', function() {
        var lines = [
            ['aa', 'bb', 'cc', 'dd', 'ee'],
            ['aa', 'bb', 'cc', 'dd', 'aa']
        ];
        expect(sum(lines)).to.equal(1);
    });
    it('contains part 1', function() {
        var content = require('fs').readFileSync('./2017/day.4/input.txt').toString().trim();
        var lines = content.split('\n');
        for (var i=0; i<lines.length; i ++) {
            lines[i] = lines[i].split(' ');
        }

        expect(sum(lines)).to.equal(466);
    });
    it('exploration of part 2', function() {
        var lines = [
            ['fghij', 'abcde'],
            ['abcde', 'xyz', 'ecdab']
        ];
        expect(sum2(lines)).to.equal(1);
    });
    it('contains part 2', function() {
        var content = require('fs').readFileSync('./2017/day.4/input.txt').toString().trim();
        var lines = content.split('\n');
        for (var i=0; i<lines.length; i ++) {
            lines[i] = lines[i].split(' ');
        }

        expect(sum2(lines)).to.equal(251);
    });
});
