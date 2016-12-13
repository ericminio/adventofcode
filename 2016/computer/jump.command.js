var JumpCommand = function(command, computer) {
    this.computer = computer;
    var pattern = /^jnz (.*) (.*)/;
    var groups = pattern.exec(command);
    isNaN(+groups[1]) ?
        this.provider = computer.register(groups[1]):
        this.provider = { value:+groups[1] } ;
    this.staticMoves = +groups[2];
};
JumpCommand.prototype.moves = function() {
    return this.provider.value == 0 ? 1 : this.staticMoves;
};
JumpCommand.prototype.execute = function() {
    this.computer.cursor += this.moves();
};
module.exports = JumpCommand;
