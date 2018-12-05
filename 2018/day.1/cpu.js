const { command } = require('../../lib')

let value = function(instruction) {
    return parseInt(/^[+-](.*)/.exec(instruction)[1])
}

module.exports = {
    value: value,

    inc: command(/^\+(.*)/, (instruction, registries)=>{
        registries.value += value(instruction)
    }),
    dec: command(/^\-(.*)/, (instruction, registries)=>{
        registries.value -= value(instruction)
    })
}
