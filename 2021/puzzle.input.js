const path = require('path')
const fs = require('fs')

const puzzle = (day, file) =>{
    var content = fs.readFileSync(path.join(__dirname, day, file))
        .toString().trim().split('\n');
    return content
}
const integers = (day, file) => {
    return puzzle(day, file).map(s => parseInt(s));
}

module.exports = {
    puzzle: puzzle,
    integers: integers,
    lines: (day, file) =>{
        var content = fs.readFileSync(path.join(__dirname, day, file))
            .toString().trim().split('\n');
        return content
    },
	raw: (day, file) =>{
        var content = fs.readFileSync(path.join(__dirname, day, file))
            .toString().split('\n');
        return content
    },
    line: (day) =>{
        var content = fs.readFileSync(path.join(__dirname, day, 'input.txt'))
            .toString().trim();
        return content
    }
}
