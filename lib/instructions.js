var Instructions = function(set) {
    this.set = set;
    this.cursor = 0;
}
Instructions.prototype.hasNext = function() {
    return this.cursor < this.set.length;
}
Instructions.prototype.next = function() {
    return this.set[this.cursor ++]
}

module.exports = Instructions;
