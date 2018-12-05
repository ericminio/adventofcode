var Part1 = function() {

}
Part1.prototype.inspect = function(registries) {
    this.value = registries.value
}

var Part2 = function() {
    this.seen = []
}
Part2.prototype.inspect = function(registries) {
    this.value = registries.value
    if (this.seen.includes(registries.value)) {
        this.exit(registries)
    }
    this.seen.push(registries.value)
}

module.exports = {
    Part1:Part1,
    Part2:Part2
}
