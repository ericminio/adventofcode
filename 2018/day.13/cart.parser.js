const {
    Cart,
} = require('./lib')

module.exports = (lines)=>{
    var carts = []
    for (var y=0; y<lines.length; y++) {
        var line = lines[y]
        for (var x=0; x<line.length; x++) {
            if (line.charAt(x) == '>') {
                var cart = new Cart()
                cart.position = { x:x, y:y }
                cart.heading = { x:1, y:0 }
                carts.push(cart)
            }
            if (line.charAt(x) == 'v') {
                var cart = new Cart()
                cart.position = { x:x, y:y }
                cart.heading = { x:0, y:1 }
                carts.push(cart)
            }
            if (line.charAt(x) == '<') {
                var cart = new Cart()
                cart.position = { x:x, y:y }
                cart.heading = { x:-1, y:0 }
                carts.push(cart)
            }
            if (line.charAt(x) == '^') {
                var cart = new Cart()
                cart.position = { x:x, y:y }
                cart.heading = { x:0, y:-1 }
                carts.push(cart)
            }
        }
    }
    return carts
}
