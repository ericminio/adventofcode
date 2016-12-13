var expect = require('chai').expect;
var Computer = require('./computer');
var DecCommand = require('./dec.command');

describe('DecCommand', function() {

    var computer;

    beforeEach(function() {
        computer = new Computer();
    });

    it('can parse target', function() {
        var command = new DecCommand('dec c', computer);

        expect(command.target).to.deep.equal(computer.register('c'));
    });

    describe('Execution', function() {

        it('simply works', function() {
            var command = new DecCommand('dec a', computer);
            computer.register('a').value = 15;
            command.execute();

            expect(computer.register('a').value).to.equal(14);
        });
        it('moves internal cursor', function() {
            var command = new DecCommand('dec a', computer);
            computer.cursor = 15;
            command.execute();

            expect(computer.cursor).to.equal(16);
        });
    });
});
