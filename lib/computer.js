var command = require('./command.builder')

var Computer = function(options) {
    this.registries = options.registries
    this.commands = options.commands || [
        command(/(.*)/, (instruction, registries)=>{
            options.command(instruction, this.registries)
        })
    ]
    this.observer = options.observer || { inspect:function(){} }
}
Computer.prototype.run = function(instructions) {
    while(instructions.hasNext()) {
        var instruction = instructions.next()
        this.execute(instruction);
        this.observer.inspect(this.registries)
    }
}
Computer.prototype.execute = function(instruction) {
    for (var i=0; i<this.commands.length; i++) {
        var command = this.commands[i]
        if (command.trigger.test(instruction)) {
            command(instruction, this.registries)
            break
        }
    }
}

module.exports = Computer;
