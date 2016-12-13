var CopyCommand = function(command, computer) {
    var pattern = /^cpy (.*) (.*)/;
    var groups = pattern.exec(command);
    isNaN(+groups[1]) ?
        this.provider = computer.register(groups[1]):
        this.provider = { value:+groups[1] } ;
    this.target = computer.register(groups[2]);
    this.computer = computer;
};
CopyCommand.prototype.value = function() {
    return this.provider.value;
};
CopyCommand.prototype.execute = function() {
    this.target.value = this.value();
    this.computer.cursor ++;
};
module.exports = CopyCommand;
