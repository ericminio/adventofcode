var GiveCommand = function(command, space) {
    var pattern = /^bot (.*) gives low to (bot|output) (.*) and high to (bot|output) (.*)/;
    var groups = pattern.exec(command);

    this.giver = space.findBot(+groups[1]);
    command.indexOf('low to bot')!=-1 ?
        this.looser =  space.findBot(+groups[3]):
        this.looser =  space.findOutput(+groups[3]);
    command.indexOf('high to bot')!=-1 ?
        this.winner = space.findBot(+groups[5]):
        this.winner = space.findOutput(+groups[5]);
};
GiveCommand.prototype.canExecute = function() {
    return this.giver.canGive();
};
GiveCommand.prototype.execute = function() {
    if (this.canExecute()) {
        this.looser.take(this.giver.lowChip());
        this.winner.take(this.giver.highChip());
        this.giver.low = undefined;
        this.giver.high = undefined;
    }
};
module.exports = GiveCommand;

var expect = require('chai').expect;
var Space = require('./space');
var InitCommand = require('./init.command');

describe('GiveCommand', function() {

    var space;

    describe('bot to bot', function() {

        var command = 'bot 171 gives low to bot 4 and high to bot 84';
        var botToBot;

        beforeEach(function() {
            space = new Space();
            botToBot = new GiveCommand(command, space);
        });
        it('can parse giver', function() {
            expect(botToBot.giver).to.equal(space.findBot(171));
        });
        it ('can parse looser', function() {
            expect(botToBot.looser).to.equal(space.findBot(4));
        });
        it ('can parse winner', function() {
            expect(botToBot.winner).to.equal(space.findBot(84));
        });
    });

    describe('bot to output', function() {

        var withOutputs = 'bot 171 gives low to output 4 and high to output 84';
        var botToOutput;

        beforeEach(function() {
            space = new Space();
            botToOutput = new GiveCommand(withOutputs, space);
        });
        it('can parse giver', function() {
            expect(botToOutput.giver).to.equal(space.findBot(171));
        });
        it ('can parse looser', function() {
            expect(botToOutput.looser).to.equal(space.findOutput(4));
        });
        it ('can parse winner', function() {
            expect(botToOutput.winner).to.equal(space.findOutput(84));
        });
    });

    describe('Execution', function() {
        var botToBot;

        beforeEach(function() {
            space = new Space();
        });
        it('distributes the chips', function() {
            var bot = space.findBot(1);
            bot.take(5);
            bot.take(10);
            var command = new GiveCommand('bot 1 gives low to bot 2 and high to bot 3', space);
            expect(command.canExecute()).to.equal(true);
            command.execute();

            expect(space.findBot(2).lowChip()).to.equal(5);
            expect(space.findBot(3).lowChip()).to.equal(10);
            expect(bot.lowChip()).to.equal(undefined);
            expect(bot.highChip()).to.equal(undefined);
        });
        it('does nothing if it does not have two chips', function() {
            var bot = space.findBot(1);
            bot.take(5);
            var command = new GiveCommand('bot 1 gives low to bot 2 and high to bot 3', space);
            expect(command.canExecute()).to.equal(false);
            command.execute();

            expect(space.findBot(2).lowChip()).to.equal(undefined);
            expect(space.findBot(3).lowChip()).to.equal(undefined);
            expect(bot.lowChip()).to.equal(5);
            expect(bot.highChip()).to.equal(undefined);
        });
    });
});
