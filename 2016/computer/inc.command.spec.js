var expect = require('chai').expect;
var Computer = require('./computer');
var IncCommand = require('./inc.command');

describe('IncCommand', function() {

    var computer;

    beforeEach(function() {
        computer = new Computer();
    });

    it('can parse target', function() {
        var command = new IncCommand('inc d', computer);

        expect(command.target).to.deep.equal(computer.register('d'));
    });

    describe('Execution', function() {

        it('simply works', function() {
            var command = new IncCommand('inc b', computer);
            computer.register('b').value = 15;
            command.execute();

            expect(computer.register('b').value).to.equal(16);
        });
        it('moves internal cursor', function() {
            var command = new IncCommand('inc b', computer);
            computer.cursor = 15;
            command.execute();

            expect(computer.cursor).to.equal(16);
        });
    });
});
