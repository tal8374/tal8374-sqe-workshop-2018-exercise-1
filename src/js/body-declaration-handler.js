import {variablesDeclarationHandler} from './variable-declaration-handler';
import {functionDeclarationHandler} from './function-declaration-handler';
import {whileDeclarationHandler} from './while-declaration-handler';
import {forDeclarationHandler} from './for-declaration-handler';

var handlers = {
    'VariableDeclaration' : variablesDeclarationHandler,
    'FunctionDeclaration' : functionDeclarationHandler,
    'WhileStatement' : whileDeclarationHandler,
    'ForStatement' : forDeclarationHandler,
};

function bodyDeclarationHandler(body) {
    let numberOfLines = body.length;

    for(let lineNumber = 1 ; lineNumber <= numberOfLines; lineNumber++) {
        var declarationType = getDeclarationType(body, lineNumber);

        if(handlers[declarationType]) {
            handlers[declarationType](body, lineNumber)
        }
    }
}

function getDeclarationType(body, lineNumber) {
    return body[lineNumber - 1].type;
}

export {bodyDeclarationHandler};