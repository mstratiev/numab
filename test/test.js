var assert = require('assert');
var numab = require('../index');


describe('numab', function() {
    describe('sanity check', function() {

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
    });
});