import {variablesDeclarationHandler} from './variable-declaration-handler';
import {functionDeclarationHandler} from './function-declaration-handler';

var handlers = {
    'VariableDeclaration' : variablesDeclarationHandler,
    'FunctionDeclaration' : functionDeclarationHandler,
};

function facadeDeclarationHandler(parsedCode) {
    let numberOfLines = parsedCode.body.length;

    for(let lineNumber = 1 ; lineNumber <= numberOfLines; lineNumber++) {
        var declarationType = getDeclarationType(parsedCode, lineNumber);

        handlers[declarationType](parsedCode, lineNumber)
    }
}

function getDeclarationType(parsedCode, lineNumber) {
    return parsedCode.body[lineNumber - 1].type;
}

export {facadeDeclarationHandler};