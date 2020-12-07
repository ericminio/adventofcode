const { expect } = require('chai')

const extractInt = (fieldName, input)=> {
    let pattern = new RegExp(fieldName+':(.*)')
    let groups = pattern.exec(input)
    if (groups == null) {
        return undefined
    }
    let match = groups[1]

    let value = parseInt(match)
    return isNaN(value) ? match: value
}
const extractIntWithUnit = (fieldName, input)=> {
    let pattern = new RegExp(fieldName+':(\\d*)([a-z]*)')
    let groups = pattern.exec(input)
    if (groups == null) {
        return undefined
    }

    let value = parseInt(groups[1])
    if (isNaN(value)) {
        return groups[2]
    }
    if (groups[2] == '') {
        return value
    }
    let unit = groups[2]

    return { unit:unit, value:value }
}
const extractString = (fieldName, input)=> {
    let pattern = new RegExp(fieldName+':([#,0-9,a-z]*)')
    let groups = pattern.exec(input)
    if (groups == null) {
        return undefined
    }

    return groups[1]
}

module.exports = {
    extractInt:extractInt,
    extractIntWithUnit:extractIntWithUnit,
    extractString:extractString
}