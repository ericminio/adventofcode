const path = require('path')
const fs = require('fs')

module.exports = {
    puzzle: (day) =>{
        var content = fs.readFileSync(path.join(__dirname, day, 'input.txt'))
            .toString().trim().split('\n');
        return content
    }
}
