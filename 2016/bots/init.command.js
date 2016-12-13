var InitCommand = function(command, space) {
    var pattern = /^value (.*) goes to bot (.*)/;
    var groups = pattern.exec(command);

    this.chip = +groups[1];
    this.bot = space.findBot(+groups[2]);
};
InitCommand.prototype.execute = function() {
    this.bot.take(this.chip);
};
module.exports = InitCommand;
