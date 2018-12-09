var Part1 = function() {

}
Part1.prototype.display = function(ram) {
    this.value = ram.value
}

var Part2 = function() {
    this.seen = []
}
Part2.prototype.display = function(ram) {
    this.value = ram.value
    if (this.seen.includes(ram.value)) {
        ram.stop = true
    }
    this.seen.push(ram.value)
}

module.exports = {
    Part1:Part1,
    Part2:Part2
}
