var command = require('./command.builder')

var Computer = function(options) {
    this.ram = options.ram
    this.commands = options.commands || [
        command(/(.*)/, (instruction, ram)=>{
            options.command(instruction, ram)
        })
    ]
    this.screen = options.screen || { display:function(){} }
    this.whenStop = ()=>{}
}
Computer.prototype.run = function(instructions) {
    this.ram.stop = false
    while(instructions.hasNext()) {
        var instruction = instructions.next()
        this.execute(instruction)
        this.screen.display(this.ram)
        if (this.ram.stop) {
            this.whenStop(this.screen, this.ram)
            break
        }
    }
}
Computer.prototype.execute = function(instruction) {
    for (var i=0; i<this.commands.length; i++) {
        var command = this.commands[i]
        if (command.trigger.test(instruction)) {
            command(instruction, this.ram)
            break
        }
    }
}

module.exports = Computer;
