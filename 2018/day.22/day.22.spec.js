const { expect } = require('chai')
const puzzle = require('../puzzle.input')
const {
    isRocky,
    isWet,
    isNarrow,
    erosionLevel,
    clearCache
} = require('./lib')
describe('day 22 challenge', ()=>{

    describe('part 1', ()=> {

        beforeEach(()=>{
            clearCache()
        })

        it('has an example', ()=>{
            var mouth = { x:0, y:0 }
            var target = { x:10, y:10 }
            var depth = 510

            var risk = 0
            for (var x=0; x<target.x+1; x++) {
                for (var y=0; y<target.y+1; y++) {
                    if (isWet({x:x,y:y}, depth, mouth, target)) { risk += 1}
                    if (isNarrow({x:x,y:y}, depth, mouth, target)) { risk += 2}
                }
            }

            expect(risk).to.equal(114)
        })

        it('relies on types', ()=>{
            var mouth = { x:0, y:0 }
            var target = { x:10, y:10 }
            var depth = 510

            expect(isRocky({x:0, y:0}, depth, mouth, target)).to.equal(true)
            expect(isWet({x:1, y:0}, depth, mouth, target)).to.equal(true)
            expect(isRocky({x:0, y:1}, depth, mouth, target)).to.equal(true)
            expect(isNarrow({x:1, y:1}, depth, mouth, target)).to.equal(true)
            expect(isRocky({x:10, y:10}, depth, mouth, target)).to.equal(true)
        })

        it('can draw the example', ()=>{
            var mouth = { x:0, y:0 }
            var target = { x:10, y:10 }
            var depth = 510

            var map = []
            for (var y=0; y<target.y+1; y++) {
                var line = ''
                for (var x=0; x<target.x+1; x++) {
                    var erosion = erosionLevel({x:x,y:y}, depth, mouth, target)
                    var area = '.'
                    if (erosion % 3 == 1) { area = '=' }
                    if (erosion % 3 == 2) { area = '|' }

                    if (mouth.x == x && mouth.y == y) { area = 'M' }
                    if (target.x == x && target.y == y) { area = 'T' }

                    line += area
                }
                map.push(line)
                console.log(line);
            }
        })

        it('works', ()=>{
            var mouth = { x:0, y:0 }
            var target = { x:9, y:796 }
            var depth = 6969

            var risk = 0
            for (var x=0; x<target.x+1; x++) {
                for (var y=0; y<target.y+1; y++) {
                    var erosion = erosionLevel({x:x,y:y}, depth, mouth, target)

                    if (erosion % 3 == 1) { risk += 1}
                    if (erosion % 3 == 2) { risk += 2}
                }
            }

            expect(risk).to.equal(7901)
        })
    })
})
