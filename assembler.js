var assembler = {};
var Parser = require("./parser.js");
var Code = require("./code.js");
var SymbolTable = require("./symbolTable.js");

var hello = function() {
    console.log("hello, assembler!");
};

assembler.hello = hello;


module.exports = assembler;