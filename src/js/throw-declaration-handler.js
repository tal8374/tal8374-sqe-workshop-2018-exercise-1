import {insertLineHandler} from './common';
import {Expression} from './expression-handler';

function ThrowDeclaration(expression, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.expression = expression;
    this.lineNumber = lineNumber;
    this.type = type;
}

ThrowDeclaration.prototype.init = function () {
    this.handleThrowExpression();

    this.increaseLineNumber();

    return 'Success';
};

ThrowDeclaration.prototype.handleThrowExpression = function () {
    let expression = new Expression(this.expression.argument);

    let payload = {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : this.expression.type,
        condition: expression.getExpression(),
    };

    insertLineHandler(payload);
};

ThrowDeclaration.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

ThrowDeclaration.prototype.getLineNumber = function () {
    return this.lineNumber;
};

export {ThrowDeclaration};
