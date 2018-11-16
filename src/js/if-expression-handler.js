import {BodyDeclaration} from './body-declaration-handler';
import {Expression} from './expression-handler';

import {insertLineHandler} from './common';

function IfExpression(expression, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.expression = expression;
    this.lineNumber = lineNumber;
    this.type = type;
}

IfExpression.prototype.init = function () {
    this.handleIfDeclaration();

    this.handleIfBody();

    this.handleAlternative();

    this.increaseLineNumber();

    return 'Initialization done';
};

IfExpression.prototype.handlers = {
    'ExpressionStatement': expressionStatementHandler,
    'BlockStatement': blockStatementHandler,
};

function expressionStatementHandler(body, wrapper, lineNumber) {
    let bodyDeclarationInstance = new BodyDeclaration(body, wrapper, lineNumber + 1);

    bodyDeclarationInstance.init();
}

function blockStatementHandler(body, wrapper, lineNumber) {
    let bodyDeclarationInstance = new BodyDeclaration(body.body, wrapper, lineNumber + 1);

    bodyDeclarationInstance.init();
}

IfExpression.prototype.handleIfBody = function () {
    let body = this.expression.consequent ? this.expression.consequent : this.expression.alternate;

    this.handlers[body.type](body, this, this.lineNumber);

    return 'Body statement is handled';
};

IfExpression.prototype.handleAlternative = function () {
    if (!this.expression.alternate) return 'Alternative does not exists';

    if (this.expression.alternate.type === 'IfStatement') {
        var alternative = new IfExpression(this.expression.alternate, this, this.lineNumber + 1, 'else if statement');
        alternative.init();
    } else {
        var bodyInstance;

        if (this.expression.alternate.body) {
            bodyInstance = new BodyDeclaration(this.expression.alternate.body, this, this.lineNumber + 1, 'else if statement');
        } else {
            bodyInstance = new BodyDeclaration(this.expression.alternate, this, this.lineNumber + 1, 'else if statement');
        }
        bodyInstance.init();
    }

    return 'Done handling the alternative';
};

IfExpression.prototype.handleIfDeclaration = function () {
    var payload = this.getPayload();

    insertLineHandler(payload);

    return 'Done inserting the payload to the table';
};

IfExpression.prototype.getPayload = function () {
    var condition = new Expression(this.expression.test);

    return {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : 'if statement',
        name: null,
        value: null,
        condition: condition ? condition.getExpression() : '',
    };
};

IfExpression.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

IfExpression.prototype.getLineNumber = function () {
    return this.lineNumber;
};

export {IfExpression};
