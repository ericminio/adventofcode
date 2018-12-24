var Sample = function(input) {
	this.before = this.parseRegiters(input[0])
	this.instruction = this.parseInstruction(input[1])
	this.after = this.parseRegiters(input[2])
	this.code = this.instruction[0]
}
Sample.prototype.parseInstruction = function(line) {
	return this.parseArray('[' + line.split(' ').join(',') + ']')
}
Sample.prototype.parseRegiters = function(line) {
	return this.parseArray(line.substring(line.indexOf('[')))
}
Sample.prototype.parseArray = function(array) {
	return JSON.parse(array)
}

module.exports = Sample
