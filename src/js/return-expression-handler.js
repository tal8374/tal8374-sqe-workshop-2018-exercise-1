import {insertLineHandler} from './common';

function ReturnExpression(body, wrapper, lineNumber) {
    this.wrapper = wrapper;
    this.body = body;
    this.lineNumber = lineNumber;
}

ReturnExpression.prototype.init = function () {
    this.returnDeclarationHandler();

    this.wrapper.increaseLineNumber(this.lineNumber + 1);
};

ReturnExpression.prototype.returnDeclarationHandler = function (declaration) {
    let payload = this.parseReturn(declaration);

    insertLineHandler(payload);
};

ReturnExpression.prototype.parseReturn = function () {
    return {
        type: this.body.type,
        value: this.body.argument.name,
        lineNumber: this.wrapper.getLineNumber(),
    };
};

export {ReturnExpression};