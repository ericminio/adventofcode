var power = function(options) {
    var rackId = options.x + 10
    var starts = rackId * options.y
    var level = (starts + options.serial) * rackId
    level = Math.trunc(level / 100)
    level = level % 10
    level -= 5

    return level
}
var charge = function(options) {
    var level = 0
    for (var i=0; i<options.size; i++) {
        for (var j=0; j<options.size; j++) {
            level += power({ x:options.x+j, y:options.y+i, serial:options.serial })
        }
    }
    return level
}
var largest = function(serial) {
    var best = { power:0 }
    for (var y=1; y<=298; y++) {
        for (var x=1; x<=298; x++) {
            if (x%10 ==0 || y%10 == 0) { console.log(x, y) }
            var max = x
            if (y > x) {
                max = y
            }
            for (var size=1; size < 300-max+1; size++) {
                var candidate = charge({ x:x, y:y, serial:serial, size:size })
                if (candidate > best.power) {
                    best.size = size
                    best.power = candidate
                    best.x = x
                    best.y = y
                }
            }
        }
    }
    return best
}

module.exports = {
    power:power,
    largest:largest
}
