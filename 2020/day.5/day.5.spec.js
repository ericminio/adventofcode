const { expect } = require('chai')
const { lines, puzzle } = require('../puzzle.input')


describe('day 5 challenge', ()=> {

    describe('example', ()=>{

        let input
        beforeEach(()=>{
            input = lines('day.5', 'example.txt')
        })
        it('has 4 definitions', ()=>{
            expect(input.length).to.equal(4)
        })
        describe('target', ()=>{

            it('is to identify the highest seat id', ()=>{
                let ids = decode(input).map(b => b.seatId)
                let max = Math.max.apply(null, ids)
                
                expect(max).to.equal(820)
            })
        })        
    })
    describe('decodePass', ()=>{

        it('decodes row', ()=>{
            expect(decodeRow('FBFBBFFRLR')).to.equal(44)
        })
        it('decodes column', ()=>{
            expect(decodeColumn('FBFBBFFRLR')).to.equal(5)
        })
    })
    let decode = (lines)=>{
        let passes = []
        for (var i=0;i<lines.length;i++) {
            let line = lines[i]
            passes.push(decodePass(line))
        }

        return passes;
    }
    let decodePass = (line)=> {
        let pass = {
            row: decodeRow(line),
            column: decodeColumn(line)
        }
        pass.seatId = 8 * pass.row + pass.column
        return pass;
    }
    let decodeRow = (line)=> {
        let codes = line.substring(0, 7).split('')
        let range = { min:0, max:127 }
        for(var i=0; i<codes.length-1; i++) {
            // console.log(range)
            let code = codes[i]
            let nextRange            
            if (code == 'F') {
                nextRange = { 
                    min: range.min,
                    max: range.min + center(range) - 1
                }
            }
            if(code=='B') {
                nextRange = {
                    min: range.min + center(range),
                    max: range.max,
                }
            }
            range = nextRange
        }
        // console.log(range )
        if (codes[codes.length-1]=='F') {
            return range.min
        }
        else {
            return range.max
        }
    }
    let center = (range)=> {
        return Math.floor((range.max - range.min + 1)/2)
    }
    let decodeColumn = (line)=> {
        let codes = line.substring(7).split('')
        let range = { min:0, max:7 }
        for(var i=0; i<codes.length-1; i++) {
            // console.log(range)
            let code = codes[i]
            let nextRange            
            if (code == 'L') {
                nextRange = { 
                    min: range.min,
                    max: range.min + center(range) - 1
                }
            }
            if(code=='R') {
                nextRange = {
                    min: range.min + center(range),
                    max: range.max,
                }
            }
            range = nextRange
        }
        // console.log(range )
        if (codes[codes.length-1]=='L') {
            return range.min
        }
        else {
            return range.max
        }
    }

    it('has a part 1', ()=>{
        let input = puzzle('day.5')
        let ids = decode(input).map(b => b.seatId)
        let max = Math.max.apply(null, ids)
        
        expect(max).to.equal(874)
    })

    describe('part 2', ()=>{

        let seats
        beforeEach(()=>{
            let input = puzzle('day.5')
            seats = decode(input)
            seats.sort((a, b)=>{
                if (a.row < b.row) {
                    return -1
                }
                if (a.row > b.row) {
                    return 1
                }
                if (a.column < b.column) {
                    return -1
                }
                return 1
            })
        })

        it('has a firt row', ()=>{
            expect(seats[0].row).to.equal(6)
        })

        it('has a last row', ()=>{
            expect(seats[seats.length-1].row).to.equal(109)
        })

        it('has 8 seats per row', ()=>{
            let seatId 
            let found = false
            let index = 0
            let row = 6
            while (!found && row < 110) {

                let column = 0
                while (!found && column < 8) {
                    let seat = seats[index]
                    index += 1

                    if (seat.row != row || seat.column != column) {
                        found = true
                        seatId = 8 * row + column
                    }
                    column += 1
                }
                row += 1
            }
            
            expect(seatId).to.equal(594)    
            
        })
    })

    
})

