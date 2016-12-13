var expect = require('chai').expect;
var Computer = require('./computer');
var JumpCommand = require('./jump.command');

describe('JumpCommand', function() {

    var computer;

    beforeEach(function() {
        computer = new Computer();
    });
    it('can parse moves', function() {
        var command = new JumpCommand('jnz 1 2', computer);

        expect(command.moves()).to.equal(2);
    });
    it('is overriden by 0', function() {
        var command = new JumpCommand('jnz 0 2', computer);

        expect(command.moves()).to.equal(1);
    });
    it('is overriden by 0 in register', function() {
        var command = new JumpCommand('jnz a 2', computer);
        computer.register('a').value = 0;

        expect(command.moves()).to.equal(1);
    });
    it('accepts negative values', function() {
        var command = new JumpCommand('jnz 1 -2', computer);

        expect(command.moves()).to.equal(-2);
    });

    describe('Execution', function() {

        it('moves internal cursor', function() {
            var command = new JumpCommand('jnz 1 -2', computer);
            computer.cursor = 10;
            command.execute();

            expect(computer.cursor).to.equal(8);
        });
        it('simply incs when 0', function() {
            var command = new JumpCommand('jnz 0 -2', computer);
            computer.cursor = 10;
            command.execute();

            expect(computer.cursor).to.equal(11);
        });
    });
});
