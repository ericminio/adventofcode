var expect = require('chai').expect;
var Computer = require('./computer');

describe('computer', function() {

    var computer;

    beforeEach(function() {
        computer = new Computer();
    });

    it('has 4 registers by default', function() {
        expect(computer.register('a').value).to.equal(0);
        expect(computer.register('b').value).to.equal(0);
        expect(computer.register('c').value).to.equal(0);
        expect(computer.register('d').value).to.equal(0);
    });
    it('has 4 different registers', function() {
        expect(computer.register('a')).not.to.deep.equal(computer.register('d'));
    });
    it('has only 4 different registers', function() {
        expect(computer.register('a')).to.deep.equal(computer.register('a'));
    });
    it('starts with cursor at 0', function() {
        expect(computer.cursor).to.equal(0);
    });    

});
