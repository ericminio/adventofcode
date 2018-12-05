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

    registries: ()=>{
        return {
            records: {},
            current: {}
        }
    },
    fallAsleep: command(/falls asleep/, (instruction, registries)=>{
        registries.current.start = minute(instruction)
    }),
    wakesUp: command(/wakes up/, (instruction, registries)=>{
        for (var time=registries.current.start; time<minute(instruction); time++) {
            if (registries.records[registries.current.guard][time] === undefined) {
                registries.records[registries.current.guard][time] = 0
            }
            registries.records[registries.current.guard][time] ++
            registries.records[registries.current.guard].total ++
        }
    }),
    beginsShift: command(/Guard/, (instruction, registries)=>{
        var current = guard(instruction)
        registries.current.guard = current
        if (registries.records[current] === undefined) {
            registries.records[current] = { total: 0 }
        }
    })
}
