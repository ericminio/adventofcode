const { command } = require('../../lib')

let minute = function(instruction) {
    var pattern = /^(.*):(.*)](.*)?/;
    var groups = pattern.exec(instruction)
    return parseInt(groups[2])
}
let guard = function(instruction) {
    var pattern = /^(.*)#(.*)\s(.*)?/;
    var groups = pattern.exec(instruction)
    return groups==null? undefined: parseInt(groups[2])
}

module.exports = {
    minute: minute,
    guard: guard,

    ram: ()=>{
        return {
            records: {},
            current: {}
        }
    },
    fallAsleep: command(/falls asleep/, (instruction, ram)=>{
        ram.current.start = minute(instruction)
    }),
    wakesUp: command(/wakes up/, (instruction, ram)=>{
        for (var time=ram.current.start; time<minute(instruction); time++) {
            if (ram.records[ram.current.guard][time] === undefined) {
                ram.records[ram.current.guard][time] = 0
            }
            ram.records[ram.current.guard][time] ++
            ram.records[ram.current.guard].total ++
        }
    }),
    beginsShift: command(/Guard/, (instruction, ram)=>{
        var current = guard(instruction)
        ram.current.guard = current
        if (ram.records[current] === undefined) {
            ram.records[current] = { total: 0 }
        }
    })
}
