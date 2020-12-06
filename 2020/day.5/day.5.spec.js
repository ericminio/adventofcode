const { expect } = require('chai')
const { lines, puzzle } = require('../puzzle.input')
const {
    parseEntriesIntoString
} = require('../parsing')

describe('day 5 challenge', ()=> {

    describe('part 1', ()=>{

        let answer = (entries)=> {
            let ids = entries.map(b => b.seatId)
            let max = Math.max.apply(null, ids)

            return max
        }
        let parseEntries = (file)=>{
            let input = lines('day.5', file)
            return parseEntriesIntoString(input, decodePass)
        }
        
        describe('example', ()=>{

            let entries
            beforeEach(()=>{
                entries = parseEntries('example.txt')
            })

            it('has 5 definitions', ()=>{                
                expect(entries.length).to.equal(4)
            })
            it('has a smaller set', ()=>{
                expect(answer(entries)).to.equal(820)
            })
        })

        it('is solved', ()=>{
            let entries = parseEntries('input.txt')
            expect(answer(entries)).to.equal(874)
        })
    })
    
    describe('decode position', ()=>{

        it('decodes row', ()=>{
            expect(decodeRow('FBFBBFFRLR')).to.equal(44)
        })
        it('decodes column', ()=>{
            expect(decodeColumn('FBFBBFFRLR')).to.equal(5)
        })
    })
    
    let decodePass = (line)=> {
        let pass = {
            row: decodeRow(line),
            column: decodeColumn(line)
        }
        pass.seatId = 8 * pass.row + pass.column
        return pass;
    }
    let decodeRow = (line)=> {
        return decodePosition(line, { 
            extract: (line)=> line.substring(0, 7),
            range: { min:0, max:127 },
            keepLowerPart: 'F',
            keepUpperPart: 'B'
        })
    }
    let decodePosition = (line, options)=> {
        let codes = options.extract(line).split('')
        let range = options.range
        for(var i=0; i<codes.length-1; i++) {
            let code = codes[i]
            let nextRange            
            if (code == options.keepLowerPart) {
                nextRange = { 
                    min: range.min,
                    max: range.min + center(range) - 1
                }
            }
            if(code==options.keepUpperPart) {
                nextRange = {
                    min: range.min + center(range),
                    max: range.max,
                }
            }
            range = nextRange
        }
        if (codes[codes.length-1]==options.keepLowerPart) {
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
        return decodePosition(line, { 
            extract: (line)=> line.substring(7),
            range: { min:0, max:7 },
            keepLowerPart: 'L',
            keepUpperPart: 'R'
        })
    }


    describe('part 2', ()=>{

        let seats
        beforeEach(()=>{
            let input = puzzle('day.5')
            seats = parseEntriesIntoString(input, decodePass)
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
