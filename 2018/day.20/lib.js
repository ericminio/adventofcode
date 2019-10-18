var reduce = (directions)=>{
    var closingParensIndex = directions.indexOf(')')
    if (closingParensIndex == -1) {
        return '' + directions.length
    }
    var before = directions.indexOf(0, closingParensIndex)
    var startIndex = directions.substring(0, closingParensIndex).lastIndexOf('(')
    var insideParens = directions.substring(startIndex+1, closingParensIndex)

    var pipeIndex = insideParens.indexOf('|')
    var left = insideParens.substring(0, pipeIndex)
    var right = insideParens.substring(pipeIndex+1)
    var result = left
    if (right.length > left.length) {
        result = right
    }
    if (left.length == 0 || right.length == 0) {
        result = ''
    }
    var reduced = directions.substring(0, startIndex) + result + directions.substring(closingParensIndex+1)
    return reduce(reduced)
}

var pipe = (left, right)=> {

}

module.exports = {
	reduce:reduce
}
