const { command } = require('../../lib')

let value = function(instruction) {
    return parseInt(/^[+-](.*)/.exec(instruction)[1])
}

module.exports = {
    ram: ()=>{
        return {
            value: 0
        }
    },
    value: value,

    inc: command(/^\+(.*)/, (instruction, ram)=>{
        ram.value += value(instruction)
    }),
    dec: command(/^\-(.*)/, (instruction, ram)=>{
        ram.value -= value(instruction)
    })
}
