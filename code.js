// less symbolic version

var code = {};
var A_COMMAND = "A";
var C_COMMAND = "C";
var L_COMMAND = "L";

code.hello = function() {
    console.log("hello");
};

var addZero = function(address) {
    var len = 16;
    if (address.length < len) {
        address = '0'.concat(address);
        return addZero(address)
    } else {
        return address;
    }
};

var transA = function(underlyingFields) {
    var address = underlyingFields.register.toString(2);
    return addZero(address);
};

var dealDest = function(dest) {
    var result = [0, 0, 0];
    if (dest.match(/M/)) {
        result[2] = 1;
    }
    if (dest.match(/D/)) {
        result[1] = 1;
    }
    if (dest.match(/A/)) {
        result[0] = 1;
    }
    return result.join('');
};

var dealJump = function(jump) {
    var result = [0, 0, 0];
    if (jump === undefined) {
        return result.join('');
    }
    if (jump === 'JMP') {
        return '111';
    };
    if (jump.match(/G/)) {
        result[2] = 1;
    }
    if (jump.match(/L/)) {
        result[0] = 1;
    }
    if (jump.match(/EQ/)) {
        result[1] = 1;
    }
    if (jump.match(/NE/)) {
        result[0] = 1;
        result[1] = 0;
        result[2] = 1;
    }
    return result.join('');
};


var dealComp = function(comp) {
    if(comp === undefined) {
        return '0000000';
    }
    var a = '0';
    if (comp.match(/M/)) {
        a = '1';
    }
    // idiot way
    switch (comp) {
        case '0':
            return a + '101010';
            break;
        case '1':
            return a + '111111';
            break;
        case '-1':
            return a + '111010';
            break;
        case 'D':
            return a + '001100';
            break;
        case 'A':
        case 'M':
            return a + '110000';
            break;
        case '!D':
            return a + '001101';
        case '!A':
        case '!M':
            return a + '110001';
            break;
        case '-D':
            return a + '001101';
            break;
        case '-A':
        case '-M':
            return a + '110011';
            break;
        case 'D+1':
            return a + '011111';
            break;
        case 'A+1':
        case 'M+1':
            return a + '110111';
            break;
        case 'D-1':
            return a + '011111';
            break;
        case 'A-1':
        case 'M-1':
            return a + '110010';
            break;
        case 'D+A':
        case 'D+M':
            return a + '000010';
            break;
        case 'D-A':
        case 'D-M':
            return a + '010011';
            break;
        case 'A-D':
        case 'M-D':
            return a + '000111';
            break;
        case 'D&M':
        case 'D&A':
            return a+'000000';
            break;
        case 'D|A':
        case 'D|M':
            return a+'010101';
            break;
    }
}

var transC = function(underlyingFields) {
    var destCode = dealDest(underlyingFields.dest);
    var compCode = dealComp(underlyingFields.comp);
    var jumpCode = dealJump(underlyingFields.jump);

    return '111' + compCode + destCode + jumpCode;
};
// Main function
var translate = function(underlyingFields) {
    var commandType = underlyingFields.commandType;
    switch (commandType) {
        case A_COMMAND:
            return transA(underlyingFields);
            break;
        case C_COMMAND:
            return transC(underlyingFields)
            break;
        case L_COMMAND:
            break;
        default:
            break;
    };

};
code.translate = translate;

module.exports = code;