var RollingInstructions = function(set) {
    this.set = set
    this.cursor = 0
}
RollingInstructions.prototype.hasNext = function() {
    return true
}
RollingInstructions.prototype.next = function() {
    if (this.cursor == this.set.length) {
        this.cursor = 0
    }
    return this.set[this.cursor ++]
}

module.exports = RollingInstructions;
