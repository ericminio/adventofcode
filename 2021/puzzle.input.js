const path = require('path')
const fs = require('fs')

module.exports = {
    puzzle: (day, filename) =>{
        var content = fs.readFileSync(path.join(__dirname, day, filename))
            .toString().trim().split('\n');
        return content
    },
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
