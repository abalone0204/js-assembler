var assert = require('assert');
var parse = require('./parser').parse
var translate = require('./code').translate;
var A_COMMAND = "A";
var C_COMMAND = "C";
var L_COMMAND = "L";
describe('HACK machine language\'s assembler(node.js)', function() {
    var instructionA = "   @2   ";
    var instructionCNoJump = "D = M+1";
    var instructionCJump = "D = M+1 ; JNE";
    var instructionJump = "0; JMP"
    var instructionL = "( hello )";
    var AFields = function(register) {
        return {
            commandType: A_COMMAND,
            register: register
        };
    };
    var CFields = function(dest, comp, jump) {
        return {
            commandType: C_COMMAND,
            dest: dest,
            comp: comp,
            jump: jump
        };
    };
    var LFields = function(labelName) {
        return {
            commandType: L_COMMAND,
            labelName: labelName
        };
    }
    describe('1. Parser: parse instruction to serparated fields', function() {
        context("A instruction:", function() {
            it('should parse symbol-less A instruction', function() {
                assert.deepEqual(AFields(2), parse(instructionA));
            });
        });
        context("C instruction:", function() {
            it('should parse symbol-less C instruction without jump', function() {
                assert.deepEqual(CFields('D', 'M+1'), parse(instructionCNoJump));
            });
            it('should parse symbol-less C instruction with jump', function() {
                assert.deepEqual(CFields('D', 'M+1', 'JNE'), parse(instructionCJump));
            });
            it('should parse symbol-less C instruction with jump', function() {
                assert.deepEqual(CFields('0', undefined, 'JMP'), parse(instructionJump));
            });

        });
        context("Label: ", function() {
            it('should parse L instruction with jump', function() {
                assert.deepEqual(LFields('hello'), parse(instructionL));
            });

        });
    });
    describe('2. Code translation: translate underlying-fields to binary codes', function() {
        context("A instruction: ", function() {
            it('should translate fields of A', function(done) {
                assert.equal(translate(AFields(1)), '0000000000000001');
                assert.equal(translate(AFields(2)), '0000000000000010');
                assert.equal(translate(AFields(4)), '0000000000000100');
                done();
            });
        });
        context("C instruction: ", function() {
            context("should translate Add.asm:", function() {
                it('should translate "@2"', function() {
                    assert.equal(translate(AFields(2)), "0000000000000010");
                });
                it('should translate "D=A"', function() {
                    assert.equal(translate(CFields("D", "A")), "1110110000010000");
                });
                it('should translate "@3"', function() {
                    assert.equal(translate(AFields(3)), "0000000000000011");
                });
                it('should translate "D=D+A"', function() {
                    assert.equal(translate(CFields("D", "D+A")), "1110000010010000");
                });

                it('should translate "@0"', function() {
                    assert.equal(translate(AFields(0)), "0000000000000000");
                });
                it('should translate "M=D', function() {
                    assert.equal(translate(CFields("M", "D")), "1110001100001000");
                });
            });
        });

    });
});