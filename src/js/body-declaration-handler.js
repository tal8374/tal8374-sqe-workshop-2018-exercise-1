import {variablesDeclarationHandler} from './variable-declaration-handler';
import {functionDeclarationHandler} from './function-declaration-handler';

var handlers = {
    'VariableDeclaration' : variablesDeclarationHandler,
    'FunctionDeclaration' : functionDeclarationHandler,
};

function bodyDeclarationHandler(body) {
    let numberOfLines = body.length;

    for(let lineNumber = 1 ; lineNumber <= numberOfLines; lineNumber++) {
        var declarationType = getDeclarationType(body, lineNumber);

        handlers[declarationType](body, lineNumber)
    }
}

function getDeclarationType(body, lineNumber) {
    return body[lineNumber - 1].type;
}

export {bodyDeclarationHandler};