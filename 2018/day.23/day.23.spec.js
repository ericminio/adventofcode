const { expect } = require('chai')
const puzzle = require('../puzzle.input')
const {
    parse,
    strongest,
    inRange,
    nanobotsInRange,
    rectangle,
    doIntersect,
    weakest,
    isolated,
    isInRange,
    manhatan
} = require('./lib')

describe('day 23 challenge', ()=> {

	describe('part 1', ()=>{

		it('has an example', ()=>{
			var lines = puzzle.lines('day.23', 'example-1.txt')
            var nanobots = parse(lines)
            var nanobot = strongest(nanobots)
            expect(nanobot).to.deep.equal({ x:0, y:0, z:0, r:4 })

            var count = inRange(nanobot, nanobots)
            expect(count).to.equal(7)
		})

        it('is solved', ()=>{
			var lines = puzzle.lines('day.23', 'input.txt')
            var nanobots = parse(lines)
            var nanobot = strongest(nanobots)
            expect(nanobot).to.deep.equal({ x:68647597, y:57952122, z:11099502, r:99192429 })

            var count = inRange(nanobot, nanobots)
            expect(count).to.equal(309)
		})
	})

    describe('part 2', ()=>{

        var remove = (nanobot, collection)=> {
            var cleaned = []
            for (var i=0; i<collection.length;i++) {
                var candidate = collection[i]
                if (candidate.x != nanobot.x || candidate.y != nanobot.y || candidate.z != nanobot.z) {
                    cleaned.push(candidate)
                }
            }
            return cleaned
        }

		it('exploration', ()=>{
			var lines = puzzle.lines('day.23', 'input.txt')
            var nanobots = parse(lines)
            var boss, next = nanobots

            while (next.length > 2) {
                boss = strongest(next)
                next = nanobotsInRange(boss, next)
                next = remove(boss, next)
            }
            console.log(next);
            console.log(doIntersect(next[0], next[1]));

            var nanobot = next[0]
            var master = next[1]

            var radius = nanobot.r
            var offsets = [
                { dx:+1, dy:+1 },
                { dx:-1, dy:+1 },
                { dx:+1, dy:-1 },
                { dx:-1, dy:-1 }
            ]
            var candidates = []
            var min = manhatan({ x:0, y:0, z:0 }, nanobot)
            for (var i=0; i<=radius; i++) {
                for (var j=0; j<offsets.length; j++) {
                    var offset = offsets[j]
                    var candidate = {
                        x: nanobot.x +  i * offset.dx,
                        y: nanobot.y + (radius - i) * offset.dy,
                        z: nanobot.z
                    }
                    if (isInRange(candidate, master)) {
                        var distance = manhatan({ x:0, y:0, z: 0}, candidate)
                        if (distance < min) {
                            candidates.push(candidate)
                            min = distance
                        }
                    }
                }
            }
            console.log(candidates.length, candidates[candidates.length-1], min);

		})
	})


})
