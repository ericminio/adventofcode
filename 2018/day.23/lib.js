var parse = (lines)=> {
    var pattern = /^pos=<(.*),(.*),(.*)>, r=(.*)$/;
    var nanobots = []
    for (var i=0; i<lines.length; i++) {
        var line = lines[i].trim()
        var fields = pattern.exec(line)
        var nanobot = {
            x:parseInt(fields[1]),
            y:parseInt(fields[2]),
            z:parseInt(fields[3]),
            r:parseInt(fields[4])
        }
        nanobots.push(nanobot)
    }
    return nanobots
}

var strongest = (nanobots)=>{
    var max = 0
    var best
    for (var i=0; i<nanobots.length;i++) {
        var nanobot = nanobots[i]
        if (nanobot.r > max) {
            best = nanobot
            max = nanobot.r
        }
    }
    return best
}

var manhatan = (n1, n2)=> {
    return Math.abs(n1.x - n2.x) + Math.abs(n1.y - n2.y) + Math.abs(n1.z - n2.z)
}
var isInRange = (point, nanobot)=> {
    var distance = manhatan(point, nanobot)
    return distance <= nanobot.r
}

var inRange = (nanobot, nanobots)=> {
    var count = 0
    for (var i=0; i<nanobots.length;i++) {
        var candidate = nanobots[i]
        if (isInRange(candidate, nanobot)) {
            count += 1
        }
    }
    return count
}

module.exports = {
    parse:parse,
	strongest:strongest,
    inRange:inRange
}
