var next = (options)=> {
    value = ''
    for (var i=0; i<options.state.length; i++) {
        var rule = matching(options.rules, i, options.state)
        if (rule === undefined) {
            value += '.'
        }
        else {
            value += outcome(rule)
        }
    }
    options.state = value
    clean(options)

    return options
}
var matching = (rules, index, state)=> {
    var llcrr = ''
    llcrr += (index > 1) ? state.charAt(index-2) : '.'
    llcrr += (index > 0) ? state.charAt(index-1) : '.'
    llcrr += state.charAt(index)
    llcrr += (index < state.length-1) ? state.charAt(index+1) : '.'
    llcrr += (index < state.length-2) ? state.charAt(index+2) : '.'
    rule = undefined
    for (var i=0; i<rules.length; i++) {
        var candidate = /(.*) => (.*)/.exec(rules[i])[1]
        if (candidate == llcrr) {
            rule = rules[i]
            break
        }
    }
    return rule
}
var outcome = (rule)=> {
    return /(.*) => (.*)/.exec(rule)[2]
}
var clean = (options)=>{
    if (options.state.charAt(options.state.length-1) == '#') {
        options.state += '.'
    }
    if (options.state.charAt(options.state.length-2) == '#') {
        options.state += '.'
    }
    if (options.state.charAt(0) == '#') {
        options.state = '.' + options.state
        options.firstIndex --
    }
    if (options.state.charAt(1) == '#') {
        options.state = '.' + options.state
        options.firstIndex --
    }
    return value
}

module.exports = {
    next:next
}
