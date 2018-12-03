var Computer = function(options) {
    this.registries = options.registries
    this.command = options.command
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
    this.command(instruction, this.registries)
}

module.exports = Computer;
