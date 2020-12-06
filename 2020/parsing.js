const parseEntriesSeparatedByEmptyLineIntoOneStringWithSpaceSeparator = (input, parseEntryFromString)=>{
    let passports = []
    let row = 0
    let definition = ''
    do {
        if (input[row].trim() == '') {
            passports.push(parseEntryFromString(definition))
            definition = ''
        }
        else {
            definition += (' ' + input[row] + ' ')
        }
        row += 1        
    } while (row < input.length)

    return passports;
}
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
const parseEntriesIntoString = (lines, parseEntryFromString)=>{
    let entries = []
    for (var i=0;i<lines.length;i++) {
        let line = lines[i]
        entries.push(parseEntryFromString(line))
    }

    return entries;
}

module.exports = {
    parseEntriesSeparatedByEmptyLineIntoOneStringWithSpaceSeparator:parseEntriesSeparatedByEmptyLineIntoOneStringWithSpaceSeparator,
    parseEntriesSeparatedByEmptyLineIntoOneString:parseEntriesSeparatedByEmptyLineIntoOneString,
    parseEntriesSeparatedByEmptyLineIntoArrayOfString:parseEntriesSeparatedByEmptyLineIntoArrayOfString,
    parseEntriesIntoString:parseEntriesIntoString
}