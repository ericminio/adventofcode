var InitCommand = function(command, space) {
    var pattern = /^value (.*) goes to bot (.*)/;
    var groups = pattern.exec(command);

    this.chip = +groups[1];
    this.bot = space.findBot(+groups[2]);
};
InitCommand.prototype.execute = function() {
    this.bot.take(this.chip);
};
module.exports = InitCommand;

var expect = require('chai').expect;
var Space = require('./space');

describe('InitCommand', function() {

    var space;

    beforeEach(function() {
        space = new Space();
    });

    it('can parse chip', function() {
        expect(new InitCommand('value 42 goes to bot 1501', space).chip).to.equal(42);
    });
    it('can parse bot', function() {
        expect(new InitCommand('value 42 goes to bot 1501', space).bot).to.equal(space.findBot(1501));
    });

    describe('Execution', function() {

        var space;

        beforeEach(function() {
            space = new Space();
        });

        it('can execute an InitCommand', function() {
            new InitCommand('value 5 goes to bot 2', space).execute();

            expect(space.findBot(2).lowChip()).to.equal(5);
        });

        it('can execute two InitCommand on the same bot', function() {
            new InitCommand('value 1 goes to bot 2', space).execute();
            new InitCommand('value 3 goes to bot 2', space).execute();

            expect(space.findBot(2).lowChip()).to.equal(1);
            expect(space.findBot(2).highChip()).to.equal(3);
        });
    });
});
