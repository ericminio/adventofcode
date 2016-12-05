var expect = require('chai').expect;
var request = require('request');
var credentialsFor = require('../me');

var normalPad = require('./normal.pad');
var diamondPad = require('./diamond.pad');

describe('2016 day 4 challenge', function() {

    var url = 'http://adventofcode.com/2016/day/4/input';

    it('includes part 1', function(done) {
        request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
            var lines = input.split('\n');
            var room = new Room(lines[0]);
            expect(room.checksum()).to.deep.equal('patyc');
            expect(room.sectorID()).to.deep.equal(561);
            done();
        });
    });

    describe('internals', function() {

        describe('Room common letters collector', function() {

            it('works for a single letter', function() {
                expect(new Room('a-1').collectLetters()).to.equal('a');
            });
            it('works with 2 letters', function() {
                expect(new Room('a-b-1').collectLetters()).to.equal('ab');
            });
            it('respects alphabetical order', function() {
                expect('a'<'b').to.equal(true);
                expect(new Room('b-a-1').collectLetters()).to.equal('ab');
            });
        })
    });
});

var Room = function(code) {
    this.code = code;
};

Room.prototype.checksum = function() {
    return this.code.substring(this.code.indexOf('[') + 1, this.code.length-1);
};

Room.prototype.sectorID = function() {
    return +this.code.substring(this.code.lastIndexOf('-') + 1, this.code.indexOf('['));
};

Room.prototype.collectLetters = function() {
    var collect = this.code[0];
    for (var i=1; i<this.code.lastIndexOf('-'); i++) {
        var char = this.code[i];
        if (char != '-') {
            collect += char;
        }
    }

    return collect;
};
