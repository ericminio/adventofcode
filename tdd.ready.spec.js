const expect = require("chai").expect;

describe("Testing environment", function () {
    it("is ready to use chai with mocha", function () {
        expect(1 + 1).to.equal(2);
    });

    it("is ready to connect to adventofcode", function (done) {
        var request = require("request");
        var credentialsFor = require("./me");
        var url = "http://adventofcode.com/2015/day/1/input";

        request(
            { url: url, jar: credentialsFor(url) },
            function (error, response, input) {
                expect(response.statusCode).to.equal(200);
                done();
            }
        );
    });
});
