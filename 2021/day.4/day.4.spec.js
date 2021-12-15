const { expect } = require('chai')
const { raw } = require('../puzzle.input')

describe.only('day 4 challenge', ()=> {

    const example = raw('day.4', 'example.txt');
    
    describe('example', () => {

        it('consists of numbers', () => {
            expect(numbers(example)).to.deep.equal([7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1]);
        })
        it('presents boards', () => {
            let boards = parseBoards(example);
            expect(parseBoards(example).length).to.equal(3)

            for (var i =0 ; i< 3; i++) {
                expect(boards[i].rowCount()).to.equal(5)
                expect(boards[i].columnCount()).to.equal(5)
            }
            expect(boards[2].valueAt(new Position(4, 3))).to.equal(3);
            expect(boards[2].isMarked(new Position(4, 3))).to.equal(false);
        })
    })
    describe('Board', () => {
        let board;
        beforeEach(() => {
            board = new Board([
                [1, 2],
                [3, 4]
            ])
        })
        it('starts with mark not set', () => {
            expect(board.isMarked(new Position(0, 0))).to.equal(false)
        })
        it('can be set', () => {
            board.mark(new Position(1, 1))
            expect(board.isMarked(new Position(0, 0))).to.equal(false)
            expect(board.isMarked(new Position(1, 1))).to.equal(true)
        })
        it('knows if row is completed', () => {
            expect(board.hasRowCompleted(0)).to.equal(false)
            board.mark(new Position(0, 0))
            board.mark(new Position(0, 1))
            expect(board.hasRowCompleted(0)).to.equal(true)
        })
        it('knows if column is completed', () => {
            expect(board.hasColumnCompleted(0)).to.equal(false)
        })
        it('can win by row', () => {
            expect(board.doesWin()).to.equal(false)
            board.mark(new Position(0, 0))
            board.mark(new Position(0, 1))
            expect(board.doesWin()).to.equal(true)
        })
        it('can win by column', () => {
            expect(board.doesWin()).to.equal(false)
            board.mark(new Position(0, 0))
            board.mark(new Position(1, 0))
            expect(board.doesWin()).to.equal(true)
        })
        it('discloses number position', () => {
            expect(board.positionOf(5)).to.equal(undefined);
            expect(board.positionOf(3)).to.deep.equal(new Position(1, 0));
        })
    })
    

    const numbers = (input) => {
        return input[0].split(',').map(s => parseInt(s))
    }
    const parseBoards = (input) => {
        let cards = []

        let card = []
        for (var i = 2; i < input.length; i++) {
            if (input[i].trim().length == 0) {
                cards.push(new Board(card))
                card = []
            }
            else {
                card.push(input[i].split(' ').filter(s => s.length > 0).map(s => parseInt(s)))                
            }
        }

        return cards;
    }
    class Board {
        constructor(matrix){
            this.matrix = matrix.map(line => line.map(
                i => { return { value:i, marked:false }}));
        }
        rowCount() {
            return this.matrix.length;
        }
        columnCount() {
            return this.matrix[0].length;
        }
        valueAt(position) {
            if (this.matrix[position.row] !== undefined &&
                this.matrix[position.row][position.column] !== undefined) {
                    return this.matrix[position.row][position.column].value;
                }
            return summit;
        }
        isMarked(position) {
            return this.matrix[position.row][position.column].marked;
        }
        mark(position) {
            this.matrix[position.row][position.column].marked = true
        }
        hasRowCompleted(row) {
            for (var column = 0; column < this.columnCount(); column ++) {
                if (! this.isMarked(new Position(row, column))) {
                    return false;
                }
            }
            return true;
        }
        hasColumnCompleted(column) {
            for (var row =0; row < this.rowCount(); row ++) {
                if (! this.isMarked(new Position(row, column))) {
                    return false;
                }
            }
            return true;
        }
        doesWin() {
            let wins = false;
            for (var row = 0 ; row < this.rowCount(); row ++) {
                wins = wins || this.hasRowCompleted(row);
            }
            for (var column = 0; column < this.columnCount(); column ++) {
                wins = wins || this.hasColumnCompleted(column);
            }
            return wins;
        }
        positionOf(number) {
            for (var row = 0 ; row < this.rowCount(); row ++) {
                for (var column = 0; column < this.columnCount(); column ++) {
                    let position = new Position(row, column)
                    if (this.valueAt(position) == number) {
                        return position;
                    }
                }
            }
        }
        score() {
            let sum = 0;
            for (var row = 0 ; row < this.rowCount(); row ++) {
                for (var column = 0; column < this.columnCount(); column ++) {
                    let position = new Position(row, column);
                    if (! this.isMarked(position)) {
                        sum += this.valueAt(position)
                    }
                }
            }
            return sum;
        }
    }
    class Position {
        constructor(row, column) {
            this.row = row;
            this.column = column;
        }
    }

    const input = raw('day.4', 'input.txt');
    describe('part 1', () => {

        it('contains an example', () => {
            let draws = numbers(example);
            let boards = parseBoards(example);
            let theWinner = undefined;

            let count = 0;
            let draw;
            while(theWinner === undefined) {
                draw = draws[count];
                for (var i = 0 ; i<boards.length; i++) {
                    let board = boards[i];
                    let position = board.positionOf(draw);
                    if (position !== undefined) {
                        board.mark(position);
                        if (board.doesWin()) {
                            theWinner = board;
                            break;
                        }
                    }
                }
                count ++;
            }
            expect(draw).to.equal(24)
            expect(theWinner.score()).to.equal(188)

            expect(draw * theWinner.score()).to.equal(4512)
        })

        it('can be solved', () => {            
            let draws = numbers(input);
            let boards = parseBoards(input);
            let theWinner = undefined;

            let count = 0;
            let draw;
            while(theWinner === undefined) {
                draw = draws[count];
                for (var i = 0 ; i<boards.length; i++) {
                    let board = boards[i];
                    let position = board.positionOf(draw);
                    if (position !== undefined) {
                        board.mark(position);
                        if (board.doesWin()) {
                            theWinner = board;
                            break;
                        }
                    }
                }
                count ++;
            }
            expect(draw * theWinner.score()).to.equal(63424)
        })
    })

    describe('part 2', () => {
        
        it('leverages the example', () => {
            let draws = numbers(example);
            let boards = parseBoards(example);
            let winners = []

            let count = 0;
            let draw;
            while (count < draws.length) {
                draw = draws[count];
                for (var i = 0 ; i<boards.length; i++) {
                    let board = boards[i];
                    if (! board.doesWin()) {
                        let position = board.positionOf(draw);
                        if (position !== undefined) {
                            board.mark(position);
                            if (board.doesWin()) {
                                winners.push({ index:i, draw:draw, board:board })
                            }
                        }
                    }
                }
                count ++;
            }
            let winner = winners[winners.length - 1];
            expect(winner.draw * winner.board.score()).to.equal(1924)
        })

        it('can be solved', () => {
            let draws = numbers(input);
            let boards = parseBoards(input);
            let winners = []

            let count = 0;
            let draw;
            while (count < draws.length) {
                draw = draws[count];
                for (var i = 0 ; i<boards.length; i++) {
                    let board = boards[i];
                    if (! board.doesWin()) {
                        let position = board.positionOf(draw);
                        if (position !== undefined) {
                            board.mark(position);
                            if (board.doesWin()) {
                                winners.push({ index:i, draw:draw, board:board })
                            }
                        }
                    }
                }
                count ++;
            }
            let winner = winners[winners.length - 1];
            expect(winner.draw * winner.board.score()).to.equal(23541)
        })
    })
})
