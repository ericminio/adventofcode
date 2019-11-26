var pattern = /^(.*) units each with (.*) hit points \((.*;\s)?weak\sto(.*)\) with an attack that does (.*) (.*) damage at initiative (.*)$/

var parse = (lines)=> {
    var groups = []

    for (var i=0; i<lines.length; i++) {
        var line = lines[i].trim()
        var fields = pattern.exec(line)
        var group = {
            unitCount: parseInt(fields[1]),
            hitPoints: parseInt(fields[2]),
            immunities: fields[3]?/immune to (.*);/.exec(fields[3])[1].split(','):[],
            weaknesses: fields[4].split(',').map(x => x.trim()),
            damage: parseInt(fields[5]),
            attack: fields[6]
        }        
        groups.push(group)
    }

    return groups
}


module.exports = {
    parse:parse
}
