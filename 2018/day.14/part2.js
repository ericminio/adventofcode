// var target = [0, 1, 2, 4, 5]
// var target = [5, 9, 4, 1, 4]
var target = [5, 4, 0, 3, 9, 1]
console.log('allocating');
var board = Array(150000000).fill(0)
console.log('go');
board[0] = 3
board[1] = 7
console.log('board ready');
var length = 2
console.log(board.slice(0, length));
var elves = [0, 1]
var tail
var i
var sum
var found = -1
var count = 10
console.log('start');
while (found == -1 && count >0) {
	// count --

	sum = board[elves[0]] + board[elves[1]]
	if (sum < 10) {
		board[length ++] = sum
	}
	else {
		board[length ++] = 1
		board[length ++] = sum - 10
	}
	// console.log(board.slice(0, length));

	elves[0] = (elves[0] + board[elves[0]] + 1) % length
	elves[1] = (elves[1] + board[elves[1]] + 1) % length

	if (length % 1000000 == 0) {
		console.log(length / 1000000)
		// global.gc()
	}
	tail = board.slice(length - target.length, length)
	found = length - target.length
	for(i = 0; i < target.length; i++) {
		if (tail[i] != target[i]) {
			found = -1
			break
		}
	}
}
console.log(found)
