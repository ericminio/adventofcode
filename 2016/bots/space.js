var Bot = require('./bot');
var Output = require('./output');

var Space = function(listener) {
    this.bots = [];
    this.outputs = [];
    this.listener = listener;
};
Space.prototype.findBot = function(id) {
    for (var index=0; index<this.bots.length; index++) {
        if (this.bots[index].id == id) { return this.bots[index]; }
    }
    var bot = new Bot(id);
    bot.listener = this.listener;
    this.bots.push(bot);
    return bot;
};
Space.prototype.findOutput = function(id) {
    for (var index=0; index<this.outputs.length; index++) {
        if (this.outputs[index].id == id) { return this.outputs[index]; }
    }
    var output = new Output(id);
    this.outputs.push(output);
    return output;
};

module.exports = Space;
