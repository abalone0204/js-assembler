// Unpacks each instruction into  its underlying fields

var parser = {};
var A_COMMAND = "A";
var C_COMMAND = "C";
var L_COMMAND = "L";

parser.hello = function() {
    console.log("parser's hello");
};

var matchWith = function(sign) {
    var re = "(.*)" + sign + "(.*)";
    return this.match(re);
};
String.prototype.matchWith = matchWith;

var removeWhiteSpace = function(instruction) {
    return instruction.replace(/\s/g, '');
};
var differAorC = function(instruction) {
    var opCode = instruction[0];
    var label = instruction.match(/^\(.+\)$/);
    if (opCode == "@") {
        return A_COMMAND;
    } else if (label !== null) {
        return L_COMMAND;
    } else {
        return C_COMMAND;
    }
};


var parseInstructionA = function(instruction) {
    var register = instruction.slice(1, instruction.length);
    var underlyingFields = {
        commandType: A_COMMAND,
        register: parseInt(register)
    };
    return underlyingFields;
};



var parseInstructionC = function(instruction) {
    var dest;
    var comp;
    var jump;
    if (instruction.matchWith('=')) {
        var insD = instruction.matchWith('=');
        dest = insD[1]
        if (insD[2].matchWith(';')) {
            var insDWithJump = insD[2].matchWith(';');
            comp = insDWithJump[1];
            jump = insDWithJump[2];
        } else {
            comp = insD[2];
        }
    } else {
        comp = instruction.matchWith(';')[1];
        jump = instruction.matchWith(';')[2];
    }

    var underlyingFields = {
        commandType: C_COMMAND,
        dest: dest,
        comp: comp,
        jump: jump
    };

    return underlyingFields;
};

var parseInstructionL = function(instruction) {
    var labelName = instruction.match(/^\((.+)\)$/)[1];
    var underlyingFields = {
        commandType: L_COMMAND,
        labelName: labelName
    };
    return underlyingFields;
};

// Main function
var parseInstruction = function(instruction) {
    instruction = removeWhiteSpace(instruction);
    var commandType = differAorC(instruction);
    switch (commandType) {
        case A_COMMAND:
            return parseInstructionA(instruction);
            break;
        case C_COMMAND:
            return parseInstructionC(instruction);
            break;
        case L_COMMAND:
            return parseInstructionL(instruction);
            break;
        default:
            break;
    }

}

parser.parse = parseInstruction;
module.exports = parser;