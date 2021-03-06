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

    this.increaseLineNumber();

    return 'Success';
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
    let bodyContent = this.expression.body.type === 'BlockStatement' ? this.expression.body.body : this.expression.body;

    let body = new BodyDeclaration(bodyContent, this, this.lineNumber + 1);

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
