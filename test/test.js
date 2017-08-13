var assert = require('assert');
var numab = require('../index');

describe('numab', function() {
    describe('sanity check', function() {
        it('should create a default instance', function() {
            assert.ok(numab);
        });

        it('should be able to create different instances', function() {
            assert.ok(numab.createInstance());
        });

        it('should return a number', function() {
            var actual = numab.parse('2');
            assert(typeof(actual) == 'number');
        });

        it('should return NaN', function() {
            assert(Number.isNaN(numab.parse("a")));
        });

    });

    describe('default separator .', function() {
        it('should return 250', function() {
            assert.equal(numab.parse('0.25k'), 250);
        });
    });

    describe('custom separator ,,', function() {
        var num = require('../index');
        num.config({ separator: ',,' });

        it('should return 250', function() {
            assert.equal(num.parse('0,,25k'), 250);
        });

        it('should return NaN', function() {
            assert(Number.isNaN(num.parse('2.5k')));
        });

        it('should apply custom separator to instance', function() {
            var i = numab.createInstance();
            i.config({ separator: ",," });
            var actual = i.parse('2,,5k');
            assert.equal(actual, 2500);
        });
    });

    describe('original instance and clone should return same values', function() {
        it('should return same values with different separators', function() {
            var expected = 2500;
            var actualGlobal = numab.parse("2.5k");
            var actualInstance = numab.createInstance({ separator: ",," }).parse('2,,5k');
            assert.equal(actualGlobal, expected);
            assert.equal(actualInstance, expected);
            assert.equal(actualInstance, actualGlobal);
        });
    })
});