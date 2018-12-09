var Part1 = function() {
    this.best = { total:0, count:0 }
}
Part1.prototype.display = function(ram) {
    var record = ram.records[ram.current.guard]
    if (record.total > this.best.total) {
        this.best.total = record.total
        this.best.guard = ram.current.guard
    }
    if (this.best.guard > 0) {
        var guard = ram.records[this.best.guard]
        for (var time=0; time<60; time++) {
            if (guard[time] > this.best.count) {
                this.best.count = guard[time]
                this.best.minute = time
            }
        }
    }
}

var Part2 = function() {
    this.best = { count:0 }
}
Part2.prototype.display = function(ram) {
    var record = ram.records[ram.current.guard]
    for (var time=0; time<60; time++) {
        if (record[time] > this.best.count) {
            this.best.count = record[time]
            this.best.guard = ram.current.guard
            this.best.minute = time
        }
    }
}

module.exports = {
    Part1:Part1,
    Part2:Part2
}
