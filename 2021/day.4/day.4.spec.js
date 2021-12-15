const { expect } = require('chai')
const { raw } = require('../puzzle.input')

describe.only('day 4 challenge', ()=> {

    const example = raw('day.4', 'example.txt');
    
    describe('example', () => {

        it('consists of numbers', () => {
            expect(numbers(example)).to.deep.equal([7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1]);
        })
        it('consists of 4 boards', () => {
            expect(parseBoards(example).length).to.equal(3)
        })
        it('has expected board', () => {
            let boards = parseBoards(example);
            
            expect(boards[2].valueAt(new Position(4, 3))).to.equal(3);
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
            this.matrix = matrix;
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
                    return this.matrix[position.row][position.column];
                }
            return summit;
        }
    }
    class Position {
        constructor(row, column) {
            this.row = row;
            this.column = column;
        }
    }
    
})
