var symbolTable = {};
var A_COMMAND = "A";
var C_COMMAND = "C";
var L_COMMAND = "L";
var assign = Object.assign;
var keysOf = Object.keys;
Array.prototype.concatAll = function() {
    return this.reduce((acc, cur) => {
        return Array.prototype.concat.call(acc, cur);
    }, []);
};
symbolTable.hello = function() {
    console.log("symbolTable's hello");
};
var preDefinedSymbols = {};
preDefinedSymbols["SP"] = 0;
preDefinedSymbols["LCL"] = 1;
preDefinedSymbols["ARG"] = 2;
preDefinedSymbols["THIS"] = 3;
preDefinedSymbols["THAT"] = 4;
preDefinedSymbols["SCREEN"] = 16384;
preDefinedSymbols["KBD"] = 24576;
for (var i = 0; i < 16; i++) {
    preDefinedSymbols["R" + i] = i;
};
var preDefineKeys = keysOf(preDefinedSymbols);

var variableSymbols = {};
var variableKeys = keysOf(variableSymbols);
var updatVarKeys = function() {
    variableKeys = keysOf(variableSymbols);
};
var currentAddress = 16;
var setVariable = (symbol) => {
    variableSymbols[symbol.toString()] = currentAddress;
    updatVarKeys();
    currentAddress += 1;
};

var getSymbolVal = (symbol) => {
    if (preDefineKeys.indexOf(symbol) !== -1) {
        return preDefinedSymbols[symbol];
    }
    if (variableKeys.indexOf(symbol) !== -1) {
        return variableSymbols[symbol]
    } else {
        setVariable(symbol);
        return getSymbolVal(symbol);
    }
};

var saveLabel = (underlyingFields) => {
    variableSymbols[underlyingFields.labelName] = underlyingFields.lineNumber;
    updatVarKeys();
};
var symbolLesslize = (underlyingFields) => {
    if (underlyingFields.commandType === C_COMMAND) {
        return underlyingFields;
    }
    if (underlyingFields.commandType === A_COMMAND) {
        var symbolic = isNaN(parseInt(underlyingFields.register));
        if (symbolic) {
            underlyingFields.register = getSymbolVal(underlyingFields.register);
        } else {
            underlyingFields.register = parseInt(underlyingFields.register);
        }
        return underlyingFields;
    }
};
var getSymbolTable = function() {
    return {
        "predefinedSymbols": preDefinedSymbols,
        "otherSymbols": variableSymbols
    };
};
symbolTable.getSymbolTable = getSymbolTable;
symbolTable.saveLabel = saveLabel;
symbolTable.symbolLesslize = symbolLesslize;
module.exports = symbolTable;