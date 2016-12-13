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
