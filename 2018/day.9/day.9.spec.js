const { expect } = require('chai')
const { Pool, Game, Circle } = require('./marble.mania')

describe('day 9 challenge', ()=> {

    describe('part 1', ()=>{

        describe('Pool', ()=>{
            it('has a size', ()=>{
                expect(new Pool(3).size).to.equal(3)
            })
            it('provides marbles', ()=>{
                var pool = new Pool(2)
                expect(pool.marble()).to.equal(0)
                expect(pool.marble()).to.equal(1)
                expect(pool.marble()).to.equal(null)
            })
        })
        describe('Circle', ()=>{
            var circle;
            beforeEach(()=>{
                circle = new Circle()
            })
            it('starts with 0', ()=>{
                expect(circle.current).to.equal(0)
            })
            it('starts with no marble', ()=>{
                expect(circle.marbles).to.deep.equal([])
            })
            it('can play first marble', ()=>{
                circle.play(0)
                expect(circle.marbles).to.deep.equal([0])
                expect(circle.current).to.equal(0)
            })
            it('can play second marble', ()=>{
                circle.play(0)
                circle.play(1)
                expect(circle.marbles).to.deep.equal([0, 1])
                expect(circle.current).to.equal(1)
            })
            it('can insert after next', ()=>{
                circle.marbles = [0, 1, 2]
                circle.current = 0
                circle.play(3)
                expect(circle.marbles).to.deep.equal([0, 1, 3, 2])
                expect(circle.current).to.equal(2)
            })
            it('can insert when push is needed', ()=>{
                circle.marbles = [0, 1, 2]
                circle.current = 1
                circle.play(3)
                expect(circle.marbles).to.deep.equal([0, 1, 2, 3])
                expect(circle.current).to.equal(3)
            })
            it('can insert when round robin is needed', ()=>{
                circle.marbles = [0, 1, 2]
                circle.current = 2
                circle.play(3)
                expect(circle.marbles).to.deep.equal([0, 3, 1, 2])
                expect(circle.current).to.equal(1)
            })
            it('handle the %23 special case', ()=>{
                circle.marbles = [0, 1, 2, 3, 4, 5, 6, 7, 8]
                circle.current = 8
                marble = circle.play(46)
                expect(marble).to.equal(1)
                expect(circle.marbles).to.deep.equal([0, 2, 3, 4, 5, 6, 7, 8])
                expect(circle.current).to.equal(1)
            })
            it('handle the %23 special case when round robin is needed', ()=>{
                circle.marbles = [0, 1, 2, 3, 4, 5]
                circle.current = 5
                marble = circle.play(46)
                expect(marble).to.equal(4)
                expect(circle.marbles).to.deep.equal([0, 1, 2, 3, 5])
                expect(circle.current).to.equal(4)
            })
            it('handle the %23 special case when round robin is needed', ()=>{
                circle.marbles = [0, 1, 2, 3, 4, 5, 6]
                circle.current = 6
                marble = circle.play(46)
                expect(marble).to.equal(6)
                expect(circle.marbles).to.deep.equal([0, 1, 2, 3, 4, 5])
                expect(circle.current).to.equal(0)
            })
        })
        describe('Game', ()=>{
            it('works with 5 marbles', ()=>{
                var pool = new Pool(5)
                var game = new Game(3, pool)
                game.start()

                expect(game.circle.marbles).to.deep.equal([0, 4, 2, 1, 3])
            })
            it('keeps current player', ()=>{
                var pool = new Pool(5)
                var game = new Game(3, pool)
                game.start()

                expect(game.player).to.equal(1)
            })
            it('keeps current player with 9 players', ()=>{
                var pool = new Pool(26)
                var game = new Game(9, pool)
                game.start()

                expect(game.player).to.equal(7)
            })
            it('tracks score', ()=>{
                var pool = new Pool(26)
                var game = new Game(9, pool)
                game.start()

                expect(game.score).to.deep.equal({ '5':32 })
            })
        })
        it('has an example #1', ()=>{
            var pool = new Pool(1 + 25)
            var game = new Game(9, pool)
            game.start()

            expect(game.highscore).to.equal(32)
        })
        it('has an example #2', ()=>{
            var pool = new Pool(1 + 1618)
            var game = new Game(10, pool)
            game.start()

            expect(game.highscore).to.equal(8317)
        })
        it('is solved', ()=>{
            var pool = new Pool(1 + 71790)
            var game = new Game(459, pool)
            game.start()

            expect(game.highscore).to.equal(386151)//3211264152
        })
    })

})
