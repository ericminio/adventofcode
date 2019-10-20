var levels = {}
var clearCache = ()=>{
    levels = {}
}

var isRocky = (point, depth, mouth, target)=>{
    return erosionLevel(point, depth, mouth, target) % 3 == 0
}
var isWet = (point, depth, mouth, target)=>{
    return erosionLevel(point, depth, mouth, target) % 3 == 1
}
var isNarrow = (point, depth, mouth, target)=>{
    return erosionLevel(point, depth, mouth, target) % 3 == 2
}
var geologicalIndex = (point, depth, mouth, target)=>{
    if (point.x == mouth.x && point.y==mouth.y) { return 0 }
    if (point.x == target.x && point.y==target.y) { return 0 }
    if (point.y == 0) { return 16807 * point.x }
    if (point.x == 0) { return 48271 * point.y }

    return erosionLevel({x:point.x-1, y:point.y}, depth, mouth, target)
            * erosionLevel({x:point.x, y:point.y-1}, depth, mouth, target)
}
var erosionLevel = (point, depth, mouth, target)=>{
    var key = `${point.x}-${point.y}`
    if (!levels[key]) {
        levels[key] = (geologicalIndex(point, depth, mouth, target) + depth) % 20183
    }
    return levels[key]
}


module.exports = {
	isRocky:isRocky,
    isWet:isWet,
    isNarrow:isNarrow,
    erosionLevel:erosionLevel,
    clearCache:clearCache
}
