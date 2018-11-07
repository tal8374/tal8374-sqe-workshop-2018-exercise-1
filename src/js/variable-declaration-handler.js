import {insertLineHandler} from './common'

function variableDeclaration(body, wrapper, lineNumber) {
    this.wrapper = wrapper;
    this.body = body;
    this.lineNumber = lineNumber;
}

variableDeclaration.prototype.init = function () {
    var declarations = this.body.declarations;

    for(let i = 0; i < declarations.length; i++) {
        this.variableDeclarationHandler(declarations[i], this.lineNumber - 1)
    }

    this.wrapper.increaseLineNumber(this.lineNumber + 1);
};

variableDeclaration.prototype.variableDeclarationHandler = function(declaration, lineNumber) {
    let payload = this.parseVariable(declaration, lineNumber);

    insertLineHandler(payload)
};

variableDeclaration.prototype.parseVariable = function parseVariable(declaration, lineNumber) {
    return {
        type : declaration.type,
        name : declaration.id.name,
        value : declaration.init ? declaration.init.value : 0,
        lineNumber : this.wrapper.getLineNumber(),
    }
};

export {variableDeclaration};