const { expect } = require('chai')
const { puzzle } = require('../puzzle.input')

describe('day 7 challenge', ()=> {

    var extract = /Step (.) must be finished before step (.) can begin./
    var extractFirstStep = function(spec) {
        return extract.exec(spec)[1]
    }
    var extractSecondStep = function(spec) {
        return extract.exec(spec)[2]
    }
    var includes = function(letter, list) {
        return list.filter((x)=> x.value == letter).length > 0
    }
    var buildPrerequisites = function(letters, specs) {
        letters.forEach((letter)=>{
            letter.prerequites = []
            specs.forEach((spec)=>{
                var first = extractFirstStep(spec)
                var second = extractSecondStep(spec)
                if (second == letter.value) {
                    letter.prerequites.push(first)
                }
            })
        })
    }

    describe('part 1', ()=>{


        var extractLetters = function(specs) {
            var all = []
            specs.forEach((spec)=>{
                var first = extractFirstStep(spec)
                var second = extractSecondStep(spec)
                if (! includes(first, all)) { all.push({ value:first, completed:false }) }
                if (! includes(second, all)) { all.push({ value:second, completed:false }) }
            })
            return all
        }
        var extractAvailable = function(letters) {
            var available = []
            letters.forEach((letter)=>{
                if (letter.prerequites.length == 0 && !letter.completed) {
                    available.push(letter)
                }
            })
            available.sort((a, b)=>{
                return a.value.charCodeAt(0) - b.value.charCodeAt(0)
            })
            return available
        }
        var allCompleted = function(letters) {
            value = true
            letters.forEach((letter)=>{
                if (!letter.completed) {
                    value = false
                }
            })
            return value
        }

        var digest = function(specs) {
            var order = ''
            var letters = extractLetters(specs);
            buildPrerequisites(letters, specs)
            while (! allCompleted(letters)) {
                var available = extractAvailable(letters)
                var letter = available[0]
                order += letter.value
                letter.completed = true

                letters.forEach((l)=>{
                    if (l.prerequites.includes(letter.value)) {
                        l.prerequites.splice(l.prerequites.indexOf(letter.value), 1);
                    }
                })

            }

            return order
        }

        it('is obvious with a single entry', ()=>{
            expect(digest([
                'Step A must be finished before step B can begin.'
            ])).to.equal('AB')
        })
        it('works with 2 entries', ()=>{
            expect(digest([
                'Step A must be finished before step B can begin.',
                'Step B must be finished before step C can begin.'
            ])).to.equal('ABC')
        })
        it('works with 2 inverted entries', ()=>{
            expect(digest([
                'Step B must be finished before step C can begin.',
                'Step A must be finished before step B can begin.'
            ])).to.equal('ABC')
        })
        it('works with 2 roots', ()=>{
            expect(digest([
                'Step A must be finished before step B can begin.',
                'Step C must be finished before step B can begin.'
            ])).to.equal('ACB')
        })
        it('can be explored', ()=>{
            expect(digest([
                'Step C must be finished before step A can begin.',
                'Step C must be finished before step F can begin.',
                'Step A must be finished before step B can begin.',
                'Step A must be finished before step D can begin.',
                'Step B must be finished before step E can begin.',
                'Step D must be finished before step E can begin.',
                'Step F must be finished before step E can begin.',
            ])).to.equal('CABDFE')
        })
        it('is solved', ()=>{
            expect(digest(puzzle('day.7'))).to.equal('BFLNGIRUSJXEHKQPVTYOCZDWMA')
        })
    })

    describe('part 2', ()=>{

        var remaining = function(value) {
            return value.charCodeAt(0) - 64 //+ 60
        }
        var extractLetters = function(specs) {
            var all = []
            specs.forEach((spec)=>{
                var first = extractFirstStep(spec)
                var second = extractSecondStep(spec)
                if (! includes(first, all)) { all.push({ value:first, remaining:remaining(first), worker:undefined }) }
                if (! includes(second, all)) { all.push({ value:second, remaining:remaining(second), worker:undefined }) }
            })
            return all
        }
        var extractAvailable = function(letters) {
            var available = []
            letters.forEach((letter)=>{
                if (letter.prerequites.length == 0 && letter.remaining > 0 && letter.worker == undefined) {
                    available.push(letter)
                }
            })
            available.sort((a, b)=>{
                return a.value.charCodeAt(0) - b.value.charCodeAt(0)
            })
            return available
        }
        var allCompleted = function(letters) {
            value = true
            letters.forEach((letter)=>{
                if (letter.remaining > 0) {
                    value = false
                }
            })
            return value
        }
        var digest = function(specs) {
            var time = 0
            var letters = extractLetters(specs);
            buildPrerequisites(letters, specs)
            var workers = [
                { id:1, task:undefined },
                { id:2, task:undefined },
                { id:3, task:undefined },
                { id:4, task:undefined },
                { id:5, task:undefined }
            ]
            var tic = 0
            while (! allCompleted(letters)) {
                workers.forEach((worker)=>{
                    if (worker.task == undefined) {
                        var available = extractAvailable(letters)
                        if (available.length > 0) {
                            worker.task = available[0]
                            worker.task.worker = worker
                        }
                    }
                })
                workers.forEach((worker)=>{
                    if (worker.task != undefined) {
                        worker.task.remaining --;
                    }
                    if (worker.task != undefined && worker.task.remaining == 0) {
                        letters.forEach((l)=>{
                            if (l.prerequites.includes(worker.task.value)) {
                                l.prerequites.splice(l.prerequites.indexOf(worker.task.value), 1);
                            }
                        })
                        worker.task.worker = undefined
                        worker.task = undefined
                    }
                })
                tic ++
            }

            return tic
        }

        it('is obvious with a single entry', ()=>{
            expect(digest([
                'Step A must be finished before step B can begin.'
            ])).to.equal(3)
        })
        it('works with 2 branches', ()=>{
            expect(digest([
                'Step C must be finished before step A can begin.',
                'Step C must be finished before step F can begin.'
            ])).to.equal(9)
        })
        it('works with 2 roots', ()=>{
            expect(digest([
                'Step A must be finished before step B can begin.',
                'Step C must be finished before step B can begin.'
            ])).to.equal(5)
        })
        it('can be explored', ()=>{
            expect(digest([
                'Step C must be finished before step A can begin.',
                'Step C must be finished before step F can begin.',
                'Step A must be finished before step B can begin.',
                'Step A must be finished before step D can begin.',
                'Step B must be finished before step E can begin.',
                'Step D must be finished before step E can begin.',
                'Step F must be finished before step E can begin.',
            ])).to.equal(14)
        })
        it.skip('can be explored', ()=>{
            expect(digest(puzzle('day.7'))).to.equal(880)
        })

    })


})
