var expect = require('chai').expect;
var request = require('request');
var credentialsFor = require('../me');

var Computer = require('./computer/computer');
var CopyCommand = require('./computer/copy.command');
var IncCommand = require('./computer/inc.command');
var DecCommand = require('./computer/dec.command');
var JumpCommand = require('./computer/jump.command');

describe('2016 day 12 challenge', function() {

    var url = 'http://adventofcode.com/2016/day/12/input';

    it('includes part 1', function(done) {
        var computer = new Computer();

        request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
            var lines = input.split('\n');
            var commands = [];
            for (var index=0; index<lines.length; index++) {
                var line = lines[index];
                if (line.indexOf('cpy') == 0) { commands.push(new CopyCommand(line, computer)); }
                if (line.indexOf('inc') == 0) { commands.push(new IncCommand(line, computer)); }
                if (line.indexOf('dec') == 0) { commands.push(new DecCommand(line, computer)); }
                if (line.indexOf('jnz') == 0) { commands.push(new JumpCommand(line, computer)); }
            }
            while(computer.cursor < commands.length) {
                var command = commands[computer.cursor];
                command.execute();
            }

            expect(computer.register('a').value).to.equal(318117);
            done();
        });
    });

    it('includes part 2', function(done) {
        var computer = new Computer();
        computer.register('c').value = 1;

        request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
            var lines = input.split('\n');
            var commands = [];
            for (var index=0; index<lines.length; index++) {
                var line = lines[index];
                if (line.indexOf('cpy') == 0) { commands.push(new CopyCommand(line, computer)); }
                if (line.indexOf('inc') == 0) { commands.push(new IncCommand(line, computer)); }
                if (line.indexOf('dec') == 0) { commands.push(new DecCommand(line, computer)); }
                if (line.indexOf('jnz') == 0) { commands.push(new JumpCommand(line, computer)); }
            }
            while(computer.cursor < commands.length) {
                var command = commands[computer.cursor];
                command.execute();
            }

            expect(computer.register('a').value).to.equal(9227771);
            done();
        });
    });

});
