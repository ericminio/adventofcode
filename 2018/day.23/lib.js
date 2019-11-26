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
var weakest = (nanobots)=>{
    var min = nanobots[0].r
    var best
    for (var i=0; i<nanobots.length;i++) {
        var nanobot = nanobots[i]
        if (nanobot.r < min) {
            best = nanobot
            min = nanobot.r
        }
    }
    return best
}
var isolated = (nanobots)=>{
    var min = inRange(nanobots[0], nanobots)
    var alones = []
    for (var i=0; i<nanobots.length;i++) {
        var nanobot = nanobots[i]
        var candidate = inRange(nanobot, nanobots)
        if (candidate  == 1) {
            alones.push(nanobot)
        }
    }
    return alones
}
var manhatan = (n1, n2)=> {
    return Math.abs(n1.x - n2.x) + Math.abs(n1.y - n2.y) + Math.abs(n1.z - n2.z)
}
var isInRange = (point, nanobot)=> {
    var distance = manhatan(point, nanobot)
    return distance <= nanobot.r
}
var doIntersect = (n1 ,n2)=> {
    var distance = manhatan(n1, n2)
    return distance <= (n1.r + n2.r)
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
var nanobotsInRange = (nanobot, nanobots)=> {
    var collection = []
    for (var i=0; i<nanobots.length;i++) {
        var candidate = nanobots[i]
        if (isInRange(candidate, nanobot)) {
            collection.push(candidate)
        }
    }
    return collection
}

var rectangle = function(points) {
    var max = { x:0, y:0, z:0 }
    points.forEach((point)=>{
        if (point.x > max.x) { max.x = point.x }
        if (point.y > max.y) { max.y = point.y }
        if (point.z > max.z) { max.z = point.z }
    })
    var min = { x:max.x, y:max.y, z:max.z }
    points.forEach((point)=>{
        if (point.x < min.x) { min.x = point.x }
        if (point.y < min.y) { min.y = point.y }
        if (point.z < min.z) { min.z = point.z }
    })
    return { min:min, max:max }
}

module.exports = {
    parse:parse,
	strongest:strongest,
    inRange:inRange,
    rectangle:rectangle,
    doIntersect:doIntersect,
    weakest:weakest,
    isolated:isolated,
    nanobotsInRange:nanobotsInRange,
    isInRange:isInRange,
    manhatan:manhatan
}
