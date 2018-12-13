const { expect } = require('chai')
const puzzle = require('../puzzle.input')
const {
    next
} = require('./lib')

describe('day 12 challenge', ()=> {

    describe('part 1', ()=>{

        describe('exploration', ()=>{
            it('is ready', ()=>{
                expect(1+1).to.equal(2)
            })
            it('can survive', ()=>{
                var state = '..#..'
                var rules = [
                    '..#.. => #',
                ]
                expect(next({ state:state, rules:rules, firstIndex:0 }).state).to.equal('..#..')
            })
            it('can survive on the left', ()=>{
                var state = '#..'
                var rules = [
                    '..#.. => #',
                ]
                expect(next({ state:state, rules:rules, firstIndex:0 }).state).to.equal('..#..')
            })
            it('can survive on the right', ()=>{
                var state = '..#'
                var rules = [
                    '..#.. => #',
                ]
                expect(next({ state:state, rules:rules, firstIndex:0 }).state).to.equal('..#..')
            })
            it('works with two plants', ()=>{
                var state = '..#..#'
                var rules = [
                    '..#.. => #',
                ]
                expect(next({ state:state, rules:rules, firstIndex:0 }).state).to.equal('..#..#..')
            })
            it('works with two plants matching different rules', ()=>{
                var state = '..#..##'
                var rules = [
                    '..#.. => #',
                    '..##. => #',
                ]
                expect(next({ state:state, rules:rules, firstIndex:0 }).state).to.equal('..#..#..')
            })
            it('extends to the right', ()=>{
                var state = '#'
                var rules = [
                    '..#.. => #',
                ]
                expect(next({ state:state, rules:rules, firstIndex:0 }).state).to.equal('..#..')
            })
            it('extends to the left', ()=>{
                var state = '#'
                var rules = [
                    '..#.. => #',
                ]
                expect(next({ state:state, rules:rules, firstIndex:0 }).state).to.equal('..#..')
            })

            it('can compute next generation', ()=>{
                var state = '...#..#.#..##......###...###'
                var rules = [
                    '...## => #',
                    '..#.. => #',
                    '.#... => #',
                    '.#.#. => #',
                    '.#.## => #',
                    '.##.. => #',
                    '.#### => #',
                    '#.#.# => #',
                    '#.### => #',
                    '##.#. => #',
                    '##.## => #',
                    '###.. => #',
                    '###.# => #',
                    '####. => #',
                ]
                expect(next({ state:state, rules:rules, firstIndex:0 }).state).to.equal('...#...#....#.....#..#..#..#..')
            })
        })
        it('has an example', ()=>{
            var state = '.....#..#.#..##......###...###'
            var rules = [
                '...## => #',
                '..#.. => #',
                '.#... => #',
                '.#.#. => #',
                '.#.## => #',
                '.##.. => #',
                '.#### => #',
                '#.#.# => #',
                '#.### => #',
                '##.#. => #',
                '##.## => #',
                '###.. => #',
                '###.# => #',
                '####. => #',
            ]
            var options = { state:state, rules:rules, firstIndex:-5 }
            for (var i=0; i<20; i++) {
                options = next(options)
                // console.log(options.firstIndex, options.state);
            }
            expect(options.state).to.equal('...#....##....#####...#######....#.#..##..')
            var count = 0
            for (var i=0; i<options.state.length; i++) {
                if (options.state.charAt(i) == '#') {
                    count += options.firstIndex + i
                }
            }
            expect(count).to.equal(325)
        })
        it('is solved', ()=>{
            var state = '..........#..#####.#.#.##....####..##.#.#.##.##.#####..####.#.##.....#..#.#.#...###..#..###.##.#..##.#.#.....#'
            var rules = [
                '.#.## => #',
                '.###. => #',
                '#..#. => .',
                '...## => .',
                '#.##. => #',
                '....# => .',
                '..##. => #',
                '.##.. => .',
                '##..# => .',
                '.#..# => #',
                '#.#.# => .',
                '#.... => .',
                '.#### => #',
                '.##.# => .',
                '..#.. => #',
                '####. => #',
                '#.#.. => .',
                '.#... => .',
                '###.# => .',
                '..### => .',
                '#..## => #',
                '...#. => #',
                '..... => .',
                '###.. => #',
                '#...# => .',
                '..#.# => #',
                '##... => #',
                '##.## => .',
                '##.#. => .',
                '##### => .',
                '.#.#. => #',
                '#.### => #',
            ]
            var sum = (options)=>{
                var count = 0
                for (var i=0; i<options.state.length; i++) {
                    if (options.state.charAt(i) == '#') {
                        count += options.firstIndex + i
                    }
                }
                return count
            }
            var options = { state:state, rules:rules, firstIndex:-10 }
            for (var i=0; i<20; i++) {
                options = next(options)
            }
            expect(sum(options)).to.equal(1447)
        })

        it('eventually becomes a +21 arithmetic progression', ()=>{
            var state = '..........#..#####.#.#.##....####..##.#.#.##.##.#####..####.#.##.....#..#.#.#...###..#..###.##.#..##.#.#.....#'
            var rules = [
                '.#.## => #',
                '.###. => #',
                '#..#. => .',
                '...## => .',
                '#.##. => #',
                '....# => .',
                '..##. => #',
                '.##.. => .',
                '##..# => .',
                '.#..# => #',
                '#.#.# => .',
                '#.... => .',
                '.#### => #',
                '.##.# => .',
                '..#.. => #',
                '####. => #',
                '#.#.. => .',
                '.#... => .',
                '###.# => .',
                '..### => .',
                '#..## => #',
                '...#. => #',
                '..... => .',
                '###.. => #',
                '#...# => .',
                '..#.# => #',
                '##... => #',
                '##.## => .',
                '##.#. => .',
                '##### => .',
                '.#.#. => #',
                '#.### => #',
            ]
            var sum = (options)=>{
                var count = 0
                for (var i=0; i<options.state.length; i++) {
                    if (options.state.charAt(i) == '#') {
                        count += options.firstIndex + i
                    }
                }
                return count
            }
            var options = { state:state, rules:rules, firstIndex:-10 }
            for (var i=0; i<100; i++) {
                options = next(options)
                // console.log(i+1, sum(options), options.state);
            }
            var count1
            var count2 = sum(options)

            count1 = count2
            options = next(options)
            count2 = sum(options)
            expect(count2 - count1).to.equal(21)

            count1 = count2
            options = next(options)
            count2 = sum(options)
            expect(count2 - count1).to.equal(21)

            for (var i=0; i<100; i++) {
                options = next(options)
            }
            count2 = sum(options)

            count1 = count2
            options = next(options)
            count2 = sum(options)
            expect(count2 - count1).to.equal(21)

        })
    })
})
