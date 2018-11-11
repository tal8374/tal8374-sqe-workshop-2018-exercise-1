import {bodyDeclaration} from './body-declaration-handler';
import {Condition} from './condition-handler';

import {insertLineHandler} from './common';

function IfExpression(body, wrapper, lineNumber) {
    this.wrapper = wrapper;
    this.body = body;
    this.lineNumber = lineNumber;
}

IfExpression.prototype.init = function () {
    this.handleIfDeclaration();

    if(this.body.body) {
        this.handleIfBody();
    } else {
        this.handleLineBody();
    }

    this.wrapper.increaseLineNumber();
};

IfExpression.prototype.handleLineBody = function () {

};

IfExpression.prototype.handleIfBody = function () {
    var bodyDeclarationInstance = new bodyDeclaration(this.body.consequent.body, this, this.lineNumber + 1);

    bodyDeclarationInstance.init();
};

IfExpression.prototype.handleIfDeclaration = function () {
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