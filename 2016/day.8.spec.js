var expect = require('chai').expect;
var request = require('request');
var credentialsFor = require('../me');

describe.only('2016 day 8 challenge', function() {

    var url = 'http://adventofcode.com/2016/day/8/input';

    it('includes part 1', function(done) {
        request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
            var commands = input.split('\n');
            var board = new Board(50, 6);
            for (var i=0; i<commands.length; i++) {
                var command = createCommand(commands[i]);
                command.modify(board);
            }

            var count = 0;
            for (var column=0; column<50; column++) {
                for (var row=0; row<6; row ++) {
                    if (board.isLit(column, row)) { count ++; }
                }
            }
            expect(count).to.equal(-1);
            done();
        });
    });

    describe('internals', function() {

        describe('Board', function() {

            it('is switched off by default', function() {
                var board = new Board(5, 3);
                for (var column=0; column<5; column++) {
                    for (var row=0; row<3; row ++) {
                        expect(board.isLit(column, row)).to.equal(false);
                    }
                }
            });

            it('offers a swith-on api', function() {
                var board = new Board(5, 3);
                board.switchOn(3, 2);

                expect(board.isLit(3, 2)).to.equal(true);
            });
        });
    });
});

var createCommand = function(line) {
    return {
        modify: function(board) {}
    };
};

var Board = function(width, height) {

};

Board.prototype.isLit = function(column, row) {
    return false;
};

Board.prototype.switchOn = function(column, row) {
};
