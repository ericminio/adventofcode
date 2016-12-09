var expect = require('chai').expect;
var request = require('request');
var credentialsFor = require('../me');

describe('2016 day 8 challenge', function() {

    var url = 'http://adventofcode.com/2016/day/8/input';

    it('includes part 1', function(done) {
        request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
            var commands = input.split('\n');
            var board = new Board(50, 6);
            for (var i=0; i<commands.length; i++) {
                var command = createCommand(commands[i]);
                if (command) { command.modify(board); }
            }

            var count = 0;
            for (var column=0; column<50; column++) {
                for (var row=0; row<6; row ++) {
                    if (board.isLit(column, row)) { count ++; }
                }
            }
            expect(count).to.equal(128);
            done();
        });
    });

    it('includes part 1', function(done) {
        request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
            var commands = input.split('\n');
            var board = new Board(50, 6);
            for (var i=0; i<commands.length; i++) {
                var command = createCommand(commands[i]);
                if (command) { command.modify(board); }
            }

            console.log(draw(board));
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

            it('offers a swith-off api', function() {
                var board = new Board(5, 3);
                board.switchOn(3, 2);
                board.switchOff(3, 2);

                expect(board.isLit(3, 2)).to.equal(false);
            });
        });

        describe('rect command', function() {

            it('switches on top-left corner', function() {
                var board = new Board(4, 3);
                var rect = createCommand('rect 3x2');
                rect.modify(board);

                expect(draw(board)).to.deep.equal([
                    '###.',
                    '###.',
                    '....'
                ]);
            });
        });

        describe('rotate column command', function() {

            it('moves lights down', function() {
                var board = new Board(4, 3);
                createCommand('rect 3x2').modify(board);
                createCommand('rotate column x=1 by 1').modify(board);

                expect(draw(board)).to.deep.equal([
                    '#.#.',
                    '###.',
                    '.#..'
                ]);
            });

            it('wraps back bottom pixel', function() {
                var board = new Board(4, 3);
                createCommand('rect 3x2').modify(board);
                createCommand('rotate column x=1 by 1').modify(board);
                createCommand('rotate column x=1 by 1').modify(board);

                expect(draw(board)).to.deep.equal([
                    '###.',
                    '#.#.',
                    '.#..'
                ]);
            });

            it('can move by more than 1', function() {
                var board = new Board(4, 3);
                createCommand('rect 3x2').modify(board);
                createCommand('rotate column x=1 by 2').modify(board);

                expect(draw(board)).to.deep.equal([
                    '###.',
                    '#.#.',
                    '.#..'
                ]);
            });
        });

        describe('rotate row command', function() {

            it('moves lights right', function() {
                var board = new Board(4, 3);
                createCommand('rect 3x2').modify(board);
                createCommand('rotate row y=1 by 1').modify(board);

                expect(draw(board)).to.deep.equal([
                    '###.',
                    '.###',
                    '....'
                ]);
            });

            it('wraps back right pixel', function() {
                var board = new Board(4, 3);
                createCommand('rect 3x2').modify(board);
                createCommand('rotate row y=1 by 1').modify(board);
                createCommand('rotate row y=1 by 1').modify(board);

                expect(draw(board)).to.deep.equal([
                    '###.',
                    '#.##',
                    '....'
                ]);
            });

            it('can move by more than 1', function() {
                var board = new Board(4, 3);
                createCommand('rect 3x2').modify(board);
                createCommand('rotate row y=1 by 2').modify(board);

                expect(draw(board)).to.deep.equal([
                    '###.',
                    '#.##',
                    '....'
                ]);
            });
        });
    });
});

var createCommand = function(line) {
    if (line.indexOf('rect') == 0) { return new RectCommand(line); }
    if (line.indexOf('rotate column') == 0) { return new RotateColumnCommand(line); }
    if (line.indexOf('rotate row') == 0) { return new RotateRowCommand(line); }
};

var RectCommand = function(line) {
    var size = line.split(' ')[1];
    this.width = +size.substring(0, size.indexOf('x'));
    this.height = +size.substring(size.indexOf('x')+1);
};
RectCommand.prototype.modify = function(board) {
    for (var i=0; i<this.height; i++) {
        for (var j=0; j<this.width; j++) {
            board.switchOn(j, i);
        }
    }
};

var RotateColumnCommand = function(line) {
    this.column = +line.substring(line.indexOf('=')+1, line.indexOf('by'));
    this.steps = +line.substring(line.indexOf('by')+2);
};
RotateColumnCommand.prototype.modify = function(board) {
    for (var step=0; step<this.steps; step++) {
        this.move(board);
    }
};
RotateColumnCommand.prototype.move = function(board) {
    var wasLastPixelLit = board.isLit(this.column, board.lastRow);
    for (var row=board.lastRow; row>0; row--) {
        board.isLit(this.column, row-1) ?
            board.switchOn(this.column, row) :
            board.switchOff(this.column, row);
    }
    wasLastPixelLit ? board.switchOn(this.column, 0) : board.switchOff(this.column, 0);
};

var RotateRowCommand = function(line) {
    this.row = +line.substring(line.indexOf('=')+1, line.indexOf('by'));
    this.steps = +line.substring(line.indexOf('by')+2);
};
RotateRowCommand.prototype.modify = function(board) {
    for (var step=0; step<this.steps; step++) {
        this.move(board);
    }
};
RotateRowCommand.prototype.move = function(board) {
    var wasLastPixelLit = board.isLit(board.lastColumn, this.row);
    for (var column=board.lastColumn; column>0; column--) {
        board.isLit(column-1, this.row) ?
            board.switchOn(column, this.row) :
            board.switchOff(column, this.row);
    }
    wasLastPixelLit ? board.switchOn(0, this.row) : board.switchOff(0, this.row);
};

var Board = function(width, height) {
    this.cells = [];
    for (var i=0; i<height; i++) {
        var row = [];
        for (var j=0; j<width; j++) {
            row.push(false);
        }
        this.cells.push(row);
    }
    this.lastRow = height-1;
    this.lastColumn = width-1;
};

Board.prototype.isLit = function(column, row) {
    return this.cells[row][column];
};
Board.prototype.switchOn = function(column, row) {
    this.cells[row][column] = true;
};
Board.prototype.switchOff = function(column, row) {
    this.cells[row][column] = false;
};

var draw = function(board) {
    var rendering = [];
    for (var i=0; i<board.cells.length; i++) {
        var row = '';
        for (var j=0; j<board.cells[i].length; j++) {
            row += board.cells[i][j] ? '#' : '.';
        }
        rendering.push(row);
    }
    return rendering;
};
