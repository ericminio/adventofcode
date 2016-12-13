var IncCommand = function(command, computer) {
    var pattern = /^inc (.*)/;
    var groups = pattern.exec(command);

    this.target = computer.register(groups[1]);
    this.computer = computer;
};
IncCommand.prototype.execute = function() {
    this.target.value ++;
    this.computer.cursor ++;
};
module.exports = IncCommand;
