var expect = require('chai').expect;
var request = require('request');
var credentialsFor = require('../me');

var normalPad = require('./normal.pad');
var diamondPad = require('./diamond.pad');

describe('2016 day 4 challenge', function() {

    var url = 'http://adventofcode.com/2016/day/4/input';

    it('includes part 1', function(done) {
        request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
            var rooms = input.split('\n');
            var count = 0;
            for (var i=0; i<rooms.length; i++) {
                var room = new Room(rooms[i]);
                if (!room.isDecoy()) { count += room.sectorID() ; }
            }
            expect(count).to.equal(278221);
            done();
        });
    });

    it('includes part 2', function(done) {
        request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
            var rooms = input.split('\n');
            console.log(rooms.length);
            for (var i=0; i<rooms.length; i++) {
                var room = new Room(rooms[i]);
                var name = room.name();

                if (name.indexOf('northpole') != -1) {
                    expect(room.sectorID()).to.equal(267);
                }
            }
            done();
        });
    });

    describe('internals', function() {

        describe('Room common letters collector', function() {

            it('works for a single letter', function() {
                expect(new Room('a-1').collectLetters()).to.deep.equal([ {letter:'a', count:1} ]);
            });
            it('works with 2 letters', function() {
                expect(new Room('a-b-1').collectLetters()).to.deep.equal([
                    {letter:'a', count:1},
                    {letter:'b', count:1}
                ]);
            });
            it('respects alphabetical order', function() {
                expect('a'<'b').to.equal(true);
                expect(new Room('b-a-1').collectLetters()).to.deep.equal([
                    {letter:'a', count:1},
                    {letter:'b', count:1}
                ]);
            });
            it('count occurences', function() {
                expect(new Room('aa-1').collectLetters()).to.deep.equal([ {letter:'a', count:2} ]);
            });
            it('gives priority to occurences', function() {
                expect(new Room('b-ab-1').collectLetters()).to.deep.equal([
                    {letter:'b', count:2},
                    {letter:'a', count:1}
                ]);
            });
            it('can build expected checksum', function() {
                expect(new Room('b-ab-1').expectedChecksum()).to.equal('ba');
            });
            it('works with a bigger example', function() {
                expect(new Room('aczupnetwp-dnlgpyrpc-sfye-dstaatyr-561[patyc]').expectedChecksum()).to.equal('patyc');
            });
            it('can detect a decoy', function() {
                expect(new Room('aczupnetwp-dnlgpyrpc-sfye-dstaatyr-561[patyc]').isDecoy()).to.equal(false);
                expect(new Room('aczupnetwp-dnlgpyrpc-sfye-dstaatyr-561[aaaaa]').isDecoy()).to.equal(true);
            });
            it('can pass part 1', function() {
                var rooms = [
                    new Room('aaaaa-bbb-z-y-x-123[abxyz]'),
                    new Room('a-b-c-d-e-f-g-h-987[abcde]'),
                    new Room('not-a-real-room-404[oarel]'),
                    new Room('totally-real-room-200[decoy]')
                ];
                var count = 0;
                for (var i=0; i<rooms.length; i++) {
                    count += (rooms[i].isDecoy() ? 0 : 1);
                }
                expect(count).to.equal(3);
            });
            it('exposes encrypted name', function() {
                expect(new Room('b-ab-1').encryptedName()).to.equal('b-ab');
            });
            it('can decrypt name of sectorID 1', function() {
                expect(new Room('b-ab-1[]').name()).to.equal('c bc');
            });
            it('can decrypt name of sectorID 26', function() {
                expect(new Room('b-ab-26[]').name()).to.equal('b ab');
            });
            it('can decrypt example of part 2', function() {
                expect(new Room('qzmt-zixmtkozy-ivhz-343[]').name()).to.equal('very encrypted name');
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
    var letters = [];
    letters.push({ letter:this.code[0], count:1 });
    for (var i=1; i<this.code.lastIndexOf('-'); i++) {
        var char = this.code[i];
        if (char != '-') {
            var found = findLetter(letters, char);
            if (found != undefined) {
                letters[found].count ++;
            }
            else {
                letters.push({ letter:char, count:1 });
            }
        }
    }

    return letters.sort(occurenceAndAlpha);
};

Room.prototype.expectedChecksum = function() {
    var letters = this.collectLetters();
    var max = letters.length < 5 ? letters.length : 5;
    var sum = '';
    for (var i=0; i<max; i++) {
        sum += letters[i].letter;
    }
    return sum;
};

Room.prototype.isDecoy = function() {
    return this.expectedChecksum().indexOf(this.checksum()) != 0;
};

Room.prototype.encryptedName = function() {
    return this.code.substring(0, this.code.lastIndexOf('-'));
};

Room.prototype.name = function() {
    var encryptedName = this.encryptedName();
    var sectorID = this.sectorID();
    var name = '';
    for (var i=0; i<encryptedName.length; i++) {
        var letter = encryptedName[i];
        name += rotate(letter, sectorID);
    }

    return name;
};

var occurenceAndAlpha = function(a, b) {
    if (a.count != b.count) { return a.count > b.count ? -1 : 1; }
    return a.letter < b.letter ? -1: 1;
};
var findLetter = function(letters, letter) {
    for (var i=0; i<letters.length; i++) {
        if (letters[i].letter == letter) { return i; }
    }
}
var rotate = function(letter, count) {
    if (letter == '-') { return ' '; }

    var code = 97 + ((letter.charCodeAt(0)-97+count) % 26);
    return String.fromCharCode(code);
};
