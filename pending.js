var assert = require('assert');
var assembler = require('./assembler');
var parser = require('./parser')
var code = require('./code');
var symbolTable = require("./symbolTable");

var instructionA = "   @2   ";
var instructionCNoJump = "D = M+1";
var instructionCJump = "D = M+1 ; JNE";
var instructionJump = "0; JMP"
var instructionL = "( hello )";

// Parser test:
console.log('A type:');
console.log(parser.parse(instructionA));
console.log('======');
console.log('C type(comp no jump):');
console.log(parser.parse(instructionCNoJump));
console.log('======');
console.log('C type( comp with jump):');
console.log(parser.parse(instructionCJump));
console.log('======');
console.log('C type( no comp, only jump):');
console.log(parser.parse(instructionJump));
console.log('======');
console.log('Label:');
console.log(parser.parse(instructionL));
console.log('end');

// Code test

var translate = code.translate;
console.log('TRANSLATE:');
console.log(translate(parser.parse(instructionA)));
console.log(translate(parser.parse(instructionCNoJump)));
console.log(translate(parser.parse(instructionCJump)));
console.log(translate(parser.parse(instructionJump)));
