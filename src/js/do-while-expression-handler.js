import {BodyDeclaration} from './body-declaration-handler';
import {Expression} from './expression-handler';

import {insertLineHandler} from './common';

function DoWhileStatementExpression(expression, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.expression = expression;
    this.lineNumber = lineNumber;
    this.type = type;
}

DoWhileStatementExpression.prototype.init = function () {
    this.declareStatement();

    this.handleBody();

    return 'Initialization done';
};

DoWhileStatementExpression.prototype.declareStatement = function () {
    let condition = new Expression(this.expression.test);

    var payload = {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : this.expression.type,
        condition: condition ? condition.getExpression() : '',
    };

    insertLineHandler(payload);
};

DoWhileStatementExpression.prototype.handleBody = function () {
    let body = new BodyDeclaration(this.expression.body.body, this, this.lineNumber + 1);

    body.init();
};

DoWhileStatementExpression.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

DoWhileStatementExpression.prototype.getLineNumber = function () {
    return this.lineNumber;
};

export {DoWhileStatementExpression};
