const { expect } = require('chai')
const { puzzle, lines } = require('../puzzle.input')

const travel = (input, start, slope)=>{
    let height = input.length
    let width = input[0].length
    let position = start
    let treeCount = 0
    while (position.y < height-1) {
        position.x += slope.dx
        position.y += slope.dy

        let cell = input[position.y % height][position.x % width]
        if (cell == '#') {
            treeCount += 1
        }
    }
    return treeCount;
}
let check = (slopes, input)=>{
    return slopes
        .map(slope => travel(input, { x:0, y:0 }, slope))
        .reduce((acc, current)=> acc * current, 1)
}

describe('day 3 challenge', ()=> {

    describe('example', ()=>{

        let input
        beforeEach(()=>{
            input = lines('day.3', 'example.txt')
        })
        it('has 11 lines', ()=>{
            expect(input.length).to.equal(11)
        })
        it('has 11 columns', ()=>{
            expect(input[0].length).to.equal(11)
        })
        
        it('can be travelled', ()=>{
            expect(travel(input, { x:0, y:0 }, { dx:3, dy:1 })).to.equal(7)
        })
        it('leads to part 1 solution', ()=>{
            let input = puzzle('day.3')
            expect(travel(input, { x:0, y:0 }, { dx:3, dy:1 })).to.equal(181)
        })
    })
    describe('part 2', ()=>{

        let slopes = [
            { dx:1, dy:1 },
            { dx:3, dy:1 },
            { dx:5, dy:1 },
            { dx:7, dy:1 },
            { dx:1, dy:2 }
        ]
        it('also has an example', ()=>{
            expect(check(slopes, lines('day.3', 'example.txt'))).to.equal(336)
        })
        it('is straigthforward actually', ()=>{
            expect(check(slopes, puzzle('day.3'))).to.equal(1260601650)
        })
    })
})

