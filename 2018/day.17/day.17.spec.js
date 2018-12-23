const { expect } = require('chai')
const puzzle = require('../puzzle.input')
const {
	digest,
	fromDrawing,
	Map,
	tick,
	visual,
	eventually,
	reservoirHeight
} = require('./lib')
const { SPRING, SAND, CLAY, FLOW, WATER } = require('./codes')

describe('day 17 challenge', ()=> {

    describe('part 1', ()=>{

        describe('map', ()=>{
			var map
			beforeEach(()=>{
				var lines = puzzle.lines('day.17', 'example.txt')
				map = digest(lines)
			})

			it('can read spring', ()=>{
				expect(map.point(0, 6)).to.equal(-1)
				for (var i=0; i<map.width(); i++) {
					if (i != 6) {
						expect(map.point(0, i)).to.equal(0)
					}
				}
			})
			it('can read height', ()=>{
				expect(map.height()).to.equal(14)
			})
			it('can read clay from vertical input', ()=>{
				expect(map.point(3, 4)).to.equal(1)
			})
			it('can read clay from horizontal input', ()=>{
				expect(map.point(7, 1)).to.equal(1)
				expect(map.point(7, 2)).to.equal(1)
				expect(map.point(7, 3)).to.equal(1)
				expect(map.point(7, 4)).to.equal(1)
				expect(map.point(7, 5)).to.equal(1)
				expect(map.point(7, 6)).to.equal(1)
				expect(map.point(7, 7)).to.equal(1)
			})
			it('leaves other points as sand', ()=>{
				expect(map.point(7, 0)).to.equal(0)
				expect(map.point(7, 8)).to.equal(0)
			})
			it('identifies starting flow', ()=>{
				expect(map.focus).to.deep.equal([
					{ line:1, column:6 }
				])
			})
			it('knows highest reservoir', ()=>{
				expect(map.highest).to.equal(6)
			})
			it('exposes minimum line', ()=>{
				var map = fromDrawing([
					'..+.',
					'....',
					'..#.',
					'....',
				])
				expect(map.highestLine()).to.equal(2)
			})
			it('exposes minimum line of example', ()=>{
				expect(map.highestLine()).to.equal(1)
			})
        })

		describe('drawing', ()=>{
			var map
			beforeEach(()=>{
				map = fromDrawing([
					'..+.',
					'#...'
				])
			})
			it('exposes spring', ()=>{
				expect(map.point(0, 2)).to.equal(-1)
			})
			it('exposes sand', ()=>{
				expect(map.point(0, 0)).to.equal(0)
			})
			it('exposes clay', ()=>{
				expect(map.point(1, 0)).to.equal(1)
			})
			it('exposes height', ()=>{
				expect(map.height()).to.equal(2)
			})
			it('exposes width', ()=>{
				expect(map.width()).to.equal(4)
			})
			it('exposes highest reservoir', ()=>{
				map = fromDrawing([
					'..+.',
					'...#',
					'#..#',
					'####',
				])
				expect(map.highest).to.equal(3)
			})
		})

		describe('flow', ()=>{
			it('starts from spring', ()=>{
				var map = fromDrawing([
					'..+.',
					'....',
					'....'
				])
				tick(map)
				expect(visual(map)).to.deep.equal([
					'..+.',
					'..|.',
					'....'
				])
			})
			it('continues from spring', ()=>{
				var map = fromDrawing([
					'..+.',
					'....',
					'....'
				])
				tick(map)
				tick(map)
				expect(visual(map)).to.deep.equal([
					'..+.',
					'..|.',
					'..|.'
				])
			})
			it('offers future vision', ()=>{
				var initial = fromDrawing([
					'..+.',
					'....',
					'....'
				])
				var stable = eventually(initial)
				expect(visual(stable)).to.deep.equal([
					'..+.',
					'..|.',
					'..|.'
				])
			})
			it('avoids clay', ()=>{
				var map = fromDrawing([
					'..+.',
					'....',
					'..#.',
					'....',
				])
				eventually(map)
				expect(visual(map)).to.deep.equal([
					'..+.',
					'.|||',
					'.|#|',
					'.|.|',
				])
			})
			it('overflows', ()=>{
				var map = fromDrawing([
					'...+...',
					'.......',
					'.......',
					'..#.#..',
					'..###..',
				])
				eventually(map)
				expect(visual(map)).to.deep.equal([
					'...+...',
					'...|...',
					'.|||||.',
					'.|#~#|.',
					'.|###|.',
				])
			})
			it('fills 1 level', ()=>{
				var initial = fromDrawing([
					'....+....',
					'.........',
					'.........',
					'..#...#..',
					'..#####..',
				])
				var stable = eventually(initial)
				expect(visual(stable)).to.deep.equal([
					'....+....',
					'....|....',
					'.|||||||.',
					'.|#~~~#|.',
					'.|#####|.',
				])
			})
			it('fills 2 levels', ()=>{
				var initial = fromDrawing([
					'....+....',
					'.........',
					'.........',
					'..#...#..',
					'..#...#..',
					'..#####..',
				])
				var stable = eventually(initial)
				expect(visual(stable)).to.deep.equal([
					'....+....',
					'....|....',
					'.|||||||.',
					'.|#~~~#|.',
					'.|#~~~#|.',
					'.|#####|.',
				])
			})
			it('fills 2 jars', ()=>{
				var initial = fromDrawing([
					'....+......',
					'...........',
					'...........',
					'..#...#....',
					'..#...#....',
					'..#####....',
					'...........',
					'...........',
					'......#.#..',
					'......###..',
				])
				var stable = eventually(initial)
				expect(visual(stable)).to.deep.equal([
					'....+......',
					'....|......',
					'.|||||||...',
					'.|#~~~#|...',
					'.|#~~~#|...',
					'.|#####|...',
					'.|.....|...',
					'.|...|||||.',
					'.|...|#~#|.',
					'.|...|###|.',
				])
			})
		})

		describe('focus', ()=>{
			it('follows the flow after one tick', ()=>{
				var map = fromDrawing([
					'..+.',
					'....',
					'....'
				])
				tick(map)

				expect(map.focus).to.deep.equal([
					{ line:1, column:2 },
					{ line:1, column:1 },
					{ line:1, column:3 },
					{ line:2, column:2 },
				])
			})
			it('keeps the point above reservoir while falling', ()=>{
				var map = fromDrawing([
					'..+..',
					'.....',
					'#...#',
					'#...#',
					'#####',
				])
				tick(map)
				tick(map)

				expect(map.focus).to.deep.equal([
					{ line:1, column:2 },
					{ line:1, column:1 },
					{ line:1, column:3 },
					{ line:2, column:2 },
					{ line:2, column:1 },
					{ line:2, column:3 },
					{ line:3, column:2 },
				])
			})
		})

		describe('reservoir height', ()=>{
			it('works above side', ()=>{
				var map = fromDrawing([
					'..+.........',
					'........#..#',
					'.#..#...#..#',
					'.#..#...#..#',
					'.####...####'
				])
				expect(reservoirHeight(1, 1, map)).to.equal(3)
			})
			it('works above side with sand below', ()=>{
				var map = fromDrawing([
					'..+.........',
					'........#..#',
					'.#..#...#..#',
					'.#..#...#..#',
					'.####...####',
					'............'
				])
				expect(reservoirHeight(1, 1, map)).to.equal(3)
			})
			it('works with 2 reservoirs', ()=>{
				var map = fromDrawing([
					'..+.........',
					'........#..#',
					'.#..#...#..#',
					'.#..#...#..#',
					'.####...####',
					'............',
					'........#..#',
					'.#..#...#..#',
					'.####...####',
					'............'
				])
				expect(reservoirHeight(1, 1, map)).to.equal(3)
			})
			it('works', ()=>{
				var map = fromDrawing([
					'...+........',
					'........#..#',
					'.#...#...#..#',
					'.#...#...#..#',
					'.#####...####'
				])
				expect(reservoirHeight(1, 3, map)).to.equal(3)
			})
			it('works with different sides', ()=>{
				var map = fromDrawing([
					'...+........',
					'........#..#',
					'.....#...#..#',
					'.#...#...#..#',
					'.#####...####'
				])
				expect(reservoirHeight(1, 3, map)).to.equal(3)
			})
			it('resists no reservoir', ()=>{
				var map = fromDrawing([
					'...+...',
					'.......',
					'.......',
					'.......'
				])
				expect(reservoirHeight(1, 3, map)).to.equal(-1)
			})
			it('resists isolated clay', ()=>{
				var map = fromDrawing([
					'...+...',
					'.......',
					'...#...',
					'.......'
				])
				expect(reservoirHeight(1, 3, map)).to.equal(-1)
			})
			it('resists isolated clays', ()=>{
				var map = fromDrawing([
					'...+...',
					'.......',
					'...#...',
					'...#...'
				])
				expect(reservoirHeight(1, 3, map)).to.equal(2)
			})
			it('resists being in the reservoir', ()=>{
				var map = fromDrawing([
					'...+...',
					'.#...#.',
					'.#...#.',
					'.#####.'
				])
				expect(reservoirHeight(2, 3, map)).to.equal(3)
			})
		})

		describe('example', ()=>{

			it.skip('challenges reservoir height calculation', ()=>{
				var lines = puzzle.lines('day.17', 'example.txt')
				var map = digest(lines)

				expect(reservoirHeight(7, 8, map)).to.equal(4)
				expect(reservoirHeight(10, 8, map)).to.equal(4)
			})

			it('works', ()=>{
				var lines = puzzle.lines('day.17', 'example.txt')
				var initial = digest(lines)
				var stable = eventually(initial)
				var expected = puzzle.lines('day.17', 'example-target.txt')

				expect(visual(stable)).to.deep.equal(expected)
				expect(stable.value()).to.equal(57)
			})
		})

		it.skip('is solved', ()=>{
			var lines = puzzle.lines('day.17', 'input.txt')
			var initial = digest(lines)
			var stable = eventually(initial)

			expect(stable.value()).to.equal(34775)
		})
	})

	describe('part 2', ()=>{

		var waterTilesCount = (map)=>{
			var sum = 0
			for (var line=map.highestLine(); line<map.height(); line++) {
				for (var column=0; column < map.width(); column++) {
					var point = map.point(line, column)
					if (point == WATER) {
						sum ++
					}
				}
			}
			return sum
		}

		it('works', ()=>{
			var lines = puzzle.lines('day.17', 'example.txt')
			var initial = digest(lines)
			var map = eventually(initial)

			expect(waterTilesCount(map)).to.equal(29)
		})

		it.skip('is solved', ()=>{
			var lines = puzzle.lines('day.17', 'input.txt')
			var initial = digest(lines)
			var map = eventually(initial)

			expect(waterTilesCount(map)).to.equal(27086)
		})
	})
})
