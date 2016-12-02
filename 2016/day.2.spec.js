var expect = require('chai').expect;
var request = require('request');
var credentialsFor = require('../me');

var normalPad = require('./normal.pad');
var starPad = require('./star.pad');

describe.only('2016 day 2 challenge', function() {

    var url = 'http://adventofcode.com/2016/day/2/input';

    it('includes part 1', function(done) {
        request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
            expect(bathroomCode(input, normalPad)).to.equal('73597');
            done();
        });
    });

    it('includes part 2', function(done) {
        request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
            expect(bathroomCode(input, starPad)).to.equal('A47DA');
            done();
        });
    });
});

var move = require('./move');
var directions = {
    'L': { xoffset:-1, yoffset:0 },
    'R': { xoffset:1, yoffset:0 },
    'U': { xoffset:0, yoffset:1 },
    'D': { xoffset:0, yoffset:-1 }
};

var bathroomCode = function(input, pad) {
    var code = '';
    var position = { x:0, y:0 };

    var lines = input.split('\n');
    for (var i=0; i<lines.length; i++) {
        var line = lines[i].trim();
        if (line.length > 0) {
            position = follow(line, position, pad);
            code += pad.digitOf(position);
        }
    }

    return code;
};

var follow = function(line, position, pad) {
    if (line == '') { return position; }

    var direction = directions[line[0]];
    var destination = move({ position:position, direction:direction }, 1);
    if (!pad.allows(destination)) {
        destination = position;
    }

    return follow(line.substring(1), destination, pad);
};

describe('finding digit', function() {

    it('can reuse existing stuff', function() {
        var position = { x:0, y:0 };
        var direction = directions['U'];
        var destination = move({ position:position, direction:direction }, 1);

        expect(destination).to.deep.equal({ x:0, y:1 });
    });

    it('can digest one line', function() {
        expect(follow('RU', { x:0, y:0 }, normalPad)).to.deep.equal({ x:1, y:1 });
    });

    it('ignores moves that lead outside boundaries', function() {
        expect(follow('RUU', { x:0, y:0 }, normalPad)).to.deep.equal({ x:1, y:1 });
    });

    it('can find a bathroom code', function() {
        expect(bathroomCode('RUU\nD', normalPad)).to.deep.equal('36');
        expect(bathroomCode('ULL\nRRDDD\nLURDL\nUUUUD', normalPad)).to.deep.equal('1985');
    });

    it('ignores trailing CR', function() {
        expect(bathroomCode('ULL\nRRDDD\nLURDL\nUUUUD\n', normalPad)).to.deep.equal('1985');
    });

    it('can deal with star pad', function() {
        expect(bathroomCode('RRDDD', starPad)).to.deep.equal('D');
    });
});
