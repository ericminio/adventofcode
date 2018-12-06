const { expect } = require('chai')
const { puzzle } = require('../puzzle.input')

describe.only('day 6 challenge', ()=> {

    var rectangle = function(points) {
        var max = { x:0, y:0 }
        points.forEach((point)=>{
            if (point.x > max.x) { max.x = point.x }
            if (point.y > max.y) { max.y = point.y }
        })
        var min = { x:max.x, y:max.y }
        points.forEach((point)=>{
            if (point.x < min.x) { min.x = point.x }
            if (point.y < min.y) { min.y = point.y }
        })
        return { min:min, max:max }
    }
    var candidates = function(points) {
        var internals = []
        var bounds = rectangle(points)
        points.forEach((point)=>{
            if (point.x > bounds.min.x
                && point.y > bounds.min.y
                && point.x < bounds.max.x
                && point.y < bounds.max.y) {
                    internals.push(point)
                }
        })
        return internals
    }
    var distance = function(p1, p2) {
        return Math.abs(p1.x-p2.x) + Math.abs(p1.y-p2.y)
    }
    var closest = function(p, points) {
        var min = 10000
        var found
        points.forEach((point)=>{
            var d = distance(p, point)
            if (d==min) {
                found = undefined
            }
            if (d<min) {
                min = d
                found = point
            }
        })
        return found
    }
    var area = function(center, points) {
        var count = 0
        var bounds = rectangle(points)
        for (var x=bounds.min.x; x<=bounds.max.x; x++) {
            for (var y=bounds.min.y ; y<= bounds.max.y; y++) {
                var found = closest({x:x,y:y}, points)
                if (found) {
                    if (found.x == center.x && found.y == center.y) {
                        count ++
                    }
                }
            }
        }
        return count
    }

    var points = [
        { letter:'A', x:1, y:1 },
        { letter:'B', x:1, y:6 },
        { letter:'C', x:8, y:3 },
        { letter:'D', x:3, y:4 },
        { letter:'E', x:5, y:5 },
        { letter:'F', x:8, y:9 }
    ]

    describe('part 1', ()=>{

        it('can be explored #1', ()=>{
            expect(rectangle(points)).to.deep.equal({
                min: { x:1, y:1 },
                max: { x:8, y:9 },
            })
        })
        it('can be explored #2', ()=>{
            expect(candidates(points)).to.deep.equal([
                { letter:'D', x:3, y:4 },
                { letter:'E', x:5, y:5 }
            ])
        })
        it('can be explored #3', ()=>{
            expect(distance({ x:8, y:3 }, { x:3, y:4 })).to.equal(6)
        })
        it('can be explored #4', ()=>{
            expect(area({ letter:'D', x:3, y:4 }, points)).to.equal(9)
            expect(area({ letter:'E', x:5, y:5 }, points)).to.equal(17)
        })
        it('can be explored #5', ()=>{
            var max = 0
            var centers = candidates(points)
            centers.forEach((center)=>{
                var size = area(center, points)
                if (size > max) {
                    max = size
                }
            })
            expect(max).to.equal(17)
        })
        it('can be explored #6', ()=>{
            var input = puzzle('day.6')
            var points = []
            input.forEach((line)=>{
                var x = /(.*),\s(.*)/.exec(line)[1]
                var y = /(.*),\s(.*)/.exec(line)[2]
                points.push({ x:parseInt(x), y:parseInt(y) })
            })
        })
        it('can be explored #7', ()=>{
            expect(closest({ x:2, y:4 }, points)).to.deep.equal({ letter:'D', x:3, y:4 })
            expect(closest({ x:1, y:4 }, points)).to.equal(undefined)
        })
        it.skip('is solved', ()=>{
            var input = puzzle('day.6')
            var points = []
            input.forEach((line)=>{
                var x = /(.*),\s(.*)/.exec(line)[1]
                var y = /(.*),\s(.*)/.exec(line)[2]
                points.push({ x:parseInt(x), y:parseInt(y) })
            })
            var max = 0
            var centers = candidates(points)
            centers.forEach((center)=>{
                var size = area(center, points)
                if (size > max) {
                    max = size
                }
            })
            expect(max).to.equal(5429)
        })
    })

    describe('part 2', ()=>{

        it('can be explored #1', ()=>{
            var count = 0
            var bounds = rectangle(points)
            for (var x=bounds.min.x; x<=bounds.max.x; x++) {
                for (var y=bounds.min.y ; y<= bounds.max.y; y++) {
                    var d = 0
                    points.forEach((center)=>{
                        d += distance({x:x, y:y}, center)
                    })
                    if (d < 32) {
                        count ++
                    }
                }
            }
            expect(count).to.equal(16)
        })

        it.skip('is solved', ()=>{
            var input = puzzle('day.6')
            var points = []
            input.forEach((line)=>{
                var x = /(.*),\s(.*)/.exec(line)[1]
                var y = /(.*),\s(.*)/.exec(line)[2]
                points.push({ x:parseInt(x), y:parseInt(y) })
            })
            var count = 0
            var bounds = rectangle(points)
            for (var x=bounds.min.x; x<=bounds.max.x; x++) {
                for (var y=bounds.min.y ; y<= bounds.max.y; y++) {
                    var d = 0
                    points.forEach((center)=>{
                        d += distance({x:x, y:y}, center)
                    })
                    if (d < 10000) {
                        count ++
                    }
                }
            }
            expect(count).to.equal(32614)
        })
    })
})
