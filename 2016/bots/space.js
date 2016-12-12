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

var expect = require('chai').expect;

describe('Space', function() {

    var space;
    var listener = {};

    beforeEach(function() {
        space = new Space(listener);
    });

    it('creates bot when missing', function() {
        expect(space.findBot(42).id).to.equal(42);
    });

    it('returns the expected bot', function() {
        expect(space.findBot(42)).to.equal(space.findBot(42));
    });

    it('creates output when missing', function() {
        expect(space.findOutput(15).id).to.equal(15);
    });

    it('returns the expected output', function() {
        expect(space.findOutput(15)).to.equal(space.findOutput(15));
    });

    it('gives the listener to each bot', function() {
        expect(space.findBot(42).listener).to.equal(listener);
    });
});
