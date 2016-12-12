var Bot = function(id) { this.id = id; };

Bot.prototype.canTakeMore = function() {
    return this.high == undefined;
};
Bot.prototype.canGive = function() {
    return !this.canTakeMore();
};
Bot.prototype.take = function(chip) {
    if (!this.canTakeMore()) { return; }
    if (this.listener) { this.listener(this.id, chip); }
    if (!this.low) { this.low = chip; return; }
    if (chip < this.low) {
        this.high = this.low;
        this.low = chip;
        return;
    }
    this.high = chip;
};
Bot.prototype.lowChip = function() {
    return this.low;
};
Bot.prototype.highChip = function() {
    return this.high;
};

module.exports = Bot;

var expect = require('chai').expect;

describe('Bot', function() {

    var bot;

    beforeEach(function() {
        bot = new Bot(42);
        expect(bot.id).to.equal(42);
    });

    it('notifies when taking', function(done) {
        bot.listener = function(id, chip) {
            expect(id).to.equal(42);
            expect(chip).to.equal(4);
            done();
        };
        bot.take(4);
    });

    it('can hold a chip', function() {
        bot.take(5);

        expect(bot.lowChip()).to.equal(5);
    });

    it('can hold a second chip', function() {
        bot.take(5);
        expect(bot.canTakeMore()).to.equal(true);
        bot.take(7);

        expect(bot.lowChip()).to.equal(5);
        expect(bot.highChip()).to.equal(7);
    });

    it('keeps low/high chips in correct hands', function() {
        bot.take(7);
        bot.take(5);

        expect(bot.lowChip()).to.equal(5);
        expect(bot.highChip()).to.equal(7);
    });

    it('cannot take more than 2 chips', function() {
        bot.take(7);
        bot.take(5);

        expect(bot.canTakeMore()).to.equal(false);
        bot.take(15);

        expect(bot.lowChip()).to.equal(5);
        expect(bot.highChip()).to.equal(7);
    });

    it('can give when it has two chips', function() {
        bot.low = 3;
        bot.high = 5;

        expect(bot.canGive()).to.equal(true);
    });

    it('cannot give when it has one chips', function() {
        bot.low = 3;

        expect(bot.canGive()).to.equal(false);
    });

    it('cannot give when it has no chip', function() {
        expect(bot.canGive()).to.equal(false);
    });


});
