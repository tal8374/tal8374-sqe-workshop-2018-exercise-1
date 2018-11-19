import {insertLineHandler} from './common';

function ContinueStatementExpression(expression, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.expression = expression;
    this.lineNumber = lineNumber;
    this.type = type;
}

ContinueStatementExpression.prototype.init = function () {
    this.handleBreakStatement();

    this.increaseLineNumber();

    return 'Initialization done';
};

ContinueStatementExpression.prototype.handleBreakStatement = function () {
    let breakPayload = {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : this.expression.type,
    };

    insertLineHandler(breakPayload);
};

ContinueStatementExpression.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

ContinueStatementExpression.prototype.getLineNumber = function () {
    return this.lineNumber;
};


export {ContinueStatementExpression};
