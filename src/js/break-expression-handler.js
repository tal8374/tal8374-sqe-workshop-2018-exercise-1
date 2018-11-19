import {insertLineHandler} from './common';

function BreakStatementExpression(expression, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.expression = expression;
    this.lineNumber = lineNumber;
    this.type = type;
}

BreakStatementExpression.prototype.init = function () {
    this.handleBreakStatement();

    this.increaseLineNumber();

    return 'Initialization done';
};

BreakStatementExpression.prototype.handleBreakStatement = function () {
    let breakPayload = {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : this.expression.type,
    };

    insertLineHandler(breakPayload);
};

BreakStatementExpression.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

BreakStatementExpression.prototype.getLineNumber = function () {
    return this.lineNumber;
};


export {BreakStatementExpression};
