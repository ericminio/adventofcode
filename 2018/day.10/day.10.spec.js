const { expect } = require('chai')
const puzzle = require('../puzzle.input')
const { parser, display, sort, tic, minX, minY, maxX, maxY, log,
        rectangle, velocities, strings
} = require('./lib')

describe('day 10 challenge', ()=> {

    describe('part 1', ()=>{

        var file = function(id, lines) {
            var fs = require('fs')
            fs.writeFileSync('2018/day.10/tics/tic-'+id+'.txt', lines.join('\n'))
        }
        it('can be explored', ()=>{
            var lights = [
                { x:-10, y:10, vx:1, vy:-1 },
                { x:-10, y:-10, vx:1, vy:1 },
                { x:10, y:10, vx:-1, vy:-1 },
                { x:10, y:-10, vx:-1, vy:1 },
            ]
            var groups = velocities(lights)
            var widths = 0
            var heights = 0
            groups.forEach((group)=>{
                var bounds = rectangle(group)
                widths += bounds.width
                heights += bounds.height
            })

            expect(groups.length).to.equal(4)
            expect(widths).to.equal(4)
            expect(heights).to.equal(4)

            var time = 0
            var stop = false
            var touched = false
            while (! stop) {
                time ++
                tic(lights)
                var bounds = rectangle(lights)

                if (bounds.width <= widths && bounds.height <= heights) {
                    display(lights)
                    touched = true
                }
                if ((bounds.width > widths || bounds.height > heights) && touched) {
                    stop = true
                }
            }
        })

        it('has an example', ()=>{
            var lines = puzzle.lines('day.10', 'example.txt')
            var lights = parser(lines)

            var groups = velocities(lights)
            var widths = 0
            var heights = 0
            groups.forEach((group)=>{
                var bounds = rectangle(group)
                widths += bounds.width
                heights += bounds.height
            })

            var time = 0
            var stop = false
            var touched = false
            while (! stop) {
                time ++
                tic(lights)
                var bounds = rectangle(lights)

                if (bounds.width <= widths && bounds.height <= heights) {
                    // file(time, strings(lights))
                    touched = true
                }
                if ((bounds.width > widths || bounds.height > heights) && touched) {
                    stop = true
                }

                if (time == 3) { stop =true }
            }
            display(lights)
        })

        it('is solved', ()=>{
            var lines = puzzle.lines('day.10', 'input.txt')
            var lights = parser(lines)

            var groups = velocities(lights)
            var widths = 0
            var heights = 0
            groups.forEach((group)=>{
                var bounds = rectangle(group)
                widths += bounds.width
                heights += bounds.height
            })

            var time = 0
            var stop = false
            var touched = false
            while (! stop) {
                time ++
                tic(lights)
                var bounds = rectangle(lights)

                if (bounds.width <= widths && bounds.height <= heights) {
                    // file(time, strings(lights))
                    touched = true
                }
                if ((bounds.width > widths || bounds.height > heights) && touched) {
                    stop = true
                }

                if (time == 10932) { stop =true }
            }
            display(lights)
        })
    })

})
