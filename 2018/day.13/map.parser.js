module.exports = (lines)=>{
    var map = []
    for (var y=0; y<lines.length; y++) {
        var line = lines[y]
        for (var x=0; x<line.length; x++) {
            if (line.charAt(x) == '-') {
                var node = {
                    position: { x:x, y:y },
                    exits: [
                        { x:1, y:0 },
                        { x:-1, y:0 }
                    ]
                }
                map.push(node)
            }
            if (line.charAt(x) == '|') {
                var node = {
                    position: { x:x, y:y },
                    exits: [
                        { x:0, y:1 },
                        { x:0, y:-1 }
                    ]
                }
                map.push(node)
            }
            if (line.charAt(x) == '+') {
                var node = {
                    position: { x:x, y:y },
                    exits: [
                        { x:0, y:1 },
                        { x:0, y:-1 },
                        { x:1, y:0 },
                        { x:-1, y:0 }
                    ]
                }
                map.push(node)
            }
            if (line.charAt(x) == '/') {
                var node = {
                    position: { x:x, y:y },
                    exits: []
                }
                if (line.charAt(x+1) == '-') {
                    node.exits.push({ x:1, y:0 })
                    node.exits.push({ x:0, y:1 })
                }
                if (line.charAt(x-1) == '-') {
                    node.exits.push({ x:-1, y:0 })
                    node.exits.push({ x:0, y:-1 })
                }
                map.push(node)
            }
            if (line.charAt(x) == '\\') {
                var node = {
                    position: { x:x, y:y },
                    exits: []
                }
                if (line.charAt(x+1) == '-') {
                    node.exits.push({ x:1, y:0 })
                    node.exits.push({ x:0, y:-1 })
                }
                if (line.charAt(x-1) == '-') {
                    node.exits.push({ x:-1, y:0 })
                    node.exits.push({ x:0, y:1 })
                }
                map.push(node)
            }
        }
    }

    return map
}
