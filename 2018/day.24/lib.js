var pattern = /^(.*) units each with (.*) hit points(.*)with an attack that does (.*) (.*) damage at initiative (.*)$/
var immune = /immune to (.*;|.*\))/
var weak = /weak to (.*;|.*\))/

var parse = (lines)=> {
    var groups = []

    for (var i=0; i<lines.length; i++) {
        var line = lines[i].trim()
        var fields = pattern.exec(line)
        fields[3] = fields[3].trim()
        var immunities = []
        var weaknesses = []
        if (fields[3]) {
            if (immune.exec(fields[3])) {
                var match = immune.exec(fields[3])
                var candidate = match[1].substring(0, match[1].length-1)
                immunities = candidate.split(',').map(x => x.trim())
            }
            if (weak.exec(fields[3])) {
                var match = weak.exec(fields[3])
                var candidate = match[1].substring(0, match[1].length-1)
                weaknesses = candidate.split(',').map(x => x.trim())
            }
        }
        var group = {
            unitCount: parseInt(fields[1]),
            hitPoints: parseInt(fields[2]),
            immunities: immunities,
            weaknesses: weaknesses,
            damage: parseInt(fields[4]),
            attack: fields[5],
            initiative: parseInt(fields[6])
        }
        groups.push(group)
    }

    return groups
}


module.exports = {
    parse:parse
}
