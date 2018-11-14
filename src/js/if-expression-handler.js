import {BodyDeclaration} from './body-declaration-handler';
import {Condition} from './condition-handler';

import {insertLineHandler} from './common';

function IfExpression(expression, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.expression = expression;
    this.lineNumber = lineNumber;
    this.type = type;

    console.log(expression);
}

IfExpression.prototype.init = function () {
    this.handleIfDeclaration();

    this.handleIfBody();

    this.handleAlternative();

    this.wrapper.increaseLineNumber();
};

IfExpression.prototype.handleIfBody = function () {
    var bodyDeclarationInstance;
    if (this.expression.type === 'ExpressionStatement' || this.expression.type === 'BlockStatement' ||
        this.expression.type === 'ReturnStatement') {
        if (this.expression.type === 'BlockStatement') {
            for (let i = 0; i < this.expression.body.length; i++) {
                bodyDeclarationInstance = new BodyDeclaration(this.expression.body[i], this, this.lineNumber + 1);
            }
        } else {
            bodyDeclarationInstance = new BodyDeclaration(this.expression, this, this.lineNumber + 1);
        }
    } else if (this.expression.consequent.body) {
        bodyDeclarationInstance = new BodyDeclaration(this.expression.consequent.body, this, this.lineNumber + 1);
    } else {
        bodyDeclarationInstance = new BodyDeclaration(this.expression.consequent, this, this.lineNumber + 1);
    }

    if (bodyDeclarationInstance) {
        bodyDeclarationInstance.init();
    }
};

IfExpression.prototype.handleAlternative = function () {
    if (!this.expression.alternate) return 'Alternative does not exists';

    var alternative = new IfExpression(this.expression.alternate, this, this.lineNumber + 1, 'else if statement');
    alternative.init();

    return 'Done handling the alternative';
};

IfExpression.prototype.handleIfDeclaration = function () {
    if (this.expression.type === 'ExpressionStatement' || this.expression.type === 'ReturnStatement') {
        return 'Shouldn\'t be handled';
    }

    var payload = this.getPayload();

    insertLineHandler(payload);

    return 'Done inserting the payload to the table';
};

IfExpression.prototype.getPayload = function () {
    var condition;

    if (this.expression.type !== 'BlockStatement') {
        condition = new Condition(this.expression.test);
    }

    return {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : 'if statement',
        name: null,
        value: null,
        condition: condition ? condition.getConditionExpression() : '',
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
