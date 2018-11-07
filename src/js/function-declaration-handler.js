import {insertLineHandler} from './common'

function functionDeclarationHandler(body, lineNumber) {
    var declaration = body[lineNumber - 1];

    handleFunctionDeclaration(declaration, lineNumber);

    handleParamsDeclaration(declaration, lineNumber);
}

function handleParamsDeclaration(declaration, lineNumber) {
    declaration.params.forEach(function (param) {
        var payload = getParamData(param, lineNumber);

        insertLineHandler(payload);
    });
}

function getParamData(param, lineNumber) {
    return {
        lineNumber: lineNumber,
        type: "Param",
        name: param.name,
        value: null,
    };
}

function handleFunctionDeclaration(declaration, lineNumber) {
    var payLoad = getFunctionData(declaration, lineNumber);

    insertLineHandler(payLoad, lineNumber);
}

function getFunctionData(declaration, lineNumber) {
    return {
        lineNumber: lineNumber,
        type: declaration.type,
        name: declaration.id.name,
        value: null,
    };
}

export {functionDeclarationHandler};