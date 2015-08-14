var fs = require('fs');
var fileName = process.argv[2];
var assembler = {};
var Parser = require("./parser.js");
var Code = require("./code.js");
var SymbolTable = require("./symbolTable.js");

var hello = function() {
    console.log("hello, assembler!");
};

assembler.hello = hello;

if (fileName) {
    var data = fs.readFileSync(fileName);
    var targetFileName = fileName.replace(/.asm$/, ".hack");

    // Create output file
    fs.writeFile(targetFileName, '', {
        flags: 'wx'
    }, function(err) {
        if (err) throw err;
        console.log("Created");
    });
}

module.exports = assembler;