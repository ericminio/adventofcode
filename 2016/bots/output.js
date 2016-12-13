var Output = function(id) {
    this.id = id;
    this.chips = [];
};

Output.prototype.take = function(chip) {
    this.chips.push(chip);
};
Output.prototype.canTakeMore = function(chip) {
    return true;
};

module.exports = Output;
