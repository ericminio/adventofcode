const {
    Cart,
} = require('./lib')

module.exports = (lines)=>{
    var carts = []
    lines.forEach((line)=>{
        if (line.indexOf('cart:')==0) {
            var data = /cart:\s(.*)\s(.*)\s(.*)\s(.*)/.exec(line)
            carts.push(new Cart({
                x:parseInt(data[1]),
                y:parseInt(data[2]),
                heading:{x:parseInt(data[3]), y:parseInt(data[4])}
            }))
        }
    })
    return carts
}
