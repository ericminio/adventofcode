var GiveCommand = function(command, space) {
    var pattern = /^bot (.*) gives low to (bot|output) (.*) and high to (bot|output) (.*)/;
    var groups = pattern.exec(command);

    this.giver = space.findBot(+groups[1]);
    command.indexOf('low to bot')!=-1 ?
        this.looser =  space.findBot(+groups[3]):
        this.looser =  space.findOutput(+groups[3]);
    command.indexOf('high to bot')!=-1 ?
        this.winner = space.findBot(+groups[5]):
        this.winner = space.findOutput(+groups[5]);
};
GiveCommand.prototype.canExecute = function() {
    return this.giver.canGive();
};
GiveCommand.prototype.execute = function() {
    if (this.canExecute()) {
        this.looser.take(this.giver.lowChip());
        this.winner.take(this.giver.highChip());
        this.giver.low = undefined;
        this.giver.high = undefined;
    }
};
module.exports = GiveCommand;
