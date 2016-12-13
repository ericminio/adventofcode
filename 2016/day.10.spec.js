var expect = require('chai').expect;
var request = require('request');
var credentialsFor = require('../me');

var InitCommand = require('./bots/init.command');
var GiveCommand = require('./bots/give.command');
var Space = require('./bots/space');

describe('2016 day 10 challenge', function() {

    var url = 'http://adventofcode.com/2016/day/10/input';

    var space;
    var botsWhoSawChip17;
    var botsWhoSawChip61;
    var bot;

    beforeEach(function(done) {
        botsWhoSawChip17 = [];
        botsWhoSawChip61 = [];
        space = new Space(function(bot, chip) {
            if (chip == 17) { botsWhoSawChip17.push(bot); }
            if (chip == 61) { botsWhoSawChip61.push(bot); }
        });
        request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
            var lines = input.split('\n');
            run(space, lines);

            bot = space.findBot(intersection(botsWhoSawChip61, botsWhoSawChip17)[0]);
            done();
        });
    });

    it('identifies the searched bot correctly', function() {
        expect(bot.id).to.equal(101);
    });

    it('discards correctly in the output bins', function() {
        var product = 1;
        var multiplication = function(a, b) { return a*b; };
        [0, 1, 2].forEach(function(index) {
            product *= space.findOutput(index).chips.reduce(multiplication);
        });

        expect(product).to.equal(37789);
    });

    describe('internals', function() {

        it('passes part 1 example', function() {
            var array1 = [];
            var array2 = [];
            var space = new Space(function(bot, chip) {
                if (chip == 2) { array1.push(bot); }
                if (chip == 5) { array2.push(bot); }
            });

            var lines = [
                'value 5 goes to bot 2',
                'bot 2 gives low to bot 1 and high to bot 0',
                'value 3 goes to bot 1',
                'bot 1 gives low to output 1 and high to bot 0',
                'bot 0 gives low to output 2 and high to output 0',
                'value 2 goes to bot 2',
            ];
            run(space, lines);

            expect(intersection(array1, array2)).to.deep.equal([2]);
        });
    });
});

var intersection = function(array1, array2) {
    var inter = [];
    var union = array1.concat(array2);
    for (var index=0; index<union.length; index++) {
        var item = union[index];
        if (array1.indexOf(item) !=-1
            && array2.indexOf(item) !=-1
            && inter.indexOf(item) == -1) {
            inter.push(union[index]);
        }
    }
    return inter;
};

var run = function(space, lines) {
    var initCommands = [];
    var giveCommands = [];
    for (var index=0; index<lines.length; index++) {
        if (lines[index].indexOf('value') == 0) {
            var command = new InitCommand(lines[index], space);
            initCommands.push(command);
        }
        if (lines[index].indexOf('bot') == 0) {
            var command = new GiveCommand(lines[index], space);
            giveCommands.push(command);
        }
    }
    for (var index=0; index<initCommands.length; index++) {
        initCommands[index].execute();
    }
    var canExecuteMore = true;
    while (canExecuteMore) {
        canExecuteMore = false;
        for (var index=0; index<giveCommands.length; index++) {
            var command = giveCommands[index];
            if (command.canExecute()) {
                canExecuteMore = true;
                command.execute();
            }
        }
    }
};
