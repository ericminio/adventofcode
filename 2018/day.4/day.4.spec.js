const { expect } = require('chai')
const { puzzle } = require('../puzzle.input')
const { Computer, Instructions } = require('../../lib')
const {
    registries,
    minute,
    guard,
    fallAsleep,
    wakesUp,
    beginsShift
} = require('./lib.js')

describe('day 4 challenge', ()=> {

    var computer

    beforeEach(()=>{
        computer = new Computer({
            registries:registries(),
            commands:[fallAsleep, wakesUp, beginsShift]
        })
    })

    describe('part 1', ()=>{

        it('can extract guard', ()=>{
            expect(guard('[1518-11-01 00:00] Guard #10 begins shift')).to.equal(10)
        })
        it('resists falling-asleep instruction', ()=>{
            expect(guard('[1518-11-01 00:05] falls asleep')).to.equal(undefined)
        })
        it('resists waking-up instruction', ()=>{
            expect(guard('[1518-11-01 00:55] wakes up')).to.equal(undefined)
        })

        it('can extract falling-asleep minute', ()=>{
            expect(minute('[1518-11-01 00:05] falls asleep')).to.equal(5)
        })
        it('can extract waking-up minute', ()=>{
            expect(minute('[1518-11-01 00:55] wakes up')).to.equal(55)
        })
        it('digests records', ()=>{
            computer.run(new Instructions([
                '[1518-11-01 00:00] Guard #10 begins shift',
                '[1518-11-01 00:05] falls asleep',
                '[1518-11-01 00:25] wakes up'
            ]))
            expect(computer.registries.records[10][4]).to.equal(undefined)
            expect(computer.registries.records[10][5]).to.equal(1)
            expect(computer.registries.records[10][6]).to.equal(1)
            expect(computer.registries.records[10][24]).to.equal(1)
            expect(computer.registries.records[10][25]).to.equal(undefined)
        })

        var inspect = (registries)=>{
            var best = { total:0, count:0 }
            Object.keys(computer.registries.records).forEach((id)=>{
                var guard = computer.registries.records[id]
                if (guard.total > best.total) {
                    best.total = guard.total
                    best.guard = parseInt(id)
                }
            })
            var guard = computer.registries.records[best.guard]
            for (var time=0; time<60; time++) {
                if (guard[time] > best.count) {
                    best.count = guard[time]
                    best.minute = time
                }
            }
            return best
        }

        it('can be explored', ()=>{
            computer.run(new Instructions([
                '[1518-11-01 00:00] Guard #10 begins shift',
                '[1518-11-01 00:05] falls asleep',
                '[1518-11-01 00:25] wakes up',
                '[1518-11-01 00:30] falls asleep',
                '[1518-11-01 00:55] wakes up',
                '[1518-11-01 23:58] Guard #99 begins shift',
                '[1518-11-02 00:40] falls asleep',
                '[1518-11-02 00:50] wakes up',
                '[1518-11-03 00:05] Guard #10 begins shift',
                '[1518-11-03 00:24] falls asleep',
                '[1518-11-03 00:29] wakes up',
                '[1518-11-04 00:02] Guard #99 begins shift',
                '[1518-11-04 00:36] falls asleep',
                '[1518-11-04 00:46] wakes up',
                '[1518-11-05 00:03] Guard #99 begins shift',
                '[1518-11-05 00:45] falls asleep',
                '[1518-11-05 00:55] wakes up'
            ]))
            expect(computer.registries.records[10].total).to.equal(50)
            expect(computer.registries.records[99].total).to.equal(30)
            var best = inspect(computer.registries)
            expect(best).to.deep.equal({ guard:10, minute:24, total:50, count:2 })
            expect(best.guard * best.minute).to.equal(240)
        })

        it('resist unsorted records', ()=>{
            computer.run(new Instructions([
                '[1518-11-01 00:05] falls asleep',
                '[1518-11-01 00:25] wakes up',
                '[1518-11-01 00:00] Guard #10 begins shift',
                '[1518-11-01 00:30] falls asleep',
                '[1518-11-01 00:55] wakes up',
                '[1518-11-01 23:58] Guard #99 begins shift',
                '[1518-11-02 00:40] falls asleep',
                '[1518-11-02 00:50] wakes up',
                '[1518-11-03 00:05] Guard #10 begins shift',
                '[1518-11-03 00:24] falls asleep',
                '[1518-11-03 00:29] wakes up',
                '[1518-11-04 00:02] Guard #99 begins shift',
                '[1518-11-04 00:36] falls asleep',
                '[1518-11-04 00:46] wakes up',
                '[1518-11-05 00:03] Guard #99 begins shift',
                '[1518-11-05 00:45] falls asleep',
                '[1518-11-05 00:55] wakes up'
            ].sort()))
            expect(computer.registries.records[10].total).to.equal(50)
            expect(computer.registries.records[99].total).to.equal(30)
            var best = inspect(computer.registries)
            expect(best.guard * best.minute).to.equal(240)
        })

        it('is solved', ()=>{
            computer.run(new Instructions(puzzle('day.4').sort()))
            var best = inspect(computer.registries)
            expect(best.guard * best.minute).to.equal(4716)
        })
    })

    describe('part 2', ()=>{

        var inspect = (registries)=>{
            var best = { total:0, count:0 }
            var max = 0
            Object.keys(computer.registries.records).forEach((id)=>{
                var guard = computer.registries.records[id]
                for (var time=0; time<60; time++) {
                    if (guard[time] > best.count) {
                        best.count = guard[time]
                        best.guard = parseInt(id)
                        best.minute = time
                        best.total = guard.total
                    }
                }
            })
            return best
        }

        it('can be explored', ()=>{
            computer.run(new Instructions([
                '[1518-11-01 00:05] falls asleep',
                '[1518-11-01 00:25] wakes up',
                '[1518-11-01 00:00] Guard #10 begins shift',
                '[1518-11-01 00:30] falls asleep',
                '[1518-11-01 00:55] wakes up',
                '[1518-11-01 23:58] Guard #99 begins shift',
                '[1518-11-02 00:40] falls asleep',
                '[1518-11-02 00:50] wakes up',
                '[1518-11-03 00:05] Guard #10 begins shift',
                '[1518-11-03 00:24] falls asleep',
                '[1518-11-03 00:29] wakes up',
                '[1518-11-04 00:02] Guard #99 begins shift',
                '[1518-11-04 00:36] falls asleep',
                '[1518-11-04 00:46] wakes up',
                '[1518-11-05 00:03] Guard #99 begins shift',
                '[1518-11-05 00:45] falls asleep',
                '[1518-11-05 00:55] wakes up'
            ].sort()))
            expect(computer.registries.records[10].total).to.equal(50)
            expect(computer.registries.records[99].total).to.equal(30)
            var best = inspect(computer.registries)
            expect(best).to.deep.equal({ guard:99, minute:45, total:30, count:3 })
            expect(best.guard * best.minute).to.equal(4455)
        })

        it('is solved', ()=>{
            computer.run(new Instructions(puzzle('day.4').sort()))
            var best = inspect(computer.registries)
            expect(best.guard * best.minute).to.equal(117061)
        })
    })
})
