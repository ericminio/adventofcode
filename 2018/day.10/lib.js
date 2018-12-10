var parser = (lines)=> {
    var lights = []
    var extract = /position=<(.*), (.*)> velocity=<(.*),(.*)>/
    lines.forEach((line)=>{
        var data = extract.exec(line)
        lights.push({
            x:parseInt(data[1]),
            y:parseInt(data[2]),
            vx:parseInt(data[3]),
            vy:parseInt(data[4]),
        })
    })
    return lights
}
var sort = (lights)=>{
    lights.sort((a, b)=>{
        if (b.y < a.y) { return 1 }
        if (b.y == a.y) {
            if (b.x < a.x) { return 1 }
        }
        return -1
    })
}
var minX = (lights)=>{
    var min = 100000
    lights.forEach((light)=>{
        if (light.x < min) {
            min = light.x
        }
    })
    return min
}
var minY = (lights)=>{
    var min = 100000
    lights.forEach((light)=>{
        if (light.y < min) {
            min = light.y
        }
    })
    return min
}
var maxX = (lights)=>{
    var max = -100000
    lights.forEach((light)=>{
        if (light.x > max) {
            max = light.x
        }
    })
    return max
}
var maxY = (lights)=>{
    var max = -100000
    lights.forEach((light)=>{
        if (light.y > max) {
            max = light.y
        }
    })
    return max
}
var rectangle = (lights)=>{
    var bounds = {
        minx: minX(lights),
        miny: minY(lights),
        maxx: maxX(lights),
        maxy: maxY(lights),
    }
    bounds.width = bounds.maxx - bounds.minx + 1
    bounds.height = bounds.maxy - bounds.miny + 1
    return bounds
}
var display = (lights)=> {
    sort(lights)
    var minx = minX(lights)
    var miny = minY(lights)
    var maxx = maxX(lights)
    var maxy = maxY(lights)
    for (var y=miny; y<=maxy; y++) {
        var line = ''
        for (var x=minx; x<=maxx; x++) {
            var token = '.'
            lights.forEach((light)=>{
                if (light.x == x && light.y == y) {
                    token = '#'
                }
            })
            line += token
        }
        console.log(line);
    }
}
var strings = (lights)=> {
    var lines = []
    sort(lights)
    var minx = minX(lights)
    var miny = minY(lights)
    var maxx = maxX(lights)
    var maxy = maxY(lights)
    for (var y=miny; y<=maxy; y++) {
        var line = ''
        for (var x=minx; x<=maxx; x++) {
            var token = '.'
            lights.forEach((light)=>{
                if (light.x == x && light.y == y) {
                    token = '#'
                }
            })
            line += token
        }
        lines.push(line);
    }
    return lines
}
var log = (lights)=>{
    sort(lights)
    var minx = minX(lights)
    var miny = minY(lights)
    var maxx = maxX(lights)
    var maxy = maxY(lights)
    console.log(lights)
    console.log(minx, miny, maxx, maxy);
}
var tic = (lights)=> {
    lights.forEach((light)=>{
        light.x = light.x + light.vx
        light.y = light.y + light.vy
    })
}
var velocities = (lights)=>{
    groups = [
        [lights[0]]
    ]
    var current = 0
    for (var i=1; i<lights.length; i++) {
        var light = lights[i]
        for (var g=0; g<groups.length; g++) {
            if (light.vx == groups[g][0].vx && light.vy == groups[g][0].vy) {
                groups[g].push(light)
                break
            }
            else {
                groups.push([light])
                break
            }
        }
    }
    return groups
}

module.exports = {
    parser:parser,
    display:display,
    sort:sort,
    tic:tic,
    minX:minX,
    minY:minY,
    maxX:maxX,
    maxY:maxY,
    log:log,
    rectangle:rectangle,
    velocities:velocities,
    strings:strings
}
