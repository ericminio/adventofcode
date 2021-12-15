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
    }
    class Position {
        constructor(row, column) {
            this.row = row;
            this.column = column;
        }
    }
    
})
