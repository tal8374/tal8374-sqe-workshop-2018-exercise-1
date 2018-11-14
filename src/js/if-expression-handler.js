import {BodyDeclaration} from './body-declaration-handler';
import {Condition} from './condition-handler';

import {insertLineHandler} from './common';

function IfExpression(body, wrapper, lineNumber) {
    this.wrapper = wrapper;
    this.body = body;
    this.lineNumber = lineNumber;
    console.log(1);
    console.log(this.body);
}

IfExpression.prototype.init = function () {
    this.handleIfDeclaration();

    this.handleIfBody();

    this.handleAlternative();

    this.wrapper.increaseLineNumber();
};

IfExpression.prototype.handleIfBody = function () {
    var bodyDeclarationInstance;
    if (this.body.type === 'ExpressionStatement' || this.body.type === 'BlockStatement' ||
        this.body.type === 'ReturnStatement') {
        if (this.body.type === 'BlockStatement') {
            for (let i = 0; i < this.body.body.length; i++) {
                bodyDeclarationInstance = new BodyDeclaration(this.body.body[i], this, this.lineNumber + 1);
            }
        } else {
            console.log('2')
            console.log(this.body)
            bodyDeclarationInstance = new BodyDeclaration(this.body, this, this.lineNumber + 1);
        }
    } else if (this.body.consequent.body) {
        bodyDeclarationInstance = new BodyDeclaration(this.body.consequent.body, this, this.lineNumber + 1);
    } else {
        bodyDeclarationInstance = new BodyDeclaration(this.body.consequent, this, this.lineNumber + 1);
    }

    bodyDeclarationInstance.init();
};

IfExpression.prototype.handleAlternative = function () {
    if (!this.body.alternate) return;

    var alternative = new IfExpression(this.body.alternate, this, this.lineNumber + 1);
    alternative.init();
};

IfExpression.prototype.handleIfDeclaration = function () {
    if (this.body.type === 'ExpressionStatement' || this.body.type === 'BlockStatement' ||
        this.body.type === 'ReturnStatement') return;

    var payLoad = this.getIfData();

    insertLineHandler(payLoad);
};

IfExpression.prototype.getIfData = function () {
    var condition = new Condition(this.body.test);

    return {
        lineNumber: this.lineNumber,
        type: this.body.type,
        name: null,
        value: null,
        condition: condition.getConditionExpression(),
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