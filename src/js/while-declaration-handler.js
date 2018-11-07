import {insertLineHandler} from './common'

function whileDeclarationHandler(body, lineNumber) {
    var declaration = body[lineNumber - 1];

    handleWhileDeclaration(declaration, lineNumber);
}

function handleWhileDeclaration(declaration, lineNumber) {
    var payLoad = getWhileData(declaration, lineNumber);

    insertLineHandler(payLoad, lineNumber);
}

function getWhileData(declaration, lineNumber) {
    console.log(declaration);
    return {
        lineNumber: lineNumber,
        type: declaration.type,
        name: null,
        value: null,
    };
}


export {whileDeclarationHandler};