var expect = require('chai').expect;
var request = require('request');
var credentialsFor = require('../me');

describe('2016 day 6 challenge', function() {

    var url = 'http://adventofcode.com/2016/day/6/input';

    it('includes part 1', function(done) {
        request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
            var messages = input.split('\n');
            expect(decode(messages, occurenceAndAlpha)).to.equal('qrqlznrl');
            done();
        });
    });

    it('includes part 2', function(done) {
        request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
            var messages = input.split('\n');
            expect(decode(messages, leastCommonFirst)).to.equal('kgzdfaon');
            done();
        });
    });

    describe('internals', function() {

        it('passes part 1 example', function() {
            var messages = [
                'eedadn',
                'drvtee',
                'eandsr',
                'raavrd',
                'atevrs',
                'tsrnev',
                'sdttsa',
                'rasrtv',
                'nssdts',
                'ntnada',
                'svetve',
                'tesnvt',
                'vntsnd',
                'vrdear',
                'dvrsen',
                'enarar'
            ];
            expect(decode(messages, occurenceAndAlpha)).to.equal('easter');
        });

        it('passes part 2 example', function() {
            var messages = [
                'eedadn',
                'drvtee',
                'eandsr',
                'raavrd',
                'atevrs',
                'tsrnev',
                'sdttsa',
                'rasrtv',
                'nssdts',
                'ntnada',
                'svetve',
                'tesnvt',
                'vntsnd',
                'vrdear',
                'dvrsen',
                'enarar'
            ];
            expect(decode(messages, leastCommonFirst)).to.equal('advent');
        });

    });
});

var decode = function(messages, sortingMethod) {
    var output = '';
    for (var j=0; j<messages[0].length; j++) {
        var letters = [{ letter:messages[0][j], count:1 }];
        for (var i=1; i<messages.length; i++) {
            var char = messages[i][j];
            if (char != undefined) {
                var found = findLetter(letters, char);
                if (found != undefined) {
                    letters[found].count ++;
                }
                else {
                    letters.push({ letter:char, count:1 });
                }
            }
        }
        letters.sort(sortingMethod);
        output += letters[0].letter;
    }
    return output;
};
var findLetter = function(letters, letter) {
    for (var i=0; i<letters.length; i++) {
        if (letters[i].letter == letter) { return i; }
    }
};
var occurenceAndAlpha = function(a, b) {
    if (a.count != b.count) { return a.count > b.count ? -1 : 1; }
    return a.letter < b.letter ? -1: 1;
};
var leastCommonFirst = function(a, b) {
    if (a.count != b.count) { return a.count < b.count ? -1 : 1; }
    return a.letter < b.letter ? -1: 1;
};
