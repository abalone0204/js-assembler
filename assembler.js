var fs = require('fs');
var fileName = process.argv[2];
var assembler = {};
var parse = require("./parser.js").parse;
var translate = require("./code.js").translate;
var SymbolTable = require("./symbolTable.js");

var hello = function() {
    console.log("hello, assembler!");
};

assembler.hello = hello;

if (fileName) {
    var data = fs.readFileSync(fileName).toString();
    var targetFileName = fileName.replace(/.asm$/, ".hack");

    // Create output file
    fs.writeFile(targetFileName, '', {
        flags: 'wx'
    }, (err) => {
        if (err) throw err;
        console.log("Created");
    });

    var wordsArray = data.split("\n");
    var result = wordsArray
        .filter((word) => {
            return !(word.match(/^\/\//))
        }).map((word) => {
            return word.replace('\r', '');
        }).filter((word) => {
            return word.length !== 0;
        }).forEach((instruction) => {
            // console.log(instruction);
            var binaryCode = translate(parse(instruction));
            binaryCode+= "\n"
            fs.appendFileSync(targetFileName, binaryCode);
        });

}

module.exports = assembler;