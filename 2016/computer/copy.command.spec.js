var expect = require('chai').expect;
var Computer = require('./computer');
var CopyCommand = require('./copy.command');

describe('CopyCommand', function() {

    var computer;

    beforeEach(function() {
        computer = new Computer();
    });

    it('can parse static value', function() {
        var command = new CopyCommand('cpy 41 a', computer);
        expect(command.value()).to.equal(41);
    });

    it('can provide register value', function() {
        var command = new CopyCommand('cpy b a', computer);
        computer.register('b').value = 15;

        expect(command.value()).to.equal(15);
    });

    it('can parse target', function() {
        var command = new CopyCommand('cpy b a', computer);

        expect(command.target).to.deep.equal(computer.register('a'));
    });

    describe('Execution', function() {

        it('simply works', function() {
            var command = new CopyCommand('cpy b a', computer);
            computer.register('b').value = 15;
            command.execute();

            expect(computer.register('a').value).to.equal(15);
        });
        it('moves internal cursor', function() {
            var command = new CopyCommand('cpy b a', computer);
            computer.cursor = 15;
            command.execute();

            expect(computer.cursor).to.equal(16);
        });
    });
});
