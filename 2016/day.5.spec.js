var expect = require('chai').expect;
var crypto = require('crypto');

describe('2016 day 5 challenge', function() {

    it('includes part 1', function() {
        this.timeout(0);
        expect(getPassword('abbhdwsy', addToEnd, nextHash)).to.equal('801b56a7');
    });

    it('includes part 2', function() {
        this.timeout(0);
        expect(getPassword('abbhdwsy', cherryPicking, nextHash)).to.equal('424a0197');
    });

    describe('internals', function() {

        describe('getPassword', function() {

            var count;
            var nextHash;
            var filling;

            beforeEach(function() {
                count = 0;
                nextHash = function() { count ++; return { index:0, hash:count }; };
                filling = function(hash, password) { return password+hash; }
            });

            it('looks for 8 hashes', function() {
                getPassword('any', filling, nextHash);

                expect(count).to.equal(8);
            });
            it('uses the 8 hashes to fill the password', function() {
                var password = getPassword('any', filling, nextHash);

                expect(password).to.equal('12345678');
            });
            it('looks for more hashes when filling does not modify the password', function() {
                var repeat7 = true;
                filling = function(hash, password) {
                    if (hash == '8' && repeat7) { repeat7 = false; return password; }
                    return password+hash;
                }
                getPassword('any', filling, nextHash);

                expect(count).to.equal(9);
            });
        });

        describe('crypto', function() {

            it('can hash a value', function() {
                var md5 = crypto.createHash('md5');
                expect(md5.update('abc' + 3231929).digest('hex')).to.equal('00000155f8105dff7f56ee10fa9b9abd');
            });
        });

        describe('nextHash', function() {

            it('skips hash not starting with 5 zeros', function() {
                expect(nextHash('abc', 3231927)).to.deep.equal({
                    index: 3231929,
                    hash: '00000155f8105dff7f56ee10fa9b9abd'
                });
            });
        });

        describe('addToEnd', function() {

            it('adds to the end of the password the 6th char', function() {
                expect(addToEnd('1234567', '')).to.equal('6');
                expect(addToEnd('1234567', 'any')).to.equal('any6');
            });
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

var getPassword = function(id, filling, nextHash) {
    var index = 0;
    var password = '';
    for (var i=0; i<8; ) {
        var options = nextHash(id, index);
        var value = filling(options.hash, password);
        if (value != password) {
            password = value;
            i ++;
        }
        index = options.index;
    }
    return password;
};

var nextHash = function(id, index) {
    var hash = '';
    while (hash.indexOf('00000') != 0) {
        index ++;
        md5 = crypto.createHash('md5');
        hash = md5.update(id + index).digest('hex');
    }
    return { index:index, hash:hash };
};

var addToEnd = function(hash, password) {
    return password + hash.substring(5, 6);;
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
