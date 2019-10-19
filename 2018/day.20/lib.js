var reduce = (input)=>{
    if (!hasBranch(input)) {
        return input
    }
    var parts = deepestOperation(input)
    var operands = parts.operation.split('|')

    var result = operands[0]
    for(var i=0; i<operands.length; i++) {
        var operand = operands[i]
        if (operand.length > result.length) {
            result = operand
        }
        if (operand.length == 0) {
            result = ''
            break
        }
    }

    return reduce(parts.before + result + parts.after)
}

var hasBranch = (input)=> {
    return input.indexOf(')')!=-1 || input.indexOf('|')!=-1
}
var deepestOperation = (input)=> {
    var closingParensIndex = input.indexOf(')')
    var before = input.substring(0, closingParensIndex)
    var startIndex = before.lastIndexOf('(')

    return {
        before:input.substring(0, startIndex),
        operation: input.substring(startIndex+1, closingParensIndex),
        after:input.substring(closingParensIndex+1)
    }
}
var leftOperand = (input)=> {
    return input.substring(0, input.indexOf('|'))
}
var rightOperand = (input)=> {
    return input.substring(1+ input.indexOf('|'))
}

module.exports = {
	reduce:reduce
}
