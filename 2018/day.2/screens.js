var Part1 = function() {
    this.checksum = 0
}
Part1.prototype.display = function(ram) {
    this.checksum = ram.twos * ram.threes
}


module.exports = {
    Part1:Part1
}
