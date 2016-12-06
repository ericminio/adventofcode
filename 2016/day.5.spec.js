var expect = require('chai').expect;
var crypto = require('crypto');

describe('2016 day 5 challenge', function() {

    it('includes part 1', function() {
        this.timeout(0);
        expect(getPassword('abbhdwsy', addToEnd)).to.equal('801b56a7');
    });

    it('includes part 2', function() {
        this.timeout(0);
        expect(getPassword('abbhdwsy', cherryPicking)).to.equal('424a0197');
    });

    describe('internals', function() {

        it('can hash a value', function() {
            var md5 = crypto.createHash('md5');
            expect(md5.update('abc' + 3231929).digest('hex')).to.equal('00000155f8105dff7f56ee10fa9b9abd');
        });

        it('can build a password for a given id', function() {
            this.timeout(0);
            expect(getPassword('abc', addToEnd)).to.equal('18f47a30');
        });

        it('can build a password for a given id with a cherry-picking strategy', function() {
            this.timeout(0);
            expect(getPassword('abc', cherryPicking)).to.equal('05ace8e3');
        });

        describe('cherryPicking', function() {

            it('passes first example', function() {
                expect(cherryPicking('00000155f8105dff7f56ee10fa9b9abd', '')).to.equal('-5------');
            });
            it('passes second example', function() {
                var md5 = crypto.createHash('md5');
                var hash = md5.update('abc' + 5017308).digest('hex');

                expect(cherryPicking(hash, 'ignored')).to.equal('ignored');
            });
            it('passes third example', function() {
                var md5 = crypto.createHash('md5');
                var hash = md5.update('abc' + 5357525).digest('hex');

                expect(cherryPicking(hash, '-5------')).to.equal('-5--e---');
            });
            it('resists not-integer position', function() {
                expect(cherryPicking('00000f9a2c309875e05c5a5d09f1b8c4', 'ignored')).to.equal('ignored');
            });
            it('ignores hash when position is already taken', function() {
                expect(cherryPicking('000001b', '-a------')).to.equal('-a------');
            });
        });
    });
});

var getPassword = function(id, filling) {
    var accu = 0;
    var password = '';
    var hash = '';
    for (var i=0; i<8; ) {
        while (hash.indexOf('00000') != 0) {
            accu ++;
            md5 = crypto.createHash('md5');
            hash = md5.update(id + accu).digest('hex');
        }
        var value = filling(hash, password);
        if (value != password) {
            password = value;
            i ++;
        }
        hash = '';
    }
    return password;
};

var addToEnd = function(hash, password) {
    var value = password;
    value += hash.substring(5, 6);

    return value;
};

var cherryPicking = function(hash, password) {
    var value = password;
    if (value == '') { value = '--------'; }
    var position = +hash.substring(5, 6);
    if (isNaN(position) || position > 7 || value.substring(position, position+1) != '-') {
        return password;
    }
    var code = hash.substring(6, 7);

    return value.substring(0, position) + code + value.substring(position+1);
};
