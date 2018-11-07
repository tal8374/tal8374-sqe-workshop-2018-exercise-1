import {insertLineHandler} from './common'

function forDeclarationHandler(body, lineNumber) {
    var declaration = body[lineNumber - 1];

    handleWhileDeclaration(declaration, lineNumber);
}

function handleWhileDeclaration(declaration, lineNumber) {
    var payLoad = getForData(declaration, lineNumber);

    insertLineHandler(payLoad, lineNumber);
}

function getForData(declaration, lineNumber) {
    console.log(declaration);
    return {
        lineNumber: lineNumber,
        type: declaration.type,
        name: null,
        value: null,
    };
}


export {forDeclarationHandler};