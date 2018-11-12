import {insertLineHandler} from './common';

import {ValueExpression} from './value-expression-handler';

function VariableDeclaration(body, wrapper, lineNumber) {
    this.wrapper = wrapper;
    this.body = body;
    this.lineNumber = lineNumber;
}

VariableDeclaration.prototype.init = function () {
    var declarations = this.body.declarations;

    for (let i = 0; i < declarations.length; i++) {
        this.variableDeclarationHandler(declarations[i]);
    }

    this.wrapper.increaseLineNumber(this.lineNumber + 1);
};

VariableDeclaration.prototype.variableDeclarationHandler = function (declaration) {
    let payload = this.parseVariable(declaration);

    insertLineHandler(payload);
};

VariableDeclaration.prototype.parseVariable = function parseVariable(declaration) {
    var valueExpression = new ValueExpression(declaration.init);
    var value = valueExpression.getValue();

    return {
        type: declaration.type,
        name: declaration.id.name,
        value: value,
        lineNumber: this.wrapper.getLineNumber(),
    };
};

export {VariableDeclaration};