var Register = require('./register');

var Computer = function() {
    this.registers = [];
    this.cursor = 0;
};

Computer.prototype.register = function(letter) {
    for (var index=0; index<this.registers.length; index++) {
        if (this.registers[index].letter == letter) { return this.registers[index]; }
    }
    var register = new Register(letter);
    this.registers.push(register);
    return register;
};

module.exports = Computer;
