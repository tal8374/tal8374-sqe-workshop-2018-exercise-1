import {insertLineHandler} from './common'

function variablesDeclarationHandler(body, lineNumber) {
    var declarations = body[lineNumber - 1].declarations;

    for(let i = 0; i < declarations.length; i++) {
        variableDeclarationHandler(declarations[i], lineNumber)
    }
}

function variableDeclarationHandler(declaration, lineNumber) {
    let payload = parseVariable(declaration, lineNumber);

    insertLineHandler(payload)
}

function parseVariable(declaration, lineNumber) {
    return {
        type : declaration.type,
        name : declaration.id.name,
        value : declaration.init ? declaration.init.value : 0,
        lineNumber : lineNumber,
    }
}

export {variablesDeclarationHandler};