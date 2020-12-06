const parseEntriesSeparatedByEmptyLineIntoOneString = (input, parseEntryFromString)=>{
    let entries = []
    let row = 0
    let definition = ''
    do {
        if (input[row].trim() == '') {
            entries.push(parseEntryFromString(definition))
            definition = ''
        }
        else {
            definition += input[row]
        }
        row += 1        
    } while (row < input.length)

    return entries;
}
const parseEntriesSeparatedByEmptyLineIntoArrayOfString = (input, parseEntryFromArrayOfString)=>{
    let entries = []
    let row = 0
    let definition = []
    do {
        if (input[row].trim() == '') {
            entries.push(parseEntryFromArrayOfString(definition))
            definition = []
        }
        else {
            definition.push(input[row])
        }
        row += 1        
    } while (row < input.length)

    return entries;
}

module.exports = {
    parseEntriesSeparatedByEmptyLineIntoOneString:parseEntriesSeparatedByEmptyLineIntoOneString,
    parseEntriesSeparatedByEmptyLineIntoArrayOfString:parseEntriesSeparatedByEmptyLineIntoArrayOfString
}